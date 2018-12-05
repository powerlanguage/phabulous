/* --- See README.md for instructions on how to use this file --- */

/* --- Update this section --- */

// Your slack email forward
// https://get.slack.help/hc/en-us/articles/206819278-Send-emails-to-Slack
var SLACK_FORWARD_ADDRESS = "FILL_ME_IN";

// Your username
var MY_LDAP = "FILL_ME_IN";

// The native gmail label you created
var PHABRICATOR_GMAIL_LABEL = "FILL_ME_IN";

// How many conversations should gmail fetch at a time
var BATCH_SIZE = 10;

// Recipients that you don't want notifications for (e.g. noisy groups)
var IGNORED = ["FILL_ME_IN"];

/* --- Leave this section --- */


var main =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _classCallCheck; });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _createClass; });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ }),

/***/ "./src/EmailHandler.ts":
/*!*****************************!*\
  !*** ./src/EmailHandler.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EmailHandler; });
/* harmony import */ var _Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
var EmailHandler=/*#__PURE__*/function(){function EmailHandler(){Object(_Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this,EmailHandler);this.handlers=[];}Object(_Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(EmailHandler,[{key:"addHandler",value:function addHandler(handler){this.handlers.push(handler);}},{key:"handleEmail",value:function handleEmail(email){for(var i=0;i<this.handlers.length;++i){var handler=this.handlers[i];var handled=handler(email);if(handled){return;}}}}]);return EmailHandler;}();

/***/ }),

/***/ "./src/EmailParser.ts":
/*!****************************!*\
  !*** ./src/EmailParser.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EmailParser; });
/* harmony import */ var _Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
var EmailParser=/*#__PURE__*/function(){function EmailParser(){Object(_Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this,EmailParser);this.parsers=[];}Object(_Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(EmailParser,[{key:"addParser",value:function addParser(parser){this.parsers.push(parser);}},{key:"parseEmail",value:function parseEmail(email){for(var i=0;i<this.parsers.length;++i){var parser=this.parsers[i];var parsedEmail=parser(email);if(parsedEmail){return parsedEmail;}}return null;}}]);return EmailParser;}();

/***/ }),

/***/ "./src/Emailer.ts":
/*!************************!*\
  !*** ./src/Emailer.ts ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Emailer; });
/* harmony import */ var _Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
var MAX_SUBJECT_LENGTH=200;var Emailer=/*#__PURE__*/function(){function Emailer(){Object(_Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this,Emailer);}Object(_Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Emailer,null,[{key:"send",value:function send(_ref){var subject=_ref.subject,body=_ref.body;var sanitizedSubject=subject.length>MAX_SUBJECT_LENGTH?"".concat(subject.substr(MAX_SUBJECT_LENGTH-1),"\u2026"):subject;GmailApp.sendEmail(SLACK_FORWARD_ADDRESS,sanitizedSubject,body);}}]);return Emailer;}();

/***/ }),

/***/ "./src/Fetcher.ts":
/*!************************!*\
  !*** ./src/Fetcher.ts ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Fetcher; });
/* harmony import */ var _Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
var Fetcher=/*#__PURE__*/function(){function Fetcher(){Object(_Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this,Fetcher);}Object(_Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Fetcher,null,[{key:"fetchEmailThreads",value:function fetchEmailThreads(){var query="label:"+PHABRICATOR_GMAIL_LABEL+" AND label:unread";return GmailApp.search(query,0,BATCH_SIZE);}}]);return Fetcher;}();

/***/ }),

/***/ "./src/emails/PhabricatorEmail.ts":
/*!****************************************!*\
  !*** ./src/emails/PhabricatorEmail.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhabricatorEmail; });
/* harmony import */ var _Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
var PHAB_TO_REGEX=/To: ([a-zA-Z0-9 \t,#-_]*)/;var PHAB_CC_REGEX=/Cc: ([a-zA-Z0-9 \t,#-_]*)/;var SENDER_REGEX=/^"?(\w*)/;var ACTIONS_REGEX=/([\s\S]*?)[\n\r][\n\r]/;var TITLE_REGEX=/: (.*)/;var URL_REGEX=/REVISION DETAIL\s*(https:\/\/phabricator.*.com\/.*)/;var TRACKED_ACTIONS=["requested review","added a comment","added inline comments","accepted this revision","requested changes to this revision"];var PhabricatorEmail=/*#__PURE__*/function(){Object(_Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(PhabricatorEmail,null,[{key:"parseEmail",value:function parseEmail(email){if(email.getFrom().indexOf("phabricator@internal.pinterest.com")!==-1){return new PhabricatorEmail(email);}return null;}}]);function PhabricatorEmail(email){Object(_Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this,PhabricatorEmail);this.body=email.getBody();this.from=email.getFrom();this.subject=email.getSubject();this.phabricatorTo=this.convertRecipientsStringToArray(this.checkRegex(PHAB_TO_REGEX,this.body,"PHAB TO:"));this.phabricatorCC=this.convertRecipientsStringToArray(this.checkRegex(PHAB_CC_REGEX,this.body,"PHAB CC:"));// This whole thing works because of the below assumption that the first
// person in the To: field is the diff author.
this.diffOwner=this.phabricatorTo[0];this.sender=this.checkRegex(SENDER_REGEX,this.from,"SENDER");this.diffTitle=this.checkRegex(TITLE_REGEX,this.subject,"TITLE");this.diffUrl=this.checkRegex(URL_REGEX,this.body,"URL");this.shouldIgnore=this.shouldIgnoreAnyRecipient(this.phabricatorTo);this.actions=this.filterActions(this.checkRegex(ACTIONS_REGEX,this.body,"ACTIONS"),this.sender);this.formattedActions=this.formatActions(this.actions);}Object(_Users_btraut_code_phabulous_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(PhabricatorEmail,[{key:"checkRegex",value:function checkRegex(pattern,target,type){var match=pattern.exec(target);if(match&&match.length){return match[1];}else{return"UNKNOWN "+type;}}// Takes multiple lines of actions and filter to ones that begin with the
// sender's name and that we track. This allows the message sent to slack to be
// more descriptive.
},{key:"filterActions",value:function filterActions(actions,sender){return actions.split("\n").filter(function(action){return action.indexOf(sender)===0;}).reduce(function(acc,action){TRACKED_ACTIONS.forEach(function(trackedAction){if(action.indexOf(trackedAction)!==-1){// TODO: use a string map for more naturally readable actions
acc.push(trackedAction);}});return acc;},[]);}},{key:"formatActions",value:function formatActions(actions){if(actions&&actions.length>0){var vistedActions={};return actions.filter(function(action){if(vistedActions[action]){return false;}vistedActions[action]=true;return true;}).join(", ").toLowerCase().replace(/,(?=[^,]*$)/," and");}else{return"";}}},{key:"convertRecipientsStringToArray",value:function convertRecipientsStringToArray(phabString){return phabString.trim().split(",").map(function(item){return item.trim();});}},{key:"shouldIgnoreAnyRecipient",value:function shouldIgnoreAnyRecipient(recipients){for(var i=0;i<IGNORED.length;i++){if(recipients.indexOf(IGNORED[i])>-1){return true;}}return false;}},{key:"isBuildMessage",get:function get(){return this.sender==="jenkins"||this.sender==="Phabricator"&&this.body.indexOf("Harbormaster")>-1;}}]);return PhabricatorEmail;}();

/***/ }),

