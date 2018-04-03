/* // Ensure journals are completed
if ($$(".journal").length > 0){
	window.onunload = function()
	{
		entry = $$(".journal textarea")[0]
		if (entry.value == "")
		{
			alert('Please fill out your journal entry')
			location = self.location
		}
	}
}*/

var global_id_count = 1;

bubbles = $$(".bubble")
bubbles.each(function(el){
	Element.hide(el)
})

popup_windows = $$(".popup_window")
popup_windows.each(function(el){
	Element.hide(el)
})

triggered_text = $$(".triggered_text")
triggered_text.each(function(el){
	Element.hide(el)
})

onclicks = $$(".onclick")
onclicks.each(function(el){
	el.onclick = function(e) {
		
		bubbles.each(function(el){
			Element.hide(el)
		})
		popup_windows.each(function(el){
			Element.hide(el)
		})	
		
		image_id = this.id.replace('click_', '')
	
		if (bubbles.length > 0) {
			$('popup_'+image_id).style.left = (Position.cumulativeOffset(this)[0]+10)+"px"	
			$('popup_'+image_id).style.top = (Position.cumulativeOffset(this)[1]-50)+"px"
		}
		
		if (popup_windows.length > 0) {
			
		
			$$("span.onclick_selected").each(function(span){
				span.removeClassName("onclick_selected")
				});
			this.addClassName('onclick_selected');
				
			if($('close_btn'))
			{
				old_image_id = $('close_btn').parentNode.id.replace('popup_', '')
				//$('click_'+old_image_id).removeClassName('onclick_selected');
				$('close_btn').remove();
			}
			if (this.tagName == "IMG") {
					$('popup_'+image_id).style.left = (Position.cumulativeOffset(this)[0]+250)+"px"	
					$('popup_'+image_id).style.top = (Position.cumulativeOffset(this)[1] + 10)+"px"
			} else if (this.tagName == "AREA" && this.hasClassName("appear_over")) {
					$('popup_'+image_id).style.left = (Event.pointerX(e || window.event))+"px"	
					$('popup_'+image_id).style.top = (Event.pointerY(e || window.event)-$('popup_'+image_id).getHeight())+"px"
			} else if (this.tagName == "AREA" && this.hasClassName("appear_over") == false) {
					$('popup_'+image_id).style.left = (Event.pointerX(e || window.event)+100)+"px"	
					$('popup_'+image_id).style.top = (Event.pointerY(e || window.event)-$('popup_'+image_id).getHeight())+"px"
			} else if ($('popup_'+image_id).hasClassName("absolute")) {
						$('popup_'+image_id).style.left = (Position.cumulativeOffset(this)[0])+"px"	
						$('popup_'+image_id).style.top = (Position.cumulativeOffset(this)[1])+"px"
			} else if ($('popup_'+image_id).hasClassName("absolute_over")) {
						$('popup_'+image_id).style.left = (Position.cumulativeOffset(this)[0])+"px"	
						$('popup_'+image_id).style.top = (Position.cumulativeOffset(this)[1]-$('popup_'+image_id).getHeight()-35)+"px"
		
			} else {
				$('popup_'+image_id).style.left = (Position.cumulativeOffset(this)[0]+250)+"px"	
				$('popup_'+image_id).style.top = (Position.cumulativeOffset(this)[1] - 50)+"px"
			}
			
			$('popup_'+image_id).innerHTML += "<span class='onclick' id='close_btn' onclick='Element.hide(this.parentNode);$$(\"span.onclick_selected\").each(function(span){span.removeClassName(\"onclick_selected\")})'>x Close</span>" 
		}	
		
		Element.show('popup_'+image_id)
		
		if (el.type == "checkbox")
			return true;
		else
			return false;
	}
})

$$("img.checkbox").each(function(el){
	el.onclick = function(e) {
		if (el.hasClassName("correct"))
			this.src = "/images/checkbox-checked.gif";
		else
			this.src = "/images/checkbox-checked-red.gif";
	}
})

