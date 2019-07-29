parser = require("./parser.js");
Raphael = require("raphael")
parser.parse("A/S@10")

function run() {
    var out = parser.parse(document.getElementById("area").value);

    // Creates canvas 320 × 200 at 10, 50
    var paper = Raphael(200, 200, 320, 200);

    function draw(stack, x, y){
        if (Array.isArray(stack)){
            for (var i = 0; i < stack.length(); ++i) {
                ne = draw(stack[i], x, y);
                x = ne[0];
                y = ne[1];
            }
        }
        if (isString(stack)) {
            paper.text(x, y, stack);
            return [x, y+10];
        }
    }
    draw(out, 0, 0);


}

module.exports = {
  run:       run
};