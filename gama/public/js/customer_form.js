frappe.ui.form.on('Customer', {
	refresh(frm) {
	},
  before_save(frm){
		if(frm.is_new()){
			if(frm.doc.territory == 'Yurt Dışı'){
				frm.set_value('dn_required', '1');
			}
			else if(frm.doc.territory == 'Yurt İçi'){
				frm.set_value('dn_required', '0');
			}
		}
  },
});
