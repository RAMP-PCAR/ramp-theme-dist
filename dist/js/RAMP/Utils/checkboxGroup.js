/*! ramp-theme-canada 22-01-2015 19:38:48 : v. 5.0.0-5 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/Evented","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","utils/checkbox","utils/array"],function(a,b,c,d,e,f){"use strict";var g;return g=b([a],{constructor:function(a,b){var d,f=this;c.mixin(this,{nodes:[],nodeIdAttr:"id",checkboxes:[],cssClass:{active:"active",focus:"focused",check:"checked"},label:{check:"checked",uncheck:"unchecked"},onChange:function(){},master:{node:null,checkbox:null,nodeIdAttr:null,cssClass:{active:"active",focus:"focused",check:"checked"},label:{check:"checked",uncheck:"unchecked"},onChange:function(){}}},b,{nodes:a}),d={nodeIdAttr:this.nodeIdAttr,cssClass:this.cssClass,label:this.label,onChange:this.onChange},this.master.node?(this.master.checkbox=new e(this.master.node,c.mixin(d,this.master)),this.master.checkbox.on(e.event.TOGGLE,function(a){f.emit(g.event.MASTER_TOGGLE,a),a.agency===e.agency.USER&&f.setState(a.checkbox.state)})):this.master=null,this.addCheckbox(this.nodes)},addCheckbox:function(a){var b,c,d=this,h={nodeIdAttr:this.nodeIdAttr,cssClass:this.cssClass,label:this.label,onChange:this.onChange};a.each(function(a,i){i=$(i),c=f.indexOf(d.checkboxes,function(a){return a.node.is(i)}),-1===c?(b=new e(i,h),d.checkboxes.push(b),b.on(e.event.TOGGLE,function(a){d.emit(g.event.MEMBER_TOGGLE,a),a.agency===e.agency.USER&&d._checkMaster()})):d.checkboxes[c].reset()}),this._checkMaster()},_checkMaster:function(){var a;a=d.every(this.checkboxes,function(a){return a.validate().state}),this.master&&this.master.checkbox.setState(a)},setState:function(a,b){var c,d=this.master.checkbox?this.master.checkbox.id:void 0;if(b&&d!==b){for(var e=0;e<this.checkboxes.length&&(c=this.checkboxes[e],c.id!==b);e++);c.setState(a),this._checkMaster()}else this.master.checkbox.setState(a),this.checkboxes.forEach(function(b){b.setState(a)});return this},setEachState:function(a){return this.checkboxes.forEach(function(b){b.setState(a(b))}),this._checkMaster(),this},_purgeInvalid:function(){var a,b;for(a=this.checkboxes.length-1;a>=0;a--)b=this.checkboxes[a],b.state===e.state.INVALID&&f.remove(this.checkboxes,a)}}),c.mixin(g,{event:{MEMBER_TOGGLE:"checkbox/member-toggle",MASTER_TOGGLE:"checkbox/master-toggle"}}),g});