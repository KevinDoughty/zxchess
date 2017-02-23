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
        return __webpack_require__(__webpack_require__.s = 2);
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
                return {
                    B: B,
                    p: p,
                    k: k,
                    e: e,
                    h: h,
                    z: z,
                    M: [],
                    A: A,
                    D: [ [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ] ]
                };
            },
            ///////////////////////////////////////
            setM: function setM(f, t, P, N, u, D) {
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
                //console.log('setM f:'+f+'; t:'+t+'; m1:'+m+'; R:'+r+'; F:'+(f<<5)+'; T:'+(t<<12)+'; ?:'+(r|(f<<5)|(t<<12))+';')
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
                        var debug = N.A[c][0];
                        debug.forEach(function(item) {
                            // debug
                            if (item === null || typeof item === "undefined") console.log("game pawn:%s;", JSON.stringify(debug));
                        });
                        // debug
                        this.zxm(t, N.A[c][0]);
                        // remove pawn from piece array
                        N.A[c][u - 1].push(t);
                        // and add new piece to piece array
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
                if (this.ic(N)) {
                    // if is check
                    if (!this.hl(N)) m |= 1 << 27; else m |= 1 << 26;
                }
                N.m = m;
                //console.log('setM m:'+m+';');
                N.M = M;
                N.s = this.ncn(N, D ? P : null);
            },
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
        //"p":0,"k":15,"e":0,"h":0,"z":0,"M":[],
        //"A":[[[16,17,18,19,20,21,22,23],[1,6],[2,5],[0,7],[3],[4]],[[96,97,98,99,100,101,102,103],[113,118],[114,117],[112,119],[115],[116]]],"D":[[0,0,0,0,0,0],[0,0,0,0,0,0]]};
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
                //return P.A[c][5][0] // Alive array
                var B = P.B, f;
                // Board style
                for (f in B) {
                    var r = B[f], C = r >> 4 & 1, v = r & 7;
                    if (C === c && v === 6) return f;
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
                /*
  		// scan board style:
  		var B=P.B,f,j,i=8,r;
  		while (i--) {
  			j=8;
  			while (j--) {
  				f= i*16+j;
  				r=B[f];
  				if (r && r>>4&1==c && this.ia(f,t,P)) return 1;
  			}
  		}
  		// return false implied
  */
                // scan board style, but might cause unterminated?
                var B = P.B, f;
                //console.log("=====> aa e:%s; k:%s; B:%s;",e,k,JSON.stringify(B));
                for (f in B) {
                    var r = B[f], c = r >> 4 & 1;
                    //console.log("f:%s; r:%s; c:%s;",f,r,c);
                    if (c === e && this.ia(f, k, P)) return 1;
                }
            },
            ia: function ia(f, t, P) {
                // is attacking (from, to, Position) // no more switch. speed is the same. this is shorter.
                var B = P.B, r = B[f], v = r & 7;
                if (v == 1) {
                    // pawns. ep check not needed, for testing check.
                    var M = this.M[r >> 4 & 1];
                    return t == f + M[2] || t == f + M[3];
                }
                if (v == 6) return !(t & 136) && this.A[t - f + 128] >> v & 1;
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
                // 		var B=P.B, h=P.p&1, r, A=P.A[h],i=A.length,j,p,M; // Boardarray, h=turn, rawpiece, A=alive pieces, current pieces, M=all moves
                // 		// Alive array
                // 		while (i--) {
                // 			p=A[i];
                // 			j=p.length;
                // 			while (j--) {
                // 				M = this.al(p[j],P);
                // 				if (M.length) return 1
                // 			}
                // 		}
                var B = P.B, h = P.p & 1, f;
                // Boardarray, h=turn, rawpiece, A=alive pieces, current pieces, M=all moves
                for (f in B) {
                    var r = B[f], c = r >> 4 & 1;
                    if (c === h) {
                        var M = this.al(f, P);
                        if (M.length) return 1;
                    }
                }
            },
            al: function al(f, P) {
                // all legal moves (z=object,from, Position)
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
                    //N = z.setP(f,t,P,0); // Do not need to deal with promoting pawns, will not effect if my king is in check
                    N = this.setP(f, t, P, 0);
                    // Do not need to deal with promoting pawns, will not effect if my king is in check
                    k = this.kl(c, N);
                    if (!this.aa(e, k, N)) M.push(U[i]);
                }
                return M;
            },
            //// misc functions:
            cp: function cp(P, t) {
                // can promote // current position, moved to // used in ald() or ald2() I forget
                var B = P.B, r = B[t], c = r >> 4 & 1;
                return (r & 7) == 1 && (!c && t >> 4 == 7 || c && t >> 4 == 0);
            },
            wtf: function wtf(position) {
                var alive = position.A;
                alive.forEach(function(side) {
                    side.forEach(function(type) {
                        type.forEach(function(piece) {
                            if (piece === null || typeof piece === "undefined") {
                                return "WTF:" + JSON.stringify(position) + ";";
                            }
                        });
                    });
                });
                return null;
            },
            /////////////////////////////////////
            setP: function setP(f, t, P) {
                // set Position // return position json // from 0x88, to 0x88, (promote value Moved to setM) // move has already been determined to be legal, except for "possible" and "any" moves, but they are legal except don't consider checks
                //console.log('setP from:%s; to:%s; position:%s',f,t,P);
                //console.log('P.A:'+P.A+';')
                // MOVES TAKEN OUT !!!
                //console.log('A:'+P.A+';')
                //console.log('D:'+P.D+';')
                //var i,j, h = P.h+1, k = P.k, e = 0, B = new ZX.OC(P.B), r = B[f], c = r>>4&1, v = r&7, M = [[f,t]], d=B[t], A= this.zxa(P.A), D= this.zxa(P.D),p=P.p+1;
                var i, j, h = P.h + 1, k = P.k, e = 0, B = this.Bc(P.B), r = B[f], c = r >> 4 & 1, v = r & 7, d = B[t], A = this.Ac(P.A), D = this.Dc(P.D), p = P.p + 1;
                //console.log('A[%s]:%s; v-1:%s;',c,A[c],v-1);
                //console.log('A:'+A+';')
                // position: {B:B,p:p,k:k,e:e,h:h,z:z,M:[],A:A,D:[[],[]],m,s}
                if (A[c] === null || A[c] === undefined) {
                    console.log("damn.");
                }
                //console.log('set1 P.A:'+P.A+'; new A:'+A+';');
                //console.log('set1 P.D:'+P.D+'; new D:'+D+';');
                //var A = [this.zxq(P.A[0]),this.zxq(P.A[1])];
                //var D = [this.zxa(P.D[0]),this.zxa(P.D[1])];
                var debug = A[c][v - 1];
                debug.forEach(function(item) {
                    // debug
                    if (item === null || typeof item === "undefined") console.log("pre initial:%s;", JSON.stringify(debug));
                });
                // debug
                var test = this.zxm(f, A[c][v - 1], t);
                // move piece in piece array ... (contains piece locations)
                var debug = A[c][v - 1];
                debug.forEach(function(item) {
                    // debug
                    if (item === null || typeof item === "undefined" || test) console.log("post initial:%s;", JSON.stringify(debug));
                });
                // debug
                if (d) {
                    // dead piece at "to" square, direct hit not en passant
                    //M[1]=[t,-1,d]; // add to move array // from, to, value
                    i = c ^ 1;
                    // dead piece color // same as d>>4&1
                    j = (d & 7) - 1;
                    // dead piece value (shifted for array)
                    if (d & 8) D[i][0]++; else D[i][j]++;
                    // else ++ dead piece
                    var debug = A[i][j];
                    debug.forEach(function(item) {
                        // debug
                        if (item === null || typeof item === "undefined" || test) console.log("pre dead:%s;", JSON.stringify(debug));
                    });
                    // debug
                    var test = this.zxm(t, A[i][j]);
                    // remove dead piece from piece array
                    var debug = A[i][j];
                    debug.forEach(function(item) {
                        // debug
                        if (item === null || typeof item === "undefined" || test) {
                            console.log("post dead:%s;", JSON.stringify(debug));
                            // debug
                            console.log("color:%s; value:%s; from:%s; to:%s;", i, j, f, t);
                        }
                    });
                    // debug
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
                        // delete from current board
                        var debug = A[c ^ 1][0];
                        debug.forEach(function(item) {
                            // debug
                            if (item === null || typeof item === "undefined") console.log("pre pawn:%s;", JSON.stringify(debug));
                        });
                        // debug
                        var test = this.zxm(j, A[c ^ 1][0]);
                        // delete from Alive array
                        var debug = A[c ^ 1][0];
                        debug.forEach(function(item) {
                            // debug
                            if (item === null || typeof item === "undefined" || test) console.log("post pawn:%s;", JSON.stringify(debug));
                        });
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
                        //console.log('castle move rook')
                        //console.log('castle move rook f:'+f+'; t:'+t+'; A:'+A+'; i:'+i+'; j:'+j+'; A[c][3]:'+A[c][3]+';');
                        var debug = A[c][3];
                        if (debug.indexOf(i) < 0) {
                            console.log("not there:%s;", JSON.stringify(debug));
                            console.log("c:%s; i:%s; j:%s;", c, i, j);
                            console.log("Board:%s;", JSON.stringify(B));
                            console.log("Pieces:%s;", JSON.stringify(A));
                            var rrr = B[i], ccc = rrr >> 4 & 1, vvv = rrr & 7;
                            console.log("verify r:%s; c:%s; v:%s;", rrr, ccc, vvv);
                        }
                        debug.forEach(function(item) {
                            // debug
                            if (item === null || typeof item === "undefined") console.log("pre king:%s;", JSON.stringify(debug));
                        });
                        // debug
                        var test = this.zxm(i, A[c][3], j);
                        // move rook in alive pieces array
                        //console.log('end castle move rook')
                        var debug = A[c][3];
                        debug.forEach(function(item) {
                            // debug
                            if (item === null || typeof item === "undefined" || test) {
                                console.log("post king:%s;", JSON.stringify(debug));
                                // debug
                                console.log("c:%s; i:%s; j:%s;", c, i, j);
                                console.log("Board:%s;", JSON.stringify(B));
                                console.log("Pieces:%s;", JSON.stringify(A));
                            }
                        });
                        // debug
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
                //return {B:B,p:p,k:k,e:e,h:h,z:z,M:M,A:A,D:D}
                return {
                    B: B,
                    p: p,
                    k: k,
                    e: e,
                    h: h,
                    z: zo,
                    A: A,
                    D: D
                };
            },
            Ac: function Ac(W) {
                // copy the Alive array // belongs in chess because it's specific.
                var i = 2, n, o, j, M = [ [], [] ];
                //M=[[[],[],[],[],[],[]],[[],[],[],[],[],[]]];
                while (i--) {
                    // colors 0,1
                    n = M[i];
                    o = W[i];
                    j = 6;
                    while (j--) {
                        // pieces
                        n[j] = o[j].slice();
                    }
                }
                return M;
            },
            // 414 calls, 5.01%, 41.359ms
            Dc: function Dc(W) {
                // copy the Dead array // belongs in chess because it's specific.
                var M = [];
                //M=[[[],[],[],[],[],[]],[[],[],[],[],[],[]]];
                //while (i--) { // colors 0,1
                M[0] = W[0].slice();
                M[1] = W[1].slice();
                //}
                return M;
            },
            // original was:
            // 414 calls, 15.1%, 124.664ms
            // new:
            // 414 calls, 12.8%, 67.82ms
            zxm: function zxm(n, h, l, debug) {
                // zx piece array move // needle, haystack, [new value (piece location)] // deletes at index or inserts optional new value
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
            Bc: function Bc(w) {
                // board copy // this doesn't include generic object functions, does it?
                var i, O = {};
                for (i in w) {
                    O[i] = w[i];
                }
                return O;
            }
        };
        var isLegal = exports.isLegal = function isLegal(from, to, position) {
            return ZX.il(from, to, position);
        };
        var allLegal = exports.allLegal = function allLegal(from, position) {
            return ZX.al(from, position);
        };
    }, /* 2 */
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
        var position = (0, _game.fen)("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
        console.log("position:%s;", JSON.stringify(position));
        var from = (0, _game.ucv)("e2");
        var to = (0, _game.ucv)("e4");
        var ok = (0, _rules.isLegal)(from, to, position);
        console.log("from:%s;", from);
        console.log("to:%s;", to);
        console.log("isLegal:%s;", JSON.stringify(ok));
        var all = (0, _rules.allLegal)(from, position);
        console.log("allLegal:%s;", JSON.stringify(all));
    } ]);
});