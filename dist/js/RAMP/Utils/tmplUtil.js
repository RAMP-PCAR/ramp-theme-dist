/*! ramp-theme-canada 30-01-2015 15:37:51 : v. 5.0.0-8 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["ramp/globalStorage"],function(a){"use strict";return{getGraphicIcon:function(a,b){var c,d=b.symbology,e="";switch(d.type){case"simple":return d.imageUrl;case"uniqueValue":var f=a.attributes[d.field1];for("string"!=typeof f&&(f=f.toString()),d.field2&&(f=f+", "+a.attributes[d.field2],d.field3&&(f=f+", "+a.attributes[d.field3])),c=0;c<d.valueMaps.length;c++)if(d.valueMaps[c].value===f){e=d.valueMaps[c].imageUrl;break}return""===e&&(e=d.defaultImageUrl),e;case"classBreaks":var g,h,i;if(g=a.attributes[d.field],h=d.minValue,h>g)e=d.defaultImageUrl;else{for(i=h-1,c=0;c<d.rangeMaps.length;c++)if(h=i,i=d.rangeMaps[c].maxValue,g>h&&i>=g){e=d.rangeMaps[c].imageUrl;break}""===e&&(e=d.defaultImageUrl)}return e;default:return d.icons["default"].imageUrl}},getFeatureName:function(a,b){return a.attributes[b.nameField]},getObjectId:function(a){return a.attributes[a.getLayer().objectIdField]},getAttributeValueByName:function(a,b){return a.attributes[b]},generateVisibilityLegend:function(a){var b="",c={"for":"filterGroup_"+a.data[a.idx].id,attr:b,value:a.data[a.idx].id,checked:"checked",label:a.data[a.idx].layerConfig.displayName,"class":"eye checked",layerId:a.data[a.idx].id};return c},generateBoundingBoxLegend:function(b){var c,d=!1,e="";return d=Boolean(b.data[b.idx].ramp.type===a.layerType.Static||b.data[b.idx].ramp.type===a.layerType.wms),c={"for":"filterGroup_"+b.data[b.idx].id+"1",attr:e+"1",value:b.data[b.idx].id,checked:"checked",label:b.data[b.idx].layerConfig.displayName,"class":"box checked",disabled:d,layerId:b.data[b.idx].id}},generateSettingsToggle:function(a){var b={str:a.str,layerId:a.data[a.idx].id,settings:a.data[a.idx].layerConfig.settings};return b},getSymbolForLayer:function(a){function b(a){var b,c=a.length;if(c>2)b=[0,1,2];else if(2===c)b=[0,1,0];else{if(1!==c)return["","",""];b=[0,0,0]}return[a[b[0]].imageUrl,a[b[1]].imageUrl,a[b[2]].imageUrl]}if(!a.symbology)return a.imageUrl?[a.imageUrl]:[""];var c=a.symbology;switch(c.type){case"simple":return[c.imageUrl];case"uniqueValue":return b(c.valueMaps);case"classBreaks":return b(c.rangeMaps);default:return[""]}}}});