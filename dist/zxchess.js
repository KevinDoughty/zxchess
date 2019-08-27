(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ZXChess"] = factory();
	else
		root["ZXChess"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./source/game.js":
/*!************************!*\
  !*** ./source/game.js ***!
  \************************/
/*! exports provided: exportFen, importFen, cv, ucv */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"exportFen\", function() { return exportFen; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"importFen\", function() { return importFen; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cv\", function() { return cv; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ucv\", function() { return ucv; });\n\nvar Game = {\n\t//////////////////////////////////////\n\n\t/*\n \tzxua : function(w) { // multi-dimensional array copy\n \tvar i;\n \tif (i=w.length) {\n \t\tvar a=[];\n \t\twhile (i--) a[i]= this.zxq(w[i]);\n \t\treturn a\n \t}\n \treturn w\n },\n \tzxa : function(w) { // multi-dimensional array copy, MUST be passed an array with NUMBERS not strings\n \tif (w[0].length) {\n \t\tvar i=w.length,a=[];\n \t\twhile(i--) a[i] = this.zxa(w[i]);\n \t\treturn a\n \t}\n \treturn w.slice()\n },\n */\n\n\tzxm: function zxm(n, h, l, debug) {\n\t\t// DUPLICATE !!! also in rules.js\n\t\t//console.log(\"zxm h:\"+h+';')\n\t\tif (!Array.isArray(h)) throw new Error(\"this is not an array:\" + h);\n\t\tvar i = h.length;\n\t\twhile (i--) {\n\t\t\tif (h[i] === n) {\n\t\t\t\tif (typeof l === \"undefined\" || l === null) h.splice(i, 1);else h.splice(i, 1, l);\n\t\t\t\treturn;\n\t\t\t}\n\t\t}\n\n\t\tconsole.log(\"zxm piece:%s; not found in:%s; insert:%s;\", n, JSON.stringify(h), l);\n\t\treturn true;\n\t},\n\n\ttrim: function trim(w) {\n\t\treturn w.replace(/^\\s+|\\s+$/, \"\");\n\t},\n\tcv: function cv(s) {\n\t\t// convert // 0x88// number to letters .... remember long ago you had a problem when the number was actually a string\n\t\treturn \"abcdefgh\".charAt(s & 7) + ((s >> 4) + 1); //return \"abcdefgh\".charAt((s%8))+(((s>>3)-8)*-1)\n\t},\n\tvucv: function vucv(j) {\n\t\t// VALIDATE unconvert // for user input, letters to number 0xx88 // used by fen import, anything else?\n\t\tif (j.length == 2 && j.charCodeAt(0) > 96 && j.charCodeAt(0) < 105 && j[1] * 1 == j[1]) return this.ucv(j);\n\t\treturn -1;\n\t},\n\tucv: function ucv(j) {\n\t\t// unconvert // 0x88 // letters to number\n\t\treturn j.charCodeAt(0) - 97 + (j.charAt(1) - 1) * 16;\n\t},\n\tzg: function zg(w) {\n\t\t// zap gremlins. convert all funky spaces to regular, actually converts anything not ascii word, slash or dash.\n\t\treturn w.replace(/[^\\w\\/-]/g, \" \");\n\t\t//rnbqk2r/pp2bppp/2p1pn2/2Pp4/1P1PP3/P1N2N2/1B3PPP/R2QKB1RÊwÊKQkqÊ-Ê3Ê10\n\t},\n\n\t/*\n fen : function(fen) {\n \t\tvar P = fenPos(fen)\n \tif (P) {\n \t\tthis.T = [{S:[P],p:0,s:0}];\n \t\tthis.b = 0\n \t\tthis.s = 0\n \t\tthis.sub(P) // needs conditional check for php board !!!!!!!!\n \t} else console.log (\"fen failed for some reason\");\n },\n \tsub : function(P) {\n \tvar i,p,B=P.B\n \tfor (i in B) {\n \t\tp = B[i];\n \t\tthis.isp((p&16)>>4,(p&8)>>3,p&7,i*1) // initSinglePiece //  color, unpromote, value, location\n \t}\n },\n \tisp : function(c,u,v,l) { // WRONG //  color, unpromote, value, location\n \tvar L\n \tif (l>-1) L=this.S[l].firstChild\n \tif (L) p = new ZX.Piece(this,c,u,v,l,L)//,null,u)\n \telse p = new ZX.Piece(this,c,u,v,l,null,'zxp '+this.n) // this !!!\n \tthis.P.push(p.p) // !!! wrong\n },\n */\n\n\tfen: function fen(_fen) {\n\t\tvar F = this.trim(this.zg(_fen)),\n\t\t    a = F.split(/\\s/g),\n\t\t    x = 0,\n\t\t    t,\n\t\t    k = 0,\n\t\t    h,\n\t\t    n,\n\t\t    e,\n\t\t    p,\n\t\t    B = {},\n\t\t    A = [[[], [], [], [], [], []], [[], [], [], [], [], []]];\n\t\tif (a.length == 6) {\n\t\t\tvar m = a[0].split(/\\//); // fen board\n\t\t\tif (m.length == 8) {\n\t\t\t\th = a[4] * 1;\n\t\t\t\tn = a[5] * 1;\n\t\t\t\tif (a[3] == \"-\") e = 0;else e = this.vucv(a[3]);\n\t\t\t\tif (a[0].match(/[^pnbrqk\\/1-8]/i) || \"wb\".indexOf(a[1]) < 0 || a[2] != \"-\" && a[2].match(/[^KQkq]/) || h != a[4] || h < 0 || n != a[5] || n < 0 || e < 0) return;\n\t\t\t\tt = a[1] == 'b' ? 1 : 0;\n\t\t\t\tif (a[2].indexOf(\"K\") >= 0) k += 1;\n\t\t\t\tif (a[2].indexOf(\"Q\") >= 0) k += 2;\n\t\t\t\tif (a[2].indexOf(\"k\") >= 0) k += 4;\n\t\t\t\tif (a[2].indexOf(\"q\") >= 0) k += 8;\n\t\t\t\tp = (n - 1) * 2 + t; // ply / step\n\t\t\t\tvar v,\n\t\t\t\t    c,\n\t\t\t\t    q,\n\t\t\t\t    f,\n\t\t\t\t    r = 0,\n\t\t\t\t    w = 0,\n\t\t\t\t    b = 0,\n\t\t\t\t    i = 8,\n\t\t\t\t    j,\n\t\t\t\t    l,\n\t\t\t\t    N = 0;\n\t\t\t\twhile (i--) {\n\t\t\t\t\t// not strict would probably need some checks here\n\t\t\t\t\tf = 0;\n\t\t\t\t\tfor (j = 0; j < m[i].length; j++) {\n\t\t\t\t\t\tl = m[i][j];\n\t\t\t\t\t\tif (l * 1 == l) f += l * 1; //\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t\tq = f + r * 16;\n\t\t\t\t\t\t\t\tif (v = \"PNBRQK\".indexOf(l) + 1) c = 0; // index is 0-5 not 1-6\n\t\t\t\t\t\t\t\telse if (v = \"pnbrqk\".indexOf(l) + 1) c = 1; // index is  0-5 not 1-6\n\t\t\t\t\t\t\t\t\telse return; // strict // except allows illegal number of pieces other than kings\n\t\t\t\t\t\t\t\tif (v == 6 && (c && ++b > 1 || !c && ++w > 1)) return; // strict // too many kings\n\t\t\t\t\t\t\t\tB[q] = (N++ << 5) + c * 16 + v; // Now with NUMBERING // fen says nothing about promoted pawn. bfen & bpgn is different\n\t\t\t\t\t\t\t\tA[c][v - 1].push(q);\n\t\t\t\t\t\t\t\tf++;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tr++;\n\t\t\t\t}\n\t\t\t} else return; // improperly formatted fen\n\t\t} else return; // improperly formatted fen\n\t\tif (!w || !b) return; // missing king\n\t\tvar z = 0; // zobrist not done\n\t\treturn { B: B, p: p, k: k, e: e, h: h, z: z, M: [] };\n\t\t// what about step/start offset ???\n\t\t// that should be stored in the branch, shouldn't it?\n\t\t// start offset is pure branch array info\n\t\t// but FEN stores move, so ply should be included in position!\n\t},\n\n\tncn: function ncn(P, O) {\n\t\t// create notation // CHESS SPECIFIC !!! // P= current position after setM, O=previous position if disambiguation needed\n\t\t// uses new crazy m bitwise shifted move representation\n\t\t// O = previous position if disambiguation needed.\n\t\t// pass previous position to check for da\n\t\t// Actually, ctm() only counts this.R.ip() but does not consider pinned pieces which do not require da.\n\t\t// but there are some savings by counting ip() in ctm()\n\t\t//if (d) console.log('ncn da needed');\n\t\tvar N = \"  NBRQK\",\n\t\t    R = \"abcdefgh\"; // internationalize !!!\n\t\tvar m = P.m,\n\t\t    r = m & 31,\n\t\t    v = r & 7,\n\t\t    f = m >> 5 & 127,\n\t\t    t = m >> 12 & 127,\n\t\t    u = m >> 19 & 7,\n\t\t    ch = m >> 26 & 1,\n\t\t    cm = m >> 27 & 1,\n\t\t    x = m >> 22 & 1,\n\t\t    e = m >> 23 & 1,\n\t\t    U = '',\n\t\t    L = N[v],\n\t\t    X = x || e ? \"x\" : \"\",\n\t\t    C = \"\",\n\t\t    D = \"\",\n\t\t    T;\n\t\tT = this.cv(t);\n\t\tif (cm) C = \"#\";else if (ch) C = \"+\";\n\t\tif (v == 6) {\n\t\t\tif (m >> 24 & 1) return \"O-O\" + C;\n\t\t\tif (m >> 25 & 1) return \"O-O-O\" + C;\n\t\t} else if (v == 1) {\n\t\t\tL = x || e ? R[f & 7] : '';\n\t\t\tif (u) U = '=' + N[u];\n\t\t} else if (O) {\n\t\t\tD = this.da(O, f, t, r >> 4 & 1, v);\n\t\t}\n\t\treturn L + D + X + T + U + C;\n\t},\n\n\tda: function da(P, f, t, c, v) {\n\t\t// disambiguation // might be better placed elsewhere. probably rules.\n\t\t// needs previous position.\n\t\t// also, disambiguation is determined to be needed in ctm() !!! can I just calculate once ?!\n\t\t// it's a little different and complicated to tie together.\n\t\t// currently called from ncn() which is called from atnb() on movelist build.\n\t\t// you do NOT want to do this for every movelist !!!\n\t\t// P should also store SAN representation.\n\t\t// that means switching language requires re-parsing pgn,\n\t\t// but that would be less common than more than one movelist... or would it?\n\t\t// ncn() in ctm() !!!\n\t\t//console.log('DA')\n\t\tvar R = \"87654321\",\n\t\t    C = \"abcdefgh\"; // internationalize !!!!\n\t\tvar A = P.A[c][v - 1],\n\t\t    i = A.length,\n\t\t    L = [],\n\t\t    x = 0,\n\t\t    y = 0,\n\t\t    fc = f & 7,\n\t\t    fr = f >> 4;\n\t\twhile (i--) {\n\t\t\tif (A[i] != f && this.il(A[i], t, P)) L.push(A[i]); // don't check piece that was moved (A[i]!=f)\n\t\t}\n\t\tif (i = L.length) {\n\t\t\twhile (i--) {\n\t\t\t\tif (L[i] >> 4 == fr) y++;\n\t\t\t\tif ((L[i] & 7) == fc) x++;\n\t\t\t}\n\t\t\tif (x && y) return C[fc] + R[fr];\n\t\t\tif (x) return R[fr];\n\t\t\treturn C[fc];\n\t\t}\n\t\treturn \"\"; // da not needed.\n\t}\n};\n\nvar exportFen = function exportFen(P) {\n\t//(B,G) {\n\tvar B = P.B;\n\tvar e = 0,\n\t    l,\n\t    k = '',\n\t    q,\n\t    f = '',\n\t    h = P.p;\n\tfor (var r = 7; r > -1; r--) {\n\t\tif (e > 0) {\n\t\t\tf += e;\n\t\t\te = 0;\n\t\t}\n\t\tif (r < 7) f += '/';\n\t\tfor (var c = 0; c < 8; c++) {\n\t\t\tq = B[c + r * 16];\n\t\t\tif (q == null) {\n\t\t\t\te++;\n\t\t\t} else {\n\t\t\t\tif (e > 0) f += e;\n\t\t\t\te = 0;\n\t\t\t\tl = \" pnbrqk\".charAt(q & 7);\n\t\t\t\tif (q & 16) f += l;else f += l.toUpperCase();\n\t\t\t}\n\t\t}\n\t}\n\tif (e > 0) f += e;\n\tf += ' ' + (h & 1 ? 'b' : 'w') + ' ';\n\tvar kc = P.k;\n\tif (kc & 1) k += 'K';\n\tif (kc & 2) k += 'Q';\n\tif (kc & 4) k += 'k';\n\tif (kc & 8) k += 'q';\n\tf += (k == '' ? '-' : k) + ' ';\n\tf += (P.e ? this.cv(P.e) : '-') + ' ' + P.h + ' ' + (Math.floor(h / 2) + 1);\n\treturn f;\n};\n\nvar importFen = function importFen(string) {\n\treturn Game.fen(string);\n};\nvar cv = Game.cv;\nvar ucv = Game.ucv;\n\n//# sourceURL=webpack://ZXChess/./source/game.js?");

/***/ }),

