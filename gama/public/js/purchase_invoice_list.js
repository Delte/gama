frappe.listview_settings['Purchase Invoice'] = {
    onload: function(listview) {
          if(frappe.user.has_role('Shipment User') || frappe.user.has_role('Shipment & Installation Manager')){
                if(!frappe.user.has_role('System Manager')){
            frappe.route_options = {
                "supplier": ["in", "Akyıldız Lojis. Ulus. Nak. ve Turz. San. Tic. Ltd. Şti,Gökçel Vinç Sanayi ve Ticaret Limited Şirketi"],
                "company": ["=", "Gama Reklam San. ve Tic. A.Ş."]
            };
        }
    }
    }};