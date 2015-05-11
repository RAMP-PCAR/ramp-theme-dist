/*! ramp-theme-canada 11-05-2015 21:28:10 : v. 5.4.0-7 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/_base/lang","dojo/topic","dojo/Deferred","dojo/text!./templates/datagrid_template.json","dojo/text!./templates/extended_datagrid_template.json","esri/tasks/query","ramp/graphicExtension","ramp/globalStorage","ramp/datagridClickHandler","ramp/map","ramp/eventManager","ramp/theme","ramp/layerLoader","utils/util","utils/array","utils/dictionary","utils/popupManager","utils/tmplHelper"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){"use strict";function s(){var a=B.rows().data();M={},$.each(a,function(a,b){if(b.last()){var c=b.last().layerId,d=g.getFDataOid(b.last().fData);c in M||(M[c]={}),M[c][d]=a}})}function t(a,b){("keypress"===a.type&&13===a.keyCode||"click"===a.type)&&b()}function u(a){var b={},c=j.getVisibleFeatureLayers(),d=R.getDatagridMode(),e=new f,g=!1;c=c.filter(function(a){return a.ramp.type!==h.layerType.Static}),d===G?RAMP.config.extendedDatagridExtentFilterEnabled?(e.geometry=j.getMap().extent,c=c.filter(function(a){return a.id===R.getSelectedDatasetId()})):(g=!0,c=[RAMP.layerRegistry[R.getSelectedDatasetId()]]):e.geometry=j.getMap().extent,e.outFields=["*"],Q=0,c.forEach(function(a){RAMP.data[a.id]&&(Q+=RAMP.data[a.id].features.length)});var i;g?(i=[],b[c[0].id]={type:"raw",layerId:c[0].id}):i=c.map(function(a){return a.queryFeatures(e).then(function(a){if(a.features.length>0){var c=a.features[0].getLayer();b[c.id]={type:"features",features:a.features}}})}),n.afterAll(i,function(){x(b),R.initInvisibleLayerToggleCount(),R.updateNotice(),a&&a.resolve()})}function v(a){var b,c=g.getConfigForFData(a);if(R.getDatagridMode()===F)b=[g.getFDataTitle(a)];else{b=[];var d=c.datagrid.gridColumns;d.forEach(function(c){b.push(a.attributes[c.fieldName]||"")})}return b.push({layerId:c.id,layerName:c.displayName,fData:a}),b}function w(a){$(".pagination-record-number").text(String.format("{0} / {1}",a,Q))}function x(a){if(void 0!==C){if(C.DataTable().clear(),Object.keys(a).isEmpty())return w(0),void C.DataTable().draw();var c,d=[],e=R.getDatagridMode();p.forEachEntry(a,function(a,b){if(RAMP.data[a])switch(b.type){case"features":c=b.features.map(function(a){var b=g.getFDataForGraphic(a);return b[e]?b[e]:b[e]=v(b)}),d=d.concat(c);break;case"raw":c=RAMP.data[b.layerId].features.map(function(a){return a[e]?a[e]:a[e]=v(a)}),d=d.concat(c)}}),w(d.length),B.one("draw.dt",function(){b.publish(k.Datagrid.EXTENT_FILTER_END)}),C.dataTable().fnAddData(d)}}function y(a){var b,c=g.getFDataOid(a);return b=g.findGraphic(c,a.parent.layerId)}function z(a){var b=a.data(I),c=a.data(H),d=RAMP.data[b];return d.features[d.index[c]]}function A(){b.subscribe(k.FilterManager.LAYER_VISIBILITY_TOGGLED,function(a){if(O=!0,null!==a.id){var b=P.indexOf(a.id);-1===b&&a.state?P.push(a.id):-1===b||a.state||P.splice(b,1)}}),b.subscribe(k.GUI.TAB_SELECTED,function(a){"datagrid"===a.tabName&&(O?(O=!1,u()):R.capturePanel(!0),R.adjustPanelWidth())}),b.subscribe(k.GUI.TAB_DESELECTED,function(a){"datagrid"===a.tabName&&b.publish(k.GUI.SUBPANEL_DOCK,{origin:"datagrid"})}),b.subscribe(k.Datagrid.APPLY_EXTENT_FILTER,function(){R.getDatagridMode()!==G&&u()}),b.subscribe(k.LayerLoader.LAYER_UPDATED,function(a){a.layer.ramp.type===h.layerType.feature&&R.getDatagridMode()!==G&&u()}),b.subscribe(k.LayerLoader.REMOVE_LAYER,function(){R.updateNotice()}),b.subscribe(k.Map.ZOOM_END,function(){R.updateNotice()}),b.subscribe(k.GUI.SUBPANEL_CHANGE,function(a){"ex-datagrid"===a.origin&&a.isComplete&&R.adjustPanelWidth()})}var B,C,D,E,F="summary",G="full",H="feature-oid",I="layer-id",J=JSON.parse(r.stringifyTemplate(d)),K=JSON.parse(r.stringifyTemplate(e)),L=1,M={},N="asc",O=!0,P=[],Q=0,R=function(){function d(a){var b=-1,c=null;return{focusedButton:null,isActive:function(){return null!==c},isEqual:function(a,b){var d=c.parent.layerId,e=g.getFDataOid(c);return d===a&&e===b},navigateToRow:function(){if(-1!==b){var a=Math.floor(b/L);return B.page()!==a&&C.DataTable().page(a).draw(!1),ia.scrollTo(this.getNode(),300,{axis:"y",offset:{left:0,top:1.5*-this.getNode().height()}}),!0}return!1},setFeatureData:function(a){c=a,this.refresh()},refresh:function(){if(c){var a=c.parent.layerId,d=g.getFDataOid(c);b=a in M&&d in M[a]?M[a][d]:-1}else b=-1},getNode:function(){return $(String.format("#jqgrid tbody tr:nth-child({0})",b%L+1))},activate:function(){c&&(this.getNode().addClass(a),this.focusedButton&&(this.getNode().find(this.focusedButton).focus(),this.focusedButton=null))},deactivate:function(){c&&(this.getNode().removeClass(a),c=null)}}}function e(){var a={buttonLabel:i18n.t("datagrid.sort"),classAddition:"font-medium global-button",someAttribute:""};return a}function f(a,b,c,d){var e,f,h=c.last(),i=R.getDatagridMode();if(!h||!h.fData)return"";if(f=g.getConfigForFData(h.fData),i===F){if(!(i in h)){e=r.dataBuilder(h.fData,f);var j=f.templates.summary;tmpl.cache={},tmpl.templates=J,h[i]=tmpl(j,e)}return h[i]}if(!(i in h)){h[i]=[];var k=f.datagrid.gridColumns;tmpl.cache={},tmpl.templates=K,e=r.dataBuilder(h.fData,f),k.forEach(function(a,b){e.columnIdx=b;var c=tmpl(a.columnTemplate,e);"numeric"===a.sortType&&(c=Number(c)),h[i].push(c)})}return h[i][d.col]}function m(){var c,d,e={info:!1,columnDefs:[],autoWidth:!1,deferRender:!0,order:[],paging:!0,pagingType:"ramp",scrollX:!0,destroy:!0,language:i18n.t("datagrid.gridstrings",{returnObjectTrees:!0}),getTotalRecords:function(){return Q}};ra===F?(L=RAMP.config.rowsPerPage,e=a.mixin(e,{columns:[{title:"Name",width:"300px",type:"string",className:"",render:f,orderable:!0}],dom:'<"jqgrid_table_wrapper summary-table"t><"status-line"p>',searching:!0,pageLength:L})):(R.getSelectedDatasetId()in RAMP.layerRegistry&&(d=RAMP.layerRegistry[R.getSelectedDatasetId()].ramp.config),d&&d.datagrid&&(L=d.datagrid.rowsPerPage),e=a.mixin(e,{columns:null===R.getSelectedDatasetId()?[{title:""}]:d.datagrid.gridColumns.map(function(a){return{title:a.title,width:a.width?a.width:"100px",type:a.sortType,className:a.alignment?"":"center",render:f,orderable:a.orderable}}),dom:'<"jqgrid_table_wrapper full-table"t><"datagrid-info-notice simple"><"status-line"p>',scrollY:"500px",searching:RAMP.config.extendedDatagridExtentFilterEnabled,pageLength:L})),C=ca.find("table");var g=!1;B=C.DataTable(e).on("page.dt",function(){b.publish(k.GUI.SUBPANEL_DOCK,{origin:"datagrid,ex-datagrid"}),g=!0}).on("order.dt",function(){b.publish(k.GUI.SUBPANEL_DOCK,{origin:"datagrid,ex-datagrid"})}).on("draw.dt",function(){s(),g?g=!1:R.activateRows(),R.adjustPanelWidth(),b.publish(k.Datagrid.DRAW_COMPLETE)}),ha=ca.find("#jqgrid_wrapper"),ia=ca.find(".jqgrid_table_wrapper"),ja=ca.find(".dataTables_scroll"),ka=ja.find(".dataTables_scrollBody"),la=ja.find(".dataTables_scrollHead"),ga=ca.find(".datagrid-info-notice"),l.tooltipster(ha),ra!==F&&(ha.addClass("fadedOut"),ka.height(ia.height()-la.height()),c=C.outerWidth(),R.adjustPanelWidth(),C.forceStyle({width:c+"px"}))}function p(){q.registerPopup(ca,"hoverIntent",function(){this.target.attr("title")&&(this.target.isOverflowed()?this.target.tooltipster({theme:".tooltipster-dark"}).tooltipster("show"):this.target.removeAttr("title"))},{handleSelector:".point-name, .category-name, .title-span",useAria:!1,timeout:500})}function v(){ca.on("click","button.details",function(){var a=$(this),b=a.data(I),c=a.data(H);if(oa.focusedButton="button.details",oa.isActive()&&oa.isEqual(b,c))i.onDetailDeselect(ra);else{var d=z(a),e=y(d);i.onDetailSelect(a,d,e,ra)}}),ca.on("click","button.zoomto",function(a){var b=$(this),c=z(b);pa.focusedButton="button.zoomto",b.text()===i18n.t("datagrid.zoomTo")?t(a,function(){D=y(c),E=j.getMap().extent.clone(),i.onZoomTo(j.getMap().extent.clone(),c,D),n.subscribeOnce(k.Datagrid.EXTENT_FILTER_END,function(){var a=$(String.format("button.zoomto[data-{0}='{1}'][data-{2}='{3}']:eq(0)",H,g.getFDataOid(c),I,c.parent.layerId));a.text(i18n.t("datagrid.zoomBack"))})}):(i.onZoomBack(),b.text(i18n.t("datagrid.zoomTo")),n.subscribeOnce(k.Datagrid.EXTENT_FILTER_END,function(){var a=$(String.format("button.zoomto[data-{0}='{1}'][data-{2}='{3}']:eq(0)",H,g.getFDataOid(c),I,c.parent.layerId));a.focus()}))}),ca.on("click","button.global-button",function(){var a=$(this);"asc"===N?(a.addClass("state-expanded"),N="desc"):(a.removeClass("state-expanded"),N="asc"),C.DataTable().order([0,N]).draw()}),ca.on("click","button.expand",function(){var a=new c;ra=ra===F?G:F,a.then(function(){w()}),X(a),b.publish(k.GUI.DATAGRID_EXPAND)}),ca.on("change","#datasetSelector",function(){var a=$(this),b=a.find("option:selected"),c=b[0].value===da;U(c,!0)}),ca.on("click","#datasetSelectorSubmitButton",function(){var a=ma.find("option:selected");da=a.length>0?a[0].value:"",W()}),q.registerPopup(ca,"hover, focus",function(a){this.target.removeClass("wb-invisible"),a.resolve()},{handleSelector:"tr",targetSelector:".record-controls",closeHandler:function(a){this.target.addClass("wb-invisible"),a.resolve()},activeClass:"bg-very-light",useAria:!1}),q.registerPopup(ca,"hover, focus",function(a){a.resolve()},{handleSelector:".full-table #jqgrid tbody tr",activeClass:"bg-very-light",useAria:!1}),q.registerPopup(ca,"dblclick",function(a){var b=(this.handle.outerHeight()-this.target.height())/2;TweenLite.set(".expand-cell",{clearProps:"padding",className:"-=expand-cell"}),TweenLite.set(this.handle,{padding:b}),window.getSelection().removeAllRanges(),a.resolve()},{handleSelector:"td",targetSelector:".title-span",closeHandler:function(a){TweenLite.set(this.handle,{clearProps:"padding"}),TweenLite.set(this.handle,{className:"-=expand-cell"}),a.resolve()},activeClass:"expand-cell",useAria:!1}),q.registerPopup(ca,"click",function(a){this.target.toggle(),this.handle.find(".separator i").removeClass("fa-angle-down").addClass("fa-angle-up"),a.resolve()},{closeHandler:function(a){this.target.toggle(),this.handle.find(".separator i").removeClass("fa-angle-up").addClass("fa-angle-down"),a.resolve()},handleSelector:".info-notice-button",containerSelector:".datagrid-info-notice",targetSelector:".notice-details"})}function w(){var a,b;ra===F?ia.scroll(function(){a=ia.scrollTop(),b=ja.height()-ia.scrollTop()-ia.height(),0===a?(fa.removeClass("scroll"),ga.removeClass("scroll")):(fa.addClass("scroll"),ga.addClass("scroll")),0===b?ea.removeClass("scroll"):ea.addClass("scroll")}):ka.scroll(function(){a=ka.scrollTop(),0===a?la.removeClass("scroll"):la.addClass("scroll")})}function x(a){A(),oa.setFeatureData(a.fData),a.scroll&&R.activateRows()}function A(){oa.deactivate(),i.onZoomCancel()}function O(a){pa.setFeatureData(a.fData)}function S(){pa.deactivate()}function T(){b.subscribe(k.Datagrid.HIGHLIGHTROW_SHOW,x),b.subscribe(k.Datagrid.HIGHLIGHTROW_HIDE,A),b.subscribe(k.Datagrid.ZOOMLIGHTROW_SHOW,O),b.subscribe(k.Datagrid.ZOOMLIGHTROW_HIDE,S),b.subscribe(k.Datagrid.DRAW_COMPLETE,V)}function U(a,b){var c;b=b||!1,na.attr("disabled",a).text(i18n.t(a?b?"datagrid.ex.datasetSelectorButtonLoaded":"datagrid.ex.datasetSelectorButtonLoading":"datagrid.ex.datasetSelectorButtonLoad")),c=RAMP.config.layers.feature.filter(function(a){return a.id===da}),ba&&c.length>0&&ba.text(": "+c[0].displayName)}function V(){na.text(i18n.t("datagrid.ex.datasetSelectorButtonLoaded"))}function W(){var a,b=.2,d=new TimelineLite({paused:!0}),e=new TimelineLite({paused:!0}),f=new c;tmpl.cache={},tmpl.templates=J,a=tmpl("datagrid_manager_table_Template",{tableId:"jqgrid",tableCss:"display table-condensed table-simplify"}),oa.isActive()&&(b=.6,i.onDetailDeselect(ra)),d.set(ha,{className:"+=animated fadeOut"}),d.call(function(){d.pause(),ha.replaceWith(a),m(),U(!0),f.then(function(){e.set(ha,{className:"-=fadedOut"}),e.set(ha,{className:"+=animated fadeIn"}),e.set(ha,{className:"-=animated fadeIn"},"+=1"),e.play()}),u(f)},null,this,b+.05),d.play()}function X(b){var d,f,g=e(),j={buttons:g,tableId:"jqgrid",tableCss:"display table-condensed table-simplify"},k=.5,l=new TimelineLite({paused:!0}),n=new TimelineLite({paused:!0}),o=new c;if(tmpl.cache={},tmpl.templates=J,ra===F)f="datagrid_manager_Template",j.buttons.toggleTitle=i18n.t("datagrid.fullData"),ba&&ba.remove();else{f="datagrid_full_manager_Template",da="";var p=RAMP.config.layers.feature.filter(function(a){var b=RAMP.map.getLayer(a.id);return b&&b.loaded?b.ramp.type!==h.layerType.Static&&b.visible:void 0});j.buttons=a.mixin(j.buttons,{datasets:p,toggleTitle:i18n.t("datagrid.ex.dataSummary"),txtDataset:i18n.t("datagrid.ex.dataset")}),ba=$("#tabs1_2-lnk").append("<span>").find("span")}d=tmpl(f,j),i.onDetailDeselect(ra),i.onZoomCancel(),l.set(ca,{className:"+=animated fadeOut"}),C&&l.set(C,{clearProps:"width"}),l.call(function(){l.pause(),ca.empty().append(d),m(),fa=ca.find("#datagridGlobalToggles"),ea=ca.find(".status-line"),ma=$("#datasetSelector"),na=$("#datasetSelectorSubmitButton"),U(!0),b.resolve(),l.resume(),o.then(function(){n.set(ha,{className:"-=fadedOut"}),n.set(ha,{className:"+=animated fadeIn"}),n.set(ha,{className:"-=animated fadeIn"},"+=1"),n.play()}),u(o)},null,this,k+.1),l.set(ca,{className:"-=fadeOut"}),l.set(ca,{className:"+=fadeIn"}),l.set(ca,{className:"-=animated fadeIn"},"+="+k),l.play()}function Y(){oa.refresh(),pa.refresh(),oa.navigateToRow()||pa.navigateToRow(),pa.activate(),oa.activate(),_()}function Z(){return"true"===qa.attr("aria-expanded")}function _(a){var c="datagrid",d=oa.getNode().find(".record-controls");ra===G&&(c="ex-datagrid",d=oa.getNode().find(".button.details")),oa.isActive()&&(Z()||a)&&b.publish(k.GUI.SUBPANEL_CAPTURE,{target:d,consumeOrigin:c,origin:c})}function aa(){ra===F?n.adjustWidthForSrollbar(ia,[fa,ea,ga]):C.outerWidth()===ha.outerWidth()?ka.addClass("overflow-x-hidden"):ka.removeClass("overflow-x-hidden")}var ba,ca,da,ea,fa,ga,ha,ia,ja,ka,la,ma,na,oa=d("selected-row"),pa=d("highlighted-row"),qa=$("details[data-panel-name=datagrid]"),ra=F,sa=!1;return{init:n.once(function(){var a=new c;a.then(function(){sa=!0,p(),v(),w(),T()}),ca=$("#"+RAMP.config.divNames.datagrid),X(a)}),getDatagridMode:function(){return ra},getSelectedDatasetId:function(){if(da)ma.find("option[value='"+da+"']").prop("selected",!0);else if(ma.find("option:selected").length>0)da=ma.find("option:selected")[0].value;else{var a=o.find(RAMP.config.layers.feature,function(a){var b=RAMP.map.getLayer(a.id);return b?b.visible&&b.ramp.type!==h.layerType.Static:!1});da=null===a?null:a.id}return da},isReady:function(){return sa},adjustPanelWidth:aa,activateRows:Y,capturePanel:_,updateNotice:function(){var a,b={layers:null},c=j.getInvisibleLayers().filter(function(a){return a.ramp&&a.ramp.type===h.layerType.feature});this.isReady()&&(tmpl.cache={},tmpl.templates=J,ra!==G&&c.length>0&&(b.layers=c.map(function(a){return a.ramp.config}),P.length>0&&(a=tmpl("datagrid_info_notice",b))),a?(ga.empty().append(a),ca.addClass("notice")):(ga.empty(),ca.removeClass("notice")))},initInvisibleLayerToggleCount:n.once(function(){P=j.getInvisibleLayers().filter(function(a){return a.ramp&&a.ramp.type===h.layerType.feature&&a.ramp.config.settings.visible}).map(function(a){return a.ramp.config.id})})}}();return{init:function(){A(),R.init()}}});