"use strict";Element.prototype.imagesLoaded=function(t){var e=this.querySelectorAll("img"),n=e.length;0==n&&t();for(var i=0,r=e.length;i<r;i++){var o=new Image;o.onload=o.onerror=function(e){n--,0==n&&t()},o.src=e[i].getAttribute("src")}},Element.prototype.gridify=function(t){var e=this,t=t||{},n=function(t){for(var e=0,n=1,i=t.length;n<i;n++)t[n]<t[e]&&(e=n);return e},i=function(t){for(var e=0,n=0,i=t.length;n<i;n++)t[n]>e&&(e=t[n]);return e},r=function(t,e,n){t.attachEvent?t.attachEvent("on"+e,n):t.addEventListener&&t.addEventListener(e,n)},o=function(t,e,n){t.detachEvent?t.detachEvent("on"+e,n):t.removeEventListener&&t.removeEventListener(e,a)},a=function(){e.style.position="relative";var r=e.querySelectorAll(t.srcNode),o=(t.transition||"all 0.5s ease")+", height 0, width 0",a=e.clientWidth,s=parseInt(t.margin||0),h=parseInt(t.max_width||t.width||220),l=Math.max(Math.floor(a/(h+s)),1),d=1==l?s/2:a%(h+s)/2,c=[];t.max_width&&(l=Math.ceil(a/(h+s)),h=(a-l*s-s)/l,d=s/2);for(var v=0;v<l;v++)c.push(0);for(var v=0,u=r.length;v<u;v++){var f=n(c);r[v].setAttribute("style","width: "+h+"px; position: absolute; margin: "+s/2+"px; top: "+(c[f]+s/2)+"px; left: "+((h+s)*f+d)+"px; transition: "+o),c[f]+=r[v].clientHeight+s}e.style.height=i(c)+"px"};this.imagesLoaded(a),t.resizable&&(r(window,"resize",a),r(e,"DOMNodeRemoved",function(){o(window,"resize",a)}))};