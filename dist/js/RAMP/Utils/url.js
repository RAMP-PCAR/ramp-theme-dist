/*! ramp-theme-usability 11-02-2015 14:25:18 : v. 5.0.0-rc2 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["dojo/_base/declare","dojo/io-query"],function(a,b){"use strict";return a(null,{constructor:function(a){var c=a.indexOf("?");-1===c?(this.uri=a,this.query=""):(this.uri=a.substring(0,c),this.query=a.substring(c+1)),this.queryObject=b.queryToObject(this.query)}})});