/***/ "./source/index.js":
/*!*************************!*\
  !*** ./source/index.js ***!
  \*************************/
/*! exports provided: everyPossiblePosition, isLegal, allLegal, isUncheckedPieceMove, calculateLegal, isUncheckedPawnMove, isCheck, hasLegalMove, isLegalCastling, exportFen, importFen, cv, ucv */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rules_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rules.js */ \"./source/rules.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"everyPossiblePosition\", function() { return _rules_js__WEBPACK_IMPORTED_MODULE_0__[\"everyPossiblePosition\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"isLegal\", function() { return _rules_js__WEBPACK_IMPORTED_MODULE_0__[\"isLegal\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"allLegal\", function() { return _rules_js__WEBPACK_IMPORTED_MODULE_0__[\"allLegal\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"isUncheckedPieceMove\", function() { return _rules_js__WEBPACK_IMPORTED_MODULE_0__[\"isUncheckedPieceMove\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"calculateLegal\", function() { return _rules_js__WEBPACK_IMPORTED_MODULE_0__[\"calculateLegal\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"isUncheckedPawnMove\", function() { return _rules_js__WEBPACK_IMPORTED_MODULE_0__[\"isUncheckedPawnMove\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"isCheck\", function() { return _rules_js__WEBPACK_IMPORTED_MODULE_0__[\"isCheck\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"hasLegalMove\", function() { return _rules_js__WEBPACK_IMPORTED_MODULE_0__[\"hasLegalMove\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"isLegalCastling\", function() { return _rules_js__WEBPACK_IMPORTED_MODULE_0__[\"isLegalCastling\"]; });\n\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game.js */ \"./source/game.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"exportFen\", function() { return _game_js__WEBPACK_IMPORTED_MODULE_1__[\"exportFen\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"importFen\", function() { return _game_js__WEBPACK_IMPORTED_MODULE_1__[\"importFen\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"cv\", function() { return _game_js__WEBPACK_IMPORTED_MODULE_1__[\"cv\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ucv\", function() { return _game_js__WEBPACK_IMPORTED_MODULE_1__[\"ucv\"]; });\n\n\n\n\n// import { importFen, cv, ucv } from \"./game.js\";\n// import { isLegal, allLegal } from \"./rules.js\";\n// import { pgnParse } from \"./pgn.js\";\n//\n//\n// //const position = importFen(\"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1\");\n// const position = importFen(\"k7/8/8/3p4/8/8/4p1K1/8 b - - 1 3\");\n// console.log(\"position:%s;\",JSON.stringify(position));\n//\n//\n// const from = ucv(\"e2\");\n// const to = ucv(\"e4\");\n// const ok = isLegal(from,to,position);\n// console.log(\"from:%s;\",from);\n// console.log(\"to:%s;\",to);\n// console.log(\"isLegal:%s;\",JSON.stringify(ok));\n//\n// const all = allLegal(from, position);\n//\n// console.log(\"allLegal:%s;\",JSON.stringify(all));\n//\n//\n// const pgn = \"1. e4 e5 { comment } 2. Nf3 Nc6 (2...d5) 3. Bb6 { another comment } a6\";\n// const result = pgnParse(pgn);\n// console.log(JSON.stringify(result));\n\n//# sourceURL=webpack://ZXChess/./source/index.js?");

