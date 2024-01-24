frappe.ui.form.on('Issue', {
	onload(frm) {
		if(!frappe.user.has_role('System Manager') && !frappe.user.has_role('Quality Assurance Manager')){
			setTimeout(() => {
	  frm.remove_custom_button('Task','Make');
	  frm.remove_custom_button('Close');
		frm.set_df_property('additional_info','hidden',1);
	  $("[data-doctype='Task']").hide();
  },100);
	  frm.set_df_property('subject','read_only',1);
	  frm.set_df_property('subject','hidden',1);
	}
	},
	refresh(frm) {
	    if (frm.doc.custom_drive_entity){
    frm.add_custom_button(__("Drive"), function() {
        window.open(origin+'/drive/folder/'+frm.doc.custom_drive_entity);
    });
}
		if(!frappe.user.has_role('System Manager') && !frappe.user.has_role('Quality Assurance Manager')){
			setTimeout(() => {
	  frm.remove_custom_button('Task','Make');
	  frm.remove_custom_button('Close');
		frm.set_df_property('additional_info','hidden',1);
	  $("[data-doctype='Task']").hide();
  },100);
	}
	},

	notification_type(frm) {
		if(!frappe.user.has_role('System Manager') && !frappe.user.has_role('Quality Assurance Manager')){
			frm.set_df_property('item_name','read_only',1);
		if(frm.doc.notification_type == 'NCA')
			{
			frm.set_df_property("description", "reqd", 0);
			frm.set_df_property("descrip", "reqd", 1);
			frm.set_df_property("item_code", "reqd", 1);
			frm.set_df_property("project_new", "reqd", 1);
			frm.set_df_property("sales_order", "reqd", 1);
			}
			else if (frm.doc.notification_type == 'Other')
			{
			frm.set_df_property('additional_info','hidden',0);
			frm.set_df_property("descrip", "reqd", 0);
			frm.set_df_property("description", "reqd", 1);
			}
		}
	},
	before_save(frm){
	frm.set_value('subject',frm.doc.name);
		refresh_field('subject');
		if(frm.doc.notification_type === '' || frm.doc.notification_type === '' )
		{
			msgprint("Lütfen 'Bildirim Tipi' Seçimini Yapınız");
			frappe.validated = false;
		}
  },
	
	project_new(frm) {
	    frm.set_value('sales_order', '');
		cur_frm.set_query('sales_order', function() {
			return{
				filters: {
					'project': frm.doc.project_new,
					'status' : ["in", "To Deliver and Bill,To Bill,To Deliver,Completed"],
				}
			};
		});
		
},

	item_code(frm) {
		frm.set_df_property('item_name','read_only',1);
	},
	shipping_cost(frm) {
		frm.cscript.calculate(frm);
		frm.refresh_field('total_cost');
	},
	material_total_cost(frm) {
		frm.cscript.calculate(frm);
		frm.refresh_field('total_cost');
	},
	labor_total_cost(frm) {
		frm.cscript.calculate(frm);
		frm.refresh_field('total_cost');
	},
});

cur_frm.cscript.calculate = function(frm){
	frm.set_value('total_cost', (frm.doc.shipping_cost + frm.doc.material_total_cost + frm.doc.labor_total_cost));
	frm.refresh_field('total_cost');
};
