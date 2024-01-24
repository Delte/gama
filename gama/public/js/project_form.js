frappe.ui.form.on('Project', {

    onload(frm) {
          if(!frappe.user.has_role('System Manager')){
              setTimeout(() => {
                  frm.remove_custom_button('Completed','Set Status');
                  frm.remove_custom_button('Cancelled','Set Status');
                  frm.remove_custom_button('Kanban Board');
                  frm.remove_custom_button('Duplicate Project with Tasks');
                  frm.remove_custom_button('Gantt Chart');
              },50);
              }
      },
  
      refresh(frm) {
      if (frm.doc.custom_drive_entity){
          frm.add_custom_button(__("Drive"), function() {
              window.open(origin+'/drive/folder/'+frm.doc.custom_drive_entity);
       });
      }
        if(!frappe.user.has_role('System Manager')){
              setTimeout(() => {
                  frm.remove_custom_button('Completed','Set Status');
                  frm.remove_custom_button('Cancelled','Set Status');
                  frm.remove_custom_button('Kanban Board');
                  frm.remove_custom_button('Gantt Chart');
                  frm.remove_custom_button('Duplicate Project with Tasks');
              },50);
              }
      }
      
  })