/***/ }),

/***/ "./source/rules.js":
/*!*************************!*\
  !*** ./source/rules.js ***!
  \*************************/
/*! exports provided: everyPossiblePosition, isLegal, allLegal, isUncheckedPieceMove, calculateLegal, isUncheckedPawnMove, isCheck, hasLegalMove, isLegalCastling */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"everyPossiblePosition\", function() { return everyPossiblePosition; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isLegal\", function() { return isLegal; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"allLegal\", function() { return allLegal; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isUncheckedPieceMove\", function() { return isUncheckedPieceMove; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calculateLegal\", function() { return calculateLegal; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isUncheckedPawnMove\", function() { return isUncheckedPawnMove; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isCheck\", function() { return isCheck; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasLegalMove\", function() { return hasLegalMove; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isLegalCastling\", function() { return isLegalCastling; });\n// Position:\n// {B:B,p:p,k:k,e:e,h:h,z:z,M:[],A:A,D:[[],[]]}\n// Board,ply,kingcastling,enpassanttargetsquare,halfmove(fiftymove)count,zobrist,Alive,Dead\n\n//rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1\n//{\"B\":{\"0\":4,\"1\":34,\"2\":67,\"3\":101,\"4\":134,\"5\":163,\"6\":194,\"7\":228,\"16\":257,\"17\":289,\"18\":321,\"19\":353,\"20\":385,\"21\":417,\"22\":449,\"23\":481,\"96\":529,\"97\":561,\"98\":593,\"99\":625,\"100\":657,\"101\":689,\"102\":721,\"103\":753,\"112\":788,\"113\":818,\"114\":851,\"115\":885,\"116\":918,\"117\":947,\"118\":978,\"119\":1012},\n//\"p\":0,\"k\":15,\"e\":0,\"h\":0,\"z\":0,\"M\":[]}\n\nvar AttackArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 40, 0, 0, 40, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 40, 0, 0, 0, 0, 48, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 48, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 48, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 4, 48, 4, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 104, 112, 104, 4, 0, 0, 0, 0, 0, 0, 48, 48, 48, 48, 48, 48, 112, 0, 112, 48, 48, 48, 48, 48, 48, 0, 0, 0, 0, 0, 0, 4, 104, 112, 104, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 4, 48, 4, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 48, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 48, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 48, 0, 0, 0, 0, 40, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 40, 0, 0, 40, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    DeltaArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, -17, 0, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, 0, -15, 0, 0, -17, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, -15, 0, 0, 0, 0, -17, 0, 0, 0, 0, -16, 0, 0, 0, 0, -15, 0, 0, 0, 0, 0, 0, -17, 0, 0, 0, -16, 0, 0, 0, -15, 0, 0, 0, 0, 0, 0, 0, 0, -17, 0, 0, -16, 0, 0, -15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -17, -33, -16, -31, -15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -18, -17, -16, -15, -14, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 14, 15, 16, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 31, 16, 33, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 16, 0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 16, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 16, 0, 0, 0, 0, 17, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 17, 0, 0, 15, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n    MoveArray = [[1, 16, 15, 17], [6, -16, -17, -15], [18, 33, 31, 14, -31, -33, -18, -14], [-15, -17, 15, 17], [-1, -16, 1, 16], [-15, -17, 15, 17, -1, -16, 1, 16]],\n    il = function il(f, t, P) {\n\t// is legal move (from, to, Position)\n\tvar c,\n\t    p = P.p,\n\t    h = p & 1,\n\t    B = P.B,\n\t    r = B[f]; //color,ply,h=turn,Board,rawpiece\n\tif (r) {\n\t\t// if piece exists at that square\n\t\tc = r >> 4 & 1;\n\t\tif (c == h && ip(f, t, P)) {\n\t\t\treturn cl(f, t, P); // return NEW POSITION\n\t\t}\n\t}\n},\n    cl = function cl(f, t, P) {\n\t// calculate legal // (trim legal) move already determined to be a correct piece move & right turn, now test for check\n\tvar B = P.B,\n\t    r = B[f],\n\t    c = r >> 4 & 1;\n\tvar N = setP(f, t, P),\n\t    k = kl(c, N);\n\tif (!aa(c ^ 1, k, N)) return N; // return NEW POSITION\n},\n    ip = function ip(f, t, P) {\n\t// is unchecked piece move (from, to, Position)\n\tvar B = P.B,\n\t    r = B[f],\n\t    v = r & 7;\n\tswitch (v) {\n\t\tcase 1:\n\t\t\treturn pm(f, t, P);\n\t\tcase 6:\n\t\t\tif (Math.abs(t - f) == 2) return kc(f, t, P);\n\t\t\treturn ik(f, t, P);\n\t}\n\treturn ig(f, t, P);\n},\n    pm = function pm(f, t, P) {\n\t// is unchecked pawn move\n\tvar B = P.B,\n\t    r = B[f],\n\t    c = r >> 4 & 1,\n\t    m = MoveArray[c],\n\t    d = m[1];\n\tif (t == f + d) return !B[t];\n\tif (t == f + d + d) return f >> 4 == m[0] && !B[f + d] && !B[t];\n\tif (t == f + m[2] || t == f + m[3]) return cc(c, t, B, 1) || P.e == t; // 0x88 check not needed\n},\n    ik = function ik(f, t, P) {\n\t// is unchecked king regular move // split off of ip() because I thought pgn might need it... but I think I'm just going to call ip() from pgn.\n\tvar B = P.B,\n\t    r = B[f],\n\t    c = r >> 4 & 1;\n\treturn AttackArray[t - f + 128] >> 6 & 1 && cc(c, t, B); // 0x88 check not needed\n},\n    kc = function kc(f, t, P) {\n\t// is legal castle (from, to, Position)\n\tvar B = P.B,\n\t    r = B[f],\n\t    c = r >> 4 & 1,\n\t    e = c ^ 1,\n\t    x = f > t,\n\t    d = x * -2 + 1,\n\t    b = 1 << x << c * 2;\n\tif (f != c * 112 + 4 || !(P.k & b)) return;\n\treturn !(B[f + d] || B[t] || x && B[f - 3] || aa(e, f, P) || aa(e, f + d, P)); // \"to\" square is checked in trim.\n},\n    kl = function kl(c, P) {\n\t// king loc (color,Position) // I might strip this out\n\tvar B = P.B,\n\t    f;\n\tfor (f in B) {\n\t\tvar r = B[f],\n\t\t    C = r >> 4 & 1,\n\t\t    v = r & 7;\n\t\tif (C === c && v === 6) return f * 1;\n\t}\n},\n    cc = function cc(C, t, B, p) {\n\t// check color (color,to,Board,ispawn)\n\tvar r = B[t],\n\t    c = r >> 4 & 1;\n\tif (r) return C != c;\n\treturn !p;\n},\n    aa = function aa(e, k, P) {\n\t// any piece is attacking (enemycolor,kingloc,Position)\n\tvar B = P.B,\n\t    f;\n\tfor (f in B) {\n\t\tvar r = B[f],\n\t\t    c = r >> 4 & 1;\n\t\tif (c === e && ia(f * 1, k, P)) {\n\t\t\treturn 1;\n\t\t}\n\t}\n\t// return false implied\n},\n    ia = function ia(f, t, P) {\n\t// is attacking (from, to, Position)\n\tvar B = P.B,\n\t    r = B[f],\n\t    v = r & 7;\n\tif (v === 1) {\n\t\t// pawns. ep check not needed, for testing check.\n\t\tvar M = MoveArray[r >> 4 & 1];\n\t\treturn t === f + M[2] || t === f + M[3]; // 0x88 check not needed\n\t}\n\tif (v === 6) return !(t & 0x88) && AttackArray[t - f + 128] >> v & 1;\n\treturn ig(f, t, P); // doesn't need checkcolor in is legal generic move, but whatever...\n},\n    ig = function ig(f, t, P) {\n\t// is legal generic move\n\tvar B = P.B,\n\t    r = B[f],\n\t    v = r & 7,\n\t    a = t - f + 128,\n\t    d; // attackArrayIndex, delta\n\tif (!(t & 0x88) && AttackArray[a] >> v & 1) {\n\t\td = DeltaArray[a];\n\t\tf += d;\n\t\tif (f != t) do {\n\t\t\tif (B[f]) return;\n\t\t\tf += d;\n\t\t} while (f != t);\n\t\treturn cc(r >> 4 & 1, t, B);\n\t}\n\t// return false implied\n},\n\n\n// THESE SHOULD BE COMBINED. NO NEED TO CALC HAS ANY LEGAL MOVE SEVERAL TIMES.\nic = function ic(P) {\n\t// is check // called in setM() to determine check\n\tvar p = P.p,\n\t    h = p & 1,\n\t    k = kl(h, P);\n\treturn aa(h ^ 1, k, P);\n},\n    im = function im(P) {\n\t// is mate // not used\n\tif (!hl(P)) return ic(P);\n\t// return false implied\n},\n    is = function is(P) {\n\t// is stalemate // not used\n\tif (!hl(P)) return !ic(P);\n},\n    hl = function hl(P) {\n\t// has legal move // called in setM() to determine check\n\tvar B = P.B,\n\t    h = P.p & 1,\n\t    f; // Boardarray, h=turn, rawpiece, A=alive pieces, current pieces, M=all moves\n\tfor (f in B) {\n\t\tvar r = B[f],\n\t\t    c = r >> 4 & 1;\n\t\tif (c !== h) {\n\t\t\tvar M = al(f * 1, P);\n\t\t\tif (M.length) return 1;\n\t\t}\n\t}\n\t// return false implied\n},\n    al = function al(f, P) {\n\t// all legal squares (from, Position) // DOES NOT INCLUDE PROMOTION, not sufficient for perft\n\tvar B = P.B,\n\t    r = B[f],\n\t    c = r >> 4 & 1,\n\t    v = r & 7,\n\t    h = P.p & 1,\n\t    M; // Board, rawpiece, color, value, h=turn, M=allMoves\n\tif (c == h) {\n\t\tswitch (v) {\n\t\t\tcase 6:\n\t\t\t\t// king\n\t\t\t\tM = ak(f, P);\n\t\t\t\tbreak;\n\t\t\tcase 1:\n\t\t\t\tM = ap(f, P);\n\t\t\t\tbreak;\n\t\t\tdefault:\n\t\t\t\tM = ag(f, P);\n\t\t}\n\t\treturn tm(M, f, P); // trim !\n\t}\n\treturn [];\n},\n    ap = function ap(f, P) {\n\t// all unchecked pawn moves (from, Position)\n\tvar B = P.B,\n\t    r = B[f],\n\t    c = r >> 4 & 1,\n\t    U = [],\n\t    M = MoveArray[c],\n\t    d = M[1],\n\t    l = f + M[2],\n\t    r = f + M[3],\n\t    e = P.e; // Board, rawpiece, color, U=allUntrimmedMoves (returned), M=pawn directions, d=direction(from M),l=left(from M),r=right(from M), e= ep target square\n\tif (!B[f + d]) {\n\t\tU.push(f + d);\n\t\tif (f >> 4 == M[0] && !B[f + d + d]) U.push(f + d + d);\n\t}\n\tif (!(l & 0x88) && (cc(c, l, B, 1) || l == e)) U.push(l); // 0x88 check is needed\n\tif (!(r & 0x88) && (cc(c, r, B, 1) || r == e)) U.push(r); // 0x88 check is needed\n\treturn U;\n},\n    ak = function ak(f, P) {\n\t// all unchecked king moves (from, Position)\n\tvar B = P.B,\n\t    r = B[f],\n\t    c = r >> 4 & 1,\n\t    D = MoveArray[5],\n\t    i = 8,\n\t    d,\n\t    t,\n\t    M = []; // Board, rawpiece, color, value, D = piece Direction array (just using queen, it's the same, and do not confuse with Delta array), i = Direction length, d = individual direction, t= to square, M=allMoves\n\twhile (i--) {\n\t\td = D[i];\n\t\tt = f + d;\n\t\tif (!(t & 0x88) && AttackArray[t - f + 128] >> 6 & 1 && cc(c, t, B)) M.push(t); // do I need 0x88 check when using Attack Array?\n\t}\n\tif (kc(f, f + 2, P)) M.push(f + 2);\n\tif (kc(f, f - 2, P)) M.push(f - 2);\n\treturn M;\n},\n    ag = function ag(f, P) {\n\tvar B = P.B,\n\t    r = B[f],\n\t    c = r >> 4 & 1,\n\t    v = r & 7,\n\t    D = MoveArray[v],\n\t    t,\n\t    d,\n\t    i = D.length,\n\t    M = []; // Board, rawpiece, color, value, Directions (move array), t=to square, d=individual delta, i = move array length, M=allUntrimmedMoves\n\twhile (i--) {\n\t\td = D[i];\n\t\tt = f + d;\n\t\twhile (!(t & 0x88) && AttackArray[t - f + 128] >> v & 1 && !B[t]) {\n\t\t\tM.push(t);\n\t\t\tt += d;\n\t\t}\n\t\tif (!(t & 0x88) && AttackArray[t - f + 128] >> v & 1 && cc(c, t, B)) M.push(t);\n\t}\n\treturn M;\n},\n    tm = function tm(U, f, P) {\n\t// trim moves (Untrimmed, from, Position)\n\tvar B = P.B,\n\t    r = B[f],\n\t    c = r >> 4 & 1,\n\t    e = c ^ 1,\n\t    k,\n\t    t,\n\t    i = U.length,\n\t    M = [],\n\t    N; // Board, rawpiece, color, enemycolor, kingloc, to, i=Untrimmed length, M= allTrimmedMoves, N=newPosition\n\twhile (i--) {\n\t\tt = U[i];\n\t\tN = setP(f, t, P); // Do not need to deal with promoting pawns, will not effect if my king is in check\n\t\tk = kl(c, N);\n\t\tif (!aa(e, k, N)) M.push(U[i]);\n\t}\n\treturn M;\n},\n    cp = function cp(P, t) {\n\t// can promote // current position, moved to // used in ald() or ald2()\n\tvar B = P.B,\n\t    r = B[t],\n\t    c = r >> 4 & 1;\n\treturn (r & 7) == 1 && (!c && t >> 4 == 7 || c && t >> 4 == 0);\n},\n    setP = function setP(f, t, P) {\n\t// set Position // return position json // from 0x88, to 0x88, (promote value Moved to setM) // move has already been determined to be legal, except for \"possible\" and \"any\" moves, but they are legal except don't consider checks\n\tvar i,\n\t    j,\n\t    h = P.h + 1,\n\t    k = P.k,\n\t    e = 0,\n\t    B = Bc(P.B),\n\t    r = B[f],\n\t    c = r >> 4 & 1,\n\t    v = r & 7,\n\t    d = B[t],\n\t    p = P.p + 1;\n\tif (d) {\n\t\t// dead piece at \"to\" square, direct hit not en passant\n\t\ti = c ^ 1; // dead piece color // same as d>>4&1\n\t\tj = (d & 7) - 1; // dead piece value (shifted for array)\n\t\th = 0; // reset 50 move count\n\t}\n\tB[t] = B[f]; // move piece to new square\n\tdelete B[f]; // empty old square\n\tswitch (v) {// piece value\n\t\tcase 1:\n\t\t\t// pawns\n\t\t\th = 0; // reset 50 move count\n\t\t\ti = c ? -16 : 16; // colorAdjust // black,white\n\t\t\tif (t - f == i + i) e = f + i;else if (t == P.e) {\n\t\t\t\tj = t - i; // enPassantKillSquare\n\t\t\t\tdelete B[j]; // delete from current board\n\t\t\t}\n\t\t\tbreak;\n\t\tcase 4:\n\t\t\t// rooks\n\t\t\tif (c) {\n\t\t\t\t// black\n\t\t\t\tif (f == 119) k &= 11; // kingside // everything but 4\n\t\t\t\tif (f == 112) k &= 7; // queenside // everything but 8\n\t\t\t} else {\n\t\t\t\t// white\n\t\t\t\tif (f == 7) k &= 14; // kingside // everything but 1\n\t\t\t\tif (f == 0) k &= 13; // queenside // everything but 2\n\t\t\t}\n\t\t\tbreak;\n\t\tcase 6:\n\t\t\t// king\n\t\t\tif (c) k &= 3; // black\n\t\t\telse k &= 12; // white\n\t\t\ti = t - f;\n\t\t\tif (i == 2 || i == -2) {\n\t\t\t\t// castle // requires legal check already performed // must check 2 || -2\n\t\t\t\tif (i > 0) {\n\t\t\t\t\t// kingside\n\t\t\t\t\ti = t + 1; // rook from\n\t\t\t\t\tj = t - 1; // rook to\n\t\t\t\t} else {\n\t\t\t\t\t// queenside\n\t\t\t\t\ti = f - 4; // rook from\n\t\t\t\t\tj = f - 1; // rook to\n\t\t\t\t}\n\t\t\t\tB[j] = B[i];\n\t\t\t\tdelete B[i];\n\t\t\t}\n\t}\n\n\tvar zo = 0; // zobrist // not done // calculate in set2\n\n\t// Tree:\n\t//this.T = [{S:[{B:{}}],b:0,s:0}];\n\n\t// Position:\n\t// {B:B,p:p,k:k,e:e,h:h,z:z,M:[],A:A,D:[[],[]]}\n\t// Board,ply,kingcastling,enpassanttargetsquare,halfmove(fiftymove)count,zobrist,Alive,Dead\n\n\treturn { B: B, p: p, k: k, e: e, h: h, z: zo };\n},\n    Bc = function Bc(w) {\n\t// board copy\n\tvar i,\n\t    O = {};\n\tfor (i in w) {\n\t\tO[i] = w[i];\n\t}return O;\n},\n    cv = function cv(s) {\n\t// convert // 0x88// number to letters\n\treturn \"abcdefgh\".charAt(s & 7) + ((s >> 4) + 1);\n},\n    vucv = function vucv(j) {\n\t// VALIDATE unconvert // for user input, letters to number 0xx88 // used by fen import\n\tif (j.length == 2 && j.charCodeAt(0) > 96 && j.charCodeAt(0) < 105 && j[1] * 1 == j[1]) return ucv(j);\n\treturn -1;\n},\n    ucv = function ucv(j) {\n\t// unconvert // 0x88 // letters to number\n\treturn j.charCodeAt(0) - 97 + (j.charAt(1) - 1) * 16;\n};\n\nfunction everyPossiblePosition(position) {\n\tvar board = position.B;\n\tvar result = [];\n\tvar squares = [];\n\n\tvar _loop = function _loop(f) {\n\t\tsquares.push(f * 1);\n\t\tvar moves = allLegal(f * 1, position);\n\t\tmoves.forEach(function (move) {\n\t\t\tvar next = setP(f * 1, move, position);\n\t\t\tvar r = board[f],\n\t\t\t    c = r >> 4 & 1,\n\t\t\t    v = r & 7;\n\t\t\tif (v == 1 && (c == 0 && move >> 4 == 7 || c == 1 && move >> 4 == 0)) {\n\t\t\t\t// manually handle promotion\n\t\t\t\tvar rook = setP(f * 1, move, position);\n\t\t\t\tvar bishop = setP(f * 1, move, position);\n\t\t\t\tvar queen = setP(f * 1, move, position);\n\t\t\t\tnext.B[move] = c * 16 + 8 + 2; // update piece value, the 8 is the promoted flag\n\t\t\t\tbishop.B[move] = c * 16 + 8 + 3; // update piece value, the 8 is the promoted flag\n\t\t\t\trook.B[move] = c * 16 + 8 + 4; // update piece value, the 8 is the promoted flag\n\t\t\t\tqueen.B[move] = c * 16 + 8 + 5; // update piece value, the 8 is the promoted flag\n\t\t\t\tresult.push(queen);\n\t\t\t\tresult.push(rook);\n\t\t\t\tresult.push(bishop);\n\t\t\t}\n\t\t\tresult.push(next);\n\t\t});\n\t};\n\n\tfor (var f in board) {\n\t\t_loop(f);\n\t}\n\treturn result;\n}\n\nvar isLegal = function isLegal(f, t, P) {\n\treturn il(f, t, P);\n};\n\nvar allLegal = function allLegal(f, P) {\n\treturn al(f, P);\n};\n\nvar isUncheckedPieceMove = function isUncheckedPieceMove(f, t, P) {\n\treturn ip(f, t, P);\n};\n\nvar calculateLegal = function calculateLegal(f, t, P) {\n\treturn cl(f, t, P);\n};\n\nvar isUncheckedPawnMove = function isUncheckedPawnMove(f, t, P) {\n\treturn pm(f, t, P);\n};\n\nvar isCheck = function isCheck(P) {\n\treturn ic(P);\n};\n\nvar hasLegalMove = function hasLegalMove(P) {\n\treturn hl(P);\n};\n\nvar isLegalCastling = function isLegalCastling(f, t, P) {\n\treturn kc(f, t, P);\n};\n\n//# sourceURL=webpack://ZXChess/./source/rules.js?");

/***/ })

/******/ });
});