$$(".print").each(function(el){
	el.onclick = function(e) {
		print_id = this.id.replace('print_', '');
		
		Popup.open({name:"print_window", url:""});
		Popup.windows.print_window.document.write($("print_"+print_id+"_html").innerHTML);
		Popup.windows.print_window.print();
	}
});


var instructions = $$(".instructions").each(function(el){
	el.hide()
});

var bricks = {};
// Brick drag and drop
if ($('brick_start')) {
	
	$('brick_start').getElementsBySelector(".brick").each(function(brick){
		bricks[brick.id] = new Draggable(brick,{ghoasting:false});
	})
}

if ($('brick_end')) {
	$('brick_end').getElementsBySelector(".brick_holder").each(function(brick_holder){

		Droppables.add(brick_holder,
		    {accept:"brick",onDrop:function(draggable, droppable, e){
						draggable_id = draggable.id.replace("brick_");
						droppable_id = droppable.id.replace("brick_holder_");
						if (draggable_id == droppable_id)
						{
							// Give paint red ability
							draggable.style.top = 0
							draggable.style.left = 0 
							droppable.innerHTML = "";
							droppable.appendChild(draggable);
						
							Droppables.remove(droppable);
							bricks[draggable.id].destroy();
							
							droppable.addClassName("toggle_class");
							if ($$(".brick_holder .brick").length == $$(".brick").length)
							{
						
								$$(".brick_holder").each(function(holder) {
									holder.onmousedown = function(el){
										holder.toggleClassName("red");
									}
								});
							}

							
						}
					}
				});

	});
}


if ($('drop0')) {
	var dragTag = $('drop0').descendants()[0].tagName
	
	if (dragTag == "DIV") {
		
		$('drop0').style.height = Position.positionedOffset($('drop0').parentNode.parentNode.next())[1] - Position.positionedOffset($('drop0'))[1]  + "px";
		
	}
}

dropareas = $$(".droparea")
dropareas.each(function(droparea){
	
	// Relativly position the table if there is no image
	if ($$('img.hiddenPicture').length == 0 && $$('table.dragHiddenPicture').length > 0) {
		$$('table.dragHiddenPicture')[0].setStyle({position:"relative"});
	}
	
	
	Sortable.create(droparea,
	    {dropOnEmpty:true,containment:dropareas,constraint:false,only:"dragable",tag:dragTag,onChange:function(li){
		
			if (dragTag == "LI") {
		 	  if (li.parentNode.id == "drop0" || li.hasClassName("dropAny"))
					li.style.color = ""
			 	else if (li.parentNode.id == li.className.replace("dragable ", ""))
					li.style.color = "#561"
				else
					li.style.color = "red"
			}
			
			if (dragTag == "DIV") {
				if (li.parentNode.id != "drop0")
				{
					dropareas.each(function(area){
						area.removeClassName("highlight");
					});
					if (li.parentNode.hasClassName("correct") == false && li.parentNode.hasClassName("incorrect") == false)
					li.parentNode.addClassName("highlight");
				}
				
			}
	}, onUpdate:function(area){
		
		if (dragTag == "DIV") {
			if (area.id != "drop0") {
					area.removeClassName("highlight");
				if (area.getElementsBySelector("div").length > 0)	{
					card = area.getElementsBySelector("div")[0];
					
					// Is the card in the correct area?
					if (card.hasClassName(area.id))
					{
						area.addClassName("correct");
						
						// All cards in row are correct?
						if ($$('img.hiddenPicture').length > 0) { // If there is an image to display
							if (area.parentNode.getElementsBySelector("div.correct").length == area.parentNode.getElementsBySelector("div.droparea").length) {
								area.parentNode.parentNode.style.visibility = "hidden"
							
							// Hide each drop area so other cards don't attempt to drop on it
							
								area.parentNode.getElementsBySelector("div.droparea").each(function(correct_area){
									Element.hide(correct_area)
								})
							}
						}
						
						// If all cards on page are correct?
						if ($$("div.correct").length == $$("div.droparea").length - 1) {
							$$("a.next")[0].setStyle({
								visibility:'visible'
							});
						}
						
					}
					else
						area.addClassName("incorrect");			
				}
				else {				
					area.removeClassName("correct");
					area.removeClassName("incorrect")
				}
			}
		}
		
	}});	
})


