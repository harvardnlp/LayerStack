parser = require("./parser.js");
Raphael = require("raphael")
parser.parse("A/S@10")
// Creates canvas 320 × 200 at 10, 50
var paper = Raphael("draw", 200, 700);
function run() {
    var out = parser.parse(document.getElementById("area").value);
    paper.clear();
    function draw(stack, x, y, dx, dy, rotate){
        if (Array.isArray(stack)){
            for (var i = 0; i < stack.length ;++i){
                ne = draw(stack[i], x , y, dx, dy, rotate);
                x = ne[0];
                y = ne[1];
            }
            return [x, y];
        }
        if (typeof stack === 'string' || stack instanceof String){
            text2 = paper.rect(x+dx-5, y+dy-5 ,10, 10);
            text = paper.text(x+dx, y+dy, stack);

            text.rotate(rotate);
            text2.rotate(rotate);

            return [x, y+15];
        }
        if (stack["op"] == "rotate") {
            rotate += stack["value"];
            return draw(stack["child"], x, y, dx, dy, rotate);
        }
        if (stack["op"] == "shift") {
            dx += stack["value"][0];
            dy += stack["value"][1];
            return draw(stack["child"], x, y+dy, dx, 0, rotate);
        }

    }
    draw(out, 100, 10, 0, 0, 0);


}

module.exports = {
  run:       run
};