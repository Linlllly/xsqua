(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/citySelect/citySelect"],{0:function(t,e,o){"use strict";(function(t){o(5);var e=i(o(6)),n=i(o(4)),r=i(o(21)),a=i(o(15));function i(t){return t&&t.__esModule?t:{default:t}}function u(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function s(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?u(Object(o),!0).forEach((function(e){c(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):u(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function c(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}wx.__webpack_require_UNI_MP_PLUGIN__=o,n.default.use(r.default),n.default.prototype.$store=a.default,n.default.config.productionTip=!1,e.default.mpType="app";var l=new n.default(s({store:a.default},e.default));t(l).$mount()}).call(this,o(1)["createApp"])},18:function(t,e,o){"use strict";o.r(e);var n=o(19),r=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=r.a},19:function(t,e,o){},201:function(t,e,o){"use strict";(function(t){o(5);n(o(4));var e=n(o(202));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=o,t(e.default)}).call(this,o(1)["createPage"])},202:function(t,e,o){"use strict";o.r(e);var n=o(203),r=o(206);for(var a in r)"default"!==a&&function(t){o.d(e,t,(function(){return r[t]}))}(a);o(209);var i,u=o(20),s=Object(u["default"])(r["default"],n["render"],n["staticRenderFns"],!1,null,null,null,!1,n["components"],i);s.options.__file="pages/citySelect/citySelect.vue",e["default"]=s.exports},203:function(t,e,o){"use strict";o.r(e);var n=o(204);o.d(e,"render",(function(){return n["render"]})),o.d(e,"staticRenderFns",(function(){return n["staticRenderFns"]})),o.d(e,"recyclableRender",(function(){return n["recyclableRender"]})),o.d(e,"components",(function(){return n["components"]}))},204:function(t,e,o){"use strict";var n;o.r(e),o.d(e,"render",(function(){return r})),o.d(e,"staticRenderFns",(function(){return i})),o.d(e,"recyclableRender",(function(){return a})),o.d(e,"components",(function(){return n}));try{n={uIcon:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(o.bind(null,425))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var t=this,e=t.$createElement,n=(t._self._c,o(205));t._isMounted||(t.e0=function(e){t.showRoom=!1},t.e1=function(e){t.showPeoPle=!1}),t.$mp.data=Object.assign({},{$root:{m0:n}})},a=!1,i=[];r._withStripped=!0},206:function(t,e,o){"use strict";o.r(e);var n=o(207),r=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=r.a},207:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=u(o(10)),r=o(208),a=o(227),i=o(188);o(16);function u(t){return t&&t.__esModule?t:{default:t}}function s(t,e,o,n,r,a,i){try{var u=t[a](i),s=u.value}catch(c){return void o(c)}u.done?e(s):Promise.resolve(s).then(n,r)}function c(t){return function(){var e=this,o=arguments;return new Promise((function(n,r){var a=t.apply(e,o);function i(t){s(a,n,r,i,u,"next",t)}function u(t){s(a,n,r,i,u,"throw",t)}i(void 0)}))}}var l={data:function(){return{cateId:"",bgImg:"",cityList:[],city:"",addrList:[],it:[],showRoom:!1,roomList:[],roomTitle:"",selectRoomItem:"",pageNum:1,totalPageNum:"",pageSize:20,lookHouse:!1,mySelect:"",totalCount:0,showPeoPle:!1,xiaoquPeople:"",peopleList:[],change:"",password:""}},onLoad:function(t){this.cateId=t.cateId,this.change=t.change,this.lookHouse="undefined"!==t.lookHouse,this.getCityList(),"true"===t.change&&this.getMyRoom()},methods:{getCityList:function(){var e=this;return c(n.default.mark((function o(){var a,i;return n.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,(0,r.list)({parentId:e.cateId});case 2:if(a=o.sent,console.log("2.所有街道列表"),console.log(a),0===a.code){o.next=8;break}return t.showToast({title:"请求街道失败",icon:"none",duration:2e3}),o.abrupt("return");case 8:if(e.cityList=a.page.list,0!==e.cityList.length){o.next=12;break}return t.showToast({title:"该区域下暂未开放街道，请选择别的区域吧~",icon:"none",duration:2e3}),o.abrupt("return");case 12:i=Math.floor(Math.random()*e.cityList.length),e.city=e.cityList[i],e.getStreetList();case 15:case"end":return o.stop()}}),o)})))()},getStreetList:function(){var e=this;return c(n.default.mark((function o(){var a;return n.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,(0,r.list)({parentId:e.city.cateId});case 2:if(a=o.sent,console.log("3.随机街道下所有小区列表"),console.log(a),0===a.code){o.next=8;break}return t.showToast({title:"获取小区失败",icon:"none",duration:2e3}),o.abrupt("return");case 8:if(e.addrList=a.page.list,0!==e.addrList.length){o.next=12;break}return t.showToast({title:"该街道下暂未开放小区，请选择别的街道吧~",icon:"none",duration:2e3}),o.abrupt("return");case 12:e.generate();case 13:case"end":return o.stop()}}),o)})))()},generate:function(){this.it=[];for(var t=0;t<this.addrList.length;t++){var e={};e.addr=this.addrList[t];var o=Math.floor(2*Math.random())+1;e.bigBox=1===o;var n=Math.floor(4*Math.random())+1;if(1===n||2===n){var r=Math.floor(2*Math.random())+1,a=null,i=null;1===r?(a=208,i=208,e.width=a+"rpx",e.height=i+"rpx",e.fsize="44rpx"):2===r&&(a=190,i=190,e.width=a+"rpx",e.height=i+"rpx",e.fsize="40rpx"),Math.floor(Math.random()*(278-a)),Math.floor(Math.random()*(208-i));var u=Math.floor(4*Math.random())+1;1===u?(e.top="-48rpx",e.left=Math.floor(Math.random()*a)+"rpx"):2===u?(e.top=i+"rpx",e.left=Math.floor(Math.random()*a)+"rpx"):3===u?(e.left="-48rpx",e.top=Math.floor(Math.random()*i)+"rpx"):(e.left=a+"rpx",e.top=Math.floor(Math.random()*i)+"rpx");var s=Math.floor(2*Math.random())+1;e.bdr=1===s?"50%":"20rpx",this.it.push(e)}else if(3===n){var c=Math.floor(2*Math.random())+1,l=null,d=null,f=null,h=null;1===c?(l=278,d=200,e.width=l+"rpx",e.height=d+"rpx",e.fsize="48rpx"):2===c&&(l=260,d=168,e.width=l+"rpx",e.height=d+"rpx",e.fsize="44rpx"),f=Math.floor(Math.random()*(278-l)),h=Math.floor(Math.random()*(208-d)),e.mleft=f+"rpx",e.mtop=h+"rpx";var p=Math.floor(4*Math.random())+1;1===p?(e.top="-48rpx",e.left=Math.floor(Math.random()*l)+"rpx"):2===p?(e.top=d+"rpx",e.left=Math.floor(Math.random()*l)+"rpx"):3===p?(e.left="-48rpx",e.top=Math.floor(Math.random()*d)+"rpx"):(e.left=l+"rpx",e.top=Math.floor(Math.random()*d)+"rpx"),e.bdr="20rpx",this.it.push(e)}else{var m=Math.floor(1*Math.random())+1,g=null,w=null,x=null,v=null;1===m&&(g=202,w=202,e.width=g+"rpx",e.height=w+"rpx",e.fsize="44rpx"),x=Math.floor(Math.random()*(278-g)),v=Math.floor(Math.random()*(208-w)),e.mleft=x+"rpx",e.mtop=v+"rpx";var M=Math.floor(4*Math.random())+1;1===M?(e.top="-48rpx",e.left=Math.floor(Math.random()*g)+"rpx"):2===M?(e.top=w+"rpx",e.left=Math.floor(Math.random()*g)+"rpx"):3===M?(e.left="-48rpx",e.top=Math.floor(Math.random()*w)+"rpx"):(e.left=g+"rpx",e.top=Math.floor(Math.random()*w)+"rpx"),e.transform="rotate(45deg)",e.bdr="20rpx",this.it.push(e)}}},changeSelectState:function(t,e){this.lookHouse?(this.xiaoquPeople=this.it[e],this.getPeople(this.it[e])):(this.selectRoomItem=this.it[e],this.getRoom(this.it[e]))},getRoom:function(e){var o=this;return c(n.default.mark((function a(){var i;return n.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o.showRoom=!0,o.roomTitle=e.addr.cateName,n.next=4,(0,r.list)({page:o.pageNum,limit:o.pageSize,parentId:e.addr.cateId,isLock:0});case 4:if(i=n.sent,console.log("4.点击小区显示所有没被选择的房间"),console.log(i),0===i.code){n.next=10;break}return t.showToast({title:"获取房间失败",icon:"none",duration:2e3}),n.abrupt("return");case 10:if(o.roomList=i.page.list,o.totalPageNum=i.page.totalPage,o.totalCount=i.page.totalCount,0!==o.roomList.length){n.next=16;break}return t.showToast({title:"该小区下暂未开放房间，请选择别的房间吧~",icon:"none",duration:2e3}),n.abrupt("return");case 16:case"end":return n.stop()}}),a)})))()},changeRoomState:function(t){this.mySelect=t},getMyRoom:function(){var e=this;return c(n.default.mark((function o(){var r;return n.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,(0,i.myRoom)();case 2:if(r=o.sent,0===r.code){o.next=6;break}return t.showToast({title:"获取用户密码失败，请稍后再更换房间",icon:"none",duration:2e3}),o.abrupt("return");case 6:e.password=r.room.password?r.room.password:"";case 7:case"end":return o.stop()}}),o)})))()},toRoomSet:function(){var e=this;return c(n.default.mark((function o(){var r,i;return n.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:if("true"!==e.change){o.next=7;break}return o.next=3,(0,a.fchange)({cateId:e.mySelect.cateId,password:e.password});case 3:r=o.sent,0===r.code?t.reLaunch({url:"../user/user"}):t.showToast({title:"换绑失败",icon:"none",duration:2e3}),o.next=11;break;case 7:return o.next=9,(0,a.bind)({cateId:e.mySelect.cateId,password:""});case 9:i=o.sent,0===i.code?(t.setStorageSync("house",!0),e.updateHouse(),t.reLaunch({url:"../user/user"})):t.showToast({title:"注册失败",icon:"none",duration:2e3});case 11:case"end":return o.stop()}}),o)})))()},reloadArea:function(){this.getCityList()},reqRoomList:function(e){if(1===e){if(1===this.pageNum)return void t.showToast({title:"已经在第一页了~",icon:"none",duration:2e3});this.pageNum-=1,this.getRoom(this.selectRoomItem)}else if(2===e){if(this.pageNum>=this.totalPageNum)return void t.showToast({title:"已经在最后一页了~",icon:"none",duration:2e3});this.pageNum+=1,this.getRoom(this.selectRoomItem)}},getPeople:function(t){this.showPeoPle=!0,this.roomTitle=t.addr.cateName,this.getPeopleAgain()},getPeopleAgain:function(){var e=this;return c(n.default.mark((function o(){var a;return n.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,(0,r.list)({page:1,limit:8,parentId:e.xiaoquPeople.addr.cateId,isLock:1,isRandom:1});case 2:if(a=o.sent,console.log("4.随机用户"),console.log(a),0===a.code){o.next=8;break}return t.showToast({title:"获取随机用户列表失败",icon:"none",duration:2e3}),o.abrupt("return");case 8:e.peopleList=a.page.list;case 9:case"end":return o.stop()}}),o)})))()},reloadPeople:function(){this.getPeopleAgain(),t.showToast({title:"已刷新",icon:"none",duration:1500})},toOtherUser:function(e){e.uid===this.uid&&t.switchTab({url:"../user/user"}),t.navigateTo({url:"../../pages_userActivity/otherUser/otherUser?ocateId="+e.cateId+"&ouid="+e.uid})}}};e.default=l}).call(this,o(1)["default"])},209:function(t,e,o){"use strict";o.r(e);var n=o(210),r=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=r.a},210:function(t,e,o){},6:function(t,e,o){"use strict";o.r(e);var n=o(7);for(var r in n)"default"!==r&&function(t){o.d(e,t,(function(){return n[t]}))}(r);o(18);var a,i,u,s,c=o(20),l=Object(c["default"])(n["default"],a,i,!1,null,null,null,!1,u,s);l.options.__file="App.vue",e["default"]=l.exports},7:function(t,e,o){"use strict";o.r(e);var n=o(8),r=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=r.a},8:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(9),r={data:function(){return{globalData:{ws:{}}}},onLaunch:function(){},onLoad:function(){},onShow:function(){if(wx.canIUse("getUpdateManager")){var t=wx.getUpdateManager();t.onCheckForUpdate((function(e){e.hasUpdate&&(t.onUpdateReady((function(){wx.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(e){e.confirm&&t.applyUpdate()}})})),t.onUpdateFailed((function(){wx.showModal({title:"已经有新版本了哟~",content:"新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"})})))}))}else wx.showModal({title:"提示",content:"当前微信版本过低，可能无法使用某些功能，请升级到最新微信版本后重试。"});this.lookAllNetwork()},onHide:function(){},onUnload:function(){},methods:{lookAllNetwork:function(){var e=this;t.onNetworkStatusChange((function(o){console.log(o),o.isConnected?(t.showLoading({title:"网络重启中！"}),e.updateWs(),t.hideLoading()):t.showToast({title:"网络断开！",icon:"none",duration:2e3})}))},updateWs:function(){var t=this;this.globalData.ws=null,n.init(),n.on("onOpen",(function(){t.globalData.ws=n.ws}))}}};e.default=r}).call(this,o(1)["default"])}},[[201,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/citySelect/citySelect.js.map