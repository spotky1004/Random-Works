Game.registerMod("cookie calculator",{
	init:function(){
		const Config = [
			["1m", 60],
			["15m", 60*15],
			["1h", 60*60],
			["1d", 60*60*24]
		];

		Game.Notify(`Cookie Calculator!`, `by spotky1004🌲#8812`,[12,10]);

		l("sectionLeft").insertAdjacentHTML('beforeend', `<div id="cookieCalculator" style="position: absolute; top: 2px; left: 2px; z-index: 99; "></div>`);
		for (let i = 0; i < Config.length + 1; i++) l("cookieCalculator").insertAdjacentHTML('beforeend', `<div class="cookieCalculator-item">Loading...</div>`)
		const items = document.getElementsByClassName("cookieCalculator-item");

		setInterval(function() {
			items[0].innerText = `${Math.floor(Game.cookies/Game.cookiesPs)}s: ${Beautify(Game.cookies)}`;
			for (let i = 0; i < Config.length; i++) {
				const ItemData = Config[i];
				items[i+1].innerText = `${ItemData[0]}: ${Beautify(Game.cookiesPs*ItemData[1])}`;
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
