var editable_border_toggle = new Array;
editable_border_toggle[0] = "editable"
editable_border_toggle[1] = "editable_blend"
var revision_content_toggle = new Array;
revision_content_toggle[0] = "revision_content"
revision_content_toggle[1] = "revision_content_blend"


var editable_border_toggle_index = 0;

if (typeof tinyMCE!="undefined"){
tinyMCE.init({
  	mode : "exact",
  	theme : "advanced",
	plugins : "iespell,contextmenu,tables,paste",
  	theme_advanced_statusbar_location : "bottom",
  	theme_advanced_buttons1 : "bold,italic,underline,separator, formatselect, styleselect, removeformat,separator,undo,redo,link,unlink,separator,image,separator,bullist,numlist,separator,cut,copy,paste,pastetext,pasteword,separator,code",
  	theme_advanced_buttons2 : "table, indent, outdent, jmform",
  	theme_advanced_buttons3 : "",
extended_valid_elements: "area[shape|coords|href|alt|id|class|target],object[*],param[*]",
	paste_remove_spans : true,
	paste_remove_styles : true,
	paste_auto_cleanup_on_paste : true,
	paste_use_dialog : true,
	auto_reset_designmode : true,
	convert_urls : false,
  	relative_urls : false,
	theme_advanced_resize_horizontal : false,
	theme_advanced_resizing : true,		
	apply_source_formatting : true,
	remove_linebreaks : false,
  	content_css : "/stylesheets/site.css",
	file_browser_callback : "fileBrowserCallBack"
 });
}

function fileBrowserCallBack(field_name, url, type, win) {
	var connector = "/admin/assets";

	my_field = field_name;
	my_win = win;

	switch (type) {
		case "image":
			connector += ";images";
			break;
	}
	window.open(connector, "Asset_Manager", "width=680,height=400,resizable=yes,scrollbars=yes");
}

hotkey['e'] = function() { 
	
	// Hide Admin Header
    admin_header_toggle_index = admin_header_toggle_index^1
    $("admin").style.display = admin_header_toggle[admin_header_toggle_index];
	
	// Hide Verbiage Block Tools
    document.getElementsByClassName(editable_border_toggle[editable_border_toggle_index]).each ( function (obj) { 
        obj.className = editable_border_toggle[editable_border_toggle_index^1]; 
    });     
	// Revision windows
    document.getElementsByClassName(revision_content_toggle[editable_border_toggle_index]).each ( function (obj) { 
        obj.className = revision_content_toggle[editable_border_toggle_index^1]; 
    });
    editable_border_toggle_index = editable_border_toggle_index^1
}

var admin_header_toggle = new Array;
admin_header_toggle[0] = "inline"
admin_header_toggle[1] = "none"
var admin_header_toggle_index = 0;

hotkey['h'] = function() { 
    
	// Hide Admin Header
    admin_header_toggle_index = admin_header_toggle_index^1
    $("admin").style.display = admin_header_toggle[admin_header_toggle_index];
}

hotkey['l'] = function() { 
    document.location = "/admin/logout";
}