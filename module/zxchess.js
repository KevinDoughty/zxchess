// Position:
// {B:B,p:p,k:k,e:e,h:h,z:z,M:[],A:A,D:[[],[]]}
// Board,ply,kingcastling,enpassanttargetsquare,halfmove(fiftymove)count,zobrist,Alive,Dead

//rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
//{"B":{"0":4,"1":34,"2":67,"3":101,"4":134,"5":163,"6":194,"7":228,"16":257,"17":289,"18":321,"19":353,"20":385,"21":417,"22":449,"23":481,"96":529,"97":561,"98":593,"99":625,"100":657,"101":689,"102":721,"103":753,"112":788,"113":818,"114":851,"115":885,"116":918,"117":947,"118":978,"119":1012},
//"p":0,"k":15,"e":0,"h":0,"z":0,"M":[]}

var AttackArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 40, 0, 0, 40, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 40, 0, 0, 0, 0, 48, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 48, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 48, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 4, 48, 4, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 104, 112, 104, 4, 0, 0, 0, 0, 0, 0, 48, 48, 48, 48, 48, 48, 112, 0, 112, 48, 48, 48, 48, 48, 48, 0, 0, 0, 0, 0, 0, 4, 104, 112, 104, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 4, 48, 4, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 48, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 48, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 48, 0, 0, 0, 0, 40, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 40, 0, 0, 40, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    DeltaArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, -17, 0, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, 0, -15, 0, 0, -17, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, -15, 0, 0, 0, 0, -17, 0, 0, 0, 0, -16, 0, 0, 0, 0, -15, 0, 0, 0, 0, 0, 0, -17, 0, 0, 0, -16, 0, 0, 0, -15, 0, 0, 0, 0, 0, 0, 0, 0, -17, 0, 0, -16, 0, 0, -15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -17, -33, -16, -31, -15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -18, -17, -16, -15, -14, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 14, 15, 16, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 31, 16, 33, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 16, 0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 16, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 16, 0, 0, 0, 0, 17, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 17, 0, 0, 15, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    MoveArray = [[1, 16, 15, 17], [6, -16, -17, -15], [18, 33, 31, 14, -31, -33, -18, -14], [-15, -17, 15, 17], [-1, -16, 1, 16], [-15, -17, 15, 17, -1, -16, 1, 16]],
    il = function il(f, t, P) {
	// is legal move (from, to, Position)
	var c,
	    p = P.p,
	    h = p & 1,
	    B = P.B,
	    r = B[f]; //color,ply,h=turn,Board,rawpiece
	if (r) {
		// if piece exists at that square
		c = r >> 4 & 1;
		if (c == h && ip(f, t, P)) {
			return cl(f, t, P); // return NEW POSITION
		}
	}
},
    cl = function cl(f, t, P) {
	// calculate legal // (trim legal) move already determined to be a correct piece move & right turn, now test for check
	var B = P.B,
	    r = B[f],
	    c = r >> 4 & 1;
	var N = setP(f, t, P),
	    k = kl(c, N);
	if (!aa(c ^ 1, k, N)) return N; // return NEW POSITION
},
    ip = function ip(f, t, P) {
	// is unchecked piece move (from, to, Position)
	var B = P.B,
	    r = B[f],
	    v = r & 7;
	switch (v) {
		case 1:
			return pm(f, t, P);
		case 6:
			if (Math.abs(t - f) == 2) return kc(f, t, P);
			return ik(f, t, P);
	}
	return ig(f, t, P);
},
    pm = function pm(f, t, P) {
	// is unchecked pawn move
	var B = P.B,
	    r = B[f],
	    c = r >> 4 & 1,
	    m = MoveArray[c],
	    d = m[1];
	if (t == f + d) return !B[t];
	if (t == f + d + d) return f >> 4 == m[0] && !B[f + d] && !B[t];
	if (t == f + m[2] || t == f + m[3]) return cc(c, t, B, 1) || P.e == t; // 0x88 check not needed
},
    ik = function ik(f, t, P) {
	// is unchecked king regular move // split off of ip() because I thought pgn might need it... but I think I'm just going to call ip() from pgn.
	var B = P.B,
	    r = B[f],
	    c = r >> 4 & 1;
	return AttackArray[t - f + 128] >> 6 & 1 && cc(c, t, B); // 0x88 check not needed
},
    kc = function kc(f, t, P) {
	// is legal castle (from, to, Position)
	var B = P.B,
	    r = B[f],
	    c = r >> 4 & 1,
	    e = c ^ 1,
	    x = f > t,
	    d = x * -2 + 1,
	    b = 1 << x << c * 2;
	if (f != c * 112 + 4 || !(P.k & b)) return;
	return !(B[f + d] || B[t] || x && B[f - 3] || aa(e, f, P) || aa(e, f + d, P)); // "to" square is checked in trim.
},
    kl = function kl(c, P) {
	// king loc (color,Position) // I might strip this out
	var B = P.B,
	    f;
	for (f in B) {
		var r = B[f],
		    C = r >> 4 & 1,
		    v = r & 7;
		if (C === c && v === 6) return f * 1;
	}
},
    cc = function cc(C, t, B, p) {
	// check color (color,to,Board,ispawn)
	var r = B[t],
	    c = r >> 4 & 1;
	if (r) return C != c;
	return !p;
},
    aa = function aa(e, k, P) {
	// any piece is attacking (enemycolor,kingloc,Position)
	var B = P.B,
	    f;
	for (f in B) {
		var r = B[f],
		    c = r >> 4 & 1;
		if (c === e && ia(f * 1, k, P)) {
			return 1;
		}
	}
	// return false implied
},
    ia = function ia(f, t, P) {
	// is attacking (from, to, Position)
	var B = P.B,
	    r = B[f],
	    v = r & 7;
	if (v === 1) {
		// pawns. ep check not needed, for testing check.
		var M = MoveArray[r >> 4 & 1];
		return t === f + M[2] || t === f + M[3]; // 0x88 check not needed
	}
	if (v === 6) return !(t & 0x88) && AttackArray[t - f + 128] >> v & 1;
	return ig(f, t, P); // doesn't need checkcolor in is legal generic move, but whatever...
},
    ig = function ig(f, t, P) {
	// is legal generic move
	var B = P.B,
	    r = B[f],
	    v = r & 7,
	    a = t - f + 128,
	    d; // attackArrayIndex, delta
	if (!(t & 0x88) && AttackArray[a] >> v & 1) {
		d = DeltaArray[a];
		f += d;
		if (f != t) do {
			if (B[f]) return;
			f += d;
		} while (f != t);
		return cc(r >> 4 & 1, t, B);
	}
	// return false implied
},


