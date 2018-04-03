/**
 * Form validation script included with the JMForm plugin for TinyMCE
 * @author Jason McInerney
 */
    //does the actual checking
    function CheckForm(theform) {
        var form_err = '';
        for (var i=0;i<theform.elements.length;i++) {
            theform.elements[i].disabled = 'true';
            if (theform.elements[i].getAttribute('required') != undefined && theform.elements[i].getAttribute('required') == 'true') {
                if (theform.elements[i].value == undefined || theform.elements[i].value == '') {
                    //what to display in the error dialog.  Default is the element name, overiden if there is a summary attribute
                    var err_disp = theform.elements[i].name;
                    if (theform.elements[i].getAttribute('summary') != undefined && theform.elements[i].getAttribute('summary') != '') err_disp = theform.elements[i].getAttribute('summary');
                            
                    //TODO:  add for "radio" type elements
                    //for "select" type elements
                    if (theform.elements[i].length != undefined)
                    {
                        if (theform.elements[i].selectedIndex == undefined || theform.elements[i].options[theform.elements[i].selectedIndex] == undefined || theform.elements[i].options[theform.elements[i].selectedIndex].value == '' ) {
                            form_err = form_err + '\n  -- ' + err_disp;
                        }
                    }
                    else form_err = form_err + '\n  -- ' + err_disp;
                 }
            }
        }
        for (var i=0;i<theform.elements.length;i++) theform.elements[i].disabled = '';		
        
        if (form_err != '') {
            form_err = "The following fields are required:" + form_err;
            alert(form_err);
            return false;
        } else return true;
    }
    //word count for textareas or text inputs
	function WordCount(theform,area,output,max) {
		var text = area.value; //the text entered
		var cnt = 0; //total word count
		var trimmed = ''; //text trimmed to max word count
		words = text.replace(/\s/g,' ');
		words = words.split(' ');
		for (z=0; z<words.length; z++) {
		   if (words[z].length > 0) cnt++;
		   if (cnt <= max) trimmed = trimmed + ' ' + words[z];
		   trimmed = trimmed.replace(/^\s+/,'');
		}
		if (cnt > max) {
			area.value = trimmed;  // comment out if not forcing max word count
			cnt = max;
		}
		//document.forms[theform].elements[output].value = cnt;  // if output is text box
		document.getElementById(output).innerHTML = "Words in abstract: " + cnt; // if output is div
	}
    //for full browser compatibility, instead of javascript: void or similar
    function doNothing() { }
    
    //holds the form action attribute
    var actTemp = '';
    
    //called onsubmit
    function SendRequest(theform,ajax) {
        var the_err = '';
        if (theform.action != 'javascript: doNothing();' && theform.action != '') actTemp = theform.action;
        theform.action = 'javascript: doNothing();';
        var formConf = CheckForm(theform);
        if (formConf) {
            if (ajax) {
                // coming soon...
            }
            else {
                theform.action = actTemp;
                theform.onsubmit = '';
                theform.submit();
            }
        }
    }