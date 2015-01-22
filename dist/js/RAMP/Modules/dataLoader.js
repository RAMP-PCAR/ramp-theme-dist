/*! ramp-theme-usability 22-01-2015 18:23:44 : v. 5.0.0-5 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["dojo/Deferred","esri/request","esri/layers/FeatureLayer","utils/util"],function(a,b,c,d){"use strict";function e(a,b){var d,e,f,i;return e={fields:[]},d=Terraformer.ArcGIS.convert(a),e.drawingInfo=g[h[a.features[0].geometry.type]],i={features:d,geometryType:e.drawingInfo.geometryType},b&&(b.idField&&(e.objectIdField=b.idField),b.renderer&&g.hasOwnProperty(b.renderer)&&(e.drawingInfo={renderer:g[b.renderer].renderer},i.geometryType=g[b.renderer].geometryType)),f=new c({layerDefinition:e,featureSet:i},{mode:c.MODE_SNAPSHOT}),f.ramp={type:"newtype?"},f}function f(c){var f=new a;if(c.file){if(c.url)throw new Error("Either url or file should be specified, not both");return d.readFileAsText(c.file).then(function(a){var b=null;try{b=e(JSON.parse(a)),f.resolve(b)}catch(c){f.reject(c)}}),f.promise}return c.url?(new b({url:c.url}).then(function(a){var b=null;try{b=e(a),f.resolve(b)}catch(c){f.reject(c)}},function(a){f.reject(a)}),f.promise):void 0}var g={circlePoint:{geometryType:"esriGeometryPoint",renderer:{type:"simple",symbol:{type:"esriSMS",style:"esriSMSCircle",color:[67,100,255,200],size:7}}},solidLine:{geometryType:"esriGeometryPolyline",renderer:{type:"simple",symbol:{type:"esriSLS",style:"esriSLSSolid",color:[90,90,90,200],width:2}}},outlinedPoly:{geometryType:"esriGeometryPolygon",renderer:{type:"simple",symbol:{type:"esriSFS",style:"esriSFSSolid",color:[76,76,125,200],outline:{type:"esriSLS",style:"esriSLSSolid",color:[110,110,110,255],width:1}}}}},h={Point:"circlePoint",MultiPoint:"circlePoint",LineString:"solidLine",MultiLineString:"solidLine",Polygon:"outlinedPoly",MultiPolygon:"outlinedPoly"};return{makeGeoJsonLayer:e,buildGeoJson:f}});