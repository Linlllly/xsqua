require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages_costMoney/costMoney/costMoney"],{0:function(e,t,n){"use strict";(function(e){n(5);var t=a(n(6)),o=a(n(4)),r=a(n(21)),i=a(n(15));function a(e){return e&&e.__esModule?e:{default:e}}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}wx.__webpack_require_UNI_MP_PLUGIN__=n,o.default.use(r.default),o.default.prototype.$store=i.default,o.default.config.productionTip=!1,t.default.mpType="app";var l=new o.default(s({store:i.default},t.default));e(l).$mount()}).call(this,n(1)["createApp"])},18:function(e,t,n){"use strict";n.r(t);var o=n(19),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},19:function(e,t,n){},254:function(e,t,n){"use strict";(function(e){n(5);o(n(4));var t=o(n(255));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n(1)["createPage"])},255:function(e,t,n){"use strict";n.r(t);var o=n(256),r=n(260);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n(263);var a,u=n(20),s=Object(u["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],a);s.options.__file="pages_costMoney/costMoney/costMoney.vue",t["default"]=s.exports},256:function(e,t,n){"use strict";n.r(t);var o=n(257);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},257:function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return a})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return o}));try{o={uNumberBox:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-number-box/u-number-box")]).then(n.bind(null,508))},uPopup:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(n.bind(null,470))},uLoadingIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-loading-icon/u-loading-icon")]).then(n.bind(null,434))},uOverlay:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-overlay/u-overlay")]).then(n.bind(null,454))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,t=e.$createElement,o=(e._self._c,n(258)),r=n(259),i=n(177),a=n(176),u=n(178);e._isMounted||(e.e0=function(t){e.showSendList=!0},e.e1=function(t){e.showSendList=!1},e.e2=function(t){e.showRecordList=!1},e.e3=function(t){e.showConvertList=!1}),e.$mp.data=Object.assign({},{$root:{m0:o,m1:r,m2:i,m3:a,m4:u}})},i=!1,a=[];r._withStripped=!0},260:function(e,t,n){"use strict";n.r(t);var o=n(261),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},261:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n(10)),r=n(262),i=n(16);function a(e){return e&&e.__esModule?e:{default:e}}function u(e){return d(e)||l(e)||c(e)||s()}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(e,t){if(e){if("string"===typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}function l(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function d(e){if(Array.isArray(e))return f(e)}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function p(e,t,n,o,r,i,a){try{var u=e[i](a),s=u.value}catch(c){return void n(c)}u.done?t(s):Promise.resolve(s).then(o,r)}function g(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var i=e.apply(t,n);function a(e){p(i,o,r,a,u,"next",e)}function u(e){p(i,o,r,a,u,"throw",e)}a(void 0)}))}}function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){w(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function w(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v={computed:m({},(0,i.mapState)(["uid"])),data:function(){return{eFlower:0,ePoo:0,bigLook:0,showSendList:!1,flowerList:[],loadingFlower:!1,pageNumFlower:1,pageSizeFlower:20,lastPageNumFlower:"",moneyList:[],loadingMoney:!1,pageNumMoney:1,pageSizeMoney:20,lastPageNumMoney:"",pooList:[],loadingPoo:!1,pageNumPoo:1,pageSizePoo:20,lastPageNumPoo:"",showRecordList:!1,recordList:[],loadingRecord:!1,pageNumRecord:1,pageSizeRecord:12,lastPageNumRecord:"",showConvertList:!1,convertList:[],loadingConvert:!1,pageNumConvert:1,pageSizeConvert:12,lastPageNumConvert:"",timer:null,exchageing:!1}},methods:{payMoney:function(t){var n=this;this.num=0===t?1:1===t?10:2===t?30:50,this.timer||(e.showLoading({title:"请求支付中"}),this.timer=setTimeout((function(){e.hideLoading(),n.wxPay(),n.timer=null}),1500))},wxPay:function(){var t=this;return g(o.default.mark((function n(){var i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,r.buy)({num:t.num});case 2:if(i=n.sent,0===i.code){n.next=6;break}return e.showToast({title:"提交订单失败",icon:"none",duration:2e3}),n.abrupt("return");case 6:e.requestPayment({provider:"wxpay",orderInfo:"",timeStamp:i.timeStamp,nonceStr:i.nonceStr,package:i.package,signType:i.signType,paySign:i.paySign,success:function(t){e.showToast({icon:"none",title:"充值成功",duration:1e3})},fail:function(t){e.showToast({icon:"none",title:"支付失败，请重试",duration:1e3})}}),t.loading=!1;case 8:case"end":return n.stop()}}),n)})))()},openRecord:function(){this.showRecordList=!0,this.recordList=[],this.pageNumRecord=1,this.lastPageNumRecord="",this.getRecordList()},lowerRecord:function(){this.pageNumRecord>=this.lastPageNumRecord||this.loadingRecord||(this.pageNumRecord+=1,this.getRecordList())},getRecordList:function(){var t=this;return g(o.default.mark((function n(){var i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.loadingRecord=!0,n.next=3,(0,r.list)({page:t.pageNumRecord,limit:t.pageSizeRecord,status:1,type:1});case 3:if(i=n.sent,console.log("充值记录"),console.log(i),0===i.code){n.next=11;break}return t.loadingRecord=!1,e.showToast({title:"获取充值记录失败",icon:"none",duration:2e3}),t.loadingRecord=!1,n.abrupt("return");case 11:t.recordList=[].concat(u(t.recordList),u(i.page.data)),t.lastPageNumRecord=i.page.last_page,t.loadingRecord=!1;case 14:case"end":return n.stop()}}),n)})))()},openSendList:function(){this.flowerList=[],this.pageNumFlower=1,this.lastPageNumFlower="",this.moneyList=[],this.pageNumMoney=1,this.lastPageNumMoney="",this.pooList=[],this.pageNumPoo=1,this.lastPageNumPoo="",this.getFlowerList(),this.getMoneyList(),this.getPooList()},changeLookList:function(e){this.bigLook=e,this.flowerList=[],this.moneyList=[],this.pooList=[],this.getFlowerList(),this.getMoneyList(),this.getPooList()},getFlowerList:function(){var t=this;return g(o.default.mark((function n(){var i,a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=16,1===t.bigLook&&(i=8),t.loadingFlower=!0,n.next=5,(0,r.list)({page:t.pageNumFlower,limit:t.pageSizeFlower,status:i,type:2});case 5:if(a=n.sent,console.log("收到/送出鲜花"),console.log(a),0===a.code){n.next=13;break}return t.loadingFlower=!1,e.showToast({title:"获取记录失败",icon:"none",duration:2e3}),t.loadingFlower=!1,n.abrupt("return");case 13:t.flowerList=[].concat(u(t.flowerList),u(a.page.data)),t.lastPageNumFlower=a.page.last_page,t.loadingFlower=!1;case 16:case"end":return n.stop()}}),n)})))()},lowerFlower:function(){this.pageNumFlower>=this.lastPageNumFlower||this.loadingFlower||(this.pageNumFlower+=1,this.getFlowerList())},getMoneyList:function(){var t=this;return g(o.default.mark((function n(){var i,a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=16,1===t.bigLook&&(i=8),t.loadingMoney=!0,n.next=5,(0,r.list)({page:t.pageNumMoney,limit:t.pageSizeMoney,status:i,type:1});case 5:if(a=n.sent,console.log("收到/送出银元"),console.log(a),0===a.code){n.next=13;break}return t.loadingMoney=!1,e.showToast({title:"获取记录失败",icon:"none",duration:2e3}),t.loadingMoney=!1,n.abrupt("return");case 13:t.moneyList=[].concat(u(t.moneyList),u(a.page.data)),t.lastPageNumMoney=a.page.last_page,t.loadingMoney=!1;case 16:case"end":return n.stop()}}),n)})))()},lowerMoney:function(){this.pageNumMoney>=this.lastPageNumMoney||this.loadingMoney||(this.pageNumMoney+=1,this.getMoneyList())},getPooList:function(){var t=this;return g(o.default.mark((function n(){var i,a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=16,1===t.bigLook&&(i=8),t.loadingPoo=!0,n.next=5,(0,r.list)({page:t.pageNumPoo,limit:t.pageSizePoo,status:i,type:3});case 5:if(a=n.sent,console.log("收到/送出粪便"),console.log(a),0===a.code){n.next=13;break}return t.loadingPoo=!1,e.showToast({title:"获取记录失败",icon:"none",duration:2e3}),t.loadingPoo=!1,n.abrupt("return");case 13:t.pooList=[].concat(u(t.pooList),u(a.page.data)),t.lastPageNumPoo=a.page.last_page,t.loadingPoo=!1;case 16:case"end":return n.stop()}}),n)})))()},lowerPoo:function(){this.pageNumPoo>=this.lastPageNumPoo||this.loadingPoo||(this.pageNumPoo+=1,this.getPooList())},openConvert:function(){this.convertList=[],this.pageNumConvert=1,this.lastPageNumConvert="",this.showConvertList=!0,this.getConvertList()},getConvertList:function(){var t=this;return g(o.default.mark((function n(){var i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.loadingConvert=!0,n.next=3,(0,r.list)({page:t.pageNumConvert,limit:t.pageSizeConvert,status:2});case 3:if(i=n.sent,console.log("兑换鲜花/粪便"),console.log(i),0===i.code){n.next=11;break}return t.loadingConvert=!1,e.showToast({title:"获取兑换记录失败",icon:"none",duration:2e3}),t.loadingConvert=!1,n.abrupt("return");case 11:t.convertList=[].concat(u(t.convertList),u(i.page.data)),t.lastPageNumConvert=i.page.last_page,t.loadingConvert=!1;case 14:case"end":return n.stop()}}),n)})))()},lowerConvert:function(){this.pageNumConvert>=this.lastPageNumConvert||this.loadingConvert||(this.pageNumConvert+=1,this.getConvertList())},comfirmExchange:function(){var t=this;return g(o.default.mark((function n(){var i,a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!t.exchageing){n.next=2;break}return n.abrupt("return");case 2:if(0!==t.eFlower||0!==t.ePoo){n.next=5;break}return e.showToast({title:"不可以兑换空数量",icon:"none",duration:2e3}),n.abrupt("return");case 5:if(t.exchageing=!0,e.showLoading({title:"兑换中"}),!t.eFlower){n.next=17;break}return n.next=10,(0,r.exchange)({num:t.eFlower,receiveUid:t.uid,type:2});case 10:if(i=n.sent,e.hideLoading(),0===i.code){n.next=16;break}return t.exchageing=!1,e.showToast({title:"兑换鲜花失败",icon:"none",duration:2e3}),n.abrupt("return");case 16:e.showToast({title:"兑换鲜花成功",icon:"none",duration:2e3});case 17:if(!t.ePoo){n.next=27;break}return n.next=20,(0,r.exchange)({num:t.ePoo,receiveUid:t.uid,type:3});case 20:if(a=n.sent,e.hideLoading(),0===a.code){n.next=26;break}return t.exchageing=!1,e.showToast({title:"兑换粪便失败",icon:"none",duration:2e3}),n.abrupt("return");case 26:e.showToast({title:"兑换粪便成功",icon:"none",duration:2e3});case 27:t.ePoo=0,t.eFlower=0,t.exchageing=!1;case 30:case"end":return n.stop()}}),n)})))()},toOtherUser:function(t){var n=0===this.bigLook?t.sendUid:t.receiveUid;e.navigateTo({url:"../../pages_userActivity/otherUser/otherUser?ocateId="+t.cateId+"&ouid="+n})}}};t.default=v}).call(this,n(1)["default"])},263:function(e,t,n){"use strict";n.r(t);var o=n(264),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},264:function(e,t,n){},6:function(e,t,n){"use strict";n.r(t);var o=n(7);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n(18);var i,a,u,s,c=n(20),l=Object(c["default"])(o["default"],i,a,!1,null,null,null,!1,u,s);l.options.__file="App.vue",t["default"]=l.exports},7:function(e,t,n){"use strict";n.r(t);var o=n(8),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},8:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(9),r={data:function(){return{globalData:{ws:{}}}},onLaunch:function(){},onLoad:function(){},onShow:function(){if(wx.canIUse("getUpdateManager")){var e=wx.getUpdateManager();e.onCheckForUpdate((function(t){t.hasUpdate&&(e.onUpdateReady((function(){wx.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(t){t.confirm&&e.applyUpdate()}})})),e.onUpdateFailed((function(){wx.showModal({title:"已经有新版本了哟~",content:"新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"})})))}))}else wx.showModal({title:"提示",content:"当前微信版本过低，可能无法使用某些功能，请升级到最新微信版本后重试。"});this.lookAllNetwork()},onHide:function(){},onUnload:function(){},methods:{lookAllNetwork:function(){var t=this;e.onNetworkStatusChange((function(n){console.log(n),n.isConnected?(e.showLoading({title:"网络重启中！"}),t.updateWs(),e.hideLoading()):e.showToast({title:"网络断开！",icon:"none",duration:2e3})}))},updateWs:function(){var e=this;this.globalData.ws=null,o.init(),o.on("onOpen",(function(){e.globalData.ws=o.ws}))}}};t.default=r}).call(this,n(1)["default"])}},[[254,"common/runtime","common/vendor","pages_costMoney/common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages_costMoney/costMoney/costMoney.js.map