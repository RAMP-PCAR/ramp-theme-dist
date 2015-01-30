/*! ramp-theme-canada 30-01-2015 15:37:51 : v. 5.0.0-8 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/_base/array","dojo/topic","dojo/_base/lang","dojo/Deferred","ramp/globalStorage","ramp/eventManager","ramp/theme","dojo/text!./templates/sub_panel_template.json","utils/util","utils/dictionary","utils/popupManager","utils/tmplHelper","dojo/domReady!"],function(a,b,c,d,e,f,g,h,i,j,k,l){"use strict";function m(a){var b=Object.create(C);return b._attr=Object.create(B),b.create(a),b}function n(a){var b,e=new d;e.then(function(){a=b.getAttributes(),b=A[a.origin],b.open(),b.getPanel().find(".sub-panel-toggle").on("click",c.hitch(this,function(){o(a),"#map-div"!==a.target.selector&&$(a.target).find(":tabbable").first().focus()}))}),a.consumeOrigin&&A[a.consumeOrigin]&&(b=A[a.consumeOrigin],b.changeOrigin(a.origin),b.shiftTarget(a.target),delete A[a.consumeOrigin],A[a.origin]=b),A[a.origin]?A[a.origin].update(a):a.update||(b=m(a),A[a.origin]=b,i.executeOnDone(A,function(b,c){b&&b.getOrigin()!==a.origin?o({origin:b.getOrigin()},200,c):c.resolve(!0)},e))}function o(a,b,c){var e=new d(function(){c&&c.cancel()});e.then(function(){delete A[a.origin],c&&c.resolve(!0)}),A[a.origin]&&A[a.origin].destroy(b,e)}function p(a){var b=a.target||t.getPanelContainer(),c=A[a.origin];c&&c.shiftTarget(b)}function q(a){var b;a.consumeOrigin===a.origin&&A[a.consumeOrigin]?(b=A[a.origin],b.shiftTarget(a.target)):a.consumeOrigin&&A[a.consumeOrigin]&&(b=A[a.consumeOrigin],b.changeOrigin(a.origin),b.shiftTarget(a.target),delete A[a.consumeOrigin],A[a.origin]=b)}var r,s,t,u=$(window),v=$("#panel-div > .wb-tabs"),w=v.find(" > ul[role=tablist]"),x=v.find(" > .tabpanels"),y=$("#mapContent"),z=y.find("#map-load-indicator"),A={},B={panelName:"",title:"",content:null,templateKey:"summary_sub_panel_container",target:null,origin:"",guid:"",update:!1,doOnOpen:null,doAfterOpen:null,doOnHide:null,doAfterHide:null,doOnDestroy:null,doAfterUpdate:null,showChars:170},C={_closing:!1,_destroyDeferred:null,_attr:null,_visible:!1,container:null,panel:null,_subPanelContentDiv:null,_panelTitle:null,_panelContentDiv:null,_animatePanelDuration:.5,timeLine:null,parseContent:function(a){return("object"===jQuery.type(a)?a:$(a)).find(".shorten-candidate").shorten({showChars:this._attr.showChars}).removeClass("shorten-candidate").end()},getAttributes:function(){return this._attr},getContainer:function(){return this.container},getPanel:function(){return this.panel},getOrigin:function(){return this._attr.origin},getGuid:function(){return this._attr.guid},destroy:function(a,b){this._attr.doOnHide&&this._attr.doOnHide(),this._closing=!0,this._destroyDeferred=b,this._subPanelContentDiv.find(".fadeInDown").removeClass("fadeInDown"),t.getPanelContainer().before(this.container),t.subPanelChange(!1,this._attr.origin,this.container,!1),this.timeLine.eventCallback("onReverseComplete",function(){this._attr.doAfterHide&&this._attr.doAfterHide(),this._attr.doOnDestroy&&this._attr.doOnDestroy(),this._visible=!1,t.subPanelChange(!1,this._attr.origin,null,!0),this.container.remove(),b&&b.resolve(!0)},[],this),this.timeLine.reverse()},reopen:function(){this.timeLine.pause(),this._closing=!1,this._destroyDeferred&&(this._destroyDeferred.cancel(),this._destroyDeferred=null),this.open()},open:function(){this._attr.doOnOpen&&this._attr.doOnOpen(),this._visible=!0,t.subPanelChange(!0,this._attr.origin,this.container,!1),this.timeLine.play()},changeOrigin:function(a){this._attr.origin=a},shiftTarget:function(a){this._attr.target!==a&&(this._subPanelContentDiv.find(".fadeInDown").removeClass("fadeInDown"),a.after(this.container),this._attr.target=a)},create:function(a){var b,d;a.guid=a.guid||i.guid(),c.mixin(this._attr,a),tmpl.cache={},tmpl.templates=h,b=tmpl(this._attr.templateKey,c.mixin(this._attr,{closeTitle:i18n.t("gui.actions.close")})),this.container=$(b).insertAfter(this._attr.target),this.panel=this.container.find(".sub-panel"),this._subPanelContentDiv=this.panel.find(".sub-panel-content"),this._panelTitle=this.panel.find(".panel-title"),this._panelContentDiv=this.panel.find(".panel-content-div"),d=this.parseContent(this._attr.content),this._panelContentDiv.empty().append(d),this.timeLine=new TimelineLite({paused:!0,onComplete:function(){this._attr.doAfterOpen&&this._attr.doAfterOpen(),t.subPanelChange(!0,this._attr.origin,this.container,!0)},onCompleteScope:this}).to(this.panel,this._animatePanelDuration,{left:0,ease:"easeOutCirc"}).to(z,this._animatePanelDuration,{right:this.panel.width()+6,ease:"easeOutCirc"},0),g.tooltipster(this.container),this.update(this._attr)},update:function(a){var b=300,e='<ul class="loadingAnimation"><li></li><li></li><li></li><li></li><li></li><li></li></ul>',f=[new d,new d],g=function(a,d,e){d&&(a.addClass("animated fadeOutDown"),window.setTimeout(c.hitch(this,function(){a.empty().append(d).removeClass("fadeOutDown").addClass("animated fadeInDown"),e.resolve()}),b))},h=function(a,b,c,d,f,h){c=null===c?d=e:c,c&&c!==b?f?g(a,d,h):(a.empty().append(d),h.resolve()):h.resolve()},j=c.hitch(this,function(a){TweenLite.to(this._subPanelContentDiv,b/1e3,{scrollTop:0,ease:"easeOutCirc"}),h(this._panelTitle,this._attr.title,a.title,a.title,this._visible,f[0]),h(this._panelContentDiv,this._attr.content,a.content,this.parseContent(a.content),this._visible,f[1]),c.mixin(this._attr,a)});i.afterAll(f,function(){a.doAfterUpdate&&a.doAfterUpdate()}),this._closing&&!a.update?(this._attr.guid!==a.guid&&(this._attr.doOnHide&&this._attr.doOnHide(),this._attr.doAfterHide&&this._attr.doAfterHide(),a.target.after(this.container),j(a)),this.reopen()):this._closing||(a.update||this._attr.guid===a.guid||(this._attr.doOnHide&&this._attr.doOnHide(),this._attr.doAfterHide&&this._attr.doAfterHide(),a.target.after(this.container),j(a),a.doOnOpen&&a.doOnOpen(),a.doAfterOpen&&a.doAfterOpen()),this._attr.guid===a.guid&&j(a))}},D=$("#helpToggle"),E=$("#help-section-container"),F=$("#help-section"),G=$("#addLayer-toggle"),H=$("#addLayer-section-container"),I="button-pressed",J="state-expanded",K=.5;return t=function(){function a(){F.css({"max-height":u.height()-(N?.2*u.height():G.offset().top)-90})}function c(){a(),v(),b.publish(f.GUI.FULLSCREEN_CHANGE,{visible:g.isFullScreen()})}function d(a){b.publish(f.GUI.PANEL_CHANGE,{visible:a})}function e(a){P.eventCallback("onReverseComplete",function(){v(),d(!0),L.tooltipster("content",i18n.t("gui.actions.close")).find("span.wb-invisible").text(i18n.t("gui.actions.close")),a.resolve()},[],this),B.removeClass("no-sidepanel-mode"),P.reverse()}function h(a){P.eventCallback("onComplete",function(){v(),d(!1),L.tooltipster("content",i18n.t("gui.actions.open")).find("span.wb-invisible").text(i18n.t("gui.actions.open")),B.addClass("no-sidepanel-mode"),a.resolve()},[],this),P.play()}function l(a){N=i.isUndefined(a)?!N:a,N?(B.addClass("full-data-mode"),O.play()):(Q.reverse(),O.reverse()),j.forEachEntry(A,function(a){o({origin:a})})}function m(){r=M>s?340:430}function n(){(M>s&&u.width()>M||s>M&&u.width()<M)&&(s=u.width(),m(),i.resetTimelines(z,!0))}var p,q,r,s,v,w,x,y,z,B=$(".viewport"),C=$("#map-div"),D=$("#mapContent"),E=$("#fullScreenToggle"),G=$("#map-toolbar"),H=$("#basemapControls"),I=$("#panel-div"),L=$("#panel-toggle"),M=1200,N=!1,O=new TimelineLite({paused:!0,onComplete:function(){a(),v(),G.find(".map-toolbar-item-button").map(function(a,b){b=$(b),b.addClass("_tooltip").attr("title",b.find("span").text())}),g.tooltipster(G)},onReverseComplete:function(){B.removeClass("full-data-mode"),a(),v(),g.tooltipster(G,null,"destroy"),G.find(".map-toolbar-item-button").removeClass("_tooltip").removeAttr("title")}}),P=new TimelineLite({paused:!0}),Q=new TimelineLite({paused:!0});return w=function(){O.fromTo(C,K,{width:"auto"},{width:35,ease:"easeOutCirc"},0).fromTo(D,K,{opacity:1},{opacity:0,ease:"easeOutCirc"},0).set(D,{top:"500px"}).to(L,K,{right:-13,ease:"easeOutCirc"},0).set(L,{display:"none"}).to(H,K/2,{opacity:0,ease:"easeOutCirc"},0).to(H,0,{display:"none"},K/2).fromTo(G,K/2,{width:"100%",height:"32px"},{width:"32px",height:$("#map-div").height(),ease:"easeOutCirc"},K/2).to(G.find(".map-toolbar-item-button span"),K/2,{width:0,ease:"easeOutCirc"},0).set(G.find(".map-toolbar-item-button span"),{display:"none"},K/2).fromTo(I.find(".wb-tabs > ul li:first"),K,{width:"50%"},{width:"0%",display:"none",ease:"easeOutCirc"},0).fromTo(I.find(".wb-tabs > ul li:last"),K,{width:"50%"},{width:"100%",className:"+=h5",ease:"easeOutCirc"},0).fromTo(I,K,{width:r,left:"auto"},{left:35,width:"auto",ease:"easeOutCirc"},0)},x=function(){P.fromTo(I,K,{right:0},{right:-r,ease:"easeOutCirc"},0).set(I,{display:"none"},K).fromTo(C,K,{right:r},{right:0,ease:"easeOutCirc"},0)},y=function(){Q.fromTo(I,K,{right:0},{right:r,ease:"easeOutCirc"})},z=[{timeLine:O,generator:w},{timeLine:P,generator:x},{timeLine:Q,generator:y}],v=function(){N||b.publish(f.GUI.LAYOUT_CHANGE)},{init:function(){s=u.width(),u.on("resize",n),m(),i.resetTimelines(z),g.fullScreenCallback("onComplete",c).fullScreenCallback("onReverseComplete",c),q=k.registerPopup(L,"click",e,{activeClass:J,closeHandler:h}),b.subscribe(f.GUI.PANEL_TOGGLE,function(a){q.toggle(null,a.visible)}),p=k.registerPopup(E,"click",function(a){g.toggleFullScreenMode(),a.resolve()},{activeClass:"button-pressed",setClassBefore:!0}),D.height()<.6*u.height()&&p.open(),a()},toggleFullScreenMode:function(a){p.toggle(null,a)},isFullData:function(){return N},toggleFullDataMode:function(a){l(a)},subPanelChange:function(a,c,d,e){O.isActive()||!N||e||(a?Q.play():a||Q.reverse()),e||(a?L.hide():L.show()),b.publish(f.GUI.SUBPANEL_CHANGE,{visible:a,origin:c,container:d,offsetLeft:d?d.width()+25+t.getPanelWidth():t.getPanelWidth(),isComplete:e})},getPanelContainer:function(){return I},getPanelWidth:function(){return I.filter(":visible").width()}}}(),{load:function(d,e,g){h=JSON.parse(l.stringifyTemplate(h)),t.init(),r=k.registerPopup(D,"click",function(a){b.publish(f.GUI.HELP_PANEL_CHANGE,{visible:!0}),b.publish(f.GUI.TOOLBAR_SECTION_OPEN,{id:"help-section"}),i.subscribeOnce(f.GUI.TOOLBAR_SECTION_OPEN,c.hitch(this,function(){this.isOpen()&&this.close()})),E.slideToggle("fast",function(){a.resolve()})},{activeClass:I,target:E,closeHandler:function(a){b.publish(f.GUI.HELP_PANEL_CHANGE,{visible:!1}),b.publish(f.GUI.TOOLBAR_SECTION_CLOSE,{id:"help-section"}),E.slideToggle("fast",function(){a.resolve()})},resetFocusOnClose:!0}),s=k.registerPopup(G,"click",function(a){b.publish(f.GUI.ADD_LAYER_PANEL_CHANGE,{visible:!0}),b.publish(f.GUI.TOOLBAR_SECTION_OPEN,{id:"add-layer-section"}),i.subscribeOnce(f.GUI.TOOLBAR_SECTION_OPEN,c.hitch(this,function(){this.isOpen()&&this.close()})),H.slideToggle("fast",function(){a.resolve()})},{activeClass:I,target:H,closeHandler:function(a){b.publish(f.GUI.ADD_LAYER_PANEL_CHANGE,{visible:!1}),b.publish(f.GUI.TOOLBAR_SECTION_CLOSE,{id:"add-layer-section"}),H.slideToggle("fast",function(){a.resolve()})},resetFocusOnClose:!0}),$("#addLayer-add").on("click",function(){b.publish(f.Map.ADD_LAYER,null),s.close()}),b.subscribe(f.GUI.DATAGRID_EXPAND,function(){t.toggleFullDataMode()}),b.subscribe(f.GUI.TOGGLE_FULLSCREEN,function(a){t.toggleFullScreenMode(a.expand)}),b.subscribe(f.GUI.SUBPANEL_OPEN,function(a){n(a)}),b.subscribe(f.GUI.SUBPANEL_CLOSE,function(b){"all"===b.origin?j.forEachEntry(A,function(a){o({origin:a})}):a.forEach(b.origin.split(","),function(a){o({origin:a})})}),b.subscribe(f.GUI.SUBPANEL_DOCK,function(b){var c;"all"===b.origin?j.forEachEntry(A,function(a){c=Object.create(b),c.origin=a,p(c)}):a.forEach(b.origin.split(","),function(a){c=Object.create(b),c.origin=a,p(c)})}),b.subscribe(f.GUI.SUBPANEL_CAPTURE,function(b){var c;"all"===b.consumeOrigin?j.forEachEntry(A,function(a){c=Object.create(b),c.consumeOrigin=a,q(c)}):a.forEach(b.consumeOrigin.split(","),function(a){c=Object.create(b),c.consumeOrigin=a,q(c)})}),w.find("li a").click(function(){var a=$(this).attr("href").substr(1);x.find("details[id="+a+"]").each(function(){b.publish(f.GUI.TAB_SELECTED,{id:this.id,tabName:$(this).data("panel-name")})}),x.find("details[aria-expanded=true]").each(function(){b.publish(f.GUI.TAB_DESELECTED,{id:this.id,tabName:$(this).data("panel-name")})})});var m=[];if(RAMP.state.ui.sidePanelOpened||m.push({publishName:f.GUI.PANEL_TOGGLE,eventArg:{origin:"bootstrapper",visible:RAMP.state.ui.sidePanelOpened},subscribeName:f.GUI.PANEL_CHANGE}),RAMP.state.ui.fullscreen&&m.push({publishName:f.GUI.TOGGLE_FULLSCREEN,eventArg:{expand:!0},subscribeName:f.GUI.FULLSCREEN_CHANGE}),g(),m.isEmpty())b.publish(f.GUI.UPDATE_COMPLETE);else{var u=a.map(m,function(a){return a.subscribeName});i.subscribeAll(u,function(){b.publish(f.GUI.UPDATE_COMPLETE)}),a.forEach(m,function(a){b.publish(a.publishName,a.eventArg)})}}}});