frappe.ui.form.on('Timesheet', {
    refresh(frm, cdt, cdn){
        if (frm.doc.custom_drive_entity){
    frm.add_custom_button(__("Drive"), function() {
        window.open(origin+'/drive/folder/'+frm.doc.custom_drive_entity);
    });
}
        
},
onload(frm,  cdt, cdn){
  setTimeout(() => {
  cur_frm.cscript.fetch_customer(frm, cdt, cdn);
  },300);
  },
});

frappe.ui.form.on('Timesheet Detail', {
refresh(frm, cdt, cdn){
},

activity_type(frm, cdt, cdn){
  var row = locals[cdt][cdn];
  cur_frm.doc.time_logs.forEach(function(row) {
    setTimeout(() => {
    frappe.model.set_value(row.doctype, row.name, 'task', frm.doc.task);
    cur_frm.refresh_field(row.task);
    cur_frm.refresh_field(row.project);
    },300);
  });
},
});

cur_frm.cscript.fetch_customer = function(frm, cdt, cdn){
frappe.call({
method: 'frappe.client.get_value',
args: {
  doctype: 'Project',
  filters: {
    'project_name': frm.doc.project,
  },
  fieldname: ['customer']
},
callback: function (data) {
  frm.set_value('customer',data.message.customer);
  refresh_field(frm.doc.customer);
},
});
};
