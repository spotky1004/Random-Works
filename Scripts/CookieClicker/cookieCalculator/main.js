Game.registerMod("cookie calculator",{
	init:function(){
		const Config = [
			["1m", 60],
			["15m", 60*15],
			["1h", 60*60],
			["1d", 60*60*24]
		];

		Game.Notify(`Cookie Calculator!`, `by spotky1004🌲#8812`,[12,10]);

		l("sectionLeft").insertAdjacentHTML('beforeend', `<div id="cookieCalculator" style="position: relative; top: 2px; left: 2px; z-index: 99; pointer-event: none; text-shadow: 0 0 0.4vh #000;"></div>`);
		for (let i = 0; i < Config.length + 1; i++) l("cookieCalculator").insertAdjacentHTML('beforeend', `<div class="cookieCalculator-item" style="margin-bottom: 0.05vh;">Loading...</div>`)
		const items = document.getElementsByClassName("cookieCalculator-item");

		setInterval(function() {
			items[0].innerHTML = `<span style="background-color: #fffa; box-shadow: 0 0 0.2vh #fffa; display: inline-block; width: 5vw; margin-right: 0.4vw; padding: 0.03vh 0; border-radius: 20%; text-align: center; color: #000;">${Math.floor(Game.cookies/Game.cookiesPs)}s</span> ${Beautify(Game.cookies)}`;
			for (let i = 0; i < Config.length; i++) {
				const ItemData = Config[i];
				items[i+1].innerHTML = `<span style="background-color: #fffa; box-shadow: 0 0 0.2vh #fffa; display: inline-block; width: 5vw; margin-right: 0.4vw; padding: 0.03vh 0; border-radius: 20%; text-align: center; color: #000;">${ItemData[0]}</span>${Beautify(Game.cookiesPs*ItemData[1])}`;
			}
		}, 1000);
	},
	save:function(){
		// nothing
	},
	load:function(str){
		// nothing
	}
});
