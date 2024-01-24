frappe.ui.form.on('Installation Note', {
	refresh(frm) {
if (frm.doc.custom_drive_entity){
    frm.add_custom_button(__("Drive"), function() {
        window.open(origin+'/drive/folder/'+frm.doc.custom_drive_entity);
    });
}
}
});