if ($$(".dragHiddenPicture").length > 0) {
	// Hide next link if it is there
	if ($$("a.next").length > 0)
	{
		$$("a.next")[0].setStyle({
			visibility:'hidden'
		});	
		add_skip_next_link();
	}
}

function dropareaUpdated(droparea)
{
	alert(droparea.id)
/*	droparea.childNodes().each(function(li){
		alert(li.id)
	})*/
}


if ($("dragarea")){
	$$(".dragable").each(function(dragable){
		new Draggable(dragable,{ghoasting:false});
		
		if ($("dragarea").hasClassName("random"))
		{
			dragable.style.top = (Math.floor(Math.random()*100)-50)+"px";
			dragable.style.left = (Math.floor(Math.random()*100)-50)+"px";
		}
	})
}

if($$(".audio").length > 0) {
	$$(".audio").each(function(audio){
		var so = new SWFObject("/player.swf", "audioplayer1", "290", "24", "6", "#F5DFA3");
		so.addVariable("flashVars", "playerID=1&amp;bg=0xCCCCCC&amp;leftbg=0x78510C&amp;lefticon=0xF2F2F2&amp;rightbg=0xB58A24&amp;rightbghover=0x78510C&amp;righticon=0xF2F2F2&amp;righticonhover=0xFFFFFF&amp;text=0x000000&amp;slider=0xB58A24&amp;track=0xFFFFFF&amp;border=0xFFFFFF&amp;loader=0x78510C&amp;soundFile="+audio.innerHTML.stripTags().strip()); 
		so.write(audio);
	})
}
if($$(".smallaudio").length > 0) {
	$$(".smallaudio").each(function(audio){
		var so = new SWFObject("/player.swf", "audioplayer1", "224", "24", "6", "#F5DFA3");
		so.addVariable("flashVars", "playerID=1&amp;bg=0xCCCCCC&amp;leftbg=0x78510C&amp;lefticon=0xF2F2F2&amp;rightbg=0xB58A24&amp;rightbghover=0x78510C&amp;righticon=0xF2F2F2&amp;righticonhover=0xFFFFFF&amp;text=0x000000&amp;slider=0xB58A24&amp;track=0xFFFFFF&amp;border=0xFFFFFF&amp;loader=0x78510C&amp;soundFile="+audio.innerHTML.stripTags().strip()); 
		so.write(audio);
	})
}

var sound2Embed = {};
function sound2Play(src) {
  if ( !sound2Embed[src] ) {
          sound2Embed[src] = document.createElement("embed");
          sound2Embed[src].setAttribute("src", src);
          sound2Embed[src].setAttribute("hidden", true);
          sound2Embed[src].setAttribute("autostart", true);
  } else sound2Stop(src);
  sound2Embed[src].removed = false;
  document.body.appendChild(sound2Embed[src]);
}

function sound2Stop(src) {
   if ( sound2Embed[src] && !sound2Embed[src].removed ) {
       document.body.removeChild(sound2Embed[src]);
       sound2Embed[src].removed = true;
				sound2Embed[src] = null;
   }
}


if($$(".audio_click").length > 0) {
	$$(".audio_click").each(function(audio){
		
		var src = audio.getElementsBySelector("span")
		if (src.length > 0)
		{
				src = src[0].innerHTML.stripTags().strip();

				// Preload
				sound2Embed[src] = document.createElement("embed");
		    sound2Embed[src].setAttribute("src", src);
		    sound2Embed[src].setAttribute("hidden", true);
		    sound2Embed[src].setAttribute("autostart", false);
				sound2Embed[src].removed = false;
				
				document.body.appendChild(sound2Embed[src]);
				
				audio.onclick = function(){
					sound2Stop(src);
					sound2Play(src);
				}
		}
		
	

	})
}


