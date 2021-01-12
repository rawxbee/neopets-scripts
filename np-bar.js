// ==UserScript==
// @name         Neopets - NP Bar
// @version      1.0
// @namespace    http://tampermonkey.net/
// @description  Display shop till/bank/total alongside on-hand NP
// @author       rawbeee - edited from EatWoolooAsMutton (https://greasyfork.org/en/scripts/419395-neopets-premium-toolbar-beta/code)
// @match        http://www.neopets.com/*
// @grant        none
// ==/UserScript==
        function getsStats() {
            return new Promise(resolve => {
                $.ajax({
                    type : "GET",
                    async : true,
                    url : "http://www.neopets.com/market.phtml?type=till",
                    success : data => {
                        const till = data.match(/have <b>(.+) NP/)[1];
                        resolve([till]);
                    }
                });

            })
        }

        function getbStats() {
            return new Promise(resolve => {
                 $.ajax({
                    type : "GET",
                    async : true,
                    url : "http://www.neopets.com/bank.phtml",
                    success : data => {
                        const bank = data.match(/Current Balance: (.+) NP/)[1];
                        resolve([bank]);
                    }
                });
            })
        }
        (async () => {
            const [till] = await getsStats();
            const [bank] = await getbStats();
            const unum1 = $(`.navsub-np-meter__2020`).find( "#npanchor.np-text__2020" ).text().replace(/[^a-zA-Z 0-9 _]+/g, '');
            const tnum1 = till.replace(/[^a-zA-Z 0-9 _]+/g, '')
            const bnum1 = bank.replace(/[^a-zA-Z 0-9 _]+/g, '')
            const unum2 = parseFloat(unum1);
            const tnum2 = parseFloat(tnum1);
            const bnum2 = parseFloat(bnum1);
            const total = bnum2 + unum2 + tnum2
        $(`a div.navsub-np-meter__2020`).append(` <a href="/market.phtml?type=till"><div class="navsub-np-meter__2020">
		<div class="navsub-np-icon__2020" style="background: url() center center no-repeat;"><img src="http://images.neopets.com/premium/portal/images/shoptill-icon.png" style="height: 25px; width: 23px; margin: auto 4px auto 0; vertical-align: middle;"></div><span id="snpanchor" class="np-text__2020">
                        ${till}</span></div></a>
<a href="/bank.phtml?type=your"><div class="navsub-np-meter__2020">
		<div class="navsub-np-icon__2020" style="background: url() center center no-repeat;"><img src="http://images.neopets.com/premium/portal/images/banktotal-icon.png" style="height: 25px; width: 23px; margin: auto 4px auto 0; vertical-align: middle;"></div><span id="npanchor" class="np-text__2020">
                        ${bank}</span></div></a>
<a href="/inventory.phtml"><div class="navsub-np-meter__2020">
		<div class="navsub-np-icon__2020" style="background: url() center center no-repeat;"><img src="http://images.neopets.com/premium/portal/images/nptotal-icon.png" style="height: 25px; width: 23px; margin: auto 4px auto 0; vertical-align: middle;"></div><span id="npanchor" class="np-text__2020">
                        ${total.toLocaleString()}</span></div></a>`);
        })();
