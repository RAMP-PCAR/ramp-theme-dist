/*! ramp-theme-usability 30-01-2015 15:08:24 : v. 5.0.0-7 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["dojo/_base/declare","dojo/_base/lang","dojo/query","dojo/_base/array","dojo/dom-class","dojo/dom-attr","dojo/dom-construct","dojo/topic","dojo/on","dojo/Deferred","dojo/text!./templates/datagrid_template.json","dojo/text!./templates/extended_datagrid_template.json","esri/layers/FeatureLayer","esri/tasks/query","ramp/ramp","ramp/graphicExtension","ramp/globalStorage","ramp/datagridClickHandler","ramp/map","ramp/eventManager","ramp/theme","utils/util","utils/array","utils/dictionary","utils/popupManager","utils/tmplHelper"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z){"use strict";function A(){var a=K.rows().data();U={},$.each(a,function(a,b){var c=b.last().featureUrl,d=p.getOid(b.last().feature);c in U||(U[c]={}),U[c][d]=a})}function B(a){return o.getLayerConfig(a).datagrid}function C(a,b){("keypress"===a.type&&13===a.keyCode||"click"===a.type)&&b()}function D(a){var b={},c=s.getVisibleFeatureLayers(),e=Y.getDatagridMode(),f=new n;c=d.filter(c,function(a){return a.ramp.type!==q.layerType.Static}),e===P?(c=d.filter(c,function(a){return a.url===Y.getSelectedDatasetUrl()}),f.geometry=RAMP.config.extendedDatagridExtentFilterEnabled?s.getMap().extent:s.getMaxExtent()):f.geometry=s.getMap().extent,f.outFields=["*"],X=0,d.forEach(c,function(a){X+=a.graphics.length});var g=d.map(c,function(a){return a.queryFeatures(f).then(function(a){if(a.features.length>0){var c=a.features[0].getLayer();b[c.url]=a.features}})});v.afterAll(g,function(){G(b),Y.updateNotice(),a&&a.resolve()})}function E(a){var b,c=a.getLayer().url;if(Y.getDatagridMode()===O)b=[a.attributes[o.getLayerConfig(c).nameField]];else{b=[];var e=B(c).gridColumns;d.forEach(e,function(c){b.push(a.attributes[c.fieldName]||"")})}return b.push({featureUrl:c,layerName:o.getLayerConfig(c).displayName,feature:a}),b}function F(a){$(".pagination-record-number").text(String.format("{0} / {1}",a,X))}function G(a){if(void 0!==L){if(L.DataTable().clear(),Object.keys(a).isEmpty())return F(0),void L.DataTable().draw();var b=[];x.forEachEntry(a,function(a,c){b=b.concat(d.map(c,function(a){return a[Y.getDatagridMode()]?a[Y.getDatagridMode()]:a[Y.getDatagridMode()]=E(a)}))}),F(b.length),K.one("draw.dt",function(){h.publish(t.Datagrid.EXTENT_FILTER_END)}),L.dataTable().fnAddData(b)}}function H(a){var b=a.data(R),c=parseInt(a.data(Q)),d=s.getFeatureLayer(b),e=w.binaryFind(d.graphics,function(a){return p.getOid(a)-c});return e}function I(){h.subscribe(t.FilterManager.LAYER_VISIBILITY_TOGGLED,function(){W=!0}),h.subscribe(t.GUI.TAB_SELECTED,function(a){"datagrid"===a.tabName&&(W?(W=!1,D()):Y.capturePanel(!0),Y.adjustPanelWidth())}),h.subscribe(t.GUI.TAB_DESELECTED,function(a){"datagrid"===a.tabName&&h.publish(t.GUI.SUBPANEL_DOCK,{origin:"datagrid"})}),h.subscribe(t.Datagrid.APPLY_EXTENT_FILTER,function(){Y.getDatagridMode()!==P&&D()}),h.subscribe(t.LayerLoader.LAYER_UPDATED,function(a){if(a.layer.ramp.type===q.layerType.feature)if(Y.getDatagridMode()!==P)D();else{var b=o.getLayerConfigWithId(a.layer.id),c=document.createElement("option"),d=$("#datasetSelector");c.text=b.displayName,c.value=b.url,d.add(c)}}),h.subscribe(t.Map.ZOOM_END,function(){Y.updateNotice()}),h.subscribe(t.GUI.SUBPANEL_CHANGE,function(a){"ex-datagrid"===a.origin&&a.isComplete&&Y.adjustPanelWidth()})}var J,K,L,M,N,O="summary",P="full",Q="feature-oid",R="feature-url",S=JSON.parse(z.stringifyTemplate(k)),T=JSON.parse(z.stringifyTemplate(l)),U={},V="asc",W=!0,X=0,Y=function(){function a(a){var b=-1,c=null;return{focusedButton:null,isActive:function(){return null!==c},isEqual:function(a,b){var d=c.getLayer().url,e=p.getOid(c);return d===a&&e===b},navigateToRow:function(){if(-1!==b){var a=Math.floor(b/J.rowsPerPage);return K.page()!==a&&L.DataTable().page(a).draw(!1),ib.scrollTo(this.getNode(),300,{axis:"y",offset:{left:0,top:1.5*-this.getNode().height()}}),!0}return!1},setGraphic:function(a){c=a,this.refresh()},refresh:function(){if(c){var a=c.getLayer().url,d=p.getOid(c);b=a in U&&d in U[a]?U[a][d]:-1}else b=-1},getNode:function(){return $(String.format("#jqgrid tbody tr:nth-child({0})",b%J.rowsPerPage+1))},activate:function(){c&&(this.getNode().addClass(a),this.focusedButton&&(this.getNode().find(this.focusedButton).focus(),this.focusedButton=null))},deactivate:function(){c&&(this.getNode().removeClass(a),c=null)}}}function c(){var a={buttonLabel:i18n.t("datagrid.sort"),classAddition:"font-medium global-button",someAttribute:""};return a}function e(a,b,c,e){var f,g=c.last(),h=Y.getDatagridMode();if(h===O){if(v.isUndefined(g[h])){f=z.dataBuilder(g.feature,g.featureUrl);var i=f.lyr.templates.summary;tmpl.cache={},tmpl.templates=S,g[h]=tmpl(i,f)}return g[h]}if(v.isUndefined(g[h])){g[h]=[];var j=B(g.featureUrl).gridColumns;tmpl.cache={},tmpl.templates=T,f=z.dataBuilder(g.feature,g.featureUrl),d.forEach(j,function(a,b){f.columnIdx=b;var c=tmpl(a.columnTemplate,f);"numeric"===a.sortType&&(c=Number(c)),g[h].push(c)})}return g[h][e.col]}function f(){var a,c={info:!1,columnDefs:[],autoWidth:!1,deferRender:!0,paging:!0,pagingType:"ramp",scrollX:!0,destroy:!0,pageLength:J.rowsPerPage,language:i18n.t("datagrid.gridstrings",{returnObjectTrees:!0}),getTotalRecords:function(){return X}};c=rb===O?b.mixin(c,{columns:[{title:"Name",width:"300px",type:"string",className:"",render:e,orderable:!0}],dom:'<"jqgrid_table_wrapper summary-table"t><"status-line"p>',searching:!0}):b.mixin(c,{columns:null===Y.getSelectedDatasetUrl()?[{title:""}]:d.map(B(Y.getSelectedDatasetUrl()).gridColumns,function(a){return{title:a.title,width:a.width?a.width:"100px",type:a.sortType,className:a.alignment?"":"center",render:e}}),dom:'<"jqgrid_table_wrapper full-table"t><"datagrid-info-notice simple"><"status-line"p>',scrollY:"500px",searching:RAMP.config.extendedDatagridExtentFilterEnabled}),L=cb.find("table");var f=!1;K=L.DataTable(c).on("page.dt",function(){h.publish(t.GUI.SUBPANEL_DOCK,{origin:"datagrid,ex-datagrid"}),f=!0}).on("order.dt",function(){h.publish(t.GUI.SUBPANEL_DOCK,{origin:"datagrid,ex-datagrid"})}).on("draw.dt",function(){A(),f?f=!1:Y.activateRows(),Y.adjustPanelWidth(),h.publish(t.Datagrid.DRAW_COMPLETE)}),hb=cb.find("#jqgrid_wrapper"),ib=cb.find(".jqgrid_table_wrapper"),jb=cb.find(".dataTables_scroll"),kb=jb.find(".dataTables_scrollBody"),lb=jb.find(".dataTables_scrollHead"),gb=cb.find(".datagrid-info-notice"),u.tooltipster(hb),rb!==O&&(hb.addClass("fadedOut"),kb.height(ib.height()-lb.height()),a=L.outerWidth(),Y.adjustPanelWidth(),L.forceStyle({width:a+"px"}))}function g(){y.registerPopup(cb,"hoverIntent",function(){this.target.attr("title")&&(this.target.isOverflowed()?this.target.tooltipster({theme:".tooltipster-dark"}).tooltipster("show"):this.target.removeAttr("title"))},{handleSelector:".point-name, .category-name, .title-span",useAria:!1,timeout:500})}function i(){cb.on("click","button.details",function(){var a=$(this),b=a.data(R),c=a.data(Q);if(ob.focusedButton="button.details",ob.isActive()&&ob.isEqual(b,c))r.onDetailDeselect(rb);else{var d=H(a);r.onDetailSelect(a,d,rb)}}),cb.on("click","button.zoomto",function(a){var b=$(this);pb.focusedButton="button.zoomto",b.text()===i18n.t("datagrid.zoomTo")?C(a,function(){M=H(b),N=s.getMap().extent.clone(),r.onZoomTo(s.getMap().extent.clone(),M),v.subscribeOnce(t.Datagrid.EXTENT_FILTER_END,function(){var a=$(String.format("button.zoomto[data-{0}='{1}'][data-{2}='{3}']:eq(0)",Q,p.getOid(M),R,M.getLayer().url));a.text(i18n.t("datagrid.zoomBack"))})}):(r.onZoomBack(M),b.text(i18n.t("datagrid.zoomTo")),v.subscribeOnce(t.Datagrid.EXTENT_FILTER_END,function(){var a=$(String.format("button.zoomto[data-{0}='{1}'][data-{2}='{3}']:eq(0)",Q,p.getOid(M),R,M.getLayer().url));a.focus()}))}),cb.on("click","button.global-button",function(){var a=$(this);"asc"===V?(a.addClass("state-expanded"),V="desc"):(a.removeClass("state-expanded"),V="asc"),L.DataTable().order([0,V]).draw()}),cb.on("click","button.expand",function(){var a=new j;rb=rb===O?P:O,a.then(function(){k()}),I(a),h.publish(t.GUI.DATAGRID_EXPAND)}),cb.on("change","#datasetSelector",function(){var a=$(this),b=a.find("option:selected"),c=b[0].value===db;E(c,!0)}),cb.on("click","#datasetSelectorSubmitButton",function(){var a=mb.find("option:selected");db=a.length>0?a[0].value:"",G()}),y.registerPopup(cb,"hover, focus",function(a){this.target.removeClass("wb-invisible"),a.resolve()},{handleSelector:"tr",targetSelector:".record-controls",closeHandler:function(a){this.target.addClass("wb-invisible"),a.resolve()},activeClass:"bg-very-light",useAria:!1}),y.registerPopup(cb,"hover, focus",function(a){a.resolve()},{handleSelector:".full-table #jqgrid tbody tr",activeClass:"bg-very-light",useAria:!1}),y.registerPopup(cb,"dblclick",function(a){var b=(this.handle.outerHeight()-this.target.height())/2;TweenLite.set(".expand-cell",{clearProps:"padding",className:"-=expand-cell"}),TweenLite.set(this.handle,{padding:b}),window.getSelection().removeAllRanges(),a.resolve()},{handleSelector:"td",targetSelector:".title-span",closeHandler:function(a){TweenLite.set(this.handle,{clearProps:"padding"}),TweenLite.set(this.handle,{className:"-=expand-cell"}),a.resolve()},activeClass:"expand-cell",useAria:!1}),y.registerPopup(cb,"click",function(a){this.target.toggle(),this.handle.find(".separator i").removeClass("fa-angle-down").addClass("fa-angle-up"),a.resolve()},{closeHandler:function(a){this.target.toggle(),this.handle.find(".separator i").removeClass("fa-angle-up").addClass("fa-angle-down"),a.resolve()},handleSelector:".info-notice-button",containerSelector:".datagrid-info-notice",targetSelector:".notice-details"})}function k(){var a,b;rb===O?ib.scroll(function(){a=ib.scrollTop(),b=jb.height()-ib.scrollTop()-ib.height(),0===a?(fb.removeClass("scroll"),gb.removeClass("scroll")):(fb.addClass("scroll"),gb.addClass("scroll")),0===b?eb.removeClass("scroll"):eb.addClass("scroll")}):kb.scroll(function(){a=kb.scrollTop(),0===a?lb.removeClass("scroll"):lb.addClass("scroll")})}function l(a){m(),ob.setGraphic(a.graphic),a.scroll&&Y.activateRows()}function m(){ob.deactivate(),r.onZoomCancel()}function n(a){pb.setGraphic(a.graphic)}function o(){pb.deactivate()}function x(){h.subscribe(t.Datagrid.HIGHLIGHTROW_SHOW,l),h.subscribe(t.Datagrid.HIGHLIGHTROW_HIDE,m),h.subscribe(t.Datagrid.ZOOMLIGHTROW_SHOW,n),h.subscribe(t.Datagrid.ZOOMLIGHTROW_HIDE,o),h.subscribe(t.Datagrid.DRAW_COMPLETE,F)}function E(a,b){var c;b=b||!1,nb.attr("disabled",a).text(i18n.t(a?b?"datagrid.ex.datasetSelectorButtonLoaded":"datagrid.ex.datasetSelectorButtonLoading":"datagrid.ex.datasetSelectorButtonLoad")),c=d.filter(RAMP.config.layers.feature,function(a){return a.url===db}),bb&&c.length>0&&bb.text(": "+c[0].displayName)}function F(){nb.text(i18n.t("datagrid.ex.datasetSelectorButtonLoaded"))}function G(){var a,b=.2,c=new TimelineLite({paused:!0}),d=new TimelineLite({paused:!0}),e=new j;tmpl.cache={},tmpl.templates=S,a=tmpl("datagrid_manager_table_Template",{tableId:"jqgrid",tableCss:"display table-condensed table-simplify"}),ob.isActive()&&(b=.6,r.onDetailDeselect(rb)),c.set(hb,{className:"+=animated fadeOut"}),c.call(function(){c.pause(),hb.replaceWith(a),f(),E(!0),e.then(function(){d.set(hb,{className:"-=fadedOut"}),d.set(hb,{className:"+=animated fadeIn"}),d.set(hb,{className:"-=animated fadeIn"},"+=1"),d.play()}),D(e)},null,this,b+.05),c.play()}function I(a){var e,g,h=c(),i={buttons:h,tableId:"jqgrid",tableCss:"display table-condensed table-simplify"},k=.5,l=new TimelineLite({paused:!0}),m=new TimelineLite({paused:!0}),n=new j;if(tmpl.cache={},tmpl.templates=S,rb===O)g="datagrid_manager_Template",i.buttons.toggleTitle=i18n.t("datagrid.fullData"),bb&&bb.remove();else{g="datagrid_full_manager_Template";var o=d.filter(RAMP.config.layers.feature,function(a){var b=RAMP.map.getLayer(a.id);return b&&b.loaded?b.ramp.type!==q.layerType.Static&&b.visible:void 0});i.buttons=b.mixin(i.buttons,{datasets:o,toggleTitle:i18n.t("datagrid.ex.dataSummary"),txtDataset:i18n.t("datagrid.ex.dataset")}),bb=$("#tabs1_2-lnk").append("<span>").find("span")}e=tmpl(g,i),r.onDetailDeselect(rb),l.set(cb,{className:"+=animated fadeOut"}),L&&l.set(L,{clearProps:"width"}),l.call(function(){l.pause(),cb.empty().append(e),f(),fb=cb.find("#datagridGlobalToggles"),eb=cb.find(".status-line"),mb=$("#datasetSelector"),nb=$("#datasetSelectorSubmitButton"),E(!0),a.resolve(),l.resume(),n.then(function(){m.set(hb,{className:"-=fadedOut"}),m.set(hb,{className:"+=animated fadeIn"}),m.set(hb,{className:"-=animated fadeIn"},"+=1"),m.play()}),D(n)},null,this,k+.1),l.set(cb,{className:"-=fadeOut"}),l.set(cb,{className:"+=fadeIn"}),l.set(cb,{className:"-=animated fadeIn"},"+="+k),l.play()}function W(){ob.refresh(),pb.refresh(),ob.navigateToRow()||pb.navigateToRow(),pb.activate(),ob.activate(),_()}function Z(){return"true"===qb.attr("aria-expanded")}function _(a){var b="datagrid",c=ob.getNode().find(".record-controls");rb===P&&(b="ex-datagrid",c=ob.getNode().find(".button.details")),ob.isActive()&&(Z()||a)&&h.publish(t.GUI.SUBPANEL_CAPTURE,{target:c,consumeOrigin:b,origin:b})}function ab(){rb===O?v.adjustWidthForSrollbar(ib,[fb,eb,gb]):L.outerWidth()===hb.outerWidth()?kb.addClass("overflow-x-hidden"):kb.removeClass("overflow-x-hidden")}var bb,cb,db,eb,fb,gb,hb,ib,jb,kb,lb,mb,nb,ob=a("selected-row"),pb=a("highlighted-row"),qb=$("details[data-panel-name=datagrid]"),rb=O,sb=!1;return{init:v.once(function(){var a=new j;a.then(function(){sb=!0,g(),i(),k(),x()}),cb=$("#"+RAMP.config.divNames.datagrid),I(a)}),getDatagridMode:function(){return rb},getSelectedDatasetUrl:function(){if(db)mb.find("option[value='"+db+"']").prop("selected",!0);else if(mb.find("option:selected").length>0)db=mb.find("option:selected")[0].value;else{var a=w.find(RAMP.config.layers.feature,function(a){var b=RAMP.map.getLayer(a.id);return b?b.visible&&b.ramp.type!==q.layerType.Static:!1});db=null===a?null:a.url}return db},isReady:function(){return sb},adjustPanelWidth:ab,activateRows:W,capturePanel:_,updateNotice:function(){var a,b,c,d={layers:null},e=s.getInvisibleLayers().filter(function(a){return a.ramp&&a.ramp.type===q.layerType.feature});this.isReady()&&(tmpl.cache={},tmpl.templates=S,rb===P?(b=Y.getSelectedDatasetUrl(),c=w.indexOf(e,function(a){return a.url===b}),-1!==c&&(a=tmpl("datagrid_full_info_notice",d))):e.length>0&&(d.layers=e.map(function(a){return a.ramp.config}),a=tmpl("datagrid_info_notice",d)),a?(gb.empty().append(a),cb.addClass("notice")):(gb.empty(),cb.removeClass("notice")))}}}();return{init:function(){var a=d.filter(RAMP.config.layers.feature,function(a){return!a.isStatic});0!==a.length&&(J=a[0].datagrid,I(),Y.init())}}});