/*! ramp-theme-canada 22-01-2015 19:38:48 : v. 5.0.0-5 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/_base/declare","dojo/query","dojo/_base/array","dojo/dom","dojo/dom-class","dojo/dom-style","dojo/dom-construct","dojo/request/script","ramp/globalStorage","ramp/map","utils/array","utils/dictionary","utils/util","utils/tmplUtil"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){"use strict";return{loadStrings:function(){},getLayerConfig:function(a,b){i.urlCfg||(i.urlCfg={});var c=k.find(RAMP.config.layers.wms.concat(RAMP.config.layers.feature),function(c){return null==b?c.url===a:c.url.indexOf(a)>=0&&c.layerName===b});return i.urlCfg[a]=c,i.urlCfg[a]},getLayerConfigWithId:function(a){return k.find(RAMP.config.layers.wms.concat(RAMP.config.layers.feature),function(b){return b.id===a})},_getSymbolConfig:function(a,b){return this.getLayerConfig(a,b).symbology},getSymbolForFeature:function(a){var b=this.getLayerConfig(a.getLayer().url);return n.getGraphicIcon(a,b)},getServiceURL:function(a,b,c){var d=a+"configservice/map?mapid="+b+"&lang="+c;return d}}});