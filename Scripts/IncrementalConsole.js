/**
 * #######################################
 * 
 * Buy upgrade with "work("upgradeI");"
 * 
 * #######################################
 */

let stack = [];
function work() {
    stack.push([...arguments])
}

(() => {
    let Game = {
        money: 0,
        upgrade1: 1
    };
    function gameTick() {
        const workingStack = stack.shift() ?? [];

        Game.money += Game.upgrade1;
        if (workingStack.includes("upgradeI")) {
            if (Game.money >= upgrade1Cost(Game.upgrade1)) {
                Game.money -= upgrade1Cost(Game.upgrade1);
                Game.upgrade1++;
            }
        }
        
        let output = "";
        output += `\n\n\n\n====#########################====\n`;
        output += `You have ${Game.money} money\n\n`;
        output += `UpgradeI Lv.${Game.upgrade1}) Generates money / Cost: ${upgrade1Cost(Game.upgrade1)}`;
        output += `\n====#########################====\n\n\n\n`;
        
        console.log(output);
    }
    function upgrade1Cost(lv) {
        return lv*(4+lv);
    }
    
    setInterval(gameTick, 100);
})();