window.S=KISSY;KISSY.config({packages:[{name:"mobile",tag:"201112299",path:"http://a.tbcdn.cn/s/kissy/mobile",ignorePackageNameInUri:!0,debug:!0,charset:"utf-8"}]});
(function(){var f=function(){this.init.apply(this,arguments)};f.prototype={init:function(a){var b=this;b.platform=b.getRequestParam(window.location.search,"client_type")||"pc";b.client_nav=b.getRequestParam(window.location.search,"client_nav")||"true";b.client_type=b.platform;b.bridgeName=a||"Android_Bridge";b.bridge=window[b.bridgeName];"ios"===b.platform&&S.ready(function(){b.buildProxy()})},buildProxy:function(){var a=document.querySelector("#J_MClientProxy");a||(a=S.one('<iframe id="J_MClientProxy" class="hidden" style="width:0;height:0;opacity:0;display:none;" src="native://"></iframe>'),
S.one("body").append(a),this.mClientProxy=a)},pushBack:function(a,b){var c="native://"+a+"?data=",d;if("pc"===this.platform)this.bridge=this.bridge||window[this.bridgeName],this.bridge[a].call(this,b);else{for(var e in b)b.hasOwnProperty(e)&&"function"===typeof b[e]&&(d="M_Client_Callbacks_"+a+"_"+(new Date).getTime()+"_"+parseInt(1E6*Math.random()),window[d]=function(a,b){return function(){a.apply(this,arguments);delete window[b]}}(b[e],d),b[e]=d);"android"===this.platform?this.bridge&&this.bridge[a]&&
this.bridge[a](JSON.stringify(b)):(c+=encodeURIComponent(JSON.stringify(b)),this.mClientProxy.attr("src",c))}},getRequestParam:function(a,b){var c=a.match(RegExp("[?&]"+b+"=([^&]*)(&?)","i"));return c?c[1]:c},open:function(a,b,c){a=this.wrapUrl(a);"pc"==this.platform?(S.param(b),window.location.href=0>a.indexOf("http://")?(new S.Uri(App.get("basepath")+a)).setFragment(S.param(b)):(new S.Uri(a)).setFragment(S.param(b))):("function"==typeof b&&(c=b,b={}),"undefined"==typeof c&&(c=new Function),this.pushBack("open",
{url:a,param:b,callback:c}))},back:function(a){"pc"==this.platform?window.history.back():("undefined"==typeof a&&(a=new Function),this.pushBack("back",{callback:a}))},set_browser_title:function(a){if("pc"==this.platform){try{document.getElementsByTagName("title")[0].innerHTML=a}catch(b){}this.nav_exist()&&S.one(".J-top-nav").one("span").html(a)}else this.pushBack("set_browser_title",{title:a})},set_title:function(){this.set_browser_title.apply(this,arguments)},set_back:function(a){"undefined"==typeof a&&
(a=!0);"pc"==this.platform?this.nav_exist()&&(a=!1===a?"hidden":"visible",S.one(".J-top-nav").one(".u-back").css({visibility:a})):this.pushBack("set_back",{flag:a})},set_icon:function(a,b){"undefined"==typeof b&&(b=new Function);if("pc"==this.platform){if(this.nav_exist()){var c=S.Node('<a href="javascript:void(0);"><img src="'+a+'" /></a>');S.one(".J-top-nav").one(".u-icon").empty().append(c).css({visibility:"visible"});c.on(S.UA.mobile?"tap":"click",b)}}else this.pushBack("set_icon",{img:a,callback:b})},
nav_exist:function(){return!!S.one(".J-top-nav")},tapDelegate:function(){var a=this;S.Event.delegate(document,S.UA.mobile?"tap":"click","a",function(b){var c=S.one(b.currentTarget);!S.isUndefined(c.attr("target"))&&""!==c.attr("target")||/^javascript:/i.test(c.attr("href"))?"top"==c.attr("target")&&(window.location.href=c.attr("href"),b.preventDefault()):(c=c.attr("href"),a.open(a.wrapUrl(c)),b.preventDefault())})},wrapUrl:function(a){var b=S.unparam((new S.Uri(a)).getQuery().toString()),c=(new S.Uri(a)).getQuery().get("client_type"),
d=(new S.Uri(a)).getQuery().get("client_nav");S.mix(b,{client_type:S.isUndefined(c)?this.client_type:c,client_nav:S.isUndefined(d)?this.client_nav:d});return a=(new S.Uri(a)).setQuery(S.param(b)).toString()}};this.Host=new f("Android_Bridge");this.App={};KISSY.use("mobile/app/1.2/",function(a,b){App=b({basepath:/\/$/.test(window.location.href)?window.location.href:window.location.href.replace(/\/[^\/]+$/,""),tapTrigger:".not-available"});a.ready(function(){Host.tapDelegate()})})}).call(this);