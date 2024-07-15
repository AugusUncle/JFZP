(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/message/chat"],{

/***/ 361:
/*!***************************************************************************************************!*\
  !*** /Users/cuibing/Documents/HBuilderProjects/JFZP_v1/main.js?{"page":"pages%2Fmessage%2Fchat"} ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _chat = _interopRequireDefault(__webpack_require__(/*! ./pages/message/chat.vue */ 362));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_chat.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 362:
/*!********************************************************************************!*\
  !*** /Users/cuibing/Documents/HBuilderProjects/JFZP_v1/pages/message/chat.vue ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chat_vue_vue_type_template_id_042db559___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat.vue?vue&type=template&id=042db559& */ 363);
/* harmony import */ var _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chat.vue?vue&type=script&lang=js& */ 365);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _chat_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chat.vue?vue&type=style&index=0&lang=css& */ 367);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 34);

var renderjs





/* normalize component */

var component = Object(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _chat_vue_vue_type_template_id_042db559___WEBPACK_IMPORTED_MODULE_0__["render"],
  _chat_vue_vue_type_template_id_042db559___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _chat_vue_vue_type_template_id_042db559___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/message/chat.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 363:
/*!***************************************************************************************************************!*\
  !*** /Users/cuibing/Documents/HBuilderProjects/JFZP_v1/pages/message/chat.vue?vue&type=template&id=042db559& ***!
  \***************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_042db559___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.vue?vue&type=template&id=042db559& */ 364);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_042db559___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_042db559___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_042db559___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_template_id_042db559___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 364:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/cuibing/Documents/HBuilderProjects/JFZP_v1/pages/message/chat.vue?vue&type=template&id=042db559& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 365:
