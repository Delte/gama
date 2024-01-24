frappe.ui.form.on('Price Analysis', {
	refresh(frm) {

	},
	item(frm) {

	},
	onload(frm) {
		cur_frm.set_query('item', function() {
			return{
				filters: {
					'item_group' : ["in", "Mamül, Yarı Mamül, Hizmet, Servis"],
				}
			};
		});
		//	cur_frm.set_df_property('internal_operation_total_try','hidden',1);
		//	cur_frm.set_df_property('external_operation_total_try','hidden',1);
		//	cur_frm.set_df_property('total_amount_try','hidden',1);
		//	cur_frm.set_df_property('operating_cost_try','hidden',1);
      //cur_frm.set_df_property('installation_cost_try','hidden',1);
      //cur_frm.set_df_property('shipment_cost_try','hidden',1);
		//	cur_frm.set_df_property('base_total_cost','hidden',1);
      //cur_frm.set_df_property('conversion_rate','hidden',0);
	},
  project(frm, cdt, cdn){
    frm.set_value('opportunity','');
    refresh_field('opportunity');
    cur_frm.set_query('opportunity', function() {
      return{
        filters: {
          'project': frm.doc.project,
        }
      };
    });

  },


  fetch_internal_operation(frm, cdt, cdn){
    var ws1 = frappe.model.add_child(cur_frm.doc, "Price Analysis Internal Operation", "internal_operation");
    ws1.operation = 'Genel';
    ws1.workstation = 'Hafif Metal';
    refresh_field('internal_operation');
    var ws2 = frappe.model.add_child(cur_frm.doc, "Price Analysis Internal Operation", "internal_operation");
    ws2.operation = 'Genel';
    ws2.workstation = 'Ağır Metal';
    refresh_field('internal_operation');
    var ws3 = frappe.model.add_child(cur_frm.doc, "Price Analysis Internal Operation", "internal_operation");
    ws3.operation = 'Genel';
    ws3.workstation =  'Plastik';
    refresh_field('internal_operation');
    var ws4 = frappe.model.add_child(cur_frm.doc, "Price Analysis Internal Operation", "internal_operation");
    ws4.operation = 'Genel';
    ws4.workstation =  'Boyahane';
    refresh_field('internal_operation');
    var ws5 = frappe.model.add_child(cur_frm.doc, "Price Analysis Internal Operation", "internal_operation");
    ws5.operation = 'Genel';
    ws5.workstation = 'Grafik';
    refresh_field('internal_operation');
    var ws6 = frappe.model.add_child(cur_frm.doc, "Price Analysis Internal Operation", "internal_operation");
    ws6.operation = 'Genel';
    ws6.workstation = 'Elektrik';
    refresh_field('internal_operation');
    var ws7 = frappe.model.add_child(cur_frm.doc, "Price Analysis Internal Operation", "internal_operation");
    ws7.operation = 'Genel';
    ws7.workstation = 'Led';
    refresh_field('internal_operation');

    var row = locals[cdt][cdn];
    cur_frm.doc.internal_operation.forEach(function(row) {
      frappe.call({
      method: 'frappe.client.get_value',
      args:{
        doctype:'Workstation',
        filters:{
          workstation_name:row.workstation,
        },
        fieldname:['hour_rate']
      },
      callback:function (data) {
        if(frm.doc.currency != 'TRY')
        {
          frappe.model.set_value(row.doctype, row.name, 'hour_rate', data.message.hour_rate / frm.doc.conversion_rate);
        }
        else
        {
          frappe.model.set_value(row.doctype, row.name, 'hour_rate', data.message.hour_rate);
        }

      }
    });
    });



  },

	internal_operation_total(frm, cdt, cdn) {
		if(frm.doc.currency != 'TRY')
		{
			frm.set_value('internal_operation_total_try', frm.doc.conversion_rate * frm.doc.internal_operation_total);
			refresh_field('internal_operation_total_try');
		}
		cur_frm.cscript.calculate_total_cost(frm, cdt, cdn);
		frm.set_value('operating_cost', frm.doc.external_operation_total + frm.doc.internal_operation_total);
		refresh_field('operating_cost');
	},
	external_operation_total(frm, cdt, cdn) {
		if(frm.doc.currency != 'TRY')
		{
			frm.set_value('external_operation_total_try', frm.doc.conversion_rate * frm.doc.external_operation_total);
			refresh_field('external_operation_total_try');
		}
		cur_frm.cscript.calculate_total_cost(frm, cdt, cdn);
		frm.set_value('operating_cost', frm.doc.external_operation_total + frm.doc.internal_operation_total);
		refresh_field('operating_cost');
	},
	total_item_amount(frm, cdt, cdn) {
		if(frm.doc.currency != 'TRY')
		{
			frm.set_value('total_amount_try', frm.doc.conversion_rate * frm.doc.total_item_amount);
			refresh_field('total_amount_try');
		}
	cur_frm.cscript.calculate_total_cost(frm, cdt, cdn);

	},
	installation_cost(frm, cdt, cdn) {
    if(frm.doc.currency != 'TRY')
    {
      frm.set_value('installation_cost_try', frm.doc.conversion_rate * frm.doc.installation_cost);
      refresh_field('installation_cost_try');
    }
		cur_frm.cscript.calculate_total_cost(frm, cdt, cdn);
	},
	shipment_cost(frm, cdt, cdn) {
    if(frm.doc.currency != 'TRY')
    {
      frm.set_value('shipment_cost_try', frm.doc.conversion_rate * frm.doc.shipment_cost);
      refresh_field('shipment_cost_try');
    }
		cur_frm.cscript.calculate_total_cost(frm, cdt, cdn);

	},
	total_cost(frm) {
		frm.set_value('base_total_cost', frm.doc.conversion_rate * frm.doc.total_cost);
		refresh_field('base_total_cost');
		},
		operating_cost(frm) {
			frm.set_value('operating_cost_try', frm.doc.operating_cost * frm.doc.conversion_rate);
			refresh_field('operating_cost_try');
			},
			currency(frm) {
				if(frm.doc.currency != 'TRY')
				{
          refresh_field('internal_operation_total');
					cur_frm.set_df_property('internal_operation_total_try','hidden',0);
					cur_frm.set_df_property('external_operation_total_try','hidden',0);
					cur_frm.set_df_property('total_amount_try','hidden',0);
					cur_frm.set_df_property('operating_cost_try','hidden',0);
          cur_frm.set_df_property('conversion_rate','hidden',0);
          cur_frm.set_df_property('installation_cost_try','hidden',0);
          cur_frm.set_df_property('shipment_cost_try','hidden',0);
					cur_frm.set_df_property('base_total_cost','hidden',0);
				}
				else {
					cur_frm.set_df_property('internal_operation_total_try','hidden',1);
					cur_frm.set_df_property('external_operation_total_try','hidden',1);
					cur_frm.set_df_property('total_amount_try','hidden',1);
					cur_frm.set_df_property('operating_cost_try','hidden',1);
					cur_frm.set_df_property('base_total_cost','hidden',1);
          cur_frm.set_df_property('conversion_rate','hidden',1);
          cur_frm.set_df_property('installation_cost_try','hidden',1);
          cur_frm.set_df_property('shipment_cost_try','hidden',1);
				}
				},



}),

