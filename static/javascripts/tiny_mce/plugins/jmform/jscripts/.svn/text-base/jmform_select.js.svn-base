/**
 *
 * @author Jason McInerney
 * For TinyMCE
 */
 
var action;

function insertSelect() {
	var formObj = document.forms[0];
	var inst = tinyMCE.selectedInstance;
	var focusElm = inst.getFocusElement();
	var html = '';
	
	if (!AutoValidator.validate(formObj)) {
		alert(tinyMCE.getLang('lang_invalid_data'));
		return false;
	}

	tinyMCEPopup.restoreSelection();

	// Get form data
	jmformName = formObj.elements['jmformName'].value;
	jmformOptions = formObj.elements['jmformOptions'].value;
	jmformOptionsArr = new Array();
	re = new RegExp("(\r\n)|(\r)|(\n)", 'gi');
	jmformOptions = jmformOptions.replace(re,"~|~");
	jmformOptionsArr = jmformOptions.split("~|~");
	defval = formObj.elements['defval'].value;
	width = formObj.elements['width'].value;
	height = formObj.elements['height'].value;
	onfocus = formObj.elements['onfocus'].value;
	onblur = formObj.elements['onblur'].value;
	onchange = formObj.elements['onchange'].value;
	onselect = formObj.elements['onselect'].value;
	onclick = formObj.elements['onclick'].value;
	size = formObj.elements['size'].value;
	id = formObj.elements['jmformId'].value;
	if (formObj.elements['required'].checked) required = 'true';
	else required = '';
	if (formObj.elements['multiple'].checked) multiple = 'true';
	else multiple = '';
	if (formObj.elements['disabled'].checked) disabled = 'true';
	else disabled = '';
	summary = formObj.elements['summary'].value;
	style = formObj.elements['style'].value;
	className = formObj.elements['class'].options[formObj.elements['class'].selectedIndex].value;
	
	// Update table
	if (action == "update") {
		inst.execCommand('mceBeginUndoLevel');
		var elm = tinyMCE.getParentElement(focusElm, "select");
		tinyMCE.setAttrib(elm, 'name', jmformName, true);
		tinyMCE.setAttrib(elm, 'onfocus', onfocus, true);
		tinyMCE.setAttrib(elm, 'onblur', onblur, true);
		tinyMCE.setAttrib(elm, 'onchange', onchange, true);
		tinyMCE.setAttrib(elm, 'onselect', onselect, true);
		tinyMCE.setAttrib(elm, 'onclick', onclick, true);
		tinyMCE.setAttrib(elm, 'size', size, true);
		tinyMCE.setAttrib(elm, 'disabled', disabled, true);
		tinyMCE.setAttrib(elm, 'required', required, true);
		tinyMCE.setAttrib(elm, 'multiple', multiple, true);
		tinyMCE.setAttrib(elm, 'style', style);
		tinyMCE.setAttrib(elm, 'id', id);
		tinyMCE.setAttrib(elm, 'summary', summary);
		
		elm.options.length = 0;
		for (var i=0; i<jmformOptionsArr.length; i++) {
			var option = Array();
			option = jmformOptionsArr[i].split("=");
			elm.options.length += 1;
			if (option[0] != '') {
				elm.options[i].text = option[0];
				elm.options[i].value = option[1];
				if (defvalue == option[1]) elm.selectedIndex = i;
			}
		}
		// Fix for stange MSIE align bug
		tinyMCE.jmformElm.outerHTML = tinyMCE.jmformElm.outerHTML;

		tinyMCE.triggerNodeChange();
		inst.execCommand('mceEndUndoLevel');

		tinyMCEPopup.close();
		return true;
	}

	// Create new form
	html += '<select';

	html += makeAttrib('id', id);
	html += makeAttrib('name', jmformName);
	html += makeAttrib('onfocus', onfocus);
	html += makeAttrib('onblur', onblur);
	html += makeAttrib('onchange', onchange);
	html += makeAttrib('onselect', onselect);
	html += makeAttrib('onclick', onclick);
	html += makeAttrib('size', size);
	html += makeAttrib('required', required);
	html += makeAttrib('multiple', multiple);
	html += makeAttrib('disabled', disabled);
	html += makeAttrib('class', tinyMCE.getVisualAidClass(className));
	html += makeAttrib('style', style);
	html += makeAttrib('summary', summary);
	html += ' >';

	for (var i=0; i<jmformOptionsArr.length; i++) {
		var option = new Array();
		var optionPair = jmformOptionsArr[i];
		option = optionPair.split("=");
		if (option[0] != '') {
				html += '<option';
			html += makeAttrib('value',option[1]);
			if (defval == option[1]) html += makeAttrib('selected','true');
			html += ' >' + option[0] + '</option>';
		}
	}
	
	html += '</select>';
	
	inst.execCommand('mceBeginUndoLevel');
	inst.execCommand('mceInsertContent', false, html);
	inst.execCommand('mceEndUndoLevel');

	tinyMCEPopup.close();
}

