if("document"in self){if(!("classList"in document.createElement("_"))){(function(j){"use strict";if(!("Element"in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return-1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false,q;do{r=t[s]+"";q=g(this,r);while(q!==-1){this.splice(q,1);o=true;q=g(this,r)}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}if(q===true||q===false){return q}else{return!o}};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}})(self)}else{(function(){var b=document.createElement("_");b.classList.add("c1","c2");if(!b.classList.contains("c2")){var c=function(e){var d=DOMTokenList.prototype[e];DOMTokenList.prototype[e]=function(h){var g,f=arguments.length;for(g=0;g<f;g++){h=arguments[g];d.call(this,h)}}};c("add");c("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var a=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(d,e){if(1 in arguments&&!this.contains(d)===!e){return e}else{return a.call(this,d)}}}b=null})()}}function errorMessage(){var element=document.getElementById("main");var message="Hmm looks like there was an error.";element.textContent=message;throw new Error(message)}Date.prototype.foolsDay=false;Date.prototype.relationToSix=function(){if(this.getHours()<18){return"before"}else if(this.getHours()>18||this.getHours()===18&&this.getMinutes()>0){return"after"}else if(this.getHours()===18&&this.getMinutes()===0){return"and currently"}};Date.prototype.monthArray=["January","February","March","April","May","June","July","August","September","October","November","December"];Date.prototype.getMonthName=function(){return this.monthArray[this.getMonth()]};Date.prototype.getName=function(){var day=this.getDate();var ending;if(day===1||day===21||day===31){ending="st"}else if(day===2||day===22){ending="nd"}else if(day===3||day===23){ending="rd"}else{ending="th"}return day+ending};Date.prototype.oddDay=function(){return this.getDate()%2===1};Date.prototype.evenDay=function(){return this.getDate()%2===0};var Parking={onOdd:false,onEven:false};var today=new Date;var yesterday=new Date(today.getTime());yesterday.setDate(today.getDate()-1);if(today.oddDay()&&yesterday.oddDay()){today.foolsDay=true}if(today.oddDay()&&today.getHours()>=18){Parking.onOdd=true}else if(today.oddDay()&&today.getHours()<18){if(today.foolsDay){Parking.onOdd=true}else{Parking.onEven=true}}else if(today.evenDay()&&today.getHours()>=18){Parking.onEven=true}else if(today.evenDay()&&today.getHours()<18){Parking.onOdd=true}else{errorMessage()}var timeFrame=document.getElementById("time-frame");var currentDate=document.getElementById("current-date");var parkingSide=document.getElementById("parking-side");timeFrame.textContent=today.relationToSix();currentDate.textContent=today.getMonthName()+" "+today.getName();if(today.foolsDay){document.body.classList.add("fools-day")}if(Parking.onOdd){document.body.classList.add("odd-side");parkingSide.textContent="odd"}else if(Parking.onEven){document.body.classList.add("even-side");parkingSide.textContent="even"}else{errorMessage()}