frappe.ui.form.on('Stock Reconciliation', {
	refresh(frm) {
	
	},
	
control(frm, cdt, cdn){
  var row = locals[cdt][cdn];
  cur_frm.doc.items.forEach(function(row) {
    if(row.valuation_rate===0)
    {
      frappe.model.set_value(row.doctype, row.name, 'valuation_rate', 1);
      cur_frm.refresh_field('valuation_rate');
    }
  });
},
});


frappe.ui.form.on('Stock Reconciliation Item', {
	refresh(frm) {
		
	}
});