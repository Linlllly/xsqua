(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index2/index2"],{0:function(e,t,n){"use strict";(function(e){n(5);var t=u(n(6)),r=u(n(4)),o=u(n(21)),i=u(n(15));function u(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}wx.__webpack_require_UNI_MP_PLUGIN__=n,r.default.use(o.default),r.default.prototype.$store=i.default,r.default.config.productionTip=!1,t.default.mpType="app";var l=new r.default(c({store:i.default},t.default));e(l).$mount()}).call(this,n(1)["createApp"])},18:function(e,t,n){"use strict";n.r(t);var r=n(19),o=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=o.a},19:function(e,t,n){},238:function(e,t,n){"use strict";(function(e){n(5);r(n(4));var t=r(n(239));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n(1)["createPage"])},239:function(e,t,n){"use strict";n.r(t);var r=n(240),o=n(242);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);n(244);var u,a=n(20),c=Object(a["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,"214b4c74",null,!1,r["components"],u);c.options.__file="pages/index2/index2.vue",t["default"]=c.exports},240:function(e,t,n){"use strict";n.r(t);var r=n(241);n.d(t,"render",(function(){return r["render"]})),n.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(t,"components",(function(){return r["components"]}))},241:function(e,t,n){"use strict";var r;n.r(t),n.d(t,"render",(function(){return o})),n.d(t,"staticRenderFns",(function(){return u})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return r}));try{r={uSwiper:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-swiper/u-swiper")]).then(n.bind(null,417))},uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,425))},uLoadingIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-loading-icon/u-loading-icon")]).then(n.bind(null,434))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,t=e.$createElement,r=(e._self._c,0!==e.meetingList.length?n(155):null),o=0!==e.meetingList.length?n(156):null,i=0!==e.meetingList.length?n(157):null,u=0!==e.meetingList.length?n(158):null;e.$mp.data=Object.assign({},{$root:{m0:r,m1:o,m2:i,m3:u}})},i=!1,u=[];o._withStripped=!0},242:function(e,t,n){"use strict";n.r(t);var r=n(243),o=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=o.a},243:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(10)),o=n(161),i=n(16),u=n(162);function a(e){return e&&e.__esModule?e:{default:e}}function c(e){return d(e)||f(e)||l(e)||s()}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(e,t){if(e){if("string"===typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}function f(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function d(e){if(Array.isArray(e))return p(e)}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function g(e,t,n,r,o,i,u){try{var a=e[i](u),c=a.value}catch(s){return void n(s)}a.done?t(c):Promise.resolve(c).then(r,o)}function m(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function u(e){g(i,r,o,u,a,"next",e)}function a(e){g(i,r,o,u,a,"throw",e)}u(void 0)}))}}function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var w={computed:v({},(0,i.mapState)(["uid","house"])),data:function(){return{areaList:[],limit:12,lastPage:"",meetingList:[],linsMeeting:[],isloading:!1,refresh:!0,fillerIdList:[],list1:["https://www.zairongyifang.com:8080/filePath/20236/3fa0628eb7.png"]}},onLoad:function(){this.getBanner()},onShow:function(){this.refresh&&(this.meetingList=[],this.getTakeLook()),this.refresh=!0},onReachBottom:function(){this.isloading||this.getTakeLook()},methods:v(v({},(0,i.mapMutations)(["updateUid"])),{},{getBanner:function(){var t=this;return m(r.default.mark((function n(){var i;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,o.banner)({type:2});case 2:if(i=n.sent,console.log("请求banner图"),0===i.code){n.next=7;break}return e.showToast({title:"获取banner图失败",icon:"none",duration:2e3}),n.abrupt("return");case 7:console.log(i),t.list1=i.result;case 9:case"end":return n.stop()}}),n)})))()},goCitySelect:function(t){e.navigateTo({url:"../citySelect/citySelect?area="+t+"&lookHouse=true"})},toMeetingRoom:function(){e.navigateTo({url:"../../pages_userActivity/meetingRoom/meetingRoom"})},toAreaSelect:function(){e.navigateTo({url:"../areaSelect/areaSelect?lookHouse="+!0})},toRankingList:function(){e.navigateTo({url:"../../pages_userActivity/rankingList/rankingList"})},getTakeLook:function(t){var n=this;return m(r.default.mark((function i(){var u,a,s,l,f,d;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t&&(n.meetingList=[]),n.isloading=!0,r.next=4,(0,o.takeLook)({limit:n.limit,fillerIdList:n.fillerIdList,meeting:2});case 4:if(u=r.sent,console.log("请求瞧一瞧列表"),console.log(u),0===u.code){r.next=11;break}return e.showToast({title:"获取瞧一瞧列表失败",icon:"none",duration:2e3}),n.isloading=!1,r.abrupt("return");case 11:if(n.linsMeeting=u.result,u.result){r.next=16;break}return n.fillerIdList=[],n.getTakeLook(),r.abrupt("return");case 16:a=0;case 17:if(!(a<n.linsMeeting.length)){r.next=26;break}return n.fillerIdList.push(n.linsMeeting[a].id),r.next=21,n.getCommentList(n.linsMeeting[a].id);case 21:s=r.sent,n.$set(n.linsMeeting[a],"pinglun",s);case 23:a++,r.next=17;break;case 26:for(n.meetingList=[].concat(c(n.meetingList),c(n.linsMeeting)),n.lastPage=u.result.last_page,l=0;l<n.meetingList.length;l++)f=n.meetingList[l].media[0],d=/(\.gif|\.jpeg|\.png|\.jpg|\.bmp)/,n.$set(n.meetingList[l],"img",d.test(f)),n.$set(n.meetingList[l],"more","");n.$nextTick((function(){var t=e.createSelectorQuery().in(n);t.selectAll(".content-title").boundingClientRect(),t.selectAll(".inner").boundingClientRect(),t.exec((function(e){for(var t=0;t<e[0].length;t++){var r=e[0][t].height-e[1][t].height;r>=0?n.$set(n.meetingList[t],"more","2"):n.$set(n.meetingList[t],"more","1")}})),n.isloading=!1}));case 30:case"end":return r.stop()}}),i)})))()},getCommentList:function(e){return m(r.default.mark((function t(){var n;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,u.getComment)({postId:e,page:1,limit:3});case 2:if(n=t.sent,0===n.code){t.next=5;break}return t.abrupt("return");case 5:return t.abrupt("return",n.result.data);case 6:case"end":return t.stop()}}),t)})))()},toArticleDes:function(t){this.refresh=!1,e.navigateTo({url:"../../pages_userActivity/articleDes/articleDes?i="+t.id})},previewImg:function(t,n){this.refresh=!1,e.previewImage({current:t[n],urls:t})},toTop:function(){wx.pageScrollTo({scrollTop:0})},toOtherUser:function(t,n){t.uid===this.uid?e.switchTab({url:"../../pages/user/user"}):1===n?e.navigateTo({url:"../../pages_userActivity/otherUser/otherUser?ocateId="+t.cateId+"&ouid="+t.uid}):e.navigateTo({url:"../../pages_userActivity/otherUser/otherUser?ocateId="+t.cateid+"&ouid="+t.uid})}})};t.default=w}).call(this,n(1)["default"])},244:function(e,t,n){"use strict";n.r(t);var r=n(245),o=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=o.a},245:function(e,t,n){},6:function(e,t,n){"use strict";n.r(t);var r=n(7);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);n(18);var i,u,a,c,s=n(20),l=Object(s["default"])(r["default"],i,u,!1,null,null,null,!1,a,c);l.options.__file="App.vue",t["default"]=l.exports},7:function(e,t,n){"use strict";n.r(t);var r=n(8),o=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=o.a},8:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(9),o={data:function(){return{globalData:{ws:{}}}},onLaunch:function(){},onLoad:function(){},onShow:function(){if(wx.canIUse("getUpdateManager")){var e=wx.getUpdateManager();e.onCheckForUpdate((function(t){t.hasUpdate&&(e.onUpdateReady((function(){wx.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(t){t.confirm&&e.applyUpdate()}})})),e.onUpdateFailed((function(){wx.showModal({title:"已经有新版本了哟~",content:"新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"})})))}))}else wx.showModal({title:"提示",content:"当前微信版本过低，可能无法使用某些功能，请升级到最新微信版本后重试。"});this.lookAllNetwork()},onHide:function(){},onUnload:function(){},methods:{lookAllNetwork:function(){var t=this;e.onNetworkStatusChange((function(n){console.log(n),n.isConnected?(e.showLoading({title:"网络重启中！"}),t.updateWs(),e.hideLoading()):e.showToast({title:"网络断开！",icon:"none",duration:2e3})}))},updateWs:function(){var e=this;this.globalData.ws=null,r.init(),r.on("onOpen",(function(){e.globalData.ws=r.ws}))}}};t.default=o}).call(this,n(1)["default"])}},[[238,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index2/index2.js.map