/***/ "./src/handlers/notifyForMyDiffsHandler.ts":
/*!*************************************************!*\
  !*** ./src/handlers/notifyForMyDiffsHandler.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emails_PhabricatorEmail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../emails/PhabricatorEmail */ "./src/emails/PhabricatorEmail.ts");
/* harmony import */ var _Emailer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Emailer */ "./src/Emailer.ts");
/* harmony default export */ __webpack_exports__["default"] = (function(email){// If I own this diff, notify me of everything (except builds).
if(email instanceof _emails_PhabricatorEmail__WEBPACK_IMPORTED_MODULE_0__["default"]&&email.diffOwner===MY_LDAP&&!email.isBuildMessage){_Emailer__WEBPACK_IMPORTED_MODULE_1__["default"].send({subject:"".concat(email.sender," ").concat(email.formattedActions,": ").concat(email.diffTitle),body:email.diffUrl});return true;}return false;});

/***/ }),

/***/ "./src/handlers/notifyForRequestForReview.ts":
/*!***************************************************!*\
  !*** ./src/handlers/notifyForRequestForReview.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emails_PhabricatorEmail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../emails/PhabricatorEmail */ "./src/emails/PhabricatorEmail.ts");
/* harmony import */ var _Emailer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Emailer */ "./src/Emailer.ts");
/* harmony default export */ __webpack_exports__["default"] = (function(email){// If I don't own this diff and recipient is not ignored, notify me of
// requests for review.
if(email instanceof _emails_PhabricatorEmail__WEBPACK_IMPORTED_MODULE_0__["default"]&&email.diffOwner!==MY_LDAP&&!email.shouldIgnore&&email.formattedActions.indexOf("requested review")>-1){_Emailer__WEBPACK_IMPORTED_MODULE_1__["default"].send({subject:"".concat(email.sender," ").concat(email.formattedActions,": ").concat(email.diffTitle),body:email.diffUrl});return true;}return false;});

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: phabulous */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "phabulous", function() { return phabulous; });
/* harmony import */ var _Fetcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Fetcher */ "./src/Fetcher.ts");
/* harmony import */ var _EmailParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EmailParser */ "./src/EmailParser.ts");
/* harmony import */ var _EmailHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EmailHandler */ "./src/EmailHandler.ts");
/* harmony import */ var _emails_PhabricatorEmail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./emails/PhabricatorEmail */ "./src/emails/PhabricatorEmail.ts");
/* harmony import */ var _handlers_notifyForMyDiffsHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./handlers/notifyForMyDiffsHandler */ "./src/handlers/notifyForMyDiffsHandler.ts");
/* harmony import */ var _handlers_notifyForRequestForReview__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./handlers/notifyForRequestForReview */ "./src/handlers/notifyForRequestForReview.ts");
var phabulous=function phabulous(){// Create a parser and add the email types we'd like to support. For now,
// that's just Phabricator emails.
var emailParser=new _EmailParser__WEBPACK_IMPORTED_MODULE_1__["default"]();emailParser.addParser(_emails_PhabricatorEmail__WEBPACK_IMPORTED_MODULE_3__["default"].parseEmail);// Create a handler and add some Phabricator email handlers.
var emailHandler=new _EmailHandler__WEBPACK_IMPORTED_MODULE_2__["default"]();emailHandler.addHandler(_handlers_notifyForMyDiffsHandler__WEBPACK_IMPORTED_MODULE_4__["default"]);emailHandler.addHandler(_handlers_notifyForRequestForReview__WEBPACK_IMPORTED_MODULE_5__["default"]);// Fetch mail from Gmail and proccess it into new messages.
_Fetcher__WEBPACK_IMPORTED_MODULE_0__["default"].fetchEmailThreads().forEach(function(thread){thread.getMessages().filter(function(email){return email.isUnread();}).forEach(function(email){var parsedEmail=emailParser.parseEmail(email);emailHandler.handleEmail(parsedEmail);email.markRead();});});};

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/btraut/code/phabulous/src/index.ts */"./src/index.ts");


/***/ })

/******/ });

function run() {
  main.phabulous();
}