frappe.ui.form.on('Price Analysis Item', {
	refresh(frm, cdt, cdn) {

	},
  item_code(frm, cdt, cdn) {
    frm.set_query('item_code', 'items', function() {
        console.log('query');
      return {
        query: 'erpnext.controllers.queries.item_query',
        filters:
        {'item_group': 'Sarf'}
      };
    });
  },
  amount(frm, cdt, cdn) {
   var row = locals[cdt][cdn];
   var total=0;
   
   if(frm.doc.currency != 'TRY')
   {
     frappe.model.set_value(row.doctype, row.name, 'base_amount', (row.amount * frm.doc.conversion_rate));
     cur_frm.refresh_field('base_amount');
   }
   
   cur_frm.doc.items.forEach(function(row) {
   total += row.amount;
   });
   frm.set_value('total_item_amount', total);
   refresh_field('items_total');
 },
  qty(frm, cdt, cdn) {
    var row = locals[cdt][cdn];
    frappe.model.set_value(row.doctype, row.name, 'amount', (row.qty * row.rate));
    cur_frm.refresh_field('amount');
  },
  rate(frm, cdt, cdn) {
      var row = locals[cdt][cdn];
    frappe.model.set_value(row.doctype, row.name, 'amount', (row.qty * row.rate));
    cur_frm.refresh_field('amount');
  },
}),

