/*! ramp-theme-intranet Plugins 10-02-2015 22:08:26 : v. 5.0.0-rc1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
RAMP.plugins.featureInfoParser.tempParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)\d*\n/),c=a.match(/unit=(.*)\n/);return b=b?b[1]:"",c=c?c[1]:"","<p>{0} &deg;C</p>".format(b,c)};