function makeAttrib(attrib, value) {
	var formObj = document.forms[0];
	var valueElm = formObj.elements[attrib];

	if (typeof(value) == "undefined" || value == null) {
		value = "";

		if (valueElm)
			value = valueElm.value;
	}

	if (value == "")
		return "";

	// XML encode it
	value = value.replace(/&/g, '&amp;');
	value = value.replace(/\"/g, '&quot;');
	value = value.replace(/</g, '&lt;');
	value = value.replace(/>/g, '&gt;');

	return ' ' + attrib + '="' + value + '"';
}
function init() {
	tinyMCEPopup.resizeToInnerSize();

	document.getElementById('backgroundimagebrowsercontainer').innerHTML = getBrowserHTML('backgroundimagebrowser','backgroundimage','image','table');
	document.getElementById('bordercolor_pickcontainer').innerHTML = getColorPickerHTML('bordercolor_pick','bordercolor');
	document.getElementById('bgcolor_pickcontainer').innerHTML = getColorPickerHTML('bgcolor_pick','bgcolor')

	var inst = tinyMCE.selectedInstance;
	var selElm = tinyMCE.getParentElement(inst.getFocusElement(), "select");
	var formObj = document.forms[0];
    var jmformName = '', jmformOptions = ''; jmformOptionsArr = new Array(), width = '', height = '', size = '', disabled = '', required = '';
    var defval = '', multiple = '', onfocus = '', onblur = '', onchange = '', onselect = '', onclick = '';
    var st = '', bordercolor = '', bgcolor = '', backgroundimage = '', id = '', className = '';
    
    if (selElm != undefined) {
    	st = tinyMCE.parseStyle(tinyMCE.getAttrib(selElm, "style"));
    
    	// Get select element data
    	jmformName = tinyMCE.getAttrib(selElm, 'name');
    	jmformOptions = '';
    	jmformOptionsArr = new Array();
    	if (selElm.selectedIndex != undefined && selElm.options[selElm.selectedIndex] != undefined) defval =  selElm.options[selElm.selectedIndex].value;
    	width = trimSize(getStyle(selElm, 'width', 'width'));
    	height = trimSize(getStyle(selElm, 'height', 'height'));
    	size = tinyMCE.getAttrib(selElm, 'size');
    	required = tinyMCE.getAttrib(selElm, 'required');
    	multiple = tinyMCE.getAttrib(selElm, 'multiple');
    	disabled = tinyMCE.getAttrib(selElm, 'disabled');
    	onfocus = tinyMCE.getAttrib(selElm, 'onfocus');
    	onblur = tinyMCE.getAttrib(selElm, 'onblur');
    	onchange = tinyMCE.getAttrib(selElm, 'onchange');
    	onselect = tinyMCE.getAttrib(selElm, 'onselect');
    	onclick = tinyMCE.getAttrib(selElm, 'onclick');
    	bordercolor = convertRGBToHex(getStyle(selElm, 'bordercolor', 'borderLeftColor'));
    	bgcolor = convertRGBToHex(getStyle(selElm, 'bgcolor', 'backgroundColor'));
    	backgroundimage = getStyle(selElm, 'background', 'backgroundImage').replace(new RegExp("url\\('?([^']*)'?\\)", 'gi'), "$1");;
    	id = tinyMCE.getAttrib(selElm, 'id');
        className = tinyMCE.getVisualAidClass(tinyMCE.getAttrib(selElm, 'class'), false);
        
        if (selElm.firstChild != undefined && selElm.firstChild.text != '') {
    		var curElm = selElm.firstChild;
    		while (curElm.nextSibling != undefined) {
    			if (curElm.text != '') jmformOptions += curElm.text + '=' + curElm.value + '\r\n';
    			curElm = curElm.nextSibling;
    		}
    		if (curElm.text != '') jmformOptions += curElm.text + '=' + curElm.value + '\r\n';	
    	}
	}
	// Setup form
	addClassesToList('class', "jmform_styles");
    selectByValue(formObj, 'class', className);
    formObj.bordercolor.value = bordercolor;
	formObj.bgcolor.value = bgcolor;
	formObj.backgroundimage.value = backgroundimage;
	formObj.width.value = width;
	formObj.height.value = height;
	formObj.jmformId.value = id;
	formObj.jmformName.value = jmformName;
	formObj.jmformOptions.value = '';
	formObj.defval.value = defval;
	formObj.size.value = size;
	formObj.required.checked = required;
	formObj.multiple.checked = multiple;
	formObj.disabled.checked = disabled;
	formObj.onfocus.value = onfocus;
	formObj.onblur.value = onblur;
	formObj.onchange.value = onchange;
	formObj.onselect.value = onselect;
	formObj.onclick.value = onclick;
	formObj.style.value = tinyMCE.serializeStyle(st);
	formObj.jmformOptions.value = jmformOptions;
	
	// Resize some elements
	if (isVisible('backgroundimagebrowser'))
		document.getElementById('backgroundimage').style.width = '180px';

	updateColor('bordercolor_pick', 'bordercolor');
	updateColor('bgcolor_pick', 'bgcolor');
}

function updateAction() {
	tinyMCEPopup.restoreSelection();

	var inst = tinyMCE.selectedInstance;
	var selElm = tinyMCE.getParentElement(inst.getFocusElement(), "select");
	var jmformElm = tinyMCE.getParentElement(inst.getFocusElement(), "form");
	var formObj = document.forms[0];

	inst.execCommand('mceBeginUndoLevel');
	tinyMCE.triggerNodeChange();
	inst.execCommand('mceEndUndoLevel');
	tinyMCEPopup.close();
}


function updateElem(sel, skip_id) {
	var inst = tinyMCE.selectedInstance;
	var formObj = document.forms[0];
	var doc = inst.getDoc();

	if (!skip_id)
		sel.setAttribute('id', formObj.jmformId.value);

	sel.setAttribute('style', tinyMCE.serializeStyle(tinyMCE.parseStyle(formObj.style.value)));
	tinyMCE.setAttrib(td, 'class', getSelectValue(formObj, 'class'));


	// Set styles
	sel.style.width = getCSSSize(formObj.width.value);
	sel.style.height = getCSSSize(formObj.height.value);
	if (formObj.bordercolor.value != "") {
		sel.style.borderColor = formObj.bordercolor.value;
		sel.style.borderStyle = sel.style.borderStyle == "" ? "solid" : sel.style.borderStyle;
		sel.style.borderWidth = sel.style.borderWidth == "" ? "1px" : sel.style.borderWidth;
	} else
		sel.style.borderColor = '';

	sel.style.backgroundColor = formObj.bgcolor.value;

	if (formObj.backgroundimage.value != "")
		sel.style.backgroundImage = "url('" + formObj.backgroundimage.value + "')";
	else
		sel.style.backgroundImage = '';

	return sel;
}

function changedBackgroundImage() {
	var formObj = document.forms[0];
	var st = tinyMCE.parseStyle(formObj.style.value);

	st['background-image'] = "url('" + formObj.backgroundimage.value + "')";

	formObj.style.value = tinyMCE.serializeStyle(st);
}

function changedSize() {
	var formObj = document.forms[0];
	var st = tinyMCE.parseStyle(formObj.style.value);

	var width = formObj.width.value;
	if (width != "")
		st['width'] = getCSSSize(width);
	else
		st['width'] = "";

	var height = formObj.height.value;
	if (height != "")
		st['height'] = getCSSSize(height);
	else
		st['height'] = "";

	formObj.style.value = tinyMCE.serializeStyle(st);
}

function changedColor() {
	var formObj = document.forms[0];
	var st = tinyMCE.parseStyle(formObj.style.value);

	st['background-color'] = formObj.bgcolor.value;
	st['border-color'] = formObj.bordercolor.value;

	formObj.style.value = tinyMCE.serializeStyle(st);
}

function changedStyle() {
	var formObj = document.forms[0];
	var st = tinyMCE.parseStyle(formObj.style.value);

	if (st['background-image'])
		formObj.backgroundimage.value = st['background-image'].replace(new RegExp("url\\('?([^']*)'?\\)", 'gi'), "$1");
	else
		formObj.backgroundimage.value = '';

	if (st['width'])
		formObj.width.value = trimSize(st['width']);

	if (st['height'])
		formObj.height.value = trimSize(st['height']);

	if (st['background-color']) {
		formObj.bgcolor.value = st['background-color'];
		updateColor('bgcolor_pick','bgcolor');
	}

	if (st['border-color']) {
		formObj.bordercolor.value = st['border-color'];
		updateColor('bordercolor_pick','bordercolor');
	}
}