frappe.ui.form.on('Price Analysis External Operation', {
	refresh(frm) {

	},
  base_operating_cost(frm, cdt, cdn) {
			 var row = locals[cdt][cdn];
		   var total=0;
		   cur_frm.doc.operations.forEach(function(row) {
		   total += row.operating_cost;
		   });
		   frm.set_value('external_operation_total', total);
		   refresh_field('external_operation_total');

  },
  time_in_mins(frm, cdt, cdn) {
      var row = locals[cdt][cdn];
      frappe.model.set_value(row.doctype, row.name, 'operating_cost', ((row.hour_rate / 60) * row.time_in_mins ));
  },
  hour_rate(frm, cdt, cdn) {
      var row = locals[cdt][cdn];
      frappe.model.set_value(row.doctype, row.name, 'operating_cost', ((row.hour_rate / 60) * row.time_in_mins ));
  },
  operating_cost(frm, cdt, cdn) {
      var row = locals[cdt][cdn];


      if(frm.doc.currency != 'TRY')
      {
        frappe.model.set_value(row.doctype, row.name, 'base_operating_cost', (row.operating_cost * frm.doc.conversion_rate));
      }
      else {
        frappe.model.set_value(row.doctype, row.name, 'base_operating_cost', row.operating_cost );
      }
  },


});

frappe.ui.form.on('Price Analysis Internal Operation', {
	refresh(frm) {

	},
  base_operating_cost(frm, cdt, cdn) {

			var row = locals[cdt][cdn];
			var total=0;
			cur_frm.doc.internal_operation.forEach(function(row) {
			total += row.operating_cost;
			});
			frm.set_value('internal_operation_total', total);
			refresh_field('internal_operation_total');
  },
  time_in_mins(frm, cdt, cdn) {
      var row = locals[cdt][cdn];
      frappe.model.set_value(row.doctype, row.name, 'operating_cost', ((row.hour_rate / 60) * row.time_in_mins ));
  },
  hour_rate(frm, cdt, cdn) {
      var row = locals[cdt][cdn];
      frappe.model.set_value(row.doctype, row.name, 'operating_cost', ((row.hour_rate / 60) * row.time_in_mins ));
  },
  operating_cost(frm, cdt, cdn) {
      var row = locals[cdt][cdn];


      if(frm.doc.currency != 'TRY')
      {
        frappe.model.set_value(row.doctype, row.name, 'base_operating_cost', (row.operating_cost * frm.doc.conversion_rate));
      }
      else {
        frappe.model.set_value(row.doctype, row.name, 'base_operating_cost', row.operating_cost );
      }
  },


});

/*cur_frm.cscript.fetch_rate = function(frm, cdt, cdn){
	var row = locals[cdt][cdn];
	frappe.call({
		method: 'frappe.client.get_value',
		args: {
			doctype: 'Item',
			filters: {
				'item_code': row.item_code,
			},
			fieldname: ['last_purchase_rate']
		},
		callback: function (data) {
			if(frm.doc.rm_cost_as_per == 'Valuation Rate'){
				frappe.model.set_value(row.doctype, row.name, 'rate', data.message.valuation_rate);
			}
			else if(frm.doc.rm_cost_as_per == 'Last Purchase Rate'){
				if(frm.doc.currency != 'TRY'){
					frappe.model.set_value(row.doctype, row.name, 'rate', data.message.last_purchase_rate / frm.doc.conversion_rate);
				}
				else {
					frappe.model.set_value(row.doctype, row.name, 'rate', data.message.last_purchase_rate);
				}

			}
		}
	});

};*/

cur_frm.cscript.calculate_total_cost = function(frm, cdt, cdn){
	frm.set_value('total_cost',frm.doc.total_item_amount + frm.doc.external_operation_total + frm.doc.internal_operation_total + frm.doc.shipment_cost + frm.doc.installation_cost);
	refresh_field('total_cost');

};
