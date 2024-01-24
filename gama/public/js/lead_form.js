frappe.ui.form.on('Lead', {
	refresh(frm) {
		if(!frappe.user.has_role('System Manager')){
			setTimeout(() => {
			frm.remove_custom_button('Quotation','Create');
			},50);
			}
	},
	onload(frm) {
		if(!frappe.user.has_role('System Manager')){
			setTimeout(() => {
			frm.remove_custom_button('Quotation','Create');

			},50);
			}
	}
});
