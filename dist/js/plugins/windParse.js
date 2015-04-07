/*! ramp-theme-canada Plugins 07-04-2015 12:10:21 : v. 5.3.0-2 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
RAMP.plugins.featureInfoParser.windParse=function(a){"use strict";var b=a.match(/value=(-?\d+\.?\d?)[\d \.]*\n/);return b=b?b[1]:"","<p>{0}</p>".format(b)};