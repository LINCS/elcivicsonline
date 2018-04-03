
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

function restartGif(){
	for(var i=0; i<document.images.length; i++){
		var img = document.images[i];
		var imgName = img.src.toUpperCase();
		if (imgName.substring(imgName.length-3, imgName.length) == "GIF"){
			img.src = img.src;
		}
	}
}	
Ajax.Responders.register({
  onCreate: function() {
    restartGif();
  }
});

function update_revisions(name, id)
{
	if ($('revisions_'+name).visible())
	{
		Effect.BlindUp('revisions_'+name, {afterFinish: function (element) { 
			Element.show('spinner_'+name);
			new Ajax.Updater('revisions_'+name, 'admin/verbiage/revisions?name='+name+'&page_id='+id, {asynchronous:true, evalScripts:true, onComplete:function(request){Element.hide('spinner_'+name);Effect.BlindDown('revisions_'+name);select_verbiage_revision(name, "new");Effect.Fade('button_revisions_'+name);}})
			 }});
	}
	else
		$("content_"+name+"_revision").value = "new"
}

function select_verbiage_revision(name, id)
{
	if (id == "")
	{
		id = $("content_"+name+"_revision").value
	}
	
	if (id == "new")
	{
		id = $(name+'_revisions').descendants().first().id.sub(name+'_revision_', '');
		$("content_"+name+"_revision").value = id
	}		
	else
		$("content_"+name+"_revision").value = id
	
	unselect_all_verbiage_revisions(name);
	$(name+'_revision_'+id).className = "selected";
}

function unselect_all_verbiage_revisions(name)
{
	$$('#'+name+'_revisions li').each( function(el) { el.className = ""; });
}

function get_hotkey(e) {
	var key = (typeof e != 'undefined' && typeof e.which != 'undefined') ? e.which :
	(typeof e != 'undefined' && typeof e.keyCode != 'undefined') ? e.keyCode :
	(typeof window.event != 'undefined' && typeof event.keyCode != 'undefined') ? event.keyCode :
	null;
	if (!key) return true;
	key = String.fromCharCode(key);

	if ((typeof hotkey[key] != 'undefined' && (e.ctrlKey && e.altKey) || (window.event && window.event.altKey))) return hotkey[key]();
}

window.onkeypress = get_hotkey;
var hotkey = new Object();
hotkey['l'] = function() { 
    document.location = "/admin/login";
}



var Reflector = {
  reflect: function(element) {
    element = $(element);
    options = $H({
      amount: 1/3,
      opacity: 1/3
    }).merge(arguments[1] || {});
    
    var p = element.parentNode, n = element.nextSibling;
    var d = 1.0/(element.height*options.amount);
      
    (element.height*options.amount).times( function(line) {
      var h = Builder.node('div',{style:'height:1px;overflow:hidden'},
        [Builder.node('img',{src:element.src, 
          style:'margin-top:-'+(element.height-line-1)+'px'
        })]);
      p.insertBefore(h,n);
      $(h).setOpacity((1-d*line)*options.opacity);
    });
  }
}

var Popup = {
	windows: {},
  open: function(options)
  {
    this.options = {
      url: '#',
      width: 600,
      height: 500,
      name:"_blank",
      location:"no",
      menubar:"no",
      toolbar:"no",
      status:"yes",
      scrollbars:"yes",
      resizable:"yes",
      left:"",
      top:"",
      normal:false
    }
    Object.extend(this.options, options || {});

    if (this.options.normal){
        this.options.menubar = "yes";
        this.options.status = "yes";
        this.options.toolbar = "yes";
        this.options.location = "yes";
    }

    this.options.width = this.options.width < screen.availWidth?this.options.width:screen.availWidth;
    this.options.height=this.options.height < screen.availHeight?this.options.height:screen.availHeight;
    var openoptions = 'width='+this.options.width+',height='+this.options.height+',location='+this.options.location+',menubar='+this.options.menubar+',toolbar='+this.options.toolbar+',scrollbars='+this.options.scrollbars+',resizable='+this.options.resizable+',status='+this.options.status
    if (this.options.top!="")openoptions+=",top="+this.options.top;
    if (this.options.left!="")openoptions+=",left="+this.options.left;
    this.windows[this.options.name] = window.open(this.options.url, this.options.name,openoptions );
    return false;
  }
}
