$(document).ready(function(){

  var parent = $(".splitview");
  var topPanel = $('.top');
  var handle = $('.handle');
  var skewHack = 0;


  if(parent.css("classname", 'skewed') != -1){
    skewHack = 1000;
  }

  parent.mouseover(function(event){
    handle.css("left", event.clientX + 'px');
    topPanel.css('width', event.clientX + 'px');
    topPanel.css('width', event.clientX + skewHack + 'px');
  });



});
