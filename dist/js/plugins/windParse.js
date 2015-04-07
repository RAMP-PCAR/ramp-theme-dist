/*! ramp-theme-intranet Plugins 07-04-2015 12:18:14 : v. 5.3.0-2 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
RAMP.plugins.featureInfoParser.windParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)[\d \.]*\n/);return b=b?b[1]:"","<p>{0}</p>".format(b)};