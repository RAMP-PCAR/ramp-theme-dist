/*! ramp-theme-canada 06-02-2015 15:26:57 : v. 5.0.0-9 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/_base/array","utils/util"],function(a,b){"use strict";function c(a,c){var d=$.extend(!0,{},a);return b.mergeRecursive(d,c)}function d(a){a.defs("EPSG:3978","+proj=lcc +lat_1=49 +lat_2=77 +lat_0=49 +lon_0=-95 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"),a.defs("EPSG:3979","+proj=lcc +lat_1=49 +lat_2=77 +lat_0=49 +lon_0=-95 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs")}function e(b){var d;return d=c(j,b),d.layers.wms=a.map(d.layers.wms,function(a){return c(g,a)}),d.basemaps=a.map(d.basemaps,function(a){return c(i,a)}),d.layers.feature=a.map(d.layers.feature,function(b){var d=c(f,b);return d.datagrid.gridColumns=a.map(d.datagrid.gridColumns,function(a){return c(h,a)}),d}),d}var f={layerAttributes:"*",minScale:0,maxScale:0,settings:{panelEnabled:!0,opacity:{enabled:!0,"default":1},visible:!0,boundingBoxVisible:!1},datagrid:{rowsPerPage:50},templates:{detail:"default_feature_details",hover:"feature_hover_maptip_template",anchor:"anchored_map_tip",summary:"default_grid_summary_row"}},g={settings:{panelEnabled:!0,opacity:{enabled:!0,"default":1},visible:!0,boundingBoxVisible:!0}},h={orderable:!0,type:"string",alignment:1},i={scaleCssClass:"map-scale-dark",type:"Topographic"},j={initialBasemapIndex:0,extendedDatagridExtentFilterEnabled:!1,rowsPerPage:50,navWidget:{sliderMinVal:3,sliderMaxVal:15,debug:!1,animate:"fast",cssPath:"ramp-theme/navigation",skin:"white"},zoomLevels:{min:1,max:17},templates:{basemap:"default_basemap",globalSelectorToggles:"default_selector_toggles"},layers:{feature:[],wms:[]},divNames:{map:"mainMap",navigation:"map-navigation",filter:"searchMapSectionBody",datagrid:"gridpane"},advancedToolbar:{enabled:!1,tools:[]},mapInitFailUrl:"./error-en.html"};return{init:function(a){var b=e(a);RAMP.config=b,this.layerSelectorGroups=[this.layerType.feature,this.layerType.wms]},defineProjections:d,layerType:{Basemap:"basemap",wms:"wms_layer",BoundingBox:"bounding_box",feature:"feature_layer",Static:"static_layer",Highlight:"highlight_layer",Hoverlight:"hoverlight_layer",Zoomlight:"zoomlight_layer"},layerSelectorGroups:[]}});