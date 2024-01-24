frappe.ui.form.on('Task', {
    refresh(frm) {
        if (frm.doc.custom_drive_entity){
      frm.add_custom_button(__("Drive"), function() {
          window.open(origin+'/drive/folder/'+frm.doc.custom_drive_entity);
      });
  }
      if(!frappe.user.has_role('System Manager'))
      {
        cur_frm.set_df_property('subject','read_only',1);
        cur_frm.set_df_property('project','read_only',1);
        cur_frm.set_df_property('address_name','read_only',1);
        cur_frm.set_df_property('opportunity','read_only',1);
        cur_frm.set_df_property('description','read_only',1);
        cur_frm.set_df_property('sales_order','read_only',1);
        cur_frm.set_df_property('type','read_only',1);
        cur_frm.set_df_property('color','read_only',1);
        cur_frm.set_df_property('parent_task','read_only',1);
        cur_frm.set_df_property('sb_more_info','hidden',1);
        cur_frm.set_df_property('priority','read_only',1);
  
      }
      cur_frm.add_fetch('team_chief','employee_name','team_chief_name');
      if(frappe.user.has_role('Engineering User') || frappe.user.has_role('Installation User'))
      {
          $(".form-assignments").hide();
          $(".form-attachments").hide();
  
      }
    },
    
    onload(frm)
      {
       if(frappe.user.has_role('Shipment & Installation Manager') ||frappe.user.has_role('System Manager'))
       {
        setTimeout(() => {
          cur_frm.set_df_property('vehicle','read_only',0);
          cur_frm.set_df_property('driver','read_only',0);
          cur_frm.set_df_property('team_chief','read_only',0);
          cur_frm.set_df_property('team_chief_name','read_only',0);
          cur_frm.set_df_property('team','read_only',0);
        },300);
    }
    if(frappe.user.has_role('Engineering User') || frappe.user.has_role('Installation User'))
      {
         $(".form-assignments").hide();
         $(".form-attachments").hide();
      }
      },
    after_save(frm) {
      if (frm.doc.type == 'Fiyat Analizi'){
        frappe.call({
          method: 'frappe.client.set_value',
          args: {
            doctype: 'Opportunity',
            name: frm.doc.opportunity,
            fieldname: 'price_analysis_status',
            value: frm.doc.status,
          },
        });
      }
      if (frm.doc.type == 'Survey'){
        frappe.call({
          method: 'frappe.client.set_value',
          args: {
            doctype: 'Opportunity',
            name: frm.doc.opportunity,
            fieldname: 'survey_status',
            value: frm.doc.status,
          },
        });
      }
      if (frm.doc.type == 'Teklif Çizimi'){
        frappe.call({
          method: 'frappe.client.set_value',
          args: {
            doctype: 'Opportunity',
            name: frm.doc.opportunity,
            fieldname: 'proposal_drawing_status',
            value: frm.doc.status,
          },
        });
      }
      if (frm.doc.type == 'Grafik Teklif Çizimi'){
        frappe.call({
          method: 'frappe.client.set_value',
          args: {
            doctype: 'Opportunity',
            name: frm.doc.opportunity,
            fieldname: 'graphics_proposal_drawing_status',
            value: frm.doc.status,
          },
        });
      }
      if (frm.doc.type == 'Mühendislik Teklif Çizimi'){
        frappe.call({
          method: 'frappe.client.set_value',
          args: {
            doctype: 'Opportunity',
            name: frm.doc.opportunity,
            fieldname: 'engineering_proposal_drawing_status',
            value: frm.doc.status,
          },
        });
      }
    },
    before_save(frm)
    {
        frm.set_value('task_new', 'False');
    },
  });
  frappe.ui.form.on('Team', {
    employee(frm, cdt, cdn) {
      cur_frm.add_fetch('employee','employee_name','employee_name');
    },
  });
  