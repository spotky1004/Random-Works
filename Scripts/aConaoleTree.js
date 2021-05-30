let loop = 0;
let mainInterval = setInterval(function() {
    const size = loop%4+Math.floor(loop/2);
    console.log(
        " ".repeat(100-Math.max(0, size)).replace(/ /g, m => Math.random() > (0.9+loop/800) ? ".": m) + "*" +
        " ".repeat(Math.max(0, size*2)).replace(/ /g, m => Math.random() > .7 ? "^" : m) +
        "*" + " ".repeat(100-Math.max(0, size)).replace(/ /g, m => Math.random() > (0.9+loop/800) ? ".": m)
    );
    loop++;
    if (loop >= 160) printWood() && clearInterval(mainInterval);
}, 30);

function printWood() {
    console.log(
        " ".repeat(17) +
        "*".repeat(202-34) +
        " ".repeat(17)
    );
    for (let i = 0; i < 6; i++) {
        console.log(
            " ".repeat(80) + "/" +
            " ".repeat(200-160).replace(/ /g, m => Math.random() > .9 ? "|" : m) +
            "\\" + " ".repeat(80)
        );
    }
    return 1;
}