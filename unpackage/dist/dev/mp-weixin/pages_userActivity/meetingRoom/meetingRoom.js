require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages_userActivity/meetingRoom/meetingRoom"],{0:function(e,t,n){"use strict";(function(e){n(5);var t=u(n(6)),r=u(n(4)),o=u(n(22)),i=u(n(15));function u(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}wx.__webpack_require_UNI_MP_PLUGIN__=n,r.default.use(o.default),r.default.prototype.$store=i.default,r.default.config.productionTip=!1,t.default.mpType="app";var l=new r.default(c({store:i.default},t.default));e(l).$mount()}).call(this,n(1)["createApp"])},19:function(e,t,n){"use strict";n.r(t);var r=n(20),o=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=o.a},20:function(e,t,n){},341:function(e,t,n){"use strict";(function(e){n(5);r(n(4));var t=r(n(342));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n(1)["createPage"])},342:function(e,t,n){"use strict";n.r(t);var r=n(343),o=n(345);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);n(348);var u,a=n(21),c=Object(a["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],u);c.options.__file="pages_userActivity/meetingRoom/meetingRoom.vue",t["default"]=c.exports},343:function(e,t,n){"use strict";n.r(t);var r=n(344);n.d(t,"render",(function(){return r["render"]})),n.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(t,"components",(function(){return r["components"]}))},344:function(e,t,n){"use strict";var r;n.r(t),n.d(t,"render",(function(){return o})),n.d(t,"staticRenderFns",(function(){return u})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return r}));try{r={uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,416))},uLoadingIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-loading-icon/u-loading-icon")]).then(n.bind(null,425))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,t=e.$createElement,r=(e._self._c,0!==e.meetingList.length?n(156):null),o=0!==e.meetingList.length?n(157):null,i=0!==e.meetingList.length?n(158):null,u=0!==e.meetingList.length?n(159):null;e.$mp.data=Object.assign({},{$root:{m0:r,m1:o,m2:i,m3:u}})},i=!1,u=[];o._withStripped=!0},345:function(e,t,n){"use strict";n.r(t);var r=n(346),o=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=o.a},346:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(10)),o=n(347),i=n(163),u=n(16);function a(e){return e&&e.__esModule?e:{default:e}}function c(e){return d(e)||f(e)||l(e)||s()}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(e,t){if(e){if("string"===typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(e,t):void 0}}function f(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function d(e){if(Array.isArray(e))return g(e)}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function p(e,t,n,r,o,i,u){try{var a=e[i](u),c=a.value}catch(s){return void n(s)}a.done?t(c):Promise.resolve(c).then(r,o)}function m(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function u(e){p(i,r,o,u,a,"next",e)}function a(e){p(i,r,o,u,a,"throw",e)}u(void 0)}))}}function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var w={data:function(){return{limit:12,page:1,lastPage:"",meetingList:[],linsMeeting:[],isloading:!1,refresh:!0}},computed:v({},(0,u.mapState)(["house","uid"])),onLoad:function(){},onShow:function(){this.refresh&&(this.page=1,this.meetingList=[],this.getSpaceMeeting()),this.refresh=!0},onReachBottom:function(){this.page>=this.lastPage||this.isloading||(this.page+=1,this.getSpaceMeeting())},methods:{getSpaceMeeting:function(){var t=this;return m(r.default.mark((function n(){var i,u,a,s,l,f;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.isloading=!0,n.next=3,(0,o.spaceMeetingPage)({page:t.page,limit:t.limit});case 3:if(i=n.sent,console.log("请求会议室列表"),console.log(i),0===i.code){n.next=10;break}return e.showToast({title:"获取会议室列表失败",icon:"none",duration:2e3}),t.isloading=!1,n.abrupt("return");case 10:t.linsMeeting=i.result.data,u=0;case 12:if(!(u<t.linsMeeting.length)){n.next=20;break}return n.next=15,t.getCommentList(t.linsMeeting[u].id);case 15:a=n.sent,t.$set(t.linsMeeting[u],"pinglun",a);case 17:u++,n.next=12;break;case 20:for(t.meetingList=[].concat(c(t.meetingList),c(t.linsMeeting)),t.lastPage=i.result.last_page,s=0;s<t.meetingList.length;s++)l=t.meetingList[s].media[0],f=/(\.gif|\.jpeg|\.png|\.jpg|\.bmp)/,t.$set(t.meetingList[s],"img",f.test(l)),t.meetingList[s].img&&t.meetingList[s].media.length,t.$set(t.meetingList[s],"more","");t.$nextTick((function(){var n=e.createSelectorQuery().in(t);n.selectAll(".content-title").boundingClientRect(),n.selectAll(".inner").boundingClientRect(),n.exec((function(e){for(var n=0;n<e[0].length;n++){var r=e[0][n].height-e[1][n].height;r>=0?t.$set(t.meetingList[n],"more","2"):t.$set(t.meetingList[n],"more","1")}})),t.isloading=!1}));case 24:case"end":return n.stop()}}),n)})))()},getCommentList:function(e){return m(r.default.mark((function t(){var n;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,i.getComment)({postId:e,page:1,limit:3});case 2:if(n=t.sent,0===n.code){t.next=5;break}return t.abrupt("return");case 5:return t.abrupt("return",n.result.data);case 6:case"end":return t.stop()}}),t)})))()},toArticleDes:function(t){this.refresh=!1,e.navigateTo({url:"../../pages_userActivity/articleDes/articleDes?i="+t.id})},toIssue:function(){this.house?e.navigateTo({url:"../artcleIssue/artcleIssue?meeting=1"}):e.showToast({title:"先成为主人才能发布动态哦",icon:"none",duration:2e3})},previewImg:function(t,n){this.refresh=!1,e.previewImage({current:t[n],urls:t})},toOtherUser:function(t,n){t.uid===this.uid?e.switchTab({url:"../../pages/user/user"}):1===n?e.navigateTo({url:"../../pages_userActivity/otherUser/otherUser?ocateId="+t.cateId+"&ouid="+t.uid}):e.navigateTo({url:"../../pages_userActivity/otherUser/otherUser?ocateId="+t.cateid+"&ouid="+t.uid})}}};t.default=w}).call(this,n(1)["default"])},348:function(e,t,n){"use strict";n.r(t);var r=n(349),o=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=o.a},349:function(e,t,n){},6:function(e,t,n){"use strict";n.r(t);var r=n(7);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);n(19);var i,u,a,c,s=n(21),l=Object(s["default"])(r["default"],i,u,!1,null,null,null,!1,a,c);l.options.__file="App.vue",t["default"]=l.exports},7:function(e,t,n){"use strict";n.r(t);var r=n(8),o=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=o.a},8:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(9),o={data:function(){return{globalData:{ws:{}}}},onLaunch:function(){},onLoad:function(){},onShow:function(){if(wx.canIUse("getUpdateManager")){var e=wx.getUpdateManager();e.onCheckForUpdate((function(t){t.hasUpdate&&(e.onUpdateReady((function(){wx.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(t){t.confirm&&e.applyUpdate()}})})),e.onUpdateFailed((function(){wx.showModal({title:"已经有新版本了哟~",content:"新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"})})))}))}else wx.showModal({title:"提示",content:"当前微信版本过低，可能无法使用某些功能，请升级到最新微信版本后重试。"});this.lookAllNetwork()},onHide:function(){},onUnload:function(){},methods:{lookAllNetwork:function(){var t=this;e.onNetworkStatusChange((function(n){console.log(n),n.isConnected?(e.showLoading({title:"网络重启中！"}),t.updateWs(),e.hideLoading()):e.showToast({title:"网络断开！",icon:"none",duration:2e3})}))},updateWs:function(){var e=this;this.globalData.ws?r.init(1):r.init(),r.on("onOpen",(function(){e.globalData.ws=r.ws}))}}};t.default=o}).call(this,n(1)["default"])}},[[341,"common/runtime","common/vendor","pages_userActivity/common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages_userActivity/meetingRoom/meetingRoom.js.map