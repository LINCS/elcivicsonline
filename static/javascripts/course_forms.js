function saveCourseForm(url)
{
	new Ajax.Request('/course_forms/save_to_session', {asynchronous:true, evalScripts:true, method:'post', parameters:Form.serialize('course_form'), onComplete:function(){if (url) {location = url} else {location = location}}})
}

function submitCourseForm(url, print)
{
	if (print) { Popup.open({url: "", name: "course_form"}); 
	Popup.windows["course_form"].document.write("Loading...")};
	new Ajax.Request('/course_forms/save', {asynchronous:true, evalScripts:true, method:'post', parameters:Form.serialize('course_form'), onComplete:function(response){ if (print) { printCourseForm(response.responseText); } if (url) {location = url} else {location = location}; return false;}})
}

function printCourseForm(id)
{
	Popup.windows["course_form"].location = "/course_forms/print/"+id;
	return false;

}


$$('form.course_form label').each(function(label) {
	hidden_field = document.createElement("INPUT");
	hidden_field.type = "hidden"
	
	var for_field;
	for_field = label.getAttribute("for");

	if (!for_field) {
		index = $$('form.course_form label').indexOf(label);
		field = $$('form.course_form textarea');
		field = field[index];
		if (field) { for_field = field.getAttribute("id"); }
	}

	hidden_field.name = "course_form["+for_field+"][name]";
	hidden_field.value = label.innerHTML;
	label.appendChild(hidden_field);
});

if (course_form) {
	$$('form.course_form').each(function(form){
		var data = course_form["data"];

		form.getElementsBySelector("textarea").each(function(input){
			
			field = input.name.sub(/([^\[]*).*/,       function(match){ return match[1]; });
			name  = input.name.sub(/([^\[]*)\[(.*)\]\[(.*)\]/, function(match){ return match[2]; });
			type  = input.name.sub(/([^\[]*)\[(.*)\]\[(.*)\]/, function(match){ return match[3]; });
			
			if (data && data[name] && data[name]["value"]) {
				input.value = data[name]["value"];
			}

		});
			
	});
}
