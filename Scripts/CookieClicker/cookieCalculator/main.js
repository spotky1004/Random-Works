Game.registerMod("cookie calculator",{
	init:function(){
		/**
		 * Cookie Production Calculate
		 */
		const Config = [
			["1m", 60],
			["15m", 60*15],
			["1h", 60*60],
			["1d", 60*60*24]
		];

		Game.Notify(`Cookie Calculator!`, `by spotky1004🌲#8812`,[12,10],7);

		l("sectionLeft").insertAdjacentHTML('beforeend', `<div id="cookieCalculator" style="position: relative; top: 2px; left: 2px; z-index: 99; pointer-event: none; text-shadow: 0 0 0.4vh #000;"></div>`);
		for (let i = 0; i < Config.length + 1; i++) l("cookieCalculator").insertAdjacentHTML('beforeend', `<div class="cookieCalculator-item" style="margin-bottom: 0.05vh;font-family:'Merriweather',Georgia,serif;">Loading...</div>`)
		const items = document.getElementsByClassName("cookieCalculator-item");

		setInterval(function() {
			items[0].innerHTML = `<span style="background-color: #fffa; box-shadow: 0 0 0.2vh #fffa; display: inline-block; width: 5vw; margin-right: 0.4vw; padding: 0.03vh 0; border-radius: 20%; text-align: center; color: #000;">${Math.floor(Game.cookies/Game.cookiesPs)}s</span> ${Beautify(Game.cookies)}`;
			for (let i = 0; i < Config.length; i++) {
				const ItemData = Config[i];
				items[i+1].innerHTML = `<span style="background-color: #fffa; box-shadow: 0 0 0.2vh #fffa; display: inline-block; width: 5vw; margin-right: 0.4vw; padding: 0.03vh 0; border-radius: 20%; text-align: center; color: #000;">${ItemData[0]}</span>${Beautify(Game.cookiesPs*ItemData[1])}`;
			}
		}, 1000);

		/**
		 * Wizard Tower Magic
		 */
		(async() => {
			// Wait until minigame loaded ( https://stackoverflow.com/a/56216283/13817471 )
			while(!Game.Objects['Wizard tower'].hasOwnProperty("minigame")) await new Promise(resolve => setTimeout(resolve, 1000));
			
			// Do stuff
			const M = Game.Objects['Wizard tower'].minigame;

			const GrimoireBar = l("grimoireBar");
			GrimoireBar.insertAdjacentHTML('beforeend', `<div id="magicPSText" style="font-family:'Merriweather',Georgia,serif;position:absolute;left:105%;top:0px;right:0px;bottom:0px;">`);
			GrimoireBar.style.transform = "translateX(-50%)";
			M.MagicPSText = l("magicPSText");

			let WizardTowerDraw = M.draw;
			M.draw = function () {
				WizardTowerDraw();
				M.magicBarTextL.innerHTML = Math.min(Math.floor(M.magicM),Beautify(M.magic))+'/'+Beautify(Math.floor(M.magicM));
				let cur = M.magic;
				let t = 0;
				while (cur < M.magicM) {
					const acc = Math.max(0.002,Math.pow(cur/Math.max(M.magicM,100),0.5))*0.002*Game.fps;
					cur += acc*6;
					t += 0.1;
				}
				M.MagicPSText.innerHTML = `(+${Beautify((M.magicPS||0)*Game.fps,5)}/s,${t.toFixed(1)}<span style="font-size: 0.6em;">m</span>left)`;
				M.MagicPSText.style.opacity = M.magic < M.magicM ? 1 : 0.25;
			}
		})();
	},
	save:function(){
		// nothing
	},
	load:function(str){
		// nothing
	}
});
