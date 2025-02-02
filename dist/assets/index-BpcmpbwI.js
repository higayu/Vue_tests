(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function zl(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const $e={},ss=[],nn=()=>{},Hx=()=>!1,La=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),Wl=t=>t.startsWith("onUpdate:"),At=Object.assign,Kl=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},qx=Object.prototype.hasOwnProperty,Le=(t,e)=>qx.call(t,e),ye=Array.isArray,is=t=>Ma(t)==="[object Map]",sp=t=>Ma(t)==="[object Set]",Ae=t=>typeof t=="function",ot=t=>typeof t=="string",sr=t=>typeof t=="symbol",je=t=>t!==null&&typeof t=="object",ip=t=>(je(t)||Ae(t))&&Ae(t.then)&&Ae(t.catch),op=Object.prototype.toString,Ma=t=>op.call(t),jx=t=>Ma(t).slice(8,-1),ap=t=>Ma(t)==="[object Object]",Gl=t=>ot(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Qs=zl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ua=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},zx=/-(\w)/g,Ht=Ua(t=>t.replace(zx,(e,n)=>n?n.toUpperCase():"")),Wx=/\B([A-Z])/g,Pr=Ua(t=>t.replace(Wx,"-$1").toLowerCase()),$a=Ua(t=>t.charAt(0).toUpperCase()+t.slice(1)),Sc=Ua(t=>t?`on${$a(t)}`:""),Gn=(t,e)=>!Object.is(t,e),mo=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},cp=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},ol=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let th;const Ha=()=>th||(th=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ql(t){if(ye(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=ot(r)?Xx(r):Ql(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(ot(t)||je(t))return t}const Kx=/;(?![^(]*\))/g,Gx=/:([^]+)/,Qx=/\/\*[^]*?\*\//g;function Xx(t){const e={};return t.replace(Qx,"").split(Kx).forEach(n=>{if(n){const r=n.split(Gx);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Xl(t){let e="";if(ot(t))e=t;else if(ye(t))for(let n=0;n<t.length;n++){const r=Xl(t[n]);r&&(e+=r+" ")}else if(je(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Yx="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Jx=zl(Yx);function lp(t){return!!t||t===""}const up=t=>!!(t&&t.__v_isRef===!0),yr=t=>ot(t)?t:t==null?"":ye(t)||je(t)&&(t.toString===op||!Ae(t.toString))?up(t)?yr(t.value):JSON.stringify(t,hp,2):String(t),hp=(t,e)=>up(e)?hp(t,e.value):is(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s],i)=>(n[Dc(r,i)+" =>"]=s,n),{})}:sp(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Dc(n))}:sr(e)?Dc(e):je(e)&&!ye(e)&&!ap(e)?String(e):e,Dc=(t,e="")=>{var n;return sr(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let It;class fp{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=It,!e&&It&&(this.index=(It.scopes||(It.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=It;try{return It=this,e()}finally{It=n}}}on(){It=this}off(){It=this.parent}stop(e){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function dp(t){return new fp(t)}function pp(){return It}function Zx(t,e=!1){It&&It.cleanups.push(t)}let He;const Pc=new WeakSet;class gp{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,It&&It.active&&It.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Pc.has(this)&&(Pc.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||_p(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,nh(this),xp(this);const e=He,n=zt;He=this,zt=!0;try{return this.fn()}finally{vp(this),He=e,zt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Zl(e);this.deps=this.depsTail=void 0,nh(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Pc.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){al(this)&&this.run()}get dirty(){return al(this)}}let mp=0,Xs,Ys;function _p(t,e=!1){if(t.flags|=8,e){t.next=Ys,Ys=t;return}t.next=Xs,Xs=t}function Yl(){mp++}function Jl(){if(--mp>0)return;if(Ys){let e=Ys;for(Ys=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Xs;){let e=Xs;for(Xs=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){t||(t=r)}e=n}}if(t)throw t}function xp(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function vp(t){let e,n=t.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),Zl(r),ev(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}t.deps=e,t.depsTail=n}function al(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(yp(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function yp(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===hi))return;t.globalVersion=hi;const e=t.dep;if(t.flags|=2,e.version>0&&!t.isSSR&&t.deps&&!al(t)){t.flags&=-3;return}const n=He,r=zt;He=t,zt=!0;try{xp(t);const s=t.fn(t._value);(e.version===0||Gn(s,t._value))&&(t._value=s,e.version++)}catch(s){throw e.version++,s}finally{He=n,zt=r,vp(t),t.flags&=-3}}function Zl(t,e=!1){const{dep:n,prevSub:r,nextSub:s}=t;if(r&&(r.nextSub=s,t.prevSub=void 0),s&&(s.prevSub=r,t.nextSub=void 0),n.subs===t&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Zl(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function ev(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let zt=!0;const Ep=[];function ir(){Ep.push(zt),zt=!1}function or(){const t=Ep.pop();zt=t===void 0?!0:t}function nh(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=He;He=void 0;try{e()}finally{He=n}}}let hi=0;class tv{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class eu{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0}track(e){if(!He||!zt||He===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==He)n=this.activeLink=new tv(He,this),He.deps?(n.prevDep=He.depsTail,He.depsTail.nextDep=n,He.depsTail=n):He.deps=He.depsTail=n,Ap(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=He.depsTail,n.nextDep=void 0,He.depsTail.nextDep=n,He.depsTail=n,He.deps===n&&(He.deps=r)}return n}trigger(e){this.version++,hi++,this.notify(e)}notify(e){Yl();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Jl()}}}function Ap(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)Ap(r)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const fa=new WeakMap,Er=Symbol(""),cl=Symbol(""),fi=Symbol("");function yt(t,e,n){if(zt&&He){let r=fa.get(t);r||fa.set(t,r=new Map);let s=r.get(n);s||(r.set(n,s=new eu),s.map=r,s.key=n),s.track()}}function En(t,e,n,r,s,i){const o=fa.get(t);if(!o){hi++;return}const c=l=>{l&&l.trigger()};if(Yl(),e==="clear")o.forEach(c);else{const l=ye(t),u=l&&Gl(n);if(l&&n==="length"){const h=Number(r);o.forEach((d,p)=>{(p==="length"||p===fi||!sr(p)&&p>=h)&&c(d)})}else switch((n!==void 0||o.has(void 0))&&c(o.get(n)),u&&c(o.get(fi)),e){case"add":l?u&&c(o.get("length")):(c(o.get(Er)),is(t)&&c(o.get(cl)));break;case"delete":l||(c(o.get(Er)),is(t)&&c(o.get(cl)));break;case"set":is(t)&&c(o.get(Er));break}}Jl()}function nv(t,e){const n=fa.get(t);return n&&n.get(e)}function Gr(t){const e=Ne(t);return e===t?e:(yt(e,"iterate",fi),Wt(t)?e:e.map(Ct))}function tu(t){return yt(t=Ne(t),"iterate",fi),t}const rv={__proto__:null,[Symbol.iterator](){return Fc(this,Symbol.iterator,Ct)},concat(...t){return Gr(this).concat(...t.map(e=>ye(e)?Gr(e):e))},entries(){return Fc(this,"entries",t=>(t[1]=Ct(t[1]),t))},every(t,e){return _n(this,"every",t,e,void 0,arguments)},filter(t,e){return _n(this,"filter",t,e,n=>n.map(Ct),arguments)},find(t,e){return _n(this,"find",t,e,Ct,arguments)},findIndex(t,e){return _n(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return _n(this,"findLast",t,e,Ct,arguments)},findLastIndex(t,e){return _n(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return _n(this,"forEach",t,e,void 0,arguments)},includes(...t){return kc(this,"includes",t)},indexOf(...t){return kc(this,"indexOf",t)},join(t){return Gr(this).join(t)},lastIndexOf(...t){return kc(this,"lastIndexOf",t)},map(t,e){return _n(this,"map",t,e,void 0,arguments)},pop(){return Hs(this,"pop")},push(...t){return Hs(this,"push",t)},reduce(t,...e){return rh(this,"reduce",t,e)},reduceRight(t,...e){return rh(this,"reduceRight",t,e)},shift(){return Hs(this,"shift")},some(t,e){return _n(this,"some",t,e,void 0,arguments)},splice(...t){return Hs(this,"splice",t)},toReversed(){return Gr(this).toReversed()},toSorted(t){return Gr(this).toSorted(t)},toSpliced(...t){return Gr(this).toSpliced(...t)},unshift(...t){return Hs(this,"unshift",t)},values(){return Fc(this,"values",Ct)}};function Fc(t,e,n){const r=tu(t),s=r[e]();return r!==t&&!Wt(t)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.value&&(i.value=n(i.value)),i}),s}const sv=Array.prototype;function _n(t,e,n,r,s,i){const o=tu(t),c=o!==t&&!Wt(t),l=o[e];if(l!==sv[e]){const d=l.apply(t,i);return c?Ct(d):d}let u=n;o!==t&&(c?u=function(d,p){return n.call(this,Ct(d),p,t)}:n.length>2&&(u=function(d,p){return n.call(this,d,p,t)}));const h=l.call(o,u,r);return c&&s?s(h):h}function rh(t,e,n,r){const s=tu(t);let i=n;return s!==t&&(Wt(t)?n.length>3&&(i=function(o,c,l){return n.call(this,o,c,l,t)}):i=function(o,c,l){return n.call(this,o,Ct(c),l,t)}),s[e](i,...r)}function kc(t,e,n){const r=Ne(t);yt(r,"iterate",fi);const s=r[e](...n);return(s===-1||s===!1)&&su(n[0])?(n[0]=Ne(n[0]),r[e](...n)):s}function Hs(t,e,n=[]){ir(),Yl();const r=Ne(t)[e].apply(t,n);return Jl(),or(),r}const iv=zl("__proto__,__v_isRef,__isVue"),wp=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(sr));function ov(t){sr(t)||(t=String(t));const e=Ne(this);return yt(e,"has",t),e.hasOwnProperty(t)}class Tp{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){if(n==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?mv:Rp:i?bp:Cp).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=ye(e);if(!s){let l;if(o&&(l=rv[n]))return l;if(n==="hasOwnProperty")return ov}const c=Reflect.get(e,n,Xe(e)?e:r);return(sr(n)?wp.has(n):iv(n))||(s||yt(e,"get",n),i)?c:Xe(c)?o&&Gl(n)?c:c.value:je(c)?s?Dp(c):Di(c):c}}class Ip extends Tp{constructor(e=!1){super(!1,e)}set(e,n,r,s){let i=e[n];if(!this._isShallow){const l=Ir(i);if(!Wt(r)&&!Ir(r)&&(i=Ne(i),r=Ne(r)),!ye(e)&&Xe(i)&&!Xe(r))return l?!1:(i.value=r,!0)}const o=ye(e)&&Gl(n)?Number(n)<e.length:Le(e,n),c=Reflect.set(e,n,r,Xe(e)?e:s);return e===Ne(s)&&(o?Gn(r,i)&&En(e,"set",n,r):En(e,"add",n,r)),c}deleteProperty(e,n){const r=Le(e,n);e[n];const s=Reflect.deleteProperty(e,n);return s&&r&&En(e,"delete",n,void 0),s}has(e,n){const r=Reflect.has(e,n);return(!sr(n)||!wp.has(n))&&yt(e,"has",n),r}ownKeys(e){return yt(e,"iterate",ye(e)?"length":Er),Reflect.ownKeys(e)}}class av extends Tp{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const cv=new Ip,lv=new av,uv=new Ip(!0);const ll=t=>t,oo=t=>Reflect.getPrototypeOf(t);function hv(t,e,n){return function(...r){const s=this.__v_raw,i=Ne(s),o=is(i),c=t==="entries"||t===Symbol.iterator&&o,l=t==="keys"&&o,u=s[t](...r),h=n?ll:e?ul:Ct;return!e&&yt(i,"iterate",l?cl:Er),{next(){const{value:d,done:p}=u.next();return p?{value:d,done:p}:{value:c?[h(d[0]),h(d[1])]:h(d),done:p}},[Symbol.iterator](){return this}}}}function ao(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function fv(t,e){const n={get(s){const i=this.__v_raw,o=Ne(i),c=Ne(s);t||(Gn(s,c)&&yt(o,"get",s),yt(o,"get",c));const{has:l}=oo(o),u=e?ll:t?ul:Ct;if(l.call(o,s))return u(i.get(s));if(l.call(o,c))return u(i.get(c));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!t&&yt(Ne(s),"iterate",Er),Reflect.get(s,"size",s)},has(s){const i=this.__v_raw,o=Ne(i),c=Ne(s);return t||(Gn(s,c)&&yt(o,"has",s),yt(o,"has",c)),s===c?i.has(s):i.has(s)||i.has(c)},forEach(s,i){const o=this,c=o.__v_raw,l=Ne(c),u=e?ll:t?ul:Ct;return!t&&yt(l,"iterate",Er),c.forEach((h,d)=>s.call(i,u(h),u(d),o))}};return At(n,t?{add:ao("add"),set:ao("set"),delete:ao("delete"),clear:ao("clear")}:{add(s){!e&&!Wt(s)&&!Ir(s)&&(s=Ne(s));const i=Ne(this);return oo(i).has.call(i,s)||(i.add(s),En(i,"add",s,s)),this},set(s,i){!e&&!Wt(i)&&!Ir(i)&&(i=Ne(i));const o=Ne(this),{has:c,get:l}=oo(o);let u=c.call(o,s);u||(s=Ne(s),u=c.call(o,s));const h=l.call(o,s);return o.set(s,i),u?Gn(i,h)&&En(o,"set",s,i):En(o,"add",s,i),this},delete(s){const i=Ne(this),{has:o,get:c}=oo(i);let l=o.call(i,s);l||(s=Ne(s),l=o.call(i,s)),c&&c.call(i,s);const u=i.delete(s);return l&&En(i,"delete",s,void 0),u},clear(){const s=Ne(this),i=s.size!==0,o=s.clear();return i&&En(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=hv(s,t,e)}),n}function nu(t,e){const n=fv(t,e);return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(Le(n,s)&&s in r?n:r,s,i)}const dv={get:nu(!1,!1)},pv={get:nu(!1,!0)},gv={get:nu(!0,!1)};const Cp=new WeakMap,bp=new WeakMap,Rp=new WeakMap,mv=new WeakMap;function _v(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function xv(t){return t.__v_skip||!Object.isExtensible(t)?0:_v(jx(t))}function Di(t){return Ir(t)?t:ru(t,!1,cv,dv,Cp)}function Sp(t){return ru(t,!1,uv,pv,bp)}function Dp(t){return ru(t,!0,lv,gv,Rp)}function ru(t,e,n,r,s){if(!je(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=s.get(t);if(i)return i;const o=xv(t);if(o===0)return t;const c=new Proxy(t,o===2?r:n);return s.set(t,c),c}function Ar(t){return Ir(t)?Ar(t.__v_raw):!!(t&&t.__v_isReactive)}function Ir(t){return!!(t&&t.__v_isReadonly)}function Wt(t){return!!(t&&t.__v_isShallow)}function su(t){return t?!!t.__v_raw:!1}function Ne(t){const e=t&&t.__v_raw;return e?Ne(e):t}function iu(t){return!Le(t,"__v_skip")&&Object.isExtensible(t)&&cp(t,"__v_skip",!0),t}const Ct=t=>je(t)?Di(t):t,ul=t=>je(t)?Dp(t):t;function Xe(t){return t?t.__v_isRef===!0:!1}function ou(t){return Pp(t,!1)}function vv(t){return Pp(t,!0)}function Pp(t,e){return Xe(t)?t:new yv(t,e)}class yv{constructor(e,n){this.dep=new eu,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:Ne(e),this._value=n?e:Ct(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,r=this.__v_isShallow||Wt(e)||Ir(e);e=r?e:Ne(e),Gn(e,n)&&(this._rawValue=e,this._value=r?e:Ct(e),this.dep.trigger())}}function os(t){return Xe(t)?t.value:t}const Ev={get:(t,e,n)=>e==="__v_raw"?t:os(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return Xe(s)&&!Xe(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function Fp(t){return Ar(t)?t:new Proxy(t,Ev)}function Av(t){const e=ye(t)?new Array(t.length):{};for(const n in t)e[n]=Tv(t,n);return e}class wv{constructor(e,n,r){this._object=e,this._key=n,this._defaultValue=r,this.__v_isRef=!0,this._value=void 0}get value(){const e=this._object[this._key];return this._value=e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return nv(Ne(this._object),this._key)}}function Tv(t,e,n){const r=t[e];return Xe(r)?r:new wv(t,e,n)}class Iv{constructor(e,n,r){this.fn=e,this.setter=n,this._value=void 0,this.dep=new eu(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=hi-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&He!==this)return _p(this,!0),!0}get value(){const e=this.dep.track();return yp(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Cv(t,e,n=!1){let r,s;return Ae(t)?r=t:(r=t.get,s=t.set),new Iv(r,s,n)}const co={},da=new WeakMap;let mr;function bv(t,e=!1,n=mr){if(n){let r=da.get(n);r||da.set(n,r=[]),r.push(t)}}function Rv(t,e,n=$e){const{immediate:r,deep:s,once:i,scheduler:o,augmentJob:c,call:l}=n,u=S=>s?S:Wt(S)||s===!1||s===0?An(S,1):An(S);let h,d,p,m,v=!1,R=!1;if(Xe(t)?(d=()=>t.value,v=Wt(t)):Ar(t)?(d=()=>u(t),v=!0):ye(t)?(R=!0,v=t.some(S=>Ar(S)||Wt(S)),d=()=>t.map(S=>{if(Xe(S))return S.value;if(Ar(S))return u(S);if(Ae(S))return l?l(S,2):S()})):Ae(t)?e?d=l?()=>l(t,2):t:d=()=>{if(p){ir();try{p()}finally{or()}}const S=mr;mr=h;try{return l?l(t,3,[m]):t(m)}finally{mr=S}}:d=nn,e&&s){const S=d,B=s===!0?1/0:s;d=()=>An(S(),B)}const T=pp(),k=()=>{h.stop(),T&&T.active&&Kl(T.effects,h)};if(i&&e){const S=e;e=(...B)=>{S(...B),k()}}let I=R?new Array(t.length).fill(co):co;const b=S=>{if(!(!(h.flags&1)||!h.dirty&&!S))if(e){const B=h.run();if(s||v||(R?B.some((O,y)=>Gn(O,I[y])):Gn(B,I))){p&&p();const O=mr;mr=h;try{const y=[B,I===co?void 0:R&&I[0]===co?[]:I,m];l?l(e,3,y):e(...y),I=B}finally{mr=O}}}else h.run()};return c&&c(b),h=new gp(d),h.scheduler=o?()=>o(b,!1):b,m=S=>bv(S,!1,h),p=h.onStop=()=>{const S=da.get(h);if(S){if(l)l(S,4);else for(const B of S)B();da.delete(h)}},e?r?b(!0):I=h.run():o?o(b.bind(null,!0),!0):h.run(),k.pause=h.pause.bind(h),k.resume=h.resume.bind(h),k.stop=k,k}function An(t,e=1/0,n){if(e<=0||!je(t)||t.__v_skip||(n=n||new Set,n.has(t)))return t;if(n.add(t),e--,Xe(t))An(t.value,e,n);else if(ye(t))for(let r=0;r<t.length;r++)An(t[r],e,n);else if(sp(t)||is(t))t.forEach(r=>{An(r,e,n)});else if(ap(t)){for(const r in t)An(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&An(t[r],e,n)}return t}/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Pi(t,e,n,r){try{return r?t(...r):t()}catch(s){qa(s,e,n)}}function ln(t,e,n,r){if(Ae(t)){const s=Pi(t,e,n,r);return s&&ip(s)&&s.catch(i=>{qa(i,e,n)}),s}if(ye(t)){const s=[];for(let i=0;i<t.length;i++)s.push(ln(t[i],e,n,r));return s}}function qa(t,e,n,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||$e;if(e){let c=e.parent;const l=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;c;){const h=c.ec;if(h){for(let d=0;d<h.length;d++)if(h[d](t,l,u)===!1)return}c=c.parent}if(i){ir(),Pi(i,null,10,[t,l,u]),or();return}}Sv(t,n,s,r,o)}function Sv(t,e,n,r=!0,s=!1){if(s)throw t;console.error(t)}const bt=[];let Zt=-1;const as=[];let $n=null,Xr=0;const kp=Promise.resolve();let pa=null;function au(t){const e=pa||kp;return t?e.then(this?t.bind(this):t):e}function Dv(t){let e=Zt+1,n=bt.length;for(;e<n;){const r=e+n>>>1,s=bt[r],i=di(s);i<t||i===t&&s.flags&2?e=r+1:n=r}return e}function cu(t){if(!(t.flags&1)){const e=di(t),n=bt[bt.length-1];!n||!(t.flags&2)&&e>=di(n)?bt.push(t):bt.splice(Dv(e),0,t),t.flags|=1,Bp()}}function Bp(){pa||(pa=kp.then(Np))}function Pv(t){ye(t)?as.push(...t):$n&&t.id===-1?$n.splice(Xr+1,0,t):t.flags&1||(as.push(t),t.flags|=1),Bp()}function sh(t,e,n=Zt+1){for(;n<bt.length;n++){const r=bt[n];if(r&&r.flags&2){if(t&&r.id!==t.uid)continue;bt.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function Op(t){if(as.length){const e=[...new Set(as)].sort((n,r)=>di(n)-di(r));if(as.length=0,$n){$n.push(...e);return}for($n=e,Xr=0;Xr<$n.length;Xr++){const n=$n[Xr];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}$n=null,Xr=0}}const di=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Np(t){try{for(Zt=0;Zt<bt.length;Zt++){const e=bt[Zt];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Pi(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Zt<bt.length;Zt++){const e=bt[Zt];e&&(e.flags&=-2)}Zt=-1,bt.length=0,Op(),pa=null,(bt.length||as.length)&&Np()}}let Pt=null,Vp=null;function ga(t){const e=Pt;return Pt=t,Vp=t&&t.type.__scopeId||null,e}function Fv(t,e=Pt,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&ph(-1);const i=ga(e);let o;try{o=t(...s)}finally{ga(i),r._d&&ph(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function kv(t,e){if(Pt===null)return t;const n=Ka(Pt),r=t.dirs||(t.dirs=[]);for(let s=0;s<e.length;s++){let[i,o,c,l=$e]=e[s];i&&(Ae(i)&&(i={mounted:i,updated:i}),i.deep&&An(o),r.push({dir:i,instance:n,value:o,oldValue:void 0,arg:c,modifiers:l}))}return t}function pr(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const c=s[o];i&&(c.oldValue=i[o].value);let l=c.dir[r];l&&(ir(),ln(l,n,8,[t.el,c,t,e]),or())}}const Bv=Symbol("_vte"),Ov=t=>t.__isTeleport;function lu(t,e){t.shapeFlag&6&&t.component?(t.transition=e,lu(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}/*! #__NO_SIDE_EFFECTS__ */function Lp(t,e){return Ae(t)?At({name:t.name},e,{setup:t}):t}function Mp(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function ma(t,e,n,r,s=!1){if(ye(t)){t.forEach((v,R)=>ma(v,e&&(ye(e)?e[R]:e),n,r,s));return}if(Js(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&ma(t,e,n,r.component.subTree);return}const i=r.shapeFlag&4?Ka(r.component):r.el,o=s?null:i,{i:c,r:l}=t,u=e&&e.r,h=c.refs===$e?c.refs={}:c.refs,d=c.setupState,p=Ne(d),m=d===$e?()=>!1:v=>Le(p,v);if(u!=null&&u!==l&&(ot(u)?(h[u]=null,m(u)&&(d[u]=null)):Xe(u)&&(u.value=null)),Ae(l))Pi(l,c,12,[o,h]);else{const v=ot(l),R=Xe(l);if(v||R){const T=()=>{if(t.f){const k=v?m(l)?d[l]:h[l]:l.value;s?ye(k)&&Kl(k,i):ye(k)?k.includes(i)||k.push(i):v?(h[l]=[i],m(l)&&(d[l]=h[l])):(l.value=[i],t.k&&(h[t.k]=l.value))}else v?(h[l]=o,m(l)&&(d[l]=o)):R&&(l.value=o,t.k&&(h[t.k]=o))};o?(T.id=-1,Ot(T,n)):T()}}}Ha().requestIdleCallback;Ha().cancelIdleCallback;const Js=t=>!!t.type.__asyncLoader,Up=t=>t.type.__isKeepAlive;function Nv(t,e){$p(t,"a",e)}function Vv(t,e){$p(t,"da",e)}function $p(t,e,n=dt){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(ja(e,r,n),n){let s=n.parent;for(;s&&s.parent;)Up(s.parent.vnode)&&Lv(r,e,n,s),s=s.parent}}function Lv(t,e,n,r){const s=ja(e,t,r,!0);Hp(()=>{Kl(r[e],s)},n)}function ja(t,e,n=dt,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{ir();const c=Fi(n),l=ln(e,n,t,o);return c(),or(),l});return r?s.unshift(i):s.push(i),i}}const kn=t=>(e,n=dt)=>{(!gi||t==="sp")&&ja(t,(...r)=>e(...r),n)},Mv=kn("bm"),Uv=kn("m"),$v=kn("bu"),Hv=kn("u"),qv=kn("bum"),Hp=kn("um"),jv=kn("sp"),zv=kn("rtg"),Wv=kn("rtc");function Kv(t,e=dt){ja("ec",t,e)}const Gv="components";function cs(t,e){return Xv(Gv,t,!0,e)||t}const Qv=Symbol.for("v-ndc");function Xv(t,e,n=!0,r=!1){const s=Pt||dt;if(s){const i=s.type;{const c=Ly(i,!1);if(c&&(c===e||c===Ht(e)||c===$a(Ht(e))))return i}const o=ih(s[t]||i[t],e)||ih(s.appContext[t],e);return!o&&r?i:o}}function ih(t,e){return t&&(t[e]||t[Ht(e)]||t[$a(Ht(e))])}const hl=t=>t?ug(t)?Ka(t):hl(t.parent):null,Zs=At(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>hl(t.parent),$root:t=>hl(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>jp(t),$forceUpdate:t=>t.f||(t.f=()=>{cu(t.update)}),$nextTick:t=>t.n||(t.n=au.bind(t.proxy)),$watch:t=>xy.bind(t)}),Bc=(t,e)=>t!==$e&&!t.__isScriptSetup&&Le(t,e),Yv={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:c,appContext:l}=t;let u;if(e[0]!=="$"){const m=o[e];if(m!==void 0)switch(m){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(Bc(r,e))return o[e]=1,r[e];if(s!==$e&&Le(s,e))return o[e]=2,s[e];if((u=t.propsOptions[0])&&Le(u,e))return o[e]=3,i[e];if(n!==$e&&Le(n,e))return o[e]=4,n[e];fl&&(o[e]=0)}}const h=Zs[e];let d,p;if(h)return e==="$attrs"&&yt(t.attrs,"get",""),h(t);if((d=c.__cssModules)&&(d=d[e]))return d;if(n!==$e&&Le(n,e))return o[e]=4,n[e];if(p=l.config.globalProperties,Le(p,e))return p[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return Bc(s,e)?(s[e]=n,!0):r!==$e&&Le(r,e)?(r[e]=n,!0):Le(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i}},o){let c;return!!n[o]||t!==$e&&Le(t,o)||Bc(e,o)||(c=i[0])&&Le(c,o)||Le(r,o)||Le(Zs,o)||Le(s.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Le(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function oh(t){return ye(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let fl=!0;function Jv(t){const e=jp(t),n=t.proxy,r=t.ctx;fl=!1,e.beforeCreate&&ah(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:c,provide:l,inject:u,created:h,beforeMount:d,mounted:p,beforeUpdate:m,updated:v,activated:R,deactivated:T,beforeDestroy:k,beforeUnmount:I,destroyed:b,unmounted:S,render:B,renderTracked:O,renderTriggered:y,errorCaptured:_,serverPrefetch:E,expose:x,inheritAttrs:w,components:D,directives:A,filters:re}=e;if(u&&Zv(u,r,null),o)for(const se in o){const ce=o[se];Ae(ce)&&(r[se]=ce.bind(n))}if(s){const se=s.call(n,n);je(se)&&(t.data=Di(se))}if(fl=!0,i)for(const se in i){const ce=i[se],Ie=Ae(ce)?ce.bind(n,n):Ae(ce.get)?ce.get.bind(n,n):nn,Ce=!Ae(ce)&&Ae(ce.set)?ce.set.bind(n):nn,U=Lt({get:Ie,set:Ce});Object.defineProperty(r,se,{enumerable:!0,configurable:!0,get:()=>U.value,set:H=>U.value=H})}if(c)for(const se in c)qp(c[se],r,n,se);if(l){const se=Ae(l)?l.call(n):l;Reflect.ownKeys(se).forEach(ce=>{_o(ce,se[ce])})}h&&ah(h,t,"c");function ae(se,ce){ye(ce)?ce.forEach(Ie=>se(Ie.bind(n))):ce&&se(ce.bind(n))}if(ae(Mv,d),ae(Uv,p),ae($v,m),ae(Hv,v),ae(Nv,R),ae(Vv,T),ae(Kv,_),ae(Wv,O),ae(zv,y),ae(qv,I),ae(Hp,S),ae(jv,E),ye(x))if(x.length){const se=t.exposed||(t.exposed={});x.forEach(ce=>{Object.defineProperty(se,ce,{get:()=>n[ce],set:Ie=>n[ce]=Ie})})}else t.exposed||(t.exposed={});B&&t.render===nn&&(t.render=B),w!=null&&(t.inheritAttrs=w),D&&(t.components=D),A&&(t.directives=A),E&&Mp(t)}function Zv(t,e,n=nn){ye(t)&&(t=dl(t));for(const r in t){const s=t[r];let i;je(s)?"default"in s?i=rn(s.from||r,s.default,!0):i=rn(s.from||r):i=rn(s),Xe(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function ah(t,e,n){ln(ye(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function qp(t,e,n,r){let s=r.includes(".")?sg(n,r):()=>n[r];if(ot(t)){const i=e[t];Ae(i)&&ei(s,i)}else if(Ae(t))ei(s,t.bind(n));else if(je(t))if(ye(t))t.forEach(i=>qp(i,e,n,r));else{const i=Ae(t.handler)?t.handler.bind(n):e[t.handler];Ae(i)&&ei(s,i,t)}}function jp(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,c=i.get(e);let l;return c?l=c:!s.length&&!n&&!r?l=e:(l={},s.length&&s.forEach(u=>_a(l,u,o,!0)),_a(l,e,o)),je(e)&&i.set(e,l),l}function _a(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&_a(t,i,n,!0),s&&s.forEach(o=>_a(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const c=ey[o]||n&&n[o];t[o]=c?c(t[o],e[o]):e[o]}return t}const ey={data:ch,props:lh,emits:lh,methods:zs,computed:zs,beforeCreate:Tt,created:Tt,beforeMount:Tt,mounted:Tt,beforeUpdate:Tt,updated:Tt,beforeDestroy:Tt,beforeUnmount:Tt,destroyed:Tt,unmounted:Tt,activated:Tt,deactivated:Tt,errorCaptured:Tt,serverPrefetch:Tt,components:zs,directives:zs,watch:ny,provide:ch,inject:ty};function ch(t,e){return e?t?function(){return At(Ae(t)?t.call(this,this):t,Ae(e)?e.call(this,this):e)}:e:t}function ty(t,e){return zs(dl(t),dl(e))}function dl(t){if(ye(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Tt(t,e){return t?[...new Set([].concat(t,e))]:e}function zs(t,e){return t?At(Object.create(null),t,e):e}function lh(t,e){return t?ye(t)&&ye(e)?[...new Set([...t,...e])]:At(Object.create(null),oh(t),oh(e??{})):e}function ny(t,e){if(!t)return e;if(!e)return t;const n=At(Object.create(null),t);for(const r in e)n[r]=Tt(t[r],e[r]);return n}function zp(){return{app:null,config:{isNativeTag:Hx,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let ry=0;function sy(t,e){return function(r,s=null){Ae(r)||(r=At({},r)),s!=null&&!je(s)&&(s=null);const i=zp(),o=new WeakSet,c=[];let l=!1;const u=i.app={_uid:ry++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:Uy,get config(){return i.config},set config(h){},use(h,...d){return o.has(h)||(h&&Ae(h.install)?(o.add(h),h.install(u,...d)):Ae(h)&&(o.add(h),h(u,...d))),u},mixin(h){return i.mixins.includes(h)||i.mixins.push(h),u},component(h,d){return d?(i.components[h]=d,u):i.components[h]},directive(h,d){return d?(i.directives[h]=d,u):i.directives[h]},mount(h,d,p){if(!l){const m=u._ceVNode||ct(r,s);return m.appContext=i,p===!0?p="svg":p===!1&&(p=void 0),t(m,h,p),l=!0,u._container=h,h.__vue_app__=u,Ka(m.component)}},onUnmount(h){c.push(h)},unmount(){l&&(ln(c,u._instance,16),t(null,u._container),delete u._container.__vue_app__)},provide(h,d){return i.provides[h]=d,u},runWithContext(h){const d=wr;wr=u;try{return h()}finally{wr=d}}};return u}}let wr=null;function _o(t,e){if(dt){let n=dt.provides;const r=dt.parent&&dt.parent.provides;r===n&&(n=dt.provides=Object.create(r)),n[t]=e}}function rn(t,e,n=!1){const r=dt||Pt;if(r||wr){const s=wr?wr._context.provides:r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&t in s)return s[t];if(arguments.length>1)return n&&Ae(e)?e.call(r&&r.proxy):e}}function iy(){return!!(dt||Pt||wr)}const Wp={},Kp=()=>Object.create(Wp),Gp=t=>Object.getPrototypeOf(t)===Wp;function oy(t,e,n,r=!1){const s={},i=Kp();t.propsDefaults=Object.create(null),Qp(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:Sp(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function ay(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,c=Ne(s),[l]=t.propsOptions;let u=!1;if((r||o>0)&&!(o&16)){if(o&8){const h=t.vnode.dynamicProps;for(let d=0;d<h.length;d++){let p=h[d];if(za(t.emitsOptions,p))continue;const m=e[p];if(l)if(Le(i,p))m!==i[p]&&(i[p]=m,u=!0);else{const v=Ht(p);s[v]=pl(l,c,v,m,t,!1)}else m!==i[p]&&(i[p]=m,u=!0)}}}else{Qp(t,e,s,i)&&(u=!0);let h;for(const d in c)(!e||!Le(e,d)&&((h=Pr(d))===d||!Le(e,h)))&&(l?n&&(n[d]!==void 0||n[h]!==void 0)&&(s[d]=pl(l,c,d,void 0,t,!0)):delete s[d]);if(i!==c)for(const d in i)(!e||!Le(e,d))&&(delete i[d],u=!0)}u&&En(t.attrs,"set","")}function Qp(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,c;if(e)for(let l in e){if(Qs(l))continue;const u=e[l];let h;s&&Le(s,h=Ht(l))?!i||!i.includes(h)?n[h]=u:(c||(c={}))[h]=u:za(t.emitsOptions,l)||(!(l in r)||u!==r[l])&&(r[l]=u,o=!0)}if(i){const l=Ne(n),u=c||$e;for(let h=0;h<i.length;h++){const d=i[h];n[d]=pl(s,l,d,u[d],t,!Le(u,d))}}return o}function pl(t,e,n,r,s,i){const o=t[n];if(o!=null){const c=Le(o,"default");if(c&&r===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Ae(l)){const{propsDefaults:u}=s;if(n in u)r=u[n];else{const h=Fi(s);r=u[n]=l.call(null,e),h()}}else r=l;s.ce&&s.ce._setProp(n,r)}o[0]&&(i&&!c?r=!1:o[1]&&(r===""||r===Pr(n))&&(r=!0))}return r}const cy=new WeakMap;function Xp(t,e,n=!1){const r=n?cy:e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},c=[];let l=!1;if(!Ae(t)){const h=d=>{l=!0;const[p,m]=Xp(d,e,!0);At(o,p),m&&c.push(...m)};!n&&e.mixins.length&&e.mixins.forEach(h),t.extends&&h(t.extends),t.mixins&&t.mixins.forEach(h)}if(!i&&!l)return je(t)&&r.set(t,ss),ss;if(ye(i))for(let h=0;h<i.length;h++){const d=Ht(i[h]);uh(d)&&(o[d]=$e)}else if(i)for(const h in i){const d=Ht(h);if(uh(d)){const p=i[h],m=o[d]=ye(p)||Ae(p)?{type:p}:At({},p),v=m.type;let R=!1,T=!0;if(ye(v))for(let k=0;k<v.length;++k){const I=v[k],b=Ae(I)&&I.name;if(b==="Boolean"){R=!0;break}else b==="String"&&(T=!1)}else R=Ae(v)&&v.name==="Boolean";m[0]=R,m[1]=T,(R||Le(m,"default"))&&c.push(d)}}const u=[o,c];return je(t)&&r.set(t,u),u}function uh(t){return t[0]!=="$"&&!Qs(t)}const Yp=t=>t[0]==="_"||t==="$stable",uu=t=>ye(t)?t.map(en):[en(t)],ly=(t,e,n)=>{if(e._n)return e;const r=Fv((...s)=>uu(e(...s)),n);return r._c=!1,r},Jp=(t,e,n)=>{const r=t._ctx;for(const s in t){if(Yp(s))continue;const i=t[s];if(Ae(i))e[s]=ly(s,i,r);else if(i!=null){const o=uu(i);e[s]=()=>o}}},Zp=(t,e)=>{const n=uu(e);t.slots.default=()=>n},eg=(t,e,n)=>{for(const r in e)(n||r!=="_")&&(t[r]=e[r])},uy=(t,e,n)=>{const r=t.slots=Kp();if(t.vnode.shapeFlag&32){const s=e._;s?(eg(r,e,n),n&&cp(r,"_",s,!0)):Jp(e,r)}else e&&Zp(t,e)},hy=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=$e;if(r.shapeFlag&32){const c=e._;c?n&&c===1?i=!1:eg(s,e,n):(i=!e.$stable,Jp(e,s)),o=e}else e&&(Zp(t,e),o={default:1});if(i)for(const c in s)!Yp(c)&&o[c]==null&&delete s[c]},Ot=Iy;function fy(t){return dy(t)}function dy(t,e){const n=Ha();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:c,createComment:l,setText:u,setElementText:h,parentNode:d,nextSibling:p,setScopeId:m=nn,insertStaticContent:v}=t,R=(P,F,N,$=null,z=null,j=null,ee=void 0,J=null,Y=!!F.dynamicChildren)=>{if(P===F)return;P&&!qs(P,F)&&($=M(P),H(P,z,j,!0),P=null),F.patchFlag===-2&&(Y=!1,F.dynamicChildren=null);const{type:Q,ref:ue,shapeFlag:Z}=F;switch(Q){case Wa:T(P,F,N,$);break;case Cr:k(P,F,N,$);break;case Nc:P==null&&I(F,N,$,ee);break;case yn:D(P,F,N,$,z,j,ee,J,Y);break;default:Z&1?B(P,F,N,$,z,j,ee,J,Y):Z&6?A(P,F,N,$,z,j,ee,J,Y):(Z&64||Z&128)&&Q.process(P,F,N,$,z,j,ee,J,Y,ie)}ue!=null&&z&&ma(ue,P&&P.ref,j,F||P,!F)},T=(P,F,N,$)=>{if(P==null)r(F.el=c(F.children),N,$);else{const z=F.el=P.el;F.children!==P.children&&u(z,F.children)}},k=(P,F,N,$)=>{P==null?r(F.el=l(F.children||""),N,$):F.el=P.el},I=(P,F,N,$)=>{[P.el,P.anchor]=v(P.children,F,N,$,P.el,P.anchor)},b=({el:P,anchor:F},N,$)=>{let z;for(;P&&P!==F;)z=p(P),r(P,N,$),P=z;r(F,N,$)},S=({el:P,anchor:F})=>{let N;for(;P&&P!==F;)N=p(P),s(P),P=N;s(F)},B=(P,F,N,$,z,j,ee,J,Y)=>{F.type==="svg"?ee="svg":F.type==="math"&&(ee="mathml"),P==null?O(F,N,$,z,j,ee,J,Y):E(P,F,z,j,ee,J,Y)},O=(P,F,N,$,z,j,ee,J)=>{let Y,Q;const{props:ue,shapeFlag:Z,transition:he,dirs:de}=P;if(Y=P.el=o(P.type,j,ue&&ue.is,ue),Z&8?h(Y,P.children):Z&16&&_(P.children,Y,null,$,z,Oc(P,j),ee,J),de&&pr(P,null,$,"created"),y(Y,P,P.scopeId,ee,$),ue){for(const me in ue)me!=="value"&&!Qs(me)&&i(Y,me,null,ue[me],j,$);"value"in ue&&i(Y,"value",null,ue.value,j),(Q=ue.onVnodeBeforeMount)&&Jt(Q,$,P)}de&&pr(P,null,$,"beforeMount");const fe=py(z,he);fe&&he.beforeEnter(Y),r(Y,F,N),((Q=ue&&ue.onVnodeMounted)||fe||de)&&Ot(()=>{Q&&Jt(Q,$,P),fe&&he.enter(Y),de&&pr(P,null,$,"mounted")},z)},y=(P,F,N,$,z)=>{if(N&&m(P,N),$)for(let j=0;j<$.length;j++)m(P,$[j]);if(z){let j=z.subTree;if(F===j||og(j.type)&&(j.ssContent===F||j.ssFallback===F)){const ee=z.vnode;y(P,ee,ee.scopeId,ee.slotScopeIds,z.parent)}}},_=(P,F,N,$,z,j,ee,J,Y=0)=>{for(let Q=Y;Q<P.length;Q++){const ue=P[Q]=J?Hn(P[Q]):en(P[Q]);R(null,ue,F,N,$,z,j,ee,J)}},E=(P,F,N,$,z,j,ee)=>{const J=F.el=P.el;let{patchFlag:Y,dynamicChildren:Q,dirs:ue}=F;Y|=P.patchFlag&16;const Z=P.props||$e,he=F.props||$e;let de;if(N&&gr(N,!1),(de=he.onVnodeBeforeUpdate)&&Jt(de,N,F,P),ue&&pr(F,P,N,"beforeUpdate"),N&&gr(N,!0),(Z.innerHTML&&he.innerHTML==null||Z.textContent&&he.textContent==null)&&h(J,""),Q?x(P.dynamicChildren,Q,J,N,$,Oc(F,z),j):ee||ce(P,F,J,null,N,$,Oc(F,z),j,!1),Y>0){if(Y&16)w(J,Z,he,N,z);else if(Y&2&&Z.class!==he.class&&i(J,"class",null,he.class,z),Y&4&&i(J,"style",Z.style,he.style,z),Y&8){const fe=F.dynamicProps;for(let me=0;me<fe.length;me++){const Re=fe[me],et=Z[Re],Ye=he[Re];(Ye!==et||Re==="value")&&i(J,Re,et,Ye,z,N)}}Y&1&&P.children!==F.children&&h(J,F.children)}else!ee&&Q==null&&w(J,Z,he,N,z);((de=he.onVnodeUpdated)||ue)&&Ot(()=>{de&&Jt(de,N,F,P),ue&&pr(F,P,N,"updated")},$)},x=(P,F,N,$,z,j,ee)=>{for(let J=0;J<F.length;J++){const Y=P[J],Q=F[J],ue=Y.el&&(Y.type===yn||!qs(Y,Q)||Y.shapeFlag&70)?d(Y.el):N;R(Y,Q,ue,null,$,z,j,ee,!0)}},w=(P,F,N,$,z)=>{if(F!==N){if(F!==$e)for(const j in F)!Qs(j)&&!(j in N)&&i(P,j,F[j],null,z,$);for(const j in N){if(Qs(j))continue;const ee=N[j],J=F[j];ee!==J&&j!=="value"&&i(P,j,J,ee,z,$)}"value"in N&&i(P,"value",F.value,N.value,z)}},D=(P,F,N,$,z,j,ee,J,Y)=>{const Q=F.el=P?P.el:c(""),ue=F.anchor=P?P.anchor:c("");let{patchFlag:Z,dynamicChildren:he,slotScopeIds:de}=F;de&&(J=J?J.concat(de):de),P==null?(r(Q,N,$),r(ue,N,$),_(F.children||[],N,ue,z,j,ee,J,Y)):Z>0&&Z&64&&he&&P.dynamicChildren?(x(P.dynamicChildren,he,N,z,j,ee,J),(F.key!=null||z&&F===z.subTree)&&tg(P,F,!0)):ce(P,F,N,ue,z,j,ee,J,Y)},A=(P,F,N,$,z,j,ee,J,Y)=>{F.slotScopeIds=J,P==null?F.shapeFlag&512?z.ctx.activate(F,N,$,ee,Y):re(F,N,$,z,j,ee,Y):le(P,F,Y)},re=(P,F,N,$,z,j,ee)=>{const J=P.component=ky(P,$,z);if(Up(P)&&(J.ctx.renderer=ie),By(J,!1,ee),J.asyncDep){if(z&&z.registerDep(J,ae,ee),!P.el){const Y=J.subTree=ct(Cr);k(null,Y,F,N)}}else ae(J,P,F,N,z,j,ee)},le=(P,F,N)=>{const $=F.component=P.component;if(wy(P,F,N))if($.asyncDep&&!$.asyncResolved){se($,F,N);return}else $.next=F,$.update();else F.el=P.el,$.vnode=F},ae=(P,F,N,$,z,j,ee)=>{const J=()=>{if(P.isMounted){let{next:Z,bu:he,u:de,parent:fe,vnode:me}=P;{const We=ng(P);if(We){Z&&(Z.el=me.el,se(P,Z,ee)),We.asyncDep.then(()=>{P.isUnmounted||J()});return}}let Re=Z,et;gr(P,!1),Z?(Z.el=me.el,se(P,Z,ee)):Z=me,he&&mo(he),(et=Z.props&&Z.props.onVnodeBeforeUpdate)&&Jt(et,fe,Z,me),gr(P,!0);const Ye=fh(P),tt=P.subTree;P.subTree=Ye,R(tt,Ye,d(tt.el),M(tt),P,z,j),Z.el=Ye.el,Re===null&&Ty(P,Ye.el),de&&Ot(de,z),(et=Z.props&&Z.props.onVnodeUpdated)&&Ot(()=>Jt(et,fe,Z,me),z)}else{let Z;const{el:he,props:de}=F,{bm:fe,m:me,parent:Re,root:et,type:Ye}=P,tt=Js(F);gr(P,!1),fe&&mo(fe),!tt&&(Z=de&&de.onVnodeBeforeMount)&&Jt(Z,Re,F),gr(P,!0);{et.ce&&et.ce._injectChildStyle(Ye);const We=P.subTree=fh(P);R(null,We,N,$,P,z,j),F.el=We.el}if(me&&Ot(me,z),!tt&&(Z=de&&de.onVnodeMounted)){const We=F;Ot(()=>Jt(Z,Re,We),z)}(F.shapeFlag&256||Re&&Js(Re.vnode)&&Re.vnode.shapeFlag&256)&&P.a&&Ot(P.a,z),P.isMounted=!0,F=N=$=null}};P.scope.on();const Y=P.effect=new gp(J);P.scope.off();const Q=P.update=Y.run.bind(Y),ue=P.job=Y.runIfDirty.bind(Y);ue.i=P,ue.id=P.uid,Y.scheduler=()=>cu(ue),gr(P,!0),Q()},se=(P,F,N)=>{F.component=P;const $=P.vnode.props;P.vnode=F,P.next=null,ay(P,F.props,$,N),hy(P,F.children,N),ir(),sh(P),or()},ce=(P,F,N,$,z,j,ee,J,Y=!1)=>{const Q=P&&P.children,ue=P?P.shapeFlag:0,Z=F.children,{patchFlag:he,shapeFlag:de}=F;if(he>0){if(he&128){Ce(Q,Z,N,$,z,j,ee,J,Y);return}else if(he&256){Ie(Q,Z,N,$,z,j,ee,J,Y);return}}de&8?(ue&16&&Te(Q,z,j),Z!==Q&&h(N,Z)):ue&16?de&16?Ce(Q,Z,N,$,z,j,ee,J,Y):Te(Q,z,j,!0):(ue&8&&h(N,""),de&16&&_(Z,N,$,z,j,ee,J,Y))},Ie=(P,F,N,$,z,j,ee,J,Y)=>{P=P||ss,F=F||ss;const Q=P.length,ue=F.length,Z=Math.min(Q,ue);let he;for(he=0;he<Z;he++){const de=F[he]=Y?Hn(F[he]):en(F[he]);R(P[he],de,N,null,z,j,ee,J,Y)}Q>ue?Te(P,z,j,!0,!1,Z):_(F,N,$,z,j,ee,J,Y,Z)},Ce=(P,F,N,$,z,j,ee,J,Y)=>{let Q=0;const ue=F.length;let Z=P.length-1,he=ue-1;for(;Q<=Z&&Q<=he;){const de=P[Q],fe=F[Q]=Y?Hn(F[Q]):en(F[Q]);if(qs(de,fe))R(de,fe,N,null,z,j,ee,J,Y);else break;Q++}for(;Q<=Z&&Q<=he;){const de=P[Z],fe=F[he]=Y?Hn(F[he]):en(F[he]);if(qs(de,fe))R(de,fe,N,null,z,j,ee,J,Y);else break;Z--,he--}if(Q>Z){if(Q<=he){const de=he+1,fe=de<ue?F[de].el:$;for(;Q<=he;)R(null,F[Q]=Y?Hn(F[Q]):en(F[Q]),N,fe,z,j,ee,J,Y),Q++}}else if(Q>he)for(;Q<=Z;)H(P[Q],z,j,!0),Q++;else{const de=Q,fe=Q,me=new Map;for(Q=fe;Q<=he;Q++){const Je=F[Q]=Y?Hn(F[Q]):en(F[Q]);Je.key!=null&&me.set(Je.key,Q)}let Re,et=0;const Ye=he-fe+1;let tt=!1,We=0;const Yt=new Array(Ye);for(Q=0;Q<Ye;Q++)Yt[Q]=0;for(Q=de;Q<=Z;Q++){const Je=P[Q];if(et>=Ye){H(Je,z,j,!0);continue}let Rt;if(Je.key!=null)Rt=me.get(Je.key);else for(Re=fe;Re<=he;Re++)if(Yt[Re-fe]===0&&qs(Je,F[Re])){Rt=Re;break}Rt===void 0?H(Je,z,j,!0):(Yt[Rt-fe]=Q+1,Rt>=We?We=Rt:tt=!0,R(Je,F[Rt],N,null,z,j,ee,J,Y),et++)}const Bn=tt?gy(Yt):ss;for(Re=Bn.length-1,Q=Ye-1;Q>=0;Q--){const Je=fe+Q,Rt=F[Je],$r=Je+1<ue?F[Je+1].el:$;Yt[Q]===0?R(null,Rt,N,$r,z,j,ee,J,Y):tt&&(Re<0||Q!==Bn[Re]?U(Rt,N,$r,2):Re--)}}},U=(P,F,N,$,z=null)=>{const{el:j,type:ee,transition:J,children:Y,shapeFlag:Q}=P;if(Q&6){U(P.component.subTree,F,N,$);return}if(Q&128){P.suspense.move(F,N,$);return}if(Q&64){ee.move(P,F,N,ie);return}if(ee===yn){r(j,F,N);for(let Z=0;Z<Y.length;Z++)U(Y[Z],F,N,$);r(P.anchor,F,N);return}if(ee===Nc){b(P,F,N);return}if($!==2&&Q&1&&J)if($===0)J.beforeEnter(j),r(j,F,N),Ot(()=>J.enter(j),z);else{const{leave:Z,delayLeave:he,afterLeave:de}=J,fe=()=>r(j,F,N),me=()=>{Z(j,()=>{fe(),de&&de()})};he?he(j,fe,me):me()}else r(j,F,N)},H=(P,F,N,$=!1,z=!1)=>{const{type:j,props:ee,ref:J,children:Y,dynamicChildren:Q,shapeFlag:ue,patchFlag:Z,dirs:he,cacheIndex:de}=P;if(Z===-2&&(z=!1),J!=null&&ma(J,null,N,P,!0),de!=null&&(F.renderCache[de]=void 0),ue&256){F.ctx.deactivate(P);return}const fe=ue&1&&he,me=!Js(P);let Re;if(me&&(Re=ee&&ee.onVnodeBeforeUnmount)&&Jt(Re,F,P),ue&6)Pe(P.component,N,$);else{if(ue&128){P.suspense.unmount(N,$);return}fe&&pr(P,null,F,"beforeUnmount"),ue&64?P.type.remove(P,F,N,ie,$):Q&&!Q.hasOnce&&(j!==yn||Z>0&&Z&64)?Te(Q,F,N,!1,!0):(j===yn&&Z&384||!z&&ue&16)&&Te(Y,F,N),$&&q(P)}(me&&(Re=ee&&ee.onVnodeUnmounted)||fe)&&Ot(()=>{Re&&Jt(Re,F,P),fe&&pr(P,null,F,"unmounted")},N)},q=P=>{const{type:F,el:N,anchor:$,transition:z}=P;if(F===yn){K(N,$);return}if(F===Nc){S(P);return}const j=()=>{s(N),z&&!z.persisted&&z.afterLeave&&z.afterLeave()};if(P.shapeFlag&1&&z&&!z.persisted){const{leave:ee,delayLeave:J}=z,Y=()=>ee(N,j);J?J(P.el,j,Y):Y()}else j()},K=(P,F)=>{let N;for(;P!==F;)N=p(P),s(P),P=N;s(F)},Pe=(P,F,N)=>{const{bum:$,scope:z,job:j,subTree:ee,um:J,m:Y,a:Q}=P;hh(Y),hh(Q),$&&mo($),z.stop(),j&&(j.flags|=8,H(ee,P,F,N)),J&&Ot(J,F),Ot(()=>{P.isUnmounted=!0},F),F&&F.pendingBranch&&!F.isUnmounted&&P.asyncDep&&!P.asyncResolved&&P.suspenseId===F.pendingId&&(F.deps--,F.deps===0&&F.resolve())},Te=(P,F,N,$=!1,z=!1,j=0)=>{for(let ee=j;ee<P.length;ee++)H(P[ee],F,N,$,z)},M=P=>{if(P.shapeFlag&6)return M(P.component.subTree);if(P.shapeFlag&128)return P.suspense.next();const F=p(P.anchor||P.el),N=F&&F[Bv];return N?p(N):F};let G=!1;const ne=(P,F,N)=>{P==null?F._vnode&&H(F._vnode,null,null,!0):R(F._vnode||null,P,F,null,null,null,N),F._vnode=P,G||(G=!0,sh(),Op(),G=!1)},ie={p:R,um:H,m:U,r:q,mt:re,mc:_,pc:ce,pbc:x,n:M,o:t};return{render:ne,hydrate:void 0,createApp:sy(ne)}}function Oc({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function gr({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function py(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function tg(t,e,n=!1){const r=t.children,s=e.children;if(ye(r)&&ye(s))for(let i=0;i<r.length;i++){const o=r[i];let c=s[i];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=s[i]=Hn(s[i]),c.el=o.el),!n&&c.patchFlag!==-2&&tg(o,c)),c.type===Wa&&(c.el=o.el)}}function gy(t){const e=t.slice(),n=[0];let r,s,i,o,c;const l=t.length;for(r=0;r<l;r++){const u=t[r];if(u!==0){if(s=n[n.length-1],t[s]<u){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)c=i+o>>1,t[n[c]]<u?i=c+1:o=c;u<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function ng(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:ng(e)}function hh(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const my=Symbol.for("v-scx"),_y=()=>rn(my);function ei(t,e,n){return rg(t,e,n)}function rg(t,e,n=$e){const{immediate:r,deep:s,flush:i,once:o}=n,c=At({},n),l=e&&r||!e&&i!=="post";let u;if(gi){if(i==="sync"){const m=_y();u=m.__watcherHandles||(m.__watcherHandles=[])}else if(!l){const m=()=>{};return m.stop=nn,m.resume=nn,m.pause=nn,m}}const h=dt;c.call=(m,v,R)=>ln(m,h,v,R);let d=!1;i==="post"?c.scheduler=m=>{Ot(m,h&&h.suspense)}:i!=="sync"&&(d=!0,c.scheduler=(m,v)=>{v?m():cu(m)}),c.augmentJob=m=>{e&&(m.flags|=4),d&&(m.flags|=2,h&&(m.id=h.uid,m.i=h))};const p=Rv(t,e,c);return gi&&(u?u.push(p):l&&p()),p}function xy(t,e,n){const r=this.proxy,s=ot(t)?t.includes(".")?sg(r,t):()=>r[t]:t.bind(r,r);let i;Ae(e)?i=e:(i=e.handler,n=e);const o=Fi(this),c=rg(s,i.bind(r),n);return o(),c}function sg(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const vy=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Ht(e)}Modifiers`]||t[`${Pr(e)}Modifiers`];function yy(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||$e;let s=n;const i=e.startsWith("update:"),o=i&&vy(r,e.slice(7));o&&(o.trim&&(s=n.map(h=>ot(h)?h.trim():h)),o.number&&(s=n.map(ol)));let c,l=r[c=Sc(e)]||r[c=Sc(Ht(e))];!l&&i&&(l=r[c=Sc(Pr(e))]),l&&ln(l,t,6,s);const u=r[c+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[c])return;t.emitted[c]=!0,ln(u,t,6,s)}}function ig(t,e,n=!1){const r=e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},c=!1;if(!Ae(t)){const l=u=>{const h=ig(u,e,!0);h&&(c=!0,At(o,h))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!i&&!c?(je(t)&&r.set(t,null),null):(ye(i)?i.forEach(l=>o[l]=null):At(o,i),je(t)&&r.set(t,o),o)}function za(t,e){return!t||!La(e)?!1:(e=e.slice(2).replace(/Once$/,""),Le(t,e[0].toLowerCase()+e.slice(1))||Le(t,Pr(e))||Le(t,e))}function fh(t){const{type:e,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:o,attrs:c,emit:l,render:u,renderCache:h,props:d,data:p,setupState:m,ctx:v,inheritAttrs:R}=t,T=ga(t);let k,I;try{if(n.shapeFlag&4){const S=s||r,B=S;k=en(u.call(B,S,h,d,m,p,v)),I=c}else{const S=e;k=en(S.length>1?S(d,{attrs:c,slots:o,emit:l}):S(d,null)),I=e.props?c:Ey(c)}}catch(S){ti.length=0,qa(S,t,1),k=ct(Cr)}let b=k;if(I&&R!==!1){const S=Object.keys(I),{shapeFlag:B}=b;S.length&&B&7&&(i&&S.some(Wl)&&(I=Ay(I,i)),b=ds(b,I,!1,!0))}return n.dirs&&(b=ds(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&lu(b,n.transition),k=b,ga(T),k}const Ey=t=>{let e;for(const n in t)(n==="class"||n==="style"||La(n))&&((e||(e={}))[n]=t[n]);return e},Ay=(t,e)=>{const n={};for(const r in t)(!Wl(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function wy(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:c,patchFlag:l}=e,u=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return r?dh(r,o,u):!!o;if(l&8){const h=e.dynamicProps;for(let d=0;d<h.length;d++){const p=h[d];if(o[p]!==r[p]&&!za(u,p))return!0}}}else return(s||c)&&(!c||!c.$stable)?!0:r===o?!1:r?o?dh(r,o,u):!0:!!o;return!1}function dh(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!za(n,i))return!0}return!1}function Ty({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const og=t=>t.__isSuspense;function Iy(t,e){e&&e.pendingBranch?ye(t)?e.effects.push(...t):e.effects.push(t):Pv(t)}const yn=Symbol.for("v-fgt"),Wa=Symbol.for("v-txt"),Cr=Symbol.for("v-cmt"),Nc=Symbol.for("v-stc"),ti=[];let Nt=null;function Kt(t=!1){ti.push(Nt=t?null:[])}function Cy(){ti.pop(),Nt=ti[ti.length-1]||null}let pi=1;function ph(t,e=!1){pi+=t,t<0&&Nt&&e&&(Nt.hasOnce=!0)}function ag(t){return t.dynamicChildren=pi>0?Nt||ss:null,Cy(),pi>0&&Nt&&Nt.push(t),t}function bn(t,e,n,r,s,i){return ag(we(t,e,n,r,s,i,!0))}function cg(t,e,n,r,s){return ag(ct(t,e,n,r,s,!0))}function xa(t){return t?t.__v_isVNode===!0:!1}function qs(t,e){return t.type===e.type&&t.key===e.key}const lg=({key:t})=>t??null,xo=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?ot(t)||Xe(t)||Ae(t)?{i:Pt,r:t,k:e,f:!!n}:t:null);function we(t,e=null,n=null,r=0,s=null,i=t===yn?0:1,o=!1,c=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&lg(e),ref:e&&xo(e),scopeId:Vp,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Pt};return c?(hu(l,n),i&128&&t.normalize(l)):n&&(l.shapeFlag|=ot(n)?8:16),pi>0&&!o&&Nt&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&Nt.push(l),l}const ct=by;function by(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===Qv)&&(t=Cr),xa(t)){const c=ds(t,e,!0);return n&&hu(c,n),pi>0&&!i&&Nt&&(c.shapeFlag&6?Nt[Nt.indexOf(t)]=c:Nt.push(c)),c.patchFlag=-2,c}if(My(t)&&(t=t.__vccOpts),e){e=Ry(e);let{class:c,style:l}=e;c&&!ot(c)&&(e.class=Xl(c)),je(l)&&(su(l)&&!ye(l)&&(l=At({},l)),e.style=Ql(l))}const o=ot(t)?1:og(t)?128:Ov(t)?64:je(t)?4:Ae(t)?2:0;return we(t,e,n,r,s,o,i,!0)}function Ry(t){return t?su(t)||Gp(t)?At({},t):t:null}function ds(t,e,n=!1,r=!1){const{props:s,ref:i,patchFlag:o,children:c,transition:l}=t,u=e?Dy(s||{},e):s,h={__v_isVNode:!0,__v_skip:!0,type:t.type,props:u,key:u&&lg(u),ref:e&&e.ref?n&&i?ye(i)?i.concat(xo(e)):[i,xo(e)]:xo(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:c,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==yn?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&ds(t.ssContent),ssFallback:t.ssFallback&&ds(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&r&&lu(h,l.clone(h)),h}function vo(t=" ",e=0){return ct(Wa,null,t,e)}function Sy(t="",e=!1){return e?(Kt(),cg(Cr,null,t)):ct(Cr,null,t)}function en(t){return t==null||typeof t=="boolean"?ct(Cr):ye(t)?ct(yn,null,t.slice()):xa(t)?Hn(t):ct(Wa,null,String(t))}function Hn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:ds(t)}function hu(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(ye(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),hu(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!Gp(e)?e._ctx=Pt:s===3&&Pt&&(Pt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else Ae(e)?(e={default:e,_ctx:Pt},n=32):(e=String(e),r&64?(n=16,e=[vo(e)]):n=8);t.children=e,t.shapeFlag|=n}function Dy(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=Xl([e.class,r.class]));else if(s==="style")e.style=Ql([e.style,r.style]);else if(La(s)){const i=e[s],o=r[s];o&&i!==o&&!(ye(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function Jt(t,e,n,r=null){ln(t,e,7,[n,r])}const Py=zp();let Fy=0;function ky(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||Py,i={uid:Fy++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new fp(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Xp(r,s),emitsOptions:ig(r,s),emit:null,emitted:null,propsDefaults:$e,inheritAttrs:r.inheritAttrs,ctx:$e,data:$e,props:$e,attrs:$e,slots:$e,refs:$e,setupState:$e,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=yy.bind(null,i),t.ce&&t.ce(i),i}let dt=null,va,gl;{const t=Ha(),e=(n,r)=>{let s;return(s=t[n])||(s=t[n]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};va=e("__VUE_INSTANCE_SETTERS__",n=>dt=n),gl=e("__VUE_SSR_SETTERS__",n=>gi=n)}const Fi=t=>{const e=dt;return va(t),t.scope.on(),()=>{t.scope.off(),va(e)}},gh=()=>{dt&&dt.scope.off(),va(null)};function ug(t){return t.vnode.shapeFlag&4}let gi=!1;function By(t,e=!1,n=!1){e&&gl(e);const{props:r,children:s}=t.vnode,i=ug(t);oy(t,r,i,e),uy(t,s,n);const o=i?Oy(t,e):void 0;return e&&gl(!1),o}function Oy(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Yv);const{setup:r}=n;if(r){ir();const s=t.setupContext=r.length>1?Vy(t):null,i=Fi(t),o=Pi(r,t,0,[t.props,s]),c=ip(o);if(or(),i(),(c||t.sp)&&!Js(t)&&Mp(t),c){if(o.then(gh,gh),e)return o.then(l=>{mh(t,l)}).catch(l=>{qa(l,t,0)});t.asyncDep=o}else mh(t,o)}else hg(t)}function mh(t,e,n){Ae(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:je(e)&&(t.setupState=Fp(e)),hg(t)}function hg(t,e,n){const r=t.type;t.render||(t.render=r.render||nn);{const s=Fi(t);ir();try{Jv(t)}finally{or(),s()}}}const Ny={get(t,e){return yt(t,"get",""),t[e]}};function Vy(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,Ny),slots:t.slots,emit:t.emit,expose:e}}function Ka(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Fp(iu(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Zs)return Zs[n](t)},has(e,n){return n in e||n in Zs}})):t.proxy}function Ly(t,e=!0){return Ae(t)?t.displayName||t.name:t.name||e&&t.__name}function My(t){return Ae(t)&&"__vccOpts"in t}const Lt=(t,e)=>Cv(t,e,gi);function fg(t,e,n){const r=arguments.length;return r===2?je(e)&&!ye(e)?xa(e)?ct(t,null,[e]):ct(t,e):ct(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&xa(n)&&(n=[n]),ct(t,e,n))}const Uy="3.5.13";/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ml;const _h=typeof window<"u"&&window.trustedTypes;if(_h)try{ml=_h.createPolicy("vue",{createHTML:t=>t})}catch{}const dg=ml?t=>ml.createHTML(t):t=>t,$y="http://www.w3.org/2000/svg",Hy="http://www.w3.org/1998/Math/MathML",vn=typeof document<"u"?document:null,xh=vn&&vn.createElement("template"),qy={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e==="svg"?vn.createElementNS($y,t):e==="mathml"?vn.createElementNS(Hy,t):n?vn.createElement(t,{is:n}):vn.createElement(t);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>vn.createTextNode(t),createComment:t=>vn.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>vn.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{xh.innerHTML=dg(r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t);const c=xh.content;if(r==="svg"||r==="mathml"){const l=c.firstChild;for(;l.firstChild;)c.appendChild(l.firstChild);c.removeChild(l)}e.insertBefore(c,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},jy=Symbol("_vtc");function zy(t,e,n){const r=t[jy];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const vh=Symbol("_vod"),Wy=Symbol("_vsh"),Ky=Symbol(""),Gy=/(^|;)\s*display\s*:/;function Qy(t,e,n){const r=t.style,s=ot(n);let i=!1;if(n&&!s){if(e)if(ot(e))for(const o of e.split(";")){const c=o.slice(0,o.indexOf(":")).trim();n[c]==null&&yo(r,c,"")}else for(const o in e)n[o]==null&&yo(r,o,"");for(const o in n)o==="display"&&(i=!0),yo(r,o,n[o])}else if(s){if(e!==n){const o=r[Ky];o&&(n+=";"+o),r.cssText=n,i=Gy.test(n)}}else e&&t.removeAttribute("style");vh in t&&(t[vh]=i?r.display:"",t[Wy]&&(r.display="none"))}const yh=/\s*!important$/;function yo(t,e,n){if(ye(n))n.forEach(r=>yo(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=Xy(t,e);yh.test(n)?t.setProperty(Pr(r),n.replace(yh,""),"important"):t[r]=n}}const Eh=["Webkit","Moz","ms"],Vc={};function Xy(t,e){const n=Vc[e];if(n)return n;let r=Ht(e);if(r!=="filter"&&r in t)return Vc[e]=r;r=$a(r);for(let s=0;s<Eh.length;s++){const i=Eh[s]+r;if(i in t)return Vc[e]=i}return e}const Ah="http://www.w3.org/1999/xlink";function wh(t,e,n,r,s,i=Jx(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(Ah,e.slice(6,e.length)):t.setAttributeNS(Ah,e,n):n==null||i&&!lp(n)?t.removeAttribute(e):t.setAttribute(e,i?"":sr(n)?String(n):n)}function Th(t,e,n,r,s){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?dg(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const c=i==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(c!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const c=typeof t[e];c==="boolean"?n=lp(n):n==null&&c==="string"?(n="",o=!0):c==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(s||e)}function Yr(t,e,n,r){t.addEventListener(e,n,r)}function Yy(t,e,n,r){t.removeEventListener(e,n,r)}const Ih=Symbol("_vei");function Jy(t,e,n,r,s=null){const i=t[Ih]||(t[Ih]={}),o=i[e];if(r&&o)o.value=r;else{const[c,l]=Zy(e);if(r){const u=i[e]=n1(r,s);Yr(t,c,u,l)}else o&&(Yy(t,c,o,l),i[e]=void 0)}}const Ch=/(?:Once|Passive|Capture)$/;function Zy(t){let e;if(Ch.test(t)){e={};let r;for(;r=t.match(Ch);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Pr(t.slice(2)),e]}let Lc=0;const e1=Promise.resolve(),t1=()=>Lc||(e1.then(()=>Lc=0),Lc=Date.now());function n1(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;ln(r1(r,n.value),e,5,[r])};return n.value=t,n.attached=t1(),n}function r1(t,e){if(ye(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const bh=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,s1=(t,e,n,r,s,i)=>{const o=s==="svg";e==="class"?zy(t,r,o):e==="style"?Qy(t,n,r):La(e)?Wl(e)||Jy(t,e,n,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):i1(t,e,r,o))?(Th(t,e,r),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&wh(t,e,r,o,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!ot(r))?Th(t,Ht(e),r,i,e):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),wh(t,e,r,o))};function i1(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&bh(e)&&Ae(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=t.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return bh(e)&&ot(n)?!1:e in t}const Rh=t=>{const e=t.props["onUpdate:modelValue"]||!1;return ye(e)?n=>mo(e,n):e};function o1(t){t.target.composing=!0}function Sh(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Mc=Symbol("_assign"),a1={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t[Mc]=Rh(s);const i=r||s.props&&s.props.type==="number";Yr(t,e?"change":"input",o=>{if(o.target.composing)return;let c=t.value;n&&(c=c.trim()),i&&(c=ol(c)),t[Mc](c)}),n&&Yr(t,"change",()=>{t.value=t.value.trim()}),e||(Yr(t,"compositionstart",o1),Yr(t,"compositionend",Sh),Yr(t,"change",Sh))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},o){if(t[Mc]=Rh(o),t.composing)return;const c=(i||t.type==="number")&&!/^0\d/.test(t.value)?ol(t.value):t.value,l=e??"";c!==l&&(document.activeElement===t&&t.type!=="range"&&(r&&e===n||s&&t.value.trim()===l)||(t.value=l))}},c1=At({patchProp:s1},qy);let Dh;function l1(){return Dh||(Dh=fy(c1))}const u1=(...t)=>{const e=l1().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=f1(r);if(!s)return;const i=e._component;!Ae(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=n(s,!1,h1(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function h1(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function f1(t){return ot(t)?document.querySelector(t):t}const Fr=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},d1={setup(t,{emit:e}){return{}}};function p1(t,e,n,r,s,i){const o=cs("router-view");return Kt(),cg(o)}const g1=Fr(d1,[["render",p1]]);/*!
  * vue-router v4.5.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */const Jr=typeof document<"u";function pg(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function m1(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&pg(t.default)}const Ve=Object.assign;function Uc(t,e){const n={};for(const r in e){const s=e[r];n[r]=Gt(s)?s.map(t):t(s)}return n}const ni=()=>{},Gt=Array.isArray,gg=/#/g,_1=/&/g,x1=/\//g,v1=/=/g,y1=/\?/g,mg=/\+/g,E1=/%5B/g,A1=/%5D/g,_g=/%5E/g,w1=/%60/g,xg=/%7B/g,T1=/%7C/g,vg=/%7D/g,I1=/%20/g;function fu(t){return encodeURI(""+t).replace(T1,"|").replace(E1,"[").replace(A1,"]")}function C1(t){return fu(t).replace(xg,"{").replace(vg,"}").replace(_g,"^")}function _l(t){return fu(t).replace(mg,"%2B").replace(I1,"+").replace(gg,"%23").replace(_1,"%26").replace(w1,"`").replace(xg,"{").replace(vg,"}").replace(_g,"^")}function b1(t){return _l(t).replace(v1,"%3D")}function R1(t){return fu(t).replace(gg,"%23").replace(y1,"%3F")}function S1(t){return t==null?"":R1(t).replace(x1,"%2F")}function mi(t){try{return decodeURIComponent(""+t)}catch{}return""+t}const D1=/\/$/,P1=t=>t.replace(D1,"");function $c(t,e,n="/"){let r,s={},i="",o="";const c=e.indexOf("#");let l=e.indexOf("?");return c<l&&c>=0&&(l=-1),l>-1&&(r=e.slice(0,l),i=e.slice(l+1,c>-1?c:e.length),s=t(i)),c>-1&&(r=r||e.slice(0,c),o=e.slice(c,e.length)),r=O1(r??e,n),{fullPath:r+(i&&"?")+i+o,path:r,query:s,hash:mi(o)}}function F1(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function Ph(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function k1(t,e,n){const r=e.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&ps(e.matched[r],n.matched[s])&&yg(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function ps(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function yg(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!B1(t[n],e[n]))return!1;return!0}function B1(t,e){return Gt(t)?Fh(t,e):Gt(e)?Fh(e,t):t===e}function Fh(t,e){return Gt(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function O1(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,c;for(o=0;o<r.length;o++)if(c=r[o],c!==".")if(c==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o).join("/")}const Ln={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var _i;(function(t){t.pop="pop",t.push="push"})(_i||(_i={}));var ri;(function(t){t.back="back",t.forward="forward",t.unknown=""})(ri||(ri={}));function N1(t){if(!t)if(Jr){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),P1(t)}const V1=/^[^#]+#/;function L1(t,e){return t.replace(V1,"#")+e}function M1(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const Ga=()=>({left:window.scrollX,top:window.scrollY});function U1(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;e=M1(s,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function kh(t,e){return(history.state?history.state.position-e:-1)+t}const xl=new Map;function $1(t,e){xl.set(t,e)}function H1(t){const e=xl.get(t);return xl.delete(t),e}let q1=()=>location.protocol+"//"+location.host;function Eg(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){let c=s.includes(t.slice(i))?t.slice(i).length:1,l=s.slice(c);return l[0]!=="/"&&(l="/"+l),Ph(l,"")}return Ph(n,t)+r+s}function j1(t,e,n,r){let s=[],i=[],o=null;const c=({state:p})=>{const m=Eg(t,location),v=n.value,R=e.value;let T=0;if(p){if(n.value=m,e.value=p,o&&o===v){o=null;return}T=R?p.position-R.position:0}else r(m);s.forEach(k=>{k(n.value,v,{delta:T,type:_i.pop,direction:T?T>0?ri.forward:ri.back:ri.unknown})})};function l(){o=n.value}function u(p){s.push(p);const m=()=>{const v=s.indexOf(p);v>-1&&s.splice(v,1)};return i.push(m),m}function h(){const{history:p}=window;p.state&&p.replaceState(Ve({},p.state,{scroll:Ga()}),"")}function d(){for(const p of i)p();i=[],window.removeEventListener("popstate",c),window.removeEventListener("beforeunload",h)}return window.addEventListener("popstate",c),window.addEventListener("beforeunload",h,{passive:!0}),{pauseListeners:l,listen:u,destroy:d}}function Bh(t,e,n,r=!1,s=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:s?Ga():null}}function z1(t){const{history:e,location:n}=window,r={value:Eg(t,n)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(l,u,h){const d=t.indexOf("#"),p=d>-1?(n.host&&document.querySelector("base")?t:t.slice(d))+l:q1()+t+l;try{e[h?"replaceState":"pushState"](u,"",p),s.value=u}catch(m){console.error(m),n[h?"replace":"assign"](p)}}function o(l,u){const h=Ve({},e.state,Bh(s.value.back,l,s.value.forward,!0),u,{position:s.value.position});i(l,h,!0),r.value=l}function c(l,u){const h=Ve({},s.value,e.state,{forward:l,scroll:Ga()});i(h.current,h,!0);const d=Ve({},Bh(r.value,l,null),{position:h.position+1},u);i(l,d,!1),r.value=l}return{location:r,state:s,push:c,replace:o}}function W1(t){t=N1(t);const e=z1(t),n=j1(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=Ve({location:"",base:t,go:r,createHref:L1.bind(null,t)},e,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}function K1(t){return typeof t=="string"||t&&typeof t=="object"}function Ag(t){return typeof t=="string"||typeof t=="symbol"}const wg=Symbol("");var Oh;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(Oh||(Oh={}));function gs(t,e){return Ve(new Error,{type:t,[wg]:!0},e)}function xn(t,e){return t instanceof Error&&wg in t&&(e==null||!!(t.type&e))}const Nh="[^/]+?",G1={sensitive:!1,strict:!1,start:!0,end:!0},Q1=/[.+*?^${}()[\]/\\]/g;function X1(t,e){const n=Ve({},G1,e),r=[];let s=n.start?"^":"";const i=[];for(const u of t){const h=u.length?[]:[90];n.strict&&!u.length&&(s+="/");for(let d=0;d<u.length;d++){const p=u[d];let m=40+(n.sensitive?.25:0);if(p.type===0)d||(s+="/"),s+=p.value.replace(Q1,"\\$&"),m+=40;else if(p.type===1){const{value:v,repeatable:R,optional:T,regexp:k}=p;i.push({name:v,repeatable:R,optional:T});const I=k||Nh;if(I!==Nh){m+=10;try{new RegExp(`(${I})`)}catch(S){throw new Error(`Invalid custom RegExp for param "${v}" (${I}): `+S.message)}}let b=R?`((?:${I})(?:/(?:${I}))*)`:`(${I})`;d||(b=T&&u.length<2?`(?:/${b})`:"/"+b),T&&(b+="?"),s+=b,m+=20,T&&(m+=-8),R&&(m+=-20),I===".*"&&(m+=-50)}h.push(m)}r.push(h)}if(n.strict&&n.end){const u=r.length-1;r[u][r[u].length-1]+=.7000000000000001}n.strict||(s+="/?"),n.end?s+="$":n.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function c(u){const h=u.match(o),d={};if(!h)return null;for(let p=1;p<h.length;p++){const m=h[p]||"",v=i[p-1];d[v.name]=m&&v.repeatable?m.split("/"):m}return d}function l(u){let h="",d=!1;for(const p of t){(!d||!h.endsWith("/"))&&(h+="/"),d=!1;for(const m of p)if(m.type===0)h+=m.value;else if(m.type===1){const{value:v,repeatable:R,optional:T}=m,k=v in u?u[v]:"";if(Gt(k)&&!R)throw new Error(`Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`);const I=Gt(k)?k.join("/"):k;if(!I)if(T)p.length<2&&(h.endsWith("/")?h=h.slice(0,-1):d=!0);else throw new Error(`Missing required param "${v}"`);h+=I}}return h||"/"}return{re:o,score:r,keys:i,parse:c,stringify:l}}function Y1(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===80?-1:1:t.length>e.length?e.length===1&&e[0]===80?1:-1:0}function Tg(t,e){let n=0;const r=t.score,s=e.score;for(;n<r.length&&n<s.length;){const i=Y1(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(Vh(r))return 1;if(Vh(s))return-1}return s.length-r.length}function Vh(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const J1={type:0,value:""},Z1=/[a-zA-Z0-9_]/;function eE(t){if(!t)return[[]];if(t==="/")return[[J1]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(m){throw new Error(`ERR (${n})/"${u}": ${m}`)}let n=0,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let c=0,l,u="",h="";function d(){u&&(n===0?i.push({type:0,value:u}):n===1||n===2||n===3?(i.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:u,regexp:h,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),u="")}function p(){u+=l}for(;c<t.length;){if(l=t[c++],l==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:l==="/"?(u&&d(),o()):l===":"?(d(),n=1):p();break;case 4:p(),n=r;break;case 1:l==="("?n=2:Z1.test(l)?p():(d(),n=0,l!=="*"&&l!=="?"&&l!=="+"&&c--);break;case 2:l===")"?h[h.length-1]=="\\"?h=h.slice(0,-1)+l:n=3:h+=l;break;case 3:d(),n=0,l!=="*"&&l!=="?"&&l!=="+"&&c--,h="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${u}"`),d(),o(),s}function tE(t,e,n){const r=X1(eE(t.path),n),s=Ve(r,{record:t,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function nE(t,e){const n=[],r=new Map;e=$h({strict:!1,end:!0,sensitive:!1},e);function s(d){return r.get(d)}function i(d,p,m){const v=!m,R=Mh(d);R.aliasOf=m&&m.record;const T=$h(e,d),k=[R];if("alias"in d){const S=typeof d.alias=="string"?[d.alias]:d.alias;for(const B of S)k.push(Mh(Ve({},R,{components:m?m.record.components:R.components,path:B,aliasOf:m?m.record:R})))}let I,b;for(const S of k){const{path:B}=S;if(p&&B[0]!=="/"){const O=p.record.path,y=O[O.length-1]==="/"?"":"/";S.path=p.record.path+(B&&y+B)}if(I=tE(S,p,T),m?m.alias.push(I):(b=b||I,b!==I&&b.alias.push(I),v&&d.name&&!Uh(I)&&o(d.name)),Ig(I)&&l(I),R.children){const O=R.children;for(let y=0;y<O.length;y++)i(O[y],I,m&&m.children[y])}m=m||I}return b?()=>{o(b)}:ni}function o(d){if(Ag(d)){const p=r.get(d);p&&(r.delete(d),n.splice(n.indexOf(p),1),p.children.forEach(o),p.alias.forEach(o))}else{const p=n.indexOf(d);p>-1&&(n.splice(p,1),d.record.name&&r.delete(d.record.name),d.children.forEach(o),d.alias.forEach(o))}}function c(){return n}function l(d){const p=iE(d,n);n.splice(p,0,d),d.record.name&&!Uh(d)&&r.set(d.record.name,d)}function u(d,p){let m,v={},R,T;if("name"in d&&d.name){if(m=r.get(d.name),!m)throw gs(1,{location:d});T=m.record.name,v=Ve(Lh(p.params,m.keys.filter(b=>!b.optional).concat(m.parent?m.parent.keys.filter(b=>b.optional):[]).map(b=>b.name)),d.params&&Lh(d.params,m.keys.map(b=>b.name))),R=m.stringify(v)}else if(d.path!=null)R=d.path,m=n.find(b=>b.re.test(R)),m&&(v=m.parse(R),T=m.record.name);else{if(m=p.name?r.get(p.name):n.find(b=>b.re.test(p.path)),!m)throw gs(1,{location:d,currentLocation:p});T=m.record.name,v=Ve({},p.params,d.params),R=m.stringify(v)}const k=[];let I=m;for(;I;)k.unshift(I.record),I=I.parent;return{name:T,path:R,params:v,matched:k,meta:sE(k)}}t.forEach(d=>i(d));function h(){n.length=0,r.clear()}return{addRoute:i,resolve:u,removeRoute:o,clearRoutes:h,getRoutes:c,getRecordMatcher:s}}function Lh(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function Mh(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:rE(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function rE(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function Uh(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function sE(t){return t.reduce((e,n)=>Ve(e,n.meta),{})}function $h(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}function iE(t,e){let n=0,r=e.length;for(;n!==r;){const i=n+r>>1;Tg(t,e[i])<0?r=i:n=i+1}const s=oE(t);return s&&(r=e.lastIndexOf(s,r-1)),r}function oE(t){let e=t;for(;e=e.parent;)if(Ig(e)&&Tg(t,e)===0)return e}function Ig({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function aE(t){const e={};if(t===""||t==="?")return e;const r=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<r.length;++s){const i=r[s].replace(mg," "),o=i.indexOf("="),c=mi(o<0?i:i.slice(0,o)),l=o<0?null:mi(i.slice(o+1));if(c in e){let u=e[c];Gt(u)||(u=e[c]=[u]),u.push(l)}else e[c]=l}return e}function Hh(t){let e="";for(let n in t){const r=t[n];if(n=b1(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(Gt(r)?r.map(i=>i&&_l(i)):[r&&_l(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function cE(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=Gt(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const lE=Symbol(""),qh=Symbol(""),du=Symbol(""),Cg=Symbol(""),vl=Symbol("");function js(){let t=[];function e(r){return t.push(r),()=>{const s=t.indexOf(r);s>-1&&t.splice(s,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function qn(t,e,n,r,s,i=o=>o()){const o=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((c,l)=>{const u=p=>{p===!1?l(gs(4,{from:n,to:e})):p instanceof Error?l(p):K1(p)?l(gs(2,{from:e,to:p})):(o&&r.enterCallbacks[s]===o&&typeof p=="function"&&o.push(p),c())},h=i(()=>t.call(r&&r.instances[s],e,n,u));let d=Promise.resolve(h);t.length<3&&(d=d.then(u)),d.catch(p=>l(p))})}function Hc(t,e,n,r,s=i=>i()){const i=[];for(const o of t)for(const c in o.components){let l=o.components[c];if(!(e!=="beforeRouteEnter"&&!o.instances[c]))if(pg(l)){const h=(l.__vccOpts||l)[e];h&&i.push(qn(h,n,r,o,c,s))}else{let u=l();i.push(()=>u.then(h=>{if(!h)throw new Error(`Couldn't resolve component "${c}" at "${o.path}"`);const d=m1(h)?h.default:h;o.mods[c]=h,o.components[c]=d;const m=(d.__vccOpts||d)[e];return m&&qn(m,n,r,o,c,s)()}))}}return i}function jh(t){const e=rn(du),n=rn(Cg),r=Lt(()=>{const l=os(t.to);return e.resolve(l)}),s=Lt(()=>{const{matched:l}=r.value,{length:u}=l,h=l[u-1],d=n.matched;if(!h||!d.length)return-1;const p=d.findIndex(ps.bind(null,h));if(p>-1)return p;const m=zh(l[u-2]);return u>1&&zh(h)===m&&d[d.length-1].path!==m?d.findIndex(ps.bind(null,l[u-2])):p}),i=Lt(()=>s.value>-1&&pE(n.params,r.value.params)),o=Lt(()=>s.value>-1&&s.value===n.matched.length-1&&yg(n.params,r.value.params));function c(l={}){if(dE(l)){const u=e[os(t.replace)?"replace":"push"](os(t.to)).catch(ni);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:r,href:Lt(()=>r.value.href),isActive:i,isExactActive:o,navigate:c}}function uE(t){return t.length===1?t[0]:t}const hE=Lp({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:jh,setup(t,{slots:e}){const n=Di(jh(t)),{options:r}=rn(du),s=Lt(()=>({[Wh(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Wh(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&uE(e.default(n));return t.custom?i:fg("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),fE=hE;function dE(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function pE(t,e){for(const n in e){const r=e[n],s=t[n];if(typeof r=="string"){if(r!==s)return!1}else if(!Gt(s)||s.length!==r.length||r.some((i,o)=>i!==s[o]))return!1}return!0}function zh(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const Wh=(t,e,n)=>t??e??n,gE=Lp({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=rn(vl),s=Lt(()=>t.route||r.value),i=rn(qh,0),o=Lt(()=>{let u=os(i);const{matched:h}=s.value;let d;for(;(d=h[u])&&!d.components;)u++;return u}),c=Lt(()=>s.value.matched[o.value]);_o(qh,Lt(()=>o.value+1)),_o(lE,c),_o(vl,s);const l=ou();return ei(()=>[l.value,c.value,t.name],([u,h,d],[p,m,v])=>{h&&(h.instances[d]=u,m&&m!==h&&u&&u===p&&(h.leaveGuards.size||(h.leaveGuards=m.leaveGuards),h.updateGuards.size||(h.updateGuards=m.updateGuards))),u&&h&&(!m||!ps(h,m)||!p)&&(h.enterCallbacks[d]||[]).forEach(R=>R(u))},{flush:"post"}),()=>{const u=s.value,h=t.name,d=c.value,p=d&&d.components[h];if(!p)return Kh(n.default,{Component:p,route:u});const m=d.props[h],v=m?m===!0?u.params:typeof m=="function"?m(u):m:null,T=fg(p,Ve({},v,e,{onVnodeUnmounted:k=>{k.component.isUnmounted&&(d.instances[h]=null)},ref:l}));return Kh(n.default,{Component:T,route:u})||T}}});function Kh(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const mE=gE;function _E(t){const e=nE(t.routes,t),n=t.parseQuery||aE,r=t.stringifyQuery||Hh,s=t.history,i=js(),o=js(),c=js(),l=vv(Ln);let u=Ln;Jr&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const h=Uc.bind(null,M=>""+M),d=Uc.bind(null,S1),p=Uc.bind(null,mi);function m(M,G){let ne,ie;return Ag(M)?(ne=e.getRecordMatcher(M),ie=G):ie=M,e.addRoute(ie,ne)}function v(M){const G=e.getRecordMatcher(M);G&&e.removeRoute(G)}function R(){return e.getRoutes().map(M=>M.record)}function T(M){return!!e.getRecordMatcher(M)}function k(M,G){if(G=Ve({},G||l.value),typeof M=="string"){const N=$c(n,M,G.path),$=e.resolve({path:N.path},G),z=s.createHref(N.fullPath);return Ve(N,$,{params:p($.params),hash:mi(N.hash),redirectedFrom:void 0,href:z})}let ne;if(M.path!=null)ne=Ve({},M,{path:$c(n,M.path,G.path).path});else{const N=Ve({},M.params);for(const $ in N)N[$]==null&&delete N[$];ne=Ve({},M,{params:d(N)}),G.params=d(G.params)}const ie=e.resolve(ne,G),be=M.hash||"";ie.params=h(p(ie.params));const P=F1(r,Ve({},M,{hash:C1(be),path:ie.path})),F=s.createHref(P);return Ve({fullPath:P,hash:be,query:r===Hh?cE(M.query):M.query||{}},ie,{redirectedFrom:void 0,href:F})}function I(M){return typeof M=="string"?$c(n,M,l.value.path):Ve({},M)}function b(M,G){if(u!==M)return gs(8,{from:G,to:M})}function S(M){return y(M)}function B(M){return S(Ve(I(M),{replace:!0}))}function O(M){const G=M.matched[M.matched.length-1];if(G&&G.redirect){const{redirect:ne}=G;let ie=typeof ne=="function"?ne(M):ne;return typeof ie=="string"&&(ie=ie.includes("?")||ie.includes("#")?ie=I(ie):{path:ie},ie.params={}),Ve({query:M.query,hash:M.hash,params:ie.path!=null?{}:M.params},ie)}}function y(M,G){const ne=u=k(M),ie=l.value,be=M.state,P=M.force,F=M.replace===!0,N=O(ne);if(N)return y(Ve(I(N),{state:typeof N=="object"?Ve({},be,N.state):be,force:P,replace:F}),G||ne);const $=ne;$.redirectedFrom=G;let z;return!P&&k1(r,ie,ne)&&(z=gs(16,{to:$,from:ie}),U(ie,ie,!0,!1)),(z?Promise.resolve(z):x($,ie)).catch(j=>xn(j)?xn(j,2)?j:Ce(j):ce(j,$,ie)).then(j=>{if(j){if(xn(j,2))return y(Ve({replace:F},I(j.to),{state:typeof j.to=="object"?Ve({},be,j.to.state):be,force:P}),G||$)}else j=D($,ie,!0,F,be);return w($,ie,j),j})}function _(M,G){const ne=b(M,G);return ne?Promise.reject(ne):Promise.resolve()}function E(M){const G=K.values().next().value;return G&&typeof G.runWithContext=="function"?G.runWithContext(M):M()}function x(M,G){let ne;const[ie,be,P]=xE(M,G);ne=Hc(ie.reverse(),"beforeRouteLeave",M,G);for(const N of ie)N.leaveGuards.forEach($=>{ne.push(qn($,M,G))});const F=_.bind(null,M,G);return ne.push(F),Te(ne).then(()=>{ne=[];for(const N of i.list())ne.push(qn(N,M,G));return ne.push(F),Te(ne)}).then(()=>{ne=Hc(be,"beforeRouteUpdate",M,G);for(const N of be)N.updateGuards.forEach($=>{ne.push(qn($,M,G))});return ne.push(F),Te(ne)}).then(()=>{ne=[];for(const N of P)if(N.beforeEnter)if(Gt(N.beforeEnter))for(const $ of N.beforeEnter)ne.push(qn($,M,G));else ne.push(qn(N.beforeEnter,M,G));return ne.push(F),Te(ne)}).then(()=>(M.matched.forEach(N=>N.enterCallbacks={}),ne=Hc(P,"beforeRouteEnter",M,G,E),ne.push(F),Te(ne))).then(()=>{ne=[];for(const N of o.list())ne.push(qn(N,M,G));return ne.push(F),Te(ne)}).catch(N=>xn(N,8)?N:Promise.reject(N))}function w(M,G,ne){c.list().forEach(ie=>E(()=>ie(M,G,ne)))}function D(M,G,ne,ie,be){const P=b(M,G);if(P)return P;const F=G===Ln,N=Jr?history.state:{};ne&&(ie||F?s.replace(M.fullPath,Ve({scroll:F&&N&&N.scroll},be)):s.push(M.fullPath,be)),l.value=M,U(M,G,ne,F),Ce()}let A;function re(){A||(A=s.listen((M,G,ne)=>{if(!Pe.listening)return;const ie=k(M),be=O(ie);if(be){y(Ve(be,{replace:!0,force:!0}),ie).catch(ni);return}u=ie;const P=l.value;Jr&&$1(kh(P.fullPath,ne.delta),Ga()),x(ie,P).catch(F=>xn(F,12)?F:xn(F,2)?(y(Ve(I(F.to),{force:!0}),ie).then(N=>{xn(N,20)&&!ne.delta&&ne.type===_i.pop&&s.go(-1,!1)}).catch(ni),Promise.reject()):(ne.delta&&s.go(-ne.delta,!1),ce(F,ie,P))).then(F=>{F=F||D(ie,P,!1),F&&(ne.delta&&!xn(F,8)?s.go(-ne.delta,!1):ne.type===_i.pop&&xn(F,20)&&s.go(-1,!1)),w(ie,P,F)}).catch(ni)}))}let le=js(),ae=js(),se;function ce(M,G,ne){Ce(M);const ie=ae.list();return ie.length?ie.forEach(be=>be(M,G,ne)):console.error(M),Promise.reject(M)}function Ie(){return se&&l.value!==Ln?Promise.resolve():new Promise((M,G)=>{le.add([M,G])})}function Ce(M){return se||(se=!M,re(),le.list().forEach(([G,ne])=>M?ne(M):G()),le.reset()),M}function U(M,G,ne,ie){const{scrollBehavior:be}=t;if(!Jr||!be)return Promise.resolve();const P=!ne&&H1(kh(M.fullPath,0))||(ie||!ne)&&history.state&&history.state.scroll||null;return au().then(()=>be(M,G,P)).then(F=>F&&U1(F)).catch(F=>ce(F,M,G))}const H=M=>s.go(M);let q;const K=new Set,Pe={currentRoute:l,listening:!0,addRoute:m,removeRoute:v,clearRoutes:e.clearRoutes,hasRoute:T,getRoutes:R,resolve:k,options:t,push:S,replace:B,go:H,back:()=>H(-1),forward:()=>H(1),beforeEach:i.add,beforeResolve:o.add,afterEach:c.add,onError:ae.add,isReady:Ie,install(M){const G=this;M.component("RouterLink",fE),M.component("RouterView",mE),M.config.globalProperties.$router=G,Object.defineProperty(M.config.globalProperties,"$route",{enumerable:!0,get:()=>os(l)}),Jr&&!q&&l.value===Ln&&(q=!0,S(s.location).catch(be=>{}));const ne={};for(const be in Ln)Object.defineProperty(ne,be,{get:()=>l.value[be],enumerable:!0});M.provide(du,G),M.provide(Cg,Sp(ne)),M.provide(vl,l);const ie=M.unmount;K.add(M),M.unmount=function(){K.delete(M),K.size<1&&(u=Ln,A&&A(),A=null,l.value=Ln,q=!1,se=!1),ie()}}};function Te(M){return M.reduce((G,ne)=>G.then(()=>E(ne)),Promise.resolve())}return Pe}function xE(t,e){const n=[],r=[],s=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const c=e.matched[o];c&&(t.matched.find(u=>ps(u,c))?r.push(c):n.push(c));const l=t.matched[o];l&&(e.matched.find(u=>ps(u,l))||s.push(l))}return[n,r,s]}var Gh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bg=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},vE=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],c=t[n++],l=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Rg={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,c=o?t[s+1]:0,l=s+2<t.length,u=l?t[s+2]:0,h=i>>2,d=(i&3)<<4|c>>4;let p=(c&15)<<2|u>>6,m=u&63;l||(m=64,o||(p=64)),r.push(n[h],n[d],n[p],n[m])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(bg(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):vE(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],c=s<t.length?n[t.charAt(s)]:0;++s;const u=s<t.length?n[t.charAt(s)]:64;++s;const d=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||c==null||u==null||d==null)throw new yE;const p=i<<2|c>>4;if(r.push(p),u!==64){const m=c<<4&240|u>>2;if(r.push(m),d!==64){const v=u<<6&192|d;r.push(v)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class yE extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const EE=function(t){const e=bg(t);return Rg.encodeByteArray(e,!0)},ya=function(t){return EE(t).replace(/\./g,"")},Sg=function(t){try{return Rg.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AE(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wE=()=>AE().__FIREBASE_DEFAULTS__,TE=()=>{if(typeof process>"u"||typeof Gh>"u")return;const t=Gh.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},IE=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Sg(t[1]);return e&&JSON.parse(e)},Qa=()=>{try{return wE()||TE()||IE()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Dg=t=>{var e,n;return(n=(e=Qa())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},CE=t=>{const e=Dg(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Pg=()=>{var t;return(t=Qa())===null||t===void 0?void 0:t.config},Fg=t=>{var e;return(e=Qa())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bE{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RE(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[ya(JSON.stringify(n)),ya(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function SE(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(wt())}function DE(){var t;const e=(t=Qa())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function PE(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function kg(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function FE(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function kE(){const t=wt();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function BE(){return!DE()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Bg(){try{return typeof indexedDB=="object"}catch{return!1}}function Og(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function OE(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NE="FirebaseError";class Xt extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=NE,Object.setPrototypeOf(this,Xt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,kr.prototype.create)}}class kr{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?VE(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Xt(s,c,r)}}function VE(t,e){return t.replace(LE,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const LE=/\{\$([^}]+)}/g;function ME(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function xi(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(Qh(i)&&Qh(o)){if(!xi(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Qh(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ki(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function UE(t,e){const n=new $E(t,e);return n.subscribe.bind(n)}class $E{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");HE(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=qc),s.error===void 0&&(s.error=qc),s.complete===void 0&&(s.complete=qc);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function HE(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function qc(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qE=1e3,jE=2,zE=4*60*60*1e3,WE=.5;function Xh(t,e=qE,n=jE){const r=e*Math.pow(n,t),s=Math.round(WE*r*(Math.random()-.5)*2);return Math.min(zE,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kt(t){return t&&t._delegate?t._delegate:t}class Qt{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _r="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KE{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new bE;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(QE(e))try{this.getOrInitializeService({instanceIdentifier:_r})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=_r){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=_r){return this.instances.has(e)}getOptions(e=_r){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:GE(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=_r){return this.component?this.component.multipleInstances?e:_r:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function GE(t){return t===_r?void 0:t}function QE(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new KE(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Se;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(Se||(Se={}));const YE={debug:Se.DEBUG,verbose:Se.VERBOSE,info:Se.INFO,warn:Se.WARN,error:Se.ERROR,silent:Se.SILENT},JE=Se.INFO,ZE={[Se.DEBUG]:"log",[Se.VERBOSE]:"log",[Se.INFO]:"info",[Se.WARN]:"warn",[Se.ERROR]:"error"},eA=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=ZE[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Xa{constructor(e){this.name=e,this._logLevel=JE,this._logHandler=eA,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Se))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?YE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Se.DEBUG,...e),this._logHandler(this,Se.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Se.VERBOSE,...e),this._logHandler(this,Se.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Se.INFO,...e),this._logHandler(this,Se.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Se.WARN,...e),this._logHandler(this,Se.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Se.ERROR,...e),this._logHandler(this,Se.ERROR,...e)}}const tA=(t,e)=>e.some(n=>t instanceof n);let Yh,Jh;function nA(){return Yh||(Yh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function rA(){return Jh||(Jh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ng=new WeakMap,yl=new WeakMap,Vg=new WeakMap,jc=new WeakMap,pu=new WeakMap;function sA(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Qn(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Ng.set(n,t)}).catch(()=>{}),pu.set(e,t),e}function iA(t){if(yl.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});yl.set(t,e)}let El={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return yl.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Vg.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Qn(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function oA(t){El=t(El)}function aA(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(zc(this),e,...n);return Vg.set(r,e.sort?e.sort():[e]),Qn(r)}:rA().includes(t)?function(...e){return t.apply(zc(this),e),Qn(Ng.get(this))}:function(...e){return Qn(t.apply(zc(this),e))}}function cA(t){return typeof t=="function"?aA(t):(t instanceof IDBTransaction&&iA(t),tA(t,nA())?new Proxy(t,El):t)}function Qn(t){if(t instanceof IDBRequest)return sA(t);if(jc.has(t))return jc.get(t);const e=cA(t);return e!==t&&(jc.set(t,e),pu.set(e,t)),e}const zc=t=>pu.get(t);function Lg(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),c=Qn(o);return r&&o.addEventListener("upgradeneeded",l=>{r(Qn(o.result),l.oldVersion,l.newVersion,Qn(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),c}const lA=["get","getKey","getAll","getAllKeys","count"],uA=["put","add","delete","clear"],Wc=new Map;function Zh(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Wc.get(e))return Wc.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=uA.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||lA.includes(n)))return;const i=async function(o,...c){const l=this.transaction(o,s?"readwrite":"readonly");let u=l.store;return r&&(u=u.index(c.shift())),(await Promise.all([u[n](...c),s&&l.done]))[0]};return Wc.set(e,i),i}oA(t=>({...t,get:(e,n,r)=>Zh(e,n)||t.get(e,n,r),has:(e,n)=>!!Zh(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hA{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(fA(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function fA(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Al="@firebase/app",ef="0.10.17";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sn=new Xa("@firebase/app"),dA="@firebase/app-compat",pA="@firebase/analytics-compat",gA="@firebase/analytics",mA="@firebase/app-check-compat",_A="@firebase/app-check",xA="@firebase/auth",vA="@firebase/auth-compat",yA="@firebase/database",EA="@firebase/data-connect",AA="@firebase/database-compat",wA="@firebase/functions",TA="@firebase/functions-compat",IA="@firebase/installations",CA="@firebase/installations-compat",bA="@firebase/messaging",RA="@firebase/messaging-compat",SA="@firebase/performance",DA="@firebase/performance-compat",PA="@firebase/remote-config",FA="@firebase/remote-config-compat",kA="@firebase/storage",BA="@firebase/storage-compat",OA="@firebase/firestore",NA="@firebase/vertexai",VA="@firebase/firestore-compat",LA="firebase",MA="11.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wl="[DEFAULT]",UA={[Al]:"fire-core",[dA]:"fire-core-compat",[gA]:"fire-analytics",[pA]:"fire-analytics-compat",[_A]:"fire-app-check",[mA]:"fire-app-check-compat",[xA]:"fire-auth",[vA]:"fire-auth-compat",[yA]:"fire-rtdb",[EA]:"fire-data-connect",[AA]:"fire-rtdb-compat",[wA]:"fire-fn",[TA]:"fire-fn-compat",[IA]:"fire-iid",[CA]:"fire-iid-compat",[bA]:"fire-fcm",[RA]:"fire-fcm-compat",[SA]:"fire-perf",[DA]:"fire-perf-compat",[PA]:"fire-rc",[FA]:"fire-rc-compat",[kA]:"fire-gcs",[BA]:"fire-gcs-compat",[OA]:"fire-fst",[VA]:"fire-fst-compat",[NA]:"fire-vertex","fire-js":"fire-js",[LA]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea=new Map,$A=new Map,Tl=new Map;function tf(t,e){try{t.container.addComponent(e)}catch(n){Sn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function un(t){const e=t.name;if(Tl.has(e))return Sn.debug(`There were multiple attempts to register component ${e}.`),!1;Tl.set(e,t);for(const n of Ea.values())tf(n,t);for(const n of $A.values())tf(n,t);return!0}function Br(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function wn(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HA={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Xn=new kr("app","Firebase",HA);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qA{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Qt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Xn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ts=MA;function Mg(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:wl,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Xn.create("bad-app-name",{appName:String(s)});if(n||(n=Pg()),!n)throw Xn.create("no-options");const i=Ea.get(s);if(i){if(xi(n,i.options)&&xi(r,i.config))return i;throw Xn.create("duplicate-app",{appName:s})}const o=new XE(s);for(const l of Tl.values())o.addComponent(l);const c=new qA(n,r,o);return Ea.set(s,c),c}function gu(t=wl){const e=Ea.get(t);if(!e&&t===wl&&Pg())return Mg();if(!e)throw Xn.create("no-app",{appName:t});return e}function Ut(t,e,n){var r;let s=(r=UA[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Sn.warn(c.join(" "));return}un(new Qt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jA="firebase-heartbeat-database",zA=1,vi="firebase-heartbeat-store";let Kc=null;function Ug(){return Kc||(Kc=Lg(jA,zA,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(vi)}catch(n){console.warn(n)}}}}).catch(t=>{throw Xn.create("idb-open",{originalErrorMessage:t.message})})),Kc}async function WA(t){try{const n=(await Ug()).transaction(vi),r=await n.objectStore(vi).get($g(t));return await n.done,r}catch(e){if(e instanceof Xt)Sn.warn(e.message);else{const n=Xn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Sn.warn(n.message)}}}async function nf(t,e){try{const r=(await Ug()).transaction(vi,"readwrite");await r.objectStore(vi).put(e,$g(t)),await r.done}catch(n){if(n instanceof Xt)Sn.warn(n.message);else{const r=Xn.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Sn.warn(r.message)}}}function $g(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KA=1024,GA=30*24*60*60*1e3;class QA{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new YA(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=rf();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const c=new Date(o.date).valueOf();return Date.now()-c<=GA}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Sn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=rf(),{heartbeatsToSend:r,unsentEntries:s}=XA(this._heartbeatsCache.heartbeats),i=ya(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return Sn.warn(n),""}}}function rf(){return new Date().toISOString().substring(0,10)}function XA(t,e=KA){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),sf(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),sf(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class YA{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Bg()?Og().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await WA(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return nf(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return nf(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function sf(t){return ya(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JA(t){un(new Qt("platform-logger",e=>new hA(e),"PRIVATE")),un(new Qt("heartbeat",e=>new QA(e),"PRIVATE")),Ut(Al,ef,t),Ut(Al,ef,"esm2017"),Ut("fire-js","")}JA("");function mu(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function Hg(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ZA=Hg,qg=new kr("auth","Firebase",Hg());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Aa=new Xa("@firebase/auth");function ew(t,...e){Aa.logLevel<=Se.WARN&&Aa.warn(`Auth (${Ts}): ${t}`,...e)}function Eo(t,...e){Aa.logLevel<=Se.ERROR&&Aa.error(`Auth (${Ts}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hn(t,...e){throw xu(t,...e)}function sn(t,...e){return xu(t,...e)}function _u(t,e,n){const r=Object.assign(Object.assign({},ZA()),{[e]:n});return new kr("auth","Firebase",r).create(e,{appName:t.name})}function Yn(t){return _u(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function tw(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&hn(t,"argument-error"),_u(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function xu(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return qg.create(t,...e)}function _e(t,e,...n){if(!t)throw xu(e,...n)}function Tn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Eo(e),new Error(e)}function Dn(t,e){t||Tn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Il(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function nw(){return of()==="http:"||of()==="https:"}function of(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rw(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(nw()||kg()||"connection"in navigator)?navigator.onLine:!0}function sw(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e,n){this.shortDelay=e,this.longDelay=n,Dn(n>e,"Short delay should be less than long delay!"),this.isMobile=SE()||FE()}get(){return rw()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vu(t,e){Dn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jg{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Tn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Tn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Tn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iw={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ow=new Bi(3e4,6e4);function yu(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Is(t,e,n,r,s={}){return zg(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=ki(Object.assign({key:t.config.apiKey},o)).slice(1),l=await t._getAdditionalHeaders();l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode);const u=Object.assign({method:e,headers:l},i);return PE()||(u.referrerPolicy="no-referrer"),jg.fetch()(Wg(t,t.config.apiHost,n,c),u)})}async function zg(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},iw),e);try{const s=new cw(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw lo(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[l,u]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw lo(t,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw lo(t,"email-already-in-use",o);if(l==="USER_DISABLED")throw lo(t,"user-disabled",o);const h=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw _u(t,h,u);hn(t,h)}}catch(s){if(s instanceof Xt)throw s;hn(t,"network-request-failed",{message:String(s)})}}async function aw(t,e,n,r,s={}){const i=await Is(t,e,n,r,s);return"mfaPendingCredential"in i&&hn(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Wg(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?vu(t.config,s):`${t.config.apiScheme}://${s}`}class cw{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(sn(this.auth,"network-request-failed")),ow.get())})}}function lo(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=sn(t,e,r);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lw(t,e){return Is(t,"POST","/v1/accounts:delete",e)}async function Kg(t,e){return Is(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function si(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function uw(t,e=!1){const n=kt(t),r=await n.getIdToken(e),s=Eu(r);_e(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:si(Gc(s.auth_time)),issuedAtTime:si(Gc(s.iat)),expirationTime:si(Gc(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Gc(t){return Number(t)*1e3}function Eu(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Eo("JWT malformed, contained fewer than 3 sections"),null;try{const s=Sg(n);return s?JSON.parse(s):(Eo("Failed to decode base64 JWT payload"),null)}catch(s){return Eo("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function af(t){const e=Eu(t);return _e(e,"internal-error"),_e(typeof e.exp<"u","internal-error"),_e(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yi(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Xt&&hw(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function hw({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fw{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cl{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=si(this.lastLoginAt),this.creationTime=si(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wa(t){var e;const n=t.auth,r=await t.getIdToken(),s=await yi(t,Kg(n,{idToken:r}));_e(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Gg(i.providerUserInfo):[],c=pw(t.providerData,o),l=t.isAnonymous,u=!(t.email&&i.passwordHash)&&!(c!=null&&c.length),h=l?u:!1,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new Cl(i.createdAt,i.lastLoginAt),isAnonymous:h};Object.assign(t,d)}async function dw(t){const e=kt(t);await wa(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function pw(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Gg(t){return t.map(e=>{var{providerId:n}=e,r=mu(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gw(t,e){const n=await zg(t,{},async()=>{const r=ki({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=Wg(t,s,"/v1/token",`key=${i}`),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",jg.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function mw(t,e){return Is(t,"POST","/v2/accounts:revokeToken",yu(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){_e(e.idToken,"internal-error"),_e(typeof e.idToken<"u","internal-error"),_e(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):af(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){_e(e.length!==0,"internal-error");const n=af(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(_e(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await gw(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new ls;return r&&(_e(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(_e(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(_e(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ls,this.toJSON())}_performRefresh(){return Tn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mn(t,e){_e(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class In{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=mu(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new fw(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Cl(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await yi(this,this.stsTokenManager.getToken(this.auth,e));return _e(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return uw(this,e)}reload(){return dw(this)}_assign(e){this!==e&&(_e(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new In(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){_e(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await wa(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(wn(this.auth.app))return Promise.reject(Yn(this.auth));const e=await this.getIdToken();return await yi(this,lw(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,c,l,u,h;const d=(r=n.displayName)!==null&&r!==void 0?r:void 0,p=(s=n.email)!==null&&s!==void 0?s:void 0,m=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,v=(o=n.photoURL)!==null&&o!==void 0?o:void 0,R=(c=n.tenantId)!==null&&c!==void 0?c:void 0,T=(l=n._redirectEventId)!==null&&l!==void 0?l:void 0,k=(u=n.createdAt)!==null&&u!==void 0?u:void 0,I=(h=n.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:b,emailVerified:S,isAnonymous:B,providerData:O,stsTokenManager:y}=n;_e(b&&y,e,"internal-error");const _=ls.fromJSON(this.name,y);_e(typeof b=="string",e,"internal-error"),Mn(d,e.name),Mn(p,e.name),_e(typeof S=="boolean",e,"internal-error"),_e(typeof B=="boolean",e,"internal-error"),Mn(m,e.name),Mn(v,e.name),Mn(R,e.name),Mn(T,e.name),Mn(k,e.name),Mn(I,e.name);const E=new In({uid:b,auth:e,email:p,emailVerified:S,displayName:d,isAnonymous:B,photoURL:v,phoneNumber:m,tenantId:R,stsTokenManager:_,createdAt:k,lastLoginAt:I});return O&&Array.isArray(O)&&(E.providerData=O.map(x=>Object.assign({},x))),T&&(E._redirectEventId=T),E}static async _fromIdTokenResponse(e,n,r=!1){const s=new ls;s.updateFromServerResponse(n);const i=new In({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await wa(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];_e(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Gg(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new ls;c.updateFromIdToken(r);const l=new In({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Cl(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(l,u),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cf=new Map;function Cn(t){Dn(t instanceof Function,"Expected a class definition");let e=cf.get(t);return e?(Dn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,cf.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qg{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Qg.type="NONE";const lf=Qg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ao(t,e,n){return`firebase:${t}:${e}:${n}`}class us{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Ao(this.userKey,s.apiKey,i),this.fullPersistenceKey=Ao("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?In._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new us(Cn(lf),e,r);const s=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=s[0]||Cn(lf);const o=Ao(r,e.config.apiKey,e.name);let c=null;for(const u of n)try{const h=await u._get(o);if(h){const d=In._fromJSON(e,h);u!==i&&(c=d),i=u;break}}catch{}const l=s.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new us(i,e,r):(i=l[0],c&&await i._set(o,c.toJSON()),await Promise.all(n.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new us(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uf(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Zg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Xg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(tm(e))return"Blackberry";if(nm(e))return"Webos";if(Yg(e))return"Safari";if((e.includes("chrome/")||Jg(e))&&!e.includes("edge/"))return"Chrome";if(em(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Xg(t=wt()){return/firefox\//i.test(t)}function Yg(t=wt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Jg(t=wt()){return/crios\//i.test(t)}function Zg(t=wt()){return/iemobile/i.test(t)}function em(t=wt()){return/android/i.test(t)}function tm(t=wt()){return/blackberry/i.test(t)}function nm(t=wt()){return/webos/i.test(t)}function Au(t=wt()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function _w(t=wt()){var e;return Au(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function xw(){return kE()&&document.documentMode===10}function rm(t=wt()){return Au(t)||em(t)||nm(t)||tm(t)||/windows phone/i.test(t)||Zg(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sm(t,e=[]){let n;switch(t){case"Browser":n=uf(wt());break;case"Worker":n=`${uf(wt())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ts}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vw{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,c)=>{try{const l=e(i);o(l)}catch(l){c(l)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yw(t,e={}){return Is(t,"GET","/v2/passwordPolicy",yu(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ew=6;class Aw{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:Ew,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(n=l.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(i=l.containsUppercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ww{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new hf(this),this.idTokenSubscription=new hf(this),this.beforeStateQueue=new vw(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=qg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Cn(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await us.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Kg(this,{idToken:e}),r=await In._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(wn(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,c=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&(l!=null&&l.user)&&(s=l.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return _e(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await wa(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=sw()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(wn(this.app))return Promise.reject(Yn(this));const n=e?kt(e):null;return n&&_e(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&_e(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return wn(this.app)?Promise.reject(Yn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return wn(this.app)?Promise.reject(Yn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Cn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await yw(this),n=new Aw(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new kr("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await mw(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Cn(e)||this._popupRedirectResolver;_e(n,this,"argument-error"),this.redirectPersistenceManager=await us.create(this,[Cn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(_e(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const l=e.addObserver(n,r,s);return()=>{o=!0,l()}}else{const l=e.addObserver(n);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return _e(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=sm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&ew(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Oi(t){return kt(t)}class hf{constructor(e){this.auth=e,this.observer=null,this.addObserver=UE(n=>this.observer=n)}get next(){return _e(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Tw(t){wu=t}function Iw(t){return wu.loadJS(t)}function Cw(){return wu.gapiScript}function bw(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rw(t,e){const n=Br(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(xi(i,e??{}))return s;hn(s,"already-initialized")}return n.initialize({options:e})}function Sw(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Cn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Dw(t,e,n){const r=Oi(t);_e(r._canInitEmulator,r,"emulator-config-failed"),_e(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=im(e),{host:o,port:c}=Pw(e),l=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),Fw()}function im(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Pw(t){const e=im(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:ff(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:ff(o)}}}function ff(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Fw(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class om{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Tn("not implemented")}_getIdTokenResponse(e){return Tn("not implemented")}_linkToIdToken(e,n){return Tn("not implemented")}_getReauthenticationResolver(e){return Tn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hs(t,e){return aw(t,"POST","/v1/accounts:signInWithIdp",yu(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kw="http://localhost";class br extends om{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new br(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):hn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=mu(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new br(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return hs(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,hs(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,hs(e,n)}buildRequest(){const e={requestUri:kw,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ki(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tu{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni extends Tu{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn extends Ni{constructor(){super("facebook.com")}static credential(e){return br._fromParams({providerId:jn.PROVIDER_ID,signInMethod:jn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return jn.credentialFromTaggedObject(e)}static credentialFromError(e){return jn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return jn.credential(e.oauthAccessToken)}catch{return null}}}jn.FACEBOOK_SIGN_IN_METHOD="facebook.com";jn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn extends Ni{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return br._fromParams({providerId:tn.PROVIDER_ID,signInMethod:tn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return tn.credentialFromTaggedObject(e)}static credentialFromError(e){return tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return tn.credential(n,r)}catch{return null}}}tn.GOOGLE_SIGN_IN_METHOD="google.com";tn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn extends Ni{constructor(){super("github.com")}static credential(e){return br._fromParams({providerId:zn.PROVIDER_ID,signInMethod:zn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return zn.credentialFromTaggedObject(e)}static credentialFromError(e){return zn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return zn.credential(e.oauthAccessToken)}catch{return null}}}zn.GITHUB_SIGN_IN_METHOD="github.com";zn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn extends Ni{constructor(){super("twitter.com")}static credential(e,n){return br._fromParams({providerId:Wn.PROVIDER_ID,signInMethod:Wn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Wn.credentialFromTaggedObject(e)}static credentialFromError(e){return Wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Wn.credential(n,r)}catch{return null}}}Wn.TWITTER_SIGN_IN_METHOD="twitter.com";Wn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await In._fromIdTokenResponse(e,r,s),o=df(r);return new ms({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=df(r);return new ms({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function df(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta extends Xt{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Ta.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Ta(e,n,r,s)}}function am(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ta._fromErrorAndOperation(t,i,e,r):i})}async function Bw(t,e,n=!1){const r=await yi(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ms._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ow(t,e,n=!1){const{auth:r}=t;if(wn(r.app))return Promise.reject(Yn(r));const s="reauthenticate";try{const i=await yi(t,am(r,s,e,t),n);_e(i.idToken,r,"internal-error");const o=Eu(i.idToken);_e(o,r,"internal-error");const{sub:c}=o;return _e(t.uid===c,r,"user-mismatch"),ms._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&hn(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nw(t,e,n=!1){if(wn(t.app))return Promise.reject(Yn(t));const r="signIn",s=await am(t,r,e),i=await ms._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}function Vw(t,e,n,r){return kt(t).onIdTokenChanged(e,n,r)}function Lw(t,e,n){return kt(t).beforeAuthStateChanged(e,n)}function Iu(t,e,n,r){return kt(t).onAuthStateChanged(e,n,r)}function cm(t){return kt(t).signOut()}const Ia="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lm{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Ia,"1"),this.storage.removeItem(Ia),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mw=1e3,Uw=10;class um extends lm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=rm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);xw()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Uw):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Mw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}um.type="LOCAL";const $w=um;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm extends lm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}hm.type="SESSION";const fm=hm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hw(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ya{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Ya(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async u=>u(n.origin,i)),l=await Hw(c);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ya.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cu(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,l)=>{const u=Cu("",20);s.port1.start();const h=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(d){const p=d;if(p.data.eventId===u)switch(p.data.status){case"ack":clearTimeout(h),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(p.data.response);break;default:clearTimeout(h),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(){return window}function jw(t){on().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dm(){return typeof on().WorkerGlobalScope<"u"&&typeof on().importScripts=="function"}async function zw(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ww(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Kw(){return dm()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pm="firebaseLocalStorageDb",Gw=1,Ca="firebaseLocalStorage",gm="fbase_key";class Vi{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Ja(t,e){return t.transaction([Ca],e?"readwrite":"readonly").objectStore(Ca)}function Qw(){const t=indexedDB.deleteDatabase(pm);return new Vi(t).toPromise()}function bl(){const t=indexedDB.open(pm,Gw);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Ca,{keyPath:gm})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Ca)?e(r):(r.close(),await Qw(),e(await bl()))})})}async function pf(t,e,n){const r=Ja(t,!0).put({[gm]:e,value:n});return new Vi(r).toPromise()}async function Xw(t,e){const n=Ja(t,!1).get(e),r=await new Vi(n).toPromise();return r===void 0?null:r.value}function gf(t,e){const n=Ja(t,!0).delete(e);return new Vi(n).toPromise()}const Yw=800,Jw=3;class mm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await bl(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Jw)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return dm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ya._getInstance(Kw()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await zw(),!this.activeServiceWorker)return;this.sender=new qw(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ww()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await bl();return await pf(e,Ia,"1"),await gf(e,Ia),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>pf(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Xw(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>gf(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Ja(s,!1).getAll();return new Vi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Yw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}mm.type="LOCAL";const Zw=mm;new Bi(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _m(t,e){return e?Cn(e):(_e(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bu extends om{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return hs(e,this._buildIdpRequest())}_linkToIdToken(e,n){return hs(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return hs(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function eT(t){return Nw(t.auth,new bu(t),t.bypassAuthState)}function tT(t){const{auth:e,user:n}=t;return _e(n,e,"internal-error"),Ow(n,new bu(t),t.bypassAuthState)}async function nT(t){const{auth:e,user:n}=t;return _e(n,e,"internal-error"),Bw(n,new bu(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xm{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return eT;case"linkViaPopup":case"linkViaRedirect":return nT;case"reauthViaPopup":case"reauthViaRedirect":return tT;default:hn(this.auth,"internal-error")}}resolve(e){Dn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Dn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rT=new Bi(2e3,1e4);class rs extends xm{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,rs.currentPopupAction&&rs.currentPopupAction.cancel(),rs.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return _e(e,this.auth,"internal-error"),e}async onExecution(){Dn(this.filter.length===1,"Popup operations only handle one event");const e=Cu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(sn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(sn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,rs.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(sn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,rT.get())};e()}}rs.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sT="pendingRedirect",wo=new Map;class iT extends xm{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=wo.get(this.auth._key());if(!e){try{const r=await oT(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}wo.set(this.auth._key(),e)}return this.bypassAuthState||wo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function oT(t,e){const n=ym(e),r=vm(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}async function aT(t,e){return vm(t)._set(ym(e),"true")}function cT(t,e){wo.set(t._key(),e)}function vm(t){return Cn(t._redirectPersistence)}function ym(t){return Ao(sT,t.config.apiKey,t.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lT(t,e,n){return uT(t,e,n)}async function uT(t,e,n){if(wn(t.app))return Promise.reject(Yn(t));const r=Oi(t);tw(t,e,Tu),await r._initializationPromise;const s=_m(r,n);return await aT(s,r),s._openRedirect(r,e,"signInViaRedirect")}async function hT(t,e){return await Oi(t)._initializationPromise,Em(t,e,!1)}async function Em(t,e,n=!1){if(wn(t.app))return Promise.reject(Yn(t));const r=Oi(t),s=_m(r,e),o=await new iT(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fT=10*60*1e3;class dT{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!pT(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Am(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(sn(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=fT&&this.cachedEventUids.clear(),this.cachedEventUids.has(mf(e))}saveEventToCache(e){this.cachedEventUids.add(mf(e)),this.lastProcessedEventTime=Date.now()}}function mf(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Am({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function pT(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Am(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gT(t,e={}){return Is(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mT=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,_T=/^https?/;async function xT(t){if(t.config.emulator)return;const{authorizedDomains:e}=await gT(t);for(const n of e)try{if(vT(n))return}catch{}hn(t,"unauthorized-domain")}function vT(t){const e=Il(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!_T.test(n))return!1;if(mT.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yT=new Bi(3e4,6e4);function _f(){const t=on().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function ET(t){return new Promise((e,n)=>{var r,s,i;function o(){_f(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{_f(),n(sn(t,"network-request-failed"))},timeout:yT.get()})}if(!((s=(r=on().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=on().gapi)===null||i===void 0)&&i.load)o();else{const c=bw("iframefcb");return on()[c]=()=>{gapi.load?o():n(sn(t,"network-request-failed"))},Iw(`${Cw()}?onload=${c}`).catch(l=>n(l))}}).catch(e=>{throw To=null,e})}let To=null;function AT(t){return To=To||ET(t),To}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wT=new Bi(5e3,15e3),TT="__/auth/iframe",IT="emulator/auth/iframe",CT={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},bT=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function RT(t){const e=t.config;_e(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?vu(e,IT):`https://${t.config.authDomain}/${TT}`,r={apiKey:e.apiKey,appName:t.name,v:Ts},s=bT.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${ki(r).slice(1)}`}async function ST(t){const e=await AT(t),n=on().gapi;return _e(n,t,"internal-error"),e.open({where:document.body,url:RT(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:CT,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=sn(t,"network-request-failed"),c=on().setTimeout(()=>{i(o)},wT.get());function l(){on().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DT={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},PT=500,FT=600,kT="_blank",BT="http://localhost";class xf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function OT(t,e,n,r=PT,s=FT){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},DT),{width:r.toString(),height:s.toString(),top:i,left:o}),u=wt().toLowerCase();n&&(c=Jg(u)?kT:n),Xg(u)&&(e=e||BT,l.scrollbars="yes");const h=Object.entries(l).reduce((p,[m,v])=>`${p}${m}=${v},`,"");if(_w(u)&&c!=="_self")return NT(e||"",c),new xf(null);const d=window.open(e||"",c,h);_e(d,t,"popup-blocked");try{d.focus()}catch{}return new xf(d)}function NT(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VT="__/auth/handler",LT="emulator/auth/handler",MT=encodeURIComponent("fac");async function vf(t,e,n,r,s,i){_e(t.config.authDomain,t,"auth-domain-config-required"),_e(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Ts,eventId:s};if(e instanceof Tu){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",ME(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,d]of Object.entries({}))o[h]=d}if(e instanceof Ni){const h=e.getScopes().filter(d=>d!=="");h.length>0&&(o.scopes=h.join(","))}t.tenantId&&(o.tid=t.tenantId);const c=o;for(const h of Object.keys(c))c[h]===void 0&&delete c[h];const l=await t._getAppCheckToken(),u=l?`#${MT}=${encodeURIComponent(l)}`:"";return`${UT(t)}?${ki(c).slice(1)}${u}`}function UT({config:t}){return t.emulator?vu(t,LT):`https://${t.authDomain}/${VT}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qc="webStorageSupport";class $T{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=fm,this._completeRedirectFn=Em,this._overrideRedirectResult=cT}async _openPopup(e,n,r,s){var i;Dn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await vf(e,n,r,Il(),s);return OT(e,o,Cu())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await vf(e,n,r,Il(),s);return jw(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Dn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await ST(e),r=new dT(e);return n.register("authEvent",s=>(_e(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Qc,{type:Qc},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Qc];o!==void 0&&n(!!o),hn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=xT(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return rm()||Yg()||Au()}}const HT=$T;var yf="@firebase/auth",Ef="1.8.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qT{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){_e(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jT(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function zT(t){un(new Qt("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;_e(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:c,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:sm(t)},u=new ww(r,s,i,l);return Sw(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),un(new Qt("auth-internal",e=>{const n=Oi(e.getProvider("auth").getImmediate());return(r=>new qT(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ut(yf,Ef,jT(t)),Ut(yf,Ef,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WT=5*60,KT=Fg("authIdTokenMaxAge")||WT;let Af=null;const GT=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>KT)return;const s=n==null?void 0:n.token;Af!==s&&(Af=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function wm(t=gu()){const e=Br(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Rw(t,{popupRedirectResolver:HT,persistence:[Zw,$w,fm]}),r=Fg("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=GT(i.toString());Lw(n,o,()=>o(n.currentUser)),Vw(n,c=>o(c))}}const s=Dg("auth");return s&&Dw(n,`http://${s}`),n}function QT(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}Tw({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=sn("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",QT().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});zT("Browser");var XT="firebase",YT="11.1.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ut(XT,YT,"app");const Tm="@firebase/installations",Ru="0.6.11";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Im=1e4,Cm=`w:${Ru}`,bm="FIS_v2",JT="https://firebaseinstallations.googleapis.com/v1",ZT=60*60*1e3,eI="installations",tI="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nI={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Rr=new kr(eI,tI,nI);function Rm(t){return t instanceof Xt&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sm({projectId:t}){return`${JT}/projects/${t}/installations`}function Dm(t){return{token:t.token,requestStatus:2,expiresIn:sI(t.expiresIn),creationTime:Date.now()}}async function Pm(t,e){const r=(await e.json()).error;return Rr.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Fm({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function rI(t,{refreshToken:e}){const n=Fm(t);return n.append("Authorization",iI(e)),n}async function km(t){const e=await t();return e.status>=500&&e.status<600?t():e}function sI(t){return Number(t.replace("s","000"))}function iI(t){return`${bm} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oI({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=Sm(t),s=Fm(t),i=e.getImmediate({optional:!0});if(i){const u=await i.getHeartbeatsHeader();u&&s.append("x-firebase-client",u)}const o={fid:n,authVersion:bm,appId:t.appId,sdkVersion:Cm},c={method:"POST",headers:s,body:JSON.stringify(o)},l=await km(()=>fetch(r,c));if(l.ok){const u=await l.json();return{fid:u.fid||n,registrationStatus:2,refreshToken:u.refreshToken,authToken:Dm(u.authToken)}}else throw await Pm("Create Installation",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bm(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aI(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cI=/^[cdef][\w-]{21}$/,Rl="";function lI(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=uI(t);return cI.test(n)?n:Rl}catch{return Rl}}function uI(t){return aI(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Za(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Om=new Map;function Nm(t,e){const n=Za(t);Vm(n,e),hI(n,e)}function Vm(t,e){const n=Om.get(t);if(n)for(const r of n)r(e)}function hI(t,e){const n=fI();n&&n.postMessage({key:t,fid:e}),dI()}let xr=null;function fI(){return!xr&&"BroadcastChannel"in self&&(xr=new BroadcastChannel("[Firebase] FID Change"),xr.onmessage=t=>{Vm(t.data.key,t.data.fid)}),xr}function dI(){Om.size===0&&xr&&(xr.close(),xr=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pI="firebase-installations-database",gI=1,Sr="firebase-installations-store";let Xc=null;function Su(){return Xc||(Xc=Lg(pI,gI,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Sr)}}})),Xc}async function ba(t,e){const n=Za(t),s=(await Su()).transaction(Sr,"readwrite"),i=s.objectStore(Sr),o=await i.get(n);return await i.put(e,n),await s.done,(!o||o.fid!==e.fid)&&Nm(t,e.fid),e}async function Lm(t){const e=Za(t),r=(await Su()).transaction(Sr,"readwrite");await r.objectStore(Sr).delete(e),await r.done}async function ec(t,e){const n=Za(t),s=(await Su()).transaction(Sr,"readwrite"),i=s.objectStore(Sr),o=await i.get(n),c=e(o);return c===void 0?await i.delete(n):await i.put(c,n),await s.done,c&&(!o||o.fid!==c.fid)&&Nm(t,c.fid),c}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Du(t){let e;const n=await ec(t.appConfig,r=>{const s=mI(r),i=_I(t,s);return e=i.registrationPromise,i.installationEntry});return n.fid===Rl?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function mI(t){const e=t||{fid:lI(),registrationStatus:0};return Mm(e)}function _I(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Rr.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=xI(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:vI(t)}:{installationEntry:e}}async function xI(t,e){try{const n=await oI(t,e);return ba(t.appConfig,n)}catch(n){throw Rm(n)&&n.customData.serverCode===409?await Lm(t.appConfig):await ba(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function vI(t){let e=await wf(t.appConfig);for(;e.registrationStatus===1;)await Bm(100),e=await wf(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await Du(t);return r||n}return e}function wf(t){return ec(t,e=>{if(!e)throw Rr.create("installation-not-found");return Mm(e)})}function Mm(t){return yI(t)?{fid:t.fid,registrationStatus:0}:t}function yI(t){return t.registrationStatus===1&&t.registrationTime+Im<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function EI({appConfig:t,heartbeatServiceProvider:e},n){const r=AI(t,n),s=rI(t,n),i=e.getImmediate({optional:!0});if(i){const u=await i.getHeartbeatsHeader();u&&s.append("x-firebase-client",u)}const o={installation:{sdkVersion:Cm,appId:t.appId}},c={method:"POST",headers:s,body:JSON.stringify(o)},l=await km(()=>fetch(r,c));if(l.ok){const u=await l.json();return Dm(u)}else throw await Pm("Generate Auth Token",l)}function AI(t,{fid:e}){return`${Sm(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pu(t,e=!1){let n;const r=await ec(t.appConfig,i=>{if(!Um(i))throw Rr.create("not-registered");const o=i.authToken;if(!e&&II(o))return i;if(o.requestStatus===1)return n=wI(t,e),i;{if(!navigator.onLine)throw Rr.create("app-offline");const c=bI(i);return n=TI(t,c),c}});return n?await n:r.authToken}async function wI(t,e){let n=await Tf(t.appConfig);for(;n.authToken.requestStatus===1;)await Bm(100),n=await Tf(t.appConfig);const r=n.authToken;return r.requestStatus===0?Pu(t,e):r}function Tf(t){return ec(t,e=>{if(!Um(e))throw Rr.create("not-registered");const n=e.authToken;return RI(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function TI(t,e){try{const n=await EI(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await ba(t.appConfig,r),n}catch(n){if(Rm(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Lm(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await ba(t.appConfig,r)}throw n}}function Um(t){return t!==void 0&&t.registrationStatus===2}function II(t){return t.requestStatus===2&&!CI(t)}function CI(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+ZT}function bI(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function RI(t){return t.requestStatus===1&&t.requestTime+Im<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function SI(t){const e=t,{installationEntry:n,registrationPromise:r}=await Du(e);return r?r.catch(console.error):Pu(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function DI(t,e=!1){const n=t;return await PI(n),(await Pu(n,e)).token}async function PI(t){const{registrationPromise:e}=await Du(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FI(t){if(!t||!t.options)throw Yc("App Configuration");if(!t.name)throw Yc("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Yc(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Yc(t){return Rr.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $m="installations",kI="installations-internal",BI=t=>{const e=t.getProvider("app").getImmediate(),n=FI(e),r=Br(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},OI=t=>{const e=t.getProvider("app").getImmediate(),n=Br(e,$m).getImmediate();return{getId:()=>SI(n),getToken:s=>DI(n,s)}};function NI(){un(new Qt($m,BI,"PUBLIC")),un(new Qt(kI,OI,"PRIVATE"))}NI();Ut(Tm,Ru);Ut(Tm,Ru,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ra="analytics",VI="firebase_id",LI="origin",MI=60*1e3,UI="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Fu="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft=new Xa("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $I={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Vt=new kr("analytics","Analytics",$I);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HI(t){if(!t.startsWith(Fu)){const e=Vt.create("invalid-gtag-resource",{gtagURL:t});return Ft.warn(e.message),""}return t}function Hm(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function qI(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function jI(t,e){const n=qI("firebase-js-sdk-policy",{createScriptURL:HI}),r=document.createElement("script"),s=`${Fu}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function zI(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function WI(t,e,n,r,s,i){const o=r[s];try{if(o)await e[o];else{const l=(await Hm(n)).find(u=>u.measurementId===s);l&&await e[l.appId]}}catch(c){Ft.error(c)}t("config",s,i)}async function KI(t,e,n,r,s){try{let i=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const c=await Hm(n);for(const l of o){const u=c.find(d=>d.measurementId===l),h=u&&e[u.appId];if(h)i.push(h);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),t("event",r,s||{})}catch(i){Ft.error(i)}}function GI(t,e,n,r){async function s(i,...o){try{if(i==="event"){const[c,l]=o;await KI(t,e,n,c,l)}else if(i==="config"){const[c,l]=o;await WI(t,e,n,r,c,l)}else if(i==="consent"){const[c,l]=o;t("consent",c,l)}else if(i==="get"){const[c,l,u]=o;t("get",c,l,u)}else if(i==="set"){const[c]=o;t("set",c)}else t(i,...o)}catch(c){Ft.error(c)}}return s}function QI(t,e,n,r,s){let i=function(...o){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=GI(i,t,e,n),{gtagCore:i,wrappedGtag:window[s]}}function XI(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(Fu)&&n.src.includes(t))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YI=30,JI=1e3;class ZI{constructor(e={},n=JI){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const qm=new ZI;function eC(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function tC(t){var e;const{appId:n,apiKey:r}=t,s={method:"GET",headers:eC(r)},i=UI.replace("{app-id}",n),o=await fetch(i,s);if(o.status!==200&&o.status!==304){let c="";try{const l=await o.json();!((e=l.error)===null||e===void 0)&&e.message&&(c=l.error.message)}catch{}throw Vt.create("config-fetch-failed",{httpStatus:o.status,responseMessage:c})}return o.json()}async function nC(t,e=qm,n){const{appId:r,apiKey:s,measurementId:i}=t.options;if(!r)throw Vt.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:r};throw Vt.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new iC;return setTimeout(async()=>{c.abort()},MI),jm({appId:r,apiKey:s,measurementId:i},o,c,e)}async function jm(t,{throttleEndTimeMillis:e,backoffCount:n},r,s=qm){var i;const{appId:o,measurementId:c}=t;try{await rC(r,e)}catch(l){if(c)return Ft.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:o,measurementId:c};throw l}try{const l=await tC(t);return s.deleteThrottleMetadata(o),l}catch(l){const u=l;if(!sC(u)){if(s.deleteThrottleMetadata(o),c)return Ft.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:o,measurementId:c};throw l}const h=Number((i=u==null?void 0:u.customData)===null||i===void 0?void 0:i.httpStatus)===503?Xh(n,s.intervalMillis,YI):Xh(n,s.intervalMillis),d={throttleEndTimeMillis:Date.now()+h,backoffCount:n+1};return s.setThrottleMetadata(o,d),Ft.debug(`Calling attemptFetch again in ${h} millis`),jm(t,d,r,s)}}function rC(t,e){return new Promise((n,r)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(i),r(Vt.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function sC(t){if(!(t instanceof Xt)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class iC{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function oC(t,e,n,r,s){if(s&&s.global){t("event",n,r);return}else{const i=await e,o=Object.assign(Object.assign({},r),{send_to:i});t("event",n,o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aC(){if(Bg())try{await Og()}catch(t){return Ft.warn(Vt.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return Ft.warn(Vt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function cC(t,e,n,r,s,i,o){var c;const l=nC(t);l.then(m=>{n[m.measurementId]=m.appId,t.options.measurementId&&m.measurementId!==t.options.measurementId&&Ft.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${m.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(m=>Ft.error(m)),e.push(l);const u=aC().then(m=>{if(m)return r.getId()}),[h,d]=await Promise.all([l,u]);XI(i)||jI(i,h.measurementId),s("js",new Date);const p=(c=o==null?void 0:o.config)!==null&&c!==void 0?c:{};return p[LI]="firebase",p.update=!0,d!=null&&(p[VI]=d),s("config",h.measurementId,p),h.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lC{constructor(e){this.app=e}_delete(){return delete ii[this.app.options.appId],Promise.resolve()}}let ii={},If=[];const Cf={};let Jc="dataLayer",uC="gtag",bf,zm,Rf=!1;function hC(){const t=[];if(kg()&&t.push("This is a browser extension environment."),OE()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,s)=>`(${s+1}) ${r}`).join(" "),n=Vt.create("invalid-analytics-context",{errorInfo:e});Ft.warn(n.message)}}function fC(t,e,n){hC();const r=t.options.appId;if(!r)throw Vt.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)Ft.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Vt.create("no-api-key");if(ii[r]!=null)throw Vt.create("already-exists",{id:r});if(!Rf){zI(Jc);const{wrappedGtag:i,gtagCore:o}=QI(ii,If,Cf,Jc,uC);zm=i,bf=o,Rf=!0}return ii[r]=cC(t,If,Cf,e,bf,Jc,n),new lC(t)}function dC(t=gu()){t=kt(t);const e=Br(t,Ra);return e.isInitialized()?e.getImmediate():pC(t)}function pC(t,e={}){const n=Br(t,Ra);if(n.isInitialized()){const s=n.getImmediate();if(xi(e,n.getOptions()))return s;throw Vt.create("already-initialized")}return n.initialize({options:e})}function gC(t,e,n,r){t=kt(t),oC(zm,ii[t.app.options.appId],e,n,r).catch(s=>Ft.error(s))}const Sf="@firebase/analytics",Df="0.10.10";function mC(){un(new Qt(Ra,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return fC(r,s,n)},"PUBLIC")),un(new Qt("analytics-internal",t,"PRIVATE")),Ut(Sf,Df),Ut(Sf,Df,"esm2017");function t(e){try{const n=e.getProvider(Ra).getImmediate();return{logEvent:(r,s,i)=>gC(n,r,s,i)}}catch(n){throw Vt.create("interop-component-reg-failed",{reason:n})}}}mC();var Pf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Tr,Wm;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(y,_){function E(){}E.prototype=_.prototype,y.D=_.prototype,y.prototype=new E,y.prototype.constructor=y,y.C=function(x,w,D){for(var A=Array(arguments.length-2),re=2;re<arguments.length;re++)A[re-2]=arguments[re];return _.prototype[w].apply(x,A)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(y,_,E){E||(E=0);var x=Array(16);if(typeof _=="string")for(var w=0;16>w;++w)x[w]=_.charCodeAt(E++)|_.charCodeAt(E++)<<8|_.charCodeAt(E++)<<16|_.charCodeAt(E++)<<24;else for(w=0;16>w;++w)x[w]=_[E++]|_[E++]<<8|_[E++]<<16|_[E++]<<24;_=y.g[0],E=y.g[1],w=y.g[2];var D=y.g[3],A=_+(D^E&(w^D))+x[0]+3614090360&4294967295;_=E+(A<<7&4294967295|A>>>25),A=D+(w^_&(E^w))+x[1]+3905402710&4294967295,D=_+(A<<12&4294967295|A>>>20),A=w+(E^D&(_^E))+x[2]+606105819&4294967295,w=D+(A<<17&4294967295|A>>>15),A=E+(_^w&(D^_))+x[3]+3250441966&4294967295,E=w+(A<<22&4294967295|A>>>10),A=_+(D^E&(w^D))+x[4]+4118548399&4294967295,_=E+(A<<7&4294967295|A>>>25),A=D+(w^_&(E^w))+x[5]+1200080426&4294967295,D=_+(A<<12&4294967295|A>>>20),A=w+(E^D&(_^E))+x[6]+2821735955&4294967295,w=D+(A<<17&4294967295|A>>>15),A=E+(_^w&(D^_))+x[7]+4249261313&4294967295,E=w+(A<<22&4294967295|A>>>10),A=_+(D^E&(w^D))+x[8]+1770035416&4294967295,_=E+(A<<7&4294967295|A>>>25),A=D+(w^_&(E^w))+x[9]+2336552879&4294967295,D=_+(A<<12&4294967295|A>>>20),A=w+(E^D&(_^E))+x[10]+4294925233&4294967295,w=D+(A<<17&4294967295|A>>>15),A=E+(_^w&(D^_))+x[11]+2304563134&4294967295,E=w+(A<<22&4294967295|A>>>10),A=_+(D^E&(w^D))+x[12]+1804603682&4294967295,_=E+(A<<7&4294967295|A>>>25),A=D+(w^_&(E^w))+x[13]+4254626195&4294967295,D=_+(A<<12&4294967295|A>>>20),A=w+(E^D&(_^E))+x[14]+2792965006&4294967295,w=D+(A<<17&4294967295|A>>>15),A=E+(_^w&(D^_))+x[15]+1236535329&4294967295,E=w+(A<<22&4294967295|A>>>10),A=_+(w^D&(E^w))+x[1]+4129170786&4294967295,_=E+(A<<5&4294967295|A>>>27),A=D+(E^w&(_^E))+x[6]+3225465664&4294967295,D=_+(A<<9&4294967295|A>>>23),A=w+(_^E&(D^_))+x[11]+643717713&4294967295,w=D+(A<<14&4294967295|A>>>18),A=E+(D^_&(w^D))+x[0]+3921069994&4294967295,E=w+(A<<20&4294967295|A>>>12),A=_+(w^D&(E^w))+x[5]+3593408605&4294967295,_=E+(A<<5&4294967295|A>>>27),A=D+(E^w&(_^E))+x[10]+38016083&4294967295,D=_+(A<<9&4294967295|A>>>23),A=w+(_^E&(D^_))+x[15]+3634488961&4294967295,w=D+(A<<14&4294967295|A>>>18),A=E+(D^_&(w^D))+x[4]+3889429448&4294967295,E=w+(A<<20&4294967295|A>>>12),A=_+(w^D&(E^w))+x[9]+568446438&4294967295,_=E+(A<<5&4294967295|A>>>27),A=D+(E^w&(_^E))+x[14]+3275163606&4294967295,D=_+(A<<9&4294967295|A>>>23),A=w+(_^E&(D^_))+x[3]+4107603335&4294967295,w=D+(A<<14&4294967295|A>>>18),A=E+(D^_&(w^D))+x[8]+1163531501&4294967295,E=w+(A<<20&4294967295|A>>>12),A=_+(w^D&(E^w))+x[13]+2850285829&4294967295,_=E+(A<<5&4294967295|A>>>27),A=D+(E^w&(_^E))+x[2]+4243563512&4294967295,D=_+(A<<9&4294967295|A>>>23),A=w+(_^E&(D^_))+x[7]+1735328473&4294967295,w=D+(A<<14&4294967295|A>>>18),A=E+(D^_&(w^D))+x[12]+2368359562&4294967295,E=w+(A<<20&4294967295|A>>>12),A=_+(E^w^D)+x[5]+4294588738&4294967295,_=E+(A<<4&4294967295|A>>>28),A=D+(_^E^w)+x[8]+2272392833&4294967295,D=_+(A<<11&4294967295|A>>>21),A=w+(D^_^E)+x[11]+1839030562&4294967295,w=D+(A<<16&4294967295|A>>>16),A=E+(w^D^_)+x[14]+4259657740&4294967295,E=w+(A<<23&4294967295|A>>>9),A=_+(E^w^D)+x[1]+2763975236&4294967295,_=E+(A<<4&4294967295|A>>>28),A=D+(_^E^w)+x[4]+1272893353&4294967295,D=_+(A<<11&4294967295|A>>>21),A=w+(D^_^E)+x[7]+4139469664&4294967295,w=D+(A<<16&4294967295|A>>>16),A=E+(w^D^_)+x[10]+3200236656&4294967295,E=w+(A<<23&4294967295|A>>>9),A=_+(E^w^D)+x[13]+681279174&4294967295,_=E+(A<<4&4294967295|A>>>28),A=D+(_^E^w)+x[0]+3936430074&4294967295,D=_+(A<<11&4294967295|A>>>21),A=w+(D^_^E)+x[3]+3572445317&4294967295,w=D+(A<<16&4294967295|A>>>16),A=E+(w^D^_)+x[6]+76029189&4294967295,E=w+(A<<23&4294967295|A>>>9),A=_+(E^w^D)+x[9]+3654602809&4294967295,_=E+(A<<4&4294967295|A>>>28),A=D+(_^E^w)+x[12]+3873151461&4294967295,D=_+(A<<11&4294967295|A>>>21),A=w+(D^_^E)+x[15]+530742520&4294967295,w=D+(A<<16&4294967295|A>>>16),A=E+(w^D^_)+x[2]+3299628645&4294967295,E=w+(A<<23&4294967295|A>>>9),A=_+(w^(E|~D))+x[0]+4096336452&4294967295,_=E+(A<<6&4294967295|A>>>26),A=D+(E^(_|~w))+x[7]+1126891415&4294967295,D=_+(A<<10&4294967295|A>>>22),A=w+(_^(D|~E))+x[14]+2878612391&4294967295,w=D+(A<<15&4294967295|A>>>17),A=E+(D^(w|~_))+x[5]+4237533241&4294967295,E=w+(A<<21&4294967295|A>>>11),A=_+(w^(E|~D))+x[12]+1700485571&4294967295,_=E+(A<<6&4294967295|A>>>26),A=D+(E^(_|~w))+x[3]+2399980690&4294967295,D=_+(A<<10&4294967295|A>>>22),A=w+(_^(D|~E))+x[10]+4293915773&4294967295,w=D+(A<<15&4294967295|A>>>17),A=E+(D^(w|~_))+x[1]+2240044497&4294967295,E=w+(A<<21&4294967295|A>>>11),A=_+(w^(E|~D))+x[8]+1873313359&4294967295,_=E+(A<<6&4294967295|A>>>26),A=D+(E^(_|~w))+x[15]+4264355552&4294967295,D=_+(A<<10&4294967295|A>>>22),A=w+(_^(D|~E))+x[6]+2734768916&4294967295,w=D+(A<<15&4294967295|A>>>17),A=E+(D^(w|~_))+x[13]+1309151649&4294967295,E=w+(A<<21&4294967295|A>>>11),A=_+(w^(E|~D))+x[4]+4149444226&4294967295,_=E+(A<<6&4294967295|A>>>26),A=D+(E^(_|~w))+x[11]+3174756917&4294967295,D=_+(A<<10&4294967295|A>>>22),A=w+(_^(D|~E))+x[2]+718787259&4294967295,w=D+(A<<15&4294967295|A>>>17),A=E+(D^(w|~_))+x[9]+3951481745&4294967295,y.g[0]=y.g[0]+_&4294967295,y.g[1]=y.g[1]+(w+(A<<21&4294967295|A>>>11))&4294967295,y.g[2]=y.g[2]+w&4294967295,y.g[3]=y.g[3]+D&4294967295}r.prototype.u=function(y,_){_===void 0&&(_=y.length);for(var E=_-this.blockSize,x=this.B,w=this.h,D=0;D<_;){if(w==0)for(;D<=E;)s(this,y,D),D+=this.blockSize;if(typeof y=="string"){for(;D<_;)if(x[w++]=y.charCodeAt(D++),w==this.blockSize){s(this,x),w=0;break}}else for(;D<_;)if(x[w++]=y[D++],w==this.blockSize){s(this,x),w=0;break}}this.h=w,this.o+=_},r.prototype.v=function(){var y=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);y[0]=128;for(var _=1;_<y.length-8;++_)y[_]=0;var E=8*this.o;for(_=y.length-8;_<y.length;++_)y[_]=E&255,E/=256;for(this.u(y),y=Array(16),_=E=0;4>_;++_)for(var x=0;32>x;x+=8)y[E++]=this.g[_]>>>x&255;return y};function i(y,_){var E=c;return Object.prototype.hasOwnProperty.call(E,y)?E[y]:E[y]=_(y)}function o(y,_){this.h=_;for(var E=[],x=!0,w=y.length-1;0<=w;w--){var D=y[w]|0;x&&D==_||(E[w]=D,x=!1)}this.g=E}var c={};function l(y){return-128<=y&&128>y?i(y,function(_){return new o([_|0],0>_?-1:0)}):new o([y|0],0>y?-1:0)}function u(y){if(isNaN(y)||!isFinite(y))return d;if(0>y)return T(u(-y));for(var _=[],E=1,x=0;y>=E;x++)_[x]=y/E|0,E*=4294967296;return new o(_,0)}function h(y,_){if(y.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(y.charAt(0)=="-")return T(h(y.substring(1),_));if(0<=y.indexOf("-"))throw Error('number format error: interior "-" character');for(var E=u(Math.pow(_,8)),x=d,w=0;w<y.length;w+=8){var D=Math.min(8,y.length-w),A=parseInt(y.substring(w,w+D),_);8>D?(D=u(Math.pow(_,D)),x=x.j(D).add(u(A))):(x=x.j(E),x=x.add(u(A)))}return x}var d=l(0),p=l(1),m=l(16777216);t=o.prototype,t.m=function(){if(R(this))return-T(this).m();for(var y=0,_=1,E=0;E<this.g.length;E++){var x=this.i(E);y+=(0<=x?x:4294967296+x)*_,_*=4294967296}return y},t.toString=function(y){if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(v(this))return"0";if(R(this))return"-"+T(this).toString(y);for(var _=u(Math.pow(y,6)),E=this,x="";;){var w=S(E,_).g;E=k(E,w.j(_));var D=((0<E.g.length?E.g[0]:E.h)>>>0).toString(y);if(E=w,v(E))return D+x;for(;6>D.length;)D="0"+D;x=D+x}},t.i=function(y){return 0>y?0:y<this.g.length?this.g[y]:this.h};function v(y){if(y.h!=0)return!1;for(var _=0;_<y.g.length;_++)if(y.g[_]!=0)return!1;return!0}function R(y){return y.h==-1}t.l=function(y){return y=k(this,y),R(y)?-1:v(y)?0:1};function T(y){for(var _=y.g.length,E=[],x=0;x<_;x++)E[x]=~y.g[x];return new o(E,~y.h).add(p)}t.abs=function(){return R(this)?T(this):this},t.add=function(y){for(var _=Math.max(this.g.length,y.g.length),E=[],x=0,w=0;w<=_;w++){var D=x+(this.i(w)&65535)+(y.i(w)&65535),A=(D>>>16)+(this.i(w)>>>16)+(y.i(w)>>>16);x=A>>>16,D&=65535,A&=65535,E[w]=A<<16|D}return new o(E,E[E.length-1]&-2147483648?-1:0)};function k(y,_){return y.add(T(_))}t.j=function(y){if(v(this)||v(y))return d;if(R(this))return R(y)?T(this).j(T(y)):T(T(this).j(y));if(R(y))return T(this.j(T(y)));if(0>this.l(m)&&0>y.l(m))return u(this.m()*y.m());for(var _=this.g.length+y.g.length,E=[],x=0;x<2*_;x++)E[x]=0;for(x=0;x<this.g.length;x++)for(var w=0;w<y.g.length;w++){var D=this.i(x)>>>16,A=this.i(x)&65535,re=y.i(w)>>>16,le=y.i(w)&65535;E[2*x+2*w]+=A*le,I(E,2*x+2*w),E[2*x+2*w+1]+=D*le,I(E,2*x+2*w+1),E[2*x+2*w+1]+=A*re,I(E,2*x+2*w+1),E[2*x+2*w+2]+=D*re,I(E,2*x+2*w+2)}for(x=0;x<_;x++)E[x]=E[2*x+1]<<16|E[2*x];for(x=_;x<2*_;x++)E[x]=0;return new o(E,0)};function I(y,_){for(;(y[_]&65535)!=y[_];)y[_+1]+=y[_]>>>16,y[_]&=65535,_++}function b(y,_){this.g=y,this.h=_}function S(y,_){if(v(_))throw Error("division by zero");if(v(y))return new b(d,d);if(R(y))return _=S(T(y),_),new b(T(_.g),T(_.h));if(R(_))return _=S(y,T(_)),new b(T(_.g),_.h);if(30<y.g.length){if(R(y)||R(_))throw Error("slowDivide_ only works with positive integers.");for(var E=p,x=_;0>=x.l(y);)E=B(E),x=B(x);var w=O(E,1),D=O(x,1);for(x=O(x,2),E=O(E,2);!v(x);){var A=D.add(x);0>=A.l(y)&&(w=w.add(E),D=A),x=O(x,1),E=O(E,1)}return _=k(y,w.j(_)),new b(w,_)}for(w=d;0<=y.l(_);){for(E=Math.max(1,Math.floor(y.m()/_.m())),x=Math.ceil(Math.log(E)/Math.LN2),x=48>=x?1:Math.pow(2,x-48),D=u(E),A=D.j(_);R(A)||0<A.l(y);)E-=x,D=u(E),A=D.j(_);v(D)&&(D=p),w=w.add(D),y=k(y,A)}return new b(w,y)}t.A=function(y){return S(this,y).h},t.and=function(y){for(var _=Math.max(this.g.length,y.g.length),E=[],x=0;x<_;x++)E[x]=this.i(x)&y.i(x);return new o(E,this.h&y.h)},t.or=function(y){for(var _=Math.max(this.g.length,y.g.length),E=[],x=0;x<_;x++)E[x]=this.i(x)|y.i(x);return new o(E,this.h|y.h)},t.xor=function(y){for(var _=Math.max(this.g.length,y.g.length),E=[],x=0;x<_;x++)E[x]=this.i(x)^y.i(x);return new o(E,this.h^y.h)};function B(y){for(var _=y.g.length+1,E=[],x=0;x<_;x++)E[x]=y.i(x)<<1|y.i(x-1)>>>31;return new o(E,y.h)}function O(y,_){var E=_>>5;_%=32;for(var x=y.g.length-E,w=[],D=0;D<x;D++)w[D]=0<_?y.i(D+E)>>>_|y.i(D+E+1)<<32-_:y.i(D+E);return new o(w,y.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Wm=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=h,Tr=o}).apply(typeof Pf<"u"?Pf:typeof self<"u"?self:typeof window<"u"?window:{});var uo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Km,Ws,Gm,Io,Sl,Qm,Xm,Ym;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,f,g){return a==Array.prototype||a==Object.prototype||(a[f]=g.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof uo=="object"&&uo];for(var f=0;f<a.length;++f){var g=a[f];if(g&&g.Math==Math)return g}throw Error("Cannot find global object")}var r=n(this);function s(a,f){if(f)e:{var g=r;a=a.split(".");for(var C=0;C<a.length-1;C++){var V=a[C];if(!(V in g))break e;g=g[V]}a=a[a.length-1],C=g[a],f=f(C),f!=C&&f!=null&&e(g,a,{configurable:!0,writable:!0,value:f})}}function i(a,f){a instanceof String&&(a+="");var g=0,C=!1,V={next:function(){if(!C&&g<a.length){var L=g++;return{value:f(L,a[L]),done:!1}}return C=!0,{done:!0,value:void 0}}};return V[Symbol.iterator]=function(){return V},V}s("Array.prototype.values",function(a){return a||function(){return i(this,function(f,g){return g})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function l(a){var f=typeof a;return f=f!="object"?f:a?Array.isArray(a)?"array":f:"null",f=="array"||f=="object"&&typeof a.length=="number"}function u(a){var f=typeof a;return f=="object"&&a!=null||f=="function"}function h(a,f,g){return a.call.apply(a.bind,arguments)}function d(a,f,g){if(!a)throw Error();if(2<arguments.length){var C=Array.prototype.slice.call(arguments,2);return function(){var V=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(V,C),a.apply(f,V)}}return function(){return a.apply(f,arguments)}}function p(a,f,g){return p=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:d,p.apply(null,arguments)}function m(a,f){var g=Array.prototype.slice.call(arguments,1);return function(){var C=g.slice();return C.push.apply(C,arguments),a.apply(this,C)}}function v(a,f){function g(){}g.prototype=f.prototype,a.aa=f.prototype,a.prototype=new g,a.prototype.constructor=a,a.Qb=function(C,V,L){for(var te=Array(arguments.length-2),Ue=2;Ue<arguments.length;Ue++)te[Ue-2]=arguments[Ue];return f.prototype[V].apply(C,te)}}function R(a){const f=a.length;if(0<f){const g=Array(f);for(let C=0;C<f;C++)g[C]=a[C];return g}return[]}function T(a,f){for(let g=1;g<arguments.length;g++){const C=arguments[g];if(l(C)){const V=a.length||0,L=C.length||0;a.length=V+L;for(let te=0;te<L;te++)a[V+te]=C[te]}else a.push(C)}}class k{constructor(f,g){this.i=f,this.j=g,this.h=0,this.g=null}get(){let f;return 0<this.h?(this.h--,f=this.g,this.g=f.next,f.next=null):f=this.i(),f}}function I(a){return/^[\s\xa0]*$/.test(a)}function b(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function S(a){return S[" "](a),a}S[" "]=function(){};var B=b().indexOf("Gecko")!=-1&&!(b().toLowerCase().indexOf("webkit")!=-1&&b().indexOf("Edge")==-1)&&!(b().indexOf("Trident")!=-1||b().indexOf("MSIE")!=-1)&&b().indexOf("Edge")==-1;function O(a,f,g){for(const C in a)f.call(g,a[C],C,a)}function y(a,f){for(const g in a)f.call(void 0,a[g],g,a)}function _(a){const f={};for(const g in a)f[g]=a[g];return f}const E="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function x(a,f){let g,C;for(let V=1;V<arguments.length;V++){C=arguments[V];for(g in C)a[g]=C[g];for(let L=0;L<E.length;L++)g=E[L],Object.prototype.hasOwnProperty.call(C,g)&&(a[g]=C[g])}}function w(a){var f=1;a=a.split(":");const g=[];for(;0<f&&a.length;)g.push(a.shift()),f--;return a.length&&g.push(a.join(":")),g}function D(a){c.setTimeout(()=>{throw a},0)}function A(){var a=Ie;let f=null;return a.g&&(f=a.g,a.g=a.g.next,a.g||(a.h=null),f.next=null),f}class re{constructor(){this.h=this.g=null}add(f,g){const C=le.get();C.set(f,g),this.h?this.h.next=C:this.g=C,this.h=C}}var le=new k(()=>new ae,a=>a.reset());class ae{constructor(){this.next=this.g=this.h=null}set(f,g){this.h=f,this.g=g,this.next=null}reset(){this.next=this.g=this.h=null}}let se,ce=!1,Ie=new re,Ce=()=>{const a=c.Promise.resolve(void 0);se=()=>{a.then(U)}};var U=()=>{for(var a;a=A();){try{a.h.call(a.g)}catch(g){D(g)}var f=le;f.j(a),100>f.h&&(f.h++,a.next=f.g,f.g=a)}ce=!1};function H(){this.s=this.s,this.C=this.C}H.prototype.s=!1,H.prototype.ma=function(){this.s||(this.s=!0,this.N())},H.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function q(a,f){this.type=a,this.g=this.target=f,this.defaultPrevented=!1}q.prototype.h=function(){this.defaultPrevented=!0};var K=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,f=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const g=()=>{};c.addEventListener("test",g,f),c.removeEventListener("test",g,f)}catch{}return a}();function Pe(a,f){if(q.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var g=this.type=a.type,C=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=f,f=a.relatedTarget){if(B){e:{try{S(f.nodeName);var V=!0;break e}catch{}V=!1}V||(f=null)}}else g=="mouseover"?f=a.fromElement:g=="mouseout"&&(f=a.toElement);this.relatedTarget=f,C?(this.clientX=C.clientX!==void 0?C.clientX:C.pageX,this.clientY=C.clientY!==void 0?C.clientY:C.pageY,this.screenX=C.screenX||0,this.screenY=C.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Te[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Pe.aa.h.call(this)}}v(Pe,q);var Te={2:"touch",3:"pen",4:"mouse"};Pe.prototype.h=function(){Pe.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var M="closure_listenable_"+(1e6*Math.random()|0),G=0;function ne(a,f,g,C,V){this.listener=a,this.proxy=null,this.src=f,this.type=g,this.capture=!!C,this.ha=V,this.key=++G,this.da=this.fa=!1}function ie(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function be(a){this.src=a,this.g={},this.h=0}be.prototype.add=function(a,f,g,C,V){var L=a.toString();a=this.g[L],a||(a=this.g[L]=[],this.h++);var te=F(a,f,C,V);return-1<te?(f=a[te],g||(f.fa=!1)):(f=new ne(f,this.src,L,!!C,V),f.fa=g,a.push(f)),f};function P(a,f){var g=f.type;if(g in a.g){var C=a.g[g],V=Array.prototype.indexOf.call(C,f,void 0),L;(L=0<=V)&&Array.prototype.splice.call(C,V,1),L&&(ie(f),a.g[g].length==0&&(delete a.g[g],a.h--))}}function F(a,f,g,C){for(var V=0;V<a.length;++V){var L=a[V];if(!L.da&&L.listener==f&&L.capture==!!g&&L.ha==C)return V}return-1}var N="closure_lm_"+(1e6*Math.random()|0),$={};function z(a,f,g,C,V){if(Array.isArray(f)){for(var L=0;L<f.length;L++)z(a,f[L],g,C,V);return null}return g=de(g),a&&a[M]?a.K(f,g,u(C)?!!C.capture:!!C,V):j(a,f,g,!1,C,V)}function j(a,f,g,C,V,L){if(!f)throw Error("Invalid event type");var te=u(V)?!!V.capture:!!V,Ue=Z(a);if(Ue||(a[N]=Ue=new be(a)),g=Ue.add(f,g,C,te,L),g.proxy)return g;if(C=ee(),g.proxy=C,C.src=a,C.listener=g,a.addEventListener)K||(V=te),V===void 0&&(V=!1),a.addEventListener(f.toString(),C,V);else if(a.attachEvent)a.attachEvent(Q(f.toString()),C);else if(a.addListener&&a.removeListener)a.addListener(C);else throw Error("addEventListener and attachEvent are unavailable.");return g}function ee(){function a(g){return f.call(a.src,a.listener,g)}const f=ue;return a}function J(a,f,g,C,V){if(Array.isArray(f))for(var L=0;L<f.length;L++)J(a,f[L],g,C,V);else C=u(C)?!!C.capture:!!C,g=de(g),a&&a[M]?(a=a.i,f=String(f).toString(),f in a.g&&(L=a.g[f],g=F(L,g,C,V),-1<g&&(ie(L[g]),Array.prototype.splice.call(L,g,1),L.length==0&&(delete a.g[f],a.h--)))):a&&(a=Z(a))&&(f=a.g[f.toString()],a=-1,f&&(a=F(f,g,C,V)),(g=-1<a?f[a]:null)&&Y(g))}function Y(a){if(typeof a!="number"&&a&&!a.da){var f=a.src;if(f&&f[M])P(f.i,a);else{var g=a.type,C=a.proxy;f.removeEventListener?f.removeEventListener(g,C,a.capture):f.detachEvent?f.detachEvent(Q(g),C):f.addListener&&f.removeListener&&f.removeListener(C),(g=Z(f))?(P(g,a),g.h==0&&(g.src=null,f[N]=null)):ie(a)}}}function Q(a){return a in $?$[a]:$[a]="on"+a}function ue(a,f){if(a.da)a=!0;else{f=new Pe(f,this);var g=a.listener,C=a.ha||a.src;a.fa&&Y(a),a=g.call(C,f)}return a}function Z(a){return a=a[N],a instanceof be?a:null}var he="__closure_events_fn_"+(1e9*Math.random()>>>0);function de(a){return typeof a=="function"?a:(a[he]||(a[he]=function(f){return a.handleEvent(f)}),a[he])}function fe(){H.call(this),this.i=new be(this),this.M=this,this.F=null}v(fe,H),fe.prototype[M]=!0,fe.prototype.removeEventListener=function(a,f,g,C){J(this,a,f,g,C)};function me(a,f){var g,C=a.F;if(C)for(g=[];C;C=C.F)g.push(C);if(a=a.M,C=f.type||f,typeof f=="string")f=new q(f,a);else if(f instanceof q)f.target=f.target||a;else{var V=f;f=new q(C,a),x(f,V)}if(V=!0,g)for(var L=g.length-1;0<=L;L--){var te=f.g=g[L];V=Re(te,C,!0,f)&&V}if(te=f.g=a,V=Re(te,C,!0,f)&&V,V=Re(te,C,!1,f)&&V,g)for(L=0;L<g.length;L++)te=f.g=g[L],V=Re(te,C,!1,f)&&V}fe.prototype.N=function(){if(fe.aa.N.call(this),this.i){var a=this.i,f;for(f in a.g){for(var g=a.g[f],C=0;C<g.length;C++)ie(g[C]);delete a.g[f],a.h--}}this.F=null},fe.prototype.K=function(a,f,g,C){return this.i.add(String(a),f,!1,g,C)},fe.prototype.L=function(a,f,g,C){return this.i.add(String(a),f,!0,g,C)};function Re(a,f,g,C){if(f=a.i.g[String(f)],!f)return!0;f=f.concat();for(var V=!0,L=0;L<f.length;++L){var te=f[L];if(te&&!te.da&&te.capture==g){var Ue=te.listener,ht=te.ha||te.src;te.fa&&P(a.i,te),V=Ue.call(ht,C)!==!1&&V}}return V&&!C.defaultPrevented}function et(a,f,g){if(typeof a=="function")g&&(a=p(a,g));else if(a&&typeof a.handleEvent=="function")a=p(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(f)?-1:c.setTimeout(a,f||0)}function Ye(a){a.g=et(()=>{a.g=null,a.i&&(a.i=!1,Ye(a))},a.l);const f=a.h;a.h=null,a.m.apply(null,f)}class tt extends H{constructor(f,g){super(),this.m=f,this.l=g,this.h=null,this.i=!1,this.g=null}j(f){this.h=arguments,this.g?this.i=!0:Ye(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function We(a){H.call(this),this.h=a,this.g={}}v(We,H);var Yt=[];function Bn(a){O(a.g,function(f,g){this.g.hasOwnProperty(g)&&Y(f)},a),a.g={}}We.prototype.N=function(){We.aa.N.call(this),Bn(this)},We.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Je=c.JSON.stringify,Rt=c.JSON.parse,$r=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Hr(){}Hr.prototype.h=null;function Hi(a){return a.h||(a.h=a.i())}function Ds(){}var cr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function qr(){q.call(this,"d")}v(qr,q);function Ps(){q.call(this,"c")}v(Ps,q);var pn={},qi=null;function lr(){return qi=qi||new fe}pn.La="serverreachability";function ji(a){q.call(this,pn.La,a)}v(ji,q);function ur(a){const f=lr();me(f,new ji(f))}pn.STAT_EVENT="statevent";function Fs(a,f){q.call(this,pn.STAT_EVENT,a),this.stat=f}v(Fs,q);function ut(a){const f=lr();me(f,new Fs(f,a))}pn.Ma="timingevent";function ks(a,f){q.call(this,pn.Ma,a),this.size=f}v(ks,q);function nt(a,f){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},f)}function St(){this.g=!0}St.prototype.xa=function(){this.g=!1};function zi(a,f,g,C,V,L){a.info(function(){if(a.g)if(L)for(var te="",Ue=L.split("&"),ht=0;ht<Ue.length;ht++){var Oe=Ue[ht].split("=");if(1<Oe.length){var mt=Oe[0];Oe=Oe[1];var _t=mt.split("_");te=2<=_t.length&&_t[1]=="type"?te+(mt+"="+Oe+"&"):te+(mt+"=redacted&")}}else te=null;else te=L;return"XMLHTTP REQ ("+C+") [attempt "+V+"]: "+f+`
`+g+`
`+te})}function mc(a,f,g,C,V,L,te){a.info(function(){return"XMLHTTP RESP ("+C+") [ attempt "+V+"]: "+f+`
`+g+`
`+L+" "+te})}function jr(a,f,g,C){a.info(function(){return"XMLHTTP TEXT ("+f+"): "+Ax(a,g)+(C?" "+C:"")})}function Ex(a,f){a.info(function(){return"TIMEOUT: "+f})}St.prototype.info=function(){};function Ax(a,f){if(!a.g)return f;if(!f)return null;try{var g=JSON.parse(f);if(g){for(a=0;a<g.length;a++)if(Array.isArray(g[a])){var C=g[a];if(!(2>C.length)){var V=C[1];if(Array.isArray(V)&&!(1>V.length)){var L=V[0];if(L!="noop"&&L!="stop"&&L!="close")for(var te=1;te<V.length;te++)V[te]=""}}}}return Je(g)}catch{return f}}var Wi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},m0={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},_c;function Ki(){}v(Ki,Hr),Ki.prototype.g=function(){return new XMLHttpRequest},Ki.prototype.i=function(){return{}},_c=new Ki;function On(a,f,g,C){this.j=a,this.i=f,this.l=g,this.R=C||1,this.U=new We(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new _0}function _0(){this.i=null,this.g="",this.h=!1}var x0={},xc={};function vc(a,f,g){a.L=1,a.v=Yi(gn(f)),a.m=g,a.P=!0,v0(a,null)}function v0(a,f){a.F=Date.now(),Gi(a),a.A=gn(a.v);var g=a.A,C=a.R;Array.isArray(C)||(C=[String(C)]),k0(g.i,"t",C),a.C=0,g=a.j.J,a.h=new _0,a.g=Y0(a.j,g?f:null,!a.m),0<a.O&&(a.M=new tt(p(a.Y,a,a.g),a.O)),f=a.U,g=a.g,C=a.ca;var V="readystatechange";Array.isArray(V)||(V&&(Yt[0]=V.toString()),V=Yt);for(var L=0;L<V.length;L++){var te=z(g,V[L],C||f.handleEvent,!1,f.h||f);if(!te)break;f.g[te.key]=te}f=a.H?_(a.H):{},a.m?(a.u||(a.u="POST"),f["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,f)):(a.u="GET",a.g.ea(a.A,a.u,null,f)),ur(),zi(a.i,a.u,a.A,a.l,a.R,a.m)}On.prototype.ca=function(a){a=a.target;const f=this.M;f&&mn(a)==3?f.j():this.Y(a)},On.prototype.Y=function(a){try{if(a==this.g)e:{const _t=mn(this.g);var f=this.g.Ba();const Kr=this.g.Z();if(!(3>_t)&&(_t!=3||this.g&&(this.h.h||this.g.oa()||U0(this.g)))){this.J||_t!=4||f==7||(f==8||0>=Kr?ur(3):ur(2)),yc(this);var g=this.g.Z();this.X=g;t:if(y0(this)){var C=U0(this.g);a="";var V=C.length,L=mn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){hr(this),Bs(this);var te="";break t}this.h.i=new c.TextDecoder}for(f=0;f<V;f++)this.h.h=!0,a+=this.h.i.decode(C[f],{stream:!(L&&f==V-1)});C.length=0,this.h.g+=a,this.C=0,te=this.h.g}else te=this.g.oa();if(this.o=g==200,mc(this.i,this.u,this.A,this.l,this.R,_t,g),this.o){if(this.T&&!this.K){t:{if(this.g){var Ue,ht=this.g;if((Ue=ht.g?ht.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!I(Ue)){var Oe=Ue;break t}}Oe=null}if(g=Oe)jr(this.i,this.l,g,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ec(this,g);else{this.o=!1,this.s=3,ut(12),hr(this),Bs(this);break e}}if(this.P){g=!0;let qt;for(;!this.J&&this.C<te.length;)if(qt=wx(this,te),qt==xc){_t==4&&(this.s=4,ut(14),g=!1),jr(this.i,this.l,null,"[Incomplete Response]");break}else if(qt==x0){this.s=4,ut(15),jr(this.i,this.l,te,"[Invalid Chunk]"),g=!1;break}else jr(this.i,this.l,qt,null),Ec(this,qt);if(y0(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),_t!=4||te.length!=0||this.h.h||(this.s=1,ut(16),g=!1),this.o=this.o&&g,!g)jr(this.i,this.l,te,"[Invalid Chunked Response]"),hr(this),Bs(this);else if(0<te.length&&!this.W){this.W=!0;var mt=this.j;mt.g==this&&mt.ba&&!mt.M&&(mt.j.info("Great, no buffering proxy detected. Bytes received: "+te.length),bc(mt),mt.M=!0,ut(11))}}else jr(this.i,this.l,te,null),Ec(this,te);_t==4&&hr(this),this.o&&!this.J&&(_t==4?K0(this.j,this):(this.o=!1,Gi(this)))}else Ux(this.g),g==400&&0<te.indexOf("Unknown SID")?(this.s=3,ut(12)):(this.s=0,ut(13)),hr(this),Bs(this)}}}catch{}finally{}};function y0(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function wx(a,f){var g=a.C,C=f.indexOf(`
`,g);return C==-1?xc:(g=Number(f.substring(g,C)),isNaN(g)?x0:(C+=1,C+g>f.length?xc:(f=f.slice(C,C+g),a.C=C+g,f)))}On.prototype.cancel=function(){this.J=!0,hr(this)};function Gi(a){a.S=Date.now()+a.I,E0(a,a.I)}function E0(a,f){if(a.B!=null)throw Error("WatchDog timer not null");a.B=nt(p(a.ba,a),f)}function yc(a){a.B&&(c.clearTimeout(a.B),a.B=null)}On.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Ex(this.i,this.A),this.L!=2&&(ur(),ut(17)),hr(this),this.s=2,Bs(this)):E0(this,this.S-a)};function Bs(a){a.j.G==0||a.J||K0(a.j,a)}function hr(a){yc(a);var f=a.M;f&&typeof f.ma=="function"&&f.ma(),a.M=null,Bn(a.U),a.g&&(f=a.g,a.g=null,f.abort(),f.ma())}function Ec(a,f){try{var g=a.j;if(g.G!=0&&(g.g==a||Ac(g.h,a))){if(!a.K&&Ac(g.h,a)&&g.G==3){try{var C=g.Da.g.parse(f)}catch{C=null}if(Array.isArray(C)&&C.length==3){var V=C;if(V[0]==0){e:if(!g.u){if(g.g)if(g.g.F+3e3<a.F)ro(g),to(g);else break e;Cc(g),ut(18)}}else g.za=V[1],0<g.za-g.T&&37500>V[2]&&g.F&&g.v==0&&!g.C&&(g.C=nt(p(g.Za,g),6e3));if(1>=T0(g.h)&&g.ca){try{g.ca()}catch{}g.ca=void 0}}else dr(g,11)}else if((a.K||g.g==a)&&ro(g),!I(f))for(V=g.Da.g.parse(f),f=0;f<V.length;f++){let Oe=V[f];if(g.T=Oe[0],Oe=Oe[1],g.G==2)if(Oe[0]=="c"){g.K=Oe[1],g.ia=Oe[2];const mt=Oe[3];mt!=null&&(g.la=mt,g.j.info("VER="+g.la));const _t=Oe[4];_t!=null&&(g.Aa=_t,g.j.info("SVER="+g.Aa));const Kr=Oe[5];Kr!=null&&typeof Kr=="number"&&0<Kr&&(C=1.5*Kr,g.L=C,g.j.info("backChannelRequestTimeoutMs_="+C)),C=g;const qt=a.g;if(qt){const io=qt.g?qt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(io){var L=C.h;L.g||io.indexOf("spdy")==-1&&io.indexOf("quic")==-1&&io.indexOf("h2")==-1||(L.j=L.l,L.g=new Set,L.h&&(wc(L,L.h),L.h=null))}if(C.D){const Rc=qt.g?qt.g.getResponseHeader("X-HTTP-Session-Id"):null;Rc&&(C.ya=Rc,qe(C.I,C.D,Rc))}}g.G=3,g.l&&g.l.ua(),g.ba&&(g.R=Date.now()-a.F,g.j.info("Handshake RTT: "+g.R+"ms")),C=g;var te=a;if(C.qa=X0(C,C.J?C.ia:null,C.W),te.K){I0(C.h,te);var Ue=te,ht=C.L;ht&&(Ue.I=ht),Ue.B&&(yc(Ue),Gi(Ue)),C.g=te}else z0(C);0<g.i.length&&no(g)}else Oe[0]!="stop"&&Oe[0]!="close"||dr(g,7);else g.G==3&&(Oe[0]=="stop"||Oe[0]=="close"?Oe[0]=="stop"?dr(g,7):Ic(g):Oe[0]!="noop"&&g.l&&g.l.ta(Oe),g.v=0)}}ur(4)}catch{}}var Tx=class{constructor(a,f){this.g=a,this.map=f}};function A0(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function w0(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function T0(a){return a.h?1:a.g?a.g.size:0}function Ac(a,f){return a.h?a.h==f:a.g?a.g.has(f):!1}function wc(a,f){a.g?a.g.add(f):a.h=f}function I0(a,f){a.h&&a.h==f?a.h=null:a.g&&a.g.has(f)&&a.g.delete(f)}A0.prototype.cancel=function(){if(this.i=C0(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function C0(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let f=a.i;for(const g of a.g.values())f=f.concat(g.D);return f}return R(a.i)}function Ix(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(l(a)){for(var f=[],g=a.length,C=0;C<g;C++)f.push(a[C]);return f}f=[],g=0;for(C in a)f[g++]=a[C];return f}function Cx(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(l(a)||typeof a=="string"){var f=[];a=a.length;for(var g=0;g<a;g++)f.push(g);return f}f=[],g=0;for(const C in a)f[g++]=C;return f}}}function b0(a,f){if(a.forEach&&typeof a.forEach=="function")a.forEach(f,void 0);else if(l(a)||typeof a=="string")Array.prototype.forEach.call(a,f,void 0);else for(var g=Cx(a),C=Ix(a),V=C.length,L=0;L<V;L++)f.call(void 0,C[L],g&&g[L],a)}var R0=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function bx(a,f){if(a){a=a.split("&");for(var g=0;g<a.length;g++){var C=a[g].indexOf("="),V=null;if(0<=C){var L=a[g].substring(0,C);V=a[g].substring(C+1)}else L=a[g];f(L,V?decodeURIComponent(V.replace(/\+/g," ")):"")}}}function fr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof fr){this.h=a.h,Qi(this,a.j),this.o=a.o,this.g=a.g,Xi(this,a.s),this.l=a.l;var f=a.i,g=new Vs;g.i=f.i,f.g&&(g.g=new Map(f.g),g.h=f.h),S0(this,g),this.m=a.m}else a&&(f=String(a).match(R0))?(this.h=!1,Qi(this,f[1]||"",!0),this.o=Os(f[2]||""),this.g=Os(f[3]||"",!0),Xi(this,f[4]),this.l=Os(f[5]||"",!0),S0(this,f[6]||"",!0),this.m=Os(f[7]||"")):(this.h=!1,this.i=new Vs(null,this.h))}fr.prototype.toString=function(){var a=[],f=this.j;f&&a.push(Ns(f,D0,!0),":");var g=this.g;return(g||f=="file")&&(a.push("//"),(f=this.o)&&a.push(Ns(f,D0,!0),"@"),a.push(encodeURIComponent(String(g)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),g=this.s,g!=null&&a.push(":",String(g))),(g=this.l)&&(this.g&&g.charAt(0)!="/"&&a.push("/"),a.push(Ns(g,g.charAt(0)=="/"?Dx:Sx,!0))),(g=this.i.toString())&&a.push("?",g),(g=this.m)&&a.push("#",Ns(g,Fx)),a.join("")};function gn(a){return new fr(a)}function Qi(a,f,g){a.j=g?Os(f,!0):f,a.j&&(a.j=a.j.replace(/:$/,""))}function Xi(a,f){if(f){if(f=Number(f),isNaN(f)||0>f)throw Error("Bad port number "+f);a.s=f}else a.s=null}function S0(a,f,g){f instanceof Vs?(a.i=f,kx(a.i,a.h)):(g||(f=Ns(f,Px)),a.i=new Vs(f,a.h))}function qe(a,f,g){a.i.set(f,g)}function Yi(a){return qe(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Os(a,f){return a?f?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Ns(a,f,g){return typeof a=="string"?(a=encodeURI(a).replace(f,Rx),g&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Rx(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var D0=/[#\/\?@]/g,Sx=/[#\?:]/g,Dx=/[#\?]/g,Px=/[#\?@]/g,Fx=/#/g;function Vs(a,f){this.h=this.g=null,this.i=a||null,this.j=!!f}function Nn(a){a.g||(a.g=new Map,a.h=0,a.i&&bx(a.i,function(f,g){a.add(decodeURIComponent(f.replace(/\+/g," ")),g)}))}t=Vs.prototype,t.add=function(a,f){Nn(this),this.i=null,a=zr(this,a);var g=this.g.get(a);return g||this.g.set(a,g=[]),g.push(f),this.h+=1,this};function P0(a,f){Nn(a),f=zr(a,f),a.g.has(f)&&(a.i=null,a.h-=a.g.get(f).length,a.g.delete(f))}function F0(a,f){return Nn(a),f=zr(a,f),a.g.has(f)}t.forEach=function(a,f){Nn(this),this.g.forEach(function(g,C){g.forEach(function(V){a.call(f,V,C,this)},this)},this)},t.na=function(){Nn(this);const a=Array.from(this.g.values()),f=Array.from(this.g.keys()),g=[];for(let C=0;C<f.length;C++){const V=a[C];for(let L=0;L<V.length;L++)g.push(f[C])}return g},t.V=function(a){Nn(this);let f=[];if(typeof a=="string")F0(this,a)&&(f=f.concat(this.g.get(zr(this,a))));else{a=Array.from(this.g.values());for(let g=0;g<a.length;g++)f=f.concat(a[g])}return f},t.set=function(a,f){return Nn(this),this.i=null,a=zr(this,a),F0(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[f]),this.h+=1,this},t.get=function(a,f){return a?(a=this.V(a),0<a.length?String(a[0]):f):f};function k0(a,f,g){P0(a,f),0<g.length&&(a.i=null,a.g.set(zr(a,f),R(g)),a.h+=g.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],f=Array.from(this.g.keys());for(var g=0;g<f.length;g++){var C=f[g];const L=encodeURIComponent(String(C)),te=this.V(C);for(C=0;C<te.length;C++){var V=L;te[C]!==""&&(V+="="+encodeURIComponent(String(te[C]))),a.push(V)}}return this.i=a.join("&")};function zr(a,f){return f=String(f),a.j&&(f=f.toLowerCase()),f}function kx(a,f){f&&!a.j&&(Nn(a),a.i=null,a.g.forEach(function(g,C){var V=C.toLowerCase();C!=V&&(P0(this,C),k0(this,V,g))},a)),a.j=f}function Bx(a,f){const g=new St;if(c.Image){const C=new Image;C.onload=m(Vn,g,"TestLoadImage: loaded",!0,f,C),C.onerror=m(Vn,g,"TestLoadImage: error",!1,f,C),C.onabort=m(Vn,g,"TestLoadImage: abort",!1,f,C),C.ontimeout=m(Vn,g,"TestLoadImage: timeout",!1,f,C),c.setTimeout(function(){C.ontimeout&&C.ontimeout()},1e4),C.src=a}else f(!1)}function Ox(a,f){const g=new St,C=new AbortController,V=setTimeout(()=>{C.abort(),Vn(g,"TestPingServer: timeout",!1,f)},1e4);fetch(a,{signal:C.signal}).then(L=>{clearTimeout(V),L.ok?Vn(g,"TestPingServer: ok",!0,f):Vn(g,"TestPingServer: server error",!1,f)}).catch(()=>{clearTimeout(V),Vn(g,"TestPingServer: error",!1,f)})}function Vn(a,f,g,C,V){try{V&&(V.onload=null,V.onerror=null,V.onabort=null,V.ontimeout=null),C(g)}catch{}}function Nx(){this.g=new $r}function Vx(a,f,g){const C=g||"";try{b0(a,function(V,L){let te=V;u(V)&&(te=Je(V)),f.push(C+L+"="+encodeURIComponent(te))})}catch(V){throw f.push(C+"type="+encodeURIComponent("_badmap")),V}}function Ji(a){this.l=a.Ub||null,this.j=a.eb||!1}v(Ji,Hr),Ji.prototype.g=function(){return new Zi(this.l,this.j)},Ji.prototype.i=function(a){return function(){return a}}({});function Zi(a,f){fe.call(this),this.D=a,this.o=f,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}v(Zi,fe),t=Zi.prototype,t.open=function(a,f){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=f,this.readyState=1,Ms(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const f={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(f.body=a),(this.D||c).fetch(new Request(this.A,f)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ls(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ms(this)),this.g&&(this.readyState=3,Ms(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;B0(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function B0(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var f=a.value?a.value:new Uint8Array(0);(f=this.v.decode(f,{stream:!a.done}))&&(this.response=this.responseText+=f)}a.done?Ls(this):Ms(this),this.readyState==3&&B0(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,Ls(this))},t.Qa=function(a){this.g&&(this.response=a,Ls(this))},t.ga=function(){this.g&&Ls(this)};function Ls(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Ms(a)}t.setRequestHeader=function(a,f){this.u.append(a,f)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],f=this.h.entries();for(var g=f.next();!g.done;)g=g.value,a.push(g[0]+": "+g[1]),g=f.next();return a.join(`\r
`)};function Ms(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Zi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function O0(a){let f="";return O(a,function(g,C){f+=C,f+=":",f+=g,f+=`\r
`}),f}function Tc(a,f,g){e:{for(C in g){var C=!1;break e}C=!0}C||(g=O0(g),typeof a=="string"?g!=null&&encodeURIComponent(String(g)):qe(a,f,g))}function Ke(a){fe.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}v(Ke,fe);var Lx=/^https?$/i,Mx=["POST","PUT"];t=Ke.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,f,g,C){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);f=f?f.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():_c.g(),this.v=this.o?Hi(this.o):Hi(_c),this.g.onreadystatechange=p(this.Ea,this);try{this.B=!0,this.g.open(f,String(a),!0),this.B=!1}catch(L){N0(this,L);return}if(a=g||"",g=new Map(this.headers),C)if(Object.getPrototypeOf(C)===Object.prototype)for(var V in C)g.set(V,C[V]);else if(typeof C.keys=="function"&&typeof C.get=="function")for(const L of C.keys())g.set(L,C.get(L));else throw Error("Unknown input type for opt_headers: "+String(C));C=Array.from(g.keys()).find(L=>L.toLowerCase()=="content-type"),V=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Mx,f,void 0))||C||V||g.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[L,te]of g)this.g.setRequestHeader(L,te);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{M0(this),this.u=!0,this.g.send(a),this.u=!1}catch(L){N0(this,L)}};function N0(a,f){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=f,a.m=5,V0(a),eo(a)}function V0(a){a.A||(a.A=!0,me(a,"complete"),me(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,me(this,"complete"),me(this,"abort"),eo(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),eo(this,!0)),Ke.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?L0(this):this.bb())},t.bb=function(){L0(this)};function L0(a){if(a.h&&typeof o<"u"&&(!a.v[1]||mn(a)!=4||a.Z()!=2)){if(a.u&&mn(a)==4)et(a.Ea,0,a);else if(me(a,"readystatechange"),mn(a)==4){a.h=!1;try{const te=a.Z();e:switch(te){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var f=!0;break e;default:f=!1}var g;if(!(g=f)){var C;if(C=te===0){var V=String(a.D).match(R0)[1]||null;!V&&c.self&&c.self.location&&(V=c.self.location.protocol.slice(0,-1)),C=!Lx.test(V?V.toLowerCase():"")}g=C}if(g)me(a,"complete"),me(a,"success");else{a.m=6;try{var L=2<mn(a)?a.g.statusText:""}catch{L=""}a.l=L+" ["+a.Z()+"]",V0(a)}}finally{eo(a)}}}}function eo(a,f){if(a.g){M0(a);const g=a.g,C=a.v[0]?()=>{}:null;a.g=null,a.v=null,f||me(a,"ready");try{g.onreadystatechange=C}catch{}}}function M0(a){a.I&&(c.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function mn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<mn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var f=this.g.responseText;return a&&f.indexOf(a)==0&&(f=f.substring(a.length)),Rt(f)}};function U0(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Ux(a){const f={};a=(a.g&&2<=mn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let C=0;C<a.length;C++){if(I(a[C]))continue;var g=w(a[C]);const V=g[0];if(g=g[1],typeof g!="string")continue;g=g.trim();const L=f[V]||[];f[V]=L,L.push(g)}y(f,function(C){return C.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Us(a,f,g){return g&&g.internalChannelParams&&g.internalChannelParams[a]||f}function $0(a){this.Aa=0,this.i=[],this.j=new St,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Us("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Us("baseRetryDelayMs",5e3,a),this.cb=Us("retryDelaySeedMs",1e4,a),this.Wa=Us("forwardChannelMaxRetries",2,a),this.wa=Us("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new A0(a&&a.concurrentRequestLimit),this.Da=new Nx,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=$0.prototype,t.la=8,t.G=1,t.connect=function(a,f,g,C){ut(0),this.W=a,this.H=f||{},g&&C!==void 0&&(this.H.OSID=g,this.H.OAID=C),this.F=this.X,this.I=X0(this,null,this.W),no(this)};function Ic(a){if(H0(a),a.G==3){var f=a.U++,g=gn(a.I);if(qe(g,"SID",a.K),qe(g,"RID",f),qe(g,"TYPE","terminate"),$s(a,g),f=new On(a,a.j,f),f.L=2,f.v=Yi(gn(g)),g=!1,c.navigator&&c.navigator.sendBeacon)try{g=c.navigator.sendBeacon(f.v.toString(),"")}catch{}!g&&c.Image&&(new Image().src=f.v,g=!0),g||(f.g=Y0(f.j,null),f.g.ea(f.v)),f.F=Date.now(),Gi(f)}Q0(a)}function to(a){a.g&&(bc(a),a.g.cancel(),a.g=null)}function H0(a){to(a),a.u&&(c.clearTimeout(a.u),a.u=null),ro(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function no(a){if(!w0(a.h)&&!a.s){a.s=!0;var f=a.Ga;se||Ce(),ce||(se(),ce=!0),Ie.add(f,a),a.B=0}}function $x(a,f){return T0(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=f.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=nt(p(a.Ga,a,f),G0(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const V=new On(this,this.j,a);let L=this.o;if(this.S&&(L?(L=_(L),x(L,this.S)):L=this.S),this.m!==null||this.O||(V.H=L,L=null),this.P)e:{for(var f=0,g=0;g<this.i.length;g++){t:{var C=this.i[g];if("__data__"in C.map&&(C=C.map.__data__,typeof C=="string")){C=C.length;break t}C=void 0}if(C===void 0)break;if(f+=C,4096<f){f=g;break e}if(f===4096||g===this.i.length-1){f=g+1;break e}}f=1e3}else f=1e3;f=j0(this,V,f),g=gn(this.I),qe(g,"RID",a),qe(g,"CVER",22),this.D&&qe(g,"X-HTTP-Session-Id",this.D),$s(this,g),L&&(this.O?f="headers="+encodeURIComponent(String(O0(L)))+"&"+f:this.m&&Tc(g,this.m,L)),wc(this.h,V),this.Ua&&qe(g,"TYPE","init"),this.P?(qe(g,"$req",f),qe(g,"SID","null"),V.T=!0,vc(V,g,null)):vc(V,g,f),this.G=2}}else this.G==3&&(a?q0(this,a):this.i.length==0||w0(this.h)||q0(this))};function q0(a,f){var g;f?g=f.l:g=a.U++;const C=gn(a.I);qe(C,"SID",a.K),qe(C,"RID",g),qe(C,"AID",a.T),$s(a,C),a.m&&a.o&&Tc(C,a.m,a.o),g=new On(a,a.j,g,a.B+1),a.m===null&&(g.H=a.o),f&&(a.i=f.D.concat(a.i)),f=j0(a,g,1e3),g.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),wc(a.h,g),vc(g,C,f)}function $s(a,f){a.H&&O(a.H,function(g,C){qe(f,C,g)}),a.l&&b0({},function(g,C){qe(f,C,g)})}function j0(a,f,g){g=Math.min(a.i.length,g);var C=a.l?p(a.l.Na,a.l,a):null;e:{var V=a.i;let L=-1;for(;;){const te=["count="+g];L==-1?0<g?(L=V[0].g,te.push("ofs="+L)):L=0:te.push("ofs="+L);let Ue=!0;for(let ht=0;ht<g;ht++){let Oe=V[ht].g;const mt=V[ht].map;if(Oe-=L,0>Oe)L=Math.max(0,V[ht].g-100),Ue=!1;else try{Vx(mt,te,"req"+Oe+"_")}catch{C&&C(mt)}}if(Ue){C=te.join("&");break e}}}return a=a.i.splice(0,g),f.D=a,C}function z0(a){if(!a.g&&!a.u){a.Y=1;var f=a.Fa;se||Ce(),ce||(se(),ce=!0),Ie.add(f,a),a.v=0}}function Cc(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=nt(p(a.Fa,a),G0(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,W0(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=nt(p(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ut(10),to(this),W0(this))};function bc(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function W0(a){a.g=new On(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var f=gn(a.qa);qe(f,"RID","rpc"),qe(f,"SID",a.K),qe(f,"AID",a.T),qe(f,"CI",a.F?"0":"1"),!a.F&&a.ja&&qe(f,"TO",a.ja),qe(f,"TYPE","xmlhttp"),$s(a,f),a.m&&a.o&&Tc(f,a.m,a.o),a.L&&(a.g.I=a.L);var g=a.g;a=a.ia,g.L=1,g.v=Yi(gn(f)),g.m=null,g.P=!0,v0(g,a)}t.Za=function(){this.C!=null&&(this.C=null,to(this),Cc(this),ut(19))};function ro(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function K0(a,f){var g=null;if(a.g==f){ro(a),bc(a),a.g=null;var C=2}else if(Ac(a.h,f))g=f.D,I0(a.h,f),C=1;else return;if(a.G!=0){if(f.o)if(C==1){g=f.m?f.m.length:0,f=Date.now()-f.F;var V=a.B;C=lr(),me(C,new ks(C,g)),no(a)}else z0(a);else if(V=f.s,V==3||V==0&&0<f.X||!(C==1&&$x(a,f)||C==2&&Cc(a)))switch(g&&0<g.length&&(f=a.h,f.i=f.i.concat(g)),V){case 1:dr(a,5);break;case 4:dr(a,10);break;case 3:dr(a,6);break;default:dr(a,2)}}}function G0(a,f){let g=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(g*=2),g*f}function dr(a,f){if(a.j.info("Error code "+f),f==2){var g=p(a.fb,a),C=a.Xa;const V=!C;C=new fr(C||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Qi(C,"https"),Yi(C),V?Bx(C.toString(),g):Ox(C.toString(),g)}else ut(2);a.G=0,a.l&&a.l.sa(f),Q0(a),H0(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),ut(2)):(this.j.info("Failed to ping google.com"),ut(1))};function Q0(a){if(a.G=0,a.ka=[],a.l){const f=C0(a.h);(f.length!=0||a.i.length!=0)&&(T(a.ka,f),T(a.ka,a.i),a.h.i.length=0,R(a.i),a.i.length=0),a.l.ra()}}function X0(a,f,g){var C=g instanceof fr?gn(g):new fr(g);if(C.g!="")f&&(C.g=f+"."+C.g),Xi(C,C.s);else{var V=c.location;C=V.protocol,f=f?f+"."+V.hostname:V.hostname,V=+V.port;var L=new fr(null);C&&Qi(L,C),f&&(L.g=f),V&&Xi(L,V),g&&(L.l=g),C=L}return g=a.D,f=a.ya,g&&f&&qe(C,g,f),qe(C,"VER",a.la),$s(a,C),C}function Y0(a,f,g){if(f&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return f=a.Ca&&!a.pa?new Ke(new Ji({eb:g})):new Ke(a.pa),f.Ha(a.J),f}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function J0(){}t=J0.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function so(){}so.prototype.g=function(a,f){return new Bt(a,f)};function Bt(a,f){fe.call(this),this.g=new $0(f),this.l=a,this.h=f&&f.messageUrlParams||null,a=f&&f.messageHeaders||null,f&&f.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=f&&f.initMessageHeaders||null,f&&f.messageContentType&&(a?a["X-WebChannel-Content-Type"]=f.messageContentType:a={"X-WebChannel-Content-Type":f.messageContentType}),f&&f.va&&(a?a["X-WebChannel-Client-Profile"]=f.va:a={"X-WebChannel-Client-Profile":f.va}),this.g.S=a,(a=f&&f.Sb)&&!I(a)&&(this.g.m=a),this.v=f&&f.supportsCrossDomainXhr||!1,this.u=f&&f.sendRawJson||!1,(f=f&&f.httpSessionIdParam)&&!I(f)&&(this.g.D=f,a=this.h,a!==null&&f in a&&(a=this.h,f in a&&delete a[f])),this.j=new Wr(this)}v(Bt,fe),Bt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Bt.prototype.close=function(){Ic(this.g)},Bt.prototype.o=function(a){var f=this.g;if(typeof a=="string"){var g={};g.__data__=a,a=g}else this.u&&(g={},g.__data__=Je(a),a=g);f.i.push(new Tx(f.Ya++,a)),f.G==3&&no(f)},Bt.prototype.N=function(){this.g.l=null,delete this.j,Ic(this.g),delete this.g,Bt.aa.N.call(this)};function Z0(a){qr.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var f=a.__sm__;if(f){e:{for(const g in f){a=g;break e}a=void 0}(this.i=a)&&(a=this.i,f=f!==null&&a in f?f[a]:void 0),this.data=f}else this.data=a}v(Z0,qr);function eh(){Ps.call(this),this.status=1}v(eh,Ps);function Wr(a){this.g=a}v(Wr,J0),Wr.prototype.ua=function(){me(this.g,"a")},Wr.prototype.ta=function(a){me(this.g,new Z0(a))},Wr.prototype.sa=function(a){me(this.g,new eh)},Wr.prototype.ra=function(){me(this.g,"b")},so.prototype.createWebChannel=so.prototype.g,Bt.prototype.send=Bt.prototype.o,Bt.prototype.open=Bt.prototype.m,Bt.prototype.close=Bt.prototype.close,Ym=function(){return new so},Xm=function(){return lr()},Qm=pn,Sl={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Wi.NO_ERROR=0,Wi.TIMEOUT=8,Wi.HTTP_ERROR=6,Io=Wi,m0.COMPLETE="complete",Gm=m0,Ds.EventType=cr,cr.OPEN="a",cr.CLOSE="b",cr.ERROR="c",cr.MESSAGE="d",fe.prototype.listen=fe.prototype.K,Ws=Ds,Ke.prototype.listenOnce=Ke.prototype.L,Ke.prototype.getLastError=Ke.prototype.Ka,Ke.prototype.getLastErrorCode=Ke.prototype.Ba,Ke.prototype.getStatus=Ke.prototype.Z,Ke.prototype.getResponseJson=Ke.prototype.Oa,Ke.prototype.getResponseText=Ke.prototype.oa,Ke.prototype.send=Ke.prototype.ea,Ke.prototype.setWithCredentials=Ke.prototype.Ha,Km=Ke}).apply(typeof uo<"u"?uo:typeof self<"u"?self:typeof window<"u"?window:{});const Ff="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}vt.UNAUTHENTICATED=new vt(null),vt.GOOGLE_CREDENTIALS=new vt("google-credentials-uid"),vt.FIRST_PARTY=new vt("first-party-uid"),vt.MOCK_USER=new vt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cs="11.0.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dr=new Xa("@firebase/firestore");function Zr(){return Dr.logLevel}function oe(t,...e){if(Dr.logLevel<=Se.DEBUG){const n=e.map(ku);Dr.debug(`Firestore (${Cs}): ${t}`,...n)}}function Pn(t,...e){if(Dr.logLevel<=Se.ERROR){const n=e.map(ku);Dr.error(`Firestore (${Cs}): ${t}`,...n)}}function _s(t,...e){if(Dr.logLevel<=Se.WARN){const n=e.map(ku);Dr.warn(`Firestore (${Cs}): ${t}`,...n)}}function ku(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(t="Unexpected state"){const e=`FIRESTORE (${Cs}) INTERNAL ASSERTION FAILED: `+t;throw Pn(e),new Error(e)}function Me(t,e){t||xe()}function Ee(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class pe extends Xt{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class _C{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(vt.UNAUTHENTICATED))}shutdown(){}}class xC{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class vC{constructor(e){this.t=e,this.currentUser=vt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Me(this.o===void 0);let r=this.i;const s=l=>this.i!==r?(r=this.i,n(l)):Promise.resolve();let i=new Jn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Jn,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},c=l=>{oe("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(oe("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Jn)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(oe("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Me(typeof r.accessToken=="string"),new Jm(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Me(e===null||typeof e=="string"),new vt(e)}}class yC{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=vt.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class EC{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new yC(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(vt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class AC{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class wC{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){Me(this.o===void 0);const r=i=>{i.error!=null&&oe("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,oe("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{oe("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):oe("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Me(typeof n.token=="string"),this.R=n.token,new AC(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TC(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zm{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=TC(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function Fe(t,e){return t<e?-1:t>e?1:0}function xs(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{static now(){return st.fromMillis(Date.now())}static fromDate(e){return st.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new st(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new pe(X.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new pe(X.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new pe(X.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new pe(X.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Fe(this.nanoseconds,e.nanoseconds):Fe(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{static fromTimestamp(e){return new ve(e)}static min(){return new ve(new st(0,0))}static max(){return new ve(new st(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(e,n,r){n===void 0?n=0:n>e.length&&xe(),r===void 0?r=e.length-n:r>e.length-n&&xe(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Ei.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Ei?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Ge extends Ei{construct(e,n,r){return new Ge(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new pe(X.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new Ge(n)}static emptyPath(){return new Ge([])}}const IC=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class pt extends Ei{construct(e,n,r){return new pt(e,n,r)}static isValidIdentifier(e){return IC.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),pt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new pt(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new pe(X.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new pe(X.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new pe(X.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new pe(X.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new pt(n)}static emptyPath(){return new pt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e){this.path=e}static fromPath(e){return new ge(Ge.fromString(e))}static fromName(e){return new ge(Ge.fromString(e).popFirst(5))}static empty(){return new ge(Ge.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ge.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Ge.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ge(new Ge(e.slice()))}}function CC(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=ve.fromTimestamp(r===1e9?new st(n+1,0):new st(n,r));return new Zn(s,ge.empty(),e)}function bC(t){return new Zn(t.readTime,t.key,-1)}class Zn{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Zn(ve.min(),ge.empty(),-1)}static max(){return new Zn(ve.max(),ge.empty(),-1)}}function RC(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=ge.comparator(t.documentKey,e.documentKey),n!==0?n:Fe(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SC="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class DC{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bs(t){if(t.code!==X.FAILED_PRECONDITION||t.message!==SC)throw t;oe("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&xe(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new W((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof W?n:W.resolve(n)}catch(n){return W.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):W.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):W.reject(n)}static resolve(e){return new W((n,r)=>{n(e)})}static reject(e){return new W((n,r)=>{r(e)})}static waitFor(e){return new W((n,r)=>{let s=0,i=0,o=!1;e.forEach(c=>{++s,c.next(()=>{++i,o&&i===s&&n()},l=>r(l))}),o=!0,i===s&&n()})}static or(e){let n=W.resolve(!1);for(const r of e)n=n.next(s=>s?W.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new W((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let l=0;l<i;l++){const u=l;n(e[u]).next(h=>{o[u]=h,++c,c===i&&r(o)},h=>s(h))}})}static doWhile(e,n){return new W((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function PC(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Rs(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}tc.oe=-1;function nc(t){return t==null}function Sa(t){return t===0&&1/t==-1/0}function FC(t){return typeof t=="number"&&Number.isInteger(t)&&!Sa(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kC(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=kf(e)),e=BC(t.get(n),e);return kf(e)}function BC(t,e){let n=e;const r=t.length;for(let s=0;s<r;s++){const i=t.charAt(s);switch(i){case"\0":n+="";break;case"":n+="";break;default:n+=i}}return n}function kf(t){return t+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bf(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Or(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function e_(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e,n){this.comparator=e,this.root=n||ft.EMPTY}insert(e,n){return new ze(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,ft.BLACK,null,null))}remove(e){return new ze(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ft.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ho(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ho(this.root,e,this.comparator,!1)}getReverseIterator(){return new ho(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ho(this.root,e,this.comparator,!0)}}class ho{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ft{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??ft.RED,this.left=s??ft.EMPTY,this.right=i??ft.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new ft(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ft.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return ft.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ft.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ft.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw xe();const e=this.left.check();if(e!==this.right.check())throw xe();return e+(this.isRed()?0:1)}}ft.EMPTY=null,ft.RED=!0,ft.BLACK=!1;ft.EMPTY=new class{constructor(){this.size=0}get key(){throw xe()}get value(){throw xe()}get color(){throw xe()}get left(){throw xe()}get right(){throw xe()}copy(e,n,r,s,i){return this}insert(e,n,r){return new ft(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(e){this.comparator=e,this.data=new ze(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Of(this.data.getIterator())}getIteratorFrom(e){return new Of(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof it)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new it(this.comparator);return n.data=e,n}}class Of{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(e){this.fields=e,e.sort(pt.comparator)}static empty(){return new jt([])}unionWith(e){let n=new it(pt.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new jt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return xs(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_ extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new t_("Invalid base64 string: "+i):i}}(e);return new gt(n)}static fromUint8Array(e){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new gt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Fe(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}gt.EMPTY_BYTE_STRING=new gt("");const OC=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function er(t){if(Me(!!t),typeof t=="string"){let e=0;const n=OC.exec(t);if(Me(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Qe(t.seconds),nanos:Qe(t.nanos)}}function Qe(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function tr(t){return typeof t=="string"?gt.fromBase64String(t):gt.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bu(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function rc(t){const e=t.mapValue.fields.__previous_value__;return Bu(e)?rc(e):e}function Ai(t){const e=er(t.mapValue.fields.__local_write_time__.timestampValue);return new st(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NC{constructor(e,n,r,s,i,o,c,l,u){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=u}}class wi{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new wi("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof wi&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fo={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function nr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Bu(t)?4:LC(t)?9007199254740991:VC(t)?10:11:xe()}function fn(t,e){if(t===e)return!0;const n=nr(t);if(n!==nr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Ai(t).isEqual(Ai(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=er(s.timestampValue),c=er(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return tr(s.bytesValue).isEqual(tr(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return Qe(s.geoPointValue.latitude)===Qe(i.geoPointValue.latitude)&&Qe(s.geoPointValue.longitude)===Qe(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Qe(s.integerValue)===Qe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Qe(s.doubleValue),c=Qe(i.doubleValue);return o===c?Sa(o)===Sa(c):isNaN(o)&&isNaN(c)}return!1}(t,e);case 9:return xs(t.arrayValue.values||[],e.arrayValue.values||[],fn);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Bf(o)!==Bf(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!fn(o[l],c[l])))return!1;return!0}(t,e);default:return xe()}}function Ti(t,e){return(t.values||[]).find(n=>fn(n,e))!==void 0}function vs(t,e){if(t===e)return 0;const n=nr(t),r=nr(e);if(n!==r)return Fe(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Fe(t.booleanValue,e.booleanValue);case 2:return function(i,o){const c=Qe(i.integerValue||i.doubleValue),l=Qe(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(t,e);case 3:return Nf(t.timestampValue,e.timestampValue);case 4:return Nf(Ai(t),Ai(e));case 5:return Fe(t.stringValue,e.stringValue);case 6:return function(i,o){const c=tr(i),l=tr(o);return c.compareTo(l)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const c=i.split("/"),l=o.split("/");for(let u=0;u<c.length&&u<l.length;u++){const h=Fe(c[u],l[u]);if(h!==0)return h}return Fe(c.length,l.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const c=Fe(Qe(i.latitude),Qe(o.latitude));return c!==0?c:Fe(Qe(i.longitude),Qe(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Vf(t.arrayValue,e.arrayValue);case 10:return function(i,o){var c,l,u,h;const d=i.fields||{},p=o.fields||{},m=(c=d.value)===null||c===void 0?void 0:c.arrayValue,v=(l=p.value)===null||l===void 0?void 0:l.arrayValue,R=Fe(((u=m==null?void 0:m.values)===null||u===void 0?void 0:u.length)||0,((h=v==null?void 0:v.values)===null||h===void 0?void 0:h.length)||0);return R!==0?R:Vf(m,v)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===fo.mapValue&&o===fo.mapValue)return 0;if(i===fo.mapValue)return 1;if(o===fo.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),u=o.fields||{},h=Object.keys(u);l.sort(),h.sort();for(let d=0;d<l.length&&d<h.length;++d){const p=Fe(l[d],h[d]);if(p!==0)return p;const m=vs(c[l[d]],u[h[d]]);if(m!==0)return m}return Fe(l.length,h.length)}(t.mapValue,e.mapValue);default:throw xe()}}function Nf(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return Fe(t,e);const n=er(t),r=er(e),s=Fe(n.seconds,r.seconds);return s!==0?s:Fe(n.nanos,r.nanos)}function Vf(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=vs(n[s],r[s]);if(i)return i}return Fe(n.length,r.length)}function ys(t){return Dl(t)}function Dl(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=er(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return tr(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return ge.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=Dl(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Dl(n.fields[o])}`;return s+"}"}(t.mapValue):xe()}function Co(t){switch(nr(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=rc(t);return e?16+Co(e):16;case 5:return 2*t.stringValue.length;case 6:return tr(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Co(i),0)}(t.arrayValue);case 10:case 11:return function(r){let s=0;return Or(r.fields,(i,o)=>{s+=i.length+Co(o)}),s}(t.mapValue);default:throw xe()}}function Pl(t){return!!t&&"integerValue"in t}function Ou(t){return!!t&&"arrayValue"in t}function Lf(t){return!!t&&"nullValue"in t}function Mf(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function bo(t){return!!t&&"mapValue"in t}function VC(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function oi(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Or(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=oi(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=oi(t.arrayValue.values[n]);return e}return Object.assign({},t)}function LC(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e){this.value=e}static empty(){return new Mt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!bo(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=oi(n)}setAll(e){let n=pt.emptyPath(),r={},s=[];e.forEach((o,c)=>{if(!n.isImmediateParentOf(c)){const l=this.getFieldsMap(n);this.applyChanges(l,r,s),r={},s=[],n=c.popLast()}o?r[c.lastSegment()]=oi(o):s.push(c.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());bo(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return fn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];bo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){Or(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Mt(oi(this.value))}}function n_(t){const e=[];return Or(t.fields,(n,r)=>{const s=new pt([n]);if(bo(r)){const i=n_(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new jt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(e,n,r,s,i,o,c){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new Et(e,0,ve.min(),ve.min(),ve.min(),Mt.empty(),0)}static newFoundDocument(e,n,r,s){return new Et(e,1,n,ve.min(),r,s,0)}static newNoDocument(e,n){return new Et(e,2,n,ve.min(),ve.min(),Mt.empty(),0)}static newUnknownDocument(e,n){return new Et(e,3,n,ve.min(),ve.min(),Mt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(ve.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Mt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Mt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ve.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Et&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Et(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(e,n){this.position=e,this.inclusive=n}}function Uf(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=ge.comparator(ge.fromName(o.referenceValue),n.key):r=vs(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function $f(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!fn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pa{constructor(e,n="asc"){this.field=e,this.dir=n}}function MC(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_{}class rt extends r_{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new $C(e,n,r):n==="array-contains"?new jC(e,r):n==="in"?new zC(e,r):n==="not-in"?new WC(e,r):n==="array-contains-any"?new KC(e,r):new rt(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new HC(e,r):new qC(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(vs(n,this.value)):n!==null&&nr(this.value)===nr(n)&&this.matchesComparison(vs(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return xe()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class dn extends r_{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new dn(e,n)}matches(e){return s_(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function s_(t){return t.op==="and"}function i_(t){return UC(t)&&s_(t)}function UC(t){for(const e of t.filters)if(e instanceof dn)return!1;return!0}function Fl(t){if(t instanceof rt)return t.field.canonicalString()+t.op.toString()+ys(t.value);if(i_(t))return t.filters.map(e=>Fl(e)).join(",");{const e=t.filters.map(n=>Fl(n)).join(",");return`${t.op}(${e})`}}function o_(t,e){return t instanceof rt?function(r,s){return s instanceof rt&&r.op===s.op&&r.field.isEqual(s.field)&&fn(r.value,s.value)}(t,e):t instanceof dn?function(r,s){return s instanceof dn&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,c)=>i&&o_(o,s.filters[c]),!0):!1}(t,e):void xe()}function a_(t){return t instanceof rt?function(n){return`${n.field.canonicalString()} ${n.op} ${ys(n.value)}`}(t):t instanceof dn?function(n){return n.op.toString()+" {"+n.getFilters().map(a_).join(" ,")+"}"}(t):"Filter"}class $C extends rt{constructor(e,n,r){super(e,n,r),this.key=ge.fromName(r.referenceValue)}matches(e){const n=ge.comparator(e.key,this.key);return this.matchesComparison(n)}}class HC extends rt{constructor(e,n){super(e,"in",n),this.keys=c_("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class qC extends rt{constructor(e,n){super(e,"not-in",n),this.keys=c_("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function c_(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>ge.fromName(r.referenceValue))}class jC extends rt{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Ou(n)&&Ti(n.arrayValue,this.value)}}class zC extends rt{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Ti(this.value.arrayValue,n)}}class WC extends rt{constructor(e,n){super(e,"not-in",n)}matches(e){if(Ti(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Ti(this.value.arrayValue,n)}}class KC extends rt{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Ou(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Ti(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GC{constructor(e,n=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.ue=null}}function Hf(t,e=null,n=[],r=[],s=null,i=null,o=null){return new GC(t,e,n,r,s,i,o)}function Nu(t){const e=Ee(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Fl(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),nc(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>ys(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>ys(r)).join(",")),e.ue=n}return e.ue}function Vu(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!MC(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!o_(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!$f(t.startAt,e.startAt)&&$f(t.endAt,e.endAt)}function kl(t){return ge.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(e,n=null,r=[],s=[],i=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function QC(t,e,n,r,s,i,o,c){return new sc(t,e,n,r,s,i,o,c)}function Lu(t){return new sc(t)}function qf(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function XC(t){return t.collectionGroup!==null}function ai(t){const e=Ee(t);if(e.ce===null){e.ce=[];const n=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new it(pt.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(u=>{u.isInequality()&&(c=c.add(u.field))})}),c})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.ce.push(new Pa(i,r))}),n.has(pt.keyField().canonicalString())||e.ce.push(new Pa(pt.keyField(),r))}return e.ce}function an(t){const e=Ee(t);return e.le||(e.le=YC(e,ai(t))),e.le}function YC(t,e){if(t.limitType==="F")return Hf(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Pa(s.field,i)});const n=t.endAt?new Da(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Da(t.startAt.position,t.startAt.inclusive):null;return Hf(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Bl(t,e,n){return new sc(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function ic(t,e){return Vu(an(t),an(e))&&t.limitType===e.limitType}function l_(t){return`${Nu(an(t))}|lt:${t.limitType}`}function es(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>a_(s)).join(", ")}]`),nc(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>ys(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>ys(s)).join(",")),`Target(${r})`}(an(t))}; limitType=${t.limitType})`}function oc(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):ge.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of ai(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(o,c,l){const u=Uf(o,c,l);return o.inclusive?u<=0:u<0}(r.startAt,ai(r),s)||r.endAt&&!function(o,c,l){const u=Uf(o,c,l);return o.inclusive?u>=0:u>0}(r.endAt,ai(r),s))}(t,e)}function JC(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function u_(t){return(e,n)=>{let r=!1;for(const s of ai(t)){const i=ZC(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function ZC(t,e,n){const r=t.field.isKeyField()?ge.comparator(e.key,n.key):function(i,o,c){const l=o.data.field(i),u=c.data.field(i);return l!==null&&u!==null?vs(l,u):xe()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return xe()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Or(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return e_(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e2=new ze(ge.comparator);function Fn(){return e2}const h_=new ze(ge.comparator);function Ks(...t){let e=h_;for(const n of t)e=e.insert(n.key,n);return e}function f_(t){let e=h_;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function vr(){return ci()}function d_(){return ci()}function ci(){return new Nr(t=>t.toString(),(t,e)=>t.isEqual(e))}const t2=new ze(ge.comparator),n2=new it(ge.comparator);function De(...t){let e=n2;for(const n of t)e=e.add(n);return e}const r2=new it(Fe);function s2(){return r2}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mu(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Sa(e)?"-0":e}}function p_(t){return{integerValue:""+t}}function i2(t,e){return FC(e)?p_(e):Mu(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(){this._=void 0}}function o2(t,e,n){return t instanceof Ii?function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Bu(i)&&(i=rc(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(n,e):t instanceof Ci?m_(t,e):t instanceof bi?__(t,e):function(s,i){const o=g_(s,i),c=jf(o)+jf(s.Pe);return Pl(o)&&Pl(s.Pe)?p_(c):Mu(s.serializer,c)}(t,e)}function a2(t,e,n){return t instanceof Ci?m_(t,e):t instanceof bi?__(t,e):n}function g_(t,e){return t instanceof Fa?function(r){return Pl(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Ii extends ac{}class Ci extends ac{constructor(e){super(),this.elements=e}}function m_(t,e){const n=x_(e);for(const r of t.elements)n.some(s=>fn(s,r))||n.push(r);return{arrayValue:{values:n}}}class bi extends ac{constructor(e){super(),this.elements=e}}function __(t,e){let n=x_(e);for(const r of t.elements)n=n.filter(s=>!fn(s,r));return{arrayValue:{values:n}}}class Fa extends ac{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function jf(t){return Qe(t.integerValue||t.doubleValue)}function x_(t){return Ou(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c2{constructor(e,n){this.field=e,this.transform=n}}function l2(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof Ci&&s instanceof Ci||r instanceof bi&&s instanceof bi?xs(r.elements,s.elements,fn):r instanceof Fa&&s instanceof Fa?fn(r.Pe,s.Pe):r instanceof Ii&&s instanceof Ii}(t.transform,e.transform)}class u2{constructor(e,n){this.version=e,this.transformResults=n}}class Rn{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Rn}static exists(e){return new Rn(void 0,e)}static updateTime(e){return new Rn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ro(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class cc{}function v_(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new E_(t.key,Rn.none()):new Li(t.key,t.data,Rn.none());{const n=t.data,r=Mt.empty();let s=new it(pt.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Vr(t.key,r,new jt(s.toArray()),Rn.none())}}function h2(t,e,n){t instanceof Li?function(s,i,o){const c=s.value.clone(),l=Wf(s.fieldTransforms,i,o.transformResults);c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(t,e,n):t instanceof Vr?function(s,i,o){if(!Ro(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Wf(s.fieldTransforms,i,o.transformResults),l=i.data;l.setAll(y_(s)),l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function li(t,e,n,r){return t instanceof Li?function(i,o,c,l){if(!Ro(i.precondition,o))return c;const u=i.value.clone(),h=Kf(i.fieldTransforms,l,o);return u.setAll(h),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null}(t,e,n,r):t instanceof Vr?function(i,o,c,l){if(!Ro(i.precondition,o))return c;const u=Kf(i.fieldTransforms,l,o),h=o.data;return h.setAll(y_(i)),h.setAll(u),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(d=>d.field))}(t,e,n,r):function(i,o,c){return Ro(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(t,e,n)}function f2(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=g_(r.transform,s||null);i!=null&&(n===null&&(n=Mt.empty()),n.set(r.field,i))}return n||null}function zf(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&xs(r,s,(i,o)=>l2(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Li extends cc{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Vr extends cc{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function y_(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Wf(t,e,n){const r=new Map;Me(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,a2(o,c,n[s]))}return r}function Kf(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,o2(i,o,e))}return r}class E_ extends cc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class d2 extends cc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p2{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&h2(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=li(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=li(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=d_();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=n.has(s.key)?null:c;const l=v_(o,c);l!==null&&r.set(s.key,l),o.isValidDocument()||o.convertToNoDocument(ve.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),De())}isEqual(e){return this.batchId===e.batchId&&xs(this.mutations,e.mutations,(n,r)=>zf(n,r))&&xs(this.baseMutations,e.baseMutations,(n,r)=>zf(n,r))}}class Uu{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){Me(e.mutations.length===r.length);let s=function(){return t2}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Uu(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g2{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m2{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ze,Be;function _2(t){switch(t){default:return xe();case X.CANCELLED:case X.UNKNOWN:case X.DEADLINE_EXCEEDED:case X.RESOURCE_EXHAUSTED:case X.INTERNAL:case X.UNAVAILABLE:case X.UNAUTHENTICATED:return!1;case X.INVALID_ARGUMENT:case X.NOT_FOUND:case X.ALREADY_EXISTS:case X.PERMISSION_DENIED:case X.FAILED_PRECONDITION:case X.ABORTED:case X.OUT_OF_RANGE:case X.UNIMPLEMENTED:case X.DATA_LOSS:return!0}}function A_(t){if(t===void 0)return Pn("GRPC error has no .code"),X.UNKNOWN;switch(t){case Ze.OK:return X.OK;case Ze.CANCELLED:return X.CANCELLED;case Ze.UNKNOWN:return X.UNKNOWN;case Ze.DEADLINE_EXCEEDED:return X.DEADLINE_EXCEEDED;case Ze.RESOURCE_EXHAUSTED:return X.RESOURCE_EXHAUSTED;case Ze.INTERNAL:return X.INTERNAL;case Ze.UNAVAILABLE:return X.UNAVAILABLE;case Ze.UNAUTHENTICATED:return X.UNAUTHENTICATED;case Ze.INVALID_ARGUMENT:return X.INVALID_ARGUMENT;case Ze.NOT_FOUND:return X.NOT_FOUND;case Ze.ALREADY_EXISTS:return X.ALREADY_EXISTS;case Ze.PERMISSION_DENIED:return X.PERMISSION_DENIED;case Ze.FAILED_PRECONDITION:return X.FAILED_PRECONDITION;case Ze.ABORTED:return X.ABORTED;case Ze.OUT_OF_RANGE:return X.OUT_OF_RANGE;case Ze.UNIMPLEMENTED:return X.UNIMPLEMENTED;case Ze.DATA_LOSS:return X.DATA_LOSS;default:return xe()}}(Be=Ze||(Ze={}))[Be.OK=0]="OK",Be[Be.CANCELLED=1]="CANCELLED",Be[Be.UNKNOWN=2]="UNKNOWN",Be[Be.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Be[Be.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Be[Be.NOT_FOUND=5]="NOT_FOUND",Be[Be.ALREADY_EXISTS=6]="ALREADY_EXISTS",Be[Be.PERMISSION_DENIED=7]="PERMISSION_DENIED",Be[Be.UNAUTHENTICATED=16]="UNAUTHENTICATED",Be[Be.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Be[Be.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Be[Be.ABORTED=10]="ABORTED",Be[Be.OUT_OF_RANGE=11]="OUT_OF_RANGE",Be[Be.UNIMPLEMENTED=12]="UNIMPLEMENTED",Be[Be.INTERNAL=13]="INTERNAL",Be[Be.UNAVAILABLE=14]="UNAVAILABLE",Be[Be.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x2(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v2=new Tr([4294967295,4294967295],0);function Gf(t){const e=x2().encode(t),n=new Wm;return n.update(e),new Uint8Array(n.digest())}function Qf(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Tr([n,r],0),new Tr([s,i],0)]}class $u{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Gs(`Invalid padding: ${n}`);if(r<0)throw new Gs(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Gs(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Gs(`Invalid padding when bitmap length is 0: ${n}`);this.Te=8*e.length-n,this.Ie=Tr.fromNumber(this.Te)}Ee(e,n,r){let s=e.add(n.multiply(Tr.fromNumber(r)));return s.compare(v2)===1&&(s=new Tr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Ie).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Te===0)return!1;const n=Gf(e),[r,s]=Qf(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);if(!this.de(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new $u(i,s,n);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.Te===0)return;const n=Gf(e),[r,s]=Qf(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Gs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,Mi.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new lc(ve.min(),s,new ze(Fe),Fn(),De())}}class Mi{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Mi(r,n,De(),De(),De())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(e,n,r,s){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=s}}class w_{constructor(e,n){this.targetId=e,this.me=n}}class T_{constructor(e,n,r=gt.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class Xf{constructor(){this.fe=0,this.ge=Yf(),this.pe=gt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=De(),n=De(),r=De();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:xe()}}),new Mi(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=Yf()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Me(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class y2{constructor(e){this.Le=e,this.Be=new Map,this.ke=Fn(),this.qe=po(),this.Qe=po(),this.Ke=new ze(Fe)}$e(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.Ue(n,e.Ve):this.We(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.We(n,e.key,e.Ve)}Ge(e){this.forEachTarget(e,n=>{const r=this.ze(n);switch(e.state){case 0:this.je(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.je(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.je(n)&&(this.He(n),r.De(e.resumeToken));break;default:xe()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,s)=>{this.je(s)&&n(s)})}Je(e){const n=e.targetId,r=e.me.count,s=this.Ye(n);if(s){const i=s.target;if(kl(i))if(r===0){const o=new ge(i.path);this.We(n,o,Et.newNoDocument(o,ve.min()))}else Me(r===1);else{const o=this.Ze(n);if(o!==r){const c=this.Xe(e),l=c?this.et(c,e,o):1;if(l!==0){this.He(n);const u=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(n,u)}}}}}Xe(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,c;try{o=tr(r).toUint8Array()}catch(l){if(l instanceof t_)return _s("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new $u(o,s,i)}catch(l){return _s(l instanceof Gs?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Te===0?null:c}et(e,n,r){return n.me.count===r-this.rt(e,n.targetId)?0:2}rt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.Le.nt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.We(n,i,null),s++)}),s}it(e){const n=new Map;this.Be.forEach((i,o)=>{const c=this.Ye(o);if(c){if(i.current&&kl(c.target)){const l=new ge(c.target.path);this.st(l).has(o)||this.ot(o,l)||this.We(o,l,Et.newNoDocument(l,e))}i.be&&(n.set(o,i.ve()),i.Ce())}});let r=De();this.Qe.forEach((i,o)=>{let c=!0;o.forEachWhile(l=>{const u=this.Ye(l);return!u||u.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.ke.forEach((i,o)=>o.setReadTime(e));const s=new lc(e,n,this.Ke,this.ke,r);return this.ke=Fn(),this.qe=po(),this.Qe=po(),this.Ke=new ze(Fe),s}Ue(e,n){if(!this.je(e))return;const r=this.ot(e,n.key)?2:0;this.ze(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e)),this.Qe=this.Qe.insert(n.key,this._t(n.key).add(e))}We(e,n,r){if(!this.je(e))return;const s=this.ze(e);this.ot(e,n)?s.Fe(n,1):s.Me(n),this.Qe=this.Qe.insert(n,this._t(n).delete(e)),this.Qe=this.Qe.insert(n,this._t(n).add(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ze(e){const n=this.ze(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.ze(e).xe()}ze(e){let n=this.Be.get(e);return n||(n=new Xf,this.Be.set(e,n)),n}_t(e){let n=this.Qe.get(e);return n||(n=new it(Fe),this.Qe=this.Qe.insert(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new it(Fe),this.qe=this.qe.insert(e,n)),n}je(e){const n=this.Ye(e)!==null;return n||oe("WatchChangeAggregator","Detected inactive target",e),n}Ye(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ut(e)}He(e){this.Be.set(e,new Xf),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.We(e,n,null)})}ot(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function po(){return new ze(ge.comparator)}function Yf(){return new ze(ge.comparator)}const E2={asc:"ASCENDING",desc:"DESCENDING"},A2={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},w2={and:"AND",or:"OR"};class T2{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Ol(t,e){return t.useProto3Json||nc(e)?e:{value:e}}function ka(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function I_(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function I2(t,e){return ka(t,e.toTimestamp())}function cn(t){return Me(!!t),ve.fromTimestamp(function(n){const r=er(n);return new st(r.seconds,r.nanos)}(t))}function Hu(t,e){return Nl(t,e).canonicalString()}function Nl(t,e){const n=function(s){return new Ge(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function C_(t){const e=Ge.fromString(t);return Me(P_(e)),e}function Vl(t,e){return Hu(t.databaseId,e.path)}function Zc(t,e){const n=C_(e);if(n.get(1)!==t.databaseId.projectId)throw new pe(X.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new pe(X.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new ge(R_(n))}function b_(t,e){return Hu(t.databaseId,e)}function C2(t){const e=C_(t);return e.length===4?Ge.emptyPath():R_(e)}function Ll(t){return new Ge(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function R_(t){return Me(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Jf(t,e,n){return{name:Vl(t,e),fields:n.value.mapValue.fields}}function b2(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:xe()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(u,h){return u.useProto3Json?(Me(h===void 0||typeof h=="string"),gt.fromBase64String(h||"")):(Me(h===void 0||h instanceof Buffer||h instanceof Uint8Array),gt.fromUint8Array(h||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(u){const h=u.code===void 0?X.UNKNOWN:A_(u.code);return new pe(h,u.message||"")}(o);n=new T_(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Zc(t,r.document.name),i=cn(r.document.updateTime),o=r.document.createTime?cn(r.document.createTime):ve.min(),c=new Mt({mapValue:{fields:r.document.fields}}),l=Et.newFoundDocument(s,i,o,c),u=r.targetIds||[],h=r.removedTargetIds||[];n=new So(u,h,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Zc(t,r.document),i=r.readTime?cn(r.readTime):ve.min(),o=Et.newNoDocument(s,i),c=r.removedTargetIds||[];n=new So([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Zc(t,r.document),i=r.removedTargetIds||[];n=new So([],i,s,null)}else{if(!("filter"in e))return xe();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new m2(s,i),c=r.targetId;n=new w_(c,o)}}return n}function R2(t,e){let n;if(e instanceof Li)n={update:Jf(t,e.key,e.value)};else if(e instanceof E_)n={delete:Vl(t,e.key)};else if(e instanceof Vr)n={update:Jf(t,e.key,e.data),updateMask:V2(e.fieldMask)};else{if(!(e instanceof d2))return xe();n={verify:Vl(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const c=o.transform;if(c instanceof Ii)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Ci)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof bi)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Fa)return{fieldPath:o.field.canonicalString(),increment:c.Pe};throw xe()}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:I2(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:xe()}(t,e.precondition)),n}function S2(t,e){return t&&t.length>0?(Me(e!==void 0),t.map(n=>function(s,i){let o=s.updateTime?cn(s.updateTime):cn(i);return o.isEqual(ve.min())&&(o=cn(i)),new u2(o,s.transformResults||[])}(n,e))):[]}function D2(t,e){return{documents:[b_(t,e.path)]}}function P2(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=b_(t,s);const i=function(u){if(u.length!==0)return D_(dn.create(u,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(u){if(u.length!==0)return u.map(h=>function(p){return{field:ts(p.field),direction:B2(p.dir)}}(h))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const c=Ol(t,e.limit);return c!==null&&(n.structuredQuery.limit=c),e.startAt&&(n.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{ct:n,parent:s}}function F2(t){let e=C2(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Me(r===1);const h=n.from[0];h.allDescendants?s=h.collectionId:e=e.child(h.collectionId)}let i=[];n.where&&(i=function(d){const p=S_(d);return p instanceof dn&&i_(p)?p.getFilters():[p]}(n.where));let o=[];n.orderBy&&(o=function(d){return d.map(p=>function(v){return new Pa(ns(v.field),function(T){switch(T){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(v.direction))}(p))}(n.orderBy));let c=null;n.limit&&(c=function(d){let p;return p=typeof d=="object"?d.value:d,nc(p)?null:p}(n.limit));let l=null;n.startAt&&(l=function(d){const p=!!d.before,m=d.values||[];return new Da(m,p)}(n.startAt));let u=null;return n.endAt&&(u=function(d){const p=!d.before,m=d.values||[];return new Da(m,p)}(n.endAt)),QC(e,s,o,i,c,"F",l,u)}function k2(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return xe()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function S_(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=ns(n.unaryFilter.field);return rt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=ns(n.unaryFilter.field);return rt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=ns(n.unaryFilter.field);return rt.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ns(n.unaryFilter.field);return rt.create(o,"!=",{nullValue:"NULL_VALUE"});default:return xe()}}(t):t.fieldFilter!==void 0?function(n){return rt.create(ns(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return xe()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return dn.create(n.compositeFilter.filters.map(r=>S_(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return xe()}}(n.compositeFilter.op))}(t):xe()}function B2(t){return E2[t]}function O2(t){return A2[t]}function N2(t){return w2[t]}function ts(t){return{fieldPath:t.canonicalString()}}function ns(t){return pt.fromServerFormat(t.fieldPath)}function D_(t){return t instanceof rt?function(n){if(n.op==="=="){if(Mf(n.value))return{unaryFilter:{field:ts(n.field),op:"IS_NAN"}};if(Lf(n.value))return{unaryFilter:{field:ts(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Mf(n.value))return{unaryFilter:{field:ts(n.field),op:"IS_NOT_NAN"}};if(Lf(n.value))return{unaryFilter:{field:ts(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ts(n.field),op:O2(n.op),value:n.value}}}(t):t instanceof dn?function(n){const r=n.getFilters().map(s=>D_(s));return r.length===1?r[0]:{compositeFilter:{op:N2(n.op),filters:r}}}(t):xe()}function V2(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function P_(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e,n,r,s,i=ve.min(),o=ve.min(),c=gt.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Kn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Kn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Kn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Kn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L2{constructor(e){this.ht=e}}function M2(t){const e=F2({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Bl(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U2{constructor(){this.ln=new $2}addToCollectionParentIndex(e,n){return this.ln.add(n),W.resolve()}getCollectionParents(e,n){return W.resolve(this.ln.getEntries(n))}addFieldIndex(e,n){return W.resolve()}deleteFieldIndex(e,n){return W.resolve()}deleteAllFieldIndexes(e){return W.resolve()}createTargetIndexes(e,n){return W.resolve()}getDocumentsMatchingTarget(e,n){return W.resolve(null)}getIndexType(e,n){return W.resolve(0)}getFieldIndexes(e,n){return W.resolve([])}getNextCollectionGroupToUpdate(e){return W.resolve(null)}getMinOffset(e,n){return W.resolve(Zn.min())}getMinOffsetFromCollectionGroup(e,n){return W.resolve(Zn.min())}updateCollectionGroup(e,n,r){return W.resolve()}updateIndexEntries(e,n){return W.resolve()}}class $2{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new it(Ge.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new it(Ge.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class Dt{static withCacheSize(e){return new Dt(e,Dt.DEFAULT_COLLECTION_PERCENTILE,Dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Dt.DEFAULT_COLLECTION_PERCENTILE=10,Dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Dt.DEFAULT=new Dt(41943040,Dt.DEFAULT_COLLECTION_PERCENTILE,Dt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Dt.DISABLED=new Dt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es{constructor(e){this.kn=e}next(){return this.kn+=2,this.kn}static qn(){return new Es(0)}static Qn(){return new Es(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ed([t,e],[n,r]){const s=Fe(t,n);return s===0?Fe(e,r):s}class H2{constructor(e){this.Gn=e,this.buffer=new it(ed),this.zn=0}jn(){return++this.zn}Hn(e){const n=[e,this.jn()];if(this.buffer.size<this.Gn)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();ed(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class q2{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Yn(6e4)}stop(){this.Jn&&(this.Jn.cancel(),this.Jn=null)}get started(){return this.Jn!==null}Yn(e){oe("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.Jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){Rs(n)?oe("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",n):await bs(n)}await this.Yn(3e5)})}}class j2{constructor(e,n){this.Zn=e,this.params=n}calculateTargetCount(e,n){return this.Zn.Xn(e).next(r=>Math.floor(n/100*r))}nthSequenceNumber(e,n){if(n===0)return W.resolve(tc.oe);const r=new H2(n);return this.Zn.forEachTarget(e,s=>r.Hn(s.sequenceNumber)).next(()=>this.Zn.er(e,s=>r.Hn(s))).next(()=>r.maxValue)}removeTargets(e,n,r){return this.Zn.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.Zn.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(oe("LruGarbageCollector","Garbage collection skipped; disabled"),W.resolve(Zf)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(oe("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Zf):this.tr(e,n))}getCacheSize(e){return this.Zn.getCacheSize(e)}tr(e,n){let r,s,i,o,c,l,u;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(d=>(d>this.params.maximumSequenceNumbersToCollect?(oe("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${d}`),s=this.params.maximumSequenceNumbersToCollect):s=d,o=Date.now(),this.nthSequenceNumber(e,s))).next(d=>(r=d,c=Date.now(),this.removeTargets(e,r,n))).next(d=>(i=d,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(d=>(u=Date.now(),Zr()<=Se.DEBUG&&oe("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-h}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${d} documents in `+(u-l)+`ms
Total Duration: ${u-h}ms`),W.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:d})))}}function z2(t,e){return new j2(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W2{constructor(){this.changes=new Nr(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,Et.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?W.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K2{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G2{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&li(r.mutation,s,jt.empty(),st.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,De()).next(()=>r))}getLocalViewOfDocuments(e,n,r=De()){const s=vr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=Ks();return i.forEach((c,l)=>{o=o.insert(c,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=vr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,De()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,c)=>{n.set(o,c)})})}computeViews(e,n,r,s){let i=Fn();const o=ci(),c=function(){return ci()}();return n.forEach((l,u)=>{const h=r.get(u.key);s.has(u.key)&&(h===void 0||h.mutation instanceof Vr)?i=i.insert(u.key,u):h!==void 0?(o.set(u.key,h.mutation.getFieldMask()),li(h.mutation,u,h.mutation.getFieldMask(),st.now())):o.set(u.key,jt.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((u,h)=>o.set(u,h)),n.forEach((u,h)=>{var d;return c.set(u,new K2(h,(d=o.get(u))!==null&&d!==void 0?d:null))}),c))}recalculateAndSaveOverlays(e,n){const r=ci();let s=new ze((o,c)=>o-c),i=De();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const c of o)c.keys().forEach(l=>{const u=n.get(l);if(u===null)return;let h=r.get(l)||jt.empty();h=c.applyToLocalView(u,h),r.set(l,h);const d=(s.get(c.batchId)||De()).add(l);s=s.insert(c.batchId,d)})}).next(()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),u=l.key,h=l.value,d=d_();h.forEach(p=>{if(!i.has(p)){const m=v_(n.get(p),r.get(p));m!==null&&d.set(p,m),i=i.add(p)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,d))}return W.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(o){return ge.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):XC(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):W.resolve(vr());let c=-1,l=i;return o.next(u=>W.forEach(u,(h,d)=>(c<d.largestBatchId&&(c=d.largestBatchId),i.get(h)?W.resolve():this.remoteDocumentCache.getEntry(e,h).next(p=>{l=l.insert(h,p)}))).next(()=>this.populateOverlays(e,u,i)).next(()=>this.computeViews(e,l,u,De())).next(h=>({batchId:c,changes:f_(h)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new ge(n)).next(r=>{let s=Ks();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=Ks();return this.indexManager.getCollectionParents(e,i).next(c=>W.forEach(c,l=>{const u=function(d,p){return new sc(p,null,d.explicitOrderBy.slice(),d.filters.slice(),d.limit,d.limitType,d.startAt,d.endAt)}(n,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,u,r,s).next(h=>{h.forEach((d,p)=>{o=o.insert(d,p)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(o=>{i.forEach((l,u)=>{const h=u.getKey();o.get(h)===null&&(o=o.insert(h,Et.newInvalidDocument(h)))});let c=Ks();return o.forEach((l,u)=>{const h=i.get(l);h!==void 0&&li(h.mutation,u,jt.empty(),st.now()),oc(n,u)&&(c=c.insert(l,u))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q2{constructor(e){this.serializer=e,this.Tr=new Map,this.Ir=new Map}getBundleMetadata(e,n){return W.resolve(this.Tr.get(n))}saveBundleMetadata(e,n){return this.Tr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:cn(s.createTime)}}(n)),W.resolve()}getNamedQuery(e,n){return W.resolve(this.Ir.get(n))}saveNamedQuery(e,n){return this.Ir.set(n.name,function(s){return{name:s.name,query:M2(s.bundledQuery),readTime:cn(s.readTime)}}(n)),W.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X2{constructor(){this.overlays=new ze(ge.comparator),this.Er=new Map}getOverlay(e,n){return W.resolve(this.overlays.get(n))}getOverlays(e,n){const r=vr();return W.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.Tt(e,n,i)}),W.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.Er.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Er.delete(r)),W.resolve()}getOverlaysForCollection(e,n,r){const s=vr(),i=n.length+1,o=new ge(n.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,u=l.getKey();if(!n.isPrefixOf(u.path))break;u.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return W.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new ze((u,h)=>u-h);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===n&&u.largestBatchId>r){let h=i.get(u.largestBatchId);h===null&&(h=vr(),i=i.insert(u.largestBatchId,h)),h.set(u.getKey(),u)}}const c=vr(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((u,h)=>c.set(u,h)),!(c.size()>=s)););return W.resolve(c)}Tt(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Er.get(s.largestBatchId).delete(r.key);this.Er.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new g2(n,r));let i=this.Er.get(n);i===void 0&&(i=De(),this.Er.set(n,i)),this.Er.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y2{constructor(){this.sessionToken=gt.EMPTY_BYTE_STRING}getSessionToken(e){return W.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,W.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(){this.dr=new it(at.Ar),this.Rr=new it(at.Vr)}isEmpty(){return this.dr.isEmpty()}addReference(e,n){const r=new at(e,n);this.dr=this.dr.add(r),this.Rr=this.Rr.add(r)}mr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.gr(new at(e,n))}pr(e,n){e.forEach(r=>this.removeReference(r,n))}yr(e){const n=new ge(new Ge([])),r=new at(n,e),s=new at(n,e+1),i=[];return this.Rr.forEachInRange([r,s],o=>{this.gr(o),i.push(o.key)}),i}wr(){this.dr.forEach(e=>this.gr(e))}gr(e){this.dr=this.dr.delete(e),this.Rr=this.Rr.delete(e)}Sr(e){const n=new ge(new Ge([])),r=new at(n,e),s=new at(n,e+1);let i=De();return this.Rr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new at(e,0),r=this.dr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class at{constructor(e,n){this.key=e,this.br=n}static Ar(e,n){return ge.comparator(e.key,n.key)||Fe(e.br,n.br)}static Vr(e,n){return Fe(e.br,n.br)||ge.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J2{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Dr=1,this.vr=new it(at.Ar)}checkEmpty(e){return W.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.Dr;this.Dr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new p2(i,n,r,s);this.mutationQueue.push(o);for(const c of s)this.vr=this.vr.add(new at(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return W.resolve(o)}lookupMutationBatch(e,n){return W.resolve(this.Cr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.Fr(r),i=s<0?0:s;return W.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return W.resolve(this.mutationQueue.length===0?-1:this.Dr-1)}getAllMutationBatches(e){return W.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new at(n,0),s=new at(n,Number.POSITIVE_INFINITY),i=[];return this.vr.forEachInRange([r,s],o=>{const c=this.Cr(o.br);i.push(c)}),W.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new it(Fe);return n.forEach(s=>{const i=new at(s,0),o=new at(s,Number.POSITIVE_INFINITY);this.vr.forEachInRange([i,o],c=>{r=r.add(c.br)})}),W.resolve(this.Mr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;ge.isDocumentKey(i)||(i=i.child(""));const o=new at(new ge(i),0);let c=new it(Fe);return this.vr.forEachWhile(l=>{const u=l.key.path;return!!r.isPrefixOf(u)&&(u.length===s&&(c=c.add(l.br)),!0)},o),W.resolve(this.Mr(c))}Mr(e){const n=[];return e.forEach(r=>{const s=this.Cr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){Me(this.Or(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.vr;return W.forEach(n.mutations,s=>{const i=new at(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.vr=r})}Ln(e){}containsKey(e,n){const r=new at(n,0),s=this.vr.firstAfterOrEqual(r);return W.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,W.resolve()}Or(e,n){return this.Fr(e)}Fr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Cr(e){const n=this.Fr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z2{constructor(e){this.Nr=e,this.docs=function(){return new ze(ge.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.Nr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return W.resolve(r?r.document.mutableCopy():Et.newInvalidDocument(n))}getEntries(e,n){let r=Fn();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Et.newInvalidDocument(s))}),W.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=Fn();const o=n.path,c=new ge(o.child("")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:u,value:{document:h}}=l.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||RC(bC(h),r)<=0||(s.has(h.key)||oc(n,h))&&(i=i.insert(h.key,h.mutableCopy()))}return W.resolve(i)}getAllFromCollectionGroup(e,n,r,s){xe()}Lr(e,n){return W.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new eb(this)}getSize(e){return W.resolve(this.size)}}class eb extends W2{constructor(e){super(),this.hr=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.hr.addEntry(e,s)):this.hr.removeEntry(r)}),W.waitFor(n)}getFromCache(e,n){return this.hr.getEntry(e,n)}getAllFromCache(e,n){return this.hr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tb{constructor(e){this.persistence=e,this.Br=new Nr(n=>Nu(n),Vu),this.lastRemoteSnapshotVersion=ve.min(),this.highestTargetId=0,this.kr=0,this.qr=new qu,this.targetCount=0,this.Qr=Es.qn()}forEachTarget(e,n){return this.Br.forEach((r,s)=>n(s)),W.resolve()}getLastRemoteSnapshotVersion(e){return W.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return W.resolve(this.kr)}allocateTargetId(e){return this.highestTargetId=this.Qr.next(),W.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.kr&&(this.kr=n),W.resolve()}Un(e){this.Br.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.Qr=new Es(n),this.highestTargetId=n),e.sequenceNumber>this.kr&&(this.kr=e.sequenceNumber)}addTargetData(e,n){return this.Un(n),this.targetCount+=1,W.resolve()}updateTargetData(e,n){return this.Un(n),W.resolve()}removeTargetData(e,n){return this.Br.delete(n.target),this.qr.yr(n.targetId),this.targetCount-=1,W.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.Br.forEach((o,c)=>{c.sequenceNumber<=n&&r.get(c.targetId)===null&&(this.Br.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),W.waitFor(i).next(()=>s)}getTargetCount(e){return W.resolve(this.targetCount)}getTargetData(e,n){const r=this.Br.get(n)||null;return W.resolve(r)}addMatchingKeys(e,n,r){return this.qr.mr(n,r),W.resolve()}removeMatchingKeys(e,n,r){this.qr.pr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),W.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.qr.yr(n),W.resolve()}getMatchingKeysForTargetId(e,n){const r=this.qr.Sr(n);return W.resolve(r)}containsKey(e,n){return W.resolve(this.qr.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(e,n){this.Kr={},this.overlays={},this.$r=new tc(0),this.Ur=!1,this.Ur=!0,this.Wr=new Y2,this.referenceDelegate=e(this),this.Gr=new tb(this),this.indexManager=new U2,this.remoteDocumentCache=function(s){return new Z2(s)}(r=>this.referenceDelegate.zr(r)),this.serializer=new L2(n),this.jr=new Q2(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Ur=!1,Promise.resolve()}get started(){return this.Ur}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new X2,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.Kr[e.toKey()];return r||(r=new J2(n,this.referenceDelegate),this.Kr[e.toKey()]=r),r}getGlobalsCache(){return this.Wr}getTargetCache(){return this.Gr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.jr}runTransaction(e,n,r){oe("MemoryPersistence","Starting transaction:",e);const s=new nb(this.$r.next());return this.referenceDelegate.Hr(),r(s).next(i=>this.referenceDelegate.Jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Yr(e,n){return W.or(Object.values(this.Kr).map(r=>()=>r.containsKey(e,n)))}}class nb extends DC{constructor(e){super(),this.currentSequenceNumber=e}}class ju{constructor(e){this.persistence=e,this.Zr=new qu,this.Xr=null}static ei(e){return new ju(e)}get ti(){if(this.Xr)return this.Xr;throw xe()}addReference(e,n,r){return this.Zr.addReference(r,n),this.ti.delete(r.toString()),W.resolve()}removeReference(e,n,r){return this.Zr.removeReference(r,n),this.ti.add(r.toString()),W.resolve()}markPotentiallyOrphaned(e,n){return this.ti.add(n.toString()),W.resolve()}removeTarget(e,n){this.Zr.yr(n.targetId).forEach(s=>this.ti.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.ti.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}Hr(){this.Xr=new Set}Jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return W.forEach(this.ti,r=>{const s=ge.fromPath(r);return this.ni(e,s).next(i=>{i||n.removeEntry(s,ve.min())})}).next(()=>(this.Xr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ni(e,n).next(r=>{r?this.ti.delete(n.toString()):this.ti.add(n.toString())})}zr(e){return 0}ni(e,n){return W.or([()=>W.resolve(this.Zr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Yr(e,n)])}}class Ba{constructor(e,n){this.persistence=e,this.ri=new Nr(r=>kC(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=z2(this,n)}static ei(e,n){return new Ba(e,n)}Hr(){}Jr(e){return W.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}Xn(e){const n=this.nr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>n.next(s=>r+s))}nr(e){let n=0;return this.er(e,r=>{n++}).next(()=>n)}er(e,n){return W.forEach(this.ri,(r,s)=>this.ir(e,r,s).next(i=>i?W.resolve():n(s)))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.Lr(e,o=>this.ir(e,o,n).next(c=>{c||(r++,i.removeEntry(o,ve.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,n){return this.ri.set(n,e.currentSequenceNumber),W.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.ri.set(r,e.currentSequenceNumber),W.resolve()}removeReference(e,n,r){return this.ri.set(r,e.currentSequenceNumber),W.resolve()}updateLimboDocument(e,n){return this.ri.set(n,e.currentSequenceNumber),W.resolve()}zr(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=Co(e.data.value)),n}ir(e,n,r){return W.or([()=>this.persistence.Yr(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const s=this.ri.get(n);return W.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.Wi=r,this.Gi=s}static zi(e,n){let r=De(),s=De();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new zu(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rb{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sb{constructor(){this.ji=!1,this.Hi=!1,this.Ji=100,this.Yi=function(){return BE()?8:PC(wt())>0?6:4}()}initialize(e,n){this.Zi=e,this.indexManager=n,this.ji=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.Xi(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.es(e,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new rb;return this.ts(e,n,o).next(c=>{if(i.result=c,this.Hi)return this.ns(e,n,o,c.size)})}).next(()=>i.result)}ns(e,n,r,s){return r.documentReadCount<this.Ji?(Zr()<=Se.DEBUG&&oe("QueryEngine","SDK will not create cache indexes for query:",es(n),"since it only creates cache indexes for collection contains","more than or equal to",this.Ji,"documents"),W.resolve()):(Zr()<=Se.DEBUG&&oe("QueryEngine","Query:",es(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Yi*s?(Zr()<=Se.DEBUG&&oe("QueryEngine","The SDK decides to create cache indexes for query:",es(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,an(n))):W.resolve())}Xi(e,n){if(qf(n))return W.resolve(null);let r=an(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=Bl(n,null,"F"),r=an(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=De(...i);return this.Zi.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const u=this.rs(n,c);return this.ss(n,u,o,l.readTime)?this.Xi(e,Bl(n,null,"F")):this.os(e,u,n,l)}))})))}es(e,n,r,s){return qf(n)||s.isEqual(ve.min())?W.resolve(null):this.Zi.getDocuments(e,r).next(i=>{const o=this.rs(n,i);return this.ss(n,o,r,s)?W.resolve(null):(Zr()<=Se.DEBUG&&oe("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),es(n)),this.os(e,o,n,CC(s,-1)).next(c=>c))})}rs(e,n){let r=new it(u_(e));return n.forEach((s,i)=>{oc(e,i)&&(r=r.add(i))}),r}ss(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ts(e,n,r){return Zr()<=Se.DEBUG&&oe("QueryEngine","Using full collection scan to execute query:",es(n)),this.Zi.getDocumentsMatchingQuery(e,n,Zn.min(),r)}os(e,n,r,s){return this.Zi.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ib{constructor(e,n,r,s){this.persistence=e,this._s=n,this.serializer=s,this.us=new ze(Fe),this.cs=new Nr(i=>Nu(i),Vu),this.ls=new Map,this.hs=e.getRemoteDocumentCache(),this.Gr=e.getTargetCache(),this.jr=e.getBundleCache(),this.Ps(r)}Ps(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new G2(this.hs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.hs.setIndexManager(this.indexManager),this._s.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.us))}}function ob(t,e,n,r){return new ib(t,e,n,r)}async function k_(t,e){const n=Ee(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.Ps(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],c=[];let l=De();for(const u of s){o.push(u.batchId);for(const h of u.mutations)l=l.add(h.key)}for(const u of i){c.push(u.batchId);for(const h of u.mutations)l=l.add(h.key)}return n.localDocuments.getDocuments(r,l).next(u=>({Ts:u,removedBatchIds:o,addedBatchIds:c}))})})}function ab(t,e){const n=Ee(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.hs.newChangeBuffer({trackRemovals:!0});return function(c,l,u,h){const d=u.batch,p=d.keys();let m=W.resolve();return p.forEach(v=>{m=m.next(()=>h.getEntry(l,v)).next(R=>{const T=u.docVersions.get(v);Me(T!==null),R.version.compareTo(T)<0&&(d.applyToRemoteDocument(R,u),R.isValidDocument()&&(R.setReadTime(u.commitVersion),h.addEntry(R)))})}),m.next(()=>c.mutationQueue.removeMutationBatch(l,d))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=De();for(let u=0;u<c.mutationResults.length;++u)c.mutationResults[u].transformResults.length>0&&(l=l.add(c.batch.mutations[u].key));return l}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function B_(t){const e=Ee(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Gr.getLastRemoteSnapshotVersion(n))}function cb(t,e){const n=Ee(t),r=e.snapshotVersion;let s=n.us;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.hs.newChangeBuffer({trackRemovals:!0});s=n.us;const c=[];e.targetChanges.forEach((h,d)=>{const p=s.get(d);if(!p)return;c.push(n.Gr.removeMatchingKeys(i,h.removedDocuments,d).next(()=>n.Gr.addMatchingKeys(i,h.addedDocuments,d)));let m=p.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(d)!==null?m=m.withResumeToken(gt.EMPTY_BYTE_STRING,ve.min()).withLastLimboFreeSnapshotVersion(ve.min()):h.resumeToken.approximateByteSize()>0&&(m=m.withResumeToken(h.resumeToken,r)),s=s.insert(d,m),function(R,T,k){return R.resumeToken.approximateByteSize()===0||T.snapshotVersion.toMicroseconds()-R.snapshotVersion.toMicroseconds()>=3e8?!0:k.addedDocuments.size+k.modifiedDocuments.size+k.removedDocuments.size>0}(p,m,h)&&c.push(n.Gr.updateTargetData(i,m))});let l=Fn(),u=De();if(e.documentUpdates.forEach(h=>{e.resolvedLimboDocuments.has(h)&&c.push(n.persistence.referenceDelegate.updateLimboDocument(i,h))}),c.push(lb(i,o,e.documentUpdates).next(h=>{l=h.Is,u=h.Es})),!r.isEqual(ve.min())){const h=n.Gr.getLastRemoteSnapshotVersion(i).next(d=>n.Gr.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(h)}return W.waitFor(c).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,l,u)).next(()=>l)}).then(i=>(n.us=s,i))}function lb(t,e,n){let r=De(),s=De();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=Fn();return n.forEach((c,l)=>{const u=i.get(c);l.isFoundDocument()!==u.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(ve.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!u.isValidDocument()||l.version.compareTo(u.version)>0||l.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):oe("LocalStore","Ignoring outdated watch update for ",c,". Current version:",u.version," Watch version:",l.version)}),{Is:o,Es:s}})}function ub(t,e){const n=Ee(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function hb(t,e){const n=Ee(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Gr.getTargetData(r,e).next(i=>i?(s=i,W.resolve(s)):n.Gr.allocateTargetId(r).next(o=>(s=new Kn(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Gr.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.us.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.us=n.us.insert(r.targetId,r),n.cs.set(e,r.targetId)),r})}async function Ml(t,e,n){const r=Ee(t),s=r.us.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Rs(o))throw o;oe("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.us=r.us.remove(e),r.cs.delete(s.target)}function td(t,e,n){const r=Ee(t);let s=ve.min(),i=De();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,u,h){const d=Ee(l),p=d.cs.get(h);return p!==void 0?W.resolve(d.us.get(p)):d.Gr.getTargetData(u,h)}(r,o,an(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Gr.getMatchingKeysForTargetId(o,c.targetId).next(l=>{i=l})}).next(()=>r._s.getDocumentsMatchingQuery(o,e,n?s:ve.min(),n?i:De())).next(c=>(fb(r,JC(e),c),{documents:c,ds:i})))}function fb(t,e,n){let r=t.ls.get(e)||ve.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.ls.set(e,r)}class nd{constructor(){this.activeTargetIds=s2()}ps(e){this.activeTargetIds=this.activeTargetIds.add(e)}ys(e){this.activeTargetIds=this.activeTargetIds.delete(e)}gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class db{constructor(){this._o=new nd,this.ao={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this._o.ps(e),this.ao[e]||"not-current"}updateQueryState(e,n,r){this.ao[e]=n}removeLocalQueryTarget(e){this._o.ys(e)}isLocalQueryTarget(e){return this._o.activeTargetIds.has(e)}clearQueryState(e){delete this.ao[e]}getAllActiveQueryTargets(){return this._o.activeTargetIds}isActiveQueryTarget(e){return this._o.activeTargetIds.has(e)}start(){return this._o=new nd,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pb{uo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(){this.co=()=>this.lo(),this.ho=()=>this.Po(),this.To=[],this.Io()}uo(e){this.To.push(e)}shutdown(){window.removeEventListener("online",this.co),window.removeEventListener("offline",this.ho)}Io(){window.addEventListener("online",this.co),window.addEventListener("offline",this.ho)}lo(){oe("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.To)e(0)}Po(){oe("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.To)e(1)}static p(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let go=null;function el(){return go===null?go=function(){return 268435456+Math.round(2147483648*Math.random())}():go++,"0x"+go.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gb={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mb{constructor(e){this.Eo=e.Eo,this.Ao=e.Ao}Ro(e){this.Vo=e}mo(e){this.fo=e}po(e){this.yo=e}onMessage(e){this.wo=e}close(){this.Ao()}send(e){this.Eo(e)}So(){this.Vo()}bo(){this.fo()}Do(e){this.yo(e)}vo(e){this.wo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt="WebChannelConnection";class _b extends class{get Co(){return!1}constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Fo=r+"://"+n.host,this.Mo=`projects/${s}/databases/${i}`,this.xo=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}Oo(n,r,s,i,o){const c=el(),l=this.No(n,r.toUriEncodedString());oe("RestConnection",`Sending RPC '${n}' ${c}:`,l,s);const u={"google-cloud-resource-prefix":this.Mo,"x-goog-request-params":this.xo};return this.Lo(u,i,o),this.Bo(n,l,u,s).then(h=>(oe("RestConnection",`Received RPC '${n}' ${c}: `,h),h),h=>{throw _s("RestConnection",`RPC '${n}' ${c} failed with error: `,h,"url: ",l,"request:",s),h})}ko(n,r,s,i,o,c){return this.Oo(n,r,s,i,o)}Lo(n,r,s){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Cs}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,o)=>n[o]=i),s&&s.headers.forEach((i,o)=>n[o]=i)}No(n,r){const s=gb[n];return`${this.Fo}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Bo(e,n,r,s){const i=el();return new Promise((o,c)=>{const l=new Km;l.setWithCredentials(!0),l.listenOnce(Gm.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case Io.NO_ERROR:const h=l.getResponseJson();oe(xt,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(h)),o(h);break;case Io.TIMEOUT:oe(xt,`RPC '${e}' ${i} timed out`),c(new pe(X.DEADLINE_EXCEEDED,"Request time out"));break;case Io.HTTP_ERROR:const d=l.getStatus();if(oe(xt,`RPC '${e}' ${i} failed with status:`,d,"response text:",l.getResponseText()),d>0){let p=l.getResponseJson();Array.isArray(p)&&(p=p[0]);const m=p==null?void 0:p.error;if(m&&m.status&&m.message){const v=function(T){const k=T.toLowerCase().replace(/_/g,"-");return Object.values(X).indexOf(k)>=0?k:X.UNKNOWN}(m.status);c(new pe(v,m.message))}else c(new pe(X.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new pe(X.UNAVAILABLE,"Connection failed."));break;default:xe()}}finally{oe(xt,`RPC '${e}' ${i} completed.`)}});const u=JSON.stringify(s);oe(xt,`RPC '${e}' ${i} sending request:`,s),l.send(n,"POST",u,r,15)})}qo(e,n,r){const s=el(),i=[this.Fo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Ym(),c=Xm(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(l.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Lo(l.initMessageHeaders,n,r),l.encodeInitMessageHeaders=!0;const h=i.join("");oe(xt,`Creating RPC '${e}' stream ${s}: ${h}`,l);const d=o.createWebChannel(h,l);let p=!1,m=!1;const v=new mb({Eo:T=>{m?oe(xt,`Not sending because RPC '${e}' stream ${s} is closed:`,T):(p||(oe(xt,`Opening RPC '${e}' stream ${s} transport.`),d.open(),p=!0),oe(xt,`RPC '${e}' stream ${s} sending:`,T),d.send(T))},Ao:()=>d.close()}),R=(T,k,I)=>{T.listen(k,b=>{try{I(b)}catch(S){setTimeout(()=>{throw S},0)}})};return R(d,Ws.EventType.OPEN,()=>{m||(oe(xt,`RPC '${e}' stream ${s} transport opened.`),v.So())}),R(d,Ws.EventType.CLOSE,()=>{m||(m=!0,oe(xt,`RPC '${e}' stream ${s} transport closed`),v.Do())}),R(d,Ws.EventType.ERROR,T=>{m||(m=!0,_s(xt,`RPC '${e}' stream ${s} transport errored:`,T),v.Do(new pe(X.UNAVAILABLE,"The operation could not be completed")))}),R(d,Ws.EventType.MESSAGE,T=>{var k;if(!m){const I=T.data[0];Me(!!I);const b=I,S=(b==null?void 0:b.error)||((k=b[0])===null||k===void 0?void 0:k.error);if(S){oe(xt,`RPC '${e}' stream ${s} received error:`,S);const B=S.status;let O=function(E){const x=Ze[E];if(x!==void 0)return A_(x)}(B),y=S.message;O===void 0&&(O=X.INTERNAL,y="Unknown error status: "+B+" with message "+S.message),m=!0,v.Do(new pe(O,y)),d.close()}else oe(xt,`RPC '${e}' stream ${s} received:`,I),v.vo(I)}}),R(c,Qm.STAT_EVENT,T=>{T.stat===Sl.PROXY?oe(xt,`RPC '${e}' stream ${s} detected buffering proxy`):T.stat===Sl.NOPROXY&&oe(xt,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{v.bo()},0),v}}function tl(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uc(t){return new T2(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O_{constructor(e,n,r=1e3,s=1.5,i=6e4){this.li=e,this.timerId=n,this.Qo=r,this.Ko=s,this.$o=i,this.Uo=0,this.Wo=null,this.Go=Date.now(),this.reset()}reset(){this.Uo=0}zo(){this.Uo=this.$o}jo(e){this.cancel();const n=Math.floor(this.Uo+this.Ho()),r=Math.max(0,Date.now()-this.Go),s=Math.max(0,n-r);s>0&&oe("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Uo} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.Wo=this.li.enqueueAfterDelay(this.timerId,s,()=>(this.Go=Date.now(),e())),this.Uo*=this.Ko,this.Uo<this.Qo&&(this.Uo=this.Qo),this.Uo>this.$o&&(this.Uo=this.$o)}Jo(){this.Wo!==null&&(this.Wo.skipDelay(),this.Wo=null)}cancel(){this.Wo!==null&&(this.Wo.cancel(),this.Wo=null)}Ho(){return(Math.random()-.5)*this.Uo}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N_{constructor(e,n,r,s,i,o,c,l){this.li=e,this.Yo=r,this.Zo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.Xo=0,this.e_=null,this.t_=null,this.stream=null,this.n_=0,this.r_=new O_(e,n)}i_(){return this.state===1||this.state===5||this.s_()}s_(){return this.state===2||this.state===3}start(){this.n_=0,this.state!==4?this.auth():this.o_()}async stop(){this.i_()&&await this.close(0)}__(){this.state=0,this.r_.reset()}a_(){this.s_()&&this.e_===null&&(this.e_=this.li.enqueueAfterDelay(this.Yo,6e4,()=>this.u_()))}c_(e){this.l_(),this.stream.send(e)}async u_(){if(this.s_())return this.close(0)}l_(){this.e_&&(this.e_.cancel(),this.e_=null)}h_(){this.t_&&(this.t_.cancel(),this.t_=null)}async close(e,n){this.l_(),this.h_(),this.r_.cancel(),this.Xo++,e!==4?this.r_.reset():n&&n.code===X.RESOURCE_EXHAUSTED?(Pn(n.toString()),Pn("Using maximum backoff delay to prevent overloading the backend."),this.r_.zo()):n&&n.code===X.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.P_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.po(n)}P_(){}auth(){this.state=1;const e=this.T_(this.Xo),n=this.Xo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Xo===n&&this.I_(r,s)},r=>{e(()=>{const s=new pe(X.UNKNOWN,"Fetching auth token failed: "+r.message);return this.E_(s)})})}I_(e,n){const r=this.T_(this.Xo);this.stream=this.d_(e,n),this.stream.Ro(()=>{r(()=>this.listener.Ro())}),this.stream.mo(()=>{r(()=>(this.state=2,this.t_=this.li.enqueueAfterDelay(this.Zo,1e4,()=>(this.s_()&&(this.state=3),Promise.resolve())),this.listener.mo()))}),this.stream.po(s=>{r(()=>this.E_(s))}),this.stream.onMessage(s=>{r(()=>++this.n_==1?this.A_(s):this.onNext(s))})}o_(){this.state=5,this.r_.jo(async()=>{this.state=0,this.start()})}E_(e){return oe("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}T_(e){return n=>{this.li.enqueueAndForget(()=>this.Xo===e?n():(oe("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class xb extends N_{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}d_(e,n){return this.connection.qo("Listen",e,n)}A_(e){return this.onNext(e)}onNext(e){this.r_.reset();const n=b2(this.serializer,e),r=function(i){if(!("targetChange"in i))return ve.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?ve.min():o.readTime?cn(o.readTime):ve.min()}(e);return this.listener.R_(n,r)}V_(e){const n={};n.database=Ll(this.serializer),n.addTarget=function(i,o){let c;const l=o.target;if(c=kl(l)?{documents:D2(i,l)}:{query:P2(i,l).ct},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=I_(i,o.resumeToken);const u=Ol(i,o.expectedCount);u!==null&&(c.expectedCount=u)}else if(o.snapshotVersion.compareTo(ve.min())>0){c.readTime=ka(i,o.snapshotVersion.toTimestamp());const u=Ol(i,o.expectedCount);u!==null&&(c.expectedCount=u)}return c}(this.serializer,e);const r=k2(this.serializer,e);r&&(n.labels=r),this.c_(n)}m_(e){const n={};n.database=Ll(this.serializer),n.removeTarget=e,this.c_(n)}}class vb extends N_{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get f_(){return this.n_>0}start(){this.lastStreamToken=void 0,super.start()}P_(){this.f_&&this.g_([])}d_(e,n){return this.connection.qo("Write",e,n)}A_(e){return Me(!!e.streamToken),this.lastStreamToken=e.streamToken,Me(!e.writeResults||e.writeResults.length===0),this.listener.p_()}onNext(e){Me(!!e.streamToken),this.lastStreamToken=e.streamToken,this.r_.reset();const n=S2(e.writeResults,e.commitTime),r=cn(e.commitTime);return this.listener.y_(r,n)}w_(){const e={};e.database=Ll(this.serializer),this.c_(e)}g_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>R2(this.serializer,r))};this.c_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yb extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.S_=!1}b_(){if(this.S_)throw new pe(X.FAILED_PRECONDITION,"The client has already been terminated.")}Oo(e,n,r,s){return this.b_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Oo(e,Nl(n,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===X.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new pe(X.UNKNOWN,i.toString())})}ko(e,n,r,s,i){return this.b_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.ko(e,Nl(n,r),s,o,c,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===X.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new pe(X.UNKNOWN,o.toString())})}terminate(){this.S_=!0,this.connection.terminate()}}class Eb{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.D_=0,this.v_=null,this.C_=!0}F_(){this.D_===0&&(this.M_("Unknown"),this.v_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.v_=null,this.x_("Backend didn't respond within 10 seconds."),this.M_("Offline"),Promise.resolve())))}O_(e){this.state==="Online"?this.M_("Unknown"):(this.D_++,this.D_>=1&&(this.N_(),this.x_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.M_("Offline")))}set(e){this.N_(),this.D_=0,e==="Online"&&(this.C_=!1),this.M_(e)}M_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}x_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.C_?(Pn(n),this.C_=!1):oe("OnlineStateTracker",n)}N_(){this.v_!==null&&(this.v_.cancel(),this.v_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ab{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.L_=[],this.B_=new Map,this.k_=new Set,this.q_=[],this.Q_=i,this.Q_.uo(o=>{r.enqueueAndForget(async()=>{Lr(this)&&(oe("RemoteStore","Restarting streams for network reachability change."),await async function(l){const u=Ee(l);u.k_.add(4),await Ui(u),u.K_.set("Unknown"),u.k_.delete(4),await hc(u)}(this))})}),this.K_=new Eb(r,s)}}async function hc(t){if(Lr(t))for(const e of t.q_)await e(!0)}async function Ui(t){for(const e of t.q_)await e(!1)}function V_(t,e){const n=Ee(t);n.B_.has(e.targetId)||(n.B_.set(e.targetId,e),Qu(n)?Gu(n):Ss(n).s_()&&Ku(n,e))}function Wu(t,e){const n=Ee(t),r=Ss(n);n.B_.delete(e),r.s_()&&L_(n,e),n.B_.size===0&&(r.s_()?r.a_():Lr(n)&&n.K_.set("Unknown"))}function Ku(t,e){if(t.U_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ve.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Ss(t).V_(e)}function L_(t,e){t.U_.xe(e),Ss(t).m_(e)}function Gu(t){t.U_=new y2({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ut:e=>t.B_.get(e)||null,nt:()=>t.datastore.serializer.databaseId}),Ss(t).start(),t.K_.F_()}function Qu(t){return Lr(t)&&!Ss(t).i_()&&t.B_.size>0}function Lr(t){return Ee(t).k_.size===0}function M_(t){t.U_=void 0}async function wb(t){t.K_.set("Online")}async function Tb(t){t.B_.forEach((e,n)=>{Ku(t,e)})}async function Ib(t,e){M_(t),Qu(t)?(t.K_.O_(e),Gu(t)):t.K_.set("Unknown")}async function Cb(t,e,n){if(t.K_.set("Online"),e instanceof T_&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const c of i.targetIds)s.B_.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.B_.delete(c),s.U_.removeTarget(c))}(t,e)}catch(r){oe("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Oa(t,r)}else if(e instanceof So?t.U_.$e(e):e instanceof w_?t.U_.Je(e):t.U_.Ge(e),!n.isEqual(ve.min()))try{const r=await B_(t.localStore);n.compareTo(r)>=0&&await function(i,o){const c=i.U_.it(o);return c.targetChanges.forEach((l,u)=>{if(l.resumeToken.approximateByteSize()>0){const h=i.B_.get(u);h&&i.B_.set(u,h.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,u)=>{const h=i.B_.get(l);if(!h)return;i.B_.set(l,h.withResumeToken(gt.EMPTY_BYTE_STRING,h.snapshotVersion)),L_(i,l);const d=new Kn(h.target,l,u,h.sequenceNumber);Ku(i,d)}),i.remoteSyncer.applyRemoteEvent(c)}(t,n)}catch(r){oe("RemoteStore","Failed to raise snapshot:",r),await Oa(t,r)}}async function Oa(t,e,n){if(!Rs(e))throw e;t.k_.add(1),await Ui(t),t.K_.set("Offline"),n||(n=()=>B_(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{oe("RemoteStore","Retrying IndexedDB access"),await n(),t.k_.delete(1),await hc(t)})}function U_(t,e){return e().catch(n=>Oa(t,n,e))}async function fc(t){const e=Ee(t),n=rr(e);let r=e.L_.length>0?e.L_[e.L_.length-1].batchId:-1;for(;bb(e);)try{const s=await ub(e.localStore,r);if(s===null){e.L_.length===0&&n.a_();break}r=s.batchId,Rb(e,s)}catch(s){await Oa(e,s)}$_(e)&&H_(e)}function bb(t){return Lr(t)&&t.L_.length<10}function Rb(t,e){t.L_.push(e);const n=rr(t);n.s_()&&n.f_&&n.g_(e.mutations)}function $_(t){return Lr(t)&&!rr(t).i_()&&t.L_.length>0}function H_(t){rr(t).start()}async function Sb(t){rr(t).w_()}async function Db(t){const e=rr(t);for(const n of t.L_)e.g_(n.mutations)}async function Pb(t,e,n){const r=t.L_.shift(),s=Uu.from(r,e,n);await U_(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await fc(t)}async function Fb(t,e){e&&rr(t).f_&&await async function(r,s){if(function(o){return _2(o)&&o!==X.ABORTED}(s.code)){const i=r.L_.shift();rr(r).__(),await U_(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await fc(r)}}(t,e),$_(t)&&H_(t)}async function sd(t,e){const n=Ee(t);n.asyncQueue.verifyOperationInProgress(),oe("RemoteStore","RemoteStore received new credentials");const r=Lr(n);n.k_.add(3),await Ui(n),r&&n.K_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.k_.delete(3),await hc(n)}async function kb(t,e){const n=Ee(t);e?(n.k_.delete(2),await hc(n)):e||(n.k_.add(2),await Ui(n),n.K_.set("Unknown"))}function Ss(t){return t.W_||(t.W_=function(n,r,s){const i=Ee(n);return i.b_(),new xb(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Ro:wb.bind(null,t),mo:Tb.bind(null,t),po:Ib.bind(null,t),R_:Cb.bind(null,t)}),t.q_.push(async e=>{e?(t.W_.__(),Qu(t)?Gu(t):t.K_.set("Unknown")):(await t.W_.stop(),M_(t))})),t.W_}function rr(t){return t.G_||(t.G_=function(n,r,s){const i=Ee(n);return i.b_(),new vb(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Ro:()=>Promise.resolve(),mo:Sb.bind(null,t),po:Fb.bind(null,t),p_:Db.bind(null,t),y_:Pb.bind(null,t)}),t.q_.push(async e=>{e?(t.G_.__(),await fc(t)):(await t.G_.stop(),t.L_.length>0&&(oe("RemoteStore",`Stopping write stream with ${t.L_.length} pending writes`),t.L_=[]))})),t.G_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xu{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Jn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,c=new Xu(e,n,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new pe(X.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Yu(t,e){if(Pn("AsyncQueue",`${e}: ${t}`),Rs(t))return new pe(X.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fs{static emptySet(e){return new fs(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||ge.comparator(n.key,r.key):(n,r)=>ge.comparator(n.key,r.key),this.keyedMap=Ks(),this.sortedSet=new ze(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof fs)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new fs;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(){this.z_=new ze(ge.comparator)}track(e){const n=e.doc.key,r=this.z_.get(n);r?e.type!==0&&r.type===3?this.z_=this.z_.insert(n,e):e.type===3&&r.type!==1?this.z_=this.z_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.z_=this.z_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.z_=this.z_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.z_=this.z_.remove(n):e.type===1&&r.type===2?this.z_=this.z_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.z_=this.z_.insert(n,{type:2,doc:e.doc}):xe():this.z_=this.z_.insert(n,e)}j_(){const e=[];return this.z_.inorderTraversal((n,r)=>{e.push(r)}),e}}class As{constructor(e,n,r,s,i,o,c,l,u){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=u}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(c=>{o.push({type:0,doc:c})}),new As(e,n,fs.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ic(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bb{constructor(){this.H_=void 0,this.J_=[]}Y_(){return this.J_.some(e=>e.Z_())}}class Ob{constructor(){this.queries=od(),this.onlineState="Unknown",this.X_=new Set}terminate(){(function(n,r){const s=Ee(n),i=s.queries;s.queries=od(),i.forEach((o,c)=>{for(const l of c.J_)l.onError(r)})})(this,new pe(X.ABORTED,"Firestore shutting down"))}}function od(){return new Nr(t=>l_(t),ic)}async function Nb(t,e){const n=Ee(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.Y_()&&e.Z_()&&(r=2):(i=new Bb,r=e.Z_()?0:1);try{switch(r){case 0:i.H_=await n.onListen(s,!0);break;case 1:i.H_=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const c=Yu(o,`Initialization of query '${es(e.query)}' failed`);return void e.onError(c)}n.queries.set(s,i),i.J_.push(e),e.ea(n.onlineState),i.H_&&e.ta(i.H_)&&Ju(n)}async function Vb(t,e){const n=Ee(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.J_.indexOf(e);o>=0&&(i.J_.splice(o,1),i.J_.length===0?s=e.Z_()?0:1:!i.Y_()&&e.Z_()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function Lb(t,e){const n=Ee(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const c of o.J_)c.ta(s)&&(r=!0);o.H_=s}}r&&Ju(n)}function Mb(t,e,n){const r=Ee(t),s=r.queries.get(e);if(s)for(const i of s.J_)i.onError(n);r.queries.delete(e)}function Ju(t){t.X_.forEach(e=>{e.next()})}var Ul,ad;(ad=Ul||(Ul={})).na="default",ad.Cache="cache";class Ub{constructor(e,n,r){this.query=e,this.ra=n,this.ia=!1,this.sa=null,this.onlineState="Unknown",this.options=r||{}}ta(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new As(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.ia?this.oa(e)&&(this.ra.next(e),n=!0):this._a(e,this.onlineState)&&(this.aa(e),n=!0),this.sa=e,n}onError(e){this.ra.error(e)}ea(e){this.onlineState=e;let n=!1;return this.sa&&!this.ia&&this._a(this.sa,e)&&(this.aa(this.sa),n=!0),n}_a(e,n){if(!e.fromCache||!this.Z_())return!0;const r=n!=="Offline";return(!this.options.ua||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}oa(e){if(e.docChanges.length>0)return!0;const n=this.sa&&this.sa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}aa(e){e=As.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ia=!0,this.ra.next(e)}Z_(){return this.options.source!==Ul.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q_{constructor(e){this.key=e}}class j_{constructor(e){this.key=e}}class $b{constructor(e,n){this.query=e,this.da=n,this.Aa=null,this.hasCachedResults=!1,this.current=!1,this.Ra=De(),this.mutatedKeys=De(),this.Va=u_(e),this.ma=new fs(this.Va)}get fa(){return this.da}ga(e,n){const r=n?n.pa:new id,s=n?n.ma:this.ma;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,u=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((h,d)=>{const p=s.get(h),m=oc(this.query,d)?d:null,v=!!p&&this.mutatedKeys.has(p.key),R=!!m&&(m.hasLocalMutations||this.mutatedKeys.has(m.key)&&m.hasCommittedMutations);let T=!1;p&&m?p.data.isEqual(m.data)?v!==R&&(r.track({type:3,doc:m}),T=!0):this.ya(p,m)||(r.track({type:2,doc:m}),T=!0,(l&&this.Va(m,l)>0||u&&this.Va(m,u)<0)&&(c=!0)):!p&&m?(r.track({type:0,doc:m}),T=!0):p&&!m&&(r.track({type:1,doc:p}),T=!0,(l||u)&&(c=!0)),T&&(m?(o=o.add(m),i=R?i.add(h):i.delete(h)):(o=o.delete(h),i=i.delete(h)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),i=i.delete(h.key),r.track({type:1,doc:h})}return{ma:o,pa:r,ss:c,mutatedKeys:i}}ya(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.ma;this.ma=e.ma,this.mutatedKeys=e.mutatedKeys;const o=e.pa.j_();o.sort((h,d)=>function(m,v){const R=T=>{switch(T){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return xe()}};return R(m)-R(v)}(h.type,d.type)||this.Va(h.doc,d.doc)),this.wa(r),s=s!=null&&s;const c=n&&!s?this.Sa():[],l=this.Ra.size===0&&this.current&&!s?1:0,u=l!==this.Aa;return this.Aa=l,o.length!==0||u?{snapshot:new As(this.query,e.ma,i,o,e.mutatedKeys,l===0,u,!1,!!r&&r.resumeToken.approximateByteSize()>0),ba:c}:{ba:c}}ea(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({ma:this.ma,pa:new id,mutatedKeys:this.mutatedKeys,ss:!1},!1)):{ba:[]}}Da(e){return!this.da.has(e)&&!!this.ma.has(e)&&!this.ma.get(e).hasLocalMutations}wa(e){e&&(e.addedDocuments.forEach(n=>this.da=this.da.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.da=this.da.delete(n)),this.current=e.current)}Sa(){if(!this.current)return[];const e=this.Ra;this.Ra=De(),this.ma.forEach(r=>{this.Da(r.key)&&(this.Ra=this.Ra.add(r.key))});const n=[];return e.forEach(r=>{this.Ra.has(r)||n.push(new j_(r))}),this.Ra.forEach(r=>{e.has(r)||n.push(new q_(r))}),n}va(e){this.da=e.ds,this.Ra=De();const n=this.ga(e.documents);return this.applyChanges(n,!0)}Ca(){return As.fromInitialDocuments(this.query,this.ma,this.mutatedKeys,this.Aa===0,this.hasCachedResults)}}class Hb{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class qb{constructor(e){this.key=e,this.Fa=!1}}class jb{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ma={},this.xa=new Nr(c=>l_(c),ic),this.Oa=new Map,this.Na=new Set,this.La=new ze(ge.comparator),this.Ba=new Map,this.ka=new qu,this.qa={},this.Qa=new Map,this.Ka=Es.Qn(),this.onlineState="Unknown",this.$a=void 0}get isPrimaryClient(){return this.$a===!0}}async function zb(t,e,n=!0){const r=X_(t);let s;const i=r.xa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Ca()):s=await z_(r,e,n,!0),s}async function Wb(t,e){const n=X_(t);await z_(n,e,!0,!1)}async function z_(t,e,n,r){const s=await hb(t.localStore,an(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let c;return r&&(c=await Kb(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&V_(t.remoteStore,s),c}async function Kb(t,e,n,r,s){t.Ua=(d,p,m)=>async function(R,T,k,I){let b=T.view.ga(k);b.ss&&(b=await td(R.localStore,T.query,!1).then(({documents:y})=>T.view.ga(y,b)));const S=I&&I.targetChanges.get(T.targetId),B=I&&I.targetMismatches.get(T.targetId)!=null,O=T.view.applyChanges(b,R.isPrimaryClient,S,B);return ld(R,T.targetId,O.ba),O.snapshot}(t,d,p,m);const i=await td(t.localStore,e,!0),o=new $b(e,i.ds),c=o.ga(i.documents),l=Mi.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),u=o.applyChanges(c,t.isPrimaryClient,l);ld(t,n,u.ba);const h=new Hb(e,n,o);return t.xa.set(e,h),t.Oa.has(n)?t.Oa.get(n).push(e):t.Oa.set(n,[e]),u.snapshot}async function Gb(t,e,n){const r=Ee(t),s=r.xa.get(e),i=r.Oa.get(s.targetId);if(i.length>1)return r.Oa.set(s.targetId,i.filter(o=>!ic(o,e))),void r.xa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Ml(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Wu(r.remoteStore,s.targetId),$l(r,s.targetId)}).catch(bs)):($l(r,s.targetId),await Ml(r.localStore,s.targetId,!0))}async function Qb(t,e){const n=Ee(t),r=n.xa.get(e),s=n.Oa.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Wu(n.remoteStore,r.targetId))}async function Xb(t,e,n){const r=r4(t);try{const s=await function(o,c){const l=Ee(o),u=st.now(),h=c.reduce((m,v)=>m.add(v.key),De());let d,p;return l.persistence.runTransaction("Locally write mutations","readwrite",m=>{let v=Fn(),R=De();return l.hs.getEntries(m,h).next(T=>{v=T,v.forEach((k,I)=>{I.isValidDocument()||(R=R.add(k))})}).next(()=>l.localDocuments.getOverlayedDocuments(m,v)).next(T=>{d=T;const k=[];for(const I of c){const b=f2(I,d.get(I.key).overlayedDocument);b!=null&&k.push(new Vr(I.key,b,n_(b.value.mapValue),Rn.exists(!0)))}return l.mutationQueue.addMutationBatch(m,u,k,c)}).next(T=>{p=T;const k=T.applyToLocalDocumentSet(d,R);return l.documentOverlayCache.saveOverlays(m,T.batchId,k)})}).then(()=>({batchId:p.batchId,changes:f_(d)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,c,l){let u=o.qa[o.currentUser.toKey()];u||(u=new ze(Fe)),u=u.insert(c,l),o.qa[o.currentUser.toKey()]=u}(r,s.batchId,n),await $i(r,s.changes),await fc(r.remoteStore)}catch(s){const i=Yu(s,"Failed to persist write");n.reject(i)}}async function W_(t,e){const n=Ee(t);try{const r=await cb(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Ba.get(i);o&&(Me(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.Fa=!0:s.modifiedDocuments.size>0?Me(o.Fa):s.removedDocuments.size>0&&(Me(o.Fa),o.Fa=!1))}),await $i(n,r,e)}catch(r){await bs(r)}}function cd(t,e,n){const r=Ee(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.xa.forEach((i,o)=>{const c=o.view.ea(e);c.snapshot&&s.push(c.snapshot)}),function(o,c){const l=Ee(o);l.onlineState=c;let u=!1;l.queries.forEach((h,d)=>{for(const p of d.J_)p.ea(c)&&(u=!0)}),u&&Ju(l)}(r.eventManager,e),s.length&&r.Ma.R_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Yb(t,e,n){const r=Ee(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Ba.get(e),i=s&&s.key;if(i){let o=new ze(ge.comparator);o=o.insert(i,Et.newNoDocument(i,ve.min()));const c=De().add(i),l=new lc(ve.min(),new Map,new ze(Fe),o,c);await W_(r,l),r.La=r.La.remove(i),r.Ba.delete(e),Zu(r)}else await Ml(r.localStore,e,!1).then(()=>$l(r,e,n)).catch(bs)}async function Jb(t,e){const n=Ee(t),r=e.batch.batchId;try{const s=await ab(n.localStore,e);G_(n,r,null),K_(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await $i(n,s)}catch(s){await bs(s)}}async function Zb(t,e,n){const r=Ee(t);try{const s=await function(o,c){const l=Ee(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let h;return l.mutationQueue.lookupMutationBatch(u,c).next(d=>(Me(d!==null),h=d.keys(),l.mutationQueue.removeMutationBatch(u,d))).next(()=>l.mutationQueue.performConsistencyCheck(u)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(u,h,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,h)).next(()=>l.localDocuments.getDocuments(u,h))})}(r.localStore,e);G_(r,e,n),K_(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await $i(r,s)}catch(s){await bs(s)}}function K_(t,e){(t.Qa.get(e)||[]).forEach(n=>{n.resolve()}),t.Qa.delete(e)}function G_(t,e,n){const r=Ee(t);let s=r.qa[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.qa[r.currentUser.toKey()]=s}}function $l(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Oa.get(e))t.xa.delete(r),n&&t.Ma.Wa(r,n);t.Oa.delete(e),t.isPrimaryClient&&t.ka.yr(e).forEach(r=>{t.ka.containsKey(r)||Q_(t,r)})}function Q_(t,e){t.Na.delete(e.path.canonicalString());const n=t.La.get(e);n!==null&&(Wu(t.remoteStore,n),t.La=t.La.remove(e),t.Ba.delete(n),Zu(t))}function ld(t,e,n){for(const r of n)r instanceof q_?(t.ka.addReference(r.key,e),e4(t,r)):r instanceof j_?(oe("SyncEngine","Document no longer in limbo: "+r.key),t.ka.removeReference(r.key,e),t.ka.containsKey(r.key)||Q_(t,r.key)):xe()}function e4(t,e){const n=e.key,r=n.path.canonicalString();t.La.get(n)||t.Na.has(r)||(oe("SyncEngine","New document in limbo: "+n),t.Na.add(r),Zu(t))}function Zu(t){for(;t.Na.size>0&&t.La.size<t.maxConcurrentLimboResolutions;){const e=t.Na.values().next().value;t.Na.delete(e);const n=new ge(Ge.fromString(e)),r=t.Ka.next();t.Ba.set(r,new qb(n)),t.La=t.La.insert(n,r),V_(t.remoteStore,new Kn(an(Lu(n.path)),r,"TargetPurposeLimboResolution",tc.oe))}}async function $i(t,e,n){const r=Ee(t),s=[],i=[],o=[];r.xa.isEmpty()||(r.xa.forEach((c,l)=>{o.push(r.Ua(l,e,n).then(u=>{var h;if((u||n)&&r.isPrimaryClient){const d=u?!u.fromCache:(h=n==null?void 0:n.targetChanges.get(l.targetId))===null||h===void 0?void 0:h.current;r.sharedClientState.updateQueryState(l.targetId,d?"current":"not-current")}if(u){s.push(u);const d=zu.zi(l.targetId,u);i.push(d)}}))}),await Promise.all(o),r.Ma.R_(s),await async function(l,u){const h=Ee(l);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",d=>W.forEach(u,p=>W.forEach(p.Wi,m=>h.persistence.referenceDelegate.addReference(d,p.targetId,m)).next(()=>W.forEach(p.Gi,m=>h.persistence.referenceDelegate.removeReference(d,p.targetId,m)))))}catch(d){if(!Rs(d))throw d;oe("LocalStore","Failed to update sequence numbers: "+d)}for(const d of u){const p=d.targetId;if(!d.fromCache){const m=h.us.get(p),v=m.snapshotVersion,R=m.withLastLimboFreeSnapshotVersion(v);h.us=h.us.insert(p,R)}}}(r.localStore,i))}async function t4(t,e){const n=Ee(t);if(!n.currentUser.isEqual(e)){oe("SyncEngine","User change. New user:",e.toKey());const r=await k_(n.localStore,e);n.currentUser=e,function(i,o){i.Qa.forEach(c=>{c.forEach(l=>{l.reject(new pe(X.CANCELLED,o))})}),i.Qa.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await $i(n,r.Ts)}}function n4(t,e){const n=Ee(t),r=n.Ba.get(e);if(r&&r.Fa)return De().add(r.key);{let s=De();const i=n.Oa.get(e);if(!i)return s;for(const o of i){const c=n.xa.get(o);s=s.unionWith(c.view.fa)}return s}}function X_(t){const e=Ee(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=W_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=n4.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Yb.bind(null,e),e.Ma.R_=Lb.bind(null,e.eventManager),e.Ma.Wa=Mb.bind(null,e.eventManager),e}function r4(t){const e=Ee(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Jb.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Zb.bind(null,e),e}class Na{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=uc(e.databaseInfo.databaseId),this.sharedClientState=this.za(e),this.persistence=this.ja(e),await this.persistence.start(),this.localStore=this.Ha(e),this.gcScheduler=this.Ja(e,this.localStore),this.indexBackfillerScheduler=this.Ya(e,this.localStore)}Ja(e,n){return null}Ya(e,n){return null}Ha(e){return ob(this.persistence,new sb,e.initialUser,this.serializer)}ja(e){return new F_(ju.ei,this.serializer)}za(e){return new db}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Na.provider={build:()=>new Na};class s4 extends Na{constructor(e){super(),this.cacheSizeBytes=e}Ja(e,n){Me(this.persistence.referenceDelegate instanceof Ba);const r=this.persistence.referenceDelegate.garbageCollector;return new q2(r,e.asyncQueue,n)}ja(e){const n=this.cacheSizeBytes!==void 0?Dt.withCacheSize(this.cacheSizeBytes):Dt.DEFAULT;return new F_(r=>Ba.ei(r,n),this.serializer)}}class Hl{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>cd(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=t4.bind(null,this.syncEngine),await kb(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Ob}()}createDatastore(e){const n=uc(e.databaseInfo.databaseId),r=function(i){return new _b(i)}(e.databaseInfo);return function(i,o,c,l){return new yb(i,o,c,l)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,o,c){return new Ab(r,s,i,o,c)}(this.localStore,this.datastore,e.asyncQueue,n=>cd(this.syncEngine,n,0),function(){return rd.p()?new rd:new pb}())}createSyncEngine(e,n){return function(s,i,o,c,l,u,h){const d=new jb(s,i,o,c,l,u);return h&&(d.$a=!0),d}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){const i=Ee(s);oe("RemoteStore","RemoteStore shutting down."),i.k_.add(5),await Ui(i),i.Q_.shutdown(),i.K_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Hl.provider={build:()=>new Hl};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i4{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Xa(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Xa(this.observer.error,e):Pn("Uncaught Error in snapshot listener:",e.toString()))}eu(){this.muted=!0}Xa(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o4{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=vt.UNAUTHENTICATED,this.clientId=Zm.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{oe("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(oe("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Jn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Yu(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function nl(t,e){t.asyncQueue.verifyOperationInProgress(),oe("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await k_(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function ud(t,e){t.asyncQueue.verifyOperationInProgress();const n=await a4(t);oe("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>sd(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>sd(e.remoteStore,s)),t._onlineComponents=e}async function a4(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){oe("FirestoreClient","Using user provided OfflineComponentProvider");try{await nl(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===X.FAILED_PRECONDITION||s.code===X.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;_s("Error using user provided cache. Falling back to memory cache: "+n),await nl(t,new Na)}}else oe("FirestoreClient","Using default OfflineComponentProvider"),await nl(t,new s4(void 0));return t._offlineComponents}async function Y_(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(oe("FirestoreClient","Using user provided OnlineComponentProvider"),await ud(t,t._uninitializedComponentsProvider._online)):(oe("FirestoreClient","Using default OnlineComponentProvider"),await ud(t,new Hl))),t._onlineComponents}function c4(t){return Y_(t).then(e=>e.syncEngine)}async function l4(t){const e=await Y_(t),n=e.eventManager;return n.onListen=zb.bind(null,e.syncEngine),n.onUnlisten=Gb.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=Wb.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=Qb.bind(null,e.syncEngine),n}function u4(t,e,n={}){const r=new Jn;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,c,l,u){const h=new i4({next:p=>{h.eu(),o.enqueueAndForget(()=>Vb(i,d));const m=p.docs.has(c);!m&&p.fromCache?u.reject(new pe(X.UNAVAILABLE,"Failed to get document because the client is offline.")):m&&p.fromCache&&l&&l.source==="server"?u.reject(new pe(X.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(p)},error:p=>u.reject(p)}),d=new Ub(Lu(c.path),h,{includeMetadataChanges:!0,ua:!0});return Nb(i,d)}(await l4(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J_(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hd=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h4(t,e,n){if(!n)throw new pe(X.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function f4(t,e,n,r){if(e===!0&&r===!0)throw new pe(X.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function fd(t){if(!ge.isDocumentKey(t))throw new pe(X.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function e0(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":xe()}function Ri(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new pe(X.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=e0(t);throw new pe(X.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dd{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new pe(X.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new pe(X.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}f4("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=J_((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new pe(X.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new pe(X.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new pe(X.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class t0{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new dd({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new pe(X.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new pe(X.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new dd(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new _C;switch(r.type){case"firstParty":return new EC(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new pe(X.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=hd.get(n);r&&(oe("ComponentProvider","Removing Datastore"),hd.delete(n),r.terminate())}(this),Promise.resolve()}}function d4(t,e,n,r={}){var s;const i=(t=Ri(t,t0))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&_s("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let c,l;if(typeof r.mockUserToken=="string")c=r.mockUserToken,l=vt.MOCK_USER;else{c=RE(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const u=r.mockUserToken.sub||r.mockUserToken.user_id;if(!u)throw new pe(X.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new vt(u)}t._authCredentials=new xC(new Jm(c,l))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n0{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n0(this.firestore,e,this._query)}}class $t{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Si(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new $t(this.firestore,e,this._key)}}class Si extends n0{constructor(e,n,r){super(e,n,Lu(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new $t(this.firestore,null,new ge(e))}withConverter(e){return new Si(this.firestore,e,this._path)}}function pd(t,e,...n){if(t=kt(t),arguments.length===1&&(e=Zm.newId()),h4("doc","path",e),t instanceof t0){const r=Ge.fromString(e,...n);return fd(r),new $t(t,null,new ge(r))}{if(!(t instanceof $t||t instanceof Si))throw new pe(X.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Ge.fromString(e,...n));return fd(r),new $t(t.firestore,t instanceof Si?t.converter:null,new ge(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gd{constructor(e=Promise.resolve()){this.Iu=[],this.Eu=!1,this.du=[],this.Au=null,this.Ru=!1,this.Vu=!1,this.mu=[],this.r_=new O_(this,"async_queue_retry"),this.fu=()=>{const r=tl();r&&oe("AsyncQueue","Visibility state changed to "+r.visibilityState),this.r_.Jo()},this.gu=e;const n=tl();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.fu)}get isShuttingDown(){return this.Eu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.pu(),this.yu(e)}enterRestrictedMode(e){if(!this.Eu){this.Eu=!0,this.Vu=e||!1;const n=tl();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.fu)}}enqueue(e){if(this.pu(),this.Eu)return new Promise(()=>{});const n=new Jn;return this.yu(()=>this.Eu&&this.Vu?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Iu.push(e),this.wu()))}async wu(){if(this.Iu.length!==0){try{await this.Iu[0](),this.Iu.shift(),this.r_.reset()}catch(e){if(!Rs(e))throw e;oe("AsyncQueue","Operation failed with retryable error: "+e)}this.Iu.length>0&&this.r_.jo(()=>this.wu())}}yu(e){const n=this.gu.then(()=>(this.Ru=!0,e().catch(r=>{this.Au=r,this.Ru=!1;const s=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw Pn("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.Ru=!1,r))));return this.gu=n,n}enqueueAfterDelay(e,n,r){this.pu(),this.mu.indexOf(e)>-1&&(n=0);const s=Xu.createAndSchedule(this,e,n,r,i=>this.Su(i));return this.du.push(s),s}pu(){this.Au&&xe()}verifyOperationInProgress(){}async bu(){let e;do e=this.gu,await e;while(e!==this.gu)}Du(e){for(const n of this.du)if(n.timerId===e)return!0;return!1}vu(e){return this.bu().then(()=>{this.du.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.du)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.bu()})}Cu(e){this.mu.push(e)}Su(e){const n=this.du.indexOf(e);this.du.splice(n,1)}}class r0 extends t0{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new gd,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new gd(e),this._firestoreClient=void 0,await e}}}function p4(t,e){const n=typeof t=="object"?t:gu(),r=typeof t=="string"?t:"(default)",s=Br(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=CE("firestore");i&&d4(s,...i)}return s}function Z_(t){if(t._terminated)throw new pe(X.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||g4(t),t._firestoreClient}function g4(t){var e,n,r;const s=t._freezeSettings(),i=function(c,l,u,h){return new NC(c,l,u,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,J_(h.experimentalLongPollingOptions),h.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new o4(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(c){const l=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(l),_online:l}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ws(gt.fromBase64String(e))}catch(n){throw new pe(X.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new ws(gt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s0{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new pe(X.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new pt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i0{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o0{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new pe(X.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new pe(X.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Fe(this._lat,e._lat)||Fe(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a0{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m4=/^__.*__$/;class _4{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Vr(e,this.data,this.fieldMask,n,this.fieldTransforms):new Li(e,this.data,n,this.fieldTransforms)}}function ex(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw xe()}}class c0{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Fu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Mu(){return this.settings.Mu}xu(e){return new c0(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Ou(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.xu({path:r,Nu:!1});return s.Lu(e),s}Bu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.xu({path:r,Nu:!1});return s.Fu(),s}ku(e){return this.xu({path:void 0,Nu:!0})}qu(e){return Va(e,this.settings.methodName,this.settings.Qu||!1,this.path,this.settings.Ku)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Fu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Lu(this.path.get(e))}Lu(e){if(e.length===0)throw this.qu("Document fields must not be empty");if(ex(this.Mu)&&m4.test(e))throw this.qu('Document fields cannot begin and end with "__"')}}class x4{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||uc(e)}$u(e,n,r,s=!1){return new c0({Mu:e,methodName:n,Ku:r,path:pt.emptyPath(),Nu:!1,Qu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function v4(t){const e=t._freezeSettings(),n=uc(t._databaseId);return new x4(t._databaseId,!!e.ignoreUndefinedProperties,n)}function y4(t,e,n,r,s,i={}){const o=t.$u(i.merge||i.mergeFields?2:0,e,n,s);sx("Data must be an object, but it was:",o,r);const c=nx(r,o);let l,u;if(i.merge)l=new jt(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const h=[];for(const d of i.mergeFields){const p=E4(e,d,n);if(!o.contains(p))throw new pe(X.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);w4(h,p)||h.push(p)}l=new jt(h),u=o.fieldTransforms.filter(d=>l.covers(d.field))}else l=null,u=o.fieldTransforms;return new _4(new Mt(c),l,u)}class l0 extends i0{_toFieldTransform(e){return new c2(e.path,new Ii)}isEqual(e){return e instanceof l0}}function tx(t,e){if(rx(t=kt(t)))return sx("Unsupported field value:",e,t),nx(t,e);if(t instanceof i0)return function(r,s){if(!ex(s.Mu))throw s.qu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.qu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.Nu&&e.Mu!==4)throw e.qu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const c of r){let l=tx(c,s.ku(o));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),o++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=kt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return i2(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=st.fromDate(r);return{timestampValue:ka(s.serializer,i)}}if(r instanceof st){const i=new st(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ka(s.serializer,i)}}if(r instanceof o0)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ws)return{bytesValue:I_(s.serializer,r._byteString)};if(r instanceof $t){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.qu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Hu(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof a0)return function(o,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(l=>{if(typeof l!="number")throw c.qu("VectorValues must only contain numeric values.");return Mu(c.serializer,l)})}}}}}}(r,s);throw s.qu(`Unsupported field value: ${e0(r)}`)}(t,e)}function nx(t,e){const n={};return e_(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Or(t,(r,s)=>{const i=tx(s,e.Ou(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function rx(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof st||t instanceof o0||t instanceof ws||t instanceof $t||t instanceof i0||t instanceof a0)}function sx(t,e,n){if(!rx(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const r=e0(n);throw r==="an object"?e.qu(t+" a custom object"):e.qu(t+" "+r)}}function E4(t,e,n){if((e=kt(e))instanceof s0)return e._internalPath;if(typeof e=="string")return ix(t,e);throw Va("Field path arguments must be of type string or ",t,!1,void 0,n)}const A4=new RegExp("[~\\*/\\[\\]]");function ix(t,e,n){if(e.search(A4)>=0)throw Va(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new s0(...e.split("."))._internalPath}catch{throw Va(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Va(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;n&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||o)&&(l+=" (found",i&&(l+=` in field ${r}`),o&&(l+=` in document ${s}`),l+=")"),new pe(X.INVALID_ARGUMENT,c+t+l)}function w4(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ox{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new $t(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new T4(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(ax("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class T4 extends ox{data(){return super.data()}}function ax(t,e){return typeof e=="string"?ix(t,e):e instanceof s0?e._internalPath:e._delegate._internalPath}class I4{convertValue(e,n="none"){switch(nr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Qe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(tr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw xe()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Or(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){var n,r,s;const i=(s=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>Qe(o.doubleValue));return new a0(i)}convertGeoPoint(e){return new o0(Qe(e.latitude),Qe(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=rc(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Ai(e));default:return null}}convertTimestamp(e){const n=er(e);return new st(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Ge.fromString(e);Me(P_(r));const s=new wi(r.get(1),r.get(3)),i=new ge(r.popFirst(5));return s.isEqual(n)||Pn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C4(t,e,n){let r;return r=t?n.merge||n.mergeFields?t.toFirestore(e,n):t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b4{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class cx extends ox{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new R4(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(ax("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class R4 extends cx{data(e={}){return super.data(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S4(t){t=Ri(t,$t);const e=Ri(t.firestore,r0);return u4(Z_(e),t._key).then(n=>k4(e,t,n))}class D4 extends I4{constructor(e){super(),this.firestore=e}convertBytes(e){return new ws(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new $t(this.firestore,null,n)}}function P4(t,e,n){t=Ri(t,$t);const r=Ri(t.firestore,r0),s=C4(t.converter,e,n);return F4(r,[y4(v4(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,Rn.none())])}function F4(t,e){return function(r,s){const i=new Jn;return r.asyncQueue.enqueueAndForget(async()=>Xb(await c4(r),s,i)),i.promise}(Z_(t),e)}function k4(t,e,n){const r=n.docs.get(e._key),s=new D4(t);return new cx(t,s,e._key,r,new b4(n.hasPendingWrites,n.fromCache),e.converter)}function B4(){return new l0("serverTimestamp")}(function(e,n=!0){(function(s){Cs=s})(Ts),un(new Qt("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new r0(new vC(r.getProvider("auth-internal")),new wC(r.getProvider("app-check-internal")),function(u,h){if(!Object.prototype.hasOwnProperty.apply(u.options,["projectId"]))throw new pe(X.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new wi(u.options.projectId,h)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),Ut(Ff,"4.7.5",e),Ut(Ff,"4.7.5","esm2017")})();const O4={apiKey:"AIzaSyCGsijJNUboJEwwhH7Zj3CIQzfzCGP5sHs",authDomain:"vue-firebase-example-cf684.firebaseapp.com",projectId:"vue-firebase-example-cf684",storageBucket:"vue-firebase-example-cf684.firebasestorage.app",messagingSenderId:"1035208541092",appId:"1:1035208541092:web:ae61b13967c1dbe29bf731",measurementId:"G-796CPEPGV9"},u0=Mg(O4),N4=dC(u0),V4=p4(u0),L4=wm(u0),dc={analytics:N4,db:V4,auth:L4},M4="/assets/logo-CPmPqqKk.png",md=dc.auth,U4={components:{},data(){return{login_name:""}},methods:{confirmLogout(){confirm("ログアウトしますか？")&&this.logOut()},logOut(){cm(md).then(()=>{this.$router.push("/login"),console.log("ログアウト成功"),alert("ログアウトしました")}).catch(t=>{console.log("ログアウトエラー: error ->"+t),alert("ログアウト処理でエラーが発生しました")})},showLoginEmail(){Iu(md,t=>{if(t){const e=t.email;this.login_name="ログイン中: "+e+" さん"}else this.login_name="未ログイン: ゲストユーザーさん"})},goToHome(){this.$route.path!="/"?this.$router.push("/"):window.location.reload()},goToFood(){this.$route.path!="/food"?this.$router.push("/food"):window.location.reload()}},mounted(){this.showLoginEmail()}},$4={class:"header_container"},H4={class:"login_name blue"},q4={class:"header_menu"};function j4(t,e,n,r,s,i){return Kt(),bn("div",$4,[e[3]||(e[3]=we("div",{class:"header_logo"},[we("div",{class:"img_container"},[we("img",{src:M4,alt:"logo"})]),we("p",null,"Vue Firebase Example")],-1)),we("div",null,[we("div",H4," "+yr(s.login_name),1),we("div",q4,[we("div",{class:"menu_item",onClick:e[0]||(e[0]=(...o)=>i.goToHome&&i.goToHome(...o))},"Home"),we("div",{class:"menu_item",onClick:e[1]||(e[1]=(...o)=>i.goToFood&&i.goToFood(...o))},"Food"),we("div",{class:"menu_item",onClick:e[2]||(e[2]=(...o)=>i.confirmLogout&&i.confirmLogout(...o))},"Logout")])])])}const lx=Fr(U4,[["render",j4],["__scopeId","data-v-9a9eb27f"]]),z4={components:{},data(){return{}},methods:{},mounted(){}};function W4(t,e,n,r,s,i){return Kt(),bn("footer",null,e[0]||(e[0]=[we("div",{class:"copyright"},"©2022 Vue Firebase Example, Ltd. All rights reserved.",-1)]))}const ux=Fr(z4,[["render",W4],["__scopeId","data-v-d81b5042"]]),K4={components:{HeaderComponent:lx,FooterComponent:ux},data(){return{}},methods:{},mounted(){}};function G4(t,e,n,r,s,i){const o=cs("HeaderComponent"),c=cs("FooterComponent");return Kt(),bn("body",null,[ct(o),e[0]||(e[0]=we("main",null,[we("p",{class:"contents"},"ここがHomeです")],-1)),ct(c)])}const Q4=Fr(K4,[["render",G4],["__scopeId","data-v-2b433c00"]]),X4={},Y4={class:"dot-pulse-container"};function J4(t,e,n,r,s,i){return Kt(),bn("div",Y4,e[0]||(e[0]=[we("div",{class:"dot-pulse"},[we("div",{class:"dot-pulse__dot"})],-1)]))}const Z4=Fr(X4,[["render",J4],["__scopeId","data-v-f105d343"]]);var rl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function eR(t){if(t.__esModule)return t;var e=t.default;if(typeof e=="function"){var n=function r(){return this instanceof r?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};n.prototype=e.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(t).forEach(function(r){var s=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(n,r,s.get?s:{enumerable:!0,get:function(){return t[r]}})}),n}var Do={exports:{}};function tR(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Po={exports:{}};const nR={},rR=Object.freeze(Object.defineProperty({__proto__:null,default:nR},Symbol.toStringTag,{value:"Module"})),sR=eR(rR);var iR=Po.exports,_d;function ke(){return _d||(_d=1,function(t,e){(function(n,r){t.exports=r()})(iR,function(){var n=n||function(r,s){var i;if(typeof window<"u"&&window.crypto&&(i=window.crypto),typeof self<"u"&&self.crypto&&(i=self.crypto),typeof globalThis<"u"&&globalThis.crypto&&(i=globalThis.crypto),!i&&typeof window<"u"&&window.msCrypto&&(i=window.msCrypto),!i&&typeof rl<"u"&&rl.crypto&&(i=rl.crypto),!i&&typeof tR=="function")try{i=sR}catch{}var o=function(){if(i){if(typeof i.getRandomValues=="function")try{return i.getRandomValues(new Uint32Array(1))[0]}catch{}if(typeof i.randomBytes=="function")try{return i.randomBytes(4).readInt32LE()}catch{}}throw new Error("Native crypto module could not be used to get secure random number.")},c=Object.create||function(){function I(){}return function(b){var S;return I.prototype=b,S=new I,I.prototype=null,S}}(),l={},u=l.lib={},h=u.Base=function(){return{extend:function(I){var b=c(this);return I&&b.mixIn(I),(!b.hasOwnProperty("init")||this.init===b.init)&&(b.init=function(){b.$super.init.apply(this,arguments)}),b.init.prototype=b,b.$super=this,b},create:function(){var I=this.extend();return I.init.apply(I,arguments),I},init:function(){},mixIn:function(I){for(var b in I)I.hasOwnProperty(b)&&(this[b]=I[b]);I.hasOwnProperty("toString")&&(this.toString=I.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),d=u.WordArray=h.extend({init:function(I,b){I=this.words=I||[],b!=s?this.sigBytes=b:this.sigBytes=I.length*4},toString:function(I){return(I||m).stringify(this)},concat:function(I){var b=this.words,S=I.words,B=this.sigBytes,O=I.sigBytes;if(this.clamp(),B%4)for(var y=0;y<O;y++){var _=S[y>>>2]>>>24-y%4*8&255;b[B+y>>>2]|=_<<24-(B+y)%4*8}else for(var E=0;E<O;E+=4)b[B+E>>>2]=S[E>>>2];return this.sigBytes+=O,this},clamp:function(){var I=this.words,b=this.sigBytes;I[b>>>2]&=4294967295<<32-b%4*8,I.length=r.ceil(b/4)},clone:function(){var I=h.clone.call(this);return I.words=this.words.slice(0),I},random:function(I){for(var b=[],S=0;S<I;S+=4)b.push(o());return new d.init(b,I)}}),p=l.enc={},m=p.Hex={stringify:function(I){for(var b=I.words,S=I.sigBytes,B=[],O=0;O<S;O++){var y=b[O>>>2]>>>24-O%4*8&255;B.push((y>>>4).toString(16)),B.push((y&15).toString(16))}return B.join("")},parse:function(I){for(var b=I.length,S=[],B=0;B<b;B+=2)S[B>>>3]|=parseInt(I.substr(B,2),16)<<24-B%8*4;return new d.init(S,b/2)}},v=p.Latin1={stringify:function(I){for(var b=I.words,S=I.sigBytes,B=[],O=0;O<S;O++){var y=b[O>>>2]>>>24-O%4*8&255;B.push(String.fromCharCode(y))}return B.join("")},parse:function(I){for(var b=I.length,S=[],B=0;B<b;B++)S[B>>>2]|=(I.charCodeAt(B)&255)<<24-B%4*8;return new d.init(S,b)}},R=p.Utf8={stringify:function(I){try{return decodeURIComponent(escape(v.stringify(I)))}catch{throw new Error("Malformed UTF-8 data")}},parse:function(I){return v.parse(unescape(encodeURIComponent(I)))}},T=u.BufferedBlockAlgorithm=h.extend({reset:function(){this._data=new d.init,this._nDataBytes=0},_append:function(I){typeof I=="string"&&(I=R.parse(I)),this._data.concat(I),this._nDataBytes+=I.sigBytes},_process:function(I){var b,S=this._data,B=S.words,O=S.sigBytes,y=this.blockSize,_=y*4,E=O/_;I?E=r.ceil(E):E=r.max((E|0)-this._minBufferSize,0);var x=E*y,w=r.min(x*4,O);if(x){for(var D=0;D<x;D+=y)this._doProcessBlock(B,D);b=B.splice(0,x),S.sigBytes-=w}return new d.init(b,w)},clone:function(){var I=h.clone.call(this);return I._data=this._data.clone(),I},_minBufferSize:0});u.Hasher=T.extend({cfg:h.extend(),init:function(I){this.cfg=this.cfg.extend(I),this.reset()},reset:function(){T.reset.call(this),this._doReset()},update:function(I){return this._append(I),this._process(),this},finalize:function(I){I&&this._append(I);var b=this._doFinalize();return b},blockSize:16,_createHelper:function(I){return function(b,S){return new I.init(S).finalize(b)}},_createHmacHelper:function(I){return function(b,S){return new k.HMAC.init(I,S).finalize(b)}}});var k=l.algo={};return l}(Math);return n})}(Po)),Po.exports}var Fo={exports:{}},oR=Fo.exports,xd;function pc(){return xd||(xd=1,function(t,e){(function(n,r){t.exports=r(ke())})(oR,function(n){return function(r){var s=n,i=s.lib,o=i.Base,c=i.WordArray,l=s.x64={};l.Word=o.extend({init:function(u,h){this.high=u,this.low=h}}),l.WordArray=o.extend({init:function(u,h){u=this.words=u||[],h!=r?this.sigBytes=h:this.sigBytes=u.length*8},toX32:function(){for(var u=this.words,h=u.length,d=[],p=0;p<h;p++){var m=u[p];d.push(m.high),d.push(m.low)}return c.create(d,this.sigBytes)},clone:function(){for(var u=o.clone.call(this),h=u.words=this.words.slice(0),d=h.length,p=0;p<d;p++)h[p]=h[p].clone();return u}})}(),n})}(Fo)),Fo.exports}var ko={exports:{}},aR=ko.exports,vd;function cR(){return vd||(vd=1,function(t,e){(function(n,r){t.exports=r(ke())})(aR,function(n){return function(){if(typeof ArrayBuffer=="function"){var r=n,s=r.lib,i=s.WordArray,o=i.init,c=i.init=function(l){if(l instanceof ArrayBuffer&&(l=new Uint8Array(l)),(l instanceof Int8Array||typeof Uint8ClampedArray<"u"&&l instanceof Uint8ClampedArray||l instanceof Int16Array||l instanceof Uint16Array||l instanceof Int32Array||l instanceof Uint32Array||l instanceof Float32Array||l instanceof Float64Array)&&(l=new Uint8Array(l.buffer,l.byteOffset,l.byteLength)),l instanceof Uint8Array){for(var u=l.byteLength,h=[],d=0;d<u;d++)h[d>>>2]|=l[d]<<24-d%4*8;o.call(this,h,u)}else o.apply(this,arguments)};c.prototype=i}}(),n.lib.WordArray})}(ko)),ko.exports}var Bo={exports:{}},lR=Bo.exports,yd;function uR(){return yd||(yd=1,function(t,e){(function(n,r){t.exports=r(ke())})(lR,function(n){return function(){var r=n,s=r.lib,i=s.WordArray,o=r.enc;o.Utf16=o.Utf16BE={stringify:function(l){for(var u=l.words,h=l.sigBytes,d=[],p=0;p<h;p+=2){var m=u[p>>>2]>>>16-p%4*8&65535;d.push(String.fromCharCode(m))}return d.join("")},parse:function(l){for(var u=l.length,h=[],d=0;d<u;d++)h[d>>>1]|=l.charCodeAt(d)<<16-d%2*16;return i.create(h,u*2)}},o.Utf16LE={stringify:function(l){for(var u=l.words,h=l.sigBytes,d=[],p=0;p<h;p+=2){var m=c(u[p>>>2]>>>16-p%4*8&65535);d.push(String.fromCharCode(m))}return d.join("")},parse:function(l){for(var u=l.length,h=[],d=0;d<u;d++)h[d>>>1]|=c(l.charCodeAt(d)<<16-d%2*16);return i.create(h,u*2)}};function c(l){return l<<8&4278255360|l>>>8&16711935}}(),n.enc.Utf16})}(Bo)),Bo.exports}var Oo={exports:{}},hR=Oo.exports,Ed;function Mr(){return Ed||(Ed=1,function(t,e){(function(n,r){t.exports=r(ke())})(hR,function(n){return function(){var r=n,s=r.lib,i=s.WordArray,o=r.enc;o.Base64={stringify:function(l){var u=l.words,h=l.sigBytes,d=this._map;l.clamp();for(var p=[],m=0;m<h;m+=3)for(var v=u[m>>>2]>>>24-m%4*8&255,R=u[m+1>>>2]>>>24-(m+1)%4*8&255,T=u[m+2>>>2]>>>24-(m+2)%4*8&255,k=v<<16|R<<8|T,I=0;I<4&&m+I*.75<h;I++)p.push(d.charAt(k>>>6*(3-I)&63));var b=d.charAt(64);if(b)for(;p.length%4;)p.push(b);return p.join("")},parse:function(l){var u=l.length,h=this._map,d=this._reverseMap;if(!d){d=this._reverseMap=[];for(var p=0;p<h.length;p++)d[h.charCodeAt(p)]=p}var m=h.charAt(64);if(m){var v=l.indexOf(m);v!==-1&&(u=v)}return c(l,u,d)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="};function c(l,u,h){for(var d=[],p=0,m=0;m<u;m++)if(m%4){var v=h[l.charCodeAt(m-1)]<<m%4*2,R=h[l.charCodeAt(m)]>>>6-m%4*2,T=v|R;d[p>>>2]|=T<<24-p%4*8,p++}return i.create(d,p)}}(),n.enc.Base64})}(Oo)),Oo.exports}var No={exports:{}},fR=No.exports,Ad;function dR(){return Ad||(Ad=1,function(t,e){(function(n,r){t.exports=r(ke())})(fR,function(n){return function(){var r=n,s=r.lib,i=s.WordArray,o=r.enc;o.Base64url={stringify:function(l,u){u===void 0&&(u=!0);var h=l.words,d=l.sigBytes,p=u?this._safe_map:this._map;l.clamp();for(var m=[],v=0;v<d;v+=3)for(var R=h[v>>>2]>>>24-v%4*8&255,T=h[v+1>>>2]>>>24-(v+1)%4*8&255,k=h[v+2>>>2]>>>24-(v+2)%4*8&255,I=R<<16|T<<8|k,b=0;b<4&&v+b*.75<d;b++)m.push(p.charAt(I>>>6*(3-b)&63));var S=p.charAt(64);if(S)for(;m.length%4;)m.push(S);return m.join("")},parse:function(l,u){u===void 0&&(u=!0);var h=l.length,d=u?this._safe_map:this._map,p=this._reverseMap;if(!p){p=this._reverseMap=[];for(var m=0;m<d.length;m++)p[d.charCodeAt(m)]=m}var v=d.charAt(64);if(v){var R=l.indexOf(v);R!==-1&&(h=R)}return c(l,h,p)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",_safe_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"};function c(l,u,h){for(var d=[],p=0,m=0;m<u;m++)if(m%4){var v=h[l.charCodeAt(m-1)]<<m%4*2,R=h[l.charCodeAt(m)]>>>6-m%4*2,T=v|R;d[p>>>2]|=T<<24-p%4*8,p++}return i.create(d,p)}}(),n.enc.Base64url})}(No)),No.exports}var Vo={exports:{}},pR=Vo.exports,wd;function Ur(){return wd||(wd=1,function(t,e){(function(n,r){t.exports=r(ke())})(pR,function(n){return function(r){var s=n,i=s.lib,o=i.WordArray,c=i.Hasher,l=s.algo,u=[];(function(){for(var R=0;R<64;R++)u[R]=r.abs(r.sin(R+1))*4294967296|0})();var h=l.MD5=c.extend({_doReset:function(){this._hash=new o.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(R,T){for(var k=0;k<16;k++){var I=T+k,b=R[I];R[I]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360}var S=this._hash.words,B=R[T+0],O=R[T+1],y=R[T+2],_=R[T+3],E=R[T+4],x=R[T+5],w=R[T+6],D=R[T+7],A=R[T+8],re=R[T+9],le=R[T+10],ae=R[T+11],se=R[T+12],ce=R[T+13],Ie=R[T+14],Ce=R[T+15],U=S[0],H=S[1],q=S[2],K=S[3];U=d(U,H,q,K,B,7,u[0]),K=d(K,U,H,q,O,12,u[1]),q=d(q,K,U,H,y,17,u[2]),H=d(H,q,K,U,_,22,u[3]),U=d(U,H,q,K,E,7,u[4]),K=d(K,U,H,q,x,12,u[5]),q=d(q,K,U,H,w,17,u[6]),H=d(H,q,K,U,D,22,u[7]),U=d(U,H,q,K,A,7,u[8]),K=d(K,U,H,q,re,12,u[9]),q=d(q,K,U,H,le,17,u[10]),H=d(H,q,K,U,ae,22,u[11]),U=d(U,H,q,K,se,7,u[12]),K=d(K,U,H,q,ce,12,u[13]),q=d(q,K,U,H,Ie,17,u[14]),H=d(H,q,K,U,Ce,22,u[15]),U=p(U,H,q,K,O,5,u[16]),K=p(K,U,H,q,w,9,u[17]),q=p(q,K,U,H,ae,14,u[18]),H=p(H,q,K,U,B,20,u[19]),U=p(U,H,q,K,x,5,u[20]),K=p(K,U,H,q,le,9,u[21]),q=p(q,K,U,H,Ce,14,u[22]),H=p(H,q,K,U,E,20,u[23]),U=p(U,H,q,K,re,5,u[24]),K=p(K,U,H,q,Ie,9,u[25]),q=p(q,K,U,H,_,14,u[26]),H=p(H,q,K,U,A,20,u[27]),U=p(U,H,q,K,ce,5,u[28]),K=p(K,U,H,q,y,9,u[29]),q=p(q,K,U,H,D,14,u[30]),H=p(H,q,K,U,se,20,u[31]),U=m(U,H,q,K,x,4,u[32]),K=m(K,U,H,q,A,11,u[33]),q=m(q,K,U,H,ae,16,u[34]),H=m(H,q,K,U,Ie,23,u[35]),U=m(U,H,q,K,O,4,u[36]),K=m(K,U,H,q,E,11,u[37]),q=m(q,K,U,H,D,16,u[38]),H=m(H,q,K,U,le,23,u[39]),U=m(U,H,q,K,ce,4,u[40]),K=m(K,U,H,q,B,11,u[41]),q=m(q,K,U,H,_,16,u[42]),H=m(H,q,K,U,w,23,u[43]),U=m(U,H,q,K,re,4,u[44]),K=m(K,U,H,q,se,11,u[45]),q=m(q,K,U,H,Ce,16,u[46]),H=m(H,q,K,U,y,23,u[47]),U=v(U,H,q,K,B,6,u[48]),K=v(K,U,H,q,D,10,u[49]),q=v(q,K,U,H,Ie,15,u[50]),H=v(H,q,K,U,x,21,u[51]),U=v(U,H,q,K,se,6,u[52]),K=v(K,U,H,q,_,10,u[53]),q=v(q,K,U,H,le,15,u[54]),H=v(H,q,K,U,O,21,u[55]),U=v(U,H,q,K,A,6,u[56]),K=v(K,U,H,q,Ce,10,u[57]),q=v(q,K,U,H,w,15,u[58]),H=v(H,q,K,U,ce,21,u[59]),U=v(U,H,q,K,E,6,u[60]),K=v(K,U,H,q,ae,10,u[61]),q=v(q,K,U,H,y,15,u[62]),H=v(H,q,K,U,re,21,u[63]),S[0]=S[0]+U|0,S[1]=S[1]+H|0,S[2]=S[2]+q|0,S[3]=S[3]+K|0},_doFinalize:function(){var R=this._data,T=R.words,k=this._nDataBytes*8,I=R.sigBytes*8;T[I>>>5]|=128<<24-I%32;var b=r.floor(k/4294967296),S=k;T[(I+64>>>9<<4)+15]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360,T[(I+64>>>9<<4)+14]=(S<<8|S>>>24)&16711935|(S<<24|S>>>8)&4278255360,R.sigBytes=(T.length+1)*4,this._process();for(var B=this._hash,O=B.words,y=0;y<4;y++){var _=O[y];O[y]=(_<<8|_>>>24)&16711935|(_<<24|_>>>8)&4278255360}return B},clone:function(){var R=c.clone.call(this);return R._hash=this._hash.clone(),R}});function d(R,T,k,I,b,S,B){var O=R+(T&k|~T&I)+b+B;return(O<<S|O>>>32-S)+T}function p(R,T,k,I,b,S,B){var O=R+(T&I|k&~I)+b+B;return(O<<S|O>>>32-S)+T}function m(R,T,k,I,b,S,B){var O=R+(T^k^I)+b+B;return(O<<S|O>>>32-S)+T}function v(R,T,k,I,b,S,B){var O=R+(k^(T|~I))+b+B;return(O<<S|O>>>32-S)+T}s.MD5=c._createHelper(h),s.HmacMD5=c._createHmacHelper(h)}(Math),n.MD5})}(Vo)),Vo.exports}var Lo={exports:{}},gR=Lo.exports,Td;function hx(){return Td||(Td=1,function(t,e){(function(n,r){t.exports=r(ke())})(gR,function(n){return function(){var r=n,s=r.lib,i=s.WordArray,o=s.Hasher,c=r.algo,l=[],u=c.SHA1=o.extend({_doReset:function(){this._hash=new i.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(h,d){for(var p=this._hash.words,m=p[0],v=p[1],R=p[2],T=p[3],k=p[4],I=0;I<80;I++){if(I<16)l[I]=h[d+I]|0;else{var b=l[I-3]^l[I-8]^l[I-14]^l[I-16];l[I]=b<<1|b>>>31}var S=(m<<5|m>>>27)+k+l[I];I<20?S+=(v&R|~v&T)+1518500249:I<40?S+=(v^R^T)+1859775393:I<60?S+=(v&R|v&T|R&T)-1894007588:S+=(v^R^T)-899497514,k=T,T=R,R=v<<30|v>>>2,v=m,m=S}p[0]=p[0]+m|0,p[1]=p[1]+v|0,p[2]=p[2]+R|0,p[3]=p[3]+T|0,p[4]=p[4]+k|0},_doFinalize:function(){var h=this._data,d=h.words,p=this._nDataBytes*8,m=h.sigBytes*8;return d[m>>>5]|=128<<24-m%32,d[(m+64>>>9<<4)+14]=Math.floor(p/4294967296),d[(m+64>>>9<<4)+15]=p,h.sigBytes=d.length*4,this._process(),this._hash},clone:function(){var h=o.clone.call(this);return h._hash=this._hash.clone(),h}});r.SHA1=o._createHelper(u),r.HmacSHA1=o._createHmacHelper(u)}(),n.SHA1})}(Lo)),Lo.exports}var Mo={exports:{}},mR=Mo.exports,Id;function h0(){return Id||(Id=1,function(t,e){(function(n,r){t.exports=r(ke())})(mR,function(n){return function(r){var s=n,i=s.lib,o=i.WordArray,c=i.Hasher,l=s.algo,u=[],h=[];(function(){function m(k){for(var I=r.sqrt(k),b=2;b<=I;b++)if(!(k%b))return!1;return!0}function v(k){return(k-(k|0))*4294967296|0}for(var R=2,T=0;T<64;)m(R)&&(T<8&&(u[T]=v(r.pow(R,1/2))),h[T]=v(r.pow(R,1/3)),T++),R++})();var d=[],p=l.SHA256=c.extend({_doReset:function(){this._hash=new o.init(u.slice(0))},_doProcessBlock:function(m,v){for(var R=this._hash.words,T=R[0],k=R[1],I=R[2],b=R[3],S=R[4],B=R[5],O=R[6],y=R[7],_=0;_<64;_++){if(_<16)d[_]=m[v+_]|0;else{var E=d[_-15],x=(E<<25|E>>>7)^(E<<14|E>>>18)^E>>>3,w=d[_-2],D=(w<<15|w>>>17)^(w<<13|w>>>19)^w>>>10;d[_]=x+d[_-7]+D+d[_-16]}var A=S&B^~S&O,re=T&k^T&I^k&I,le=(T<<30|T>>>2)^(T<<19|T>>>13)^(T<<10|T>>>22),ae=(S<<26|S>>>6)^(S<<21|S>>>11)^(S<<7|S>>>25),se=y+ae+A+h[_]+d[_],ce=le+re;y=O,O=B,B=S,S=b+se|0,b=I,I=k,k=T,T=se+ce|0}R[0]=R[0]+T|0,R[1]=R[1]+k|0,R[2]=R[2]+I|0,R[3]=R[3]+b|0,R[4]=R[4]+S|0,R[5]=R[5]+B|0,R[6]=R[6]+O|0,R[7]=R[7]+y|0},_doFinalize:function(){var m=this._data,v=m.words,R=this._nDataBytes*8,T=m.sigBytes*8;return v[T>>>5]|=128<<24-T%32,v[(T+64>>>9<<4)+14]=r.floor(R/4294967296),v[(T+64>>>9<<4)+15]=R,m.sigBytes=v.length*4,this._process(),this._hash},clone:function(){var m=c.clone.call(this);return m._hash=this._hash.clone(),m}});s.SHA256=c._createHelper(p),s.HmacSHA256=c._createHmacHelper(p)}(Math),n.SHA256})}(Mo)),Mo.exports}var Uo={exports:{}},_R=Uo.exports,Cd;function xR(){return Cd||(Cd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),h0())})(_R,function(n){return function(){var r=n,s=r.lib,i=s.WordArray,o=r.algo,c=o.SHA256,l=o.SHA224=c.extend({_doReset:function(){this._hash=new i.init([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])},_doFinalize:function(){var u=c._doFinalize.call(this);return u.sigBytes-=4,u}});r.SHA224=c._createHelper(l),r.HmacSHA224=c._createHmacHelper(l)}(),n.SHA224})}(Uo)),Uo.exports}var $o={exports:{}},vR=$o.exports,bd;function fx(){return bd||(bd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),pc())})(vR,function(n){return function(){var r=n,s=r.lib,i=s.Hasher,o=r.x64,c=o.Word,l=o.WordArray,u=r.algo;function h(){return c.create.apply(c,arguments)}var d=[h(1116352408,3609767458),h(1899447441,602891725),h(3049323471,3964484399),h(3921009573,2173295548),h(961987163,4081628472),h(1508970993,3053834265),h(2453635748,2937671579),h(2870763221,3664609560),h(3624381080,2734883394),h(310598401,1164996542),h(607225278,1323610764),h(1426881987,3590304994),h(1925078388,4068182383),h(2162078206,991336113),h(2614888103,633803317),h(3248222580,3479774868),h(3835390401,2666613458),h(4022224774,944711139),h(264347078,2341262773),h(604807628,2007800933),h(770255983,1495990901),h(1249150122,1856431235),h(1555081692,3175218132),h(1996064986,2198950837),h(2554220882,3999719339),h(2821834349,766784016),h(2952996808,2566594879),h(3210313671,3203337956),h(3336571891,1034457026),h(3584528711,2466948901),h(113926993,3758326383),h(338241895,168717936),h(666307205,1188179964),h(773529912,1546045734),h(1294757372,1522805485),h(1396182291,2643833823),h(1695183700,2343527390),h(1986661051,1014477480),h(2177026350,1206759142),h(2456956037,344077627),h(2730485921,1290863460),h(2820302411,3158454273),h(3259730800,3505952657),h(3345764771,106217008),h(3516065817,3606008344),h(3600352804,1432725776),h(4094571909,1467031594),h(275423344,851169720),h(430227734,3100823752),h(506948616,1363258195),h(659060556,3750685593),h(883997877,3785050280),h(958139571,3318307427),h(1322822218,3812723403),h(1537002063,2003034995),h(1747873779,3602036899),h(1955562222,1575990012),h(2024104815,1125592928),h(2227730452,2716904306),h(2361852424,442776044),h(2428436474,593698344),h(2756734187,3733110249),h(3204031479,2999351573),h(3329325298,3815920427),h(3391569614,3928383900),h(3515267271,566280711),h(3940187606,3454069534),h(4118630271,4000239992),h(116418474,1914138554),h(174292421,2731055270),h(289380356,3203993006),h(460393269,320620315),h(685471733,587496836),h(852142971,1086792851),h(1017036298,365543100),h(1126000580,2618297676),h(1288033470,3409855158),h(1501505948,4234509866),h(1607167915,987167468),h(1816402316,1246189591)],p=[];(function(){for(var v=0;v<80;v++)p[v]=h()})();var m=u.SHA512=i.extend({_doReset:function(){this._hash=new l.init([new c.init(1779033703,4089235720),new c.init(3144134277,2227873595),new c.init(1013904242,4271175723),new c.init(2773480762,1595750129),new c.init(1359893119,2917565137),new c.init(2600822924,725511199),new c.init(528734635,4215389547),new c.init(1541459225,327033209)])},_doProcessBlock:function(v,R){for(var T=this._hash.words,k=T[0],I=T[1],b=T[2],S=T[3],B=T[4],O=T[5],y=T[6],_=T[7],E=k.high,x=k.low,w=I.high,D=I.low,A=b.high,re=b.low,le=S.high,ae=S.low,se=B.high,ce=B.low,Ie=O.high,Ce=O.low,U=y.high,H=y.low,q=_.high,K=_.low,Pe=E,Te=x,M=w,G=D,ne=A,ie=re,be=le,P=ae,F=se,N=ce,$=Ie,z=Ce,j=U,ee=H,J=q,Y=K,Q=0;Q<80;Q++){var ue,Z,he=p[Q];if(Q<16)Z=he.high=v[R+Q*2]|0,ue=he.low=v[R+Q*2+1]|0;else{var de=p[Q-15],fe=de.high,me=de.low,Re=(fe>>>1|me<<31)^(fe>>>8|me<<24)^fe>>>7,et=(me>>>1|fe<<31)^(me>>>8|fe<<24)^(me>>>7|fe<<25),Ye=p[Q-2],tt=Ye.high,We=Ye.low,Yt=(tt>>>19|We<<13)^(tt<<3|We>>>29)^tt>>>6,Bn=(We>>>19|tt<<13)^(We<<3|tt>>>29)^(We>>>6|tt<<26),Je=p[Q-7],Rt=Je.high,$r=Je.low,Hr=p[Q-16],Hi=Hr.high,Ds=Hr.low;ue=et+$r,Z=Re+Rt+(ue>>>0<et>>>0?1:0),ue=ue+Bn,Z=Z+Yt+(ue>>>0<Bn>>>0?1:0),ue=ue+Ds,Z=Z+Hi+(ue>>>0<Ds>>>0?1:0),he.high=Z,he.low=ue}var cr=F&$^~F&j,qr=N&z^~N&ee,Ps=Pe&M^Pe&ne^M&ne,pn=Te&G^Te&ie^G&ie,qi=(Pe>>>28|Te<<4)^(Pe<<30|Te>>>2)^(Pe<<25|Te>>>7),lr=(Te>>>28|Pe<<4)^(Te<<30|Pe>>>2)^(Te<<25|Pe>>>7),ji=(F>>>14|N<<18)^(F>>>18|N<<14)^(F<<23|N>>>9),ur=(N>>>14|F<<18)^(N>>>18|F<<14)^(N<<23|F>>>9),Fs=d[Q],ut=Fs.high,ks=Fs.low,nt=Y+ur,St=J+ji+(nt>>>0<Y>>>0?1:0),nt=nt+qr,St=St+cr+(nt>>>0<qr>>>0?1:0),nt=nt+ks,St=St+ut+(nt>>>0<ks>>>0?1:0),nt=nt+ue,St=St+Z+(nt>>>0<ue>>>0?1:0),zi=lr+pn,mc=qi+Ps+(zi>>>0<lr>>>0?1:0);J=j,Y=ee,j=$,ee=z,$=F,z=N,N=P+nt|0,F=be+St+(N>>>0<P>>>0?1:0)|0,be=ne,P=ie,ne=M,ie=G,M=Pe,G=Te,Te=nt+zi|0,Pe=St+mc+(Te>>>0<nt>>>0?1:0)|0}x=k.low=x+Te,k.high=E+Pe+(x>>>0<Te>>>0?1:0),D=I.low=D+G,I.high=w+M+(D>>>0<G>>>0?1:0),re=b.low=re+ie,b.high=A+ne+(re>>>0<ie>>>0?1:0),ae=S.low=ae+P,S.high=le+be+(ae>>>0<P>>>0?1:0),ce=B.low=ce+N,B.high=se+F+(ce>>>0<N>>>0?1:0),Ce=O.low=Ce+z,O.high=Ie+$+(Ce>>>0<z>>>0?1:0),H=y.low=H+ee,y.high=U+j+(H>>>0<ee>>>0?1:0),K=_.low=K+Y,_.high=q+J+(K>>>0<Y>>>0?1:0)},_doFinalize:function(){var v=this._data,R=v.words,T=this._nDataBytes*8,k=v.sigBytes*8;R[k>>>5]|=128<<24-k%32,R[(k+128>>>10<<5)+30]=Math.floor(T/4294967296),R[(k+128>>>10<<5)+31]=T,v.sigBytes=R.length*4,this._process();var I=this._hash.toX32();return I},clone:function(){var v=i.clone.call(this);return v._hash=this._hash.clone(),v},blockSize:1024/32});r.SHA512=i._createHelper(m),r.HmacSHA512=i._createHmacHelper(m)}(),n.SHA512})}($o)),$o.exports}var Ho={exports:{}},yR=Ho.exports,Rd;function ER(){return Rd||(Rd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),pc(),fx())})(yR,function(n){return function(){var r=n,s=r.x64,i=s.Word,o=s.WordArray,c=r.algo,l=c.SHA512,u=c.SHA384=l.extend({_doReset:function(){this._hash=new o.init([new i.init(3418070365,3238371032),new i.init(1654270250,914150663),new i.init(2438529370,812702999),new i.init(355462360,4144912697),new i.init(1731405415,4290775857),new i.init(2394180231,1750603025),new i.init(3675008525,1694076839),new i.init(1203062813,3204075428)])},_doFinalize:function(){var h=l._doFinalize.call(this);return h.sigBytes-=16,h}});r.SHA384=l._createHelper(u),r.HmacSHA384=l._createHmacHelper(u)}(),n.SHA384})}(Ho)),Ho.exports}var qo={exports:{}},AR=qo.exports,Sd;function wR(){return Sd||(Sd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),pc())})(AR,function(n){return function(r){var s=n,i=s.lib,o=i.WordArray,c=i.Hasher,l=s.x64,u=l.Word,h=s.algo,d=[],p=[],m=[];(function(){for(var T=1,k=0,I=0;I<24;I++){d[T+5*k]=(I+1)*(I+2)/2%64;var b=k%5,S=(2*T+3*k)%5;T=b,k=S}for(var T=0;T<5;T++)for(var k=0;k<5;k++)p[T+5*k]=k+(2*T+3*k)%5*5;for(var B=1,O=0;O<24;O++){for(var y=0,_=0,E=0;E<7;E++){if(B&1){var x=(1<<E)-1;x<32?_^=1<<x:y^=1<<x-32}B&128?B=B<<1^113:B<<=1}m[O]=u.create(y,_)}})();var v=[];(function(){for(var T=0;T<25;T++)v[T]=u.create()})();var R=h.SHA3=c.extend({cfg:c.cfg.extend({outputLength:512}),_doReset:function(){for(var T=this._state=[],k=0;k<25;k++)T[k]=new u.init;this.blockSize=(1600-2*this.cfg.outputLength)/32},_doProcessBlock:function(T,k){for(var I=this._state,b=this.blockSize/2,S=0;S<b;S++){var B=T[k+2*S],O=T[k+2*S+1];B=(B<<8|B>>>24)&16711935|(B<<24|B>>>8)&4278255360,O=(O<<8|O>>>24)&16711935|(O<<24|O>>>8)&4278255360;var y=I[S];y.high^=O,y.low^=B}for(var _=0;_<24;_++){for(var E=0;E<5;E++){for(var x=0,w=0,D=0;D<5;D++){var y=I[E+5*D];x^=y.high,w^=y.low}var A=v[E];A.high=x,A.low=w}for(var E=0;E<5;E++)for(var re=v[(E+4)%5],le=v[(E+1)%5],ae=le.high,se=le.low,x=re.high^(ae<<1|se>>>31),w=re.low^(se<<1|ae>>>31),D=0;D<5;D++){var y=I[E+5*D];y.high^=x,y.low^=w}for(var ce=1;ce<25;ce++){var x,w,y=I[ce],Ie=y.high,Ce=y.low,U=d[ce];U<32?(x=Ie<<U|Ce>>>32-U,w=Ce<<U|Ie>>>32-U):(x=Ce<<U-32|Ie>>>64-U,w=Ie<<U-32|Ce>>>64-U);var H=v[p[ce]];H.high=x,H.low=w}var q=v[0],K=I[0];q.high=K.high,q.low=K.low;for(var E=0;E<5;E++)for(var D=0;D<5;D++){var ce=E+5*D,y=I[ce],Pe=v[ce],Te=v[(E+1)%5+5*D],M=v[(E+2)%5+5*D];y.high=Pe.high^~Te.high&M.high,y.low=Pe.low^~Te.low&M.low}var y=I[0],G=m[_];y.high^=G.high,y.low^=G.low}},_doFinalize:function(){var T=this._data,k=T.words;this._nDataBytes*8;var I=T.sigBytes*8,b=this.blockSize*32;k[I>>>5]|=1<<24-I%32,k[(r.ceil((I+1)/b)*b>>>5)-1]|=128,T.sigBytes=k.length*4,this._process();for(var S=this._state,B=this.cfg.outputLength/8,O=B/8,y=[],_=0;_<O;_++){var E=S[_],x=E.high,w=E.low;x=(x<<8|x>>>24)&16711935|(x<<24|x>>>8)&4278255360,w=(w<<8|w>>>24)&16711935|(w<<24|w>>>8)&4278255360,y.push(w),y.push(x)}return new o.init(y,B)},clone:function(){for(var T=c.clone.call(this),k=T._state=this._state.slice(0),I=0;I<25;I++)k[I]=k[I].clone();return T}});s.SHA3=c._createHelper(R),s.HmacSHA3=c._createHmacHelper(R)}(Math),n.SHA3})}(qo)),qo.exports}var jo={exports:{}},TR=jo.exports,Dd;function IR(){return Dd||(Dd=1,function(t,e){(function(n,r){t.exports=r(ke())})(TR,function(n){/** @preserve
			(c) 2012 by Cédric Mesnil. All rights reserved.

			Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

			    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
			    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

			THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
			*/return function(r){var s=n,i=s.lib,o=i.WordArray,c=i.Hasher,l=s.algo,u=o.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]),h=o.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]),d=o.create([11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]),p=o.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]),m=o.create([0,1518500249,1859775393,2400959708,2840853838]),v=o.create([1352829926,1548603684,1836072691,2053994217,0]),R=l.RIPEMD160=c.extend({_doReset:function(){this._hash=o.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(O,y){for(var _=0;_<16;_++){var E=y+_,x=O[E];O[E]=(x<<8|x>>>24)&16711935|(x<<24|x>>>8)&4278255360}var w=this._hash.words,D=m.words,A=v.words,re=u.words,le=h.words,ae=d.words,se=p.words,ce,Ie,Ce,U,H,q,K,Pe,Te,M;q=ce=w[0],K=Ie=w[1],Pe=Ce=w[2],Te=U=w[3],M=H=w[4];for(var G,_=0;_<80;_+=1)G=ce+O[y+re[_]]|0,_<16?G+=T(Ie,Ce,U)+D[0]:_<32?G+=k(Ie,Ce,U)+D[1]:_<48?G+=I(Ie,Ce,U)+D[2]:_<64?G+=b(Ie,Ce,U)+D[3]:G+=S(Ie,Ce,U)+D[4],G=G|0,G=B(G,ae[_]),G=G+H|0,ce=H,H=U,U=B(Ce,10),Ce=Ie,Ie=G,G=q+O[y+le[_]]|0,_<16?G+=S(K,Pe,Te)+A[0]:_<32?G+=b(K,Pe,Te)+A[1]:_<48?G+=I(K,Pe,Te)+A[2]:_<64?G+=k(K,Pe,Te)+A[3]:G+=T(K,Pe,Te)+A[4],G=G|0,G=B(G,se[_]),G=G+M|0,q=M,M=Te,Te=B(Pe,10),Pe=K,K=G;G=w[1]+Ce+Te|0,w[1]=w[2]+U+M|0,w[2]=w[3]+H+q|0,w[3]=w[4]+ce+K|0,w[4]=w[0]+Ie+Pe|0,w[0]=G},_doFinalize:function(){var O=this._data,y=O.words,_=this._nDataBytes*8,E=O.sigBytes*8;y[E>>>5]|=128<<24-E%32,y[(E+64>>>9<<4)+14]=(_<<8|_>>>24)&16711935|(_<<24|_>>>8)&4278255360,O.sigBytes=(y.length+1)*4,this._process();for(var x=this._hash,w=x.words,D=0;D<5;D++){var A=w[D];w[D]=(A<<8|A>>>24)&16711935|(A<<24|A>>>8)&4278255360}return x},clone:function(){var O=c.clone.call(this);return O._hash=this._hash.clone(),O}});function T(O,y,_){return O^y^_}function k(O,y,_){return O&y|~O&_}function I(O,y,_){return(O|~y)^_}function b(O,y,_){return O&_|y&~_}function S(O,y,_){return O^(y|~_)}function B(O,y){return O<<y|O>>>32-y}s.RIPEMD160=c._createHelper(R),s.HmacRIPEMD160=c._createHmacHelper(R)}(),n.RIPEMD160})}(jo)),jo.exports}var zo={exports:{}},CR=zo.exports,Pd;function f0(){return Pd||(Pd=1,function(t,e){(function(n,r){t.exports=r(ke())})(CR,function(n){(function(){var r=n,s=r.lib,i=s.Base,o=r.enc,c=o.Utf8,l=r.algo;l.HMAC=i.extend({init:function(u,h){u=this._hasher=new u.init,typeof h=="string"&&(h=c.parse(h));var d=u.blockSize,p=d*4;h.sigBytes>p&&(h=u.finalize(h)),h.clamp();for(var m=this._oKey=h.clone(),v=this._iKey=h.clone(),R=m.words,T=v.words,k=0;k<d;k++)R[k]^=1549556828,T[k]^=909522486;m.sigBytes=v.sigBytes=p,this.reset()},reset:function(){var u=this._hasher;u.reset(),u.update(this._iKey)},update:function(u){return this._hasher.update(u),this},finalize:function(u){var h=this._hasher,d=h.finalize(u);h.reset();var p=h.finalize(this._oKey.clone().concat(d));return p}})})()})}(zo)),zo.exports}var Wo={exports:{}},bR=Wo.exports,Fd;function RR(){return Fd||(Fd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),h0(),f0())})(bR,function(n){return function(){var r=n,s=r.lib,i=s.Base,o=s.WordArray,c=r.algo,l=c.SHA256,u=c.HMAC,h=c.PBKDF2=i.extend({cfg:i.extend({keySize:128/32,hasher:l,iterations:25e4}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,p){for(var m=this.cfg,v=u.create(m.hasher,d),R=o.create(),T=o.create([1]),k=R.words,I=T.words,b=m.keySize,S=m.iterations;k.length<b;){var B=v.update(p).finalize(T);v.reset();for(var O=B.words,y=O.length,_=B,E=1;E<S;E++){_=v.finalize(_),v.reset();for(var x=_.words,w=0;w<y;w++)O[w]^=x[w]}R.concat(B),I[0]++}return R.sigBytes=b*4,R}});r.PBKDF2=function(d,p,m){return h.create(m).compute(d,p)}}(),n.PBKDF2})}(Wo)),Wo.exports}var Ko={exports:{}},SR=Ko.exports,kd;function ar(){return kd||(kd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),hx(),f0())})(SR,function(n){return function(){var r=n,s=r.lib,i=s.Base,o=s.WordArray,c=r.algo,l=c.MD5,u=c.EvpKDF=i.extend({cfg:i.extend({keySize:128/32,hasher:l,iterations:1}),init:function(h){this.cfg=this.cfg.extend(h)},compute:function(h,d){for(var p,m=this.cfg,v=m.hasher.create(),R=o.create(),T=R.words,k=m.keySize,I=m.iterations;T.length<k;){p&&v.update(p),p=v.update(h).finalize(d),v.reset();for(var b=1;b<I;b++)p=v.finalize(p),v.reset();R.concat(p)}return R.sigBytes=k*4,R}});r.EvpKDF=function(h,d,p){return u.create(p).compute(h,d)}}(),n.EvpKDF})}(Ko)),Ko.exports}var Go={exports:{}},DR=Go.exports,Bd;function lt(){return Bd||(Bd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),ar())})(DR,function(n){n.lib.Cipher||function(r){var s=n,i=s.lib,o=i.Base,c=i.WordArray,l=i.BufferedBlockAlgorithm,u=s.enc;u.Utf8;var h=u.Base64,d=s.algo,p=d.EvpKDF,m=i.Cipher=l.extend({cfg:o.extend(),createEncryptor:function(x,w){return this.create(this._ENC_XFORM_MODE,x,w)},createDecryptor:function(x,w){return this.create(this._DEC_XFORM_MODE,x,w)},init:function(x,w,D){this.cfg=this.cfg.extend(D),this._xformMode=x,this._key=w,this.reset()},reset:function(){l.reset.call(this),this._doReset()},process:function(x){return this._append(x),this._process()},finalize:function(x){x&&this._append(x);var w=this._doFinalize();return w},keySize:128/32,ivSize:128/32,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function x(w){return typeof w=="string"?E:O}return function(w){return{encrypt:function(D,A,re){return x(A).encrypt(w,D,A,re)},decrypt:function(D,A,re){return x(A).decrypt(w,D,A,re)}}}}()});i.StreamCipher=m.extend({_doFinalize:function(){var x=this._process(!0);return x},blockSize:1});var v=s.mode={},R=i.BlockCipherMode=o.extend({createEncryptor:function(x,w){return this.Encryptor.create(x,w)},createDecryptor:function(x,w){return this.Decryptor.create(x,w)},init:function(x,w){this._cipher=x,this._iv=w}}),T=v.CBC=function(){var x=R.extend();x.Encryptor=x.extend({processBlock:function(D,A){var re=this._cipher,le=re.blockSize;w.call(this,D,A,le),re.encryptBlock(D,A),this._prevBlock=D.slice(A,A+le)}}),x.Decryptor=x.extend({processBlock:function(D,A){var re=this._cipher,le=re.blockSize,ae=D.slice(A,A+le);re.decryptBlock(D,A),w.call(this,D,A,le),this._prevBlock=ae}});function w(D,A,re){var le,ae=this._iv;ae?(le=ae,this._iv=r):le=this._prevBlock;for(var se=0;se<re;se++)D[A+se]^=le[se]}return x}(),k=s.pad={},I=k.Pkcs7={pad:function(x,w){for(var D=w*4,A=D-x.sigBytes%D,re=A<<24|A<<16|A<<8|A,le=[],ae=0;ae<A;ae+=4)le.push(re);var se=c.create(le,A);x.concat(se)},unpad:function(x){var w=x.words[x.sigBytes-1>>>2]&255;x.sigBytes-=w}};i.BlockCipher=m.extend({cfg:m.cfg.extend({mode:T,padding:I}),reset:function(){var x;m.reset.call(this);var w=this.cfg,D=w.iv,A=w.mode;this._xformMode==this._ENC_XFORM_MODE?x=A.createEncryptor:(x=A.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==x?this._mode.init(this,D&&D.words):(this._mode=x.call(A,this,D&&D.words),this._mode.__creator=x)},_doProcessBlock:function(x,w){this._mode.processBlock(x,w)},_doFinalize:function(){var x,w=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(w.pad(this._data,this.blockSize),x=this._process(!0)):(x=this._process(!0),w.unpad(x)),x},blockSize:128/32});var b=i.CipherParams=o.extend({init:function(x){this.mixIn(x)},toString:function(x){return(x||this.formatter).stringify(this)}}),S=s.format={},B=S.OpenSSL={stringify:function(x){var w,D=x.ciphertext,A=x.salt;return A?w=c.create([1398893684,1701076831]).concat(A).concat(D):w=D,w.toString(h)},parse:function(x){var w,D=h.parse(x),A=D.words;return A[0]==1398893684&&A[1]==1701076831&&(w=c.create(A.slice(2,4)),A.splice(0,4),D.sigBytes-=16),b.create({ciphertext:D,salt:w})}},O=i.SerializableCipher=o.extend({cfg:o.extend({format:B}),encrypt:function(x,w,D,A){A=this.cfg.extend(A);var re=x.createEncryptor(D,A),le=re.finalize(w),ae=re.cfg;return b.create({ciphertext:le,key:D,iv:ae.iv,algorithm:x,mode:ae.mode,padding:ae.padding,blockSize:x.blockSize,formatter:A.format})},decrypt:function(x,w,D,A){A=this.cfg.extend(A),w=this._parse(w,A.format);var re=x.createDecryptor(D,A).finalize(w.ciphertext);return re},_parse:function(x,w){return typeof x=="string"?w.parse(x,this):x}}),y=s.kdf={},_=y.OpenSSL={execute:function(x,w,D,A,re){if(A||(A=c.random(64/8)),re)var le=p.create({keySize:w+D,hasher:re}).compute(x,A);else var le=p.create({keySize:w+D}).compute(x,A);var ae=c.create(le.words.slice(w),D*4);return le.sigBytes=w*4,b.create({key:le,iv:ae,salt:A})}},E=i.PasswordBasedCipher=O.extend({cfg:O.cfg.extend({kdf:_}),encrypt:function(x,w,D,A){A=this.cfg.extend(A);var re=A.kdf.execute(D,x.keySize,x.ivSize,A.salt,A.hasher);A.iv=re.iv;var le=O.encrypt.call(this,x,w,re.key,A);return le.mixIn(re),le},decrypt:function(x,w,D,A){A=this.cfg.extend(A),w=this._parse(w,A.format);var re=A.kdf.execute(D,x.keySize,x.ivSize,w.salt,A.hasher);A.iv=re.iv;var le=O.decrypt.call(this,x,w,re.key,A);return le}})}()})}(Go)),Go.exports}var Qo={exports:{}},PR=Qo.exports,Od;function FR(){return Od||(Od=1,function(t,e){(function(n,r,s){t.exports=r(ke(),lt())})(PR,function(n){return n.mode.CFB=function(){var r=n.lib.BlockCipherMode.extend();r.Encryptor=r.extend({processBlock:function(i,o){var c=this._cipher,l=c.blockSize;s.call(this,i,o,l,c),this._prevBlock=i.slice(o,o+l)}}),r.Decryptor=r.extend({processBlock:function(i,o){var c=this._cipher,l=c.blockSize,u=i.slice(o,o+l);s.call(this,i,o,l,c),this._prevBlock=u}});function s(i,o,c,l){var u,h=this._iv;h?(u=h.slice(0),this._iv=void 0):u=this._prevBlock,l.encryptBlock(u,0);for(var d=0;d<c;d++)i[o+d]^=u[d]}return r}(),n.mode.CFB})}(Qo)),Qo.exports}var Xo={exports:{}},kR=Xo.exports,Nd;function BR(){return Nd||(Nd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),lt())})(kR,function(n){return n.mode.CTR=function(){var r=n.lib.BlockCipherMode.extend(),s=r.Encryptor=r.extend({processBlock:function(i,o){var c=this._cipher,l=c.blockSize,u=this._iv,h=this._counter;u&&(h=this._counter=u.slice(0),this._iv=void 0);var d=h.slice(0);c.encryptBlock(d,0),h[l-1]=h[l-1]+1|0;for(var p=0;p<l;p++)i[o+p]^=d[p]}});return r.Decryptor=s,r}(),n.mode.CTR})}(Xo)),Xo.exports}var Yo={exports:{}},OR=Yo.exports,Vd;function NR(){return Vd||(Vd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),lt())})(OR,function(n){/** @preserve
 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
 * derived from CryptoJS.mode.CTR
 * Jan Hruby jhruby.web@gmail.com
 */return n.mode.CTRGladman=function(){var r=n.lib.BlockCipherMode.extend();function s(c){if((c>>24&255)===255){var l=c>>16&255,u=c>>8&255,h=c&255;l===255?(l=0,u===255?(u=0,h===255?h=0:++h):++u):++l,c=0,c+=l<<16,c+=u<<8,c+=h}else c+=1<<24;return c}function i(c){return(c[0]=s(c[0]))===0&&(c[1]=s(c[1])),c}var o=r.Encryptor=r.extend({processBlock:function(c,l){var u=this._cipher,h=u.blockSize,d=this._iv,p=this._counter;d&&(p=this._counter=d.slice(0),this._iv=void 0),i(p);var m=p.slice(0);u.encryptBlock(m,0);for(var v=0;v<h;v++)c[l+v]^=m[v]}});return r.Decryptor=o,r}(),n.mode.CTRGladman})}(Yo)),Yo.exports}var Jo={exports:{}},VR=Jo.exports,Ld;function LR(){return Ld||(Ld=1,function(t,e){(function(n,r,s){t.exports=r(ke(),lt())})(VR,function(n){return n.mode.OFB=function(){var r=n.lib.BlockCipherMode.extend(),s=r.Encryptor=r.extend({processBlock:function(i,o){var c=this._cipher,l=c.blockSize,u=this._iv,h=this._keystream;u&&(h=this._keystream=u.slice(0),this._iv=void 0),c.encryptBlock(h,0);for(var d=0;d<l;d++)i[o+d]^=h[d]}});return r.Decryptor=s,r}(),n.mode.OFB})}(Jo)),Jo.exports}var Zo={exports:{}},MR=Zo.exports,Md;function UR(){return Md||(Md=1,function(t,e){(function(n,r,s){t.exports=r(ke(),lt())})(MR,function(n){return n.mode.ECB=function(){var r=n.lib.BlockCipherMode.extend();return r.Encryptor=r.extend({processBlock:function(s,i){this._cipher.encryptBlock(s,i)}}),r.Decryptor=r.extend({processBlock:function(s,i){this._cipher.decryptBlock(s,i)}}),r}(),n.mode.ECB})}(Zo)),Zo.exports}var ea={exports:{}},$R=ea.exports,Ud;function HR(){return Ud||(Ud=1,function(t,e){(function(n,r,s){t.exports=r(ke(),lt())})($R,function(n){return n.pad.AnsiX923={pad:function(r,s){var i=r.sigBytes,o=s*4,c=o-i%o,l=i+c-1;r.clamp(),r.words[l>>>2]|=c<<24-l%4*8,r.sigBytes+=c},unpad:function(r){var s=r.words[r.sigBytes-1>>>2]&255;r.sigBytes-=s}},n.pad.Ansix923})}(ea)),ea.exports}var ta={exports:{}},qR=ta.exports,$d;function jR(){return $d||($d=1,function(t,e){(function(n,r,s){t.exports=r(ke(),lt())})(qR,function(n){return n.pad.Iso10126={pad:function(r,s){var i=s*4,o=i-r.sigBytes%i;r.concat(n.lib.WordArray.random(o-1)).concat(n.lib.WordArray.create([o<<24],1))},unpad:function(r){var s=r.words[r.sigBytes-1>>>2]&255;r.sigBytes-=s}},n.pad.Iso10126})}(ta)),ta.exports}var na={exports:{}},zR=na.exports,Hd;function WR(){return Hd||(Hd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),lt())})(zR,function(n){return n.pad.Iso97971={pad:function(r,s){r.concat(n.lib.WordArray.create([2147483648],1)),n.pad.ZeroPadding.pad(r,s)},unpad:function(r){n.pad.ZeroPadding.unpad(r),r.sigBytes--}},n.pad.Iso97971})}(na)),na.exports}var ra={exports:{}},KR=ra.exports,qd;function GR(){return qd||(qd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),lt())})(KR,function(n){return n.pad.ZeroPadding={pad:function(r,s){var i=s*4;r.clamp(),r.sigBytes+=i-(r.sigBytes%i||i)},unpad:function(r){for(var s=r.words,i=r.sigBytes-1,i=r.sigBytes-1;i>=0;i--)if(s[i>>>2]>>>24-i%4*8&255){r.sigBytes=i+1;break}}},n.pad.ZeroPadding})}(ra)),ra.exports}var sa={exports:{}},QR=sa.exports,jd;function XR(){return jd||(jd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),lt())})(QR,function(n){return n.pad.NoPadding={pad:function(){},unpad:function(){}},n.pad.NoPadding})}(sa)),sa.exports}var ia={exports:{}},YR=ia.exports,zd;function JR(){return zd||(zd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),lt())})(YR,function(n){return function(r){var s=n,i=s.lib,o=i.CipherParams,c=s.enc,l=c.Hex,u=s.format;u.Hex={stringify:function(h){return h.ciphertext.toString(l)},parse:function(h){var d=l.parse(h);return o.create({ciphertext:d})}}}(),n.format.Hex})}(ia)),ia.exports}var oa={exports:{}},ZR=oa.exports,Wd;function eS(){return Wd||(Wd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),Mr(),Ur(),ar(),lt())})(ZR,function(n){return function(){var r=n,s=r.lib,i=s.BlockCipher,o=r.algo,c=[],l=[],u=[],h=[],d=[],p=[],m=[],v=[],R=[],T=[];(function(){for(var b=[],S=0;S<256;S++)S<128?b[S]=S<<1:b[S]=S<<1^283;for(var B=0,O=0,S=0;S<256;S++){var y=O^O<<1^O<<2^O<<3^O<<4;y=y>>>8^y&255^99,c[B]=y,l[y]=B;var _=b[B],E=b[_],x=b[E],w=b[y]*257^y*16843008;u[B]=w<<24|w>>>8,h[B]=w<<16|w>>>16,d[B]=w<<8|w>>>24,p[B]=w;var w=x*16843009^E*65537^_*257^B*16843008;m[y]=w<<24|w>>>8,v[y]=w<<16|w>>>16,R[y]=w<<8|w>>>24,T[y]=w,B?(B=_^b[b[b[x^_]]],O^=b[b[O]]):B=O=1}})();var k=[0,1,2,4,8,16,32,64,128,27,54],I=o.AES=i.extend({_doReset:function(){var b;if(!(this._nRounds&&this._keyPriorReset===this._key)){for(var S=this._keyPriorReset=this._key,B=S.words,O=S.sigBytes/4,y=this._nRounds=O+6,_=(y+1)*4,E=this._keySchedule=[],x=0;x<_;x++)x<O?E[x]=B[x]:(b=E[x-1],x%O?O>6&&x%O==4&&(b=c[b>>>24]<<24|c[b>>>16&255]<<16|c[b>>>8&255]<<8|c[b&255]):(b=b<<8|b>>>24,b=c[b>>>24]<<24|c[b>>>16&255]<<16|c[b>>>8&255]<<8|c[b&255],b^=k[x/O|0]<<24),E[x]=E[x-O]^b);for(var w=this._invKeySchedule=[],D=0;D<_;D++){var x=_-D;if(D%4)var b=E[x];else var b=E[x-4];D<4||x<=4?w[D]=b:w[D]=m[c[b>>>24]]^v[c[b>>>16&255]]^R[c[b>>>8&255]]^T[c[b&255]]}}},encryptBlock:function(b,S){this._doCryptBlock(b,S,this._keySchedule,u,h,d,p,c)},decryptBlock:function(b,S){var B=b[S+1];b[S+1]=b[S+3],b[S+3]=B,this._doCryptBlock(b,S,this._invKeySchedule,m,v,R,T,l);var B=b[S+1];b[S+1]=b[S+3],b[S+3]=B},_doCryptBlock:function(b,S,B,O,y,_,E,x){for(var w=this._nRounds,D=b[S]^B[0],A=b[S+1]^B[1],re=b[S+2]^B[2],le=b[S+3]^B[3],ae=4,se=1;se<w;se++){var ce=O[D>>>24]^y[A>>>16&255]^_[re>>>8&255]^E[le&255]^B[ae++],Ie=O[A>>>24]^y[re>>>16&255]^_[le>>>8&255]^E[D&255]^B[ae++],Ce=O[re>>>24]^y[le>>>16&255]^_[D>>>8&255]^E[A&255]^B[ae++],U=O[le>>>24]^y[D>>>16&255]^_[A>>>8&255]^E[re&255]^B[ae++];D=ce,A=Ie,re=Ce,le=U}var ce=(x[D>>>24]<<24|x[A>>>16&255]<<16|x[re>>>8&255]<<8|x[le&255])^B[ae++],Ie=(x[A>>>24]<<24|x[re>>>16&255]<<16|x[le>>>8&255]<<8|x[D&255])^B[ae++],Ce=(x[re>>>24]<<24|x[le>>>16&255]<<16|x[D>>>8&255]<<8|x[A&255])^B[ae++],U=(x[le>>>24]<<24|x[D>>>16&255]<<16|x[A>>>8&255]<<8|x[re&255])^B[ae++];b[S]=ce,b[S+1]=Ie,b[S+2]=Ce,b[S+3]=U},keySize:256/32});r.AES=i._createHelper(I)}(),n.AES})}(oa)),oa.exports}var aa={exports:{}},tS=aa.exports,Kd;function nS(){return Kd||(Kd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),Mr(),Ur(),ar(),lt())})(tS,function(n){return function(){var r=n,s=r.lib,i=s.WordArray,o=s.BlockCipher,c=r.algo,l=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],u=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],h=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],d=[{0:8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{0:1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{0:260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{0:2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{0:128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{0:268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{0:1048576,16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{0:134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],p=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],m=c.DES=o.extend({_doReset:function(){for(var k=this._key,I=k.words,b=[],S=0;S<56;S++){var B=l[S]-1;b[S]=I[B>>>5]>>>31-B%32&1}for(var O=this._subKeys=[],y=0;y<16;y++){for(var _=O[y]=[],E=h[y],S=0;S<24;S++)_[S/6|0]|=b[(u[S]-1+E)%28]<<31-S%6,_[4+(S/6|0)]|=b[28+(u[S+24]-1+E)%28]<<31-S%6;_[0]=_[0]<<1|_[0]>>>31;for(var S=1;S<7;S++)_[S]=_[S]>>>(S-1)*4+3;_[7]=_[7]<<5|_[7]>>>27}for(var x=this._invSubKeys=[],S=0;S<16;S++)x[S]=O[15-S]},encryptBlock:function(k,I){this._doCryptBlock(k,I,this._subKeys)},decryptBlock:function(k,I){this._doCryptBlock(k,I,this._invSubKeys)},_doCryptBlock:function(k,I,b){this._lBlock=k[I],this._rBlock=k[I+1],v.call(this,4,252645135),v.call(this,16,65535),R.call(this,2,858993459),R.call(this,8,16711935),v.call(this,1,1431655765);for(var S=0;S<16;S++){for(var B=b[S],O=this._lBlock,y=this._rBlock,_=0,E=0;E<8;E++)_|=d[E][((y^B[E])&p[E])>>>0];this._lBlock=y,this._rBlock=O^_}var x=this._lBlock;this._lBlock=this._rBlock,this._rBlock=x,v.call(this,1,1431655765),R.call(this,8,16711935),R.call(this,2,858993459),v.call(this,16,65535),v.call(this,4,252645135),k[I]=this._lBlock,k[I+1]=this._rBlock},keySize:64/32,ivSize:64/32,blockSize:64/32});function v(k,I){var b=(this._lBlock>>>k^this._rBlock)&I;this._rBlock^=b,this._lBlock^=b<<k}function R(k,I){var b=(this._rBlock>>>k^this._lBlock)&I;this._lBlock^=b,this._rBlock^=b<<k}r.DES=o._createHelper(m);var T=c.TripleDES=o.extend({_doReset:function(){var k=this._key,I=k.words;if(I.length!==2&&I.length!==4&&I.length<6)throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");var b=I.slice(0,2),S=I.length<4?I.slice(0,2):I.slice(2,4),B=I.length<6?I.slice(0,2):I.slice(4,6);this._des1=m.createEncryptor(i.create(b)),this._des2=m.createEncryptor(i.create(S)),this._des3=m.createEncryptor(i.create(B))},encryptBlock:function(k,I){this._des1.encryptBlock(k,I),this._des2.decryptBlock(k,I),this._des3.encryptBlock(k,I)},decryptBlock:function(k,I){this._des3.decryptBlock(k,I),this._des2.encryptBlock(k,I),this._des1.decryptBlock(k,I)},keySize:192/32,ivSize:64/32,blockSize:64/32});r.TripleDES=o._createHelper(T)}(),n.TripleDES})}(aa)),aa.exports}var ca={exports:{}},rS=ca.exports,Gd;function sS(){return Gd||(Gd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),Mr(),Ur(),ar(),lt())})(rS,function(n){return function(){var r=n,s=r.lib,i=s.StreamCipher,o=r.algo,c=o.RC4=i.extend({_doReset:function(){for(var h=this._key,d=h.words,p=h.sigBytes,m=this._S=[],v=0;v<256;v++)m[v]=v;for(var v=0,R=0;v<256;v++){var T=v%p,k=d[T>>>2]>>>24-T%4*8&255;R=(R+m[v]+k)%256;var I=m[v];m[v]=m[R],m[R]=I}this._i=this._j=0},_doProcessBlock:function(h,d){h[d]^=l.call(this)},keySize:256/32,ivSize:0});function l(){for(var h=this._S,d=this._i,p=this._j,m=0,v=0;v<4;v++){d=(d+1)%256,p=(p+h[d])%256;var R=h[d];h[d]=h[p],h[p]=R,m|=h[(h[d]+h[p])%256]<<24-v*8}return this._i=d,this._j=p,m}r.RC4=i._createHelper(c);var u=o.RC4Drop=c.extend({cfg:c.cfg.extend({drop:192}),_doReset:function(){c._doReset.call(this);for(var h=this.cfg.drop;h>0;h--)l.call(this)}});r.RC4Drop=i._createHelper(u)}(),n.RC4})}(ca)),ca.exports}var la={exports:{}},iS=la.exports,Qd;function oS(){return Qd||(Qd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),Mr(),Ur(),ar(),lt())})(iS,function(n){return function(){var r=n,s=r.lib,i=s.StreamCipher,o=r.algo,c=[],l=[],u=[],h=o.Rabbit=i.extend({_doReset:function(){for(var p=this._key.words,m=this.cfg.iv,v=0;v<4;v++)p[v]=(p[v]<<8|p[v]>>>24)&16711935|(p[v]<<24|p[v]>>>8)&4278255360;var R=this._X=[p[0],p[3]<<16|p[2]>>>16,p[1],p[0]<<16|p[3]>>>16,p[2],p[1]<<16|p[0]>>>16,p[3],p[2]<<16|p[1]>>>16],T=this._C=[p[2]<<16|p[2]>>>16,p[0]&4294901760|p[1]&65535,p[3]<<16|p[3]>>>16,p[1]&4294901760|p[2]&65535,p[0]<<16|p[0]>>>16,p[2]&4294901760|p[3]&65535,p[1]<<16|p[1]>>>16,p[3]&4294901760|p[0]&65535];this._b=0;for(var v=0;v<4;v++)d.call(this);for(var v=0;v<8;v++)T[v]^=R[v+4&7];if(m){var k=m.words,I=k[0],b=k[1],S=(I<<8|I>>>24)&16711935|(I<<24|I>>>8)&4278255360,B=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360,O=S>>>16|B&4294901760,y=B<<16|S&65535;T[0]^=S,T[1]^=O,T[2]^=B,T[3]^=y,T[4]^=S,T[5]^=O,T[6]^=B,T[7]^=y;for(var v=0;v<4;v++)d.call(this)}},_doProcessBlock:function(p,m){var v=this._X;d.call(this),c[0]=v[0]^v[5]>>>16^v[3]<<16,c[1]=v[2]^v[7]>>>16^v[5]<<16,c[2]=v[4]^v[1]>>>16^v[7]<<16,c[3]=v[6]^v[3]>>>16^v[1]<<16;for(var R=0;R<4;R++)c[R]=(c[R]<<8|c[R]>>>24)&16711935|(c[R]<<24|c[R]>>>8)&4278255360,p[m+R]^=c[R]},blockSize:128/32,ivSize:64/32});function d(){for(var p=this._X,m=this._C,v=0;v<8;v++)l[v]=m[v];m[0]=m[0]+1295307597+this._b|0,m[1]=m[1]+3545052371+(m[0]>>>0<l[0]>>>0?1:0)|0,m[2]=m[2]+886263092+(m[1]>>>0<l[1]>>>0?1:0)|0,m[3]=m[3]+1295307597+(m[2]>>>0<l[2]>>>0?1:0)|0,m[4]=m[4]+3545052371+(m[3]>>>0<l[3]>>>0?1:0)|0,m[5]=m[5]+886263092+(m[4]>>>0<l[4]>>>0?1:0)|0,m[6]=m[6]+1295307597+(m[5]>>>0<l[5]>>>0?1:0)|0,m[7]=m[7]+3545052371+(m[6]>>>0<l[6]>>>0?1:0)|0,this._b=m[7]>>>0<l[7]>>>0?1:0;for(var v=0;v<8;v++){var R=p[v]+m[v],T=R&65535,k=R>>>16,I=((T*T>>>17)+T*k>>>15)+k*k,b=((R&4294901760)*R|0)+((R&65535)*R|0);u[v]=I^b}p[0]=u[0]+(u[7]<<16|u[7]>>>16)+(u[6]<<16|u[6]>>>16)|0,p[1]=u[1]+(u[0]<<8|u[0]>>>24)+u[7]|0,p[2]=u[2]+(u[1]<<16|u[1]>>>16)+(u[0]<<16|u[0]>>>16)|0,p[3]=u[3]+(u[2]<<8|u[2]>>>24)+u[1]|0,p[4]=u[4]+(u[3]<<16|u[3]>>>16)+(u[2]<<16|u[2]>>>16)|0,p[5]=u[5]+(u[4]<<8|u[4]>>>24)+u[3]|0,p[6]=u[6]+(u[5]<<16|u[5]>>>16)+(u[4]<<16|u[4]>>>16)|0,p[7]=u[7]+(u[6]<<8|u[6]>>>24)+u[5]|0}r.Rabbit=i._createHelper(h)}(),n.Rabbit})}(la)),la.exports}var ua={exports:{}},aS=ua.exports,Xd;function cS(){return Xd||(Xd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),Mr(),Ur(),ar(),lt())})(aS,function(n){return function(){var r=n,s=r.lib,i=s.StreamCipher,o=r.algo,c=[],l=[],u=[],h=o.RabbitLegacy=i.extend({_doReset:function(){var p=this._key.words,m=this.cfg.iv,v=this._X=[p[0],p[3]<<16|p[2]>>>16,p[1],p[0]<<16|p[3]>>>16,p[2],p[1]<<16|p[0]>>>16,p[3],p[2]<<16|p[1]>>>16],R=this._C=[p[2]<<16|p[2]>>>16,p[0]&4294901760|p[1]&65535,p[3]<<16|p[3]>>>16,p[1]&4294901760|p[2]&65535,p[0]<<16|p[0]>>>16,p[2]&4294901760|p[3]&65535,p[1]<<16|p[1]>>>16,p[3]&4294901760|p[0]&65535];this._b=0;for(var T=0;T<4;T++)d.call(this);for(var T=0;T<8;T++)R[T]^=v[T+4&7];if(m){var k=m.words,I=k[0],b=k[1],S=(I<<8|I>>>24)&16711935|(I<<24|I>>>8)&4278255360,B=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360,O=S>>>16|B&4294901760,y=B<<16|S&65535;R[0]^=S,R[1]^=O,R[2]^=B,R[3]^=y,R[4]^=S,R[5]^=O,R[6]^=B,R[7]^=y;for(var T=0;T<4;T++)d.call(this)}},_doProcessBlock:function(p,m){var v=this._X;d.call(this),c[0]=v[0]^v[5]>>>16^v[3]<<16,c[1]=v[2]^v[7]>>>16^v[5]<<16,c[2]=v[4]^v[1]>>>16^v[7]<<16,c[3]=v[6]^v[3]>>>16^v[1]<<16;for(var R=0;R<4;R++)c[R]=(c[R]<<8|c[R]>>>24)&16711935|(c[R]<<24|c[R]>>>8)&4278255360,p[m+R]^=c[R]},blockSize:128/32,ivSize:64/32});function d(){for(var p=this._X,m=this._C,v=0;v<8;v++)l[v]=m[v];m[0]=m[0]+1295307597+this._b|0,m[1]=m[1]+3545052371+(m[0]>>>0<l[0]>>>0?1:0)|0,m[2]=m[2]+886263092+(m[1]>>>0<l[1]>>>0?1:0)|0,m[3]=m[3]+1295307597+(m[2]>>>0<l[2]>>>0?1:0)|0,m[4]=m[4]+3545052371+(m[3]>>>0<l[3]>>>0?1:0)|0,m[5]=m[5]+886263092+(m[4]>>>0<l[4]>>>0?1:0)|0,m[6]=m[6]+1295307597+(m[5]>>>0<l[5]>>>0?1:0)|0,m[7]=m[7]+3545052371+(m[6]>>>0<l[6]>>>0?1:0)|0,this._b=m[7]>>>0<l[7]>>>0?1:0;for(var v=0;v<8;v++){var R=p[v]+m[v],T=R&65535,k=R>>>16,I=((T*T>>>17)+T*k>>>15)+k*k,b=((R&4294901760)*R|0)+((R&65535)*R|0);u[v]=I^b}p[0]=u[0]+(u[7]<<16|u[7]>>>16)+(u[6]<<16|u[6]>>>16)|0,p[1]=u[1]+(u[0]<<8|u[0]>>>24)+u[7]|0,p[2]=u[2]+(u[1]<<16|u[1]>>>16)+(u[0]<<16|u[0]>>>16)|0,p[3]=u[3]+(u[2]<<8|u[2]>>>24)+u[1]|0,p[4]=u[4]+(u[3]<<16|u[3]>>>16)+(u[2]<<16|u[2]>>>16)|0,p[5]=u[5]+(u[4]<<8|u[4]>>>24)+u[3]|0,p[6]=u[6]+(u[5]<<16|u[5]>>>16)+(u[4]<<16|u[4]>>>16)|0,p[7]=u[7]+(u[6]<<8|u[6]>>>24)+u[5]|0}r.RabbitLegacy=i._createHelper(h)}(),n.RabbitLegacy})}(ua)),ua.exports}var ha={exports:{}},lS=ha.exports,Yd;function uS(){return Yd||(Yd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),Mr(),Ur(),ar(),lt())})(lS,function(n){return function(){var r=n,s=r.lib,i=s.BlockCipher,o=r.algo;const c=16,l=[608135816,2242054355,320440878,57701188,2752067618,698298832,137296536,3964562569,1160258022,953160567,3193202383,887688300,3232508343,3380367581,1065670069,3041331479,2450970073,2306472731],u=[[3509652390,2564797868,805139163,3491422135,3101798381,1780907670,3128725573,4046225305,614570311,3012652279,134345442,2240740374,1667834072,1901547113,2757295779,4103290238,227898511,1921955416,1904987480,2182433518,2069144605,3260701109,2620446009,720527379,3318853667,677414384,3393288472,3101374703,2390351024,1614419982,1822297739,2954791486,3608508353,3174124327,2024746970,1432378464,3864339955,2857741204,1464375394,1676153920,1439316330,715854006,3033291828,289532110,2706671279,2087905683,3018724369,1668267050,732546397,1947742710,3462151702,2609353502,2950085171,1814351708,2050118529,680887927,999245976,1800124847,3300911131,1713906067,1641548236,4213287313,1216130144,1575780402,4018429277,3917837745,3693486850,3949271944,596196993,3549867205,258830323,2213823033,772490370,2760122372,1774776394,2652871518,566650946,4142492826,1728879713,2882767088,1783734482,3629395816,2517608232,2874225571,1861159788,326777828,3124490320,2130389656,2716951837,967770486,1724537150,2185432712,2364442137,1164943284,2105845187,998989502,3765401048,2244026483,1075463327,1455516326,1322494562,910128902,469688178,1117454909,936433444,3490320968,3675253459,1240580251,122909385,2157517691,634681816,4142456567,3825094682,3061402683,2540495037,79693498,3249098678,1084186820,1583128258,426386531,1761308591,1047286709,322548459,995290223,1845252383,2603652396,3431023940,2942221577,3202600964,3727903485,1712269319,422464435,3234572375,1170764815,3523960633,3117677531,1434042557,442511882,3600875718,1076654713,1738483198,4213154764,2393238008,3677496056,1014306527,4251020053,793779912,2902807211,842905082,4246964064,1395751752,1040244610,2656851899,3396308128,445077038,3742853595,3577915638,679411651,2892444358,2354009459,1767581616,3150600392,3791627101,3102740896,284835224,4246832056,1258075500,768725851,2589189241,3069724005,3532540348,1274779536,3789419226,2764799539,1660621633,3471099624,4011903706,913787905,3497959166,737222580,2514213453,2928710040,3937242737,1804850592,3499020752,2949064160,2386320175,2390070455,2415321851,4061277028,2290661394,2416832540,1336762016,1754252060,3520065937,3014181293,791618072,3188594551,3933548030,2332172193,3852520463,3043980520,413987798,3465142937,3030929376,4245938359,2093235073,3534596313,375366246,2157278981,2479649556,555357303,3870105701,2008414854,3344188149,4221384143,3956125452,2067696032,3594591187,2921233993,2428461,544322398,577241275,1471733935,610547355,4027169054,1432588573,1507829418,2025931657,3646575487,545086370,48609733,2200306550,1653985193,298326376,1316178497,3007786442,2064951626,458293330,2589141269,3591329599,3164325604,727753846,2179363840,146436021,1461446943,4069977195,705550613,3059967265,3887724982,4281599278,3313849956,1404054877,2845806497,146425753,1854211946],[1266315497,3048417604,3681880366,3289982499,290971e4,1235738493,2632868024,2414719590,3970600049,1771706367,1449415276,3266420449,422970021,1963543593,2690192192,3826793022,1062508698,1531092325,1804592342,2583117782,2714934279,4024971509,1294809318,4028980673,1289560198,2221992742,1669523910,35572830,157838143,1052438473,1016535060,1802137761,1753167236,1386275462,3080475397,2857371447,1040679964,2145300060,2390574316,1461121720,2956646967,4031777805,4028374788,33600511,2920084762,1018524850,629373528,3691585981,3515945977,2091462646,2486323059,586499841,988145025,935516892,3367335476,2599673255,2839830854,265290510,3972581182,2759138881,3795373465,1005194799,847297441,406762289,1314163512,1332590856,1866599683,4127851711,750260880,613907577,1450815602,3165620655,3734664991,3650291728,3012275730,3704569646,1427272223,778793252,1343938022,2676280711,2052605720,1946737175,3164576444,3914038668,3967478842,3682934266,1661551462,3294938066,4011595847,840292616,3712170807,616741398,312560963,711312465,1351876610,322626781,1910503582,271666773,2175563734,1594956187,70604529,3617834859,1007753275,1495573769,4069517037,2549218298,2663038764,504708206,2263041392,3941167025,2249088522,1514023603,1998579484,1312622330,694541497,2582060303,2151582166,1382467621,776784248,2618340202,3323268794,2497899128,2784771155,503983604,4076293799,907881277,423175695,432175456,1378068232,4145222326,3954048622,3938656102,3820766613,2793130115,2977904593,26017576,3274890735,3194772133,1700274565,1756076034,4006520079,3677328699,720338349,1533947780,354530856,688349552,3973924725,1637815568,332179504,3949051286,53804574,2852348879,3044236432,1282449977,3583942155,3416972820,4006381244,1617046695,2628476075,3002303598,1686838959,431878346,2686675385,1700445008,1080580658,1009431731,832498133,3223435511,2605976345,2271191193,2516031870,1648197032,4164389018,2548247927,300782431,375919233,238389289,3353747414,2531188641,2019080857,1475708069,455242339,2609103871,448939670,3451063019,1395535956,2413381860,1841049896,1491858159,885456874,4264095073,4001119347,1565136089,3898914787,1108368660,540939232,1173283510,2745871338,3681308437,4207628240,3343053890,4016749493,1699691293,1103962373,3625875870,2256883143,3830138730,1031889488,3479347698,1535977030,4236805024,3251091107,2132092099,1774941330,1199868427,1452454533,157007616,2904115357,342012276,595725824,1480756522,206960106,497939518,591360097,863170706,2375253569,3596610801,1814182875,2094937945,3421402208,1082520231,3463918190,2785509508,435703966,3908032597,1641649973,2842273706,3305899714,1510255612,2148256476,2655287854,3276092548,4258621189,236887753,3681803219,274041037,1734335097,3815195456,3317970021,1899903192,1026095262,4050517792,356393447,2410691914,3873677099,3682840055],[3913112168,2491498743,4132185628,2489919796,1091903735,1979897079,3170134830,3567386728,3557303409,857797738,1136121015,1342202287,507115054,2535736646,337727348,3213592640,1301675037,2528481711,1895095763,1721773893,3216771564,62756741,2142006736,835421444,2531993523,1442658625,3659876326,2882144922,676362277,1392781812,170690266,3921047035,1759253602,3611846912,1745797284,664899054,1329594018,3901205900,3045908486,2062866102,2865634940,3543621612,3464012697,1080764994,553557557,3656615353,3996768171,991055499,499776247,1265440854,648242737,3940784050,980351604,3713745714,1749149687,3396870395,4211799374,3640570775,1161844396,3125318951,1431517754,545492359,4268468663,3499529547,1437099964,2702547544,3433638243,2581715763,2787789398,1060185593,1593081372,2418618748,4260947970,69676912,2159744348,86519011,2512459080,3838209314,1220612927,3339683548,133810670,1090789135,1078426020,1569222167,845107691,3583754449,4072456591,1091646820,628848692,1613405280,3757631651,526609435,236106946,48312990,2942717905,3402727701,1797494240,859738849,992217954,4005476642,2243076622,3870952857,3732016268,765654824,3490871365,2511836413,1685915746,3888969200,1414112111,2273134842,3281911079,4080962846,172450625,2569994100,980381355,4109958455,2819808352,2716589560,2568741196,3681446669,3329971472,1835478071,660984891,3704678404,4045999559,3422617507,3040415634,1762651403,1719377915,3470491036,2693910283,3642056355,3138596744,1364962596,2073328063,1983633131,926494387,3423689081,2150032023,4096667949,1749200295,3328846651,309677260,2016342300,1779581495,3079819751,111262694,1274766160,443224088,298511866,1025883608,3806446537,1145181785,168956806,3641502830,3584813610,1689216846,3666258015,3200248200,1692713982,2646376535,4042768518,1618508792,1610833997,3523052358,4130873264,2001055236,3610705100,2202168115,4028541809,2961195399,1006657119,2006996926,3186142756,1430667929,3210227297,1314452623,4074634658,4101304120,2273951170,1399257539,3367210612,3027628629,1190975929,2062231137,2333990788,2221543033,2438960610,1181637006,548689776,2362791313,3372408396,3104550113,3145860560,296247880,1970579870,3078560182,3769228297,1714227617,3291629107,3898220290,166772364,1251581989,493813264,448347421,195405023,2709975567,677966185,3703036547,1463355134,2715995803,1338867538,1343315457,2802222074,2684532164,233230375,2599980071,2000651841,3277868038,1638401717,4028070440,3237316320,6314154,819756386,300326615,590932579,1405279636,3267499572,3150704214,2428286686,3959192993,3461946742,1862657033,1266418056,963775037,2089974820,2263052895,1917689273,448879540,3550394620,3981727096,150775221,3627908307,1303187396,508620638,2975983352,2726630617,1817252668,1876281319,1457606340,908771278,3720792119,3617206836,2455994898,1729034894,1080033504],[976866871,3556439503,2881648439,1522871579,1555064734,1336096578,3548522304,2579274686,3574697629,3205460757,3593280638,3338716283,3079412587,564236357,2993598910,1781952180,1464380207,3163844217,3332601554,1699332808,1393555694,1183702653,3581086237,1288719814,691649499,2847557200,2895455976,3193889540,2717570544,1781354906,1676643554,2592534050,3230253752,1126444790,2770207658,2633158820,2210423226,2615765581,2414155088,3127139286,673620729,2805611233,1269405062,4015350505,3341807571,4149409754,1057255273,2012875353,2162469141,2276492801,2601117357,993977747,3918593370,2654263191,753973209,36408145,2530585658,25011837,3520020182,2088578344,530523599,2918365339,1524020338,1518925132,3760827505,3759777254,1202760957,3985898139,3906192525,674977740,4174734889,2031300136,2019492241,3983892565,4153806404,3822280332,352677332,2297720250,60907813,90501309,3286998549,1016092578,2535922412,2839152426,457141659,509813237,4120667899,652014361,1966332200,2975202805,55981186,2327461051,676427537,3255491064,2882294119,3433927263,1307055953,942726286,933058658,2468411793,3933900994,4215176142,1361170020,2001714738,2830558078,3274259782,1222529897,1679025792,2729314320,3714953764,1770335741,151462246,3013232138,1682292957,1483529935,471910574,1539241949,458788160,3436315007,1807016891,3718408830,978976581,1043663428,3165965781,1927990952,4200891579,2372276910,3208408903,3533431907,1412390302,2931980059,4132332400,1947078029,3881505623,4168226417,2941484381,1077988104,1320477388,886195818,18198404,3786409e3,2509781533,112762804,3463356488,1866414978,891333506,18488651,661792760,1628790961,3885187036,3141171499,876946877,2693282273,1372485963,791857591,2686433993,3759982718,3167212022,3472953795,2716379847,445679433,3561995674,3504004811,3574258232,54117162,3331405415,2381918588,3769707343,4154350007,1140177722,4074052095,668550556,3214352940,367459370,261225585,2610173221,4209349473,3468074219,3265815641,314222801,3066103646,3808782860,282218597,3406013506,3773591054,379116347,1285071038,846784868,2669647154,3771962079,3550491691,2305946142,453669953,1268987020,3317592352,3279303384,3744833421,2610507566,3859509063,266596637,3847019092,517658769,3462560207,3443424879,370717030,4247526661,2224018117,4143653529,4112773975,2788324899,2477274417,1456262402,2901442914,1517677493,1846949527,2295493580,3734397586,2176403920,1280348187,1908823572,3871786941,846861322,1172426758,3287448474,3383383037,1655181056,3139813346,901632758,1897031941,2986607138,3066810236,3447102507,1393639104,373351379,950779232,625454576,3124240540,4148612726,2007998917,544563296,2244738638,2330496472,2058025392,1291430526,424198748,50039436,29584100,3605783033,2429876329,2791104160,1057563949,3255363231,3075367218,3463963227,1469046755,985887462]];var h={pbox:[],sbox:[]};function d(T,k){let I=k>>24&255,b=k>>16&255,S=k>>8&255,B=k&255,O=T.sbox[0][I]+T.sbox[1][b];return O=O^T.sbox[2][S],O=O+T.sbox[3][B],O}function p(T,k,I){let b=k,S=I,B;for(let O=0;O<c;++O)b=b^T.pbox[O],S=d(T,b)^S,B=b,b=S,S=B;return B=b,b=S,S=B,S=S^T.pbox[c],b=b^T.pbox[c+1],{left:b,right:S}}function m(T,k,I){let b=k,S=I,B;for(let O=c+1;O>1;--O)b=b^T.pbox[O],S=d(T,b)^S,B=b,b=S,S=B;return B=b,b=S,S=B,S=S^T.pbox[1],b=b^T.pbox[0],{left:b,right:S}}function v(T,k,I){for(let y=0;y<4;y++){T.sbox[y]=[];for(let _=0;_<256;_++)T.sbox[y][_]=u[y][_]}let b=0;for(let y=0;y<c+2;y++)T.pbox[y]=l[y]^k[b],b++,b>=I&&(b=0);let S=0,B=0,O=0;for(let y=0;y<c+2;y+=2)O=p(T,S,B),S=O.left,B=O.right,T.pbox[y]=S,T.pbox[y+1]=B;for(let y=0;y<4;y++)for(let _=0;_<256;_+=2)O=p(T,S,B),S=O.left,B=O.right,T.sbox[y][_]=S,T.sbox[y][_+1]=B;return!0}var R=o.Blowfish=i.extend({_doReset:function(){if(this._keyPriorReset!==this._key){var T=this._keyPriorReset=this._key,k=T.words,I=T.sigBytes/4;v(h,k,I)}},encryptBlock:function(T,k){var I=p(h,T[k],T[k+1]);T[k]=I.left,T[k+1]=I.right},decryptBlock:function(T,k){var I=m(h,T[k],T[k+1]);T[k]=I.left,T[k+1]=I.right},blockSize:64/32,keySize:128/32,ivSize:64/32});r.Blowfish=i._createHelper(R)}(),n.Blowfish})}(ha)),ha.exports}var hS=Do.exports,Jd;function fS(){return Jd||(Jd=1,function(t,e){(function(n,r,s){t.exports=r(ke(),pc(),cR(),uR(),Mr(),dR(),Ur(),hx(),h0(),xR(),fx(),ER(),wR(),IR(),f0(),RR(),ar(),lt(),FR(),BR(),NR(),LR(),UR(),HR(),jR(),WR(),GR(),XR(),JR(),eS(),nS(),sS(),oS(),cS(),uS())})(hS,function(n){return n})}(Do)),Do.exports}fS();new tn;var dS=!1;/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let dx;const gc=t=>dx=t,px=Symbol();function ql(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var ui;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(ui||(ui={}));function pS(){const t=dp(!0),e=t.run(()=>ou({}));let n=[],r=[];const s=iu({install(i){gc(s),s._a=i,i.provide(px,s),i.config.globalProperties.$pinia=s,r.forEach(o=>n.push(o)),r=[]},use(i){return!this._a&&!dS?r.push(i):n.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return s}const gx=()=>{};function Zd(t,e,n,r=gx){t.push(e);const s=()=>{const i=t.indexOf(e);i>-1&&(t.splice(i,1),r())};return!n&&pp()&&Zx(s),s}function Qr(t,...e){t.slice().forEach(n=>{n(...e)})}const gS=t=>t(),ep=Symbol(),sl=Symbol();function jl(t,e){t instanceof Map&&e instanceof Map?e.forEach((n,r)=>t.set(r,n)):t instanceof Set&&e instanceof Set&&e.forEach(t.add,t);for(const n in e){if(!e.hasOwnProperty(n))continue;const r=e[n],s=t[n];ql(s)&&ql(r)&&t.hasOwnProperty(n)&&!Xe(r)&&!Ar(r)?t[n]=jl(s,r):t[n]=r}return t}const mS=Symbol();function _S(t){return!ql(t)||!t.hasOwnProperty(mS)}const{assign:Un}=Object;function xS(t){return!!(Xe(t)&&t.effect)}function vS(t,e,n,r){const{state:s,actions:i,getters:o}=e,c=n.state.value[t];let l;function u(){c||(n.state.value[t]=s?s():{});const h=Av(n.state.value[t]);return Un(h,i,Object.keys(o||{}).reduce((d,p)=>(d[p]=iu(Lt(()=>{gc(n);const m=n._s.get(t);return o[p].call(m,m)})),d),{}))}return l=mx(t,u,e,n,r,!0),l}function mx(t,e,n={},r,s,i){let o;const c=Un({actions:{}},n),l={deep:!0};let u,h,d=[],p=[],m;const v=r.state.value[t];!i&&!v&&(r.state.value[t]={}),ou({});let R;function T(_){let E;u=h=!1,typeof _=="function"?(_(r.state.value[t]),E={type:ui.patchFunction,storeId:t,events:m}):(jl(r.state.value[t],_),E={type:ui.patchObject,payload:_,storeId:t,events:m});const x=R=Symbol();au().then(()=>{R===x&&(u=!0)}),h=!0,Qr(d,E,r.state.value[t])}const k=i?function(){const{state:E}=n,x=E?E():{};this.$patch(w=>{Un(w,x)})}:gx;function I(){o.stop(),d=[],p=[],r._s.delete(t)}const b=(_,E="")=>{if(ep in _)return _[sl]=E,_;const x=function(){gc(r);const w=Array.from(arguments),D=[],A=[];function re(se){D.push(se)}function le(se){A.push(se)}Qr(p,{args:w,name:x[sl],store:B,after:re,onError:le});let ae;try{ae=_.apply(this&&this.$id===t?this:B,w)}catch(se){throw Qr(A,se),se}return ae instanceof Promise?ae.then(se=>(Qr(D,se),se)).catch(se=>(Qr(A,se),Promise.reject(se))):(Qr(D,ae),ae)};return x[ep]=!0,x[sl]=E,x},S={_p:r,$id:t,$onAction:Zd.bind(null,p),$patch:T,$reset:k,$subscribe(_,E={}){const x=Zd(d,_,E.detached,()=>w()),w=o.run(()=>ei(()=>r.state.value[t],D=>{(E.flush==="sync"?h:u)&&_({storeId:t,type:ui.direct,events:m},D)},Un({},l,E)));return x},$dispose:I},B=Di(S);r._s.set(t,B);const y=(r._a&&r._a.runWithContext||gS)(()=>r._e.run(()=>(o=dp()).run(()=>e({action:b}))));for(const _ in y){const E=y[_];if(Xe(E)&&!xS(E)||Ar(E))i||(v&&_S(E)&&(Xe(E)?E.value=v[_]:jl(E,v[_])),r.state.value[t][_]=E);else if(typeof E=="function"){const x=b(E,_);y[_]=x,c.actions[_]=E}}return Un(B,y),Un(Ne(B),y),Object.defineProperty(B,"$state",{get:()=>r.state.value[t],set:_=>{T(E=>{Un(E,_)})}}),r._p.forEach(_=>{Un(B,o.run(()=>_({store:B,app:r._a,pinia:r,options:c})))}),v&&i&&n.hydrate&&n.hydrate(B.$state,v),u=!0,h=!0,B}/*! #__NO_SIDE_EFFECTS__ */function yS(t,e,n){let r,s;const i=typeof e=="function";r=t,s=i?n:e;function o(c,l){const u=iy();return c=c||(u?rn(px,null):null),c&&gc(c),c=dx,c._s.has(r)||(i?mx(r,e,s,c):vS(r,s,c)),c._s.get(r)}return o.$id=r,o}const ES=yS("userStore",{state:()=>({user:null,records:[],SelectItem:null,isLoggedIn:!1}),actions:{async getDataList(){if(!this.user)return;const t=this.user.email;console.log("Gメール",t);const e=await apiService.getDataList(t);console.log("レスポンスデータ",e),this.records=e.data},async setUser(t){this.user=t,this.user?(this.isLoggedIn=!0,await this.getDataList()):this.isLoggedIn=!1,console.log("ユーザーデータ",this.user)},clearUser(){this.user=null,this.isLoggedIn=!1,this.SelectItem=null,this.records=[],localStorage.removeItem("user-data")},setSelectItem(t){this.SelectItem=t}},persist:{enabled:!0,strategies:[{key:"user-data",storage:localStorage,paths:["user"]}]}}),il=dc.auth,AS=new tn,wS={methods:{async GoogleLogin(){try{this.isLoading=!0,await lT(il,AS)}catch(t){console.error("Googleログインエラー: ",t),this.errorMessage="Googleログインに失敗しました。",this.isLoading=!1}},async handleRedirectResult(){try{const t=await hT(il);if(t){const e=t.user;console.log("Googleログイン成功: ",e.email);const n={id:e.uid,name:e.displayName||"匿名ユーザー",email:e.email||"メールアドレス不明",image:e.photoURL||"/default-avatar.png"};this.userStore.setUser(n)}}catch(t){console.error("リダイレクト結果エラー: ",t)}finally{this.isLoading=!1}},async handleLogout(){try{await cm(il),this.userStore.clearUser(),console.log("ログアウト成功")}catch(t){console.error("ログアウトエラー: ",t)}}},data(){return{isLoading:!1,errorMessage:"",userStore:ES()}},mounted(){this.handleRedirectResult()}},TS={key:0,style:{height:"150px","background-color":"pink","text-align":"center",overflow:"hidden"}},IS={key:1,class:"user-info flex items-center justify-center",style:{height:"150px","background-color":"lightgreen","text-align":"center"}},CS=["src"],bS={class:"truncate"};function RS(t,e,n,r,s,i){return Kt(),bn("body",null,[we("main",null,[s.userStore.isLoggedIn?(Kt(),bn("div",IS,[we("img",{src:s.userStore.user.image,alt:"Profile Picture",class:"profile-img image-responsive",title:"Click to logout",onClick:e[1]||(e[1]=(...o)=>i.handleLogout&&i.handleLogout(...o))},null,8,CS),we("p",bS,[e[4]||(e[4]=vo(" 氏名: ")),we("strong",null,yr(s.userStore.user.name),1),e[5]||(e[5]=we("br",null,null,-1)),vo(" Email: "+yr(s.userStore.user.email),1)])])):(Kt(),bn("div",TS,[e[3]||(e[3]=we("h1",{class:"truncate"},"Google Login",-1)),we("button",{class:"google-login-btn flex items-center justify-center truncate",onClick:e[0]||(e[0]=(...o)=>i.GoogleLogin&&i.GoogleLogin(...o))},e[2]||(e[2]=[we("img",{src:"https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg",alt:"Google Icon",class:"google-icon image-responsive"},null,-1),vo(" Login with Google ")]))]))])])}const SS=Fr(wS,[["render",RS],["__scopeId","data-v-df38a32c"]]),DS=dc.auth,tp=dc.db,PS={components:{HeaderComponent:lx,FooterComponent:ux,LoadingAnimationComponent:Z4},data(){return{errorMessage:"",isLoading:!1,food:"",uid:"",inputFood:"",timestamp:""}},methods:{async getFavoriteFood(){this.food="";try{const t=pd(tp,"userData",this.uid),e=await S4(t);if(!e.exists()){this.food="データ未登録",this.timeStamp="";return}this.food=e.get("food"),this.timestamp="更新日時: "+e.get("timestamp").toDate().toLocaleString()}catch(t){this.food="データ取得に失敗しました",console.log(t)}},async registerFood(){if(this.isLoading)return;const t=this.inputFood.trim();if(t===""){this.errorMessage="好きな食べ物が入力されていません";return}if(this.errorMessage="",!confirm("好きな食べ物を登録しますか？"))return;this.isLoading=!0;const n=pd(tp,"userData",this.uid);try{await P4(n,{food:t,timestamp:B4()},{merge:!0})}catch(r){console.log(r),alert("エラーが発生しました")}this.getFavoriteFood(),this.isLoading=!1}},mounted(){Iu(DS,t=>{t?(this.uid=t.uid,this.getFavoriteFood()):this.uid=""})}},FS={class:"all_container"},kS={class:"row_container"},BS={class:"container_right"},OS={class:"row_container"},NS={class:"container_right"},VS={class:"row_container"},LS={class:"container_right"},MS={class:"red"},US={key:0,class:"loading_animation"};function $S(t,e,n,r,s,i){const o=cs("HeaderComponent"),c=cs("LoadingAnimationComponent"),l=cs("FooterComponent");return Kt(),bn("body",null,[ct(o),we("main",null,[we("div",FS,[we("div",kS,[e[2]||(e[2]=we("div",{class:"container_left"},[we("p",null,"好きな食べ物")],-1)),we("div",BS,[we("p",null,yr(s.food)+" ",1),we("p",null,yr(s.timestamp)+" ",1)])]),we("div",OS,[e[3]||(e[3]=we("div",{class:"container_left"},null,-1)),we("div",NS,[kv(we("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=u=>s.inputFood=u)},null,512),[[a1,s.inputFood]])])]),we("div",VS,[e[4]||(e[4]=we("div",{class:"container_left"},null,-1)),we("div",LS,[we("button",{class:"btn_standard",onClick:e[1]||(e[1]=(...u)=>i.registerFood&&i.registerFood(...u))},"好きな食べ物を登録"),we("p",MS,yr(s.errorMessage)+" ",1),this.isLoading?(Kt(),bn("div",US,[ct(c)])):Sy("",!0)])])])]),ct(l)])}const HS=Fr(PS,[["render",$S],["__scopeId","data-v-6e3cbb62"]]),qS=[{path:"/",name:"home",component:Q4,meta:{title:"Home",requiresAuth:!0}},{path:"/redirectLogin",name:"redirectLogin",component:SS,meta:{title:"RedirectLogin",requiresAuth:!1}},{path:"/food",name:"food",component:HS,meta:{title:"Food",requiresAuth:!0}}],d0=_E({history:W1(),routes:qS});d0.afterEach(t=>{document.title=t.meta.title+" | Vue Firebase Example"});d0.beforeEach((t,e,n)=>{const r=wm();if(!t.matched.some(s=>s.meta.requiresAuth))n();else if(r.currentUser){n();return}else Iu(r,s=>{s?n():n({name:"redirectLogin"})})});const jS=/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,zS=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,WS=/^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;function KS(t,e){if(t==="__proto__"||t==="constructor"&&e&&typeof e=="object"&&"prototype"in e){GS(t);return}return e}function GS(t){console.warn(`[destr] Dropping "${t}" key to prevent prototype pollution.`)}function QS(t,e={}){if(typeof t!="string")return t;const n=t.trim();if(t[0]==='"'&&t.endsWith('"')&&!t.includes("\\"))return n.slice(1,-1);if(n.length<=9){const r=n.toLowerCase();if(r==="true")return!0;if(r==="false")return!1;if(r==="undefined")return;if(r==="null")return null;if(r==="nan")return Number.NaN;if(r==="infinity")return Number.POSITIVE_INFINITY;if(r==="-infinity")return Number.NEGATIVE_INFINITY}if(!WS.test(t)){if(e.strict)throw new SyntaxError("[destr] Invalid JSON");return t}try{if(jS.test(t)||zS.test(t)){if(e.strict)throw new Error("[destr] Possible prototype pollution");return JSON.parse(t,KS)}return JSON.parse(t)}catch(r){if(e.strict)throw r;return t}}function XS(t,e){if(t==null)return;let n=t;for(let r=0;r<e.length;r++){if(n==null||n[e[r]]==null)return;n=n[e[r]]}return n}function p0(t,e,n){if(n.length===0)return e;const r=n[0];return n.length>1&&(e=p0(typeof t!="object"||t===null||!Object.prototype.hasOwnProperty.call(t,r)?Number.isInteger(Number(n[1]))?[]:{}:t[r],e,Array.prototype.slice.call(n,1))),Number.isInteger(Number(r))&&Array.isArray(t)?t.slice()[r]:Object.assign({},t,{[r]:e})}function _x(t,e){if(t==null||e.length===0)return t;if(e.length===1){if(t==null)return t;if(Number.isInteger(e[0])&&Array.isArray(t))return Array.prototype.slice.call(t,0).splice(e[0],1);const n={};for(const r in t)n[r]=t[r];return delete n[e[0]],n}if(t[e[0]]==null){if(Number.isInteger(e[0])&&Array.isArray(t))return Array.prototype.concat.call([],t);const n={};for(const r in t)n[r]=t[r];return n}return p0(t,_x(t[e[0]],Array.prototype.slice.call(e,1)),[e[0]])}function xx(t,e){return e.map(n=>n.split(".")).map(n=>[n,XS(t,n)]).filter(n=>n[1]!==void 0).reduce((n,r)=>p0(n,r[1],r[0]),{})}function vx(t,e){return e.map(n=>n.split(".")).reduce((n,r)=>_x(n,r),t)}function np(t,{storage:e,serializer:n,key:r,debug:s,pick:i,omit:o,beforeHydrate:c,afterHydrate:l},u,h=!0){try{h&&(c==null||c(u));const d=e.getItem(r);if(d){const p=n.deserialize(d),m=i?xx(p,i):p,v=o?vx(m,o):m;t.$patch(v)}h&&(l==null||l(u))}catch(d){s&&console.error("[pinia-plugin-persistedstate]",d)}}function rp(t,{storage:e,serializer:n,key:r,debug:s,pick:i,omit:o}){try{const c=i?xx(t,i):t,l=o?vx(c,o):c,u=n.serialize(l);e.setItem(r,u)}catch(c){s&&console.error("[pinia-plugin-persistedstate]",c)}}function YS(t,e,n){const{pinia:r,store:s,options:{persist:i=n}}=t;if(!i)return;if(!(s.$id in r.state.value)){const l=r._s.get(s.$id.replace("__hot:",""));l&&Promise.resolve().then(()=>l.$persist());return}const c=(Array.isArray(i)?i:i===!0?[{}]:[i]).map(e);s.$hydrate=({runHooks:l=!0}={})=>{c.forEach(u=>{np(s,u,t,l)})},s.$persist=()=>{c.forEach(l=>{rp(s.$state,l)})},c.forEach(l=>{np(s,l,t),s.$subscribe((u,h)=>rp(h,l),{detached:!0})})}function JS(t={}){return function(e){YS(e,n=>({key:(t.key?t.key:r=>r)(n.key??e.store.$id),debug:n.debug??t.debug??!1,serializer:n.serializer??t.serializer??{serialize:r=>JSON.stringify(r),deserialize:r=>QS(r)},storage:n.storage??t.storage??window.localStorage,beforeHydrate:n.beforeHydrate,afterHydrate:n.afterHydrate,pick:n.pick,omit:n.omit}),t.auto??!1)}}var ZS=JS();const g0=u1(g1),yx=pS();yx.use(ZS);g0.use(yx);g0.use(d0);g0.mount("#app");
