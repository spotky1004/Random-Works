let varietyCache = {};

function getVarieties(x, step=0) {
    console.group(x);

    let varieties = 0;

    for (let i = x; i > 0; i--) {
        let exp = new Array(Math.floor(x/i)-1).fill(i);
        const tmp = x-exp.reduce((a, b) => a+b, i);
        if (tmp > 0) exp.push(tmp);
        varieties++;
        while (1) {
            exp.sort((a,b) => b-a);
            console.log(`#${varieties+step}`, (`${i}+` + exp.join("+")).replace(/\+$/, ""));
            const idxToChange = exp.findIndex(e => e != 1);
            if (-1 !== idxToChange) {
                const temp = exp[idxToChange];
                if (temp >= 4) {
                    if (typeof varietyCache[temp] === "undefined") {
                        varieties += getVarieties(temp, varieties)-1;
                    } else {
                        varieties += varietyCache[temp]-1;
                        console.log(`#${varieties+step}`, `[ ${temp} ]`)
                    }
                    exp = exp.concat(new Array(temp).fill(1));
                    exp.splice(idxToChange, 1);
                } else {
                    exp[idxToChange]--;
                    exp.push(1);
                    varieties++;
                }
            }
            else break;
        }
    }
    
    varietyCache[x] = varieties;
    
    console.groupEnd();

    return varieties;
}