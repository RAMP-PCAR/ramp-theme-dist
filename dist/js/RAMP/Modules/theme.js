/*! ramp-theme-intranet 10-02-2015 22:08:15 : v. 5.0.0-rc1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["utils/util"],function(a){"use strict";function b(b){m.clear().fromTo(".sub-panel-container.summary-data-details",h,{top:i.headerHeight+i.toolbarHeight,bottom:i.footerHeight},{top:i.headerHeightCollapsed+i.toolbarHeight,bottom:i.footerHeightCollapsed,ease:"easeOutCirc"},0).fromTo(".sub-panel-container.full-data-details",h,{top:i.headerHeight,bottom:i.footerHeight},{top:i.headerHeightCollapsed,bottom:i.footerHeightCollapsed,ease:"easeOutCirc"},0),k=a.isUndefined(b)?!k:b,k?(TweenLite.to(".full-data-mode .dataTables_scrollBody",h,{height:"+="+j,ease:"easeOutCirc",delay:.02}),l.play()):(TweenLite.to(".full-data-mode .dataTables_scrollBody",h-.02,{height:"-="+j,ease:"easeInCirc"}),c.removeClass("full-screen"),l.reverse())}var c=$("body"),d=$("main"),e=$("footer"),f=$("#wb-bar"),g=$("header"),h=.5,i={headerHeight:195,headerHeightCollapsed:53,footerHeight:30,footerHeightCollapsed:5,subtitleHeight:35,toolbarHeight:32},j=i.headerHeight-i.headerHeightCollapsed+i.footerHeight-i.footerHeightCollapsed,k=!1,l=new TimelineLite({paused:!0}),m=new TimelineLite;return c.hasClass("sub-title")&&(i.headerHeight+=i.subtitleHeight,j+=i.subtitleHeight),l.to(g,h,{top:-1*f.outerHeight(),position:"relative",ease:"easeOutCirc"},0).to(d,h,{top:i.headerHeightCollapsed,bottom:i.footerHeightCollapsed,ease:"easeOutCirc"},0).to(e,h,{height:i.footerHeightCollapsed,ease:"easeOutCirc"},0).call(function(){c.addClass("full-screen")}).add(m,0),{fullScreenCallback:function(a,b){return l.eventCallback(a,b),this},isFullScreen:function(){return k},toggleFullScreenMode:function(a){return b(a),this},tooltipster:function(a,b,c){var d;switch(a=a||$("body"),b){case"map":break;default:d={theme:"tooltipster-shadow",delay:500}}switch(c){case"update":a.find(".tooltipstered").each(function(a,b){var c=$(b);c.attr("data-tooltip",c.attr("title")).tooltipster("content",c.attr("title")).removeAttr("title")});break;case"destroy":a.find(".tooltipstered").each(function(a,b){var c=$(b);c.tooltipster("destroy")});break;default:a.find(".tooltip, ._tooltip").each(function(a,b){var c=$(b),e=c.attr("title");e?c.attr("data-tooltip",c.attr("title")):c.attr("title",c.data("tooltip")),c.tooltipster({theme:c.data("tooltip-theme")||d.theme,delay:d.delay})}).removeAttr("title")}return this}}});