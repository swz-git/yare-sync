// ==UserScript==
// @name        yare-sync
// @description Update your yare code from the commandline
// @namespace   https://github.com/swz-gh/yare-sync
// @version     1.0.0
// @author      swz
// @icon        https://yare.io/favicon.ico
// @match       https://yare.io/d*/*
// @run-at      document-start
// @grant       none
// ==/UserScript==
function t(t,o){console.log(`%c${t}`,o)}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function o(t,o,i,e){return new(i||(i=Promise))((function(s,n){function a(t){try{d(e.next(t))}catch(t){n(t)}}function l(t){try{d(e.throw(t))}catch(t){n(t)}}function d(t){var o
t.done?s(t.value):(o=t.value,o instanceof i?o:new i((function(t){t(o)}))).then(a,l)}d((e=e.apply(t,o||[])).next())}))}var i,e,s,n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},a={exports:{}}
e=n,s=function(t){
// Object initialization
var o=function(t){
// Returning a new init object
return new o.lib.init(t)}

;// Set the default global options
// Helper function to get offset.
function i(t,o){return o.offset[t]?isNaN(o.offset[t])?o.offset[t]:o.offset[t]+"px":"0px"}function e(t,o){return!(!t||"string"!=typeof o||!(t.className&&t.className.trim().split(/\s+/gi).indexOf(o)>-1))}
// Setting up the prototype for the init object
// Returning the Toastify function to be assigned to the window object/module
return o.defaults={oldestFirst:!0,text:"Toastify is awesome!",node:void 0,duration:3e3,selector:void 0,callback:function(){},destination:void 0,newWindow:!1,close:!1,gravity:"toastify-top",positionLeft:!1,position:"",backgroundColor:"",avatar:"",className:"",stopOnFocus:!0,onClick:function(){},offset:{x:0,y:0},escapeMarkup:!0,style:{background:""}},
// Defining the prototype of the object
o.lib=o.prototype={toastify:"1.11.0",constructor:o,
// Initializing the object with required parameters
init:function(t){
// Returning the current object for chaining functions
// Verifying and validating the input object
return t||(t={}),
// Creating the options object
this.options={},this.toastElement=null,
// Validating the options
this.options.text=t.text||o.defaults.text,// Display message
this.options.node=t.node||o.defaults.node,// Display content as node
this.options.duration=0===t.duration?0:t.duration||o.defaults.duration,// Display duration
this.options.selector=t.selector||o.defaults.selector,// Parent selector
this.options.callback=t.callback||o.defaults.callback,// Callback after display
this.options.destination=t.destination||o.defaults.destination,// On-click destination
this.options.newWindow=t.newWindow||o.defaults.newWindow,// Open destination in new window
this.options.close=t.close||o.defaults.close,// Show toast close icon
this.options.gravity="bottom"===t.gravity?"toastify-bottom":o.defaults.gravity,// toast position - top or bottom
this.options.positionLeft=t.positionLeft||o.defaults.positionLeft,// toast position - left or right
this.options.position=t.position||o.defaults.position,// toast position - left or right
this.options.backgroundColor=t.backgroundColor||o.defaults.backgroundColor,// toast background color
this.options.avatar=t.avatar||o.defaults.avatar,// img element src - url or a path
this.options.className=t.className||o.defaults.className,// additional class names for the toast
this.options.stopOnFocus=void 0===t.stopOnFocus?o.defaults.stopOnFocus:t.stopOnFocus,// stop timeout on focus
this.options.onClick=t.onClick||o.defaults.onClick,// Callback after click
this.options.offset=t.offset||o.defaults.offset,// toast offset
this.options.escapeMarkup=void 0!==t.escapeMarkup?t.escapeMarkup:o.defaults.escapeMarkup,this.options.style=t.style||o.defaults.style,this.options.style.background=o.defaults.backgroundColor||t.backgroundColor,this},
// Building the DOM element
buildToast:function(){
// Validating if the options are defined
if(!this.options)throw"Toastify is not initialized"

;// Creating the DOM object
var t=document.createElement("div")
t.className="toastify on "+this.options.className,
// Positioning toast to left or right or center
this.options.position?t.className+=" toastify-"+this.options.position:
// To be depreciated in further versions
!0===this.options.positionLeft?(t.className+=" toastify-left",console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.")):
// Default position
t.className+=" toastify-right",
// Assigning gravity of element
t.className+=" "+this.options.gravity,this.options.backgroundColor&&
// This is being deprecated in favor of using the style HTML DOM property
console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.')

;// Loop through our style object and apply styles to divElement
for(const o in this.options.style)t.style[o]=this.options.style[o]

;// Adding the toast message/node
if(this.options.node&&this.options.node.nodeType===Node.ELEMENT_NODE)
// If we have a valid node, we insert it
t.appendChild(this.options.node)
else if(this.options.escapeMarkup?t.innerText=this.options.text:t.innerHTML=this.options.text,""!==this.options.avatar){var o=document.createElement("img")
o.src=this.options.avatar,o.className="toastify-avatar","left"==this.options.position||!0===this.options.positionLeft?
// Adding close icon on the left of content
t.appendChild(o):
// Adding close icon on the right of content
t.insertAdjacentElement("afterbegin",o)}
// Adding a close icon to the toast
if(!0===this.options.close){
// Create a span for close element
var e=document.createElement("span")
e.innerHTML="&#10006;",e.className="toast-close",
// Triggering the removal of toast from DOM on close click
e.addEventListener("click",function(t){t.stopPropagation(),this.removeElement(this.toastElement),window.clearTimeout(this.toastElement.timeOutValue)}.bind(this))

;//Calculating screen width
var s=window.innerWidth>0?window.innerWidth:screen.width

;// Adding the close icon to the toast element
// Display on the right if screen width is less than or equal to 360px
("left"==this.options.position||!0===this.options.positionLeft)&&s>360?
// Adding close icon on the left of content
t.insertAdjacentElement("afterbegin",e):
// Adding close icon on the right of content
t.appendChild(e)}
// Clear timeout while toast is focused
if(this.options.stopOnFocus&&this.options.duration>0){var n=this

;// stop countdown
t.addEventListener("mouseover",(function(o){window.clearTimeout(t.timeOutValue)})),
// add back the timeout
t.addEventListener("mouseleave",(function(){t.timeOutValue=window.setTimeout((function(){
// Remove the toast from DOM
n.removeElement(t)}),n.options.duration)}))}
// Adding an on-click destination path
// Adding offset
if(void 0!==this.options.destination&&t.addEventListener("click",function(t){t.stopPropagation(),!0===this.options.newWindow?window.open(this.options.destination,"_blank"):window.location=this.options.destination}.bind(this)),"function"==typeof this.options.onClick&&void 0===this.options.destination&&t.addEventListener("click",function(t){t.stopPropagation(),this.options.onClick()}.bind(this)),"object"==typeof this.options.offset){var a=i("x",this.options),l=i("y",this.options),d="left"==this.options.position?a:"-"+a,c="toastify-top"==this.options.gravity?l:"-"+l
t.style.transform="translate("+d+","+c+")"}
// Returning the generated element
return t},
// Displaying the toast
showToast:function(){
// Getting the root element to with the toast needs to be added
var t

;// Validating if root element is present in DOM
if(
// Creating the DOM object for the toast
this.toastElement=this.buildToast(),!(t="string"==typeof this.options.selector?document.getElementById(this.options.selector):this.options.selector instanceof HTMLElement||this.options.selector instanceof ShadowRoot?this.options.selector:document.body))throw"Root element is not defined"

;// Adding the DOM element
var i=o.defaults.oldestFirst?t.firstChild:t.lastChild

;// Supporting function chaining
return t.insertBefore(this.toastElement,i),
// Repositioning the toasts in case multiple toasts are present
o.reposition(),this.options.duration>0&&(this.toastElement.timeOutValue=window.setTimeout(function(){
// Remove the toast from DOM
this.removeElement(this.toastElement)}.bind(this),this.options.duration)),this},hideToast:function(){this.toastElement.timeOutValue&&clearTimeout(this.toastElement.timeOutValue),this.removeElement(this.toastElement)},
// Removing the element from the DOM
removeElement:function(t){
// Hiding the element
// toastElement.classList.remove("on");
t.className=t.className.replace(" on",""),
// Removing the element from DOM after transition end
window.setTimeout(function(){
// remove options node if any
this.options.node&&this.options.node.parentNode&&this.options.node.parentNode.removeChild(this.options.node),
// Remove the element from the DOM, only when the parent node was not removed before.
t.parentNode&&t.parentNode.removeChild(t),
// Calling the callback function
this.options.callback.call(t),
// Repositioning the toasts again
o.reposition()}.bind(this),400)}},
// Positioning the toasts on the DOM
o.reposition=function(){
// Modifying the position of each toast element
for(
// Top margins with gravity
var t,o={top:15,bottom:15},i={top:15,bottom:15},s={top:15,bottom:15},n=document.getElementsByClassName("toastify"),a=0;a<n.length;a++){
// Getting the applied gravity
t=!0===e(n[a],"toastify-top")?"toastify-top":"toastify-bottom"
var l=n[a].offsetHeight
t=t.substr(9,t.length-1),
// Show toast in center if screen with less than or equal to 360px
(window.innerWidth>0?window.innerWidth:screen.width)<=360?(
// Setting the position
n[a].style[t]=s[t]+"px",s[t]+=l+15):!0===e(n[a],"toastify-left")?(
// Setting the position
n[a].style[t]=o[t]+"px",o[t]+=l+15):(
// Setting the position
n[a].style[t]=i[t]+"px",i[t]+=l+15)}
// Supporting function chaining
return this},o.lib.init.prototype=o.lib,o},(
/*!
 * Toastify js 1.11.0
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */
i=a).exports?i.exports=s():e.Toastify=s()
var l=a.exports
function d(){setInterval((()=>{(function(t,i){return o(this,void 0,void 0,(function*(){const{timeout:o=8e3}=i,e=new AbortController,s=setTimeout((()=>e.abort()),o),n=yield fetch(t,Object.assign(Object.assign({},i),{signal:e.signal}))
return clearTimeout(s),n}))})("http://localhost:8047/getcode",{timeout:500}).then((t=>o(this,void 0,void 0,(function*(){return yield t.text()})))).then((t=>{
// @ts-ignore
window.editor.setValue(t),
// @ts-ignore
window.update_code(),l({text:"Updated your code!",backgroundColor:"linear-gradient(90deg, rgba(49,194,0,1) 0%, rgba(48,255,0,1) 100%)"}).showToast()})).catch((t=>{}))}),2e3)}function c(){return o(this,void 0,void 0,(function*(){t("Document loaded, starting yare-sync...","color:orange"),l({text:"Loaded yare-sync"}).showToast(),document.head.innerHTML+='<link rel="stylesheet" type="text/css" href="data:text/css;base64,LyohCiAqIFRvYXN0aWZ5IGpzIDEuMTEuMAogKiBodHRwczovL2dpdGh1Yi5jb20vYXB2YXJ1bi90b2FzdGlmeS1qcwogKiBAbGljZW5zZSBNSVQgbGljZW5zZWQKICoKICogQ29weXJpZ2h0IChDKSAyMDE4IFZhcnVuIEEgUAogKi8KCi50b2FzdGlmeSB7CiAgICBwYWRkaW5nOiAxMnB4IDIwcHg7CiAgICBjb2xvcjogI2ZmZmZmZjsKICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsKICAgIGJveC1zaGFkb3c6IDAgM3B4IDZweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4xMiksIDAgMTBweCAzNnB4IC00cHggcmdiYSg3NywgOTYsIDIzMiwgMC4zKTsKICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KDMxNWRlZywgIzczYTVmZiwgIzU0NzdmNSk7CiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNzNhNWZmLCAjNTQ3N2Y1KTsKICAgIHBvc2l0aW9uOiBmaXhlZDsKICAgIG9wYWNpdHk6IDA7CiAgICB0cmFuc2l0aW9uOiBhbGwgMC40cyBjdWJpYy1iZXppZXIoMC4yMTUsIDAuNjEsIDAuMzU1LCAxKTsKICAgIGJvcmRlci1yYWRpdXM6IDJweDsKICAgIGN1cnNvcjogcG9pbnRlcjsKICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsKICAgIG1heC13aWR0aDogY2FsYyg1MCUgLSAyMHB4KTsKICAgIHotaW5kZXg6IDIxNDc0ODM2NDc7Cn0KCi50b2FzdGlmeS5vbiB7CiAgICBvcGFjaXR5OiAxOwp9CgoudG9hc3QtY2xvc2UgewogICAgb3BhY2l0eTogMC40OwogICAgcGFkZGluZzogMCA1cHg7Cn0KCi50b2FzdGlmeS1yaWdodCB7CiAgICByaWdodDogMTVweDsKfQoKLnRvYXN0aWZ5LWxlZnQgewogICAgbGVmdDogMTVweDsKfQoKLnRvYXN0aWZ5LXRvcCB7CiAgICB0b3A6IC0xNTBweDsKfQoKLnRvYXN0aWZ5LWJvdHRvbSB7CiAgICBib3R0b206IC0xNTBweDsKfQoKLnRvYXN0aWZ5LXJvdW5kZWQgewogICAgYm9yZGVyLXJhZGl1czogMjVweDsKfQoKLnRvYXN0aWZ5LWF2YXRhciB7CiAgICB3aWR0aDogMS41ZW07CiAgICBoZWlnaHQ6IDEuNWVtOwogICAgbWFyZ2luOiAtN3B4IDVweDsKICAgIGJvcmRlci1yYWRpdXM6IDJweDsKfQoKLnRvYXN0aWZ5LWNlbnRlciB7CiAgICBtYXJnaW4tbGVmdDogYXV0bzsKICAgIG1hcmdpbi1yaWdodDogYXV0bzsKICAgIGxlZnQ6IDA7CiAgICByaWdodDogMDsKICAgIG1heC13aWR0aDogZml0LWNvbnRlbnQ7CiAgICBtYXgtd2lkdGg6IC1tb3otZml0LWNvbnRlbnQ7Cn0KCkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzYwcHgpIHsKICAgIC50b2FzdGlmeS1yaWdodCwgLnRvYXN0aWZ5LWxlZnQgewogICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvOwogICAgICAgIG1hcmdpbi1yaWdodDogYXV0bzsKICAgICAgICBsZWZ0OiAwOwogICAgICAgIHJpZ2h0OiAwOwogICAgICAgIG1heC13aWR0aDogZml0LWNvbnRlbnQ7CiAgICB9Cn0K"></link>',d()}))}t("Loaded yare-sync","color:orange"),
//@ts-ignore
globalThis.loadcheckinterval=setInterval((()=>{
// @ts-ignore
// console.log(globalThis.update_code, globalThis.editor);
// // @ts-ignore
// globalThis.update_code != undefined &&
// // @ts-ignore
// globalThis.editor != undefined &&
"complete"===document.readyState&&(
//@ts-ignore
clearInterval(globalThis.loadcheckinterval),c.bind(globalThis)())}),50)