// THESE SHOULD BE COMBINED. NO NEED TO CALC HAS ANY LEGAL MOVE SEVERAL TIMES.
ic = function ic(P) {
	// is check // called in setM() to determine check
	var p = P.p,
	    h = p & 1,
	    k = kl(h, P);
	return aa(h ^ 1, k, P);
},
    hl = function hl(P) {
	// has legal move // called in setM() to determine check
	var B = P.B,
	    h = P.p & 1,
	    f; // Boardarray, h=turn, rawpiece, A=alive pieces, current pieces, M=all moves
	for (f in B) {
		var r = B[f],
		    c = r >> 4 & 1;
		if (c !== h) {
			var M = al(f * 1, P);
			if (M.length) return 1;
		}
	}
	// return false implied
},
    al = function al(f, P) {
	// all legal squares (from, Position) // DOES NOT INCLUDE PROMOTION, not sufficient for perft
	var B = P.B,
	    r = B[f],
	    c = r >> 4 & 1,
	    v = r & 7,
	    h = P.p & 1,
	    M; // Board, rawpiece, color, value, h=turn, M=allMoves
	if (c == h) {
		switch (v) {
			case 6:
				// king
				M = ak(f, P);
				break;
			case 1:
				M = ap(f, P);
				break;
			default:
				M = ag(f, P);
		}
		return tm(M, f, P); // trim !
	}
	return [];
},
    ap = function ap(f, P) {
	// all unchecked pawn moves (from, Position)
	var B = P.B,
	    r = B[f],
	    c = r >> 4 & 1,
	    U = [],
	    M = MoveArray[c],
	    d = M[1],
	    l = f + M[2],
	    r = f + M[3],
	    e = P.e; // Board, rawpiece, color, U=allUntrimmedMoves (returned), M=pawn directions, d=direction(from M),l=left(from M),r=right(from M), e= ep target square
	if (!B[f + d]) {
		U.push(f + d);
		if (f >> 4 == M[0] && !B[f + d + d]) U.push(f + d + d);
	}
	if (!(l & 0x88) && (cc(c, l, B, 1) || l == e)) U.push(l); // 0x88 check is needed
	if (!(r & 0x88) && (cc(c, r, B, 1) || r == e)) U.push(r); // 0x88 check is needed
	return U;
},
    ak = function ak(f, P) {
	// all unchecked king moves (from, Position)
	var B = P.B,
	    r = B[f],
	    c = r >> 4 & 1,
	    D = MoveArray[5],
	    i = 8,
	    d,
	    t,
	    M = []; // Board, rawpiece, color, value, D = piece Direction array (just using queen, it's the same, and do not confuse with Delta array), i = Direction length, d = individual direction, t= to square, M=allMoves
	while (i--) {
		d = D[i];
		t = f + d;
		if (!(t & 0x88) && AttackArray[t - f + 128] >> 6 & 1 && cc(c, t, B)) M.push(t); // do I need 0x88 check when using Attack Array?
	}
	if (kc(f, f + 2, P)) M.push(f + 2);
	if (kc(f, f - 2, P)) M.push(f - 2);
	return M;
},
    ag = function ag(f, P) {
	var B = P.B,
	    r = B[f],
	    c = r >> 4 & 1,
	    v = r & 7,
	    D = MoveArray[v],
	    t,
	    d,
	    i = D.length,
	    M = []; // Board, rawpiece, color, value, Directions (move array), t=to square, d=individual delta, i = move array length, M=allUntrimmedMoves
	while (i--) {
		d = D[i];
		t = f + d;
		while (!(t & 0x88) && AttackArray[t - f + 128] >> v & 1 && !B[t]) {
			M.push(t);
			t += d;
		}
		if (!(t & 0x88) && AttackArray[t - f + 128] >> v & 1 && cc(c, t, B)) M.push(t);
	}
	return M;
},
    tm = function tm(U, f, P) {
	// trim moves (Untrimmed, from, Position)
	var B = P.B,
	    r = B[f],
	    c = r >> 4 & 1,
	    e = c ^ 1,
	    k,
	    t,
	    i = U.length,
	    M = [],
	    N; // Board, rawpiece, color, enemycolor, kingloc, to, i=Untrimmed length, M= allTrimmedMoves, N=newPosition
	while (i--) {
		t = U[i];
		N = setP(f, t, P); // Do not need to deal with promoting pawns, will not effect if my king is in check
		k = kl(c, N);
		if (!aa(e, k, N)) M.push(U[i]);
	}
	return M;
},
    setP = function setP(f, t, P) {
	// set Position // return position json // from 0x88, to 0x88, (promote value Moved to setM) // move has already been determined to be legal, except for "possible" and "any" moves, but they are legal except don't consider checks
	var i,
	    j,
	    h = P.h + 1,
	    k = P.k,
	    e = 0,
	    B = Bc(P.B),
	    r = B[f],
	    c = r >> 4 & 1,
	    v = r & 7,
	    d = B[t],
	    p = P.p + 1;
	if (d) {
		// dead piece at "to" square, direct hit not en passant
		i = c ^ 1; // dead piece color // same as d>>4&1
		j = (d & 7) - 1; // dead piece value (shifted for array)
		h = 0; // reset 50 move count
	}
	B[t] = B[f]; // move piece to new square
	delete B[f]; // empty old square
	switch (v) {// piece value
		case 1:
			// pawns
			h = 0; // reset 50 move count
			i = c ? -16 : 16; // colorAdjust // black,white
			if (t - f == i + i) e = f + i;else if (t == P.e) {
				j = t - i; // enPassantKillSquare
				delete B[j]; // delete from current board
			}
			break;
		case 4:
			// rooks
			if (c) {
				// black
				if (f == 119) k &= 11; // kingside // everything but 4
				if (f == 112) k &= 7; // queenside // everything but 8
			} else {
				// white
				if (f == 7) k &= 14; // kingside // everything but 1
				if (f == 0) k &= 13; // queenside // everything but 2
			}
			break;
		case 6:
			// king
			if (c) k &= 3; // black
			else k &= 12; // white
			i = t - f;
			if (i == 2 || i == -2) {
				// castle // requires legal check already performed // must check 2 || -2
				if (i > 0) {
					// kingside
					i = t + 1; // rook from
					j = t - 1; // rook to
				} else {
					// queenside
					i = f - 4; // rook from
					j = f - 1; // rook to
				}
				B[j] = B[i];
				delete B[i];
			}
	}

	var zo = 0; // zobrist // not done // calculate in set2

	// Tree:
	//this.T = [{S:[{B:{}}],b:0,s:0}];

	// Position:
	// {B:B,p:p,k:k,e:e,h:h,z:z,M:[],A:A,D:[[],[]]}
	// Board,ply,kingcastling,enpassanttargetsquare,halfmove(fiftymove)count,zobrist,Alive,Dead

	return { B: B, p: p, k: k, e: e, h: h, z: zo };
},
    Bc = function Bc(w) {
	// board copy
	var i,
	    O = {};
	for (i in w) {
		O[i] = w[i];
	}return O;
};

