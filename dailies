// ==UserScript==
// @name         Neopets: Dailies
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Dailies
// @author       rawbeee
// @match        http://www.neopets.com/*
// @grant        none
// ==/UserScript==
$(`<style type='text/css'>
.togglePopup__2020.dailiespopup {
  max-width:40%;
  left: 30%;
  top: 27%;
z-index:100;
}
div.dailies_bg_map{
	background-image: url(http://images.neopets.com/premium/2012/bar/daily-icons-1408.png);
	display: block;
	width: 54px;
	height: 28px;;
}
div.councilchamber {
	background-position: 0px 0px;
}

div.wheelofknowledge {
	background-position: -54px 0px;
}

div.wiseoldking {
	background-position: -108px 0px;
}

div.grundo {
	background-position: -162px 0px;
}

div.caverns {
	background-position: -216px 0px;
}

div.crossword {
	background-position: -270px 0px;
}

div.healing {
	background-position: 0px -28px;
}

div.jhudora {
	background-position: -54px -28px;
}

div.wheelofexcitement {
	background-position: -108px -28px;
}

div.applebobbing {
	background-position: -162px -28px;
}

div.braintree {
	background-position: -216px -28px;
}

div.desertedfariground {
	background-position: -270px -28px;
}

div.esophagor {
	background-position: 0px -56px;
}

div.testyourstrength {
	background-position: -54px -56px;
}

div.wheelofmisfortune {
	background-position: -108px -56px;
}

div.withstower {
	background-position: -162px -56px;
}

div.anchormanagement {
	background-position: -216px -56px;
}

div.forgottenshore {
	background-position: -270px -56px;
}

div.treasureblackpawkeet {
	background-position: 0px -84px;
}

div.meteorcrash {
	background-position: -54px -84px;
}

div.coltzanshrine {
	background-position: -108px -84px;
}

div.fruitmachine {
	background-position: -162px -84px;
}

div.qasalanexpellibox {
	background-position: -216px -84px;
}

div.desertscratchcardkiosk {
	background-position: -270px -84px;
}

div.wheelofextravagance {
	background-position: 0px -112px;
}

div.yeoldefishingvortex {
	background-position: -54px -112px;
}

div.grumpyoldking {
	background-position: -108px -112px;
}

div.illusensglade {
	background-position: -162px -112px;
}

div.mysterioussymolhole {
	background-position: -216px -112px;
}

div.pickyourown {
	background-position: -270px -112px;
}

div.turdleracing {
	background-position: 0px -140px;
}

div.turmaculus {
	background-position: -54px -140px;
}

div.darkcave {
	background-position: -108px -140px;
}

div.obsidianquarry {
	background-position: -162px -140px;
}

div.desertedtomb {
	background-position: -216px -140px;
}

div.mysteryislandkitchen {
	background-position: -270px -140px;
}

div.tikitacktombola {
	background-position: 0px -168px;
}

div.dailypuzzle {
	background-position: -54px -168px;
}

div.giantjelly {
	background-position: -108px -168px;
}

div.thelaboratory {
	background-position: -162px -168px;
}

div.monthlyfreebies {
	background-position: -216px -168px;
}

div.theneopianlottery {
	background-position: -270px -168px;
}

div.thepetpetlaboratory {
	background-position: 0px -196px;
}

div.thesoupkitchen {
	background-position: -54px -196px;
}

div.thewishingwell {
	background-position: -108px -196px;
}

div.deadlydice {
	background-position: -162px -196px;
}

div.lunartemple {
	background-position: -216px -196px;
}

div.adventcalendar {
	background-position: -270px -196px;
}

div.tmscratchcardkiosk {
	background-position: 0px -224px;
}

div.thesnowfaeriesquests {
	background-position: -54px -224px;
}

div.thesnowager {
	background-position: -108px -224px;
}

div.giantomlette {
	background-position: -162px -224px;
}

div.wheelofmediocrity {
	background-position: -216px -224px;
}

div.wheelofmonotony {
	background-position: -270px -224px;
}

div.leverofdoom {
	background-position: 0px -252px;
}

div.custom1_fixed {
	background-position: -54px -252px !important;
}

div.custom2_fixed {
	background-position: -108px -252px !important;
}

div.custom3_fixed {
	background-position: -162px -252px !important;
}

div.custom4_fixed {
	background-position: -216px -252px !important;
}

div.custom5_fixed {
	background-position: -270px -252px !important;
}

div.mysteriousnegg {
	background-position: 0px -280px;
}

div.gravedanger {
	background-position: -54px -280px;
}

div.coincidence {
	background-position: -108px -280px;
}

div.kikopop {
	background-position: -162px -280px;
}
</style>`).appendTo("head");

