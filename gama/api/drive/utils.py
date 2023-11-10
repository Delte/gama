from __future__ import unicode_literals
import frappe
import uuid

drive_settings = frappe.get_doc("Gama Drive Settings")

@frappe.whitelist()
def create(doc_type, name):
    data = frappe.get_doc(doc_type, name)
    drive_entity = None

    for doctype_details in drive_settings.doctype_details:
        if doc_type == doctype_details.doc_type:
            drive_entity = doctype_details.doc_type_drive_entity

            for folder_field in ["folder_name_1", "folder_name_2", "folder_name_3", "folder_name_4"]:
                folder_name = getattr(doctype_details, folder_field)
                if folder_name:
                    drive_entity_present = check_folder_entity(
                        frappe.render_template(folder_name, context={"doc": data}, is_path=False),
                        drive_entity,
                    )
                    if drive_entity_present is None:
                        if folder_name == '.YYYY.':
                            folder_name_template = frappe.render_template(
                                doctype_details.yearly_folder_based_on, context={"doc": data}, is_path=False
                            )
                            drive_entity_present = create_year_folder(folder_name_template, drive_entity)
                        else:
                            folder_name_template = frappe.render_template(
                                folder_name, context={"doc": data}, is_path=False
                            )
                            drive_entity_present = create_folder(folder_name_template, drive_entity)
                    drive_entity = drive_entity_present
        
            if doctype_details.project == 1 :
                drive_entity = create_year_folder(data.name if doc_type == 'Project' else data.project, drive_entity)
                drive_entity = create_folder(data.name if doc_type == 'Project' else data.project,drive_entity)

            if doctype_details.template == 1 :
                       copy_folder(drive_entity, doctype_details.template_entity)

            return drive_entity

    # for doctype_details in drive_settings.doctype_details:
    #     if doc_type == doctype_details.doc_type:
    #         if doctype_details.project == 1:
    #             drive_entity = create_project_folder(data.name if doc_type == 'Project' else data.project)
    #         else:
    #             drive_entity = doctype_details.doc_type_drive_entity

    #         for folder_field in ["folder_name_1", "folder_name_2", "folder_name_3", "folder_name_4"]:
    #             folder_name = getattr(doctype_details, folder_field)
    #             if folder_name:
    #                 drive_entity_present = check_folder_entity(
    #                     frappe.render_template(folder_name, context={"doc": data}, is_path=False),
    #                     drive_entity,
    #                 )
    #                 if drive_entity_present is None:
    #                     if folder_name == '.YYYY.':
    #                         folder_name_template = frappe.render_template(
    #                             doctype_details.yearly_folder_based_on, context={"doc": data}, is_path=False
    #                         )
    #                         drive_entity_present = create_year_folder(folder_name_template, drive_entity)
    #                     else:
    #                         folder_name_template = frappe.render_template(
    #                             folder_name, context={"doc": data}, is_path=False
    #                         )
    #                         drive_entity_present = create_folder(folder_name_template, drive_entity)
    #                 drive_entity = drive_entity_present

    #         return drive_entity

    frappe.msgprint("No folder defined for this Form! Please contact the System Administrator.")

def create_year_folder(name, parent_entity):
    name = name[-10:][:4]
    drive_entity = create_folder(name, parent_entity)

    return drive_entity

def create_project_folder(name):
    drive_entity = create_year_folder(name, drive_settings.doctype_details.doc_type_drive_entity)
    drive_entity = create_folder(name, drive_entity)
    copy_folder(drive_entity, drive_settings.doctype_details.template_entity)
    return drive_entity

def check_folder_entity(name, parent_entity):
    return frappe.db.get_value('Drive Entity',{'parent_drive_entity': parent_entity, 'title': name, 'is_active': 1, 'is_group': 1},'name')

