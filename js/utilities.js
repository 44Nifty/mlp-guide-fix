function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function humanize(string) {
	string = string.replace(/-/g, ' ');
	string = string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	return string;
}

/*jshint expr:true eqnull:true */
/**
 *
 * Backbone.DeepModel v0.10.4
 *
 * Copyright (c) 2013 Charles Davison, Pow Media Ltd
 *
 * https://github.com/powmedia/backbone-deep-model
 * Licensed under the MIT License
 */

(function(){var e,t,n,r,i,s,o=[].slice;n=function(e){var t,r;return!_.isObject(e)||_.isFunction(e)?e:e instanceof Backbone.Collection||e instanceof Backbone.Model?e:_.isDate(e)?new Date(e.getTime()):_.isRegExp(e)?new RegExp(e.source,e.toString().replace(/.*\//,"")):(r=_.isArray(e||_.isArguments(e)),t=function(e,t,i){return r?e.push(n(t)):e[i]=n(t),e},_.reduce(e,t,r?[]:{}))},s=function(e){return e==null?!1:(e.prototype==={}.prototype||e.prototype===Object.prototype)&&_.isObject(e)&&!_.isArray(e)&&!_.isFunction(e)&&!_.isDate(e)&&!_.isRegExp(e)&&!_.isArguments(e)},t=function(e){return _.filter(_.keys(e),function(t){return s(e[t])})},e=function(e){return _.filter(_.keys(e),function(t){return _.isArray(e[t])})},i=function(n,r,s){var o,u,a,f,l,c,h,p,d,v;s==null&&(s=20);if(s<=0)return console.warn("_.deepExtend(): Maximum depth of recursion hit."),_.extend(n,r);c=_.intersection(t(n),t(r)),u=function(e){return r[e]=i(n[e],r[e],s-1)};for(h=0,d=c.length;h<d;h++)l=c[h],u(l);f=_.intersection(e(n),e(r)),o=function(e){return r[e]=_.union(n[e],r[e])};for(p=0,v=f.length;p<v;p++)a=f[p],o(a);return _.extend(n,r)},r=function(){var e,t,r,s;r=2<=arguments.length?o.call(arguments,0,s=arguments.length-1):(s=0,[]),t=arguments[s++],_.isNumber(t)||(r.push(t),t=20);if(r.length<=1)return r[0];if(t<=0)return _.extend.apply(this,r);e=r.shift();while(r.length>0)e=i(e,n(r.shift()),t);return e},_.mixin({deepClone:n,isBasicObject:s,basicObjects:t,arrays:e,deepExtend:r})}).call(this),function(e){typeof define=="function"&&define.amd?define(["underscore","backbone"],e):e(_,Backbone)}(function(e,t){function n(t){var r={},i=o.keyPathSeparator;for(var s in t){var u=t[s];if(u&&u.constructor===Object&&!e.isEmpty(u)){var a=n(u);for(var f in a){var l=a[f];r[s+i+f]=l}}else r[s]=u}return r}function r(t,n,r){var i=o.keyPathSeparator,s=n.split(i),u=t;r||r===!1;for(var a=0,f=s.length;a<f;a++){if(r&&!e.has(u,s[a]))return!1;u=u[s[a]],u==null&&a<f-1&&(u={});if(typeof u=="undefined")return r?!0:u}return r?!0:u}function i(t,n,r,i){i=i||{};var s=o.keyPathSeparator,u=n.split(s),a=t;for(var f=0,l=u.length;f<l&&a!==undefined;f++){var c=u[f];if(f===l-1)i.unset?delete a[c]:a[c]=r;else{if(typeof a[c]=="undefined"||!e.isObject(a[c]))a[c]={};a=a[c]}}}function s(e,t){i(e,t,null,{unset:!0})}var o=t.Model.extend({constructor:function(t,n){var r,i=t||{};this.cid=e.uniqueId("c"),this.attributes={},n&&n.collection&&(this.collection=n.collection),n&&n.parse&&(i=this.parse(i,n)||{});if(r=e.result(this,"defaults"))i=e.deepExtend({},r,i);this.set(i,n),this.changed={},this.initialize.apply(this,arguments)},toJSON:function(t){return e.deepClone(this.attributes)},get:function(e){return r(this.attributes,e)},set:function(t,u,a){var f,l,c,h,p,d,v,m;if(t==null)return this;typeof t=="object"?(l=t,a=u||{}):(l={})[t]=u,a||(a={});if(!this._validate(l,a))return!1;c=a.unset,p=a.silent,h=[],d=this._changing,this._changing=!0,d||(this._previousAttributes=e.deepClone(this.attributes),this.changed={}),m=this.attributes,v=this._previousAttributes,this.idAttribute in l&&(this.id=l[this.idAttribute]),l=n(l);for(f in l)u=l[f],e.isEqual(r(m,f),u)||h.push(f),e.isEqual(r(v,f),u)?s(this.changed,f):i(this.changed,f,u),c?s(m,f):i(m,f,u);if(!p){h.length&&(this._pending=!0);var g=o.keyPathSeparator;for(var y=0,b=h.length;y<b;y++){var t=h[y];this.trigger("change:"+t,this,r(m,t),a);var w=t.split(g);for(var E=w.length-1;E>0;E--){var S=e.first(w,E).join(g),x=S+g+"*";this.trigger("change:"+x,this,r(m,S),a)}}}if(d)return this;if(!p)while(this._pending)this._pending=!1,this.trigger("change",this,a);return this._pending=!1,this._changing=!1,this},clear:function(t){var r={},i=n(this.attributes);for(var s in i)r[s]=void 0;return this.set(r,e.extend({},t,{unset:!0}))},hasChanged:function(t){return t==null?!e.isEmpty(this.changed):r(this.changed,t)!==undefined},changedAttributes:function(t){if(!t)return this.hasChanged()?n(this.changed):!1;var r=this._changing?this._previousAttributes:this.attributes;t=n(t),r=n(r);var i,s=!1;for(var o in t){if(e.isEqual(r[o],i=t[o]))continue;(s||(s={}))[o]=i}return s},previous:function(e){return e==null||!this._previousAttributes?null:r(this._previousAttributes,e)},previousAttributes:function(){return e.deepClone(this._previousAttributes)}});return o.keyPathSeparator=".",t.DeepModel=o,typeof module!="undefined"&&(module.exports=o),t})
