/*! ramp-theme-intranet 11-02-2015 14:16:53 : v. 5.0.0-rc2 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/topic","dojo/_base/lang","dojo/on","utils/util"],function(a,b,c,d){"use strict";function e(){var e=c;c=function(a,c,f,g){return d.isUndefined(g)?e(a,c,f):e(a,c,b.hitch(g,f))};var f=a.subscribe;a.subscribe=function(a,b){return d.isUndefined(a)?void 0:f(a,b)}}return{load:function(a,b,c){e(),c()}}});