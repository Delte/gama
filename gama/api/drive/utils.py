from __future__ import unicode_literals
import frappe, json, uuid, mimetypes, os
from frappe import msgprint, _
from frappe.model.document import Document
from frappe.utils import get_site_name

@frappe.whitelist()
def create(doc_type,name):
	data = frappe.get_doc(doc_type,name)
	drive_settings = frappe.get_doc("Gama Drive Settings")
	drive_entity = None
	
	for row_doctype_details in drive_settings.doctype_details:

		if doc_type == row_doctype_details.doc_type:	#check if doctype present on list at drive settings
			if row_doctype_details.project == 1:
				drive_entity = create_year_folder(data.project, drive_settings.project_folder)
				drive_entity = create_folder(data.project, drive_entity)
				copy_folder(drive_entity,drive_settings.template_folder)

			else:
				drive_entity = row_doctype_details.doc_type_drive_entity
						
			if row_doctype_details.folder_name_1:
				drive_entity_present = None
				drive_entity_present = check_folder_entity(frappe.render_template(row_doctype_details.folder_name_1,context={"doc":data}, is_path=False), drive_entity)
				if drive_entity_present is None:
					if row_doctype_details.folder_name_1 == '.YYYY.':
						drive_entity_present = create_year_folder(frappe.render_template(row_doctype_details.yearly_folder_based_on,context={"doc":data}, is_path=False), drive_entity)
					else:
						drive_entity_present = create_folder(frappe.render_template(row_doctype_details.folder_name_1,context={"doc":data}, is_path=False), drive_entity)
				drive_entity = drive_entity_present
				
			if row_doctype_details.folder_name_2:
				drive_entity_present = None
				drive_entity_present = check_folder_entity(frappe.render_template(row_doctype_details.folder_name_2,context={"doc":data}, is_path=False), drive_entity)
				if drive_entity_present is None:
					if row_doctype_details.folder_name_2 == '.YYYY.':
						drive_entity_present = create_year_folder(frappe.render_template(row_doctype_details.yearly_folder_based_on,context={"doc":data}, is_path=False), drive_entity)
					else:
						drive_entity_present = create_folder(frappe.render_template(row_doctype_details.folder_name_2,context={"doc":data}, is_path=False), drive_entity)
				drive_entity = drive_entity_present

			if row_doctype_details.folder_name_3:
				drive_entity_present = None
				drive_entity_present = check_folder_entity(frappe.render_template(row_doctype_details.folder_name_3,context={"doc":data}, is_path=False), drive_entity)
				if drive_entity_present is None:
					if row_doctype_details.folder_name_3 == '.YYYY.':
						drive_entity_present = create_year_folder(frappe.render_template(row_doctype_details.yearly_folder_based_on,context={"doc":data}, is_path=False), drive_entity)
					else:
						drive_entity_present = create_folder(frappe.render_template(row_doctype_details.folder_name_3,context={"doc":data}, is_path=False), drive_entity)
				drive_entity = drive_entity_present

			if row_doctype_details.folder_name_4:
				drive_entity_present = None
				drive_entity_present = check_folder_entity(frappe.render_template(row_doctype_details.folder_name_4,context={"doc":data}, is_path=False), drive_entity)
				if drive_entity_present is None:
					if row_doctype_details.folder_name_4 == '.YYYY.':
						drive_entity_present = create_year_folder(frappe.render_template(row_doctype_details.yearly_folder_based_on,context={"doc":data}, is_path=False), drive_entity)
					else:
						drive_entity_present = create_folder(frappe.render_template(row_doctype_details.folder_name_4,context={"doc":data}, is_path=False), drive_entity)
				drive_entity = drive_entity_present

			return drive_entity

	if drive_entity is None:
		frappe.msgprint('Bu Form için klasör tanımlanmamış! Lütfen Sistem Yöneticisiyle iletişime geçin')
	


def create_year_folder(name, parent_entity):	#Create year Folder, will be seperate year (YYYY) from standart ERPNext naming series eg. CRM-OPTY-.YYYY.-#####
	name=name[-10:]
	name=name[:4]
	year_parent_entity = create_folder(name,parent_entity)
	return year_parent_entity

def check_folder_entity(name, parent_entity):	#Check if given name is exist under the Parent Entity ID
	present_entity = None
	check_entity = frappe.get_all('Drive Entity',
		filters={
			'parent_drive_entity': parent_entity,
			'title': name,
			'is_active': 1,
			'is_group': 1
		},
		fields=['name'],
		page_length=1,
		as_list=False
	)
	if check_entity:
		present_entity = check_entity[0]['name']
	return present_entity	#If it exists returns Folder Entity

def create_folder(name, parent_entity):
	new_drive_entity: None
	new_drive_entity = check_folder_entity(name, parent_entity)
	if new_drive_entity is None:
		new_drive_entity = frappe.new_doc("Drive Entity")
		new_drive_entity.name = uuid.uuid4().hex
		new_drive_entity.title = name
		new_drive_entity.is_group = 1
		new_drive_entity.old_parent = parent_entity
		new_drive_entity.parent_drive_entity = parent_entity
		new_drive_entity.is_active = True
		new_drive_entity.color = "#98A1A9"
		new_drive_entity.insert(ignore_permissions=True)
		copy_folder_permission(new_drive_entity.name, parent_entity)
		new_drive_entity = new_drive_entity.name
	return new_drive_entity

def copy_folder(target_entity, source_entity):
	drive_entity_sub = None
	sub_folder_entity = frappe.db.get_all('Drive Entity',
		filters={
			'parent_drive_entity': source_entity,
			'is_active': 1
		},
		fields=['name', 'title', 'is_group'],
		page_length=9999,
		as_list=False
	)
	for sub_entity in sub_folder_entity:
		new_drive_entity = create_folder(sub_entity.title, target_entity)
		copy_folder_permission(new_drive_entity, sub_entity.name)
		drive_entity_sub = copy_folder(new_drive_entity, sub_entity.name)

	return drive_entity_sub


def clear_permission(new_drive_entity):
	delete_permission = frappe.db.get_all('DocShare',
				       filters={
					       'share_doctype': "Drive Entity",
						   'share_name': new_drive_entity
						   },
						   fields=['name'],
						   )
	for old_permission in delete_permission:
		frappe.delete_doc("DocShare", old_permission.name, ignore_permissions=True)

def copy_folder_permission(new_drive_entity, parent_entity):
	clear_permission(new_drive_entity)
	docshare_parent = frappe.db.get_all('DocShare',
				     filters={
					     'share_doctype': "Drive Entity",
						 'share_name': parent_entity
						 },
						 fields=['name', 'user', 'read', 'write', 'share', 'notify_by_email'],
						 page_length=9999,
						 as_list=False
						 )
	for source_share in docshare_parent:
		doc = frappe.new_doc('DocShare')
		doc.user = source_share.user
		doc.share_doctype = 'Drive Entity'
		doc.share_name = new_drive_entity
		doc.read = source_share.read
		doc.write = source_share.write
		doc.share = source_share.share
		doc.notify_by_email= source_share.notify_by_email	
		doc.insert(ignore_permissions=True)

@frappe.whitelist()
def give_folder_permission():
	drive_settings = frappe.get_doc("Drive Settings")
	doc = frappe.new_doc('DocShare')
	doc.user = drive_settings.user_name
	doc.share_doctype = 'Drive Entity'
	doc.share_name = drive_settings.folder_entity
	doc.read = 1
	doc.write = 0
	doc.share = 0
	doc.notify_by_email= 0
	doc.insert()