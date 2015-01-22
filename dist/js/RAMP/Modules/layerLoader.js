/*! ramp-theme-canada 22-01-2015 19:38:48 : v. 5.0.0-5 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/topic","esri/layers/GraphicsLayer","esri/tasks/GeometryService","esri/tasks/ProjectParameters","esri/geometry/Extent","ramp/eventManager","ramp/map","ramp/globalStorage","ramp/featureClickHandler","ramp/mapClickHandler","ramp/ramp","ramp/filterManager","ramp/layerItem","utils/util"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){"use strict";function o(a,b,c){if(c){var d;if(d=l.getLayerState(a),d===m.state.ERROR)return}l.setLayerState(a,b)}return{init:function(){RAMP.layerCounts={feature:0,bb:0,wms:0,base:1},a.subscribe(f.LayerLoader.LAYER_LOADED,this.onLayerLoaded),a.subscribe(f.LayerLoader.LAYER_UPDATED,this.onLayerUpdateEnd),a.subscribe(f.LayerLoader.LAYER_UPDATING,this.onLayerUpdateStart),a.subscribe(f.LayerLoader.LAYER_ERROR,this.onLayerError),a.subscribe(f.LayerLoader.REMOVE_LAYER,this.onLayerRemove)},onLayerError:function(a){a.layer.ramp.load.state="error",a.layer.ramp.load.inLS&&o(a.layer.ramp.config.id,m.state.ERROR,!1)},onLayerUpdateStart:function(a){o(a.layer.ramp.config.id,m.state.UPDATING,!0)},onLayerUpdateEnd:function(a){o(a.layer.ramp.config.id,m.state.LOADED,!0)},onLayerLoaded:function(a){a.layer.ramp.load.state="loaded",a.layer.ramp.load.inLS&&o(a.layer.ramp.config.id,m.state.LOADED,!0)},onLayerRemove:function(a){var b,c=g.getMap(),d=c.getLayer(a.layerId),e=c.getBoundingBoxMapping()[a.layerId];switch(c.removeLayer(d),e&&c.removeLayer(e),d.ramp.type){case h.layerType.wms:b=RAMP.config.layers.wms.indexOf(d.ramp.config),RAMP.config.layers.wms.splice(b,1);break;case h.layerType.feature:case h.layerType.Static:b=RAMP.config.layers.feature.indexOf(d.ramp.config),RAMP.config.layers.feature.splice(b,1)}},loadLayer:function(a){var f,k,o,p=g.getMap(),q=a.ramp.config;switch(!a.ramp,a.ramp.type){case h.layerType.wms:k=h.layerType.wms,f=RAMP.layerCounts.base+RAMP.layerCounts.wms,RAMP.layerCounts.wms+=1,q.legendMimeType&&(a.ramp.config.legend={type:"wms",imageUrl:String.format("{0}?SERVICE=WMS&REQUEST=GetLegendGraphic&TRANSPARENT=true&VERSION=1.1.1&FORMAT={2}&LAYER={3}",q.url,a.version,q.legendMimeType,q.layerName)});break;case h.layerType.feature:case h.layerType.Static:k=h.layerType.feature,f=RAMP.layerCounts.feature,RAMP.layerCounts.feature+=1}switch(a.ramp.load.state){case"loaded":o=m.state.LOADED;break;case"loading":o=m.state.LOADING;break;case"error":o=m.state.ERROR}switch(l.addLayer(k,a.ramp.config,o),a.ramp.load.inLS=!0,p.addLayer(a,f),a.ramp.type){case h.layerType.wms:n.isUndefined(q.featureInfo)||j.registerWMSClick({wmsLayer:a,layerConfig:q});break;case h.layerType.feature:a.on("click",function(a){a.stopImmediatePropagation(),i.onFeatureSelect(a)}),a.on("mouse-over",function(a){i.onFeatureMouseOver(a)}),a.on("mouse-out",function(a){i.onFeatureMouseOut(a)});var r,s=new b({id:String.format("boundingBoxLayer_{0}",a.id),visible:q.settings.boundingBoxVisible});if(s.ramp={type:h.layerType.BoundingBox},!n.isUndefined(q.layerExtent))if(r=new e(q.layerExtent),n.isSpatialRefEqual(r.spatialReference,p.spatialReference))s.add(n.createGraphic(r));else{var t=new d,u=new c(RAMP.config.geometryServiceUrl);t.geometries=[r],t.outSR=p.spatialReference,u.project(t,function(a){s.add(n.createGraphic(a[0]))})}g.getBoundingBoxMapping()[a.id]=s,s.setVisibility(q.settings.boundingBoxVisible),f=RAMP.layerCounts.feature+RAMP.layerCounts.bb,RAMP.layerCounts.bb+=1,p.addLayer(s,f)}}}});