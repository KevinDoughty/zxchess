
const Game = {
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

	zxm:function(n,h,l,debug) { // DUPLICATE !!! also in rules.js
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
	
	
	trim : function(w) {
		return w.replace(/^\s+|\s+$/,"");
	},
	cv : function(s) { // convert // 0x88// number to letters .... remember long ago you had a problem when the number was actually a string
		return "abcdefgh".charAt((s&7))+((s>>4)+1) //return "abcdefgh".charAt((s%8))+(((s>>3)-8)*-1)
	},
	vucv : function(j) { // VALIDATE unconvert // for user input, letters to number 0xx88 // used by fen import, anything else?
		if (j.length==2 && j.charCodeAt(0)>96 && j.charCodeAt(0)<105 && j[1]*1 == j[1]) return this.ucv(j)
		return -1;
	},
	ucv : function(j) {	// unconvert // 0x88 // letters to number
		return (j.charCodeAt(0)-97) + ((j.charAt(1)-1)*16)
	},
	zg : function(w){// zap gremlins. convert all funky spaces to regular, actually converts anything not ascii word, slash or dash.
		return w.replace(/[^\w\/-]/g," ");
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
	
	fen : function(fen) {
		var F = this.trim(this.zg(fen)), a = F.split(/\s/g), x=0,t,k=0,h,n,e,p,B={},A=[    [  [],[],[],[],[],[]  ],[  [],[],[],[],[],[]  ]    ];
	
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


		if (a.length==6) {
			//console.log('a ok')
			//if (!x && a[0].match(/[^pnbrqk\/1-8]/i)) return
			var m = a[0].split(/\//) // fen board
			if (m.length==8) {
				//console.log('m ok')
			
				h = a[4]*1
				n = a[5]*1
			
				if (a[3]=="-") e = 0
				else e = this.vucv(a[3])
			
				// strict: (except KQkq order not imposed)
				//if (a[0].match(/[^pnbrqk\/1-8]/i) console.log('match ok')
				//if ("wb".indexOf(a[1])<0 ) console.log('wb ok')

				if (a[0].match(/[^pnbrqk\/1-8]/i) || "wb".indexOf(a[1])<0 || (a[2]!="-" && a[2].match(/[^KQkq]/) ) || h!=a[4] || h<0 || n!=a[5] || n<0 || e<0) return
			
				//console.log('strict ok')
				t = (a[1]=='b') ? 1:0
			
				if (a[2].indexOf("K")>=0) k += 1
				if (a[2].indexOf("Q")>=0) k += 2
				if (a[2].indexOf("k")>=0) k += 4
				if (a[2].indexOf("q")>=0) k += 8
			
				//if (h<0) h=0 // not strict
				//if (n<0) n=0 // not strict

				p = (n-1)*2+t // ply / step
			
				//console.log('fen ply:'+p+';');
			
			
				var v, c, q,f,r=0, w=0,b=0,i=8,j,l,N=0;
				while (i--) { // not strict would probably need some checks here 
					f = 0
					for (j=0;j<m[i].length;j++) {
						l=m[i][j];
						if (l*1==l) f += l*1 // 
						else {
							q=(f)+(r*16)
							if (v=("PNBRQK".indexOf(l)+1)) c=0 // index is 0-5 not 1-6
							else if (v=("pnbrqk".indexOf(l)+1)) c = 1 // index is  0-5 not 1-6
							else return // strict // except allows illegal number of pieces other than kings
							if (v==6 && ((c && ++b > 1) || (!c && ++w > 1)) ) return // strict // too many kings
							B[q] = ((N++)<<5)+(c*16)+v // Now with NUMBERING // fen says nothing about promoted pawn. bfen & bpgn is different
							A[c][v-1].push(q)
							f++
						
							//TEMP[q]=(c*16)+v
						
						
							/*
							if ((match=[@"PNBRQK" rangeOfString:letter]).location != NSNotFound) { // white
								pieceColor = 0;
								pieceValue = match.location+1;
								if (pieceValue == 6) whiteKingCount++;
								newRawPiece = ((pieceColor*16)+pieceValue) + ((pieceNumber++)<<5);
							} else if ((match=[@"pnbrqk" rangeOfString:letter]).location != NSNotFound) { // black
								pieceColor = 1;
								pieceValue = match.location+1;
								if (pieceValue == 6) blackKingCount++;
								newRawPiece = ((pieceColor*16)+pieceValue) + ((pieceNumber++)<<5);
							} else {
								if (verbose) NSLog(@"No piece match.");
								newRawPiece = 0;
							}
							theBoard[(span + (abs(i-7)*16))] = newRawPiece;
							span++;
							*/
						}
					}
					r++
				}
				//console.log('loop ok')
		
			} else return//x=1//THROW ERROR !!! improperly formatted fen
		} else return//x=1// else THROW ERROR !!! improperly formatted fen
		if (!w || !b) return // missing king
	
		//console.log(TEMP) // 4,2,3,5,6,3,2,4,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,17,17,17,17,17,17,17,0,0,0,0,0,0,0,0,20,18,19,21,22,19,18,20
		var z = 0 // zobrist not done
		return {B:B,p:p,k:k,e:e,h:h,z:z,M:[],A:A,D:[[0,0,0,0,0,0],[0,0,0,0,0,0]]} // chess fen does not show dead or promoted pieces. I could make assumptions but fens with promoted pieces would show the wrong number of dead pieces.
		// what about step/start offset ???
		// that should be stored in the branch, shouldn't it?
		// start offset is pure branch array info
		// but FEN stores move, so ply should be included in position!
	},
	
	
	
	///////////////////////////////////////
	
	setM : function(f,t,P,N,u,D) { // set Moves !!! return nothing. arguments: from, to, P =OldPosition, N=NewPosition, u = promote, D= disambiguation required in san string.
		
		var i,j, h = P.h+1, k = P.k, e = 0, B=P.B, r = B[f], c = r>>4&1, v = r&7, d=B[t], m=r|f<<5|t<<12, s;//, A= this.zxa(P.A), D= this.zxa(P.D),p=P.p+1;
		//var M = [[{r:r,f:f,t:t,u:0,S:S,O:O}]];
		var M = [[{r:r,f:f,t:t,u:0}]]; 
		
		//console.log('setM f:'+f+'; t:'+t+'; m1:'+m+'; R:'+r+'; F:'+(f<<5)+'; T:'+(t<<12)+'; ?:'+(r|(f<<5)|(t<<12))+';')
		if (d) { // dead piece
			m |= 1<<22;
			//M[1]=[{r:d,f:t,t:-1,u:0,S:S,O:O}]; // from, to, value
			M[1]=[{r:d,f:t,t:-1,u:0}]; // from, to, value
			//M = [[{r:d,f:t,t:-1,u:d,S:S,O:O},{r:r,f:f,t:t,u:0,S:S,O:O}]];
			//console.log('setM dead piece');
		}
		switch (v) { // piece value
			case 1: // pawns
				if (u) { // promote
					//console.log('setM promote u:'+u+'; u<<19:'+(u<<19)+';')
					m |= u<<19;
					//console.log('setM?:'+((m>>19)&7)+';')
					var V = c*16+8+u;
					var U = c*16+1;
					N.B[t] = c*16+8+u; // update piece value, the 8 is the promoted flag
					//console.log('promote pawn f:'+f+'; t:'+t+'; r:'+B[t]+'; A:'+P.A[c][0]+';')
					
					var debug = N.A[c][0];
					debug.forEach( function(item) { // debug
						if (item === null || typeof item === "undefined") console.log("game pawn:%s;",JSON.stringify(debug)); // debug
					}); // debug
					
					this.zxm(t,N.A[c][0]) // remove pawn from piece array
					N.A[c][u-1].push(t) // and add new piece to piece array
				
					//if (M.length>1) M[1].push({r:r,f:t,t:t,u:U,v:V,S:S,O:O}); // kill and promotion
					//else M[1] = [{r:r,f:t,t:t,u:U,v:V,S:S,O:O}]; // just a promotion
					if (M.length>1) M[1].push({r:r,f:t,t:t,u:U,v:V}); // kill and promotion
					else M[1] = [{r:r,f:t,t:t,u:U,v:V}]; // just a promotion
				} else { // possible ep take
					i = (c) ? -16 : 16; // colorAdjust // black,white
					if (t-f == i+i) e = f+i;
					if (t == P.e) {
						m |= 1<<23
						//console.log('ep take');
						j=t-i; // enPassantKillSquare
						//M[1] = [{r:B[j],f:j,t:-1,u:B[j],S:S,O:O}]; //  from,to,value // add enPassant to move arrray
						M[1] = [{r:B[j],f:j,t:-1,u:B[j]}]; //  from,to,value // add enPassant to move arrray
					}
				}
				break;
			case 6: // king
				i = t-f;
				if (i==2||i==-2) { // castle // requires legal check already performed // must check 2 || -2
					if (i>0) { // kingside
						m |= 1<<24;
						i = t+1; // rook from
						j = t-1 // rook to
					} else { // queenside
						m |= 1<<25;
						i = f-4; // rook from
						j = f-1 // rook to
					}
					//console.log('castle')
					//M[0].push([i,j,0,S,O]);//,B[j]]; // from,to (rook)
					//M[0].push({r:B[i],f:i,t:j,u:0,S:S,O:O});//,B[j]]; // from,to (rook)
					M[0].push({r:B[i],f:i,t:j,u:0});// from,to (rook)
				}
		}
		// calculate check !
		//var ch = ''
		if (this.ic(N)) { // if is check
			if (!this.hl(N)) m |= 1<<27; // if is checkmate. uses hl() has legal, because check already determined.
			//if (this.R.im(this,N)) m |= 1<<27; // if is checkmate
			else m |= 1<<26; // else just check
		}
		N.m = m;
		//console.log('setM m:'+m+';');
		N.M = M;
		N.s = this.ncn(N,D?P:null) // D is a hint flag from pgn import. cmt() just checks this.R.ip(), if more than one, da() is more thorough.
	
	
	},
	
	ncn : function(P,O) { // create notation // CHESS SPECIFIC !!! // P= current position after setM, O=previous position if disambiguation needed
		// uses new crazy m bitwise shifted move representation
		// O = previous position if disambiguation needed.
		// pass previous position to check for da
		// Actually, ctm() only counts this.R.ip() but does not consider pinned pieces which do not require da.
		// but there are some savings by counting ip() in ctm()
		//if (d) console.log('ncn da needed');
		var N="  NBRQK",R="abcdefgh"; // internationalize !!!
	
		var m=P.m, r = m&31, v=r&7, f=m>>5&127, t=m>>12&127, u=m>>19&7, ch=m>>26&1, cm=m>>27&1, x=m>>22&1, e=m>>23&1,U='', L = N[v], X=(x||e)?"x":"", C="", D="", T;
	
	
		//console.log('ncn m:'+m+'; r:'+r+'; v:'+v+'; f:'+f+'; t:'+t+'; u:'+u+';')
	
		T = this.cv(t);
		if (cm) C="#";
		else if (ch) C="+";
		if (v==6) {
			if (m>>24&1) return "O-O"+C;
			if (m>>25&1) return "O-O-O"+C;
		} else if (v==1) {
			L=(x||e)?R[f&7]:'';
			if (u) U='='+ N[u];
		} else if (O) {
			//console.log('ncn da needed')
			D = this.da(O,f,t,r>>4&1,v);
		}
		//console.log('ncn:|'+L+'|'+D+'|'+X+'|'+T+'|'+U+'|'+C+'|;');
		//ncn:||||e4|e||;
		return L+D+X+T+U+C
	},
	
	
	da : function(P,f,t,c,v) { // disambiguation // might be better placed elsewhere. probably rules.
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
		var R="87654321", C="abcdefgh"; // internationalize !!!!
		//var m=P.m, r=m&31, v=r&7, c=r>>4&1, f=m>>5&127, t=m>>12&127, A=P.A[c][v-1], i=A.length, L=[], x=0, y=0, fc=f&7, fr=f>>4;
		var A=P.A[c][v-1], i=A.length, L=[], x=0, y=0, fc=f&7, fr=f>>4;
		while (i--) {
			if (A[i]!=f && this.il(A[i],t,P)) L.push(A[i]); // don't check piece that was moved (A[i]!=f)
		}
		//console.log('da L:'+L+';')
		if (i=L.length) {
			while (i--) {
				//console.log('_'+(L[i]>>4)+'_'+(L[i]&7)+'_'+fc+'_'+fr+'_') // _4_3_2_5_
				if ((L[i]>>4)==fr) y++
				if ((L[i]&7)==fc) x++
			}
			//console.log('da x:'+x+'; y:'+y+';')
			if (x&&y) return C[fc] + R[fr];
			if (x) return R[fr];
			return C[fc];
		}
		return ""; // da not needed.
	
		/*
			var fc=f&7,fr=f>>4,c=0,r=0,dc="abcdefgh".charAt(fc),dr=fr+1,i=a.length
			while (i--) {
				if ((a[i]>>4)==fr) r++
				if ((a[i]&7)==fc) c++
			}
			if (r&c) return dc+dr // & ?! single & ?!
			if (c) return dr // if column is the same
			return dc // if row is the same, or neither row nor column is the same
		*/
	}
}

export const fen = function(string) {
	return Game.fen(string);
}
export const cv = Game.cv;
export const ucv = Game.ucv;