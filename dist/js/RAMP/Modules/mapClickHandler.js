/*! ramp-theme-usability 22-01-2015 18:23:44 : v. 5.0.0-5 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["ramp/eventManager","esri/request","dojo/promise/all","dojo/_base/array","dojo/topic"],function(a,b,c,d,e){"use strict";var f,g=[];return{init:function(h){f=h,e.subscribe(a.Map.CLICK,function(h){var i=[],j=[];i=d.filter(g,function(a){return a.wmsLayer.visible}),0!==i.length&&(e.publish(a.GUI.SUBPANEL_OPEN,{panelName:"WMS Click Results",title:"WMS Click Results",content:null,origin:"wmsFeatureInfo",target:$("#map-div"),guid:"wms-guid"}),j=d.map(i,function(a){var c,d,e,g={};return d=a.wmsLayer.getMap().spatialReference,e=a.wmsLayer.spatialReferences,e&&e.length>1?c=e[0]:d.wkid&&(c=d.wkid),g="1.3"===a.wmsLayer.version||"1.3.0"===a.wmsLayer.version?{CRS:"EPSG:"+c,I:h.layerX,J:h.layerY}:{SRS:"EPSG:"+c,X:h.layerX,Y:h.layerY},$.extend(g,{SERVICE:"WMS",REQUEST:"GetFeatureInfo",VERSION:a.wmsLayer.version,BBOX:f.extent.xmin+","+f.extent.ymin+","+f.extent.xmax+","+f.extent.ymax,WIDTH:f.width,HEIGHT:f.height,QUERY_LAYERS:a.layerConfig.layerName,LAYERS:a.layerConfig.layerName,INFO_FORMAT:a.layerConfig.featureInfo.mimeType}),new b({url:a.wmsLayer.url.split("?")[0],content:g,handleAs:"text"})}),e.publish(a.GUI.SUBPANEL_OPEN,{content:"",origin:"wmsFeatureInfo",update:!0,guid:"wms-guid"}),c(j).then(function(b){var c=d.map(b,function(a,b){var c="<h5 class='margin-top-none'>"+i[b].layerConfig.displayName+"</h5>"+RAMP.plugins.featureInfoParser[i[b].layerConfig.featureInfo.parser](a);return c});e.publish(a.GUI.SUBPANEL_OPEN,{content:c.join(""),origin:"wmsFeatureInfo",update:!0,guid:"wms-guid"})},function(b){e.publish(a.GUI.SUBPANEL_OPEN,{content:":(",origin:"wmsFeatureInfo",update:!0,guid:"wms-guid"})}))})},registerWMSClick:function(a){g.push(a)}}});