/**
 * JMForm plugin for TinyMCE
 * @author Jason McInerney
 */
 
var action;

function setAutoValidate(on) {
    var formObj = document.forms[0];
    if (on) {
        formObj.elements['jmformOnsubmit'].value = 'SendRequest(this);';
        formObj.elements['jmformOnsubmit'].disabled = 'true';
        //alert('Auto-validation requires that you include the jmformproc.js script in your form page HTML and that you set required fields using the "Required" attribute in the element dialogs.');
    }
    else {
        formObj.elements['jmformOnsubmit'].value = '';
        formObj.elements['jmformOnsubmit'].disabled = '';
        //alert('Auto-validation has been turned off.  Be sure to update your "onsubmit" attribute if any action is desired.');
    }
}

function insertForm() {
	var formObj = document.forms[0];
	var inst = tinyMCE.selectedInstance;
	var focusElm = inst.getFocusElement();
	var jmformAction = "", jmformMethod = "POST", className;
	var jmformName = "";
	var html = '';
	
	if (!AutoValidator.validate(formObj)) {
		alert(tinyMCE.getLang('lang_invalid_data'));
		return false;
	}

	tinyMCEPopup.restoreSelection();

	// Get form data
	jmformAction = formObj.elements['jmformAction'].value;
	jmformMethod = formObj.elements['jmformMethod'].options[formObj.elements['jmformMethod'].selectedIndex].value;
	onsubmit = formObj.elements['jmformOnsubmit'].value;
	onreset = formObj.elements['jmformOnreset'].value;
	target = formObj.elements['jmformTarget'].value;
	enc = formObj.elements['jmformEnctype'].options[formObj.elements['jmformEnctype'].selectedIndex].value;
	jmformId = formObj.elements['jmformId'].value;
	jmformName = formObj.elements['jmformName'].value;
	className = formObj.elements['class'].options[formObj.elements['class'].selectedIndex].value;
	summary = formObj.elements['summary'].value;
	style = formObj.elements['style'].value;
	
	// Update form
	if (action == "update") {
		inst.execCommand('mceBeginUndoLevel');
		var elm = tinyMCE.getParentElement(focusElm, "form");
		tinyMCE.setAttrib(elm, 'action', jmformAction);
		tinyMCE.setAttrib(elm, 'method', jmformMethod);
		tinyMCE.setAttrib(elm, 'onsubmit', onsubmit);
		tinyMCE.setAttrib(elm, 'onreset', onreset);
		tinyMCE.setAttrib(elm, 'target', target);
		tinyMCE.setAttrib(elm, 'enctype', enc);
		tinyMCE.setAttrib(elm, 'class', className);
		tinyMCE.setAttrib(elm, 'style', style);
		tinyMCE.setAttrib(elm, 'id', jmformId);
		tinyMCE.setAttrib(elm, 'name', jmformName);
		tinyMCE.setAttrib(elm, 'summary', summary);
		
		tinyMCE.handleVisualAid(tinyMCE.jmformElm, false, inst.visualAid, inst);

		tinyMCE.handleVisualAid(inst.getBody(), true, inst.visualAid, inst);
		tinyMCE.triggerNodeChange();
		inst.execCommand('mceEndUndoLevel');

		tinyMCEPopup.close();
		return true;
	}

	// Create new form
	html += '<form';

	html += makeAttrib('id', jmformId);
	html += makeAttrib('name', jmformName);
	html += makeAttrib('action', jmformAction);
	html += makeAttrib('method', jmformMethod);
	html += makeAttrib('onsubmit', onsubmit);
	html += makeAttrib('onreset', onreset);
	html += makeAttrib('target', target);
	html += makeAttrib('enctype', enc);
	html += makeAttrib('class', tinyMCE.getVisualAidClass(className));
	html += makeAttrib('style', style);
	html += makeAttrib('summary', summary);

	html += '><br /><br />';

	

	html += "</form>";

	inst.execCommand('mceBeginUndoLevel');
	inst.execCommand('mceInsertContent', false, html);
	tinyMCE.handleVisualAid(inst.getBody(), true, tinyMCE.settings['visual']);
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

	var jmformAction = "", jmformMethod = "POST", target = "", enc = "", jmformName = "";
	var jmformId = "", summary = "", style = "", className = "", onsubmit = "", onreset = "";
	var inst = tinyMCE.selectedInstance;
	var formObj = document.forms[0];
	var jmformElm = tinyMCE.getParentElement(inst.getFocusElement(), "form");

	action = tinyMCE.getWindowArg('action');
	if (action == null)
		action = jmformElm ? "update" : "insert";

	if (jmformElm != undefined && action == "update") {
		st = tinyMCE.parseStyle(tinyMCE.getAttrib(jmformElm, "style"));
		jmformAction = tinyMCE.getAttrib(jmformElm, 'action');
		jmformMethod = tinyMCE.getAttrib(jmformElm, 'method');
		jmformName = tinyMCE.getAttrib(jmformElm, 'name');
		onsubmit = tinyMCE.getAttrib(jmformElm, 'onsubmit');
		onreset = tinyMCE.getAttrib(jmformElm, 'onreset');
		target = tinyMCE.getAttrib(jmformElm, 'target');
		enc = tinyMCE.getAttrib(jmformElm, 'enctype');
		className = tinyMCE.getVisualAidClass(tinyMCE.getAttrib(jmformElm, 'class'), false);
		jmformId = tinyMCE.getAttrib(jmformElm, 'id');
		summary = tinyMCE.getAttrib(jmformElm, 'summary');
		style = tinyMCE.serializeStyle(st);
	}

	addClassesToList('class', "jmform_styles");

	// Update form
	selectByValue(formObj, 'class', className);
    if (onsubmit == 'SendRequest(this);') {
        formObj.jmformAuto.checked = true;
        setAutoValidate(true);
    }
	formObj.jmformAction.value = jmformAction;
	formObj.jmformMethod.value = jmformMethod;
	formObj.jmformName.value = jmformName;
	formObj.jmformOnsubmit.value = onsubmit;
	formObj.jmformOnreset.value = onreset;
	formObj.jmformTarget.value = target;
	formObj.jmformEnctype.value = enc;
	formObj.jmformId.value = jmformId;
	formObj.summary.value = summary;
	formObj.style.value = style;
	formObj.insert.value = tinyMCE.getLang('lang_' + action, 'Insert', true); 
}

function changedStyle() {
	var formObj = document.forms[0];
	var st = tinyMCE.parseStyle(formObj.style.value);

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
