Game.registerMod("cookie calculator",{
	init:function(){
		Game.Notify(`Cookie Calculator!`, `by spotky1004🌲#8812`,[12,10]);

		l("sectionLeft").insertAdjacentHTML('beforeend', `<div id="cookieCalculator" style="position: absolute; top: 2px; left: 2px; z-index: 99; "></div>`);
		for (let i = 0; i < 4; i++) l("cookieCalculator").insertAdjacentHTML('beforeend', `<div class="cookieCalculator-item">Loading...</div>`)
		const items = document.getElementsByClassName("cookieCalculator-item");

		setInterval(function() {
			items[0].innerText = `1m: ${Beautify(Game.cookiesPs*60)}`;
			items[1].innerText = `15m: ${Beautify(Game.cookiesPs*60*15)}`;
			items[2].innerText = `1h: ${Beautify(Game.cookiesPs*60*60)}`;
			items[3].innerText = `1d: ${Beautify(Game.cookiesPs*60*60*24)}`;
		}, 1000);
	},
	save:function(){
		// nothing
	},
	load:function(str){
		// nothing
	}
});