function everyPossiblePosition(position) {
	var board = position.B;
	var result = [];

	var _loop = function _loop(f) {
		var moves = allLegal(f * 1, position);
		moves.forEach(function (move) {
			var next = setP(f * 1, move, position);
			var r = board[f],
			    c = r >> 4 & 1,
			    v = r & 7;
			if (v == 1 && (c == 0 && move >> 4 == 7 || c == 1 && move >> 4 == 0)) {
				// manually handle promotion
				var rook = setP(f * 1, move, position);
				var bishop = setP(f * 1, move, position);
				var queen = setP(f * 1, move, position);
				next.B[move] = c * 16 + 8 + 2; // update piece value, the 8 is the promoted flag
				bishop.B[move] = c * 16 + 8 + 3; // update piece value, the 8 is the promoted flag
				rook.B[move] = c * 16 + 8 + 4; // update piece value, the 8 is the promoted flag
				queen.B[move] = c * 16 + 8 + 5; // update piece value, the 8 is the promoted flag
				result.push(queen);
				result.push(rook);
				result.push(bishop);
			}
			result.push(next);
		});
	};

	for (var f in board) {
		_loop(f);
	}
	return result;
}

var isLegal = function isLegal(f, t, P) {
	return il(f, t, P);
};

var allLegal = function allLegal(f, P) {
	return al(f, P);
};

