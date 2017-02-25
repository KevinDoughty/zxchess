(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory(); else if (typeof define === "function" && define.amd) define([], factory); else if (typeof exports === "object") exports["ZXChess"] = factory(); else root["ZXChess"] = factory();
})(this, function() {
    /******/
    return function(modules) {
        // webpackBootstrap
        /******/
        // The module cache
        /******/
        var installedModules = {};
        /******/
        /******/
        // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/
            // Check if module is in cache
            /******/
            if (installedModules[moduleId]) /******/
            return installedModules[moduleId].exports;
            /******/
            /******/
            // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                i: moduleId,
                /******/
                l: false,
                /******/
                exports: {}
            };
            /******/
            /******/
            // Execute the module function
            /******/
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/
            // Flag the module as loaded
            /******/
            module.l = true;
            /******/
            /******/
            // Return the exports of the module
            /******/
            return module.exports;
        }
        /******/
        /******/
        /******/
        // expose the modules object (__webpack_modules__)
        /******/
        __webpack_require__.m = modules;
        /******/
        /******/
        // expose the module cache
        /******/
        __webpack_require__.c = installedModules;
        /******/
        /******/
        // identity function for calling harmony imports with the correct context
        /******/
        __webpack_require__.i = function(value) {
            return value;
        };
        /******/
        /******/
        // define getter function for harmony exports
        /******/
        __webpack_require__.d = function(exports, name, getter) {
            /******/
            if (!__webpack_require__.o(exports, name)) {
                /******/
                Object.defineProperty(exports, name, {
                    /******/
                    configurable: false,
                    /******/
                    enumerable: true,
                    /******/
                    get: getter
                });
            }
        };
        /******/
        /******/
        // getDefaultExport function for compatibility with non-harmony modules
        /******/
        __webpack_require__.n = function(module) {
            /******/
            var getter = module && module.__esModule ? /******/
            function getDefault() {
                return module["default"];
            } : /******/
            function getModuleExports() {
                return module;
            };
            /******/
            __webpack_require__.d(getter, "a", getter);
            /******/
            return getter;
        };
        /******/
        /******/
        // Object.prototype.hasOwnProperty.call
        /******/
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/
        /******/
        // __webpack_public_path__
        /******/
        __webpack_require__.p = "";
        /******/
        /******/
        // Load entry module and return exports
        /******/
        return __webpack_require__(__webpack_require__.s = 3);
    }([ /* 0 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var Game = {
            //////////////////////////////////////
            /*
 
 zxua : function(w) { // multi-dimensional array copy, not especially efficient
 	var i;
 	if (i=w.length) {
 		var a=[];
 		while (i--) a[i]= this.zxq(w[i]);
 		return a
 	}
 	return w
 },
 
 zxa : function(w) { // multi-dimensional array copy, slightly more efficient, MUST be passed an array with NUMBERS not strings
 	if (w[0].length) {
 		var i=w.length,a=[];
 		while(i--) a[i] = this.zxa(w[i]);
 		return a
 	}
 	return w.slice()
 },
 */
            zxm: function zxm(n, h, l, debug) {
                // DUPLICATE !!! also in rules.js
                //console.log("zxm h:"+h+';')
                if (!Array.isArray(h)) throw new Error("this is not an array:" + h);
                var i = h.length;
                while (i--) {
                    if (h[i] === n) {
                        if (typeof l === "undefined" || l === null) h.splice(i, 1); else h.splice(i, 1, l);
                        return;
                    }
                }
                console.log("zxm piece:%s; not found in:%s; insert:%s;", n, JSON.stringify(h), l);
                return true;
            },
            trim: function trim(w) {
                return w.replace(/^\s+|\s+$/, "");
            },
            cv: function cv(s) {
                // convert // 0x88// number to letters .... remember long ago you had a problem when the number was actually a string
                return "abcdefgh".charAt(s & 7) + ((s >> 4) + 1);
            },
            vucv: function vucv(j) {
                // VALIDATE unconvert // for user input, letters to number 0xx88 // used by fen import, anything else?
                if (j.length == 2 && j.charCodeAt(0) > 96 && j.charCodeAt(0) < 105 && j[1] * 1 == j[1]) return this.ucv(j);
                return -1;
            },
            ucv: function ucv(j) {
                // unconvert // 0x88 // letters to number
                return j.charCodeAt(0) - 97 + (j.charAt(1) - 1) * 16;
            },
            zg: function zg(w) {
                // zap gremlins. convert all funky spaces to regular, actually converts anything not ascii word, slash or dash.
                return w.replace(/[^\w\/-]/g, " ");
            },
            /*
 fen : function(fen) {
 	
 	var P = fenPos(fen)
 	if (P) {
 		this.T = [{S:[P],p:0,s:0}];
 		this.b = 0
 		this.s = 0
 		this.sub(P) // needs conditional check for php board !!!!!!!!
 	} else console.log ("fen failed for some reason");
 },
 
 sub : function(P) {
 	var i,p,B=P.B
 	for (i in B) {
 		p = B[i];
 		this.isp((p&16)>>4,(p&8)>>3,p&7,i*1) // initSinglePiece //  color, unpromote, value, location
 	}
 },
 
 isp : function(c,u,v,l) { // WRONG //  color, unpromote, value, location
 	var L
 	if (l>-1) L=this.S[l].firstChild
 	if (L) p = new ZX.Piece(this,c,u,v,l,L)//,null,u)
 	else p = new ZX.Piece(this,c,u,v,l,null,'zxp '+this.n) // this !!!
 	this.P.push(p.p) // !!! wrong
 },
 */
            fen: function fen(_fen) {
                var F = this.trim(this.zg(_fen)), a = F.split(/\s/g), x = 0, t, k = 0, h, n, e, p, B = {}, A = [ [ [], [], [], [], [], [] ], [ [], [], [], [], [], [] ] ];
                //var TEMP = [];
                //var i = 120; while (i--) {
                //	TEMP[i] +=;
                //}
                //var TEMP = "0123456789abcdefghijklmnopqrstuvwxyz",l=TEMP.length;
                //var TEMP2 = ""
                //for (var i=0;i<l;i++) {
                //	TEMP2 += "_" + parseInt(TEMP.charAt(i),32);
                //}
                //console.log(TEMP2) //
                // 35 //_0_1_2_3_4_5_6_7_8_9_10_11_12_13_14_15_16_17_18_19_20_21_22_23_24_25_26_27_28_29_30_31_32_33_34_NaN
                // 32 //_0_1_2_3_4_5_6_7_8_9_10_11_12_13_14_15_16_17_18_19_20_21_22_23_24_25_26_27_28_29_30_31_NaN_NaN_NaN_NaN
                // 4,2,3,5,6,3,2,4,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,17,17,17,17,17,17,17,0,0,0,0,0,0,0,0,20,18,19,21,22,19,18,20
                if (a.length == 6) {
                    //console.log('a ok')
                    //if (!x && a[0].match(/[^pnbrqk\/1-8]/i)) return
                    var m = a[0].split(/\//);
                    // fen board
                    if (m.length == 8) {
                        //console.log('m ok')
                        h = a[4] * 1;
                        n = a[5] * 1;
                        if (a[3] == "-") e = 0; else e = this.vucv(a[3]);
                        // strict: (except KQkq order not imposed)
                        //if (a[0].match(/[^pnbrqk\/1-8]/i) console.log('match ok')
                        //if ("wb".indexOf(a[1])<0 ) console.log('wb ok')
                        if (a[0].match(/[^pnbrqk\/1-8]/i) || "wb".indexOf(a[1]) < 0 || a[2] != "-" && a[2].match(/[^KQkq]/) || h != a[4] || h < 0 || n != a[5] || n < 0 || e < 0) return;
                        //console.log('strict ok')
                        t = a[1] == "b" ? 1 : 0;
                        if (a[2].indexOf("K") >= 0) k += 1;
                        if (a[2].indexOf("Q") >= 0) k += 2;
                        if (a[2].indexOf("k") >= 0) k += 4;
                        if (a[2].indexOf("q") >= 0) k += 8;
                        //if (h<0) h=0 // not strict
                        //if (n<0) n=0 // not strict
                        p = (n - 1) * 2 + t;
                        // ply / step
                        //console.log('fen ply:'+p+';');
                        var v, c, q, f, r = 0, w = 0, b = 0, i = 8, j, l, N = 0;
                        while (i--) {
                            // not strict would probably need some checks here 
                            f = 0;
                            for (j = 0; j < m[i].length; j++) {
                                l = m[i][j];
                                if (l * 1 == l) f += l * 1; else {
                                    q = f + r * 16;
                                    if (v = "PNBRQK".indexOf(l) + 1) c = 0; else if (v = "pnbrqk".indexOf(l) + 1) c = 1; else return;
                                    // strict // except allows illegal number of pieces other than kings
                                    if (v == 6 && (c && ++b > 1 || !c && ++w > 1)) return;
                                    // strict // too many kings
                                    B[q] = (N++ << 5) + c * 16 + v;
                                    // Now with NUMBERING // fen says nothing about promoted pawn. bfen & bpgn is different
                                    A[c][v - 1].push(q);
                                    f++;
                                }
                            }
                            r++;
                        }
                    } else return;
                } else return;
                //x=1// else THROW ERROR !!! improperly formatted fen
                if (!w || !b) return;
                // missing king
                //console.log(TEMP) // 4,2,3,5,6,3,2,4,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,17,17,17,17,17,17,17,0,0,0,0,0,0,0,0,20,18,19,21,22,19,18,20
                var z = 0;
                // zobrist not done
                //return {B:B,p:p,k:k,e:e,h:h,z:z,M:[],A:A,D:[[0,0,0,0,0,0],[0,0,0,0,0,0]]} // chess fen does not show dead or promoted pieces. I could make assumptions but fens with promoted pieces would show the wrong number of dead pieces.
                return {
                    B: B,
                    p: p,
                    k: k,
                    e: e,
                    h: h,
                    z: z,
                    M: []
                };
            },
            ///////////////////////////////////////
            ncn: function ncn(P, O) {
                // create notation // CHESS SPECIFIC !!! // P= current position after setM, O=previous position if disambiguation needed
                // uses new crazy m bitwise shifted move representation
                // O = previous position if disambiguation needed.
                // pass previous position to check for da
                // Actually, ctm() only counts this.R.ip() but does not consider pinned pieces which do not require da.
                // but there are some savings by counting ip() in ctm()
                //if (d) console.log('ncn da needed');
                var N = "  NBRQK", R = "abcdefgh";
                // internationalize !!!
                var m = P.m, r = m & 31, v = r & 7, f = m >> 5 & 127, t = m >> 12 & 127, u = m >> 19 & 7, ch = m >> 26 & 1, cm = m >> 27 & 1, x = m >> 22 & 1, e = m >> 23 & 1, U = "", L = N[v], X = x || e ? "x" : "", C = "", D = "", T;
                //console.log('ncn m:'+m+'; r:'+r+'; v:'+v+'; f:'+f+'; t:'+t+'; u:'+u+';')
                T = this.cv(t);
                if (cm) C = "#"; else if (ch) C = "+";
                if (v == 6) {
                    if (m >> 24 & 1) return "O-O" + C;
                    if (m >> 25 & 1) return "O-O-O" + C;
                } else if (v == 1) {
                    L = x || e ? R[f & 7] : "";
                    if (u) U = "=" + N[u];
                } else if (O) {
                    //console.log('ncn da needed')
                    D = this.da(O, f, t, r >> 4 & 1, v);
                }
                //console.log('ncn:|'+L+'|'+D+'|'+X+'|'+T+'|'+U+'|'+C+'|;');
                //ncn:||||e4|e||;
                return L + D + X + T + U + C;
            },
            da: function da(P, f, t, c, v) {
                // disambiguation // might be better placed elsewhere. probably rules.
                // needs previous position.
                // also, disambiguation is determined to be needed in ctm() !!! can I just calculate once ?!
                // it's a little different and complicated to tie together.
                // currently called from ncn() which is called from atnb() on movelist build.
                // you do NOT want to do this for every movelist !!!
                // P should also store SAN representation.
                // that means switching language requires re-parsing pgn,
                // but that would be less common than more than one movelist... or would it?
                // ncn() in ctm() !!!
                //console.log('DA')
                var R = "87654321", C = "abcdefgh";
                // internationalize !!!!
                //var m=P.m, r=m&31, v=r&7, c=r>>4&1, f=m>>5&127, t=m>>12&127, A=P.A[c][v-1], i=A.length, L=[], x=0, y=0, fc=f&7, fr=f>>4;
                var A = P.A[c][v - 1], i = A.length, L = [], x = 0, y = 0, fc = f & 7, fr = f >> 4;
                while (i--) {
                    if (A[i] != f && this.il(A[i], t, P)) L.push(A[i]);
                }
                //console.log('da L:'+L+';')
                if (i = L.length) {
                    while (i--) {
                        //console.log('_'+(L[i]>>4)+'_'+(L[i]&7)+'_'+fc+'_'+fr+'_') // _4_3_2_5_
                        if (L[i] >> 4 == fr) y++;
                        if ((L[i] & 7) == fc) x++;
                    }
                    //console.log('da x:'+x+'; y:'+y+';')
                    if (x && y) return C[fc] + R[fr];
                    if (x) return R[fr];
                    return C[fc];
                }
                return "";
            }
        };
        // const exf = function(b,s) {
        // 	return this.exfa(this.B[b][s],this.G[b][s])
        // }
        var exportFen = exports.exportFen = function exportFen(P) {
            //(B,G) {
            //console.log("exportFen:%s;",JSON.stringify(P));
            var B = P.B;
            var e = 0, l, k = "", q, f = "", h = P.p;
            for (var r = 7; r > -1; r--) {
                if (e > 0) {
                    f += e;
                    e = 0;
                }
                if (r < 7) f += "/";
                for (var c = 0; c < 8; c++) {
                    q = B[c + r * 16];
                    if (q == null) {
                        e++;
                    } else {
                        if (e > 0) f += e;
                        e = 0;
                        l = " pnbrqk".charAt(q & 7);
                        if (q & 16) f += l; else f += l.toUpperCase();
                    }
                }
            }
            if (e > 0) f += e;
            //console.log("f:%s;",f);
            f += " " + (h & 1 ? "b" : "w") + " ";
            //console.log("f2:%s;",f);
            var kc = P.k;
            if (kc & 1) k += "K";
            if (kc & 2) k += "Q";
            if (kc & 4) k += "k";
            if (kc & 8) k += "q";
            f += (k == "" ? "-" : k) + " ";
            //console.log("f3:%s;",f);
            f += (P.e ? this.cv(P.e) : "-") + " " + P.h + " " + (Math.floor(h / 2) + 1);
            //console.log("f4:%s;",f);
            return f;
        };
        var fen = exports.fen = function fen(string) {
            return Game.fen(string);
        };
        var cv = exports.cv = Game.cv;
        var ucv = exports.ucv = Game.ucv;
    }, /* 1 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        // Position:
        // {B:B,p:p,k:k,e:e,h:h,z:z,M:[],A:A,D:[[],[]]}
        // Board,ply,kingcastling,enpassanttargetsquare,halfmove(fiftymove)count,zobrist,Alive,Dead
        //rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
        //{"B":{"0":4,"1":34,"2":67,"3":101,"4":134,"5":163,"6":194,"7":228,"16":257,"17":289,"18":321,"19":353,"20":385,"21":417,"22":449,"23":481,"96":529,"97":561,"98":593,"99":625,"100":657,"101":689,"102":721,"103":753,"112":788,"113":818,"114":851,"115":885,"116":918,"117":947,"118":978,"119":1012},
        //"p":0,"k":15,"e":0,"h":0,"z":0,"M":[]}
        var ZX = {
            //ZX.R.fen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
            //return ZX.R.fen("k7/8/8/8/8/8/P7/K7 w KQkq - 0 1");
            A: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 40, 0, 0, 40, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 40, 0, 0, 0, 0, 48, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 48, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 48, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 4, 48, 4, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 104, 112, 104, 4, 0, 0, 0, 0, 0, 0, 48, 48, 48, 48, 48, 48, 112, 0, 112, 48, 48, 48, 48, 48, 48, 0, 0, 0, 0, 0, 0, 4, 104, 112, 104, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 4, 48, 4, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 48, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 48, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 48, 0, 0, 0, 0, 40, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 40, 0, 0, 40, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            D: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, -17, 0, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, 0, -15, 0, 0, -17, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, -15, 0, 0, 0, 0, -17, 0, 0, 0, 0, -16, 0, 0, 0, 0, -15, 0, 0, 0, 0, 0, 0, -17, 0, 0, 0, -16, 0, 0, 0, -15, 0, 0, 0, 0, 0, 0, 0, 0, -17, 0, 0, -16, 0, 0, -15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -17, -33, -16, -31, -15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -18, -17, -16, -15, -14, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 14, 15, 16, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 31, 16, 33, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 16, 0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 16, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 16, 0, 0, 0, 0, 17, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 17, 0, 0, 15, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            //Q:[-15,-17,15,17,-1,-16,1,16],
            //R:[-1,-16,1,16],
            //B:[-15,-17,15,17],
            //N:[18, 33, 31, 14, -31, -33, -18, -14],
            // first two intentionally left blank. move directions for piece value. there is no piece 0 and piece 1 is pawn, not used... but I could perhaps. color * value for pawn would make 0 for white, 1 for black, but still, too much specific logic required, like first move double push, en passant, takes legal, etc.
            M: [ [ 1, 16, 15, 17 ], [ 6, -16, -17, -15 ], [ 18, 33, 31, 14, -31, -33, -18, -14 ], [ -15, -17, 15, 17 ], [ -1, -16, 1, 16 ], [ -15, -17, 15, 17, -1, -16, 1, 16 ] ],
            il: function il(f, t, P) {
                // is legal move (z=object,from, to, Position)
                //console.log('is legal? f:'+f+'; t:'+t+'; P:'+P+';');
                var c, p = P.p, h = p & 1, B = P.B, r = B[f];
                //color,ply,h=turn,Board,rawpiece
                if (r) {
                    // if piece exists at that square
                    c = r >> 4 & 1;
                    //console.log('is legal turn:'+h+'; color:'+c+'; rawpiece:'+r+'; ply:'+p+';');
                    if (c == h && this.ip(f, t, P)) {
                        return this.cl(f, t, P);
                    }
                }
            },
            cl: function cl(f, t, P) {
                // calculate legal // (trim legal) move already determined to be a correct piece move & right turn, now test for check
                var B = P.B, r = B[f], c = r >> 4 & 1;
                //console.log('legal create position')
                //var N = z.setP(f,t,P), k = this.kl(c,N);
                var N = this.setP(f, t, P), k = this.kl(c, N);
                //console.log('end legal create position')
                //return (!this.aa(c^1,k,N)) // return BOOL
                if (!this.aa(c ^ 1, k, N)) return N;
            },
            ip: function ip(f, t, P) {
                // is unchecked piece move (from, to, Position)
                //console.log('ip f:'+f+'; t:'+t+';')
                var B = P.B, r = B[f], v = r & 7;
                switch (v) {
                  case 1:
                    return this.pm(f, t, P);

                  case 6:
                    if (Math.abs(t - f) == 2) return this.kc(f, t, P);
                    return this.ik(f, t, P);
                }
                return this.ig(f, t, P);
            },
            pm: function pm(f, t, P) {
                // is unchecked pawn move
                var B = P.B, r = B[f], c = r >> 4 & 1, m = this.M[c], d = m[1];
                if (t == f + d) return !B[t];
                if (t == f + d + d) return f >> 4 == m[0] && !B[f + d] && !B[t];
                //if (t==l || t==r) return !(t&0x88) && ( this.cc(c,t,B,1) || P.e==t ); // is 0x88 check needed here? I don't think so.
                if (t == f + m[2] || t == f + m[3]) return this.cc(c, t, B, 1) || P.e == t;
            },
            ik: function ik(f, t, P) {
                // is unchecked king regular move // split off of ip() because I thought pgn might need it... but I think I'm just going to call ip() from pgn.
                var B = P.B, r = B[f], c = r >> 4 & 1;
                //return !(t&0x88) && this.A[t-f+128]>>v&1 && this.cc(c,t,B,0); // is 0x88 check needed here? I don't think so.
                return this.A[t - f + 128] >> 6 & 1 && this.cc(c, t, B);
            },
            kc: function kc(f, t, P) {
                // is legal castle (from, to, Position)
                var B = P.B, r = B[f], c = r >> 4 & 1, e = c ^ 1, x = f > t, d = x * -2 + 1, b = 1 << x << c * 2;
                // x=type, d=direction,b=bitwiseshift //b=(1<<x)<<(c*2) // operator precedence?
                if (f != c * 112 + 4 || !(P.k & b)) return;
                return !(B[f + d] || B[t] || x && B[f - 3] || this.aa(e, f, P) || this.aa(e, f + d, P));
            },
            kl: function kl(c, P) {
                // king loc (color,Position) // I might strip this out
                var B = P.B, f;
                for (f in B) {
                    var r = B[f], C = r >> 4 & 1, v = r & 7;
                    if (C === c && v === 6) return f * 1;
                }
            },
            cc: function cc(C, t, B, p) {
                // check color (color,to,Board,ispawn)
                var r = B[t], c = r >> 4 & 1;
                if (r) return C != c;
                return !p;
            },
            aa: function aa(e, k, P) {
                // any piece is attacking(enemycolor,kingloc,Position)
                var B = P.B, f;
                for (f in B) {
                    var r = B[f], c = r >> 4 & 1;
                    if (c === e && this.ia(f * 1, k, P)) {
                        return 1;
                    }
                }
            },
            ia: function ia(f, t, P) {
                // is attacking (from, to, Position) // no more switch. speed is the same. this is shorter.
                var B = P.B, r = B[f], v = r & 7;
                if (v === 1) {
                    // pawns. ep check not needed, for testing check.
                    var M = this.M[r >> 4 & 1];
                    return t === f + M[2] || t === f + M[3];
                }
                if (v === 6) return !(t & 136) && this.A[t - f + 128] >> v & 1;
                // operator precedence ?! // (this.A[t-f+128]>>v)&1
                return this.ig(f, t, P);
            },
            ig: function ig(f, t, P) {
                // is legal generic move
                var B = P.B, r = B[f], v = r & 7, a = t - f + 128, d;
                // attackArrayIndex, delta
                if (!(t & 136) && this.A[a] >> v & 1) {
                    // operator precedence?! // ((this.A[a]>>v)&1)
                    d = this.D[a];
                    f += d;
                    if (f != t) do {
                        //console.log("ig f:%s; t:%s; d:%s;",f,t,d);
                        if (B[f]) return;
                        f += d;
                    } while (f != t);
                    return this.cc(r >> 4 & 1, t, B);
                }
            },
            // THESE SHOULD BE COMBINED. NO NEED TO CALC HAS ANY LEGAL MOVE SEVERAL TIMES.
            ic: function ic(P) {
                // is check // called in setM() to determine check
                var p = P.p, h = p & 1, k = this.kl(h, P);
                return this.aa(h ^ 1, k, P);
            },
            im: function im(P) {
                // is mate // requires z=this for hl() for al() for setP() // not used
                if (!this.hl(P)) return this.ic(P);
            },
            is: function is(P) {
                // is stalemate // I don't think "is" is a reserved keyword, not according to MDC anyway // not used
                if (!this.hl(P)) return !this.ic(P);
            },
            hl: function hl(P) {
                // has legal move // requires z=this for al() for setP() // called in setM() to determine check
                var B = P.B, h = P.p & 1, f;
                // Boardarray, h=turn, rawpiece, A=alive pieces, current pieces, M=all moves
                for (f in B) {
                    var r = B[f], c = r >> 4 & 1;
                    if (c !== h) {
                        var M = this.al(f * 1, P);
                        if (M.length) return 1;
                    }
                }
            },
            al: function al(f, P) {
                // all legal squares (z=object,from, Position) // DOES NOT INCLUDE PROMOTION, not sufficient for perft
                var B = P.B, r = B[f], c = r >> 4 & 1, v = r & 7, h = P.p & 1, M;
                //Board, rawpiece, color, value, h=turn, M=allMoves
                if (c == h) {
                    switch (v) {
                      case 6:
                        // king
                        M = this.ak(f, P);
                        break;

                      case 1:
                        M = this.ap(f, P);
                        break;

                      default:
                        M = this.ag(f, P);
                    }
                    return this.tm(M, f, P);
                }
                // else console.log('the color is wrong')
                return [];
            },
            ap: function ap(f, P) {
                // all unchecked pawn moves (from, Position)
                var B = P.B, r = B[f], c = r >> 4 & 1, U = [], M = this.M[c], d = M[1], l = f + M[2], r = f + M[3], e = P.e;
                // Board, rawpiece, color, U=allUntrimmedMoves (returned), M=pawn directions, d=direction(from M),l=left(from M),r=right(from M), e= ep target square (maybe I should use "n")
                if (!B[f + d]) {
                    U.push(f + d);
                    if (f >> 4 == M[0] && !B[f + d + d]) U.push(f + d + d);
                }
                if (!(l & 136) && (this.cc(c, l, B, 1) || l == e)) U.push(l);
                // YES 0x88 check needed !!!
                if (!(r & 136) && (this.cc(c, r, B, 1) || r == e)) U.push(r);
                // YES 0x88 check needed !!!
                return U;
            },
            ak: function ak(f, P) {
                // all unchecked king moves (from, Position)
                var B = P.B, r = B[f], c = r >> 4 & 1, D = this.M[5], i = 8, d, t, M = [];
                // Board, rawpiece, color, value, D = piece Direction array (just using queen, it's the same, and do not confuse with Delta array), i = Direction length, d = individual direction, t= to square, M=allMoves
                while (i--) {
                    d = D[i];
                    t = f + d;
                    if (!(t & 136) && this.A[t - f + 128] >> 6 & 1 && this.cc(c, t, B)) M.push(t);
                }
                if (this.kc(f, f + 2, P)) M.push(f + 2);
                if (this.kc(f, f - 2, P)) M.push(f - 2);
                return M;
            },
            ag: function ag(f, P) {
                var B = P.B, r = B[f], c = r >> 4 & 1, v = r & 7, D = this.M[v], t, d, i = D.length, M = [];
                // Board, rawpiece, color, value, Directions array (NOT DELTA ARRAY), t=to square, d=individual delta, i = Directions array length, M=allUntrimmedMoves
                while (i--) {
                    d = D[i];
                    t = f + d;
                    while (!(t & 136) && this.A[t - f + 128] >> v & 1 && !B[t]) {
                        M.push(t);
                        t += d;
                    }
                    if (!(t & 136) && this.A[t - f + 128] >> v & 1 && this.cc(c, t, B)) M.push(t);
                }
                return M;
            },
            tm: function tm(U, f, P) {
                // trim moves (z=object,Untrimmed, from, Position)
                var B = P.B, r = B[f], c = r >> 4 & 1, e = c ^ 1, k, t, i = U.length, M = [], N;
                // Board, rawpiece, color, enemycolor, kingloc, to, i=Untrimmed length, M= allTrimmedMoves, N=newPosition
                while (i--) {
                    t = U[i];
                    N = this.setP(f, t, P);
                    // Do not need to deal with promoting pawns, will not effect if my king is in check
                    k = this.kl(c, N);
                    if (!this.aa(e, k, N)) M.push(U[i]);
                }
                return M;
            },
            cp: function cp(P, t) {
                // can promote // current position, moved to // used in ald() or ald2() I forget
                var B = P.B, r = B[t], c = r >> 4 & 1;
                return (r & 7) == 1 && (!c && t >> 4 == 7 || c && t >> 4 == 0);
            },
            /////////////////////////////////////
            setP: function setP(f, t, P, z) {
                // set Position // return position json // from 0x88, to 0x88, (promote value Moved to setM) // move has already been determined to be legal, except for "possible" and "any" moves, but they are legal except don't consider checks
                //console.log('setP from:%s; to:%s; position:%s',f,t,P);
                //console.log('P.A:'+P.A+';')
                // MOVES TAKEN OUT !!!
                //console.log('A:'+P.A+';')
                //console.log('D:'+P.D+';')
                //var i,j, h = P.h+1, k = P.k, e = 0, B = new ZX.OC(P.B), r = B[f], c = r>>4&1, v = r&7, M = [[f,t]], d=B[t], A= this.zxa(P.A), D= this.zxa(P.D),p=P.p+1;
                var i, j, h = P.h + 1, k = P.k, e = 0, B = this.Bc(P.B), r = B[f], c = r >> 4 & 1, v = r & 7, d = B[t], p = P.p + 1;
                //, A= this.Ac(P.A), D= this.Dc(P.D);
                if (d) {
                    // dead piece at "to" square, direct hit not en passant
                    //M[1]=[t,-1,d]; // add to move array // from, to, value
                    i = c ^ 1;
                    // dead piece color // same as d>>4&1
                    j = (d & 7) - 1;
                    // dead piece value (shifted for array)
                    h = 0;
                }
                B[t] = B[f];
                // move piece to new square
                delete B[f];
                // empty old square
                switch (v) {
                  // piece value
                    case 1:
                    // pawns
                    h = 0;
                    // reset 50 move count
                    i = c ? -16 : 16;
                    // colorAdjust // black,white
                    if (t - f == i + i) e = f + i; else if (t == P.e) {
                        j = t - i;
                        // enPassantKillSquare
                        //M[1] = [j,-1,B[j]]; //  from,to,value // add enPassant to move arrray
                        delete B[j];
                    }
                    break;

                  case 4:
                    // rooks // NU SCHOOL from "tscp181" the chess program has optimized 0x88 castling array. modified to not use the array. Doesn't actually work, though...
                    if (c) {
                        // black
                        if (f == 119) k &= 11;
                        // kingside // everything but 4
                        if (f == 112) k &= 7;
                    } else {
                        // white
                        if (f == 7) k &= 14;
                        // kingside // everything but 1
                        if (f == 0) k &= 13;
                    }
                    break;

                  case 6:
                    // king
                    if (c) k &= 3; else k &= 12;
                    // white
                    i = t - f;
                    if (i == 2 || i == -2) {
                        // castle // requires legal check already performed // must check 2 || -2
                        if (i > 0) {
                            // kingside
                            i = t + 1;
                            // rook from
                            j = t - 1;
                        } else {
                            // queenside
                            i = f - 4;
                            // rook from
                            j = f - 1;
                        }
                        //M[1] = [i,j];//,B[j]]; // from,to (rook)
                        B[j] = B[i];
                        delete B[i];
                    }
                }
                var zo = 0;
                // not done // calculate this in set2
                // Tree:
                //this.T = [{S:[{B:{}}],b:0,s:0}];
                // Position:
                // {B:B,p:p,k:k,e:e,h:h,z:z,M:[],A:A,D:[[],[]]}
                // Board,ply,kingcastling,enpassanttargetsquare,halfmove(fiftymove)count,zobrist,Alive,Dead
                return {
                    B: B,
                    p: p,
                    k: k,
                    e: e,
                    h: h,
                    z: zo
                };
            },
            Bc: function Bc(w) {
                // board copy // this doesn't include generic object functions, does it?
                var i, O = {};
                for (i in w) {
                    O[i] = w[i];
                }
                return O;
            },
            // 	trim : function(w) {
            // 		return w.replace(/^\s+|\s+$/,"");
            // 	},
            cv: function cv(s) {
                // convert // 0x88// number to letters .... remember long ago you had a problem when the number was actually a string
                return "abcdefgh".charAt(s & 7) + ((s >> 4) + 1);
            },
            vucv: function vucv(j) {
                // VALIDATE unconvert // for user input, letters to number 0xx88 // used by fen import, anything else?
                if (j.length == 2 && j.charCodeAt(0) > 96 && j.charCodeAt(0) < 105 && j[1] * 1 == j[1]) return this.ucv(j);
                return -1;
            },
            ucv: function ucv(j) {
                // unconvert // 0x88 // letters to number
                return j.charCodeAt(0) - 97 + (j.charAt(1) - 1) * 16;
            }
        };
        // export const isLegal = function(move, position) { // This may not be the place for user friendly functions
        // 	//(typeof w == 'string' || w instanceof String)
        // 	if (position && move && (move.length === 4 || move.length === 5)) {
        // 		const from = ZX.vucv(move.substring(0,2));
        // 		const to = ZX.vucv(move.substring(2,4));
        // 		if (from !== -1 && to !== -1) {
        // 			if (move.length === 5) {
        // 				const promote = "nbrq".indexOf(move.substring(4,5));
        // 				if (promote !== -1) {
        // 				
        // 				}
        // 			}
        // 			return ZX.il(from, to, position);
        // 		}
        // 	}
        // }
        var isLegal = exports.isLegal = function isLegal(f, t, P) {
            return ZX.il(f, t, P);
        };
        var allLegal = exports.allLegal = function allLegal(f, P) {
            return ZX.al(f, P);
        };
        var isUncheckedPieceMove = exports.isUncheckedPieceMove = function isUncheckedPieceMove(f, t, P) {
            return ZX.ip(f, t, P);
        };
        var calculateLegal = exports.calculateLegal = function calculateLegal(f, t, P) {
            return ZX.cl(f, t, P);
        };
        var isUncheckedPawnMove = exports.isUncheckedPawnMove = function isUncheckedPawnMove(f, t, P) {
            return ZX.pm(f, t, P);
        };
        var isCheck = exports.isCheck = function isCheck(P) {
            return ZX.ic(P);
        };
        var hasLegalMove = exports.hasLegalMove = function hasLegalMove(P) {
            return ZX.hl(P);
        };
        var isLegalCastling = exports.isLegalCastling = function isLegalCastling(f, t, P) {
            return ZX.kc(f, t, P);
        };
    }, /* 2 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.pgnParse = undefined;
        var _game = __webpack_require__(0);
        var _rules = __webpack_require__(1);
        var parseComments = false;
        // debug only
        var pgnerrors = [];
        // debug
        var globalmovecount = 0;
        var globallegalcount = 0;
        var debug = function debug() {};
        var initialN = [ {
            k: "main",
            v: [ {
                k: "start",
                b: 0,
                s: 0,
                h: 0
            } ],
            x: 0
        } ];
        function initialState() {
            return {
                source: "",
                T: [ {
                    S: [],
                    b: 0,
                    s: 0,
                    x: 0
                } ],
                b: 0,
                s: -1,
                hos: 0,
                // half move offset?
                N: initialN,
                X: [ {
                    p: 0,
                    k: "main",
                    s: -1,
                    n: initialN[0]
                } ]
            };
        }
        var pgnParse = exports.pgnParse = function pgnParse(w) {
            var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : initialState();
            var report = arguments[2];
            //requires rules // w=pgn, report is for pgn editor, to give detailed description if & where it failed
            state.source = w;
            globalmovecount = 0;
            globallegalcount = 0;
            var bigtime = new Date().getTime();
            var ficscheck = 0, white = true, black = false, whiterating = false, blackrating = false, fenfound = false, whiteplayer = "", blackplayer = "", whiterating = "", blackrating = "";
            pgnerrors = [];
            var position = (0, _game.fen)("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
            w = w.replace(/^(\s|&nbsp;)*|(\s|&nbsp;)*$/g, "");
            //  remove whitespace & html from beginning & end
            if (w.length < 150 && w.charAt(0) != "[" && w.search(/((\/).+){7}/) > 0) {
                // fen tag would already be removed. this checks for fen only, not pgn fen tag.
                position = (0, _game.fen)(w);
            } else {
                w = w.replace(/0-0-0|o-o-o/g, "O-O-O");
                // fix castling
                w = w.replace(/0-0|o-o/g, "O-O");
                var headerbreak = w.search(/\]\s*\r?\n\r?\n/);
                if (headerbreak > -1) {
                    var header = w.substring(0, headerbreak + 1);
                    tagarray = new Array();
                    tagarray = header.match(/\[[^\[\r\n]*\]/g);
                    // find tags... but brackets in the moves section would be removed, and placed at the top
                    if (tagarray != null) {
                        for (i = 0; i < tagarray.length; i++) {
                            tagname = tagarray[i].match(/\[[^\s\r\n]*\s/);
                            // between [ & space
                            tagvalue = tagarray[i].match(/"[^"\r\n]*"/);
                            // between quotes
                            tagname[0] = tagname[0].substr(1, tagname[0].length - 2);
                            tagvalue[0] = tagvalue[0].substr(1, tagvalue[0].length - 2);
                            if (tagname[0].toLowerCase() == "white") {
                                if (tagvalue[0] != "") whiteplayer = tagvalue[0];
                            } else if (tagname[0].toLowerCase() == "black") {
                                if (tagvalue[0] != "") blackplayer = tagvalue[0];
                            } else if (tagname[0].toLowerCase() == "whiteelo") {
                                if (tagvalue[0] != "") whiterating = tagvalue[0];
                            } else if (tagname[0].toLowerCase() == "blackelo") {
                                if (tagvalue[0] != "") blackrating = tagvalue[0];
                            } else if (tagname[0].toLowerCase() == "fen") {
                                fenfound = true;
                                position = (0, _game.fen)(tagvalue[0]);
                            }
                        }
                    }
                    w = w.substring(headerbreak + 1);
                }
                w = w.replace(/^(\s|&nbsp;)*|(\s|&nbsp;)*$/g, "");
                //remove space again
                // 		if (!fenfound) {
                // 			const position = fen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
                // 			state.T[0].S.push(position);
                // 		}
                state.T[0].S.push(position);
                if (whiteplayer && whiterating) whiteplayer += " (" + whiterating + ")";
                if (blackplayer && blackrating) blackplayer += " (" + blackrating + ")";
                //this.plr(whiteplayer,blackplayer) // disabled 2008
                state.hos = position.p;
                // half move offset !!! ONLY USED IN PGN IMPORT.... for converting "4." to proper array s
                ravParse(state, w, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                // the 1 is the complicated index issue. fen is index 0, firstmove index is 1. ravs following that start at index 0
                //alert('pgn end')
                //this.bss(0,0,0,0) // disabled 2008
                //if (this.notation) this.nf()
                // Notation finish !!! aka build notation DOM
                // 		
                // 		var n,N = this.object["notation"];
                // 		for (n in N) {
                // 			N[n].nf();
                // 		}
                // 2008 ?? this.ol ??
                //		this.ol = state.T.length // so dragging from sp won't create new branch, but dragging at end of pgn will.
                //debug((new Date().getTime()-bigtime)+' moves:'+globallegalcount+'/'+globalmovecount+';',this.alr) // DEBUG
                if (pgnerrors.length) console.log(JSON.stringify(pgnerrors));
            }
            return state;
        };
        var ravParse = function ravParse(state, w, b, h, i, nb, r, c, d, x, k) {
            //,e) { // rav parse // w=thepgnstr,b=frombranch,s=fromstep,nb=nextbranch,c=comment, d=dead(line), x=pgnnest, k=bracket
            console.log("ravParse state:%s;", JSON.stringify(state));
            if (k) {
                // first one is already made. for dragging from startpos.
                if (c) state.X.push({
                    p: x,
                    k: "comment",
                    s: -1
                }); else if (nb == 0) state.X.push({
                    p: x,
                    k: "main",
                    s: -1
                }); else state.X.push({
                    p: x,
                    k: "rav",
                    s: -1
                });
                x = state.X.length - 1;
            }
            var l, n, z, q, nr, nc, nd, nk, br, error, nh, ng, nx, mx;
            //,nmx
            var m, any, t, T = [ "" ], hh, io = h;
            do {
                console.log("ravp sub:" + b + "; s:" + i + "; nb:" + nb + "; x:" + x + "; X.length:" + state.X.length + ";\n|" + w + "|");
                nk = false;
                z = false;
                n = false;
                nd = d;
                nc = c;
                nr = r;
                ng = false;
                nx = x;
                mx = false;
                br = false;
                error = false;
                // this is for fics teaching ladder. honor linebreaks manually entered into pgn
                if (k == "{") l = w.search(/}|\r?\n\r?\n/); else l = w.search(/[{\(}\)]/);
                if (l > -1) {
                    nk = w.charAt(l);
                    switch (nk) {
                      case "(":
                        if (d) nd++;
                        nr++;
                        n = w.substring(l + 1);
                        break;

                      case "{":
                        nc++;
                        n = w.substring(l + 1);
                        break;

                      case ")":
                        if (d) nd--;
                        nr--;
                        z = w.substring(l + 1);
                        break;

                      case "}":
                        nc--;
                        z = w.substring(l + 1);
                        break;

                      case "\n":
                        k = "{";
                        br = w.substring(l + 1);
                    }
                    if (nr < 0) {
                        error = w.substring(l + 1);
                        pgnerrors.push("extra closing rav tag found -->" + w.substr(l, 30) + "...\n");
                        z = false;
                    } else if (nc < 0) {
                        error = w.substring(l + 1);
                        pgnerrors.push("extra closing comment tag found -->" + w.substr(l, 30) + "...\n");
                        z = false;
                    }
                    w = w.slice(0, l);
                    console.log("|" + w + "|");
                }
                if (w) {
                    if ((!c || parseComments) && !d) {
                        // if not a comment, or comment parse enabled, and not... dead? (illegal I think)
                        any = false;
                        T = [ "" ];
                        var movereg = /(\d+)\.\s*(\.*)|\s\$(\d+)\b|\b([KQRBN])?([a-h])?([1-8])?[x\-]?([a-h])([1-8])=?([QRBN])?\b[+#]?|\bO-O-O\b[\+#]?|\bO-O\b[\+#]?|--/;
                        while (m = movereg.exec(w)) {
                            //alert('m:'+m[0]+';')
                            console.log("m:" + m[0] + "; nb:" + nb + "; b:" + b + "; s:" + i + "; x:" + x + ";");
                            if (RegExp.$1) {
                                // NUMBER // ideal would be that number just changes b,s info
                                if (any) {
                                    // revert if "any" and another number found
                                    b = any[1];
                                    h = any[2];
                                    any = false;
                                }
                                //alert('NUM M:'+m[0]+'; $1:'+RegExp.$1+'; $2:'+RegExp.$2+';')
                                hh = (RegExp.$1 - 1) * 2 + (RegExp.$2 ? 1 : 0) - state.hos;
                                // check for move numbers that suggest t a rav should go
                                //alert('ss:'+ss+'; ss+1:'+(ss+1)+';')
                                if (hh != h) {
                                    // move number is not what is expected
                                    console.log("move number is not what is expected... h:" + h + "; hh:" + hh + ";");
                                    // h:10; hh:12;
                                    //break
                                    // 2008 lets hope this check isn't needed:
                                    if (!state.T[b].S[i + hh - h]) {
                                        // the original move (the previous move) to check legal against does not exist.
                                        console.log("(!this.B[b][ss])");
                                        // 2008 Maybe I could just check if (ss == s+1)
                                        //if (state.T[b].S[hh-1]) { // one ply ahead = insert nothing move. "1.e4 2.d4" // this could be removed maybe. redundant?
                                        if (hh == h + 1) {
                                            // one ply ahead = insert nothing move. "1.e4 2.d4" // this could be removed maybe. redundant?
                                            console.log("any 1");
                                            // "1.e4 2.d4" or "1.e4  (2.d4 )" or "1.e4 e5 {2....d5 3.c4}"
                                            any = [ nb, b, h ];
                                            b = nb;
                                            h = hh;
                                        } else if (hh < h) {
                                            // if it goes back // split!
                                            //alert('do nu x:'+this.X.length+'; xp:'+this.X[x].p+';?')
                                            /// XXX
                                            if (c) state.X.push({
                                                p: state.X[x].p,
                                                k: "comment",
                                                s: x
                                            }); else state.X.push({
                                                p: state.X[x].p,
                                                k: "rav",
                                                s: x
                                            });
                                            //alert('ravp2 X push new length'+this.X.length)
                                            x = state.X.length - 1;
                                        } else {}
                                    } else {
                                        //alert('other')
                                        i += hh - h;
                                        h = hh;
                                        alert("other b:" + b + "; h:" + h + "; i:" + i + "; state.T[b].S[i]:" + state.T[b].S[i]);
                                    }
                                }
                                if (c) {
                                    // new conditional
                                    if (T[1]) T[0] += T[1];
                                    T[0] += w.substring(0, m.index);
                                    T[1] = m[0];
                                }
                            } else if (ng = RegExp.$3) {} else if (m[0] == "--") {
                                // NULL explicitly entered // ANY MOVE & ANY OTHER MOVE
                                //alert('any 2')
                                any = [ nb, b, h ];
                                b = nb;
                                h++;
                            } else {
                                if (any) {} else {
                                    // everything disabled because of confusion between old step, ply and new index.
                                    console.log("move:" + m[0] + "; b:" + b + "; s:" + i + ";");
                                    //if (nb==b&&state.T[b].S[h+1]) { // move already exists.make a new branch. and reset branch to frombranch //1.e4  (2.d4 2.c4
                                    if (nb == b && state.T[b].S[i + 1]) {
                                        // move already exists.make a new branch. and reset branch to frombranch //1.e4  (2.d4 2.c4
                                        console.log("exists nu x:" + (state.X.length - 1) + "; xp:" + x + ";");
                                        //1.e4  (2.d4 2.c4)
                                        // XXX
                                        state.X.push({
                                            p: x,
                                            k: "rav",
                                            s: x
                                        });
                                        //alert('ravp3 X push new length'+this.X.length)
                                        x = state.X.length - 1;
                                        nb = state.T.length;
                                        // make new branch
                                        // b=this.pb(b,s) // temporarily disabled !!!
                                        console.log("this will probably fail. b=this.pb(b,s) left out");
                                    }
                                    // why isn't this handled in numbers?
                                    // because it happens at branch change, nested comment or rav!!!
                                    // but what about nb/b ???
                                    // scratch that. b == nb
                                    if (!state.T[b].S[i]) {
                                        // nothing moves not explicitly declared, no "--". "12. Qd4 13. Rc3" // the problem with this is what if the next move is not legal? you get "14. ... --" and nothing else. YOU GET THE UGLY
                                        // 2008 this is the second place where nothing moves are checked. can they be combined?
                                        console.log("nothing moves not explicitly declared. (!this.B[" + b + "][" + i + "])");
                                        //1.e4  (2.d4 2.c4)
                                        //(!this.B[22][-1]) // i = -1 !!!
                                        break;
                                        //nothing moves not explicitly declared. (!this.B[22][-1])
                                        var Fb = b;
                                        var Fh = h;
                                        if (state.T[b].S[i - 1]) {
                                            // this is necessary. not redundant. "2.c4" second any doesn't show without it. // fics teaching ladder 0065.pgn
                                            //alert('any 3') //1.e4  (2.d4 2.c4)
                                            any = [ nb, b, i - 1 ];
                                            b = nb;
                                        } else {
                                            // for nested moves that are way behind the current s, in one or more branches back //32. Qg2 (32. Qe2 $2 Nxe5 $1 33. Nxe5 Rxg3+ 34. Kh1 (34. Nxg3 Rxg3+ 35. Kf1 Qxh4 $19. {Deserving attention was 32. Qd4, and White doesn't allow Black to occupy the important diagonal g1-a7.})
                                            //alert('way back') // it happens! // this doesn't reassign x... // happens in comments usually
                                            //alert('way back '+m[0] +'___'+w)
                                            //alert('way back b:'+b+'; nb:'+b+';')
                                            do {
                                                b = state.T[b].b;
                                                if (state.T[b].S[i]) {
                                                    //alert('way back Fb:'+Fb+'; Fs:'+Fs+'; b:'+b+'; s:'+s+';')
                                                    nb = state.T.length;
                                                    break;
                                                }
                                            } while (b);
                                        }
                                    }
                                }
                                if (c) {
                                    // back to this.
                                    if (T[1]) T[2] = w.substring(0, m.index); else T[0] += w.substring(0, m.index);
                                }
                                // Disabled alert:
                                //if (!state.T[b].S[h]) alert("this really shouldn't happen, !B[b][h]... b:"+b+"; h:"+h+"; hh:"+hh+"; state.T[b]:"+state.T[b]+"; this.hos:"+this.hos+"; ") // but it did... check pgn notes. for game started midway, from move 30.
                                console.log("about to ctm m:" + m[0] + "; nb:" + nb + "; b:" + b + "; s:" + i + "; x:" + x + ";");
                                // 2008 // ctm(P,L,fc,fr,tc,tr,u,m)
                                //alert('pgn calc legal b:'+b+'; h:'+h+'; i:'+i+';')
                                var P = convertToMove(state.T[b].S[i], RegExp.$4, RegExp.$5, RegExp.$6, RegExp.$7, RegExp.$8, RegExp.$9, m[0]);
                                //P = this.ctm(P,RegExp.$4,RegExp.$5,RegExp.$6,RegExp.$7,RegExp.$8,RegExp.$9,m[0])
                                //if (this.ctm(m[0],this.B[b][s],this.G[b][s],this.Q[b][s],b,s,nb,x,T,any,RegExp.$4,RegExp.$5,RegExp.$6,RegExp.$7,RegExp.$8,RegExp.$9)) {
                                //console.log('nP:'+P+'; typeof nP:'+(typeof P)+'; (nP<1):'+(P<1)+';')
                                if (P < 1) {
                                    console.log("illegal:" + m[0] + "; b:" + b + "; h:" + h + "; s:" + i + "; c:" + (c ? "comment" : "") + ";");
                                    if (any) {}
                                    if (c) {
                                        if (T[2]) T[1] += T[2];
                                        if (T[1]) T[0] += T[1];
                                        T = [ T[0] + m[0] ];
                                    } else {
                                        // if not a comment then ILLEGAL!!!!   BREAK
                                        //alert('dead nu x:'+this.X.length+'; xp:'+x+';')
                                        d++;
                                        // XXX
                                        state.X.push({
                                            p: x,
                                            k: "illegal",
                                            s: -1
                                        });
                                        //alert('ravp4 X push new length'+this.X.length)
                                        x = state.X.length - 1;
                                        // temporarily disabled:
                                        and(x, w);
                                        ///// A N D
                                        //this.anc(x,w) ///// A N D
                                        break;
                                    }
                                } else {
                                    globallegalcount++;
                                    console.log("legal nb:" + nb + "; h:" + h + "; s:" + i + "; nP:" + P + "; nP.M:" + P.M + ";");
                                    // 2008:
                                    if (!state.T[nb]) {
                                        //alert('pgn make new branch T')
                                        state.T.push({
                                            S: [],
                                            b: b,
                                            s: i,
                                            x: x
                                        });
                                        // 2008 assumptions about h == Tb.S.length-1
                                        i = 0;
                                    } else i++;
                                    h++;
                                    b = nb;
                                    //state.T[nb].S[i] = nP;
                                    state.T[nb].S.push(P);
                                    // when is setM called? setP in rules...
                                    //this.atn(b,h,i,m[0],x,T,p) // move not used... should create notation in atnb() for internationalization
                                    atn(b, h, i, x, T);
                                    //fi=i;
                                    // end 2008
                                    //alert('legal:'+m[0]+';')
                                    T = [ "" ];
                                    k = 0;
                                }
                                any = false;
                            }
                            w = w.substring(m.index + m[0].length);
                            console.log("W:" + w + ";");
                        }
                        // (while regex)
                        if (c && (T[0] || w)) {
                            // this.anc disabled ///// A N C 
                            t = "";
                            if (T[0]) t += T[0];
                            if (T[1]) t += T[1];
                            var tw = t + w;
                            if (tw == " ") tw = "_";
                            //if (!k||k=="{") this.anc(nb,s,tw,x)
                            //else if (k=="(") this.anc(nb,s,'('+tw+')',this.X[x].p) // this might not be necessary anymore, with the new bracket check. now, parenthesis and open brackets are not searched for after an open bracket
                            //else this.anc(nb,s,'['+tw+']',this.X[x].p)
                            if (!k || k == "{") anc(x, tw); else if (k == "(") anc(state.X[x].p, "(" + tw + ")"); else anc(state.X[x].p, "[" + tw + "]");
                        }
                    } else {
                        // if comment & not comment parse, just add comment. THIS WILL COMMENT DEAD MOVES TOO. need and() add notation dead?
                        //this.anc disabled
                        //this.anc(nb,s,w,x)//,oe) ///// A N C
                        anc(x, w);
                    }
                }
                if (n) {
                    console.log("next:" + n + ";");
                    var nni = i - 1, nnb = b;
                    if (nni < 0) {
                        //1.e4 (1.d4 (1.c4)) e5 // what is the previous branch / index ?!
                        nni = state.T[b].s;
                        nnb = state.T[b].b;
                    }
                    //if (nk=="(") w = this.ravp(n,nnb,h-1,nni,state.T.length,nr,nc,nd,x,nk)// RECURSIVE // why s-1 ??? it's fuct when games start with comment: {A highly unusual explosion on h3}
                    //else w = this.ravp(n,b,h,i,state.T.length,nr,nc,nd,x,nk)// RECURSIVE // why s-1 ??? s seems to work... numbers in rav's would fix it... it's when rav's don't start with numbers !!!
                    if (nk == "(") w = ravParse(state, n, nnb, h - 1, nni, state.T.length, nr, nc, d, x, nk); else w = ravParse(state, n, b, h, i, state.T.length, nr, nc, d, x, nk);
                } else if (br) {
                    // 			if (this.notation) { // add hard break. temporarily disabled ///// A N B
                    // 				/*
                    // 				this.anb(x)
                    // 				this.anb(x)
                    // 				*/
                    // 			}
                    w = br;
                } else if (error) {
                    w = error;
                } else break;
            } while (w);
            return z;
        };
        var ame = function ame(x) {};
        var anc = function anc(x, t) {};
        var atn = function atn(b, h, s, x, C) {};
        var acs = function acs(x, t, e) {};
        var and = function and(x, t) {};
        var anb = function anb(x) {};
        var convertToMove = function convertToMove(P, L, fc, fr, tc, tr, u, m) {
            // convert to move 2008 !!! UNTESTED
            //console.log("convertToMove P:"+P+'; L:'+L+'; fc:'+fc+'; fr:'+fr+'; tc:'+tc+'; tr:'+tr+'; u:'+u+'; m:'+m+';');
            // P=originalPosition, L=regex pieceLett(r4), fc=fromcol(r5), fr=fromrow(r6), tc=tocol(r7), tr=torow(r8), u=promote(r9), m=full move (for castling)
            // even newer style:
            // check this.R.ip for EVERY major piece of type in Alive array
            // to determine if disambiguation is needed.
            // doesn't consider if piece is pinned.
            // this is just a hint to check for da required,
            // since most moves won't need it.
            // setM will set san string after setting crazy m bitwise move rep
            globalmovecount++;
            var TC, TR, T, t, f, FC = -1, FR = -1, F = -1, v, i, A, r, N, M = [], c, l = 0, U, D = -1;
            c = P.p & 1;
            // color = Position.ply & 1. whose turn it is.
            // determine what we know about from & to squares:
            if (fc) FC = "abcdefgh".indexOf(fc);
            // from col given
            if (fr) {
                FR = fr - 1;
                // from row
                if (fc) F = FC + FR * 16;
            }
            TC = "abcdefgh".indexOf(tc);
            if (tr) TR = tr - 1;
            var B = P.B;
            if (L) {
                // major piece move //
                v = " NBRQK".indexOf(L);
                t = TC + TR * 16;
                // To square. 0x88
                // 		A = P.A[c][v]; // the array of the locations of this type of piece
                // 		i = A.length;
                // 		while (i--) {
                // 			f=A[i];
                // 			if (isUncheckedPieceMove(f,t,P)) {
                // 				D++; // disambiguation. starts at -1
                // 				if ((FC<0&&FR<0)||FC==(f&7)||FR==f>>4||f==F) M.push(f)
                // 			}
                // 			//if (  ((FC<0&&FR<0)||FC==(f&7)||FR==f>>4||f==F)  &&  this.R.ip(f,t,P)  ) M.push(f)
                // 			// usually only one or two major pieces of any given type, so can check for disambiguation every time.
                // 			// ip() checks for pawns & castling but whatever.
                // 		}
                for (var _f in B) {
                    var rr = B[_f];
                    var cc = rr >> 4 & 1;
                    var vv = rr & 7;
                    if (cc === c && vv === v && (0, _rules.isUncheckedPieceMove)(_f * 1, t, P)) {
                        D++;
                        if (FC < 0 && FR < 0 || FC == (_f & 7) || FR == _f >> 4 || _f == F) M.push(_f * 1);
                    }
                }
                l = M.length;
                if (l == 1 && (N = (0, _rules.calculateLegal)(M[0], t, P))) {
                    setMove(M[0], t, P, N, null, D);
                    return N;
                }
            } else if (tr) {
                // pawn move. not a check for tc because a=0. "ed" style not allowed.
                if (u) U = "NBRQ".indexOf(u) + 2;
                // TR must always be given, (not in "cd" take style notation, need separate logic for that)
                t = TC + TR * 16;
                // 		A=P.A[c][0];
                // 		i=A.length;
                // 		// loop through every pawn & check from column, but code is shorter & simpler this way, with only slight added expense
                // 		// old style was figure out possible from locations and scan board if a pawn exists there
                // 		
                // 		// disambiguation is not needed for pawns
                // 		while (i--) {
                // 			f=A[i];
                // 			//alert('f:'+f+'; FC:'+FC+'; f&7:'+(f&7)+'; TC:'+TC+';');
                // 			// f:20; FC:-1; f&7:4; TC:4;
                // 			//if ((FC<0 && (f&7)==TC)||(f&7)==FC) alert('one')
                // 			//if ((f&7)==TC) alert('one');
                // 			//if (TC==f&7) alert('two');
                // 			//if (TC==4) alert('three')
                // 			if (  ( (FC<0 && (f&7)==TC)||(f&7)==FC) && isUncheckedPawnMove(f,t,P) ) M.push(f)
                // 		}
                console.log("ctm c:%s; v:%s;", c, 1);
                for (var _f2 in B) {
                    var _rr = B[_f2];
                    var _cc = _rr >> 4 & 1;
                    var _vv = _rr & 7;
                    if (_cc === c && _vv === 1) {
                        if (FC < 0 && (_f2 & 7) == TC || (_f2 & 7) == FC) {
                            var result = (0, _rules.isUncheckedPawnMove)(_f2 * 1, t, P);
                            if (result) M.push(_f2 * 1);
                        }
                    }
                }
                console.log("ctm M:" + M + "; l:" + M.length + ";");
                l = M.length;
                if (l == 1 && (N = (0, _rules.calculateLegal)(M[0], t, P))) {
                    setMove(M[0], t, P, N, U);
                    return N;
                } else {
                    console.log("ctm nope.");
                }
            } else {
                // castling 
                // don't need to check if king occupies from square.
                // this.R.kc does NOT check that, but castling flags would be unset otherwise.
                // disambiguation not needed for kings
                t = m.indexOf("O-O-O") < 0 ? c * 112 + 6 : c * 112 + 2;
                f = c * 112 + 4;
                //if (m.indexOf('O-O-O')>0) alert('queenside castle from:'+f+'; to:'+t+';')
                //else alert('kingside castle from:'+f+'; to:'+t+';')
                if ((0, _rules.isLegalCastling)(f, t, P) && (N = (0, _rules.calculateLegal)(f, t, P))) {
                    setMove(f, t, P, N, null);
                    return N;
                }
            }
            return l * -1;
        };
        var setMove = function setMove(f, t, P, N, u, D) {
            // set Moves !!! return nothing. arguments: from, to, P =OldPosition, N=NewPosition, u = promote, D= disambiguation required in san string.
            var i, j, h = P.h + 1, k = P.k, e = 0, B = P.B, r = B[f], c = r >> 4 & 1, v = r & 7, d = B[t], m = r | f << 5 | t << 12, s;
            //, A= this.zxa(P.A), D= this.zxa(P.D),p=P.p+1;
            //var M = [[{r:r,f:f,t:t,u:0,S:S,O:O}]];
            var M = [ [ {
                r: r,
                f: f,
                t: t,
                u: 0
            } ] ];
            console.log("setMove f:" + f + "; t:" + t + "; m1:" + m + "; R:" + r + "; F:" + (f << 5) + "; T:" + (t << 12) + "; ?:" + (r | f << 5 | t << 12) + ";");
            if (d) {
                // dead piece
                m |= 1 << 22;
                //M[1]=[{r:d,f:t,t:-1,u:0,S:S,O:O}]; // from, to, value
                M[1] = [ {
                    r: d,
                    f: t,
                    t: -1,
                    u: 0
                } ];
            }
            switch (v) {
              // piece value
                case 1:
                // pawns
                if (u) {
                    // promote
                    //console.log('setM promote u:'+u+'; u<<19:'+(u<<19)+';')
                    m |= u << 19;
                    //console.log('setM?:'+((m>>19)&7)+';')
                    var V = c * 16 + 8 + u;
                    var U = c * 16 + 1;
                    N.B[t] = c * 16 + 8 + u;
                    // update piece value, the 8 is the promoted flag
                    //console.log('promote pawn f:'+f+'; t:'+t+'; r:'+B[t]+'; A:'+P.A[c][0]+';')
                    // 				var debug = N.A[c][0];
                    // 				debug.forEach( function(item) { // debug
                    // 					if (item === null || typeof item === "undefined") console.log("game pawn:%s;",JSON.stringify(debug)); // debug
                    // 				}); // debug
                    // 				
                    // 				this.zxm(t,N.A[c][0]) // remove pawn from piece array
                    // 				N.A[c][u-1].push(t) // and add new piece to piece array
                    // 			
                    //if (M.length>1) M[1].push({r:r,f:t,t:t,u:U,v:V,S:S,O:O}); // kill and promotion
                    //else M[1] = [{r:r,f:t,t:t,u:U,v:V,S:S,O:O}]; // just a promotion
                    if (M.length > 1) M[1].push({
                        r: r,
                        f: t,
                        t: t,
                        u: U,
                        v: V
                    }); else M[1] = [ {
                        r: r,
                        f: t,
                        t: t,
                        u: U,
                        v: V
                    } ];
                } else {
                    // possible ep take
                    i = c ? -16 : 16;
                    // colorAdjust // black,white
                    if (t - f == i + i) e = f + i;
                    if (t == P.e) {
                        m |= 1 << 23;
                        //console.log('ep take');
                        j = t - i;
                        // enPassantKillSquare
                        //M[1] = [{r:B[j],f:j,t:-1,u:B[j],S:S,O:O}]; //  from,to,value // add enPassant to move arrray
                        M[1] = [ {
                            r: B[j],
                            f: j,
                            t: -1,
                            u: B[j]
                        } ];
                    }
                }
                break;

              case 6:
                // king
                i = t - f;
                if (i == 2 || i == -2) {
                    // castle // requires legal check already performed // must check 2 || -2
                    if (i > 0) {
                        // kingside
                        m |= 1 << 24;
                        i = t + 1;
                        // rook from
                        j = t - 1;
                    } else {
                        // queenside
                        m |= 1 << 25;
                        i = f - 4;
                        // rook from
                        j = f - 1;
                    }
                    //console.log('castle')
                    //M[0].push([i,j,0,S,O]);//,B[j]]; // from,to (rook)
                    //M[0].push({r:B[i],f:i,t:j,u:0,S:S,O:O});//,B[j]]; // from,to (rook)
                    M[0].push({
                        r: B[i],
                        f: i,
                        t: j,
                        u: 0
                    });
                }
            }
            // calculate check !
            //var ch = ''
            if ((0, _rules.isCheck)(N)) {
                // if is check
                if (!(0, _rules.hasLegalMove)(N)) m |= 1 << 27; else m |= 1 << 26;
            }
            N.m = m;
            //console.log('setM m:'+m+';');
            N.M = M;
        };
    }, /* 3 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _rules = __webpack_require__(1);
        Object.keys(_rules).forEach(function(key) {
            if (key === "default" || key === "__esModule") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _rules[key];
                }
            });
        });
        var _game = __webpack_require__(0);
        Object.keys(_game).forEach(function(key) {
            if (key === "default" || key === "__esModule") return;
            Object.defineProperty(exports, key, {
                enumerable: true,
                get: function get() {
                    return _game[key];
                }
            });
        });
        var _pgn = __webpack_require__(2);
        //const position = fen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
        var position = (0, _game.fen)("k7/8/8/3p4/8/8/4p1K1/8 b - - 1 3");
        console.log("position:%s;", JSON.stringify(position));
        var from = (0, _game.ucv)("e2");
        var to = (0, _game.ucv)("e4");
        var ok = (0, _rules.isLegal)(from, to, position);
        console.log("from:%s;", from);
        console.log("to:%s;", to);
        console.log("isLegal:%s;", JSON.stringify(ok));
        var all = (0, _rules.allLegal)(from, position);
        console.log("allLegal:%s;", JSON.stringify(all));
        var pgn = "1. e4 e5 2. Nf3 Nc6";
        var result = (0, _pgn.pgnParse)(pgn);
        console.log(JSON.stringify(result));
    } ]);
});