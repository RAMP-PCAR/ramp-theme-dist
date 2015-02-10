/*! ramp-theme-usability 10-02-2015 22:16:06 : v. 5.0.0-rc1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["utils/util"],function(a){"use strict";function b(b){o.clear().fromTo(".sub-panel-container.summary-data-details",j,{top:k.headerHeight+k.toolbarHeight,bottom:k.footerHeight},{top:k.headerHeightCollapsed+k.toolbarHeight,bottom:k.footerHeightCollapsed,ease:"easeOutCirc"},0).fromTo(".sub-panel-container.full-data-details",j,{top:k.headerHeight,bottom:k.footerHeight},{top:k.headerHeightCollapsed,bottom:k.footerHeightCollapsed,ease:"easeOutCirc"},0),m=a.isUndefined(b)?!m:b,m?(TweenLite.to(".full-data-mode .dataTables_scrollBody",j,{height:"+="+l,ease:"easeOutCirc",delay:.02}),n.play()):(TweenLite.to(".full-data-mode .dataTables_scrollBody",j-.02,{height:"-="+l,ease:"easeInCirc"}),c.removeClass("full-screen"),n.reverse())}var c=$("body"),d=$("main"),e=$("footer"),f=$("#wb-sm"),g=$("#wb-bar"),h=g.next(),i=$("header"),j=.5,k={headerHeight:207,headerHeightCollapsed:61,footerHeight:30,footerHeightCollapsed:5,toolbarHeight:32},l=k.headerHeight-k.headerHeightCollapsed+k.footerHeight-k.footerHeightCollapsed,m=!1,n=new TimelineLite({paused:!0}),o=new TimelineLite;return n.to(i,j,{top:-1*g.outerHeight(),position:"relative",ease:"easeOutCirc"},0).set([g,f],{display:"none !important"}).to(h,j,{top:"-22px"},0).fromTo(c,j,{"background-position-y":"43px"},{"background-position-y":"-26px",ease:"easeOutCirc"},0).to(d,j,{top:k.headerHeightCollapsed,bottom:k.footerHeightCollapsed,ease:"easeOutCirc"},0).to(e,j,{height:k.footerHeightCollapsed,ease:"easeOutCirc"},0).call(function(){c.addClass("full-screen")}).add(o,0),{fullScreenCallback:function(a,b){return n.eventCallback(a,b),this},isFullScreen:function(){return m},toggleFullScreenMode:function(a){return b(a),this},tooltipster:function(a,b,c){var d;switch(a=a||$("body"),b){case"map":break;default:d={theme:"tooltipster-shadow",delay:500}}switch(c){case"update":a.find(".tooltipstered").each(function(a,b){var c=$(b);c.attr("data-tooltip",c.attr("title")).tooltipster("content",c.attr("title")).removeAttr("title")});break;case"destroy":a.find(".tooltipstered").each(function(a,b){var c=$(b);c.tooltipster("destroy")});break;default:a.find(".tooltip, ._tooltip").each(function(a,b){var c=$(b),e=c.attr("title");e?c.attr("data-tooltip",c.attr("title")):c.attr("title",c.data("tooltip")),c.tooltipster({theme:c.data("tooltip-theme")||d.theme,delay:d.delay})}).removeAttr("title")}return this}}});