var isUncheckedPieceMove = function isUncheckedPieceMove(f, t, P) {
	return ip(f, t, P);
};

var calculateLegal = function calculateLegal(f, t, P) {
	return cl(f, t, P);
};

var isUncheckedPawnMove = function isUncheckedPawnMove(f, t, P) {
	return pm(f, t, P);
};

var isCheck = function isCheck(P) {
	return ic(P);
};

var hasLegalMove = function hasLegalMove(P) {
	return hl(P);
};

var isLegalCastling = function isLegalCastling(f, t, P) {
	return kc(f, t, P);
};

var Game = {
	//////////////////////////////////////

	/*
 	zxua : function(w) { // multi-dimensional array copy
 	var i;
 	if (i=w.length) {
 		var a=[];
 		while (i--) a[i]= this.zxq(w[i]);
 		return a
 	}
 	return w
 },
 	zxa : function(w) { // multi-dimensional array copy, MUST be passed an array with NUMBERS not strings
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
				if (typeof l === "undefined" || l === null) h.splice(i, 1);else h.splice(i, 1, l);
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
		return "abcdefgh".charAt(s & 7) + ((s >> 4) + 1); //return "abcdefgh".charAt((s%8))+(((s>>3)-8)*-1)
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
		//rnbqk2r/pp2bppp/2p1pn2/2Pp4/1P1PP3/P1N2N2/1B3PPP/R2QKB1RÊwÊKQkqÊ-Ê3Ê10
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
		var F = this.trim(this.zg(_fen)),
		    a = F.split(/\s/g),
		    t,
		    k = 0,
		    h,
		    n,
		    e,
		    p,
		    B = {},
		    A = [[[], [], [], [], [], []], [[], [], [], [], [], []]];
		if (a.length == 6) {
			var m = a[0].split(/\//); // fen board
			if (m.length == 8) {
				h = a[4] * 1;
				n = a[5] * 1;
				if (a[3] == "-") e = 0;else e = this.vucv(a[3]);
				if (a[0].match(/[^pnbrqk\/1-8]/i) || "wb".indexOf(a[1]) < 0 || a[2] != "-" && a[2].match(/[^KQkq]/) || h != a[4] || h < 0 || n != a[5] || n < 0 || e < 0) return;
				t = a[1] == 'b' ? 1 : 0;
				if (a[2].indexOf("K") >= 0) k += 1;
				if (a[2].indexOf("Q") >= 0) k += 2;
				if (a[2].indexOf("k") >= 0) k += 4;
				if (a[2].indexOf("q") >= 0) k += 8;
				p = (n - 1) * 2 + t; // ply / step
				var v,
				    c,
				    q,
				    f,
				    r = 0,
				    w = 0,
				    b = 0,
				    i = 8,
				    j,
				    l,
				    N = 0;
				while (i--) {
					// not strict would probably need some checks here
					f = 0;
					for (j = 0; j < m[i].length; j++) {
						l = m[i][j];
						if (l * 1 == l) f += l * 1; //
						else {
								q = f + r * 16;
								if (v = "PNBRQK".indexOf(l) + 1) c = 0; // index is 0-5 not 1-6
								else if (v = "pnbrqk".indexOf(l) + 1) c = 1; // index is  0-5 not 1-6
									else return; // strict // except allows illegal number of pieces other than kings
								if (v == 6 && (c && ++b > 1 || !c && ++w > 1)) return; // strict // too many kings
								B[q] = (N++ << 5) + c * 16 + v; // Now with NUMBERING // fen says nothing about promoted pawn. bfen & bpgn is different
								A[c][v - 1].push(q);
								f++;
							}
					}
					r++;
				}
			} else return; // improperly formatted fen
		} else return; // improperly formatted fen
		if (!w || !b) return; // missing king
		var z = 0; // zobrist not done
		return { B: B, p: p, k: k, e: e, h: h, z: z, M: [] };
		// what about step/start offset ???
		// that should be stored in the branch, shouldn't it?
		// start offset is pure branch array info
		// but FEN stores move, so ply should be included in position!
	},

	ncn: function ncn(P, O) {
		// create notation // CHESS SPECIFIC !!! // P= current position after setM, O=previous position if disambiguation needed
		// uses new crazy m bitwise shifted move representation
		// O = previous position if disambiguation needed.
		// pass previous position to check for da
		// Actually, ctm() only counts this.R.ip() but does not consider pinned pieces which do not require da.
		// but there are some savings by counting ip() in ctm()
		//if (d) console.log('ncn da needed');
		var N = "  NBRQK",
		    R = "abcdefgh"; // internationalize !!!
		var m = P.m,
		    r = m & 31,
		    v = r & 7,
		    f = m >> 5 & 127,
		    t = m >> 12 & 127,
		    u = m >> 19 & 7,
		    ch = m >> 26 & 1,
		    cm = m >> 27 & 1,
		    x = m >> 22 & 1,
		    e = m >> 23 & 1,
		    U = '',
		    L = N[v],
		    X = x || e ? "x" : "",
		    C = "",
		    D = "",
		    T;
		T = this.cv(t);
		if (cm) C = "#";else if (ch) C = "+";
		if (v == 6) {
			if (m >> 24 & 1) return "O-O" + C;
			if (m >> 25 & 1) return "O-O-O" + C;
		} else if (v == 1) {
			L = x || e ? R[f & 7] : '';
			if (u) U = '=' + N[u];
		} else if (O) {
			D = this.da(O, f, t, r >> 4 & 1, v);
		}
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
		var R = "87654321",
		    C = "abcdefgh"; // internationalize !!!!
		var A = P.A[c][v - 1],
		    i = A.length,
		    L = [],
		    x = 0,
		    y = 0,
		    fc = f & 7,
		    fr = f >> 4;
		while (i--) {
			if (A[i] != f && this.il(A[i], t, P)) L.push(A[i]); // don't check piece that was moved (A[i]!=f)
		}
		if (i = L.length) {
			while (i--) {
				if (L[i] >> 4 == fr) y++;
				if ((L[i] & 7) == fc) x++;
			}
			if (x && y) return C[fc] + R[fr];
			if (x) return R[fr];
			return C[fc];
		}
		return ""; // da not needed.
	}
};

var exportFen = function exportFen(P) {
	//(B,G) {
	var B = P.B;
	var e = 0,
	    l,
	    k = '',
	    q,
	    f = '',
	    h = P.p;
	for (var r = 7; r > -1; r--) {
		if (e > 0) {
			f += e;
			e = 0;
		}
		if (r < 7) f += '/';
		for (var c = 0; c < 8; c++) {
			q = B[c + r * 16];
			if (q == null) {
				e++;
			} else {
				if (e > 0) f += e;
				e = 0;
				l = " pnbrqk".charAt(q & 7);
				if (q & 16) f += l;else f += l.toUpperCase();
			}
		}
	}
	if (e > 0) f += e;
	f += ' ' + (h & 1 ? 'b' : 'w') + ' ';
	var kc = P.k;
	if (kc & 1) k += 'K';
	if (kc & 2) k += 'Q';
	if (kc & 4) k += 'k';
	if (kc & 8) k += 'q';
	f += (k == '' ? '-' : k) + ' ';
	f += (P.e ? this.cv(P.e) : '-') + ' ' + P.h + ' ' + (Math.floor(h / 2) + 1);
	return f;
};

var importFen = function importFen(string) {
	return Game.fen(string);
};
var cv = Game.cv;
var ucv = Game.ucv;

export { allLegal, calculateLegal, cv, everyPossiblePosition, exportFen, hasLegalMove, importFen, isCheck, isLegal, isLegalCastling, isUncheckedPawnMove, isUncheckedPieceMove, ucv };
