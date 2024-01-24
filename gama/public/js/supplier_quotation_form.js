frappe.ui.form.on('Supplier Quotation', {
	refresh(frm) {
		setTimeout(() => {
			$("[data-doctype='Material Request']").hide();
			$("[data-doctype='Quotation']").hide();
			$("[data-doctype='Auto Repeat']").hide();
			frm.remove_custom_button('Quotation','Create');
			frm.remove_custom_button('Subscription','Create');
			frm.set_value('buying_price_list','Standart Satın Alma');
			refresh_field('buying_price_list');
		},500);
	},
	onload(frm, cdt, cdn){
		cur_frm.cscript.calculate(frm, cdt, cdn);
	},
	apply_group_filter(frm, cdt, cdn){
		cur_frm.cscript.filter(frm, cdt, cdn);
	},
	convert_to_purchase_uom(frm, cdt, cdn){
		cur_frm.cscript.convert_uom(frm, cdt, cdn);
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
cur_frm.cscript.convert_uom = function(frm, cdt, cdn)
{
	var row = locals[cdt][cdn];
	cur_frm.doc.items.forEach(function(row) {
		frappe.model.set_value(row.doctype, row.name, 'request_for_quantity', row.qty);
		frappe.model.set_value(row.doctype, row.name, 'uom','');
		frappe.db.get_value('Item', row.item_code, 'purchase_uom')
		.then(data => {
			console.log(row.item_code);
			console.log(data.message.default_purchase_unit_of_measure_2);
			frappe.model.set_value(row.doctype, row.name, 'uom', data.message.purchase_uom);
			cur_frm.refresh_field('uom');
			cur_frm.refresh_field('conversion_factor');
			
		});
	});
};
frappe.ui.form.on('Supplier Quotation Item', {
	uom (frm, cdt, cdn) {
		cur_frm.cscript.calculate_discount(frm, cdt, cdn);
	},
	price_list_rate (frm, cdt, cdn) {
		cur_frm.cscript.calculate_discount(frm, cdt, cdn);
	},
	item_code (frm, cdt, cdn){
		cur_frm.cscript.calculate(frm, cdt, cdn);
	},
	req_qty (frm, cdt, cdn){
		cur_frm.cscript.calculate(frm, cdt, cdn);
	},
	qty (frm, cdt, cdn){
		cur_frm.cscript.calculate_discount(frm, cdt, cdn);
	},
});
cur_frm.cscript.calculate = function(frm, cdt, cdn){
	var row = locals[cdt][cdn];
	cur_frm.doc.items.forEach(function(row) {
		frappe.model.set_value(row.doctype, row.name, 'uom','');
		frappe.db.get_value('Item', row.item_code, 'purchase_uom')
		.then(data => {
			frappe.model.set_value(row.doctype, row.name, 'uom', data.message.purchase_uom);
			cur_frm.refresh_field('uom');
		});
		frappe.model.set_value(row.doctype, row.name, 'qty', (row.req_qty * (1 / row.conversion_factor)));
	});
	cur_frm.refresh_field('qty');
};
cur_frm.cscript.calculate_discount = function(frm, cdt, cdn){
	setTimeout(function () {
		var row = locals[cdt][cdn];
		row.rate = flt(row.price_list_rate * (1 - row.discount_percentage / 100.0));
		frappe.model.set_value(cdt, cdn, "amount", flt(row.rate * row.qty));
		refresh_field("items");
	}, 300);
};