/*!*********************************************************************************************************!*\
  !*** /Users/cuibing/Documents/HBuilderProjects/JFZP_v1/pages/message/chat.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.vue?vue&type=script&lang=js& */ 366);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 366:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/cuibing/Documents/HBuilderProjects/JFZP_v1/pages/message/chat.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(__webpack_require__(/*! ../../uni_modules/uview-ui/libs/config/config */ 69));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  data: function data() {
    return {
      plusShow: true,
      keyShow: false,
      recordShow: false,
      textShow: true,
      focus: false,
      send_show: true,
      exit_show: false,
      voice: true,
      voice_play: false,
      messages: [],
      // 保存聊天消息的数组
      newMessage: '',
      // 用户输入的新消息
      userInfo: '',
      id: '',
      msgType: 1,
      name: '',
      img: '',
      currentUser: {},
      token: '',
      recording: false,
      // showDurationPopup: false,
      // showCancelPopup: false,
      recordingDuration: 0,
      recorderManager: null,
      startY: 0,
      movingY: 0,
      pop: false,
      tmpRecords: "",
      startTime: 0,
      voiceTime: '',
      isLong: false,
      // 是否长大于宽，
      sessionId: '',
      sessionType: 1,
      jobId: ''
    };
  },
  mounted: function mounted() {
    var _this = this;
    // 消息页面加载时从本地存储获取消息记录
    var storedMessages = uni.getStorageSync('chatMessages_' + this.userInfo.id);
    if (storedMessages) {
      this.messages = storedMessages;
    }
    this.scrollToBottom();

    // 音频获取 RecorderManager 对象
    this.recorderManager = uni.getRecorderManager();

    // 监听录音结束事件
    this.recorderManager.onStop(function (res) {
      var duration = res.duration,
        tempFilePath = res.tempFilePath;
      _this.recordingDuration = Math.floor(duration);
      // this.showDurationPopup = true;
      _this.tmpRecords = tempFilePath;
      console.log("录音", tempFilePath);
      // 在这里可以将 tempFilePath 上传到服务器
      // console.log("移动",this.movingY)
      // if (this.movingY < -50) {
      // 	this.cancelRecord()
      // 	console.log("取消了~")
      // } else {
      // 	console.log("取消了111~")
      // 	let arr = new Array()
      // 	arr.push(this.tmpRecords)
      // 	this.sendImage(arr)
      // }
      _this.sendVoice();
    });
  },
  onLoad: function onLoad(options) {
    console.log("options", options);
    this.userInfo = options;
    this.sessionType = options.type;
    this.jobId = options.jobId;
    console.log("jobId", options.jobId);
    this.setTitle(this.userInfo.name);
    // this.connectSocket()
    this.sendOneMessage();
    this.id = uni.getStorageSync("userId");
    this.receiveMessage();
    this.getUserInfo();
    this.token = uni.getStorageSync("token");
  },
  onUnload: function onUnload() {
    this.sendCloseMsg();
  },
  methods: {
    iconChange: function iconChange() {
      this.plusShow = this.plusShow ? false : true;
      this.keyShow = this.keyShow ? false : true;
    },
    inputChange: function inputChange() {
      this.recordShow = this.recordShow ? false : true;
      this.textShow = this.textShow ? false : true;
      this.keyShow = false;
      this.plusShow = true;
    },
    sendTextMsg: function sendTextMsg() {
      this.msgType = 1;
      this.sendMessage();
    },
    sendCloseMsg: function sendCloseMsg() {
      var newMsg = {
        sendId: this.id,
        type: 2,
        content: "关闭消息"
      };
      var self = this;
      // 发送消息
      uni.sendSocketMessage({
        data: JSON.stringify(newMsg),
        // 要发送的消息内容
        success: function success(res) {
          console.log('关闭消息发送成功', res);
          self.stopHeartBeat();
        },
        fail: function fail(err) {
          console.error('关闭消息发送失败', err);
        }
      });
    },
    sendMessage: function sendMessage() {
      // this.focus = true
      if (this.newMessage.trim() !== '') {
        var newMsg = {
          sendId: this.id,
          receiveId: this.userInfo.id,
          content: this.newMessage.trim(),
          type: 3,
          msgType: this.msgType,
          sessionId: this.userInfo.sessionId,
          times: this.voiceTime,
          sessionType: this.sessionType,
          jobId: this.jobId
        };
        console.log("消息", newMsg);
        console.log("消息session", this.userInfo.sessionId);

        // 发送消息
        uni.sendSocketMessage({
          data: JSON.stringify(newMsg),
          // 要发送的消息内容
          success: function success(res) {
            console.log('消息发送成功', res);
          },
          fail: function fail(err) {
            console.error('消息发送失败', err);
          }
        });

        // 将新消息添加到数组中
        this.messages.push(newMsg);
        console.log("存储前", newMsg);
        // 将更新后的消息记录存储到本地
        uni.setStorageSync('chatMessages_' + this.userInfo.id, this.messages);
        console.log("已缓存", this.messages);
        this.scrollToBottom();
        this.newMessage = ''; // 清空输入框

        var storedMessages = uni.getStorageSync('chatMessages_' + this.userInfo.id);
        if (storedMessages) {
          this.messages = storedMessages;
          this.messages.forEach(function (message) {
            message.voice = true;
          });
        }
      }
    },
    receiveMessage: function receiveMessage() {
      // 监听 WebSocket 接收消息事件
      var self = this;
      uni.onSocketMessage(function (res) {
        var arr = JSON.parse(res.data);
        console.log('收到服务器消息：', arr);
        if (arr.isSystem === 1 && arr.type === 1) {
          if (arr.sessionId) {
            self.setSession(arr.sessionId);
          }
          console.log("sessionID", arr.sessionId);
        } else if (arr.isSystem === 0 && arr.type !== 5) {
          self.cacheMsg(arr);
          self.readMessage(arr.id);
          console.log('缓存了');
        } else if (arr.isSystem === 1 && arr.type === 2) {
          self.closeSocket();
        }
      });
    },
    big: function big(url) {
      console.log(url);
      var arr = new Array();
      arr.push(url);
      uni.previewImage({
        urls: arr
      });
    },
    //已读回执消息
    readMessage: function readMessage(id) {
      var newMsg = {
        id: id,
        content: "已读消息",
        sessionId: this.userInfo.sessionId,
        type: 5
      };
      console.log("消息", newMsg);

      // 发送消息
      uni.sendSocketMessage({
        data: JSON.stringify(newMsg),
        // 要发送的消息内容
        success: function success(res) {
          console.log('已读消息发送成功', res);
        },
        fail: function fail(err) {
          console.error('已读消息发送失败', err);
        }
      });
    },
    setSession: function setSession(id) {
      console.log("sessionID111", id);
      this.userInfo.sessionId = id;
    },
    setTitle: function setTitle(name) {
      if (name) {
        uni.setNavigationBarTitle({
          title: name
        });
      }
    },
    chooseImg: function chooseImg() {
      var self = this;
      this.msgType = 2;
      uni.chooseImage({
        count: 6,
        //默认9
        sizeType: ['original', 'compressed'],
        //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'],
        //从相册选择
        success: function success(res) {
          console.log(JSON.stringify(res.tempFilePaths));
          self.sendImage(res.tempFilePaths);
        }
      });
    },
    sendImage: function sendImage(arr) {
      var _this2 = this;
      console.log(arr);
      var self = this;
      arr.forEach(function (img) {
        uni.uploadFile({
          url: _this2.reqUrl + "/file/upload",
          filePath: img,
          name: 'file',
          // 服务端接收的字段名
          formData: _this2.formData,
          header: {
            'Authorization': _this2.token
          },
          success: function success(uploadRes) {
            console.log("uploadRes", uploadRes.statusCode);
            if (uploadRes.statusCode === 200) {
              _this2.newMessage = JSON.parse(uploadRes.data).data;
              console.log(JSON.parse(uploadRes.data).data);
              self.sendMessage();
            } else {
              uni.showToast({
                title: '上传失败！',
                icon: 'error'
              });
            }
          },
          fail: function fail(error) {
            console.error('上传失败', error);
            // 处理上传失败的逻辑
          }
        });
      });
    },
    cacheMsg: function cacheMsg(arr) {
      arr.voice = true;
      // 	if (arr.msgType === 3) {
      // 		const indexOfEqualSign = arr.content.indexOf('=');
      // 		const numberAfterEqualSign = arr.content.substr(indexOfEqualSign + 1);
      // 		const durationTime = parseInt(numberAfterEqualSign, 10) / 1000;

      // 		arr.time = durationTime.toFixed(0)
      // 	}

      this.messages.push(arr);
      uni.setStorageSync('chatMessages_' + this.userInfo.id, this.messages);
      this.scrollToBottom();
    },
    connectSocket: function connectSocket() {
      var _this3 = this;
      return new Promise(function (resolve, reject) {
        var self = _this3;
        // 在页面中打开 WebSocket 连接
        uni.connectSocket({
          url: _this3.webSocket,
          // WebSocket服务器地址
          header: {
            "Authorization": _this3.token
          },
          success: function success(res) {
            console.log('WebSocket连接成功', res);
            self.heartMsg();
            // setTimeout(() => {
            // self.registerMessage();
            // }, 400); // 这里延迟执行2秒，可以根据需要调整延迟时间
            setTimeout(function () {
              console.log('Method A execution completed.');
              resolve(); // 当方法A执行完成时调用resolve
            }, 1000); // 这里模拟一个异步操作，例如耗时2秒
          },
          fail: function fail(err) {
            console.error('WebSocket连接失败', err);
          }
        });
      });
    },
    sendOneMessage: function sendOneMessage() {
      var _this4 = this;
      this.connectSocket().then(function () {
        _this4.registerMessage();
      });
    },
    stopHeartBeat: function stopHeartBeat() {
      clearInterval(this.heartBeatInterval); // 清除心跳定时器
    },
    heartMsg: function heartMsg() {
      var _this5 = this;
      var self = this;
      this.heartBeatInterval = setInterval(function () {
        var newMsg = {
          sendId: _this5.id,
          content: "心跳消息",
          sessionId: _this5.userInfo.sessionId,
          type: 0
        };

        // 发送消息
        uni.sendSocketMessage({
          data: JSON.stringify(newMsg),
          // 要发送的消息内容
          success: function success(res) {
            console.log('心跳消息发送成功', res);
          },
          fail: function fail(err) {
            console.error('心跳消息发送失败', err);
            self.stopHeartBeat();
          }
        });
      }, 10000); // 每隔5秒发送一次心跳消息
    },
    registerMessage: function registerMessage() {
      var newMsg = {
        sendId: this.id,
        receiveId: this.userInfo.id,
        type: 1,
        sessionType: this.sessionType,
        jobId: this.jobId
      };
      console.log("注册消息发送内容", newMsg);

      // 发送消息
      uni.sendSocketMessage({
        data: JSON.stringify(newMsg),
        // 要发送的消息内容
        success: function success(res) {
          console.log('注册消息发送成功', res);
          // this.userInfo.sessionId = res.data.data
        },
        fail: function fail(err) {
          console.error('注册消息发送失败', err);
          console.error('注册消息data', newMsg);
          this.registerMessage();
        }
      });
    },
    closeSocket: function closeSocket() {
      uni.closeSocket({
        success: function success(res) {
          console.log('WebSocket连接已关闭', res);
          // self.stopHeartBeat()
        },
        fail: function fail(err) {
          console.error('WebSocket关闭失败', err);
        }
      });
    },
    getUserInfo: function getUserInfo() {
      var _this6 = this;
      var token = uni.getStorageSync("token");
      uni.request({
        url: this.reqUrl + "/userInfo",
        method: 'GET',
        header: {
          'Authorization': token
        },
        success: function success(res) {
          if (res.data.code === 200) {
            _this6.currentUser = res.data.data;
          }
        }
      });
    },
    scrollToBottom: function scrollToBottom() {
      setTimeout(function () {
        uni.pageScrollTo({
          scrollTop: 9999,
          duration: 0
        });
      }, 100); // 设置一个适当的延迟时间，例如100毫秒
    },
    startRecord: function startRecord(event) {
      // 记录开始触摸的位置
      this.startY = event.touches[0].clientY;
      this.pop = true;

      // 开始录音
      this.recording = true;
      this.startTime = Date.now();
      this.startTime = new Date().getTime();
      console.log("开始录音~");
      //消息类型
      this.msgType = 3;

      // 开始录音
      this.recorderManager.start({
        format: 'mp3' // 录音的格式
      });
    },
    sendVoice: function sendVoice() {
      if (this.movingY < -50) {
        console.log("移动", this.movingY);
        this.cancelRecord();
        console.log("取消了1111~");
      } else {
        var arr = new Array();
        console.log("取消了111222~");
        arr.push(this.tmpRecords);
        this.sendImage(arr);
      }
      this.movingY = 0;
    },
    stopRecord: function stopRecord() {
      // 结束录音

      this.recording = false;
      this.recorderManager.stop();
      this.pop = false;
      this.send_show = true;
      this.exit_show = false;
      var endTime = Date.now() - this.startTime;
      this.voiceTime = (endTime / 1000).toFixed(0);
      console.log("录音结束");
    },
    cancelRecord: function cancelRecord() {
      // 取消录音
      this.recording = false;
      console.log("录音取消");
      // this.showCancelPopup = true;
      this.recorderManager.stop(); // 停止录音
    },
    touchMove: function touchMove(event) {
      if (!this.recording) return;

      // 计算手指移动的距离
      this.movingY = event.touches[0].clientY - this.startY;
      console.log("移动距离", this.movingY);

      // 如果手指上滑超过一定距离，显示取消录音的弹框
      if (this.movingY < -50) {
        // this.showCancelPopup = true;

        this.exit_show = true;
        this.send_show = false;
      } else {
        // this.showCancelPopup = false;

        this.exit_show = false;
        this.send_show = true;
      }
    },
    //播放语音
    voicePlay: function voicePlay(voiceUrl, index) {
      var _this7 = this;
      console.log("语音播放", voiceUrl);
      var innerAudioContext = uni.createInnerAudioContext();
      this.voice = false;
      this.messages[index].voice_play = true;
      this.messages[index].voice = false;
      innerAudioContext.autoplay = true;
      innerAudioContext.src = voiceUrl;
      //开始播放
      innerAudioContext.onPlay(function () {
        console.log('开始播放');
      });
      innerAudioContext.onCanplay(function () {
        var duration = innerAudioContext.duration;
        console.log('音频时长：', duration);
        console.log('音频时长：', innerAudioContext);
      });

      //播放结束
      innerAudioContext.onEnded(function (res) {
        _this7.voice = true;
        _this7.messages[index].voice_play = false;
        _this7.messages[index].voice = true;
      });
      //播放错误
      innerAudioContext.onError(function (res) {
        console.log(res.errMsg);
        console.log(res.errCode);
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 367:
/*!*****************************************************************************************************************!*\
  !*** /Users/cuibing/Documents/HBuilderProjects/JFZP_v1/pages/message/chat.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.vue?vue&type=style&index=0&lang=css& */ 368);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 368:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/cuibing/Documents/HBuilderProjects/JFZP_v1/pages/message/chat.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[361,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/chat.js.map