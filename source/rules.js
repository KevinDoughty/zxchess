// Position:
// {B:B,p:p,k:k,e:e,h:h,z:z,M:[],A:A,D:[[],[]]}
// Board,ply,kingcastling,enpassanttargetsquare,halfmove(fiftymove)count,zobrist,Alive,Dead


//rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
//{"B":{"0":4,"1":34,"2":67,"3":101,"4":134,"5":163,"6":194,"7":228,"16":257,"17":289,"18":321,"19":353,"20":385,"21":417,"22":449,"23":481,"96":529,"97":561,"98":593,"99":625,"100":657,"101":689,"102":721,"103":753,"112":788,"113":818,"114":851,"115":885,"116":918,"117":947,"118":978,"119":1012},
//"p":0,"k":15,"e":0,"h":0,"z":0,"M":[],
//"A":[[[16,17,18,19,20,21,22,23],[1,6],[2,5],[0,7],[3],[4]],[[96,97,98,99,100,101,102,103],[113,118],[114,117],[112,119],[115],[116]]],"D":[[0,0,0,0,0,0],[0,0,0,0,0,0]]};


const ZX = {

//ZX.R.fen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
//return ZX.R.fen("k7/8/8/8/8/8/P7/K7 w KQkq - 0 1");

	A:[0,0,0,0,0,0,0,0,0,40,0,0,0,0,0,0,48,0,0,0,0,0,0,40,0,0,40,0,0,0,0,0,48,0,0,0,0,0,40,0,0,0,0,40,0,0,0,0,48,0,0,0,0,40,0,0,0,0,0,0,40,0,0,0,48,0,0,0,40,0,0,0,0,0,0,0,0,40,0,0,48,0,0,40,0,0,0,0,0,0,0,0,0,0,40,4,48,4,40,0,0,0,0,0,0,0,0,0,0,0,4,104,112,104,4,0,0,0,0,0,0,48,48,48,48,48,48,112,0,112,48,48,48,48,48,48,0,0,0,0,0,0,4,104,112,104,4,0,0,0,0,0,0,0,0,0,0,0,40,4,48,4,40,0,0,0,0,0,0,0,0,0,0,40,0,0,48,0,0,40,0,0,0,0,0,0,0,0,40,0,0,0,48,0,0,0,40,0,0,0,0,0,0,40,0,0,0,0,48,0,0,0,0,40,0,0,0,0,40,0,0,0,0,0,48,0,0,0,0,0,40,0,0,40,0,0,0,0,0,0,48,0,0,0,0,0,0,40,0,0,0,0,0,0,0,0,0],
	D:[0,0,0,0,0,0,0,0,0,-17,0,0,0,0,0,0,-16,0,0,0,0,0,0,-15,0,0,-17,0,0,0,0,0,-16,0,0,0,0,0,-15,0,0,0,0,-17,0,0,0,0,-16,0,0,0,0,-15,0,0,0,0,0,0,-17,0,0,0,-16,0,0,0,-15,0,0,0,0,0,0,0,0,-17,0,0,-16,0,0,-15,0,0,0,0,0,0,0,0,0,0,-17,-33,-16,-31,-15,0,0,0,0,0,0,0,0,0,0,0,-18,-17,-16,-15,-14,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,14,15,16,17,18,0,0,0,0,0,0,0,0,0,0,0,15,31,16,33,17,0,0,0,0,0,0,0,0,0,0,15,0,0,16,0,0,17,0,0,0,0,0,0,0,0,15,0,0,0,16,0,0,0,17,0,0,0,0,0,0,15,0,0,0,0,16,0,0,0,0,17,0,0,0,0,15,0,0,0,0,0,16,0,0,0,0,0,17,0,0,15,0,0,0,0,0,0,16,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0],
	//Q:[-15,-17,15,17,-1,-16,1,16],
	//R:[-1,-16,1,16],
	//B:[-15,-17,15,17],
	//N:[18, 33, 31, 14, -31, -33, -18, -14],
	
	// first two intentionally left blank. move directions for piece value. there is no piece 0 and piece 1 is pawn, not used... but I could perhaps. color * value for pawn would make 0 for white, 1 for black, but still, too much specific logic required, like first move double push, en passant, takes legal, etc.
	M:[ [1,16,15,17] , [6,-16,-17,-15] , [18, 33, 31, 14, -31, -33, -18, -14], [-15,-17,15,17], [-1,-16,1,16], [-15,-17,15,17,-1,-16,1,16] ],
	il: function(f,t,P) { // is legal move (z=object,from, to, Position)
		var c,p = P.p, h=p&1, B=P.B,r=B[f]; //color,ply,h=turn,Board,rawpiece
		if (r) { // if piece exists at that square
			c = r>>4&1;
			if (c == h && this.ip(f,t,P)) {
				return this.cl(f,t,P); // return NEW POSITION !!!
			}
		}
	},
	cl:function(f,t,P) { // calculate legal // (trim legal) move already determined to be a correct piece move & right turn, now test for check
		var B=P.B, r=B[f], c=r>>4&1;
		//console.log('legal create position')
		//var N = z.setP(f,t,P), k = this.kl(c,N);
		var N = this.setP(f,t,P), k = this.kl(c,N);
		//console.log('end legal create position')
		//return (!this.aa(c^1,k,N)) // return BOOL
		if (!this.aa(c^1,k,N)) return N // return NEW POSITION !!!
	},
	ip: function(f,t,P) { // is unchecked piece move (from, to, Position)
		//console.log('ip f:'+f+'; t:'+t+';')
		var B=P.B,r=B[f],v=r&7;
		switch(v) {
			case 1:
				return this.pm(f,t,P);
			case 6:
				if (Math.abs(t-f)==2) return this.kc(f,t,P);
				return this.ik(f,t,P);
		}
		return this.ig(f,t,P)
	},
	pm:function(f,t,P) { // is unchecked pawn move
		var B=P.B,r=B[f],c=r>>4&1,m = this.M[c],d=m[1];
		if (t==f+d) return !B[t];
		if (t==f+d+d) return f>>4==m[0] && !B[f+d] && !B[t]
		//if (t==l || t==r) return !(t&0x88) && ( this.cc(c,t,B,1) || P.e==t ); // is 0x88 check needed here? I don't think so.
		if (t==f+m[2] || t==f+m[3]) return this.cc(c,t,B,1) || P.e==t; // is 0x88 check needed here? I don't think so.
	},
	ik:function(f,t,P) { // is unchecked king regular move // split off of ip() because I thought pgn might need it... but I think I'm just going to call ip() from pgn.
		var B=P.B, r=B[f], c=r>>4&1;
		//return !(t&0x88) && this.A[t-f+128]>>v&1 && this.cc(c,t,B,0); // is 0x88 check needed here? I don't think so.
		return this.A[t-f+128]>>6&1 && this.cc(c,t,B) // is 0x88 check needed here? I don't think so.
	},
	kc:function(f,t,P) { // is legal castle (from, to, Position)
		var B=P.B, r=B[f], c=r>>4&1, e=c^1, x=f>t, d=x*-2+1, b=1<<x<<c*2;// x=type, d=direction,b=bitwiseshift //b=(1<<x)<<(c*2) // operator precedence?
		if ( f!=c*112+4 || !(P.k&b) ) return;
		return !(B[f+d] || B[t] || (x && B[f-3]) || this.aa(e,f,P) || this.aa(e,f+d,P) ) // "to" square is checked in trim.
	},
	kl:function(c,P) {// king loc (color,Position) // I might strip this out
		//return P.A[c][5][0] // Alive array
		var B = P.B, f; // Board style
		for (f in B) {
			var r=B[f], C=r>>4&1, v=r&7;
			if (C === c && v === 6) return f;
		}
	},
	cc:function(C,t,B,p) { // check color (color,to,Board,ispawn)
		var r=B[t], c=r>>4&1;
		if (r) return C!=c;
		return !p
	},
	aa:function(e,k,P) { // any piece is attacking(enemycolor,kingloc,Position)
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
		// scan board style, but might cause unterminated? Or serious need for optimization
// 		var B=P.B,f;
// 		//console.log("=====> aa e:%s; k:%s; B:%s;",e,k,JSON.stringify(B));
// 		for (f in B) {
// 			var r = B[f], c = r >> 4&1;
// 			//console.log("f:%s; r:%s; c:%s;",f,r,c);
// 			if (c === e && this.ia(f,k,P)) return 1;
// 		}

		//scan Alive array style:
		var A=P.A[e],i=A.length,p,j;
		while (i--) {
			p=A[i];
			j=p.length;
			while (j--) {
				if (this.ia(p[j],k,P)) return 1
			}
		}
		// return false implied
	},

	ia:function(f,t,P) { // is attacking (from, to, Position) // no more switch. speed is the same. this is shorter.
		var B=P.B, r=B[f], v=r&7;
		if (v==1) {// pawns. ep check not needed, for testing check.
				var M=this.M[r>>4&1];
				return (t==f+M[2] || t==f+M[3]); // is 0x88 check needed here? I don't think so.
		}
		if (v==6) return !(t&0x88) && this.A[t-f+128]>>v&1 // operator precedence ?! // (this.A[t-f+128]>>v)&1
		return this.ig(f,t,P) // doesn't need checkcolor in is legal generic move, but whatever...
	},

	ig:function(f,t,P) { // is legal generic move
		var B=P.B, r=B[f], v=r&7, a=t-f+128, d; // attackArrayIndex, delta
		if ( !(t&0x88) && this.A[a]>>v&1 ) { // operator precedence?! // ((this.A[a]>>v)&1)
			d=this.D[a];
			f+=d;
			if (f!=t) do {
				if (B[f]) return;
				f+=d
			} while (f!=t);
			return this.cc(r>>4&1,t,B)
		}
		// return false implied
	},
	
	// THESE SHOULD BE COMBINED. NO NEED TO CALC HAS ANY LEGAL MOVE SEVERAL TIMES.
	ic:function(P) { // is check // called in setM() to determine check
		var p = P.p, h=p&1, k=this.kl(h,P);
		return this.aa(h^1,k,P)
	},
	
	im:function(P) { // is mate // requires z=this for hl() for al() for setP() // not used
		if ( !this.hl(P) ) return this.ic(P)
		// return false implied
	},
	is:function(P) { // is stalemate // I don't think "is" is a reserved keyword, not according to MDC anyway // not used
		if ( !this.hl(P) ) return !this.ic(P)
	},
	hl:function(P) { // has legal move // requires z=this for al() for setP() // called in setM() to determine check
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
		var B=P.B, h=P.p&1, f; // Boardarray, h=turn, rawpiece, A=alive pieces, current pieces, M=all moves
		for (f in B) {
			var r = B[f], c = r>>4&1;
			if (c !== h) {
				var M = this.al(f,P);
				if (M.length) return 1;
			}
		}
		// return false implied
	},
	
	al:function(f,P) { // all legal moves (z=object,from, Position)
		var B=P.B, r=B[f], c=r>>4&1, v=r&7, h=P.p&1, M; //Board, rawpiece, color, value, h=turn, M=allMoves
		if (c==h) {
			switch(v) {
				case 6: // king
					M = this.ak(f,P);
					break;
				case 1:
					M = this.ap(f,P);
					break;
				default:
					M = this.ag(f,P)
			}
			return this.tm(M,f,P) // trim !
		}// else console.log('the color is wrong')
		return []
	},
	
	ap:function(f,P) { // all unchecked pawn moves (from, Position)
		
		var B=P.B, r=B[f], c=r>>4&1, U=[], M=this.M[c],d=M[1],l=f+M[2],r=f+M[3],e=P.e; // Board, rawpiece, color, U=allUntrimmedMoves (returned), M=pawn directions, d=direction(from M),l=left(from M),r=right(from M), e= ep target square (maybe I should use "n")
		if (!B[f+d]) {
			U.push(f+d);
			if (f>>4==M[0] && !B[f+d+d]) U.push(f+d+d)
		}
		if ( !(l&0x88) && ( this.cc(c,l,B,1) || l==e) ) U.push(l); // YES 0x88 check needed !!!
		if ( !(r&0x88) && ( this.cc(c,r,B,1) || r==e) ) U.push(r); // YES 0x88 check needed !!!
		return U
	},
	ak:function(f,P) { // all unchecked king moves (from, Position)
		var B=P.B, r=B[f], c=r>>4&1, D=this.M[5], i=8, d,t,M=[]; // Board, rawpiece, color, value, D = piece Direction array (just using queen, it's the same, and do not confuse with Delta array), i = Direction length, d = individual direction, t= to square, M=allMoves
		while (i--) {
			d=D[i];
			t= f+d;
			if ( !(t&0x88) && this.A[t-f+128]>>6&1 && this.cc(c,t,B) ) M.push(t) // do I need 0x88 check when using Attack Array?
		}
		if (this.kc(f,f+2,P) ) M.push(f+2);
		if (this.kc(f,f-2,P) ) M.push(f-2);
		return M
	},
	
	ag:function(f,P) {

		var B=P.B, r=B[f], c=r>>4&1, v=r&7, D=this.M[v], t, d, i=D.length, M=[]; // Board, rawpiece, color, value, Directions array (NOT DELTA ARRAY), t=to square, d=individual delta, i = Directions array length, M=allUntrimmedMoves
		while (i--) {
			d=D[i];
			t=f+d;
			while ( !(t&0x88) && this.A[t-f+128]>>v&1 && !B[t] ) {
				M.push(t);
				t+=d
			}
			if ( !(t&0x88) && this.A[t-f+128]>>v&1 && this.cc(c,t,B) ) M.push(t);
		}
		return M
	},
	
	tm: function(U,f,P) { // trim moves (z=object,Untrimmed, from, Position)
		
		var B=P.B, r=B[f], c=r>>4&1, e=c^1, k, t, i=U.length, M=[],N; // Board, rawpiece, color, enemycolor, kingloc, to, i=Untrimmed length, M= allTrimmedMoves, N=newPosition
		
		while (i--) {
			t=U[i];
			//N = z.setP(f,t,P,0); // Do not need to deal with promoting pawns, will not effect if my king is in check
			N = this.setP(f,t,P,0); // Do not need to deal with promoting pawns, will not effect if my king is in check
			k=this.kl(c,N);
			if ( !this.aa(e,k,N) ) M.push(U[i])
		}
		return M
	},
	
	//// misc functions:
	cp:function(P,t) { // can promote // current position, moved to // used in ald() or ald2() I forget
		var B=P.B, r=B[t], c=r>>4&1;
		return (r&7)==1 && ( (!c&&t>>4==7)||(c&&t>>4==0) )
	},
	
	
	
	
	
	
	
	
	wtf:function(position) {
		var alive = position.A;
		alive.forEach( function(side) {
			side.forEach( function(type) {
				type.forEach( function(piece) {
					if (piece === null || typeof piece === "undefined") {
						return "WTF:"+JSON.stringify(position)+";";
					}
				});
			});
		});
		return null;
	},
	
	/////////////////////////////////////

	setP:function(f,t,P) { // set Position // return position json // from 0x88, to 0x88, (promote value Moved to setM) // move has already been determined to be legal, except for "possible" and "any" moves, but they are legal except don't consider checks
	
		//console.log('setP from:%s; to:%s; position:%s',f,t,P);
		//console.log('P.A:'+P.A+';')
		// MOVES TAKEN OUT !!!
		//console.log('A:'+P.A+';')
		//console.log('D:'+P.D+';')
		//var i,j, h = P.h+1, k = P.k, e = 0, B = new ZX.OC(P.B), r = B[f], c = r>>4&1, v = r&7, M = [[f,t]], d=B[t], A= this.zxa(P.A), D= this.zxa(P.D),p=P.p+1;
		//var i,j, h = P.h+1, k = P.k, e = 0, B = this.Bc(P.B), r = B[f], c = r>>4&1, v = r&7, d=B[t], A= this.Ac(P.A), D= this.Dc(P.D),p=P.p+1;
		var i,j, h = P.h+1, k = P.k, e = 0, B = this.Bc(P.B), r = B[f], c = r>>4&1, v = r&7, d=B[t], p=P.p+1;
		//console.log('A[%s]:%s; v-1:%s;',c,A[c],v-1);
		//console.log('A:'+A+';')
		// position: {B:B,p:p,k:k,e:e,h:h,z:z,M:[],A:A,D:[[],[]],m,s}
// 		if (A[c] === null || A[c] === undefined) {
// 			console.log('damn.');
// 		}
		//console.log('set1 P.A:'+P.A+'; new A:'+A+';');
		//console.log('set1 P.D:'+P.D+'; new D:'+D+';');
		//var A = [this.zxq(P.A[0]),this.zxq(P.A[1])];
		//var D = [this.zxa(P.D[0]),this.zxa(P.D[1])];
		
		var debug = A[c][v-1];
		debug.forEach( function(item) { // debug
			if (item === null || typeof item === "undefined") console.log("pre initial:%s;",JSON.stringify(debug)); // debug
		}); // debug
		
		var test = this.zxm(f,A[c][v-1],t); // move piece in piece array ... (contains piece locations)
		
		var debug = A[c][v-1];
		debug.forEach( function(item) { // debug
			if (item === null || typeof item === "undefined" || test) console.log("post initial:%s;",JSON.stringify(debug)); // debug
		}); // debug

		if (d) { // dead piece at "to" square, direct hit not en passant
			//M[1]=[t,-1,d]; // add to move array // from, to, value
			i = c^1; // dead piece color // same as d>>4&1
			j = (d&7)-1; // dead piece value (shifted for array)
			if (d&8) D[i][0]++; // if promoted pawn then ++ dead pawn
			else D[i][j]++; // else ++ dead piece
			
			var debug = A[i][j];
			debug.forEach( function(item) { // debug
				if (item === null || typeof item === "undefined" || test) console.log("pre dead:%s;",JSON.stringify(debug)); // debug
			}); // debug
			
			var test = this.zxm(t,A[i][j]); // remove dead piece from piece array
			
			var debug = A[i][j];
			debug.forEach( function(item) { // debug
				if (item === null || typeof item === "undefined" || test) {
					console.log("post dead:%s;",JSON.stringify(debug)); // debug
					console.log("color:%s; value:%s; from:%s; to:%s;",i,j,f,t);
				}
			}); // debug
			
			h=0; // reset 50 move count
		}
	
		B[t] = B[f]; // move piece to new square
		delete B[f]; // empty old square
	
		switch (v) { // piece value
			case 1: // pawns
				h = 0; // reset 50 move count
				i = (c) ? -16 : 16; // colorAdjust // black,white
				if (t-f == i+i) e = f+i;
				else if (t == P.e) {
					j=t-i; // enPassantKillSquare
					//M[1] = [j,-1,B[j]]; //  from,to,value // add enPassant to move arrray
					delete B[j] // delete from current board
					
					var debug = A[c^1][0]
					debug.forEach( function(item) { // debug
						if (item === null || typeof item === "undefined") console.log("pre pawn:%s;",JSON.stringify(debug)); // debug
					}); // debug
					
					var test = this.zxm(j,A[c^1][0]); // delete from Alive array
					
					var debug = A[c^1][0]
					debug.forEach( function(item) { // debug
						if (item === null || typeof item === "undefined" || test) console.log("post pawn:%s;",JSON.stringify(debug)); // debug
					}); // debug
				}
				break;
		
			case 4: // rooks // NU SCHOOL from "tscp181" the chess program has optimized 0x88 castling array. modified to not use the array. Doesn't actually work, though...
				if (c) {  // black
					if (f==119) k &=11; // kingside // everything but 4
					if (f==112) k &=7 // queenside // everything but 8
				} else {  // white
					if (f==7) k &=14; // kingside // everything but 1
					if (f==0) k &=13 // queenside // everything but 2
				}
				break;
		
			case 6: // king
				if (c) k &=3; // black
				else k &=12;  // white
				i = t-f;
				if (i==2||i==-2) { // castle // requires legal check already performed // must check 2 || -2
					if (i>0) { // kingside
						i = t+1; // rook from
						j = t-1 // rook to
					} else { // queenside
						i = f-4; // rook from
						j = f-1 // rook to
					}
					//M[1] = [i,j];//,B[j]]; // from,to (rook)
					//console.log('castle move rook')
					//console.log('castle move rook f:'+f+'; t:'+t+'; A:'+A+'; i:'+i+'; j:'+j+'; A[c][3]:'+A[c][3]+';');
					var debug = A[c][3];
					if (debug.indexOf(i) < 0) {
						console.log("not there:%s;",JSON.stringify(debug));
						console.log("c:%s; i:%s; j:%s;",c,i,j);
						console.log("Board:%s;",JSON.stringify(B));
						console.log("Pieces:%s;",JSON.stringify(A));
						var rrr = B[i], ccc = rrr>>4&1, vvv = rrr&7; 
						console.log("verify r:%s; c:%s; v:%s;",rrr,ccc,vvv);
					}
					debug.forEach( function(item) { // debug
						if (item === null || typeof item === "undefined") console.log("pre king:%s;",JSON.stringify(debug)); // debug
					}); // debug
					
					var test = this.zxm(i,A[c][3],j); // move rook in alive pieces array
					
					//console.log('end castle move rook')
					var debug = A[c][3];
					debug.forEach( function(item) { // debug
						if (item === null || typeof item === "undefined" || test) {
							console.log("post king:%s;",JSON.stringify(debug)); // debug
							console.log("c:%s; i:%s; j:%s;",c,i,j);
							console.log("Board:%s;",JSON.stringify(B));
							console.log("Pieces:%s;",JSON.stringify(A));
						}
					}); // debug
					
					B[j] = B[i];
					delete B[i]
				}
		}
	
		var zo = 0; // not done // calculate this in set2
	// Tree:
	//this.T = [{S:[{B:{}}],b:0,s:0}];

	// Position:
	// {B:B,p:p,k:k,e:e,h:h,z:z,M:[],A:A,D:[[],[]]}
	// Board,ply,kingcastling,enpassanttargetsquare,halfmove(fiftymove)count,zobrist,Alive,Dead

		//return {B:B,p:p,k:k,e:e,h:h,z:z,M:M,A:A,D:D}
		return {B:B,p:p,k:k,e:e,h:h,z:zo,A:A,D:D}
	},
	Ac:function(W) { // copy the Alive array // belongs in chess because it's specific.
		var i=2,n,o,j,M=[[],[]];//M=[[[],[],[],[],[],[]],[[],[],[],[],[],[]]];
		while (i--) { // colors 0,1
			n=M[i];
			o=W[i];
			j=6;
			while (j--) { // pieces
				n[j]=o[j].slice();
			}
		}
		return M;
	},
	// 414 calls, 5.01%, 41.359ms
	Dc:function(W) { // copy the Dead array // belongs in chess because it's specific.
		var M=[];//M=[[[],[],[],[],[],[]],[[],[],[],[],[],[]]];
		//while (i--) { // colors 0,1
			M[0]=W[0].slice();
			M[1]=W[1].slice();
		//}
		return M;
	},
	// original was:
	// 414 calls, 15.1%, 124.664ms

	// new:
	// 414 calls, 12.8%, 67.82ms
	zxm:function(n,h,l,debug) { // zx piece array move // needle, haystack, [new value (piece location)] // deletes at index or inserts optional new value
		//console.log("zxm h:"+h+';')
		if (!Array.isArray(h)) throw new Error("this is not an array:"+h);
		var i = h.length;
		while (i--) {
			if (h[i]===n) {
				if (typeof l === "undefined" || l === null) h.splice(i,1);
				else h.splice(i,1,l);
				return;
			}
		}
		
		console.log("zxm piece:%s; not found in:%s; insert:%s;",n,JSON.stringify(h),l);
		return true;
	},



	Bc:function(w) { // board copy // this doesn't include generic object functions, does it?
		var i,O={};
		for (i in w) O[i] = w[i];
		return O;
	},

	
	
}

export const isLegal = function(from, to, position) {
	return ZX.il(from, to, position);
}

export const allLegal = function(from, position) {
	return ZX.al(from, position);
}
