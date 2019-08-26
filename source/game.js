
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
	ucv : function(j) {// unconvert // 0x88 // letters to number
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
		if (a.length==6) {
			var m = a[0].split(/\//) // fen board
			if (m.length==8) {
				h = a[4]*1
				n = a[5]*1
				if (a[3]=="-") e = 0
				else e = this.vucv(a[3])
				if (a[0].match(/[^pnbrqk\/1-8]/i) || "wb".indexOf(a[1])<0 || (a[2]!="-" && a[2].match(/[^KQkq]/) ) || h!=a[4] || h<0 || n!=a[5] || n<0 || e<0) return
				t = (a[1]=='b') ? 1:0
				if (a[2].indexOf("K")>=0) k += 1
				if (a[2].indexOf("Q")>=0) k += 2
				if (a[2].indexOf("k")>=0) k += 4
				if (a[2].indexOf("q")>=0) k += 8
				p = (n-1)*2+t // ply / step
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
						}
					}
					r++
				}
			} else return // improperly formatted fen
		} else return // improperly formatted fen
		if (!w || !b) return // missing king
		var z = 0 // zobrist not done
		return {B:B,p:p,k:k,e:e,h:h,z:z,M:[]};
		// what about step/start offset ???
		// that should be stored in the branch, shouldn't it?
		// start offset is pure branch array info
		// but FEN stores move, so ply should be included in position!
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
			D = this.da(O,f,t,r>>4&1,v);
		}
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
		var A=P.A[c][v-1], i=A.length, L=[], x=0, y=0, fc=f&7, fr=f>>4;
		while (i--) {
			if (A[i]!=f && this.il(A[i],t,P)) L.push(A[i]); // don't check piece that was moved (A[i]!=f)
		}
		if (i=L.length) {
			while (i--) {
				if ((L[i]>>4)==fr) y++
				if ((L[i]&7)==fc) x++
			}
			if (x&&y) return C[fc] + R[fr];
			if (x) return R[fr];
			return C[fc];
		}
		return ""; // da not needed.
	}
}

export const exportFen = function(P) {//(B,G) {
	const B = P.B;
	var e=0,l,k='',q,f='',h=P.p;
	for (let r=7;r>-1;r--) {
		if (e>0){
			f+=e
			e=0
		}
		if (r<7) f+='/'
		for (let c=0; c<8; c++) {
			q = B[c+(r*16)]
			if (q==null) {
				e++
			} else {
				if (e>0) f+=e
				e=0
				l=" pnbrqk".charAt(q&7)
				if(q&16)f+=l
				else f+=l.toUpperCase()
			}
		}
	}
	if(e>0)f+=e
	f+=' '+((h&1)?'b':'w')+' '
	const kc=P.k
	if(kc&1)k+='K'
	if(kc&2)k+='Q'
	if(kc&4)k+='k'
	if(kc&8)k+='q'
	f+=((k=='')?'-':k)+' '
	f+=((P.e)?this.cv(P.e):'-')+' '+P.h+' '+(Math.floor((h)/2)+1)
	return f;
}


export const importFen = function(string) {
	return Game.fen(string);
}
export const cv = Game.cv;
export const ucv = Game.ucv;