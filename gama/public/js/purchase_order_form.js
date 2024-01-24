frappe.ui.form.on('Purchase Order', {
    supplier(frm, cdt, cdn){
    setTimeout(() => {
    frm.set_value('buying_price_list', 'Standart Satın Alma');
    refresh_field('buying_price_list');
  },1500);
  },
    onload(frm, cdt, cdn){
    if(!frappe.user.has_role('System Manager')){
      setTimeout(() => {
        frm.remove_custom_button('Link to Material Request','Tools');
        frm.remove_custom_button('Update Rate as per Last Purchase','Tools');
        frm.remove_custom_button('Product Bundle','Get Items From');
        frm.remove_custom_button('Supplier Quotation','Get Items From');
        frm.remove_custom_button('Purchase Invoice','Create');
        frm.remove_custom_button('Subscription','Create');
        frm.remove_custom_button('Update Items');
      },50);
      }
    },
    refresh(frm, cdt, cdn){
    if(!frappe.user.has_role('System Manager')){
      setTimeout(() => {
        frm.remove_custom_button('Link to Material Request','Tools');
        frm.remove_custom_button('Update Rate as per Last Purchase','Tools');
        frm.remove_custom_button('Product Bundle','Get Items From');
        frm.remove_custom_button('Supplier Quotation','Get Items From');
        frm.remove_custom_button('Purchase Invoice','Create');
        frm.remove_custom_button('Subscription','Create');
        frm.remove_custom_button('Update Items');
      },50);
      }
    },
  
    before_submit(frm, cdt, cdn){
    if(frm.doc.purchase_qty_control===0)
    {
      msgprint("Lütfen 'Satın Alma Birimine Dönüştür' Tuşuna Basınız");
      frappe.validated = false;
    }
    },
      schedule_date(frm, cdt, cdn){
      var row = locals[cdt][cdn];
      cur_frm.doc.items.forEach(function(row) {
      frappe.model.set_value(row.doctype, row.name, 'schedule_date', frm.doc.schedule_date);
      });
      },
  
    convert_to_purchase_uom(frm, cdt, cdn){
          frm.set_value('purchase_qty_control',1);
      var row = locals[cdt][cdn];
      cur_frm.doc.items.forEach(function(row) {
      frappe.run_serially([
        () => frappe.db.get_value('Item', row.item_code, 'purchase_uom')
          .then(data => {
            frappe.model.set_value(row.doctype, row.name, 'purchase_uom', data.message.purchase_uom);
            cur_frm.refresh_field('purchase_uom');
          }),
        () => frappe.call({
            method: 'erpnext.stock.get_item_details.get_conversion_factor',
            args: {
              item_code: row.item_code,
              uom: row.purchase_uom,
              fieldname: ['conversion_factor']
            },
            callback: function (data) {
              frappe.model.set_value(row.doctype, row.name, 'purchase_conversion_factor', data.message.conversion_factor);
              frm.refresh_field('purchase_conversion_factor');
            }
          }),
          () => frappe.model.set_value(row.doctype, row.name, 'purchase_quantity',(row.qty / row.purchase_conversion_factor)),
          () => refresh_field('purchase_quantity'),
          () => cur_frm.cscript.caluclate(frm, cdt, cdn),
          () => cur_frm.cscript.caluclate2(frm, cdt, cdn)
          ]);
        });
  },
  buying_price_list(frm, cdt, cdn){
      cur_frm.cscript.fetch_rate(frm, cdt, cdn);
  },
  plc_conversion_rate(frm, cdt, cdn){
      cur_frm.cscript.fetch_rate(frm, cdt, cdn);
  },
  });
  
  frappe.ui.form.on('Purchase Order Item', {
    item_code(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
      setTimeout(() => {
              frappe.call({
                method: 'frappe.client.get_value',
                args: {
                  doctype: 'Item',
                  filters: {
                    'item_code': row.item_code,
                  },
                  fieldname: ['stock_uom']
                },
                callback: function (data) {
                frappe.model.set_value(row.doctype, row.name, 'uom', data.message.stock_uom);
              //  console.log(data.message.stock_uom);
                  cur_frm.refresh_field('uom');
                }
              });
  },150);
    cur_frm.cscript.fetch_rate(frm, cdt, cdn);
    },
    discount_percentage(frm, cdt, cdn){
    var row = locals[cdt][cdn];
  
    if(row.discount_percentage > 0)
    {
        cur_frm.cscript.caluclate(frm, cdt, cdn);
    
    }      
    },
    discount_amount_new(frm, cdt, cdn){
      var row = locals[cdt][cdn];
      frappe.model.set_value(row.doctype, row.name, 'discount_percentage', 0);
      cur_frm.refresh_field(row.discount_percentage);
      cur_frm.cscript.caluclate2(frm, cdt, cdn);
    },
    price_list_rate_new(frm, cdt, cdn){
      frappe.run_serially([
      () => cur_frm.cscript.caluclate(frm, cdt, cdn),
      () => cur_frm.cscript.caluclate2(frm, cdt, cdn)
   ]);
    },
    purchase_quantity(frm, cdt, cdn){
      cur_frm.cscript.caluclate(frm, cdt, cdn);
    },
  });
  
  cur_frm.cscript.caluclate2 = function(frm, cdt, cdn){
    var row = locals[cdt][cdn];
    var rate_new_value=0;
    row.price_list_rate = ((row.price_list_rate_new - row.discount_amount_new) / row.purchase_conversion_factor);
    cur_frm.refresh_field(row.price_list_rate);
    rate_new_value = (row.price_list_rate_new - row.discount_amount_new);
    frappe.model.set_value(row.doctype, row.name, 'rate_new', rate_new_value);
    cur_frm.refresh_field(row.rate_new);
  };
  
  cur_frm.cscript.caluclate = function(frm, cdt, cdn){
    var row = locals[cdt][cdn];
    var calculate_price_list=0;
    var rate_new_value=0;
  
      calculate_price_list = ((row.price_list_rate_new - row.discount_amount_new) / row.purchase_conversion_factor);
      frappe.model.set_value(row.doctype, row.name, 'price_list_rate', calculate_price_list);
      cur_frm.refresh_field(row.price_list_rate);
      row.discount_amount_new = ((row.price_list_rate_new * row.discount_percentage)/100);
      rate_new_value = (row.price_list_rate_new - row.discount_amount_new);
      frappe.model.set_value(row.doctype, row.name, 'rate_new', rate_new_value);
      cur_frm.refresh_field(row.rate_new);
      cur_frm.refresh_field(row.discount_amount_new);
  
  };
  
  cur_frm.cscript.fetch_rate = function(frm, cdt, cdn){
    var row = locals[cdt][cdn];
    cur_frm.doc.items.forEach(function(row) {
      setTimeout(() => {
              frappe.call({
                method: 'frappe.client.get_value',
                args: {
                  doctype: 'Item Price',
                  filters: {
                    'item_code': row.item_code,
                    'price_list': frm.doc.buying_price_list,
                  },
                  fieldname: ['price_list_rate']
                },
                callback: function (data) {
                  frappe.model.set_value(row.doctype, row.name, 'price_list_rate_new', data.message.price_list_rate);
                  cur_frm.refresh_field('price_list_rate_new');
                }
              });
  },150);
    });
  
  };
  