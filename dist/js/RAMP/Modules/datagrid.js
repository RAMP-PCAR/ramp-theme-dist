/*! ramp-theme-intranet 30-01-2015 15:27:58 : v. 5.0.0-8 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/_base/declare","dojo/_base/lang","dojo/query","dojo/_base/array","dojo/dom-class","dojo/dom-attr","dojo/dom-construct","dojo/topic","dojo/on","dojo/Deferred","dojo/text!./templates/datagrid_template.json","dojo/text!./templates/extended_datagrid_template.json","esri/layers/FeatureLayer","esri/tasks/query","ramp/ramp","ramp/graphicExtension","ramp/globalStorage","ramp/datagridClickHandler","ramp/map","ramp/eventManager","ramp/theme","utils/util","utils/array","utils/dictionary","utils/popupManager","utils/tmplHelper"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z){"use strict";function A(){var a=K.rows().data();U={},$.each(a,function(a,b){var c=b.last().featureUrl,d=p.getOid(b.last().feature);c in U||(U[c]={}),U[c][d]=a})}function B(a){return o.getLayerConfig(a).datagrid}function C(a,b){("keypress"===a.type&&13===a.keyCode||"click"===a.type)&&b()}function D(a){var b={},c=s.getVisibleFeatureLayers(),e=Z.getDatagridMode(),f=new n;c=d.filter(c,function(a){return a.ramp.type!==q.layerType.Static}),e===P?(c=d.filter(c,function(a){return a.url===Z.getSelectedDatasetUrl()}),f.geometry=RAMP.config.extendedDatagridExtentFilterEnabled?s.getMap().extent:s.getMaxExtent()):f.geometry=s.getMap().extent,f.outFields=["*"],Y=0,d.forEach(c,function(a){Y+=a.graphics.length});var g=d.map(c,function(a){return a.queryFeatures(f).then(function(a){if(a.features.length>0){var c=a.features[0].getLayer();b[c.url]=a.features}})});v.afterAll(g,function(){G(b),Z.initInvisibleLayerToggleCount(),Z.updateNotice(),a&&a.resolve()})}function E(a){var b,c=a.getLayer().url;if(Z.getDatagridMode()===O)b=[a.attributes[o.getLayerConfig(c).nameField]];else{b=[];var e=B(c).gridColumns;d.forEach(e,function(c){b.push(a.attributes[c.fieldName]||"")})}return b.push({featureUrl:c,layerName:o.getLayerConfig(c).displayName,feature:a}),b}function F(a){$(".pagination-record-number").text(String.format("{0} / {1}",a,Y))}function G(a){if(void 0!==L){if(L.DataTable().clear(),Object.keys(a).isEmpty())return F(0),void L.DataTable().draw();var b=[];x.forEachEntry(a,function(a,c){b=b.concat(d.map(c,function(a){return a[Z.getDatagridMode()]?a[Z.getDatagridMode()]:a[Z.getDatagridMode()]=E(a)}))}),F(b.length),K.one("draw.dt",function(){h.publish(t.Datagrid.EXTENT_FILTER_END)}),L.dataTable().fnAddData(b)}}function H(a){var b=a.data(R),c=parseInt(a.data(Q)),d=s.getFeatureLayer(b),e=w.binaryFind(d.graphics,function(a){return p.getOid(a)-c});return e}function I(){h.subscribe(t.FilterManager.LAYER_VISIBILITY_TOGGLED,function(a){if(W=!0,null!==a.id){var b=d.indexOf(X,a.id);-1===b&&a.state?X.push(a.id):-1===b||a.state||X.splice(b,1)}}),h.subscribe(t.GUI.TAB_SELECTED,function(a){"datagrid"===a.tabName&&(W?(W=!1,D()):Z.capturePanel(!0),Z.adjustPanelWidth())}),h.subscribe(t.GUI.TAB_DESELECTED,function(a){"datagrid"===a.tabName&&h.publish(t.GUI.SUBPANEL_DOCK,{origin:"datagrid"})}),h.subscribe(t.Datagrid.APPLY_EXTENT_FILTER,function(){Z.getDatagridMode()!==P&&D()}),h.subscribe(t.LayerLoader.LAYER_UPDATED,function(a){if(a.layer.ramp.type===q.layerType.feature)if(Z.getDatagridMode()!==P)D();else{var b=o.getLayerConfigWithId(a.layer.id),c=document.createElement("option"),d=$("#datasetSelector");c.text=b.displayName,c.value=b.url,d.add(c)}}),h.subscribe(t.Map.ZOOM_END,function(){Z.updateNotice()}),h.subscribe(t.GUI.SUBPANEL_CHANGE,function(a){"ex-datagrid"===a.origin&&a.isComplete&&Z.adjustPanelWidth()})}var J,K,L,M,N,O="summary",P="full",Q="feature-oid",R="feature-url",S=JSON.parse(z.stringifyTemplate(k)),T=JSON.parse(z.stringifyTemplate(l)),U={},V="asc",W=!0,X=[],Y=0,Z=function(){function a(a){var b=-1,c=null;return{focusedButton:null,isActive:function(){return null!==c},isEqual:function(a,b){var d=c.getLayer().url,e=p.getOid(c);return d===a&&e===b},navigateToRow:function(){if(-1!==b){var a=Math.floor(b/J.rowsPerPage);return K.page()!==a&&L.DataTable().page(a).draw(!1),jb.scrollTo(this.getNode(),300,{axis:"y",offset:{left:0,top:1.5*-this.getNode().height()}}),!0}return!1},setGraphic:function(a){c=a,this.refresh()},refresh:function(){if(c){var a=c.getLayer().url,d=p.getOid(c);b=a in U&&d in U[a]?U[a][d]:-1}else b=-1},getNode:function(){return $(String.format("#jqgrid tbody tr:nth-child({0})",b%J.rowsPerPage+1))},activate:function(){c&&(this.getNode().addClass(a),this.focusedButton&&(this.getNode().find(this.focusedButton).focus(),this.focusedButton=null))},deactivate:function(){c&&(this.getNode().removeClass(a),c=null)}}}function c(){var a={buttonLabel:i18n.t("datagrid.sort"),classAddition:"font-medium global-button",someAttribute:""};return a}function e(a,b,c,e){var f,g=c.last(),h=Z.getDatagridMode();if(h===O){if(v.isUndefined(g[h])){f=z.dataBuilder(g.feature,g.featureUrl);var i=f.lyr.templates.summary;tmpl.cache={},tmpl.templates=S,g[h]=tmpl(i,f)}return g[h]}if(v.isUndefined(g[h])){g[h]=[];var j=B(g.featureUrl).gridColumns;tmpl.cache={},tmpl.templates=T,f=z.dataBuilder(g.feature,g.featureUrl),d.forEach(j,function(a,b){f.columnIdx=b;var c=tmpl(a.columnTemplate,f);"numeric"===a.sortType&&(c=Number(c)),g[h].push(c)})}return g[h][e.col]}function f(){var a,c={info:!1,columnDefs:[],autoWidth:!1,deferRender:!0,paging:!0,pagingType:"ramp",scrollX:!0,destroy:!0,pageLength:J.rowsPerPage,language:i18n.t("datagrid.gridstrings",{returnObjectTrees:!0}),getTotalRecords:function(){return Y}};c=sb===O?b.mixin(c,{columns:[{title:"Name",width:"300px",type:"string",className:"",render:e,orderable:!0}],dom:'<"jqgrid_table_wrapper summary-table"t><"status-line"p>',searching:!0}):b.mixin(c,{columns:null===Z.getSelectedDatasetUrl()?[{title:""}]:d.map(B(Z.getSelectedDatasetUrl()).gridColumns,function(a){return{title:a.title,width:a.width?a.width:"100px",type:a.sortType,className:a.alignment?"":"center",render:e}}),dom:'<"jqgrid_table_wrapper full-table"t><"datagrid-info-notice simple"><"status-line"p>',scrollY:"500px",searching:RAMP.config.extendedDatagridExtentFilterEnabled}),L=db.find("table");var f=!1;K=L.DataTable(c).on("page.dt",function(){h.publish(t.GUI.SUBPANEL_DOCK,{origin:"datagrid,ex-datagrid"}),f=!0}).on("order.dt",function(){h.publish(t.GUI.SUBPANEL_DOCK,{origin:"datagrid,ex-datagrid"})}).on("draw.dt",function(){A(),f?f=!1:Z.activateRows(),Z.adjustPanelWidth(),h.publish(t.Datagrid.DRAW_COMPLETE)}),ib=db.find("#jqgrid_wrapper"),jb=db.find(".jqgrid_table_wrapper"),kb=db.find(".dataTables_scroll"),lb=kb.find(".dataTables_scrollBody"),mb=kb.find(".dataTables_scrollHead"),hb=db.find(".datagrid-info-notice"),u.tooltipster(ib),sb!==O&&(ib.addClass("fadedOut"),lb.height(jb.height()-mb.height()),a=L.outerWidth(),Z.adjustPanelWidth(),L.forceStyle({width:a+"px"}))}function g(){y.registerPopup(db,"hoverIntent",function(){this.target.attr("title")&&(this.target.isOverflowed()?this.target.tooltipster({theme:".tooltipster-dark"}).tooltipster("show"):this.target.removeAttr("title"))},{handleSelector:".point-name, .category-name, .title-span",useAria:!1,timeout:500})}function i(){db.on("click","button.details",function(){var a=$(this),b=a.data(R),c=a.data(Q);if(pb.focusedButton="button.details",pb.isActive()&&pb.isEqual(b,c))r.onDetailDeselect(sb);else{var d=H(a);r.onDetailSelect(a,d,sb)}}),db.on("click","button.zoomto",function(a){var b=$(this);qb.focusedButton="button.zoomto",b.text()===i18n.t("datagrid.zoomTo")?C(a,function(){M=H(b),N=s.getMap().extent.clone(),r.onZoomTo(s.getMap().extent.clone(),M),v.subscribeOnce(t.Datagrid.EXTENT_FILTER_END,function(){var a=$(String.format("button.zoomto[data-{0}='{1}'][data-{2}='{3}']:eq(0)",Q,p.getOid(M),R,M.getLayer().url));a.text(i18n.t("datagrid.zoomBack"))})}):(r.onZoomBack(M),b.text(i18n.t("datagrid.zoomTo")),v.subscribeOnce(t.Datagrid.EXTENT_FILTER_END,function(){var a=$(String.format("button.zoomto[data-{0}='{1}'][data-{2}='{3}']:eq(0)",Q,p.getOid(M),R,M.getLayer().url));a.focus()}))}),db.on("click","button.global-button",function(){var a=$(this);"asc"===V?(a.addClass("state-expanded"),V="desc"):(a.removeClass("state-expanded"),V="asc"),L.DataTable().order([0,V]).draw()}),db.on("click","button.expand",function(){var a=new j;sb=sb===O?P:O,a.then(function(){k()}),I(a),h.publish(t.GUI.DATAGRID_EXPAND)}),db.on("change","#datasetSelector",function(){var a=$(this),b=a.find("option:selected"),c=b[0].value===eb;E(c,!0)}),db.on("click","#datasetSelectorSubmitButton",function(){var a=nb.find("option:selected");eb=a.length>0?a[0].value:"",G()}),y.registerPopup(db,"hover, focus",function(a){this.target.removeClass("wb-invisible"),a.resolve()},{handleSelector:"tr",targetSelector:".record-controls",closeHandler:function(a){this.target.addClass("wb-invisible"),a.resolve()},activeClass:"bg-very-light",useAria:!1}),y.registerPopup(db,"hover, focus",function(a){a.resolve()},{handleSelector:".full-table #jqgrid tbody tr",activeClass:"bg-very-light",useAria:!1}),y.registerPopup(db,"dblclick",function(a){var b=(this.handle.outerHeight()-this.target.height())/2;TweenLite.set(".expand-cell",{clearProps:"padding",className:"-=expand-cell"}),TweenLite.set(this.handle,{padding:b}),window.getSelection().removeAllRanges(),a.resolve()},{handleSelector:"td",targetSelector:".title-span",closeHandler:function(a){TweenLite.set(this.handle,{clearProps:"padding"}),TweenLite.set(this.handle,{className:"-=expand-cell"}),a.resolve()},activeClass:"expand-cell",useAria:!1}),y.registerPopup(db,"click",function(a){this.target.toggle(),this.handle.find(".separator i").removeClass("fa-angle-down").addClass("fa-angle-up"),a.resolve()},{closeHandler:function(a){this.target.toggle(),this.handle.find(".separator i").removeClass("fa-angle-up").addClass("fa-angle-down"),a.resolve()},handleSelector:".info-notice-button",containerSelector:".datagrid-info-notice",targetSelector:".notice-details"})}function k(){var a,b;sb===O?jb.scroll(function(){a=jb.scrollTop(),b=kb.height()-jb.scrollTop()-jb.height(),0===a?(gb.removeClass("scroll"),hb.removeClass("scroll")):(gb.addClass("scroll"),hb.addClass("scroll")),0===b?fb.removeClass("scroll"):fb.addClass("scroll")}):lb.scroll(function(){a=lb.scrollTop(),0===a?mb.removeClass("scroll"):mb.addClass("scroll")})}function l(a){m(),pb.setGraphic(a.graphic),a.scroll&&Z.activateRows()}function m(){pb.deactivate(),r.onZoomCancel()}function n(a){qb.setGraphic(a.graphic)}function o(){qb.deactivate()}function x(){h.subscribe(t.Datagrid.HIGHLIGHTROW_SHOW,l),h.subscribe(t.Datagrid.HIGHLIGHTROW_HIDE,m),h.subscribe(t.Datagrid.ZOOMLIGHTROW_SHOW,n),h.subscribe(t.Datagrid.ZOOMLIGHTROW_HIDE,o),h.subscribe(t.Datagrid.DRAW_COMPLETE,F)}function E(a,b){var c;b=b||!1,ob.attr("disabled",a).text(i18n.t(a?b?"datagrid.ex.datasetSelectorButtonLoaded":"datagrid.ex.datasetSelectorButtonLoading":"datagrid.ex.datasetSelectorButtonLoad")),c=d.filter(RAMP.config.layers.feature,function(a){return a.url===eb}),cb&&c.length>0&&cb.text(": "+c[0].displayName)}function F(){ob.text(i18n.t("datagrid.ex.datasetSelectorButtonLoaded"))}function G(){var a,b=.2,c=new TimelineLite({paused:!0}),d=new TimelineLite({paused:!0}),e=new j;tmpl.cache={},tmpl.templates=S,a=tmpl("datagrid_manager_table_Template",{tableId:"jqgrid",tableCss:"display table-condensed table-simplify"}),pb.isActive()&&(b=.6,r.onDetailDeselect(sb)),c.set(ib,{className:"+=animated fadeOut"}),c.call(function(){c.pause(),ib.replaceWith(a),f(),E(!0),e.then(function(){d.set(ib,{className:"-=fadedOut"}),d.set(ib,{className:"+=animated fadeIn"}),d.set(ib,{className:"-=animated fadeIn"},"+=1"),d.play()}),D(e)},null,this,b+.05),c.play()}function I(a){var e,g,h=c(),i={buttons:h,tableId:"jqgrid",tableCss:"display table-condensed table-simplify"},k=.5,l=new TimelineLite({paused:!0}),m=new TimelineLite({paused:!0}),n=new j;if(tmpl.cache={},tmpl.templates=S,sb===O)g="datagrid_manager_Template",i.buttons.toggleTitle=i18n.t("datagrid.fullData"),cb&&cb.remove();else{g="datagrid_full_manager_Template";var o=d.filter(RAMP.config.layers.feature,function(a){var b=RAMP.map.getLayer(a.id);return b&&b.loaded?b.ramp.type!==q.layerType.Static&&b.visible:void 0});i.buttons=b.mixin(i.buttons,{datasets:o,toggleTitle:i18n.t("datagrid.ex.dataSummary"),txtDataset:i18n.t("datagrid.ex.dataset")}),cb=$("#tabs1_2-lnk").append("<span>").find("span")}e=tmpl(g,i),r.onDetailDeselect(sb),l.set(db,{className:"+=animated fadeOut"}),L&&l.set(L,{clearProps:"width"}),l.call(function(){l.pause(),db.empty().append(e),f(),gb=db.find("#datagridGlobalToggles"),fb=db.find(".status-line"),nb=$("#datasetSelector"),ob=$("#datasetSelectorSubmitButton"),E(!0),a.resolve(),l.resume(),n.then(function(){m.set(ib,{className:"-=fadedOut"}),m.set(ib,{className:"+=animated fadeIn"}),m.set(ib,{className:"-=animated fadeIn"},"+=1"),m.play()}),D(n)},null,this,k+.1),l.set(db,{className:"-=fadeOut"}),l.set(db,{className:"+=fadeIn"}),l.set(db,{className:"-=animated fadeIn"},"+="+k),l.play()}function W(){pb.refresh(),qb.refresh(),pb.navigateToRow()||qb.navigateToRow(),qb.activate(),pb.activate(),ab()}function _(){return"true"===rb.attr("aria-expanded")}function ab(a){var b="datagrid",c=pb.getNode().find(".record-controls");sb===P&&(b="ex-datagrid",c=pb.getNode().find(".button.details")),pb.isActive()&&(_()||a)&&h.publish(t.GUI.SUBPANEL_CAPTURE,{target:c,consumeOrigin:b,origin:b})}function bb(){sb===O?v.adjustWidthForSrollbar(jb,[gb,fb,hb]):L.outerWidth()===ib.outerWidth()?lb.addClass("overflow-x-hidden"):lb.removeClass("overflow-x-hidden")}var cb,db,eb,fb,gb,hb,ib,jb,kb,lb,mb,nb,ob,pb=a("selected-row"),qb=a("highlighted-row"),rb=$("details[data-panel-name=datagrid]"),sb=O,tb=!1;return{init:v.once(function(){var a=new j;a.then(function(){tb=!0,g(),i(),k(),x()}),db=$("#"+RAMP.config.divNames.datagrid),I(a)}),getDatagridMode:function(){return sb},getSelectedDatasetUrl:function(){if(eb)nb.find("option[value='"+eb+"']").prop("selected",!0);else if(nb.find("option:selected").length>0)eb=nb.find("option:selected")[0].value;else{var a=w.find(RAMP.config.layers.feature,function(a){var b=RAMP.map.getLayer(a.id);return b?b.visible&&b.ramp.type!==q.layerType.Static:!1});eb=null===a?null:a.url}return eb},isReady:function(){return tb},adjustPanelWidth:bb,activateRows:W,capturePanel:ab,updateNotice:function(){var a,b,c,d={layers:null},e=s.getInvisibleLayers().filter(function(a){return a.ramp&&a.ramp.type===q.layerType.feature});this.isReady()&&(tmpl.cache={},tmpl.templates=S,sb===P?(b=Z.getSelectedDatasetUrl(),c=w.indexOf(e,function(a){return a.url===b}),-1!==c&&(a=tmpl("datagrid_full_info_notice",d))):e.length>0&&(d.layers=e.map(function(a){return a.ramp.config}),X.length>0&&(a=tmpl("datagrid_info_notice",d))),a?(hb.empty().append(a),db.addClass("notice")):(hb.empty(),db.removeClass("notice")))},initInvisibleLayerToggleCount:v.once(function(){X=s.getInvisibleLayers().filter(function(a){return!v.isUndefined(a.ramp)&&a.ramp.type===q.layerType.feature&&a.ramp.config.settings.visible===!0}).map(function(a){return a.ramp.config.id})})}}();return{init:function(){var a=d.filter(RAMP.config.layers.feature,function(a){return!a.isStatic});0!==a.length&&(J=a[0].datagrid,I(),Z.init())}}});