$$("a.widget_popup_window").each(function(el)
{
	el.onclick = function(){
		url = this.href.gsub(/[^#]*#/, "")
		
		Popup.open({url: "/course/popup/"+url})
		return false;
	}
});

if($$(".swap_trigger").length > 0) {
	$$(".swap_trigger").each(function(swap_trigger){
		swap_trigger.onclick = function(){
			swap_name = this.id.replace("_trigger", "")
			$$("."+swap_name).each(function(swap_obj){
				swap_obj.toggle();
			})
		}
	})
}


if ($$(".hiddenPicture").length > 0) {
	
	part_count = $$("table.hiddenPicture tr").length
	parts_uncovered = 0;
	// Turn lists into select boxes
	$$("ul.select").each(function(ul){
		
		if (!ul.id)
			ul.id = getGlobalId();
			
		// Hide next link if it is there
		if ($$("a.next").length > 0 && $$(".hiddenPicture.nonsequential").length == 0)
		{
			$$("a.next")[0].setStyle({
				visibility:'hidden'
			});	
			add_skip_next_link();
		}
		
		if ($$(".bigbutton").length > 0 && $$(".bigbutton")[0].getStyle("visibility") == "hidden") {
		  add_skip_next_link();
		}
		
		select_field = document.createElement("SELECT");
		select_field.id = ul.id
		select_field.className = "select_field"
		select_field.onchange = function(){
			if (this.options[this.selectedIndex].value == 1) {
				this.parentNode.parentNode.setStyle({
					visibility:'hidden'
				});
				
				if (++parts_uncovered == part_count)
				{
					if ($$(".bigbutton").length > 0) {
						$$(".bigbutton")[0].setStyle({
							visibility:'visible'
						});
					}
					
					if ($$("a.next").length > 0)
					{
						$$("a.next")[0].setStyle({
							visibility:'visible'
						});	
					}
				}
				
			}
		}
		
		option = document.createElement("OPTION");
		option.value = 0;
	   option_text = document.createTextNode("Select answer:")
	   option.selected = true
		option.appendChild(option_text)
		select_field.appendChild(option);
		
		choices = $$("#"+ul.id+" li")
		correct_choice = $$("#"+ul.id+" li.correct")
		correct_choice = correct_choice[0];
		choices.each(function(choice){
			option = document.createElement("OPTION");
			if (choice == correct_choice)
				option.value = 1;
			else
				option.value = 0;
		   option_text = document.createTextNode(choice.innerHTML)
			option.appendChild(option_text)
			select_field.appendChild(option);
		})
		td = ul.parentNode
		ul.remove()
		td.appendChild(select_field)
		
	})
} 

$$("a.real_popup_window").each(function(el)
{
	el.onclick = function(){
		Popup.open({url: this.href})
		return false;
	}
});

$$(".toggle_class").each(function(el){
	el.onclick = function() {
		classname = el.id.gsub("toggle_class_", "");
		el.toggleClassName(classname);
	}
})

$$(".swap_replacement").each(function(img){
	Element.hide(img);
})

$$(".mouseover_imageswaptrigger").each(function(el){
	var namespace = el.id.gsub(/_.*/, "");
	var image_id = namespace + "_image";
	var oldImageSrc = $(image_id).src
	
	el.onmouseover = function(){
	
		$(image_id).src = $(el.id.gsub("trigger", "replacement")).src;
		
	}
	
	el.onmouseout = function(){
		$(image_id).src = oldImageSrc;
	}
	
});

$$(".click_imageSwapThis").each(function(el){
	
	el.style.cursor = "pointer"
	var oldImageSrc = el.src
	
	el.onclick = function(){	
		if (el.src == oldImageSrc)
			el.src = $(el.id.gsub("trigger", "replacement")).src;
		else
			el.src = oldImageSrc;
	}
	
	
});

$$(".mouseover_contentSwapThis").each(function(el){
	
	el.style.cursor = "pointer"
	var oldContent = el.innerHTML
	el.setStyle({fontFamily:"monospace", fontSize:"12px"})
	var oldWidth = el.getWidth() + "px"
	
	el.onmouseover = function(){	
			oldstrlen = el.innerHTML.length
			newstrlen = $(el.id.gsub("trigger", "replacement")).innerHTML.length
			
			diffstrlen = oldstrlen - newstrlen
			
			el.innerHTML = ""
			
			for (i = 0; i < diffstrlen / 4; i++)
				el.innerHTML += " &nbsp;"
				
			el.innerHTML += $(el.id.gsub("trigger", "replacement")).innerHTML;
			
			for (i = 0; i < diffstrlen / 4; i++)
				el.innerHTML += " &nbsp;"
			
			el.setStyle({background:'#fff', color:"darkred", textAlign:"center"})
	}
	
	el.onmouseout = function(){
		el.innerHTML = oldContent;
		el.setStyle({background:'transparent',color:"black",textAlign:"left"})
	}
	
	
});

// Sentence Highlighting

$$(".sentence").each(function(el){
	el.onmouseover = function(){	
		el.addClassName("sentence_highlight_over");
	}
	el.onmouseout = function(){	
		el.removeClassName("sentence_highlight_over");
	}
});

$$(".sentence_highlight").each(function(el){
	el.onclick = function(){	
		el.addClassName("sentence_highlight_click");
	}
});

// Session Form Stores
if (typeof(window["form_store"]) != "undefined" && form_store) {
	$$('div.form_store_read').each(function(form_store_read){
		
		
		form_store_read.getElementsBySelector("input").each(function(input){
			name = input.name.sub(/([^\[]*).*/, function(match){
			  return match[1];
			});
			data = input.name.sub(/([^\[]*)\[(.*)\]/, function(match){
			  return match[2];
			});
			
			if (input.type == "checkbox" || input.type == "radio") {
				if (form_store[form_store_read.id] && form_store[form_store_read.id][name] && form_store[form_store_read.id][name][data])
					input.checked = true
			}
			else {
				if (form_store[form_store_read.id] && form_store[form_store_read.id][name])
					input.value = form_store[form_store_read.id][name]
			}
		});
			
	});
}


$$('div.form_store_save').each(function(form_store_save){
	
	form_store_save.getElementsBySelector("input").each(function(input){
		name = input.name.sub(/([^\[]*).*/, function(match){
		  return match[1];
		});
		data = input.name.sub(/([^\[]*)(.*)/, function(match){
		  return match[2];
		});
		input.name = "form_field["+name+"]" + data
	});
	
	
	// Serialize Fields
	Event.observe(window, 'unload', function(event){
		serialized_fields = "id=" + form_store_save.id + "&" + Form.serialize(form_store_save)
		new Ajax.Request('/course/session_form_store', {asynchronous:false, method:'post', parameters:serialized_fields})
	})
	

});


$$('.connect_line_activity').each(function(connect_line_activity){
	
//	connect_line_activity.id = getGlobalId();

	var isDrawingLine = false
	var isOverRightEnd = false
	var downX = 0
	var downY = 0
	var canvases = new Array();
	var points = new Array();
	var canvas_count = 0;
	var current_canvas = 0;
	var current_left = 0;
	var current_right = 0;

	// Left Column Items
	connect_line_activity.getElementsBySelector(".left li").each(function(li){

		// Set up a canvas for each li
		if (li.id == "")
			li.id = "line_left_"+(canvas_count)
		canvas_count++;	

		// Initialize Canvas
		id = li.id.gsub("left_line_", "");
		canvases[id] = new jsGraphics(connect_line_activity);
		canvases[id].setStroke(2);

		li.onclick = function()
		{
			current_canvas = li.id.gsub("left_line_", "");
			isDrawingLine = true
			offset = Position.positionedOffset(li);
			
			if (BrowserDetect.browser == "Firefox") {
				borderLeft = 0; borderTop = 0;
			} else {
				borderLeft = parseInt(li.parentNode.parentNode.getStyle("borderLeftWidth").replace("px", ""))
				borderTop = parseInt(li.parentNode.parentNode.getStyle("borderTopWidth").replace("px", ""))
			}
			
			downX = offset[0] + 223 + borderLeft
			downY = offset[1] + 8 + borderTop
			
			current_left = li.className.replace("red", "").replace("green", "").replace("left_", "").strip();
			
			// Strip Old Colors
			if (points[current_left]) {
				li.removeClassName("red");
				li.removeClassName("green");
				
				right = connect_line_activity.getElementsBySelector(".right li.right_"+points[current_left])
				right = right[0];
				
				connectedToRightCount = 0
				points.each( function(id) {
					if (id == points[current_left])
						connectedToRightCount++;
				})
				
				
				if (connectedToRightCount == 1) {
					right.removeClassName("red");
					right.removeClassName("green");
				}
			}
		}

	});
	
	// Right Column Items
	connect_line_activity.getElementsBySelector(".right li").each(function(li){
		
		li.onmousemove= function()
		{
			if (isDrawingLine) {
				isOverRightEnd = true;
				offset = Position.positionedOffset(li);
				
				if (BrowserDetect.browser == "Firefox") {
					borderLeft = 0; borderTop = 0;
				} else {
					borderLeft = parseInt(li.parentNode.parentNode.getStyle("borderLeftWidth").replace("px", ""))
					borderTop = parseInt(li.parentNode.parentNode.getStyle("borderTopWidth").replace("px", ""))
				}
				endX = offset[0] + 10 + borderLeft
				endY = offset[1] + 8 + borderTop
				
				jg = canvases[current_canvas];
				jg.clear();
				jg.drawLine(downX, downY, endX, endY);
				jg.paint();
			}
		}
		
		li.onmouseout = function() {
			isOverRightEnd = false;
		}
		
		li.onmousedown = function() {
			if (isDrawingLine) {
			
				isDrawingLine = false;
				current_right = li.className.replace("red", "").replace("green", "").replace("right_", "").strip();
				points[current_left] = current_right


				if (current_left == current_right){
					color = "green";
					removeColor = "red"
					lineColor = "#88AA22";
				} else {
					color = "red";
					removeColor = "green"
					lineColor = "#DD4433";
				}
			
				left = connect_line_activity.getElementsBySelector(".left li.left_"+current_left)
				left = left[0];
				left.addClassName(color)
				left.removeClassName(removeColor)
			
				right = connect_line_activity.getElementsBySelector(".right li.right_"+current_right)
				right = right[0];
				right.addClassName(color)
				right.removeClassName(removeColor)
			
				jg = canvases[current_canvas];
				jg.clear();
				jg.setColor(lineColor);
				jg.drawLine(downX, downY, endX, endY);
			
				jg.paint();
			}
		}
	});
	
	// Global Mousemove
	Event.observe(document, "mousemove", function(evt) {
		
		if (isDrawingLine && isOverRightEnd == false) {

			jg = canvases[current_canvas];
			jg.clear();
			jg.setColor("#000000");

			pointerX = Event.pointerX(evt)
			pointerY = Event.pointerY(evt)

			limitX = 200;
			if (pointerX - downX > limitX)
				endX = downX + limitX
			else if (pointerX - downX < -limitX)
					endX = downX - limitX	
			else
				endX = evt.clientX;

			limitY = 200;
			if (pointerY - downY > limitY)
				endY = downY + limitY
			else if (pointerY - downY < -limitY)
					endY = downY - limitY
			else
				endY = pointerY;	

			// Dont touch the cursor exactly
			endX = endX - 1
			endY = endY - 1

			jg.drawLine(downX, downY, endX, endY); // co-ordinates related to "myCanvas"
			jg.paint();
		}
		
	})
	
});

function add_skip_next_link() {
  if ($$("a.skip").length == 0) {
    var next = $$("a.next")[0];
    if (next == null) {
      next = $$("a.bigbutton")[0];
    }
    var skip = document.createElement("A");
    skip.href = next.href;
    skip.className = "skip"
    var pixel = document.createElement("IMG");
    pixel.src = '/images/1.gif'
    pixel.alt = 'Click here to proceed to next section'
    pixel.width = "1"
    pixel.height = "1"
  
    skip.appendChild(pixel);
    next.parentNode.appendChild(skip);
  }
}

function getGlobalId()
{
	id = global_id_count++;
	return "global_id_"+id;
}