$(`.navsub-bookmark-icon__2020`).after(`<span class="dailiespopup_btn" id="dailiespopup_btn" style="cursor:pointer;"><img src="https://www.flaticon.com/svg/static/icons/svg/4003/4003667.svg" style="height:30px; width:30px;"></span>`);

$(`<div class="togglePopup__2020 movePopup__2020 dailiespopup" id="dailies_pop" style="display:none;">
		<div class="popup-header__2020">
			<h3>Dailies</h3>


<div class="popup-header-pattern__2020"></div>
		</div>
		<div class="popup-body__2020" style="background-color: #edfcf8; border: solid 2px #63c0b1;">

<center><table style="margin: 10px;">
<tr>
<td><a href="/altador/council.phtml" title="Council Chamber"><div class="dailies_bg_map councilchamber" style="border: solid 1px black;"></div></a></td>
<td><a href="/medieval/knowledge.phtml" title="Wheel of Knowledge"><div class="dailies_bg_map wheelofknowledge" style="border: solid 1px black;"></div></a></td>
<td><a href="/medieval/wiseking.phtml" title="Wise Old King"><div class="dailies_bg_map wiseoldking" style="border: solid 1px black;"></div></a></td>
<td><a href="/faerieland/tdmbgpop.phtml" title="The Discard Magical Blue Grundo Plushie of Prosperity"><div class="dailies_bg_map grundo" style="border: solid 1px black;"></div></a></td>
<td><a href="/faerieland/caverns/index.phtml" title="Faerie Caverns"><div class="dailies_bg_map caverns" style="border: solid 1px black;"></div></a></td>
<td><a href="/games/crossword/index.phtml" title="Faerie Crossword"><div class="dailies_bg_map crossword" style="border: solid 1px black;"></div></a></td>
<td><a href="/faerieland/springs.phtml" title="Healing Springs"><div class="dailies_bg_map healing" style="border: solid 1px black;"></div></a></td>
<td><a href="/faerieland/darkfaerie.phtml" title="Jhudora's Quest"><div class="dailies_bg_map jhudora" style="border: solid 1px black;"></div></a></td>
</tr>
<tr>
<td><a href="/faerieland/wheel.phtml" title="Wheel of Excitement"><div class="dailies_bg_map wheelofexcitement" style="border: solid 1px black;"></div></a></td>
<td><a href="/halloween/applebobbing.phtml" title="Apple Bobbing"><div class="dailies_bg_map applebobbing" style="border: solid 1px black;"></div></a></td>
<td><a href="/halloween/braintree.phtml" title="Brain Tree"><div class="dailies_bg_map braintree" style="border: solid 1px black;"></div></a></td>
<td><a href="/halloween/scratch.phtml" title="Deserted Fairground Scratchcards"><div class="dailies_bg_map desertedfariground" style="border: solid 1px black;"></div></a></td>
<td><a href="/halloween/esophagor.phtml" title="Esophagor"><div class="dailies_bg_map esophagor" style="border: solid 1px black;"></div></a></td>
<td><a href="/halloween/strtest/index.phtml" title="Test Your Strength"><div class="dailies_bg_map testyourstrength" style="border: solid 1px black;"></div></a></td>
<td><a href="/halloween/wheel/index.phtml" title="Wheel of Misfortune"><div class="dailies_bg_map wheelofmisfortune" style="border: solid 1px black;"></div></a></td>
<td><a href="/halloween/witchtower.phtml" title="The Witch's Tower"><div class="dailies_bg_map withstower" style="border: solid 1px black;"></div></a></td>
</tr>
<tr>
<td><a href="/halloween/gravedanger/index.phtml" title="Grave Danger"><div class="dailies_bg_map gravedanger" style="border: solid 1px black;"></div></a></td>
<td><a href="/worlds/kiko/kpop.phtml" title="Kiko Pop"><div class="dailies_bg_map kikopop" style="border: solid 1px black;"></div></a></td>
<td><a href="/pirates/anchormanagement.phtml" title="Anchor Management"><div class="dailies_bg_map anchormanagement" style="border: solid 1px black;"></div></a></td>
<td><a href="/pirates/forgottenshore.phtml" title="Forgotten Shore"><div class="dailies_bg_map forgottenshore" style="border: solid 1px black;"></div></a></td>
<td><a href="/pirates/buriedtreasure/index.phtml" title="Buried Treasure"><div class="dailies_bg_map treasureblackpawkeet" style="border: solid 1px black;"></div></a></td>
<td><a href="/desert/shrine.phtml" title="Coltzan's Shrine"><div class="dailies_bg_map coltzanshrine" style="border: solid 1px black;"></div></a></td>
<td><a href="/desert/fruit/index.phtml" title="Fruit Machine"><div class="dailies_bg_map fruitmachine" style="border: solid 1px black;"></div></a></td>
<td><a href="http://ncmall.neopets.com/mall/shop.phtml?page=giveaway" title="Qasalan Expellibox"><div class="dailies_bg_map qasalanexpellibox" style="border: solid 1px black;"></div></a></td>
</tr>
<tr>
<td><a href="/desert/sc/index.phtml" title="Lost Desert Scratchcards"><div class="dailies_bg_map desertscratchcardkiosk" style="border: solid 1px black;"></div></a></td>
<td><a href="/desert/extravagance.phtml" title="Wheel of Extravagance"><div class="dailies_bg_map wheelofextravagance" style="border: solid 1px black;"></div></a></td>
<td><a href="/water/fishing.phtml" title="Underwater Fishing"><div class="dailies_bg_map yeoldefishingvortex" style="border: solid 1px black;"></div></a></td>
<td><a href="/medieval/grumpyking.phtml" title="Grumpy Old King"><div class="dailies_bg_map grumpyoldking" style="border: solid 1px black;"></div></a></td>
<td><a href="/medieval/earthfaerie.phtml" title="Illusen's Quest"><div class="dailies_bg_map illusensglade" style="border: solid 1px black;"></div></a></td>
<td><a href="/medieval/symolhole.phtml" title="Mysterious Symol Hole"><div class="dailies_bg_map mysterioussymolhole" style="border: solid 1px black;"></div></a></td>
<td><a href="/medieval/pickyourown_index.phtml" title="Pick Your Own"><div class="dailies_bg_map pickyourown" style="border: solid 1px black;"></div></a></td>
<td><a href="/medieval/turdleracing.phtml" title="Turdle Racing"><div class="dailies_bg_map turdleracing" style="border: solid 1px black;"></div></a></td>
</tr>
<td><a href="/medieval/turmaculus.phtml" title="Turmaculus"><div class="dailies_bg_map turmaculus" style="border: solid 1px black;"></div></a></td>
<td><a href="/magma/darkcave.phtml" title="Dark Cave"><div class="dailies_bg_map darkcave" style="border: solid 1px black;"></div></a></td>
<td><a href="/magma/quarry.phtml" title="Obsidian Quarry"><div class="dailies_bg_map obsidianquarry" style="border: solid 1px black;"></div></a></td>
<td><a href="/worlds/geraptiku/tomb.phtml" title="Deserted Tomb"><div class="dailies_bg_map desertedtomb" style="border: solid 1px black;"></div></a></td>
<td><a href="/island/kitchen.phtml" title="Kitchen Quest"><div class="dailies_bg_map mysteryislandkitchen" style="border: solid 1px black;"></div></a></td>
<td><a href="/island/tombola.phtml" title="Tombola"><div class="dailies_bg_map tikitacktombola" style="border: solid 1px black;"></div></a></td>
<td><a href="/community.phtml" title="Daily Puzzle"><div class="dailies_bg_map dailypuzzle" style="border: solid 1px black;"></div></a></td>
<td><a href="/jelly/jelly.phtml" title="Giant Jelly"><div class="dailies_bg_map giantjelly" style="border: solid 1px black;"></div></a></td>
</tr>
<tr>
<td><a href="/lab.phtml" title="Lab Ray"><div class="dailies_bg_map thelaboratory" style="border: solid 1px black;"></div></a></td>
<td><a href="/freebies.phtml" title="Monthly Freebies"><div class="dailies_bg_map monthlyfreebies" style="border: solid 1px black;"></div></a></td>
<td><a href="/games/lottery.phtml" title="The Neopian Lottery"><div class="dailies_bg_map theneopianlottery" style="border: solid 1px black;"></div></a></td>
<td><a href="/petpetlab.phtml" title="Petpet Lab Ray"><div class="dailies_bg_map thepetpetlaboratory" style="border: solid 1px black;"></div></a></td>
<td><a href="/soupkitchen.phtml" title="Soup Kitchen"><div class="dailies_bg_map thesoupkitchen" style="border: solid 1px black;"></div></a></td>
<td><a href="/wishing.phtml" title="The Wishing Well"><div class="dailies_bg_map thewishingwell" style="border: solid 1px black;"></div></a></td>
<td><a href="/worlds/deadlydice.phtml" title="Deadly Dice"><div class="dailies_bg_map deadlydice" style="border: solid 1px black;"></div></a></td>
<td><a href="/shenkuu/lunar.phtml" title="Lunar Temple"><div class="dailies_bg_map lunartemple" style="border: solid 1px black;"></div></a></td>
</tr>
<tr>
<td><a href="/shenkuu/neggcave.phtml" title="Mysterious Negg"><div class="dailies_bg_map mysteriousnegg" style="border: solid 1px black;"></div></a></td>
<td><a href="/space/coincidence.phtml" title="The Coincidence"><div class="dailies_bg_map coincidence" style="border: solid 1px black;"></div></a></td>
<td><a href="/winter/adventcalendar.phtml" title="Advent Calendar"><div class="dailies_bg_map adventcalendar" style="border: solid 1px black;"></div></a></td>
<td><a href="/winter/kiosk.phtml" title="Advent Calendar"><div class="dailies_bg_map tmscratchcardkiosk" style="border: solid 1px black;"></div></a></td>
<td><a href="/winter/snowfaerie.phtml" title="Snow Faerie Quests"><div class="dailies_bg_map thesnowfaeriesquests" style="border: solid 1px black;"></div></a></td>
<td><a href="/winter/snowager.phtml" title="The Snowager"><div class="dailies_bg_map thesnowager" style="border: solid 1px black;"></div></a></td>
<td><a href="/prehistoric/omelette.phtml" title="Giant Omelette"><div class="dailies_bg_map giantomlette" style="border: solid 1px black;"></div></a></td>
<td><a href="/prehistoric/mediocrity.phtml" title="Wheel of Mediocrity"><div class="dailies_bg_map wheelofmediocrity" style="border: solid 1px black;"></div></a></td>
</tr>
<tr>
<td><a href="/space/strangelever.phtml" title="Lever of Doom"><div class="dailies_bg_map leverofdoom" style="border: solid 1px black;"></div></a></td>
<td><a href="/quests.phtml" title="Faerie Quests"><div class="dailies_bg_map custom1_fixed" style="border: solid 1px black;"></div></a></td>
<td><a href="/pirates/foodclub.phtml" title="Food Club"><div class="dailies_bg_map custom2_fixed" style="border: solid 1px black;"></div></a></td>
<td><a href="/" title="Custom"><div class="dailies_bg_map custom3_fixed" style="border: solid 1px black;"></div></a></td>
<td><a href="/" title="Custom"><div class="dailies_bg_map custom4_fixed" style="border: solid 1px black;"></div></a></td>
<td><a href="/" title="Custom"><div class="dailies_bg_map custom5_fixed" style="border: solid 1px black;"></div></a></td>
<td><a href="/" title="Custom"><div class="dailies_bg_map custom1_fixed" style="border: solid 1px black;"></div></a></td>
<td><a href="/" title="Custom"><div class="dailies_bg_map custom2_fixed" style="border: solid 1px black;"></div></a></td>
</tr>
</table>
</center>

		</div>
		<div class="popup-footer__2020 popup-grid3__2020">
			<div class="popup-footer-pattern__2020"></div>
		</div>
	</div>`).appendTo("body");

var modal = document.getElementById("dailies_pop");
var btn = document.getElementById("dailiespopup_btn");

$('#dailiespopup_btn').click(function() {
    if (modal.style.display !== "none"){
		modal.style.display = "none";
	} else {
		modal.style.display = "block";
	}
});

$('html').click(function(event) {
    if ($(event.target).closest('#dailiespopup_btn, #dailies_pop').length === 0) {
        modal.style.display = "none";
    }
});
