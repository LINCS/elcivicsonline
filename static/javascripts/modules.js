// Content Module Section Tabs

$$("a.print").each(function(print){
  print.onclick = function() {
    window.print();
    return false;
  }
})

$$("#modules #topic_tabs a img").each(function(tab){
  tab.onmouseover = function() {
    if (!this.hasClassName("hover")) {
       this.src = this.src.replace("_hover", "");
       this.src = this.src.replace(".jpg", "_hover.jpg");
    }
  }
  tab.onmouseout = function() {
    if (!this.hasClassName("hover")) this.src = this.src.replace("_hover", "");
  }
});

$$(".buttons a img","a.home img").each(function(button){
  button.onmouseover = function() {
    if (!this.hasClassName("print")) {
      this.src = this.src.replace("_hover", "");
      this.src = this.src.replace(/\.([^\/]+)$/, "_hover.$1");
    }
  }
  button.onmouseout = function() {
    this.src = this.src.replace("_hover", "");
  }
});

$$("#modules .show_list").each(function(el) {
  el.onclick = function() {
    
    $$(".content #listing").each(function(el){
      $(el).style.display = "block";
    });
    
    $$("#listing .list").each(function(el) {
      if (document.location.search.indexOf("sitemap") < 0) {
        Element.hide(el);
      } else {
        Element.show(el);
      }
    });
    list = el.className.match(/list_(.+)/);
    if (list != null) {
      list = list[1];
      $$("#listing ."+list).each(function(list_el){
        $(list_el).style.display = "block";
      });
      $$("#modules #topic_tabs a img").each(function(tab){
        tab.removeClassName("hover");
        tab.src = tab.src.replace("_hover", "");
      });
      $$("#modules #topic_tabs .list_"+list+" img").each(function(tab){
        tab.addClassName("hover");
        tab.src = tab.src.replace(".jpg", "_hover.jpg");
      })
    }
    
    return false;
  }
});


$$("#header .show_list").each(function(el) {
  
  
  
  el.onclick = function() {
    

    $$(".content #listing").each(function(el){
      $(el).style.display = "block";
    });
    
    $$("#listing .list").each(function(el) {
      Element.hide(el);
    });
    list = el.className.match(/list_(.+)/);
    if (list != null) {
      list = list[1];
      $$("#listing ."+list).each(function(list_el){
        $(list_el).style.display = "block";
      });
    }
    
    return false;
  }
});

$$("#modules .close_list").each(function(el) {
  el.onclick = function() {
    $$("body.content #listing").each(function(el){
      $(el).style.display = "none";
    });
    $$("#listing .list").each(function(el) {
      Element.hide(el);
    });
    $$("#modules #topic_tabs a img").each(function(tab){
      tab.removeClassName("hover");
      tab.src = tab.src.replace("_hover", "");
    });
    return false;    
  }
})

if (hash = window.location.href.match(/#(.+)$/)) {
  if (hash.length > 1) {    
    list = hash[1];
    $$("#listing ."+list).each(function(list_el){
      $(list_el).style.display = "block";
    });
    $$("#modules #topic_tabs a img").each(function(tab){
      tab.removeClassName("hover");
      tab.src = tab.src.replace("_hover", "");
    });
    $$("#modules #topic_tabs .list_"+list+" img").each(function(tab){
      tab.addClassName("hover");
      tab.src = tab.src.replace(".jpg", "_hover.jpg");
    })
  }
  
  
}

if (document.location.search.indexOf("sitemap") > 0) {
 $$("#listing .list").each(function(list_el){
      $(list_el).style.display = "block";
 });
 $$(".close_list").each(function(el){ el.hide();});
 $("topic_tabs").hide();
}

