/*! ramp-ti-fgp-id 01-05-2015 18:56:36 : v. 5.4.0-2 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
require(["dojo/parser","dojo/on","dojo/topic","dojo/request/script","dojo/request/xhr","esri/config","esri/urlUtils","ramp/map","ramp/basemapSelector","ramp/maptips","ramp/datagrid","ramp/navigation","ramp/filterManager","ramp/imageExport","ramp/bookmarkLink","utils/url","ramp/featureHighlighter","ramp/ramp","ramp/globalStorage","ramp/gui","ramp/eventManager","ramp/advancedToolbar","ramp/geoSearch","ramp/theme","ramp/layerLoader","ramp/dataLoaderGui","ramp/dataLoader","ramp/stepItem","utils/util","utils/prototype!","utils/functionMangler!","dojo/domReady!"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C){"use strict";function D(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src=dojoConfig.fullPluginPath+a,b.appendChild(c)}function E(){function a(){m.init(),RAMP.config.advancedToolbar.enabled&&v.init(),k.init(),x.tooltipster(),RAMP.startupLayers.forEach(function(a){y.loadLayer(a)})}c.subscribe(u.Map.INITIAL_BASEMAP_LOADED,function(){C.subscribeAll([u.BasemapSelector.UI_COMPLETE,u.FilterManager.UI_COMPLETE],function(){o.subscribeAndUpdate(),n.init(),z.init()});var b=h.getMap().__LOD.level?h.getMap().__LOD.level:0;l.init(b),q.init(),j.init(),i.init(),RAMP.flags.brokenWebBrowser||RAMP.flags.ie10client?window.setTimeout(a,2e3):a()}),h.init(),l.construct(),x.tooltipster()}function F(a){var b,d=$("li.map-toolbar-item #advanced-toggle").parent(),e=document.getElementsByTagName("html")[0].className.indexOf("dj_ie9")>-1,i=document.getElementsByTagName("html")[0].className.indexOf("dj_ie10")>-1;s.init(a),s.defineProjections(window.proj4),w.init(),f.defaults.io.proxyUrl=RAMP.config.proxyUrl,f.defaults.io.corsDetection=!e,e&&void 0!==RAMP.config.exportProxyUrl&&g.addProxyRule({proxyUrl:RAMP.config.exportProxyUrl,urlPrefix:RAMP.config.exportMapUrl}),RAMP.flags.brokenWebBrowser=e,RAMP.flags.ie10client=i,RAMP.config.advancedToolbar.enabled?d.removeClass("wb-invisible"):d.remove(),b=RAMP.config.plugins,b&&b.map(function(a){D(a)}),h.applyExtentDefaulting(),o.updateConfig(window.location.pathname.split("/").last()),c.subscribe(u.Map.EXTENTS_REPROJECTED,function(){c.subscribe(u.GUI.UPDATE_COMPLETE,function(){o.createUI(),y.init(),E()}),t.load(null,null,function(){}),r.loadStrings()}),h.projectConfigExtents()}C.checkConsole(),a.parse();var G,H,I=$("html").attr("lang");"en"!==I&&"fr"!==I&&(I="en"),RAMP.locale=I,i18n.init({lng:I+"-CA",load:"current",fallbackLng:!1}),G="fr"===I?"config.fr.json":"config.en.json",H=e(G,{handleAs:"json"}),H.then(function(a){if(RAMP.configServiceURL){var b=new p(require.toUrl(document.location)),c=b.queryObject.keys;if(c&&""!==c){var e=RAMP.configServiceURL+"docs/"+$("html").attr("lang")+"/"+c,f=d.get(e,{jsonp:"callback",timeout:2e3});f.then(function(b){b.forEach(function(b){C.mergeRecursive(a,b)}),F(a)},function(a){})}else F(a)}else F(a)},function(a){})});