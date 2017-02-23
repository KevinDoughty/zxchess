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
