/*
* last update: 2006-08-24
*/

editAreaLoader.load_syntax["rhtml"] = {
	'COMMENT_SINGLE' : {}
	,'COMMENT_MULTI' : {'<!--' : '-->'}
	,'QUOTEMARKS' : {1: "'", 2: '"'}
	,'KEYWORD_CASE_SENSITIVE' : false
	,'KEYWORDS' : {
	}
	,'OPERATORS' :[
	]
	,'DELIMITERS' :[
	]
	,'REGEXPS' : {
		'doctype' : {
			'search' : '()(<!DOCTYPE[^>]*>)()'
			,'class' : 'doctype'
			,'modifiers' : ''
			,'execute' : 'before' // before or after
		}
		,'erb' : {
			'search' : '()(<%?|-?%>)()'
			,'class' : 'erb'
			,'modifiers' : 'gi'
			,'execute' : 'before' // before or after
			}	/*
		,'instancevariables' : {
			'search' : '(<%=?.*)(@[0-9a-z_-]+)(.*-?%>)'
			,'class' : 'instancevariables'
			,'modifiers' : 'gi'
			,'execute' : 'before' // before or after
		}	
		,'symbols' : {
			'search' : '(<%=?.*)(:[0-9a-z_-]+)(.*-?%>)'
			,'class' : 'symbols'
			,'modifiers' : 'gi'
			,'execute' : 'before' // before or after
		}	
		,'operators' : {
			'search' : '(<%=?.*)(=>)(.*-?%>)'
			,'class' : 'operators'
			,'modifiers' : 'gi'
			,'execute' : 'before' // before or after
		}	
		,'keywords' : {
			'search' : '(<%=?.*)(end|do)(.*-?%>)'
			,'class' : 'keywords'
			,'modifiers' : 'gi'
			,'execute' : 'before' // before or after
		}*/
		,'tags' : {
			'search' : '(<)(/?[a-z][^ \r\n\t>]*)([^>]*>)'
			,'class' : 'tags'
			,'modifiers' : 'gi'
			,'execute' : 'before' // before or after
		}
		,'attributes' : {
			'search' : '( |\n|\r|\t)([^ \r\n\t=]+)(=)'
			,'class' : 'attributes'
			,'modifiers' : 'g'
			,'execute' : 'before' // before or after
		}
	}
	,'STYLES' : {
		'COMMENTS': 'color: #AAAAAA;'
		,'QUOTESMARKS': 'color: #6381F8;'
		,'KEYWORDS' : {
			}
		,'OPERATORS' : 'color: #E775F0;'
		,'DELIMITERS' : ''
		,'REGEXPS' : {
			'attributes': 'color: #B1AC41;'
			,'tags': 'color: #E62253;'
			,'instancevariables': 'color: #00FF00;'
			,'symbols': 'color: #00F;'
			,'operators': 'color: #FFFF00;'
			,'keywords': 'color: #FF6600;font-weight:bold;'
			,'erb': 'color: #660000;font-weight:bold;'
			,'doctype': 'color: #8DCFB5;'
			,'test': 'color: #00FF00;'
		}	
	}		
};
