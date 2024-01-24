frappe.ui.form.on('Request for Quotation', {
    refresh(frm) {
      setTimeout(() => {
        frm.remove_custom_button('Opportunity','Get items from');
      },300);
    },
    convert_to_purchase_uom(frm, cdt, cdn){
      cur_frm.cscript.convert_to_uom(frm, cdt, cdn);
    },
    apply_group_filter(frm, cdt, cdn) {
      cur_frm.cscript.filter(frm, cdt, cdn);
    },
  });
  frappe.ui.form.on('Request for Quotation Item', {
    uom (frm, cdt, cdn){
      var row = locals[cdt][cdn];
      if (row.uom == row.stock_uom){
        frappe.model.set_value(row.doctype, row.name, 'qty', row.req_qty);
      }
      else {
        cur_frm.cscript.calculate(frm, cdt, cdn);
      }
    },
    item_code (frm, cdt, cdn){
      cur_frm.cscript.calculate(frm, cdt, cdn);
    },
  });
  cur_frm.cscript.filter = function(frm, cdt, cdn){
    var row = locals[cdt][cdn];
    var tbl = frm.doc.items || [];
    var i = tbl.length;
    while (i--) {
      if(frm.doc.items[i].item_group != frm.doc.item_group ) {
        cur_frm.get_field("items").grid.grid_rows[i].remove();
        frm.refresh_field("items");
      }
    }
  };
  cur_frm.cscript.calculate = function(frm, cdt, cdn){
    console.log('calculate');
    var row = locals[cdt][cdn];
    setTimeout(function () {
      frappe.model.set_value(row.doctype, row.name, 'qty', (row.req_qty * (1 / row.conversion_factor)));
      cur_frm.refresh_field('qty');
    }, 300);
  };
  cur_frm.cscript.convert_to_uom = function(frm, cdt, cdn){
    var row = locals[cdt][cdn];
    cur_frm.doc.items.forEach(function(row) {
      frappe.model.set_value(row.doctype, row.name, 'uom','');
      frappe.db.get_value('Item', row.item_code, 'purchase_uom')
      .then(data => {
        frappe.model.set_value(row.doctype, row.name, 'uom', data.message.purchase_uom);
        cur_frm.refresh_field('uom');
      });
    });
  };