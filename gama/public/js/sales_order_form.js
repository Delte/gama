frappe.ui.form.on('Sales Order', {
    refresh(frm){
      setTimeout(() => {
        cur_frm.page.remove_inner_button(__('Subscription'),  __('Create'));
      },100);
      if (frm.doc.custom_drive_entity){
      frm.add_custom_button(__("Drive"), function() {
          window.open(origin+'/drive/folder/'+frm.doc.custom_drive_entity);
      });
  }
      if (frappe.user.has_role('System Manager')){
          frm.add_custom_button(__('Create Engineering Production Drawing'), function() {
          frappe.db.insert({doctype: 'Task',  'subject': 'Mühendislik Üretim Çizimi - '+frm.doc.title, 'project': frm.doc.project, 'sales_order': frm.doc.name,'customer':frm.doc.customer, 'opportunity_owner':frm.doc.opportunity_owner, 'task_new':"True", 'department': 'Mühendislik - GAMA', 'address_name':frm.doc.shipping_address_name, 'address_display': frm.doc.shipping_address, 'description': frm.doc.description, 'type': 'Mühendislik Üretim Çizimi', 'abbr': frm.doc.abbr, 'custom_drive_entity': frm.doc.custom_drive_entity });
          frappe.db.set_value('Project', frm.doc.project, 'percent_complete_method', 'Task Completion');
          frm.save();
        }, __("Create Task"));
          frm.add_custom_button(__('Create Installation / Service'), function() {
          frappe.db.insert({doctype: 'Task', 'subject': 'Montaj / Servis - '+frm.doc.title, 'project': frm.doc.project, 'sales_order': frm.doc.name,'customer':frm.doc.customer, 'opportunity_owner':frm.doc.opportunity_owner, 'task_new':"True", 'department': 'Dış Montaj - GAMA', 'address_name':frm.doc.shipping_address_name, 'address_display': frm.doc.shipping_address, 'description': frm.doc.description, 'exp_end_date': frm.doc.installation_date, 'type': 'Montaj / Servis', 'abbr': frm.doc.abbr, 'custom_drive_entity': frm.doc.custom_drive_entity});
          frappe.db.set_value('Project', frm.doc.project, 'percent_complete_method', 'Task Completion');
          frm.save();
        }, __("Create Task"));
        frm.add_custom_button(__('Create Inspection Task'), function() {
        frappe.db.insert({doctype: 'Task', 'subject': 'Denetleme - '+frm.doc.title, 'project': frm.doc.project, 'sales_order': frm.doc.name,'customer':frm.doc.customer, 'opportunity_owner':frm.doc.opportunity_owner, 'task_new':"True", 'department': 'Dış Montaj - GAMA', 'address_name':frm.doc.shipping_address_name, 'address_display': frm.doc.shipping_address, 'description': frm.doc.description, 'exp_end_date': frm.doc.installation_date, 'type': 'Montaj / Servis', 'abbr': frm.doc.abbr, 'custom_drive_entity': frm.doc.custom_drive_entity});
        frappe.db.set_value('Project', frm.doc.project, 'percent_complete_method', 'Task Completion');
        frm.save();
      }, __("Create Task"));
      }
      if(frappe.user.has_role('Shipment & Installation Manager')){
          frm.add_custom_button(__('Create Installation / Service'), function() {
          frappe.db.insert({doctype: 'Task', 'subject': 'Montaj / Servis - '+frm.doc.title, 'project': frm.doc.project, 'sales_order': frm.doc.name,'customer':frm.doc.customer, 'opportunity_owner':frm.doc.opportunity_owner, 'task_new':"True", 'department': 'Dış Montaj - GAMA', 'address_name':frm.doc.shipping_address_name, 'address_display': frm.doc.shipping_address, 'description': frm.doc.description, 'exp_end_date': frm.doc.installation_date, 'type': 'Montaj / Servis', 'abbr': frm.doc.abbr, 'custom_drive_entity': frm.doc.custom_drive_entity});
          frappe.db.set_value('Project', frm.doc.project, 'percent_complete_method', 'Task Completion');
          frm.save();
        }, __("Create Task"));
        frm.add_custom_button(__('Create Inspection Task'), function() {
        frappe.db.insert({doctype: 'Task', 'subject': 'Denetleme - '+frm.doc.title, 'project': frm.doc.project, 'sales_order': frm.doc.name,'customer':frm.doc.customer, 'opportunity_owner':frm.doc.opportunity_owner, 'task_new':"True", 'department': 'Dış Montaj - GAMA', 'address_name':frm.doc.shipping_address_name, 'address_display': frm.doc.shipping_address, 'description': frm.doc.description, 'exp_end_date': frm.doc.installation_date, 'type': 'Montaj / Servis', 'abbr': frm.doc.abbr, 'custom_drive_entity': frm.doc.custom_drive_entity});
        frappe.db.set_value('Project', frm.doc.project, 'percent_complete_method', 'Task Completion');
        frm.save();
      }, __("Create Task"));
      }
      if(frappe.user.has_role('Engineering Manager')){
        frm.add_custom_button(__('Create Engineering Production Drawing'), function() {
        frappe.db.insert({doctype: 'Task',  'subject': 'Mühendislik Üretim Çizimi - '+frm.doc.title, 'project': frm.doc.project, 'sales_order': frm.doc.name,'customer':frm.doc.customer, 'opportunity_owner':frm.doc.opportunity_owner, 'task_new':"True", 'department': 'Mühendislik - GAMA', 'address_name':frm.doc.shipping_address_name, 'address_display': frm.doc.shipping_address, 'description': frm.doc.description, 'type': 'Mühendislik Üretim Çizimi', 'abbr': frm.doc.abbr, 'custom_drive_entity': frm.doc.custom_drive_entity});
        frappe.db.set_value('Project', frm.doc.project, 'percent_complete_method', 'Task Completion');
        frm.save();
      }, __("Create Task"));
      }
        
      if (!frappe.user.has_role('Planning User')){
        frm.remove_custom_button('Update Items');
        if (frm.doc.docstatus==1)
        cur_frm.set_df_property('delivery_date','read_only',1);
      }
      if (!frappe.user.has_role('Shipment & Installation Manager')){
        if (frm.doc.docstatus==1)
        cur_frm.set_df_property('installation_date','read_only',1);
      }
      if (!frappe.user.has_role('System Manager')){
      cur_frm.set_df_property('title','read_only',1);
      if(frm.doc.docstatus==1){
      cur_frm.set_df_property('description','read_only',1);
      cur_frm.set_df_property('title','read_only',1);
      cur_frm.set_df_property('shipping_address_name','read_only',1);
      cur_frm.set_df_property('customer_address','read_only',1);
        }
        if (frappe.user.has_role('Sales & Marketing Manager') || frappe.user.has_role('Sales User')){
          setTimeout(() => {
            cur_frm.page.remove_inner_button(__('Hold'),  __('Status'));
            cur_frm.page.remove_inner_button(__('Close'),  __('Status'));
            cur_frm.page.remove_inner_button(__('Pick List'),  __('Create'));
                      if(frm.doc.territory == 'Yurt İçi')
                      {
                  cur_frm.page.remove_inner_button(__('Sales Invoice'),  __('Create'));
                      }
            cur_frm.page.remove_inner_button(__('Delivery Note'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Work Order'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Material Request'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Request for Raw Materials'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Purchase Order'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Project'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Payment Request'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Payment'),  __('Create'));
          },100);
        }
        else if (frappe.user.has_role('Shipment & Installation Manager') || frappe.user.has_role('Shipment User')){
          setTimeout(() => {
            cur_frm.page.remove_inner_button(__('Hold'),  __('Status'));
            cur_frm.page.remove_inner_button(__('Close'),  __('Status'));
            cur_frm.page.remove_inner_button(__('Work Order'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Sales Invoice'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Material Request'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Request for Raw Materials'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Purchase Order'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Project'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Payment Request'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Payment'),  __('Create'));
          },100);
        }
        else if (frappe.user.has_role('Survey User') || frappe.user.has_role('Installation User')){
          setTimeout(() => {
            cur_frm.page.remove_inner_button(__('Hold'),  __('Status'));
            cur_frm.page.remove_inner_button(__('Close'),  __('Status'));
            cur_frm.page.remove_inner_button(__('Pick List'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Delivery Note'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Work Order'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Invoice'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Material Request'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Request for Raw Materials'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Purchase Order'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Project'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Payment Request'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Payment'),  __('Create'));
          },100);
        }
        else if (frappe.user.has_role('Accounts User') || frappe.user.has_role('Accounts Manager')){
          setTimeout(() => {
            cur_frm.page.remove_inner_button(__('Hold'),  __('Status'));
            cur_frm.page.remove_inner_button(__('Close'),  __('Status'));
            cur_frm.page.remove_inner_button(__('Pick List'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Work Order'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Material Request'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Request for Raw Materials'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Project'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Purchase Order'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Project'),  __('Create'));
          },100);
        }
        else if (frappe.user.has_role('Manufacturing User') || frappe.user.has_role('Manufacture Manager')){
          setTimeout(() => {
            cur_frm.page.remove_inner_button(__('Hold'),  __('Status'));
            cur_frm.page.remove_inner_button(__('Close'),  __('Status'));
            cur_frm.page.remove_inner_button(__('Pick List'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Delivery Note'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Invoice'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Purchase Order'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Project'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Payment Request'),  __('Create'));
            cur_frm.page.remove_inner_button(__('Payment'),  __('Create'));
          },100);
        }
      }
    },
    onload (frm){
      if(frm.is_new() && !frm.doc.project && !frappe.user.has_role('System Manager')){
        frm.disable_save();
        frappe.msgprint('Satış Siparişi oluşturamazsınız! Lütfen yönlendirildiğiniz sayfandan sırası ile <b>Fırsat</b> ve daha sonra <b>Teklif</b> oluşturun.');
        frappe.new_doc('Opportunity');
      }
      else if (frappe.user.has_role('Sales & Marketing Manager') || frappe.user.has_role('Sales User')){
        setTimeout(() => {
          if(frm.doc.territory == 'Yurt İçi')
          {
            cur_frm.page.remove_inner_button(__('Sales Invoice'),  __('Create'));
          }
        },100);
  
      }
    },
    before_save (frm,  cdt, cdn){
      frm.set_value('title',frm.doc.abbr+' - '+frm.doc.address_title+' - '+frm.doc.city);
      refresh_field('title');
      cur_frm.cscript.calculate(frm, cdt, cdn);
    },
    before_submit(frm){
      cur_frm.cscript.create_tasks(frm);
      cur_frm.cscript.add_project_info(frm);
    },
    before_cancel(frm){
      cur_frm.cscript.cancel_tasks(frm);
    },
    shipping_address_name(frm){
      frappe.call({
        method: 'frappe.client.get_value',
        args: {
          doctype: 'Address',
          filters: {
            'name': frm.doc.shipping_address_name,
          },
          fieldname: ['address_title','city']
        },
        callback: function (data) {
          frm.set_value('address_title',data.message.address_title);
          frm.set_value('city',data.message.city);
          frappe.call({
            method: 'frappe.client.get_value',
            args: {
              doctype: 'Customer Group',
              filters: {
                'customer_group_name': frm.doc.customer_group,
              },
              fieldname: ['abbr']
            },
            callback: function (data) {
              cur_frm.set_value('abbr',data.message.abbr);
              refresh_field(frm.doc.abbr);
            },
          });
        },
      });
    },
    delivery_date(frm, cdt, cdn){
      var row = locals[cdt][cdn];
      cur_frm.doc.items.forEach(function(row) {
        frappe.model.set_value(row.doctype, row.name, 'delivery_date', frm.doc.delivery_date);
      });
    },
    calculate (frm, cdt, cdn){
      cur_frm.cscript.calculate(frm, cdt, cdn);
    },
  });
  frappe.ui.form.on('Sales Order Item', {
    item_code(frm, cdt, cdn) {
      cur_frm.cscript.fetch_rate(frm, cdt, cdn);
    },
  });
  cur_frm.cscript.create_tasks = function(frm){
    if (frm.doc.engineering_production_drawing == 1 || frm.doc.installation_service == 1 || frm.doc.graphic_production_drawing == 1)
    frappe.db.set_value('Project', frm.doc.project, 'percent_complete_method', 'Task Completion');
  if (frm.doc.engineering_production_drawing == 1)
    frappe.db.insert({doctype: 'Task',  'subject': 'Mühendislik Üretim Çizimi - '+frm.doc.title, 'project': frm.doc.project,  'sales_order': frm.doc.name,'customer':frm.doc.customer, 'opportunity_owner':frm.doc.opportunity_owner, 'task_new':"True", 'department': 'Mühendislik - GAMA', 'address_name':frm.doc.shipping_address_name, 'address_display': frm.doc.shipping_address, 'description': frm.doc.description, 'type': 'Mühendislik Üretim Çizimi', 'abbr': frm.doc.abbr, 'custom_drive_entity': frm.doc.custom_drive_entity});
    if (frm.doc.graphic_production_drawing == 1)
    frappe.db.insert({doctype: 'Task',  'subject': 'Grafik Üretim Çizimi - '+frm.doc.title, 'project': frm.doc.project,  'sales_order': frm.doc.name,'customer':frm.doc.customer, 'opportunity_owner':frm.doc.opportunity_owner, 'task_new':"True", 'department': 'Mühendislik - GAMA', 'address_name':frm.doc.shipping_address_name, 'address_display': frm.doc.shipping_address, 'description': frm.doc.description, 'type': 'Grafik Üretim Çizimi', 'abbr': frm.doc.abbr, 'custom_drive_entity': frm.doc.custom_drive_entity});
    if (frm.doc.installation_service == 1)
    frappe.db.insert({doctype: 'Task', 'subject': 'Montaj / Servis - '+frm.doc.title, 'project': frm.doc.project, 'sales_order': frm.doc.name,'customer':frm.doc.customer, 'opportunity_owner':frm.doc.opportunity_owner, 'task_new':"True", 'department': 'Dış Montaj - GAMA', 'address_name':frm.doc.shipping_address_name, 'address_display': frm.doc.shipping_address, 'description': frm.doc.description, 'exp_end_date': frm.doc.installation_date, 'type': 'Montaj / Servis', 'abbr': frm.doc.abbr, 'custom_drive_entity': frm.doc.custom_drive_entity});
    frappe.show_alert({message:__('Görevler Oluşturuldu'), indicator:'green'}, 5);
  };
  cur_frm.cscript.fetch_rate = function(frm, cdt, cdn){
    var row = locals[cdt][cdn];
    if (row.item_code && !row.item_rate && !row.installation_rate){
      frappe.call({
        method: 'frappe.client.get_value',
        args: {
          doctype: 'Item Price',
          filters: {
            'item_code': row.item_code,
            'price_list': frm.doc.selling_price_list,
          },
          fieldname: ['item_rate','installation_rate']
        },
        callback: function (data) {
          frappe.model.set_value(cdt, cdn, 'item_rate', data.message.item_rate);
          frappe.model.set_value(cdt, cdn, 'installation_rate', data.message.installation_rate);
          frm.refresh_field('item_rate');
          frm.refresh_field('installation_rate');
        }
      });
    }
  };
  cur_frm.cscript.add_project_info = function(frm){
    frappe.call({
      method: 'frappe.client.set_value',
      args: {
        doctype: 'Project',
        name: frm.doc.project,
        fieldname: 'customer',
        value: frm.doc.customer
      },
    });
  };
  cur_frm.cscript.cancel_tasks = function(frm){
    frappe.run_serially([
      () => frappe.call({
        method: 'frappe.client.get_value',
        args: {
          doctype: 'Task',
          filters: {
            'project': frm.doc.project,
            'sales_order': frm.doc.name,
            'type': 'Montaj / Servis',
          },
          fieldname: ['name','status']
        },
        callback: function (data) {
          if (data.message.status == 'Open' || data.message.status == 'Overdue')
          frappe.call({
            method: 'frappe.client.set_value',
            args: {
              doctype: 'Task',
              'name': data.message.name,
              fieldname: {
                'status': 'Cancelled'
              },
            }
          });
        }
      }),
      () => frappe.call({
        method: 'frappe.client.get_value',
        args: {
          doctype: 'Task',
          filters: {
            'project': frm.doc.project,
            'sales_order': frm.doc.name,
            'type': 'Mühendislik Üretim Çizimi',
          },
          fieldname: ['name','status']
        },
        callback: function (data) {
          if (data.message.status == 'Open' || data.message.status == 'Overdue')
          frappe.call({
            method: 'frappe.client.set_value',
            args: {
              doctype: 'Task',
              'name': data.message.name,
              fieldname: {
                'status': 'Cancelled'
              },
            }
          });
        }
      }),
      () => frappe.call({
        method: 'frappe.client.get_value',
        args: {
          doctype: 'Task',
          filters: {
            'project': frm.doc.project,
            'sales_order': frm.doc.name,
            'type': 'Grafik Üretim Çizimi',
          },
          fieldname: ['name','status']
        },
        callback: function (data) {
          if (data.message.status == 'Open' || data.message.status == 'Overdue')
          frappe.call({
            method: 'frappe.client.set_value',
            args: {
              doctype: 'Task',
              'name': data.message.name,
              fieldname: {
                'status': 'Cancelled'
              },
            }
          });
        }
      })
    ]);
  };
  cur_frm.cscript.calculate = function(frm, cdt, cdn){
    var row = locals[cdt][cdn];
    var total_item = 0;
    var total_installation = 0;
    cur_frm.doc.items.forEach(function(row) {
      frappe.model.set_value(row.doctype, row.name, 'rate', (row.item_rate + row.installation_rate));
      total_item += (row.item_rate * row.qty);
      total_installation += (row.installation_rate * row.qty);
    });
    cur_frm.set_value('total_item_rate', total_item);
    cur_frm.set_value('total_installation_rate', total_installation);
    cur_frm.refresh_field('rate');
    cur_frm.refresh_field('total_item_rate');
    cur_frm.refresh_field('total_installation_rate');
  };