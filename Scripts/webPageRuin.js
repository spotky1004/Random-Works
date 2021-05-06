let allNodes = [];
function findNodeRecur(x) {
    let tmp = [...x.children];
    allNodes.push(...tmp);
    for (let i = 0, l = tmp.length; i < l; i++) findNodeRecur(tmp[i]);
}
findNodeRecur(document.getElementsByTagName("html")[0]);

function giveEffect(x) {
    for (let i = 0, l = x.length; i < l; i++) {
        let effects = {
            blur: Math.random()*0.01 + "vh",
            "hue-rotate": Math.random()*90 + "deg",
            opacity: (Math.random()*10+90) + "%",
            "drop-shadow": `${Math.random()*0.1}vh `.repeat(3) + `#${Math.floor(Math.random()*16**3).toString(16).padStart(6, "0")}`
        };
        let effectStr = "";
        for (const name in effects) effectStr += `${name}(${effects[name]}) `;
        if (x[i].style !== undefined) x[i].style.filter = effectStr;
    }
}
giveEffect(allNodes);