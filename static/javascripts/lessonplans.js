function saveLessonPlan(url)
{
	new Ajax.Request('/lessonplans/save_to_session', {asynchronous:true, evalScripts:true, method:'post', parameters:Form.serialize('lessonplan'), onComplete:function(){if (url) {location = url} else {location = location}}})
}
function createLessonPlan(url)
{
	new Ajax.Request('/lessonplans/create', {asynchronous:true, evalScripts:true, method:'post', parameters:Form.serialize('lessonplan'), onComplete:function(){if (url) {location = url} else {location = location}}})
}

function updateLessonPlan(url)
{
	new Ajax.Request('/lessonplans/update', {asynchronous:true, evalScripts:true, method:'post', parameters:Form.serialize('lessonplan'), onComplete:function(){if (url) {location = url} else {location = location}}})
}


if (lessonplan)
{
	Object.keys(lessonplan).each(function (key){
		Try.these (		
			
			function() {
					$(key).value = lessonplan[key]
			},
			function() {
					Object.keys(lessonplan[key]).each(function (part){
						
						Try.these(
							function() {
								$(key+"_"+part).value = lessonplan[key][part]
							},
							function() {
								$(key+"_"+part+"_primary").value = lessonplan[key][part]["primary"]
								$(key+"_"+part+"_extended").value = lessonplan[key][part]["extended"]
							}
						)
						
						
					})
			}
			
		)	|| false;
	})
	
	// Take care of nrs_level checkboxes
	if (lessonplan.nrs_level)
	{
		lessonplan.nrs_level.each(function (level){
			if ($("nrs_level_"+(level.gsub("%2520", "_"))))
				$("nrs_level_"+(level.gsub("%2520", "_"))).checked = true
		})
	}
	
	if ((ul = $$("ul#turning_point")[0]))
	{
		select_field = document.createElement("SELECT");
		select_field.id = ul.id
		select_field.name = ul.id
		select_field.className = "select_field"
		
		// Create blank selection
		option = document.createElement("OPTION");
		option.value = "";
	   option_text = document.createTextNode("")
	   option.selected = true
		option.appendChild(option_text)
		select_field.appendChild(option);
		
		
		choices = $$("ul#"+ul.id+" li")
		var are_sub_choices = false;
		choices.each(function(choice){
			
			if (choice.parentNode.parentNode.parentNode.tagName != "UL") {
			
				// Is there another level?
				subChoices = [];
			
				subChoices = choice.getElementsBySelector('li')
			
				if (subChoices.length > 0) {
					are_sub_choices = true;
					// Create Top Level Options 	
					option = document.createElement("OPTION");
					option.value = choice.childNodes[0].nodeValue;
				   option_text = document.createTextNode(option.value)
					option.appendChild(option_text);
					option.id = option.value
					
					
					if (lessonplan.turning_point == option.value)
						option.selected = true
			
					
					select_field.appendChild(option);
					
					subChoices.each(function(subChoice) {
						suboption = document.createElement("OPTION");
						suboption.value = option.value;
						suboption.className = "suboption"
						//suboption.style.paddingLeft = "20px;"
					   option_text = document.createTextNode("        " + subChoice.innerHTML)
						suboption.appendChild(option_text);

						select_field.appendChild(suboption);
					});
			
			
				} else {
					option = document.createElement("OPTION");
					option.value = choice.innerHTML;
					if (lessonplan.turning_point == option.value)
						option.selected = true
				   option_text = document.createTextNode(choice.innerHTML)
					option.appendChild(option_text)
					select_field.appendChild(option);
				}
			}
		})
		
		// On select, populate and select the Top Level Topic
		Event.observe(select_field, "change", function() {
			if (are_sub_choices) {
				if (select_field.options[select_field.selectedIndex].hasClassName("suboption")) {
					$('topic').value = select_field.options[select_field.selectedIndex].innerHTML.strip();
					$(select_field.options[select_field.selectedIndex].value).selected = true
				}
			}
		})
		
		nextNode = ul.next()
		parentNode = ul.up()
		ul.remove()
		parentNode.insertBefore(select_field, nextNode)
	}
}