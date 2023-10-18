// Copyright (c) 2023, Gama Reklam San. ve Tic. and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gama Drive Settings', {
	refresh(frm) {
	},
	create(frm){
		console.log(frm.doc.project_folder_create);
		frappe.call({
			method: "gama.api.drive.utils.manage_project_folders",
			args: {
				project: frm.doc.project_folder_create
			}
		});
	},
	remove(frm){
		console.log(frm.doc.project_folder_remove);
		frappe.call({
			method: "gama.api.drive.utils.manage_project_folders",
			args: {
				project: frm.doc.project_folder_remove,
				operation: 'remove'
			}
		});
	}
});