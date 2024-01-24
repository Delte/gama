frappe.ui.form.on('Quotation', {
    onload (frm){
      setTimeout(() => {
      frm.remove_custom_button('Subscription','Create');
      },50);
  
      if(frm.is_new() && !frm.doc.opportunity && !frappe.user.has_role('System Manager')){
        frm.disable_save();
        frappe.msgprint('Teklif oluşturamazsınız! Lütfen yönlendirildiğiniz sayfandan öncelikle <b>Fırsat</b> oluşturun.');
        frappe.new_doc('Opportunity');
      }
    },
    refresh(frm){
        if (frm.doc.custom_drive_entity){
            frm.add_custom_button(__("Drive"), function() {
                window.open(origin+'/drive/folder/'+frm.doc.custom_drive_entity);
            });
        }
        if(!frappe.user.has_role('System Manager')){
        setTimeout(() => {
        frm.remove_custom_button('Subscription','Create');
        },50);
        if(frm.doc.docstatus==1){
          cur_frm.set_df_property('description','read_only',1);
          cur_frm.set_df_property('title','read_only',1);
          cur_frm.set_df_property('shipping_address_name','read_only',1);
  
        }
       }
    },
    before_save (frm, cdt, cdn){
      frm.set_value('title',frm.doc.abbr+' - '+frm.doc.address_title+' - '+frm.doc.city);
      refresh_field('title');
      cur_frm.cscript.calculate(frm, cdt, cdn);
    },
    calculate (frm, cdt, cdn){
  
      cur_frm.cscript.calculate(frm, cdt, cdn);
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
              if (frm.doc.quotation_to == 'Customer')
              cur_frm.set_value('abbr',data.message.abbr);
              if (frm.doc.quotation_to == 'Lead')
              cur_frm.set_value('abbr','CRM');
              refresh_field(frm.doc.abbr);
            },
          });
        },
      });
    },
  });
  frappe.ui.form.on('Quotation Item', {
    item_code(frm, cdt, cdn) {
      cur_frm.cscript.fetch_rate(frm, cdt, cdn);
    },
  });
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
  cur_frm.cscript.fetch_title = function(frm){
    if (frm.doc.opportunity_from == 'Customer'){
      frappe.call({
        method: 'frappe.client.get_value',
        args: {
          doctype: 'Customer',
          filters: {
            'customer_name': frm.doc.customer_name,
          },
          fieldname: ['abbr']
        },
        callback: function (data) {
          frm.set_value('abbr',data.message.abbr);
        }
      });
    }
    else{
      frm.set_value('abbr','CRM');
    }
    frappe.run_serially([
      () => frappe.call({
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
        }
      }),
      () => frm.set_value('title',frm.doc.abbr+' - '+frm.doc.address_title+' - '+frm.doc.city)
    ]);
  };
  