def create_folder(name, parent_entity, allow_comments=False, allow_download=False):
    new_drive_entity = check_folder_entity(name, parent_entity)
    hex_code = new_drive_entity
    if not new_drive_entity:
        hex_code = uuid.uuid4().hex
        new_drive_entity = frappe.new_doc("Drive Entity")
        new_drive_entity.name = hex_code
        new_drive_entity.title = name
        new_drive_entity.is_group = True
        new_drive_entity.old_parent = parent_entity
        new_drive_entity.parent_drive_entity = parent_entity
        new_drive_entity.is_active = True
        new_drive_entity.allow_comments = allow_comments
        new_drive_entity.allow_download = allow_download
        new_drive_entity.color = "#525252"
        new_drive_entity.insert(ignore_permissions=True)

    else :
        frappe.db.set_value('Drive Entity', new_drive_entity, 'allow_comments', allow_comments, update_modified=False)
        frappe.db.set_value('Drive Entity', new_drive_entity, 'allow_download', allow_download, update_modified=False)
    
    return hex_code

def copy_folder(target_entity, source_entity):
    sub_entity = None
    records = frappe.db.get_all('Drive Entity',
        filters={
            'parent_drive_entity': source_entity,
            'is_active': 1,
           'is_group': 1,
        },
        fields=['name', 'title', 'allow_comments','allow_download'],
        page_length=9999,
        as_list=False
    )
    for record in records:
        drive_entity = create_folder(record.title, target_entity, record.allow_comments, record.allow_download)
        copy_folder_permission(drive_entity, record.name)
        sub_entity = copy_folder(drive_entity, record.name)
    return sub_entity

def clear_permission(drive_entity):
    records = frappe.db.get_all('Drive DocShare',
        filters={
            'share_doctype': "Drive Entity",
            'share_name': drive_entity
        },
        fields=['name'],
    )
    for record in records:
        frappe.delete_doc("Drive DocShare", record.name, ignore_permissions=True)

def copy_folder_permission(drive_entity, template_entity):
    clear_permission(drive_entity)
    records = frappe.db.get_all('Drive DocShare',
        filters={
            'share_doctype': "Drive Entity",
            'share_name': template_entity
        },
        fields=['user_doctype','user_name', 'read', 'write','everyone'],
        page_length=9999,
        as_list=False
    )

    for record in records:
        doc = frappe.new_doc('Drive DocShare')
        doc.share_doctype = 'Drive Entity'
        doc.share_name = drive_entity
        doc.user_doctype = record.user_doctype
        doc.user_name= record.user_name
        doc.read = record.read
        doc.write = record.write
        doc.share = 0
        doc.everyone = record.everyone
        doc.public = 0
        doc.notify = 0
        doc.insert(ignore_permissions=True)

@frappe.whitelist()
def manage_project_folders(project, operation="add"):
    frappe.msgprint(f'{project}')
    drive_entity = None

    if operation == "add":
        drive_entity = create("Project", project)
        frappe.msgprint(f'drive entity : {drive_entity}')
        frappe.db.set_value('Project', project, 'custom_drive_entity', drive_entity, update_modified=False)

    for doctype in ["Opportunity", "Task", "Quotation", "Sales Order", "Timesheet", "Issue", "Delivery Note", "Installation Note"]:
        records = frappe.db.get_all(
            doctype,
            filters={"project": project},
            fields=["name"],
            page_length=9999,
            as_list=False,
        )
        for record in records:
            frappe.msgprint(f'{operation} : {record.name}')
            if operation == "add":
                frappe.db.set_value(doctype, record.name, 'custom_drive_entity', drive_entity, update_modified=False)
            elif operation == "remove":
                frappe.db.set_value(doctype, record.name, 'custom_drive_entity', '', update_modified=False)
    
    if operation == "remove":
        drive_entity = frappe.get_value('Project', project, 'custom_drive_entity')
        frappe.db.set_value('Project', project, 'custom_drive_entity', '', update_modified=False)
        frappe.delete_doc('Drive Entity',drive_entity)