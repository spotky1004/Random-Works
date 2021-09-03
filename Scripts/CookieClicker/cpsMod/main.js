Game.registerMod("cps counter",{
	init:function(){
		Game.Notify(`CPS counter!`, `by spotky1004🌲#8812`,[12,10]);
		const config = {
			counters: 50,
			counterChunk: 100,
		};

		l("sectionLeft").insertAdjacentHTML('beforeend', `<div id="cpsCounter" style="position: absolute; bottom: 35vh; left: 0; transfrom: translateX(-50%); font-size: 2em; font-weight: bold; text-shadow: 0 0 0.2vh #fff; box-shadow: 0 0 3vh #111a, 0 0 3vh #111a, 0 0 3vh #111a; width: 30vw; text-align: center; padding: 1vh 0; background-color: #111a; cursor-event: none; z-index: 99;">CPS: 0.00</div>`);

		let MOD=this;

		MOD.clickCounters = new Array(config.counters).fill(0);
		MOD.clickCounterTime = Math.floor(new Date().getTime()/config.counterChunk);
		
		AddEvent(l('bigCookie'),'click',function(){
			// Fix CPS Data
			const Differeance = Math.floor(new Date().getTime()/config.counterChunk) - MOD.clickCounterTime;
			MOD.clickCounters = MOD.clickCounters.slice(Differeance).concat(new Array(Math.min(config.counters, Differeance)).fill(0));
			MOD.clickCounterTime = Math.floor(new Date().getTime()/config.counterChunk);

			// Update CPS
			MOD.clickCounters[MOD.clickCounters.length-1]++;
			const CounterChunk = MOD.clickCounters.slice(0, -1);
			const CPS = (CounterChunk.reduce((a, b) => a+b, 0)/Math.max(1, CounterChunk.length)*1000/config.counterChunk || 0).toFixed(2);


			l(`cpsCounter`).innerText = `CPS: ${CPS}`;
		});
		

		Game.registerHook('reset',function(hard){
			if (hard)
			{
				MOD.cookieClicked=0;

				MOD.clickCounters = new Array(config.counters).fill(0);
				MOD.clickCounterTime = Math.floor(new Date().getTime()/config.counterChunk);
			}
		});
	},
	save:function(){
		// nothing
	},
	load:function(str){
		// nothing
	}
});