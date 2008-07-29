// ==UserScript==
// @name          jQuery4gm
// @namespace     http://gomaxfire.dnsdojo.com
// @description   jQuery plugin for Greasemonkey user script
// @include       http://d.hatena.ne.jp/gotin/
// @require       http://jqueryjs.googlecode.com/files/jquery-1.2.6.js
// ==/UserScript==

// とりあえず attr, text, html, addClass, removeClass をなんとかしてみた
// ajaxもなんとかすれば結構便利そう。

(function(){
   jQuery.fn.attr = function(){
     switch(arguments.length){
     case 0:
       return this;
     case 1:
       return this[0] ? this[0].getAttribute(arguments[0]) : null;
     default:
       this[0] && this[0].setAttribute(arguments[0], arguments[1]);
       return this;
     }
   };

   jQuery.fn.addClass = function(className){
     if(!(this[0] && className)) return this;
     if(this[0].className){
       var classes = this[0].className.split(/\s+/);
       if(classes.indexOf(className) < 0){
         this[0].className += " " + className;
       }
     } else {
       this[0].className = className;
     }
     return this;
   };

   jQuery.fn.removeClass = function(className){
     if(!(this[0] && className)) return this;
     if(this[0].className){
       this[0].className =
         this[0].className.replace(new RegExp("(^|\\s+)("+className+")(\\s+|$)","g"),"$1$3")
         .replace(/(^\s+|\s+$)/g,"");
     }
     return this;
   };


   set_attr("text", "textContent");
   set_attr("html", "innerHTML");

   function set_attr(func_name, prop){
     jQuery.fn[func_name] = function(){
       var args = array(arguments);
       args.unshift(prop);
       return attr.apply(this, args);
     };
   }

   function attr(){
     switch(arguments.length){
     case 0:
       return this;
     case 1:
       return this[0] ? this[0][arguments[0]]: null;
     default:
       this[0] && (this[0][arguments[0]] = arguments[1]);
       return this;
     }
   }

   function array(a){
     return Array.prototype.slice.apply(a);
   }

 })(jQuery);

// example of http://d.hatena.ne.jp/gotin/

var x=$("h1 a");
console.log(x.attr("href"));
console.log(x.text());
x.text("むきゃきゃ");
console.log(x.html());
$("h3").each(function(){
               $(this).addClass("synStatement").addClass("hatena-moduletitle").removeClass("title");
             });
