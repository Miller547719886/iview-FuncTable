webpackJsonp([1],{100:function(e,t,n){"use strict";var i=n(13),a=n(29);t.a={getColumnsKey:function(e){var t=a.a.getUserInfo().account,n=i.a.getStorage(window.$CONST.CONFIG_COLUMNS_KEY);return e&&n&&n[t]?n[t][e]:void 0},setColumnsKey:function(e){i.a.setStorage(window.$CONST.CONFIG_COLUMNS_KEY,e)},clearColumnsKey:function(){i.a.rmStorage(window.$CONST.CONFIG_COLUMNS_KEY)}}},101:function(e,t,n){"use strict";t.a={data:"data",page:{total:"total",content:"content"}}},102:function(e,t,n){"use strict";var i=n(114),a=n.n(i),s={data:function(){return{refreshable:!1,pageConfig:{size:"small",showSizer:!0,showElevator:!0,pagePosition:"right",mode:"back"},data:[],ids:[],columns:[],CRUDKey:"id",searchConfig:{placeholder:"请输入查询条件",key:"id",maxlength:20},filterConfig:!1,fetchConfig:{}}},methods:{loadFT:function(){this.fetchConfig={url:"/please-change-this-url",params:{},callback:function(e){}}},handleOnSelChangeFT:function(e,t){var n,i=this,s=e.map(function(e,n,a){return t?e[t]:e[i.CRUDKey]});this.ids.map(function(e,t,n){s.includes(e)||n.splice(t,1)}),(n=this.ids).push.apply(n,a()(s)),this.ids=_.uniq(this.ids)},handleOnDataChangeFT:function(e){this.data=e},refreshFT:function(){this.fetchConfig=window._.cloneDeep(this.fetchConfig)},handleBatchDel:function(e){e.length?this.$Modal.confirm({title:"删除确认",content:"您确定要批量删除吗？"}):this.$Message.warning("您还未做选择！")},handleWatch:function(e,t){},handleDel:function(e,t){},handleEdit:function(e,t){}}};t.a=s},103:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(51),a=n(77),s=n.n(a),r=n(50),o=(n.n(r),n(75)),l=n(79),c=n.n(l),f=n(76),u=(n.n(f),n(78)),h=n.n(u),d=n(74);n.i(o.a)(),i.default.use(h.a,d.a),i.default.use(s.a),new i.default({el:"#app",template:"<App/>",components:{App:c.a}})},13:function(e,t,n){"use strict";function i(e,t){U.$emit(e,t)}function a(e,t){U.$on(e,t)}function s(e){if("object"!==(void 0===e?"undefined":B()(e)))return e;try{return JSON&&F()(e)}catch(e){return null}}function r(e){if("string"!=typeof e)return e;try{return JSON&&JSON.parse(e)}catch(e){return null}}function o(e,t){if(2===arguments.length){var n=t;"object"===(void 0===n?"undefined":B()(n))?(n=F()(n),n="obj-"+n):n="str-"+n,localStorage.setItem(e,n)}}function l(e){var t=localStorage.getItem(e);if(t)return 0===t.indexOf("obj-")?(t=t.slice(4),JSON.parse(t)):0===t.indexOf("str-")?t.slice(4):void 0}function c(e){localStorage.removeItem(e)}function f(){localStorage.clear()}function u(e,t){if(2===arguments.length){var n=t;"object"===(void 0===n?"undefined":B()(n))?(n=F()(n),n="obj-"+n):n="str-"+n,sessionStorage.setItem(e,n)}}function h(e){var t=sessionStorage.getItem(e);if(t)return 0===t.indexOf("obj-")?(t=t.slice(4),JSON.parse(t)):0===t.indexOf("str-")?t.slice(4):void 0}function d(e){sessionStorage.removeItem(e)}function g(){sessionStorage.clear()}function p(e){return e<=0?0:e-1}function m(e,t){var n=[];return e.forEach(function(e){n.push(e[t])}),n}function C(e){var t=new O.a(e);return N()(t)}function v(e){for(var t=new RegExp("[`':;',‘；：”“'。，、？ ]"),n="",i=0;i<e.length;i++)n+=e.substr(i,1).replace(t,"");return n}function y(e,t){t.map(function(t){I()(e).includes(t)&&(e[t]=v(e[t]))})}function b(e,t){I()(e).forEach(function(n){null!=t[n]&&(e[n]=t[n])})}function w(e,t){I()(e).forEach(function(n){e[n]=t[n]})}function S(e){if("object"===(void 0===e?"undefined":B()(e))){if(Array.isArray(e)){for(var t=[],n=0;n<e.length;n++)t.push(e[n]);return t}var i={};for(var a in e)i[a]=this.cloneObject(e[a]);return i}return e}function k(e){if(!e)return"--";var t,n=e.split("-"),i=n[0],a=n[1],s=n[2],r=new Date,o=r.getFullYear(),l=r.getMonth()+1,c=r.getDate();if(o===i)t=0;else{var f=o-i;if(f>0)if(l===a){var u=c-s;t=u<0?f-1:f}else{var h=l-a;t=h<0?f-1:f}else t=-1}return t}function x(e){var t=/[0-9]+/;return t.test(e)}function T(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yyyy-MM-dd",n={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length)));for(var i in n)new RegExp("("+i+")").test(t)&&(t=t.replace(RegExp.$1,1===RegExp.$1.length?n[i]:("00"+n[i]).substr((""+n[i]).length)));return t}function _(e){return e.replace(/<[^>]+>/g,"")}var $=n(108),I=n.n($),D=n(30),N=n.n(D),K=n(110),O=n.n(K),E=n(105),F=n.n(E),P=n(115),B=n.n(P),R=n(178),U=new R.a;t.a={jsonToStr:s,strToJson:r,setStorage:o,getStorage:l,rmStorage:c,clearStorage:f,setSessionStorage:u,getSessionStorage:h,rmSessionStorage:d,clearSessionStorage:g,analysisPage:p,getColumnData:m,addEvent:a,sendEvent:i,unique:C,trim:v,clearString:y,copyObj:b,copyObjAll:w,fullCopyObj:S,computeAge:k,checkNumber:x,delHtmlTag:_,formatDate:T}},167:function(e,t){},168:function(e,t){},169:function(e,t){},172:function(e,t,n){n(169);var i=n(49)(n(98),n(176),null,null);e.exports=i.exports},173:function(e,t,n){n(168);var i=n(49)(n(99),n(175),null,null);e.exports=i.exports},174:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{width:"80%",margin:"50px auto"},attrs:{id:"app"}},[n("div",{staticClass:"mb-10"},[n("Button",{on:{click:e.handleBackPage}},[e._v("后端分页")]),e._v(" "),n("Button",{on:{click:e.handleFrontPage}},[e._v("前端分页")]),e._v(" "),n("Button",{on:{click:e.handleNoPage}},[e._v("不分页")])],1),e._v(" "),e.showTable?n("func-table",{attrs:{id:"table-001",ids:e.ids,data:e.data,refreshable:e.refreshable,columns:e.columns,pageConfig:e.pageConfig,searchConfig:e.searchConfig,filterConfig:e.filterConfig},on:{"on-data-change":e.handleOnDataChangeFT,"on-selection-change":e.handleOnSelChangeFT},model:{value:e.fetchConfig,callback:function(t){e.fetchConfig=t},expression:"fetchConfig"}},[n("div",{attrs:{slot:"batch-operation"},slot:"batch-operation"},[n("Button",{on:{click:e.handlerAdd}},[e._v("添加")]),e._v(" "),n("Button",{on:{click:e.handlerBatchDel}},[e._v("删除")])],1)]):e._e()],1)},staticRenderFns:[]}},175:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"transfer"},[n("Transfer",{ref:"Transfer",staticClass:"d-ib",attrs:{"render-format":e.render,data:e.data,titles:e.titles,"target-keys":e.targetKeys,operations:e.operations,"list-style":e.listStyle,"selected-keys":e.selectedKeys},on:{"on-change":e.onChange}}),e._v(" "),n("div",{staticClass:"d-ib ml-10 transfer-move"},[n("Button",{staticClass:"d-b",on:{click:e.goUp}},[e._v("上移")]),e._v(" "),n("Button",{staticClass:"d-b mt-10",on:{click:e.goDown}},[e._v("下移")])],1)],1)},staticRenderFns:[]}},176:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"func-table"},[n("div",{staticClass:"clearfix func-table-top mb-10"},[n("div",{staticClass:"func-table-batch-operation f-l",style:{width:e.searchConfig?"auto":"100%"}},[e._t("batch-operation")],2),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.refreshable,expression:"refreshable"}],staticClass:"func-table-refresh f-l ml-5"},[n("Button",{attrs:{icon:"refresh"},on:{click:e.refresh}},[e._v("刷新")])],1),e._v(" "),e.searchConfig?n("form",{staticClass:"func-table-search f-r",on:{keypress:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;t.preventDefault(),e.doSearch(e.searchInput)}}},[n("div",{staticClass:"clearfix"},[n("Button-group",{staticClass:"f-r ml-10"},[n("Button",{staticClass:"f-r",attrs:{icon:"ios-search"},on:{click:function(t){t.stopPropagation(),e.doSearch(e.searchInput)}}},[e._v("查询")])],1),e._v(" "),n("Button-group",{staticClass:"f-r ml-10"},[n("Input",{staticClass:"ivu-input-default f-r",attrs:{placeholder:e.searchConfig.placeholder,maxlength:e.searchConfig.maxLength},model:{value:e.searchInput,callback:function(t){e.searchInput=t},expression:"searchInput"}})],1)],1)]):e._e()]),e._v(" "),n("div",{staticClass:"func-table-main mb-10"},[e.filterConfig?n("div",{staticClass:"func-table-filter"},[e.modalTransfer.exist?n("div",[n("Modal",{directives:[{name:"show",rawName:"v-show",value:e.isTransferMode,expression:"isTransferMode"}],attrs:{"ok-text":"保存","cancel-text":"重置",title:e.modalTransfer.title,width:"720px"},on:{"on-ok":e.saveColumnsConfig},model:{value:e.modalTransfer.show,callback:function(t){e.$set(e.modalTransfer,"show",t)},expression:"modalTransfer.show"}},[n("CTransfer",{ref:"CTransfer",attrs:{disabledSelections:e.disabledSelections,data:e.transferData,operations:["删除","添加"],titles:e.titles},on:{"on-right-data-change":e.handleRightDataChange},model:{value:e.targetKeys,callback:function(t){e.targetKeys=t},expression:"targetKeys"}})],1)],1):e._e(),e._v(" "),n("div",{staticClass:"clearfix"},[n("Checkbox-group",{directives:[{name:"show",rawName:"v-show",value:e.isCheckMode,expression:"isCheckMode"}],ref:"checkList",staticClass:"mt-10 f-l",on:{"on-change":e.fillTableColumns},model:{value:e.tableColumnsChecked,callback:function(t){e.tableColumnsChecked=t},expression:"tableColumnsChecked"}},e._l(e.checkList,function(t,i){return n("Checkbox",{key:t,ref:"check"+i,refInFor:!0,attrs:{disabled:e.checkDisabled(t),label:t}})})),e._v(" "),e._t("default",[n("div",{staticClass:"topButton"},[n("button",{staticClass:"but_c",on:{click:e.clearStorage}},[n("Icon",{attrs:{type:"ios-upload-outline",size:"18"}}),e._v("恢复默认配置\n            ")],1),e._v(" "),e.isTransferMode?n("button",{staticClass:"but_c",on:{click:e.showModalTransfer}},[n("Icon",{attrs:{type:"compose",size:"18"}}),e._v(" 自定义列表显示内容\n            ")],1):e._e()])])],2)]):e._e(),e._v(" "),n("div",{staticClass:"topPosition spin-outer"},[n("Table",{ref:"table",staticClass:"f-14",attrs:{stripe:"",columns:e.filteredColumns,id:e.id,size:e.size,width:e.width,height:e.height,stripe:e.stripe,border:e.border,"show-header":e.showHeader,"highlight-row":e.highlightRow,"row-class-name":e.rowClassName,context:e.context,"no-data-text":e.noDataText,"no-filtered-data-text":e.noFilteredDataText,data:e.data,"disabled-hover":e.disabledHover,loading:e.loading},on:{"on-current-change":e.emitCurrentChange,"on-select":e.emitSelect,"on-select-cancel":e.emitSelectCancel,"on-select-all":e.emitSelectAll,"on-selection-change":e.setSelectedData,"on-sort-change":e.emitSortChange,"on-filter-change":e.emitFilterChange,"on-row-click":e.emitRowClick,"on-row-dblclick":e.emitRowDblclick,"on-expand":e.emitExpand}}),e._v(" "),n("Spin",{directives:[{name:"show",rawName:"v-show",value:e.spin,expression:"spin"}],staticClass:"login_loading_spin",attrs:{size:"large",fix:""}},[n("Icon",{staticClass:"login-spin-icon-load",attrs:{type:"load-c",size:"18"}}),e._v(" "),n("div",[e._v("加载中...")])],1)],1)]),e._v(" "),e.pageConfig?n("div",{staticClass:"func-table-page clearfix",style:e.setPagePosition(e.pageConfig.pagePosition)},[n("Page",{ref:"page",staticStyle:{float:"none",display:"inline-block"},attrs:{size:e.pageConfig.size||"small",total:e.total,"page-size":e.pageSize,"show-elevator":e.pageConfig.showElevator||!0,"show-sizer":e.pageConfig.showSizer||!0,"show-total":""},on:{"on-change":e.pageChange,"on-page-size-change":e.pageSizeChange}})],1):e._e()])},staticRenderFns:[]}},28:function(e,t,n){"use strict";function i(e,t){if(e.style[t])return e.style[t];if(e.currentStyle)return e.currentStyle[t];if(document.defaultView&&document.defaultView.getComputedStyle){t=t.replace(/([A-Z])/g,"-$1"),t=t.toLowerCase();var n=document.defaultView.getComputedStyle(e,"");return n&&n.getPropertyValue(t)}return null}function a(e,t){w()(e.style,t)}function s(e){return"string"==typeof e.textContent?e.textContent:e.innerText}function r(e,t){"string"==typeof e.textContent?e.textContent=t:e.innerText=t}function o(e){for(var t=Array.prototype.slice.call(e.parentNode.children),n=t.length;n--;)if(t[n]===e){t.splice(n,1);break}return t}function l(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")}function c(e,t){e.classList?e.classList.add(t):e.className+=" "+t}function f(e,t){return e.classList?e.classList.contains(t):new RegExp("(^| )"+t+"( |$)","gi").test(e.className)}function u(e,t){e.parentNode.insertBefore(e,t)}function h(e,t){var n=t.parentNode;n.lastChild===t?n.appendChild(e):n.insertBefore(e,t.nextSibling)}function d(e,t){var n=document.createEvent("MouseEvent");n.initEvent(e,!1,!1),t.dispatchEvent(n)}function g(e){do{e=e.nextSibling}while(e&&1!==e.nodeType);return e}function p(e){return e.nextElementSibling||g(e)}function m(e){do{e=e.previousSibling}while(e&&1!==e.nodeType);return e}function C(e){return e.previousElementSibling||m(e)}function v(e){return S.a.trim(e.textContent||e.innerText)}function y(e){return e.parentNode}var b=n(106),w=n.n(b),S=n(13);t.a={getStyle:i,setStyle:a,getInnerText:s,setInnerText:r,siblings:o,removeClass:l,addClass:c,hasClass:f,before:u,after:h,trigger:d,next:p,prev:C,text:v,parent:y}},29:function(e,t,n){"use strict";var i=n(13);t.a={checkIsLogin:function(){return!(null===i.a.getStorage(window.$CONST.USER_KEY))},setUserInfo:function(e){i.a.setStorage(window.$CONST.USER_KEY,e)},getUserInfo:function(){return i.a.getStorage(window.$CONST.USER_KEY)},logout:function(){i.a.rmStorage(window.$CONST.USER_KEY),i.a.rmStorage(window.$CONST.TOKEN_KEY)},getToken:function(){return i.a.getStorage(window.$CONST.TOKEN_KEY)},setToken:function(e){i.a.setStorage(window.$CONST.TOKEN_KEY,e)}}},74:function(e,t,n){"use strict";var i=n(50),a=n.n(i),s=a.a.create({baseURL:"https://www.easy-mock.com/mock/5a168608b38a3c5b4c7a7163/example"});s.interceptors.response.use(function(e){if(1e4!==window._.get(e,"data.code"))throw new Error("1");return e.data.data},function(e){throw e.response?new Error("2"):e.request?new Error("3"):new Error("4")}),t.a=s},75:function(e,t,n){"use strict";var i=n(170),a=n.n(i),s=n(13),r=n(28);t.a=function(){window.Null="__NULL__",window._=a.a,window.$CONST={USER_KEY:"USER_KEY",TOKEN_KEY:"X-Auth-Token",CONFIG_COLUMNS_KEY:"CONFIG_COLUMNS_KEY"},window.common=s.a,window.dom=r.a}},76:function(e,t){},79:function(e,t,n){n(167);var i=n(49)(n(97),n(174),null,null);e.exports=i.exports},97:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(29),a=n(172),s=n.n(a),r=n(102);t.default={name:"app",components:{FuncTable:s.a},mixins:[r.a],data:function(){var e=this;return{msg:"请求中。。。",refreshable:!0,fetchURL:"/backPage",CRUDKey:"id",columns:[{type:"selection",width:60,align:"center",fixed:"left",filterDisable:"before"},{title:"用户名",key:"account",width:120,render:function(t,n){var i=n.row;n.column,n.index;return t("div",[t("Button",{props:{type:"text",size:"small"},style:{paddingLeft:0},on:{click:function(){alert(e.msg)}}},i.account)])}},{title:"用户昵称",width:120,key:"name"},{title:"用户工号",width:120,key:"id"},{title:"手机号",width:120,key:"mobile"},{title:"审核状态",width:120,key:"auditStatus"},{title:"是否启用",width:120,key:"isActive",render:function(e,t){var n=t.row,i=(t.column,t.index,n.isActive);return e("div",[e("span",{class:1==i?["ligth-blue"]:["text-red"]},1==i?"启用":"禁用")])}},{title:"a",width:120,key:"a"},{title:"aa",width:120,key:"aa"},{title:"aaa",width:120,key:"aaa"},{title:"b",width:120,key:"b"},{title:"bb",width:120,key:"bb"},{title:"bbb",width:120,key:"bbb"},{title:"c",width:120,key:"c"},{title:"cc",width:120,key:"cc"},{title:"ccc",width:120,key:"ccc"},{title:"d",width:120,key:"d"},{title:"dd",width:120,key:"dd"},{title:"ddd",width:120,key:"ddd"},{title:"e",width:120,key:"e"},{title:"ee",width:120,key:"ee"},{title:"eee",width:120,key:"eee"},{title:"f",width:120,key:"f"},{title:"ff",width:120,key:"ff"},{title:"fff",width:120,key:"fff"},{title:"g",width:120,key:"g"},{title:"gg",width:120,key:"gg"},{title:"ggg",width:120,key:"ggg"},{title:"操作",key:"action",width:170,fixed:"right",filterDisable:"after",render:function(e,t){var n=t.row,i=(t.column,t.index,n.id),a=n.isActive;return e("div",[e("Button",{props:{type:"text",size:"small"},style:{marginRight:"5px"},on:{click:function(){alert("编辑项的id:"+i)}}},"编辑"),e("Button",{props:{type:"text",size:"small"},on:{click:function(){1==a&&alert("禁用项的id:"+i),0==a&&alert("启用项的id:"+i)}}},1==a?"禁用":"启用"),e("Button",{props:{type:"text",size:"small"},on:{click:function(){alert("删除项的id:"+i)}}},"删除")])}}],showTable:!0,pageBackConfig:{mode:"back"},pageFrontConfig:{mode:"front"},pageNoConfig:!1}},watch:{fetchURL:function(){this.resetTable()},data:function(e){}},created:function(){i.a.setUserInfo({account:"admin"})},mounted:function(){this.loadFT()},methods:{resetTable:function(){var e=this;this.showTable=!1,this.$nextTick(function(){e.showTable=!0,e.$nextTick(function(){e.loadFT()})})},handleBackPage:function(){this.pageConfig=window._.cloneDeep(this.pageBackConfig),this.fetchURL="/backPage"},handleFrontPage:function(){this.pageConfig=window._.cloneDeep(this.pageFrontConfig),this.fetchURL="/frontPage"},handleNoPage:function(){this.pageConfig=this.pageNoConfig,this.fetchURL="/noPage"},handleOnDataChange:function(e){this.data=e},switchCMode:function(){this.$set(this.filterConfig,"mode","check")},switchTMode:function(){this.$set(this.filterConfig,"mode","transfer")},handlerAdd:function(){alert("添加一条内容")},handlerBatchDel:function(){alert("要删除的项id为："+(this.ids.length?this.ids:"--"))},loadFT:function(){var e=this,t=this.fetchURL;this.fetchConfig={url:t,params:{},callback:function(t){e.msg="请求成功！"}}}}}},98:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(31),a=n.n(i),s=n(113),r=n.n(s),o=n(107),l=n.n(o),c=n(109),f=n.n(c),u=n(173),h=n.n(u),d=n(100),g=n(13),p=n(28),m=n(29),C=n(101);t.default={name:"FuncTable",model:{prop:"fetchConfig",event:"on-fetch-config-change"},components:{CTransfer:h.a},props:{data:{type:Array,default:function(){return[]}},columns:{type:Array,default:function(){return[]}},size:{validator:function(e){return window.util.oneOf(e,["small","large","default"])}},width:{type:[Number,String]},height:{type:[Number,String]},stripe:{type:Boolean,default:!1},border:{type:Boolean,default:!1},showHeader:{type:Boolean,default:!0},highlightRow:{type:Boolean,default:!1},rowClassName:{type:Function,default:function(){return""}},context:{type:Object},noDataText:{type:String},noFilteredDataText:{type:String},disabledHover:{type:Boolean},loading:{type:Boolean,default:!1},ids:{type:[Array],default:function(){return[]}},refreshable:{type:[Boolean],default:!0},editConfig:{type:[Object,Boolean],default:!1},searchConfig:{type:[Object,Boolean],default:!1},pageConfig:{type:[Object,Boolean],default:!1},filterConfig:{type:[Object,Boolean],default:!1},fetchConfig:{type:Object,default:function(){return{}}},id:{type:String,default:""}},data:function(){return{selectedData:[],spin:!1,dataBeforeFilter:[],pageSize:10,page:1,total:0,url:"",params:{},forceUpdateSign:{flag:!1,page:0},filteredColumns:this.columns,tableColumnsChecked:[],defaultKeys:["page","size"],titles:["可选字段","已选字段"],modalTransfer:{show:!1,title:"自定义列表",exist:!1},transferRightList:[],targetKeys:[],transferData:[],keysToSave:[],configColumnsKey:null,searchInput:"",refreshTable:!0}},computed:{disabledSelections:function(){var e={before:[],after:[]};return this.columns.filter(function(e,t,n){return e.hasOwnProperty("filterDisable")}).map(function(t,n,i){switch(t.filterDisable){case"before":e.before.push(t.key||t.type);break;case"after":e.after.push(t.key||t.type)}}),e},checkList:function(){var e=this,t=f()(this.columns).map(function(t){return e.formatColumnsItemLabel(t)});return this.tableColumnsChecked=t,t},isCheckMode:function(){return"check"===this.filterConfig.mode},isTransferMode:function(){return"transfer"===this.filterConfig.mode},isFrontPage:function(){return"front"===this.pageConfig.mode}},watch:{columns:{handler:function(e){this.filteredColumns=e},deep:!0},selectedData:function(e){this.emitSelectionChange(e)},"forceUpdateSign.flag":function(e){var t=this.$refs.page;t.currentPage=this.forceUpdateSign.page,t.$forceUpdate()},filteredColumns:function(e){if(!window._.some(e,["fixWidth",!0])){var t=e.findIndex(function(e){return e.fixed&&"right"===e.fixed});e.splice(t,0,{fixWidth:!0,key:window.Null,title:" "})}},tableColumnsChecked:function(e,t){window._.reject(e,this.isDisabled).length||(this.tableColumnsChecked=t,this.$Message.warning("请至少保留一条有效列内容！"),this.triggerClick(t)),this.isCheckMode&&(this.filteredColumns=this.getTable2Columns())},"modalTransfer.show":function(e){var t=this;e?(this.getFullColumns(),this.getTargetKey()):(this.$refs.CTransfer.reset(),this.$nextTick(function(){setTimeout(function(){t.$set(t.modalTransfer,"exist",!1)},300)}))},fetchConfig:{handler:function(e){this.refreshTable=!0,this.pageConfig&&this.resetPage(),this.$emit("on-fetch-config-change",e),this.load()},deep:!0}},created:function(){},mounted:function(){(this.isCheckMode||this.isTransferMode)&&this.fillTableColumns()},methods:{setPagePosition:function(e){var t=void 0;switch(e){case"right":t={textAlign:"right"};break;case"middle":t={textAlign:"center"};break;case"left":t={textAlign:"left"};break;default:t={textAlign:"right"}}return t},pageChange:function(e){this.page=e,this.isFrontPage?this.filterInFront():this.load()},pageSizeChange:function(e){this.pageSize=e,this.isFrontPage?this.filterInFront():this.load()},setTotal:function(e){this.total=e},params2Str:function(e){var t="",n=l()(e),i=0,s=!0,o=!1,c=void 0;try{for(var f,u=a()(n);!(s=(f=u.next()).done);s=!0){var h=f.value,d=r()(h,2),g=d[0],p=d[1];this.defaultKeys.includes(g)||p&&(t+=(0===i?"?":"&")+g+"="+encodeURIComponent(p),i++)}}catch(e){o=!0,c=e}finally{try{!s&&u.return&&u.return()}finally{if(o)throw c}}return t},switchSign:function(e){this.forceUpdateSign.flag=!this.forceUpdateSign.flag,this.forceUpdateSign.page=e},refresh:function(){this.resetSelectedData(),this.refreshTable=!0,this.pageConfig&&1!==this.page&&this.$set(this.fetchConfig.params,"page",1),this.$set(this.fetchConfig,"refreshFlag",!this.fetchConfig.refreshFlag||!this.fetchConfig.refreshFlag)},deletePageAndSizeInConfig:function(){delete this.fetchConfig.params.page,delete this.fetchConfig.params.pageSize},load:function(){var e=this.fetchConfig;if(e&&(e.url&&(this.url=e.url),e.params&&(this.params=e.params,window._.isInteger(e.params.page)&&(this.page=e.params.page,this.switchSign(e.params.page)),window._.isInteger(e.params.pageSize)&&(this.pageSize=e.params.pageSize))),this.updateSearchKey())return!1;var t=this.params2Str(this.params);this.spin=!0,this.pageConfig?this.isFrontPage?this.refreshTable?this.fetchWithoutPage(t):this.filterDataByPage():this.fetchWithPage(t):this.fetchWithoutPage(t)},filterDataByPage:function(){var e=this,t=window._.chunk(this.dataBeforeFilter,this.pageSize),n=t[this.page-1];this.$nextTick(function(){e.$emit("on-data-change",n),e.spin=!1})},fetchWithPage:function(e){var t=this,n=g.a.analysisPage(this.page);this.$http.get(this.url+e+(e?"&":"?")+"page="+n+"&size="+this.pageSize).then(function(e){t.fetchConfig.callback&&t.fetchConfig.callback(e),t.refreshTable=!1,t.deletePageAndSizeInConfig();var n=e,i=window._.get(n,C.a.page.content);i.map(function(e){t.ids.includes(e.id)&&(e._checked=!0)}),t.updateDataBeforeFilter(i),t.$emit("on-data-change",i),t.total=window._.get(n,C.a.page.total),t.emitTotal(t.total)}).catch(function(e){t.$Message.error("请求错误；错误信息："+e)}).then(function(){t.spin=!1})},fetchWithoutPage:function(e){var t=this;this.$http.get(this.url+e).then(function(e){t.refreshTable=!1,t.deletePageAndSizeInConfig();var n=e,i=window._.get(n,C.a.data,n);t.updateDataBeforeFilter(i),t.fetchConfig.callback&&t.fetchConfig.callback(e),t.isFrontPage?(t.total=t.dataBeforeFilter.length,t.filterDataByPage()):t.$emit("on-data-change",i)}).catch(function(e){t.$Message.error("请求错误；错误信息："+e)}).then(function(){t.spin=!1})},updateDataBeforeFilter:function(e){this.dataBeforeFilter=e},clearStorage:function(){d.a.clearColumnsKey()},checkDisabled:function(e){if(this.disabledSelections.before.includes(e)||this.disabledSelections.after.includes(e))return!0},emitTotal:function(e){this.$emit("on-total-change",e)},getTable2Columns:function(){var e=this,t=g.a.fullCopyObj(this.columns),n=[];return t.forEach(function(t){e.tableColumnsChecked.includes("多选")&&"selection"===t.type&&n.push(t),e.tableColumnsChecked.includes(t.title)&&n.push(t)}),n},fillTableColumns:function(){var e=this;if(this.updateConfigColumnsKey(),Array.isArray(this.configColumnsKey)){var t=[];this.configColumnsKey.map(function(n,i,a){var s=e.columns.find(function(e,t,i){return(e.key||e.type)===n});t.push(s)}),this.filteredColumns=t}else this.filteredColumns=this.getTable2Columns();this.$refs.table.$forceUpdate()},updateConfigColumnsKey:function(){this.configColumnsKey=d.a.getColumnsKey(this.id)},toggleFav:function(e){this.tableData2[e].fav=0===this.filteredData[e].fav?1:0},resetSelectedData:function(){this.selectedData=[]},setSelectedData:function(e){this.selectedData=e},emitCurrentChange:function(e,t){this.$emit("on-current-change",e,t)},emitSelect:function(e,t){this.$emit("on-select",e,t)},emitSelectCancel:function(e,t){this.$emit("on-select-cancel",e,t)},emitSelectAll:function(e){this.$emit("on-select-all",e)},emitSelectionChange:function(e){this.$emit("on-selection-change",e)},emitSortChange:function(e,t,n){this.$emit("on-sort-change",e,t,n)},emitFilterChange:function(e){this.$emit("on-filter-change",e)},emitRowClick:function(e,t){this.$emit("on-row-click",e,t)},emitRowDblclick:function(e,t){this.$emit("on-row-dblclick",e,t)},emitExpand:function(e,t){this.$emit("on-expand",e,t)},triggerClick:function(e){var t=window._.reject(e,this.isDisabled)[0],n=this.checkList.indexOf(t),i=this.$refs["check"+n][0].$el,a=i.querySelectorAll("input")[0];p.a.trigger(a,"click"),this.$refs["check"+n][0].$forceUpdate()},isDisabled:function(e){return this.disabledSelections.before.includes(e)||this.disabledSelections.after.includes(e)},showModalTransfer:function(){var e=this;this.$set(this.modalTransfer,"exist",!0),this.$nextTick(function(){e.$set(e.modalTransfer,"show",!0)},0)},saveColumnsConfig:function(){this.$refs.CTransfer.emit(),this.setTargetKey()},getFullColumns:function(){this.transferData=this.changeColumns2Transfer(this.columns)},getTargetKey:function(){this.configColumnsKey?this.targetKeys=this.configColumnsKey:this.targetKeys=this.changeColumns2Transfer(this.filteredColumns).map(function(e,t){return e.key})},setTargetKey:function(){var e=d.a.getColumnsKey()||{},t=m.a.getUserInfo().account;e[t]||(e[t]={}),e[t][this.id]=this.keysToSave,d.a.setColumnsKey(e),this.fillTableColumns()},changeColumns2Transfer:function(e){var t=this,n=this.disabledSelections.before,i=this.disabledSelections.after;return e.map(function(e,a){return{key:t.formatColumnsItemKey(e),label:t.formatColumnsItemLabel(e)+t.formatColumnsItemKey(e),disabled:n.includes(e.key)||n.includes(e.type)||i.includes(e.key)||i.includes(e.type)}})},handleRightDataChange:function(e){var t=[];e.map(function(e,n,i){e&&t.push(e.key)}),this.keysToSave=t},changeTransfer2Columns:function(e){var t=this,n=[];e.map(function(e,i,a){var s=t.columns.find(function(t,n,i){return(t.key||t.type)===e.key});n.push(s)}),this.filteredColumns=n},exportData:function(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1]},formatColumnsItemLabel:function(e){return e.title||("selection"===e.type?"多选":"--")},formatColumnsItemKey:function(e){return e.key||e.type},resetPage:function(){this.page=1,this.$refs.page.currentPage=1},doSearch:function(e){this.pageConfig&&!this.isFrontPage?(this.resetPage(),this.updateSearchKey()):this.isFrontPage&&1!==this.page?this.resetPage():this.filterInFront()},filterInFront:function(){var e=this,t=this.dataBeforeFilter.filter(function(t){return String(t[e.searchConfig.key]).includes(e.searchInput)});this.isFrontPage?(this.total=t.length,this.$emit("on-data-change",window._.chunk(t,this.pageSize)[this.page-1])):this.$emit("on-data-change",t)},updateSearchKey:function(){var e=!1,t=this.searchConfig.key;return this.searchConfig?(t&&this.fetchConfig.params[t]!==this.searchInput&&(this.$set(this.fetchConfig.params,t,this.searchInput),e=!0),e):e}}}},99:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(30),a=n.n(i),s=n(31),r=n.n(s),o=n(13),l=n(28);t.default={name:"CTransfer",model:{prop:"targetKeys",event:"on-target-keys-change"},props:{data:{type:Array,required:!0,default:function(){return[{key:"1",label:"内容1",disabled:!1},{key:"2",label:"内容2",disabled:!1},{key:"3",label:"内容3",disabled:!1}]}},targetKeys:{type:Array,required:!1,default:function(){return[]}},titles:{type:Array,required:!1,default:function(){return["源列表","目的列表"]}},operations:{type:Array,required:!1,default:function(){return["向左移动","向右移动"]}},disabledSelections:{type:Object,required:!1,default:function(){return{before:[],after:[]}}}},data:function(){return{listStyle:{width:"250px",height:"300px"},selectedKeys:[],label:"",selectedIndex:null,itemClassName:"ivu-transfer-list-content-item",orderedRightData:null}},computed:{},watch:{targetKeys:function(e){var t=this,n=[];e.map(function(e,i,a){var s=t.data.find(function(t,n,i){return t.key===e});n.push(s)}),this.orderedRightData=n}},mounted:function(){this.$refs.Transfer.$el.querySelectorAll(".ivu-transfer-list")[1].querySelector(".ivu-transfer-list-content").addEventListener("click",this.handleClick.bind(this))},beforeDestroy:function(){this.$refs.Transfer.$el.querySelectorAll(".ivu-transfer-list")[1].querySelector(".ivu-transfer-list-content").removeEventListener("click",this.handleClick.bind(this))},methods:{handleClick:function(e){var t=this,n=e.target;if("SPAN"===n.tagName&&(n=l.a.parent(n)),"INPUT"!==n.tagName&&n.querySelector("input").disabled)return!1;if(l.a.hasClass(n,this.itemClassName))if(l.a.hasClass(n,"active"))l.a.removeClass(n,"active"),this.label="",this.clearSelectedIndex();else{l.a.addClass(n,"active"),this.label=l.a.getInnerText(n.getElementsByTagName("span")[0]);var i=l.a.siblings(n).filter(function(e){return l.a.hasClass(e,t.itemClassName)}),a=!0,s=!1,o=void 0;try{for(var c,f=r()(i);!(a=(c=f.next()).done);a=!0){var u=c.value;l.a.removeClass(u,"active")}}catch(e){s=!0,o=e}finally{try{!a&&f.return&&f.return()}finally{if(s)throw o}}this.getSelectedIndex(n)}},reset:function(){this.orderedRightData=null;var e=this.getSelectedItem().selectedItem;e&&l.a.removeClass(e,"active"),this.selectedIndex=null,this.selectedKeys.length=null},render:function(e){return e.label},onChange:function(e,t,n){var i=this;"right"===t&&(e=_.difference(e,n).concat(n)),e.map(function(e,t,n){if(i.disabledSelections.after.includes(e)&&t!==n.length-1){var a=e;n.splice(t,1),n.push(a)}}),this.$emit("on-target-keys-change",e)},getSelectedItem:function(){var e=this.$refs.Transfer,t=e.$el,n=t.querySelectorAll(".ivu-transfer-list")[1].querySelectorAll(".ivu-transfer-list-content .ivu-transfer-list-content-item");return{switchList:n,selectedItem:null!=this.selectedIndex?n[this.selectedIndex]:null}},goUp:function(){if(null===this.selectedIndex)return!1;var e=this.getSelectedItem().switchList,t=this.getSelectedItem().selectedItem,n=l.a.text(t);0!==a()(e).indexOf(t)&&(l.a.prev(t).querySelector("input").disabled||(l.a.before(t,e[this.selectedIndex-1]),this.selectedIndex-=1,this.orderTransferRightData(n,"up")))},goDown:function(){if(null===this.selectedIndex)return!1;var e=this.getSelectedItem().switchList,t=this.getSelectedItem().selectedItem,n=l.a.text(t);a()(e).indexOf(t)!==e.length-1&&(l.a.next(t).querySelector("input").disabled||(l.a.after(t,e[this.selectedIndex+1]),this.selectedIndex+=1,this.orderTransferRightData(n,"down")))},orderTransferRightData:function(e,t){var n=this.$refs.Transfer.rightData,i=n.findIndex(function(t,n,i){return o.a.trim(e)===t.label}),a=void 0;switch(t){case"up":a=n[i],n[i]=n[i-1],n[i-1]=a;break;case"down":a=n[i],n[i]=n[i+1],n[i+1]=a}this.orderedRightData=n,this.$forceUpdate()},emit:function(){this.$emit("on-right-data-change",this.orderedRightData)},getSelectedIndex:function(e){this.selectedIndex=a()(e.parentNode.children).indexOf(e)},clearSelectedIndex:function(){this.selectedIndex=null}}}}},[103]);
//# sourceMappingURL=app.df07fcb2761ae2924257.js.map