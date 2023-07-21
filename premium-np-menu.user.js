// ==UserScript==
// @name         Neopets - Premium NP Menu
// @version      1.0.3
// @description  Click the NP icon to display your bankroll stats
// @author       rawbeee - edited from EatWoolooAsMutton (https://greasyfork.org/en/scripts/419395-neopets-premium-toolbar-beta/code)
// @match        *://www.neopets.com/*
// @match        *://neopets.com/*
// @exclude      *://www.neopets.com/haggle.phtml*
// @exclude      *://neopets.com/haggle.phtml*
// @grant        none
// ==/UserScript==

if (typeof jQuery === undefined) return;

$.fn.exists = function () {
    return this.length > 0
};

// Check if page is new layout
if (!$("[class^='nav-pet-menu-icon']").exists()) {
    return false;
}

const hasPremium = $(".navsub-ssw-icon__2020").exists();
const $premium = $(".nav-top-grid__2020 a[href*='premium']");
const $meter = $(".navsub-right__2020 a[href*='bank.phtml']");
const onhand = $(`.navsub-np-meter__2020`).find("#npanchor.np-text__2020").text();

if (hasPremium && $premium.exists()) {

    $(".navsub-np-meter__2020").html(`<div class="navsub-np-icon__2020"></div><span id="npanchor" class="np-text__2020">${onhand} +</span>`).css({"color" : "#00ff00"});

    function getPremiumStats() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type : "GET",
                async : true,
                url : "/premium/",
                timeout : 10000,
                dataFilter : data => {
                    const response = $.parseHTML(data);
                    let stats = {};
                    $(response).find(".bankroll-mid p").each(function (index, element) {
                        const html = $(element).html();
                        switch (index) {
                            case 0:
                                stats["total"] = html.split(": ")[1];
                                break;
                            case 1:
                                stats["bank"] = html.split(": ")[1];
                                break;
                            case 2:
                                stats["till"] = html.split(": ")[1];
                                break;
                            case 3:
                                stats["stockQty"] = html;
                                break;
                            case 4:
                                stats["stockPaid"] = html;
                                break;
                            case 5:
                                stats["stockVal"] = html;
                                break;
                            case 6:
                                stats["percent"] = html;
                                break;
                            default:
                            // your pc explodes if you reach here
                        }
                    });
                    resolve(stats);
                },
                error : data => {
                    console.log(data);
                    reject("Request timed out");
                }
            });
        })
    }


    const menuStyle = `
        <style>
            .prem-dropdown {
                position: absolute;
                /*top: calc(100%);
                left: 80%;
                margin-left: -40px;*/
                width: fit-content;
                overflow-x: hidden;
                overflow-y: hidden;
                box-sizing: border-box;
                border-radius: 10px;
                background-color: #f5fdff;
                color: #000000;
                border: 2px solid #cacaca;
                display: none;
                font-family: MuseoSansRounded700, Arial, sans-serif;
                padding: 12px;
                font-size: 10pt;
 text-align: center;
            }
            .prem-dropdown img {
                width: 30px;
                height: 30px;
                vertical-align: middle;
            }
            .prem-dropdown a {
                color: #000000;
            }
            .stockTable {
                margin: auto;
            }
            .stockTable td {
                padding: 3px 8px;
            }
        </style>`;
    $(menuStyle).appendTo("head");

    const loading = `
            <div id="prem-dropdown" class="prem-dropdown" style="display: none;">
                <!--Promise pending-->
                <img alt="Loading..." src="http://images.neopets.com/games/pages/Z8AGM.gif">
                <span style="color: #000000">Getting data...</span>
            </div>`;
    $meter.before(loading);

    const $menu = $("#prem-dropdown");

    // Click method
    let onFirstClick = true;
    $meter.removeAttr("href").on("click", function () {
        reposition();

        if (onFirstClick) {
            (async () => {
                try {
                    const {
                        bank, till, total,
                        stockPaid, stockQty, stockVal, percent
                    } = await getPremiumStats();

                    // const totalnum = total.replace(/[^a-zA-Z 0-9 _]+/g, '')
                    // const goal = (Number.parseInt(totalnum, 10)/(#/100)).toFixed(2)
                    // replace # with your goal ie (25000000) and replace the goal image below, then remove the // from the two above constants as well as the 3 lines of code within the html

                    $menu.html(`
                    <div class="navsub-np-meter__2020">
                    <a href="/bank.phtml?type=your" title="Bank Balance" style="text-decoration: none;">
                        <img src="http://images.neopets.com/premium/portal/images/banktotal-icon.png" style="height: 25px; width: 23px;">
                        <span id="np-bank" class="np-text__2020" style="">${bank}</span>
                    </a><br>` +
                    `<a href="/market.phtml?type=till" title="Shop Till" style="text-decoration: none;">
                        <img src="http://images.neopets.com/premium/portal/images/shoptill-icon.png" style="height: 25px; width: 23px;">
                        <span id="np-till" class="np-text__2020">${till}</span>
                    </a><br>` +
                    `<a href="/inventory.phtml" title="Total NP" style="text-decoration: none;">
                        <img src="http://images.neopets.com/premium/portal/images/nptotal-icon.png" style="height: 25px; width: 23px;">
                        <span id="np-total" class="np-text__2020">${total}</span>
                    </a><br>` +
		                //`<img src="http://images.neopets.com/items/earth_staff.gif" style="height: 25px; width: 23px;">
                        //<span id="npanchor" class="np-text__2020">${goal}%</span>
                      //<br>` +
                    `<a href="/stockmarket.phtml?type=portfolio" title="Stocks" style="text-decoration: none;">
		                <img src="http://images.neopets.com/premium/portal/images/stocks-positive.svg" style="height: 25px; width: 23px;">
                        <span id="npanchor" class="np-text__2020" style="color: ${percent.match(/\+/) ? "#008000" : "#ff0000"}">${percent}</span>
                    </a>
                    </div>
                    `);
                    reposition();

                } catch (error) {

                    console.log(error.message);
                    $(".prem-dropdown").html(`<span style="color: #ff0000">Request timed out.</span>`);

                } finally {
                    onFirstClick = false;
                }
            })();
        }

        if ($menu.is(":hidden")) {
            $(this).find(".navsub-np-meter__2020").html(`<div class="navsub-np-icon__2020"></div><span id="npanchor" class="np-text__2020">${onhand} x</span>`);
            $menu.show();
        } else if ($menu.is(":visible")) {
            $(this).find(".navsub-np-meter__2020").html(`<div class="navsub-np-icon__2020"></div><span id="npanchor" class="np-text__2020">${onhand} +</span>`);
            $menu.hide();
        }

    });


    function reposition() {
        $menu.css({
            "top" : `30px`,
            "left" : `-30px`,
        });
    }

}
