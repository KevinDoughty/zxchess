export * from "./rules.js";
export * from "./game.js";


import { fen, cv, ucv } from "./game.js";
import { isLegal, allLegal } from "./rules.js";
const position = fen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
console.log("position:%s;",JSON.stringify(position));


const from = ucv("e2");
const to = ucv("e4");
const ok = isLegal(from,to,position);
console.log("from:%s;",from);
console.log("to:%s;",to);
console.log("isLegal:%s;",JSON.stringify(ok));

const all = allLegal(from, position);

console.log("allLegal:%s;",JSON.stringify(all));



// https://chessprogramming.wikispaces.com/Perft+Results
// https://raw.githubusercontent.com/serberoth/chess/master/perfsuite.epd

const answerArray = [
// 	[
// 		"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
// 		20, // 1
// 		400, // 2
// 		8902, // 3
// // // 		197281, // 4
// // // 		4865609, // 5
// // // 		119060324, // 6
// // // 		3195901860, // 7
// // // 		84998978956, // 8
// // // 		2439530234167, // 9
// // // 		69352859712417, // 10
// // // 		2097651003696806, // 11
// // // 		62854969236701747, // 12
// // // 		1981066775000396239, // 13
// 	],
	[
		"r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1",
		48,
		2039,
// 		97862
	],
	[
		"8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1",
		14,
		191,
		2812,
// 		43238
	],
	[
		"r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10",
		46,
		2079,
// 		89890
	],
	[
		"r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1",
		48,
		2039,
// 		97862
	],
	[
		"4k3/8/8/8/8/8/8/4K2R w K - 0 1",
		15,
		66,
		1197,
		7059
	],
	[
		"4k3/8/8/8/8/8/8/R3K2R w KQ - 0 1",
		26,
		112,
		3189,
// 		17945
	],
	[
		"8/1n4N1/2k5/8/8/5K2/1N4n1/8 b - - 0 1",
		15,
		193,
		2816,
// 		40039
	],
	[
		"r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1",
		26,
		568,
// 		13744
	],

// 	[//failing
// 		"r3k3/1K6/8/8/8/8/8/8 w q - 0 1",
// 		4,
// 		49,
// 		243,
// 		3991,
// 		20780
// 	],
// 
// 	[ // failing
// 		"r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1",
// 		6,
// 		264,
// 		9467
// 	],

// 	[ // This one from chessprogramming.wikispaces may not be reliable. Solve after you're sure everything else is working
// 		//"rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8",
// 		"rnbqkb1r/pp1p1ppp/2p5/4P3/2B5/8/PPP1NnPP/RNBQK2R w KQkq - 0 6",
// 		44,
// // 		1486,
// // 		62379
// 	],
];





	function everyPossiblePosition(position) {
		const alive = position.A;
		const result = [];
		const squares = [];
		alive.forEach( side => {
			side.forEach( type => {
				type.forEach( square => {
					squares.push(square);
					const moves = allLegal(square,position);
					moves.forEach( move => {
						const next = isLegal(square,move,position); // There is a way to do this without the redundant check
						if (!next) throw new Error("not a legal move ?!");
						result.push(next);
					});
				});
			});
		});
		return result;
	}
	answerArray.forEach( function(answer) {
		const fenString = answer[0];
		
		let array = [];
		array.push(fen(fenString));
		let depth = answer.length - 1;
		for (let i=0; i<depth; i++) {
			
			let result = [];
			array.forEach( function(position) {
				const every = everyPossiblePosition.call(null,position);
				result = result.concat(every);
			});
			array = result.slice(0);
			//assert.equal(result.length, answer[i+1]);
			if (result.length !== answer[i+1]) {
				const error = new Error();
				const message = "depth:"+(i+1)+"; expected:"+answer[i+1]+"; actual:"+result.length+";";
				error.message = message;
				error.showDiff = false;
				throw error;
			} else {
				console.log("%s %s",i+1, fenString);
			}
		
		}
	
	});
