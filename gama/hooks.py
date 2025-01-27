from . import __version__ as app_version

app_name = "gama"
app_title = "Gama"
app_publisher = "Gama Reklam San. ve Tic. A.Ş."
app_description = "Frappe Customizations for Gama Reklam San. ve Tic. A.Ş."
app_email = "administrator@gamareklam.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/gama/css/gama.css"
# app_include_js = "/assets/gama/js/gama.js"

# include js, css files in header of web template
# web_include_css = "/assets/gama/css/gama.css"
# web_include_js = "/assets/gama/js/gama.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "gama/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
doctype_js = {  "Request for Quotation" : "public/js/form/request_for_quotation",
                "Opportunity" : "public/js/form/opportunity",
                "Supplier Quotation" : "public/js/form/supplier_quotation",
                "Lead" : "public/js/form/lead",
                "Task" : "public/js/form/task",
                "Sales Order" : "public/js/form/sales_order",
                "Material Request" : "public/js/form/material_request",
                "Item" : "public/js/form/item",
                "Delivery Note" : "public/js/form/delivery_note",
                "Purchase Invoice" : "public/js/form/purchase_invoice",
                "Sales Invoice" : "public/js/form/sales_invoice",
                "Project" : "public/js/form/project",
                "Installation Note" : "public/js/form/installation_note",
                "Issue" : "public/js/form/issue",
                "Timesheet" : "public/js/form/timesheet",
                "Quotation" : "public/js/form/quotation",
                "Stock Entry" : "public/js/form/stock_entry",
                "Purchase Receipt" : "public/js/form/purchase_receipt",
                "Customer" : "public/js/form/customer",
                "Purchase Order" : "public/js/form/purchase_order",
                "Price Analysis" : "public/js/form/price_analysis",
                "Stock Reconciliation" : "Stock Reconciliation",
             } 
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
doctype_list_js = {
                    "Purchase Invoice" : "public/js/list/purchase_invoice",
                    "Task" : "public/js/list/task",
                  }
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "gama.utils.jinja_methods",
#	"filters": "gama.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "gama.install.before_install"
# after_install = "gama.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "gama.uninstall.before_uninstall"
# after_uninstall = "gama.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "gama.utils.before_app_install"
# after_app_install = "gama.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "gama.utils.before_app_uninstall"
# after_app_uninstall = "gama.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "gama.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
#	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
#	"*": {
#		"on_update": "method",
#		"on_cancel": "method",
#		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"gama.tasks.all"
#	],
#	"daily": [
#		"gama.tasks.daily"
#	],
#	"hourly": [
#		"gama.tasks.hourly"
#	],
#	"weekly": [
#		"gama.tasks.weekly"
#	],
#	"monthly": [
#		"gama.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "gama.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "gama.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "gama.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["gama.utils.before_request"]
# after_request = ["gama.utils.after_request"]

# Job Events
# ----------
# before_job = ["gama.utils.before_job"]
# after_job = ["gama.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"gama.auth.validate"
# ]