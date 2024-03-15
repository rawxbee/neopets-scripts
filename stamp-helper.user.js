// ==UserScript==
// @name         Stamp Album Helper 2.0
// @namespace    neopets
// @version      2024.02.08
// @description  Adds an info menu about your missing stamps
// @author       EatWooloos (edited by rawbeee)
// @match        *://www.neopets.com/stamps.phtml?type=album&page_id=*
// ==/UserScript==

const hasPremium = !!$("#sswmenu .imgmenu").length;
const owner = location.search.match(/owner=(.+)&*/)?.[1] || appInsightsUserName;

/****************************************************************************************
 *
 *  < Stamp Album Helper by u/Eat_Wooloo_As_Mutton >
 *
 *  This script helps you find and fill up your missing stamps much quicker and easier
 *  without having to open up an external database like Jellyneo in another tab.
 *
 *  This script uses some functionality from diceroll's Search Helper script
 *  (https://github.com/diceroll123/NeoSearchHelper)
 *
 *  Stamp list shamelessly scraped from Jellyneo item database
 *  (https://items.jellyneo.net/)
 *
 *  edit by rawbeee: stored stamp data in a gist, retooled the script to grab this data from a url (which I keep updated) so that it isn't required to update the script manually.
 *
 ****************************************************************************************/
const albumID = location.search.match(/page_id=(\d+)&*/)[1];
const url = "https://gist.githubusercontent.com/rawxbee/421f72e8d921ab65d477bfb83527959c/raw/";
getStamps();

function getStamps() {
    $.getJSON( "https://gist.githubusercontent.com/rawxbee/421f72e8d921ab65d477bfb83527959c/raw/", function( data ) {
        console.log(data);
        // Get the data for this album page
        const thisPage = data[albumID]
        console.log(thisPage);
        $("body").append(`
    <style>
        .fake-stamp {
            opacity: 25% !important;
        }
        .stamp-info {
            display: none;
        }
        .stamp-info.visible {
            display: block;
            text-align: center;
        }
        .stamp-info-table {
            width: 450px;
            margin: auto;
            border: 1px solid #b1b1b1;
            border-collapse: collapse;
        }
        .stamp-info-table td {
            padding: 6px;
        }
        .searchimg {
            width: 35px !important;
            height: 35px !important;
        }
        .content table img {
            cursor: pointer;
        }
        .stamp-selected {
            /* Green border box */
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAIAAAC3ytZVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAECSURBVHhe7dBBEYAwEARBtKAnZqMQfhRzFtJba2D6uvfy7zhyHDmOHEc+OZ7DNvJxJB9H8nEkH0fycSQfR/JxJB9H8nEkH0fycSQfR/JxJB9H8nEkH0fycSQfR/JxJB9H8nEkH0fycSQfR/JxJB9H8nEkH0fycSQfR/JxJB9H8nEkH0fycSQfR/JxJB9H8nEkH0fycSQfR/JxJB9H8nEkH0fycSQfR/JxJB9H8nEkH0fycSQfR/JxJB9H8nEkH0fycSQfR/JxJB9H8nEkH0fycSQfR/JxJB9H8nEkH0fycSQfR/JxJB9H8nEkH0fycSQfR/JxJH9yHH4cOY4cR47j971exW0rqwgJ0K4AAAAASUVORK5CYII=) no-repeat;
        }
        .stamp-info-arrow:hover {
            background: #dfdfdf;
        }
    </style>
`);
        // Replace the images
        let infoContent = {};
        $(".content table img").each(function (index, element) {

            const { position, name, img, rarity } = thisPage["list"][index];

            $(element).attr("position", position).attr("rarity", rarity);

            if ($(element).attr("alt") === "No Stamp" && name !== "No Stamp") {
                $(element)
                    .addClass("fake-stamp")
                    .attr("title", name)
                    .attr("src", `http://images.neopets.com/items/${img}`)
                    .attr("alt", name)
                    .attr("rarity", rarity);
            }

            infoContent[position] = createInfoContent(element);

            $(element).on("click", function () {
                $(".stamp-info").html(infoContent[position]).show();
                $(".content table td").removeClass("stamp-selected");
                $(element).parent().addClass("stamp-selected");
            });

            if (hasPremium && name !== "No Stamp") {
                $(element).on("dblclick", function () {
                    sswopen(name);
                });
            }

        });
        function createInfoContent(imgElement) {

            const $img = $(imgElement),
                  src = $img.attr("src"),
                  stampName = $img.attr("alt"),
                  position = $img.attr("position"),
                  rarity = $img.attr("rarity");

            if (stampName === "No Stamp") {
                return `
<br>
<table class="stamp-info-table">
    <tr>
        <td class="stamp-info-arrow prev-arrow" rowspan="5"><img alt="Previous" src="http://images.neopets.com/themes/h5/premium/images/arrow-left.svg" style="width: 20px"></td>
        <td rowspan="5" style="width: 30%; text-align: center;"><img src="${src}"></td>
        <td style="text-align: center; font-weight: bold; padding: 12px;">${stampName}</td>
        <td class="stamp-info-arrow next-arrow" rowspan="5"><img alt="Next" src="http://images.neopets.com/themes/h5/premium/images/arrow-right.svg" style="width: 20px"></td>
    </tr>
    <tr>
        <td>Position: <b id="current-stamp-pos">${position}</b></td>
    </tr>
    <tr>
        <td>This stamp hasn't been released yet.</td>
    </tr>
    <tr>
        <td></td>
    </tr>
    <tr>
        <td style="text-align: center;"></td>
    </tr>
</table>
        `;
            }

            const hasStamp = $img.hasClass("fake-stamp") === false;

            // const hasStampText = `<b>${owner}</b> ${hasStamp ? '<b style="color: green">has</b>' : '<b style="color: red">doesn\'t have</b>'} this stamp.`;
            const hasStampText = `Status: ${hasStamp ? '<b style="color: green">Collected!</b>' : '<b style="color: red">Not collected</b>'}`;

            const rarityText = r => {
                const rNum = parseInt(r.replace(/r/, ``));
                if (rNum <= 74) return r;
                else if (rNum >= 75 && rNum <= 84) return `<strong style="color:green">${r} (uncommon)</strong>`;
                else if (rNum >= 85 && rNum <= 89) return `<strong style="color:green">${r} (rare)</strong>`;
                else if (rNum >= 90 && rNum <= 94) return `<strong style="color:green">${r} (very rare)</strong>`;
                else if (rNum >= 95 && rNum <= 98 || rNum === 100) return `<strong style="color:green">${r} (ultra rare)</strong>`;
                else if (rNum === 99) return `<strong style="color:green">${r} (super rare)</strong>`;
                else if (rNum >= 101 && rNum <= 104) return `<strong style="color:#aa4455">${r} (special)</strong>`;
                else if (rNum >= 105 && rNum <= 110) return `<strong style="color:red">${r} (MEGA RARE)</strong>`;
                else if (rNum >= 111 && rNum <= 179) return `<strong style="color:red">${r} (RARITY ${rNum})</strong>`;
                else if (rNum === 180) return `<strong style="color:#666666">${r} (retired)</strong>`;
            };

            const createHelper = itemName => {
                // From diceroll's Search Helper script - https://github.com/diceroll123/NeoSearchHelper
                const linkmap = { // for urls and images for each search type
                    ssw: {
                        img: "http://images.neopets.com/premium/shopwizard/ssw-icon.svg"
                    },
                    sw: {
                        url: "http://www.neopets.com/shops/wizard.phtml?string=%s",
                        img: "http://images.neopets.com/themes/h5/basic/images/shopwizard-icon.png"
                    },
                    tp: {
                        url: "http://www.neopets.com/island/tradingpost.phtml?type=browse&criteria=item_exact&search_string=%s",
                        img: "http://images.neopets.com/themes/h5/basic/images/tradingpost-icon.png"
                    },
                    au: {
                        url: "http://www.neopets.com/genie.phtml?type=process_genie&criteria=exact&auctiongenie=%s",
                        img: "http://images.neopets.com/themes/h5/basic/images/auction-icon.png"
                    },
                    sdb: {
                        url: "http://www.neopets.com/safetydeposit.phtml?obj_name=%s&category=0",
                        img: "http://images.neopets.com/images/emptydepositbox.gif"
                    },
                    jni: {
                        url: "https://items.jellyneo.net/search/?name=%s&name_type=3",
                        img: "http://images.neopets.com/items/toy_plushie_negg_fish.gif"
                    }
                };

                const combiner = (item, url, image) => {
                    url = url.replace("%s", item);
                    return `<a tabindex='-1' target='_blank' href='${url}'><img src='${image}' class='searchimg'></a>`;
                };

                const sswhelper = item => {
                    let ssw = ``;
                    if (hasPremium) {
                        ssw = `<img item="${item}" class="stamp-ssw-helper searchimg" src="${linkmap.ssw.img}">`;
                    }
                    return ssw;
                };

                return `<span class="search-helper">${sswhelper(itemName)}${combiner(itemName, linkmap.sw.url, linkmap.sw.img)}${combiner(itemName, linkmap.tp.url, linkmap.tp.img)}${combiner(itemName, linkmap.au.url, linkmap.au.img)}${combiner(itemName, linkmap.sdb.url, linkmap.sdb.img)}${combiner(itemName, linkmap.jni.url, linkmap.jni.img)}</span>`;
            };

            return `<br>
<table class="stamp-info-table" item="${stampName}">
    <tr>
        <td class="stamp-info-arrow prev-arrow" rowspan="4"><img alt="Previous" src="http://images.neopets.com/themes/h5/premium/images/arrow-left.svg" style="width: 20px"></td>
        <td rowspan="4" style="width: 30%; text-align: center;"><img src="${src}"></td>
        <td style="text-align: center; font-weight: bold; padding: 12px;">${stampName}<br>${rarityText(rarity)}</td>
        <td class="stamp-info-arrow next-arrow" rowspan="4"><img alt="Next" src="http://images.neopets.com/themes/h5/premium/images/arrow-right.svg" style="width: 20px"></td>
    </tr>
    <tr>
        <td>Position: <b id="current-stamp-pos">${position}</b></td>
    </tr>
    <tr>
        <td>${hasStampText}</td>
    </tr>
    <tr>
        <td style="text-align: center; padding: 16px 6px;">${createHelper(stampName)}</td>
    </tr>
</table>
    `;
        }

    }
         )
};

// Add stamp info menu
$(".content table").after(`<p class="stamp-info"></p>`);

// Add right-click tip
if (hasPremium) {
    $(".content table").before(`<p style="text-align: center; font-style: italic; color: green; font-weight: bold">Double-click the stamp to search it<br>on the Super Shop Wizard!</p>`)
}

const jnfish = `<img src="http://images.neopets.com/items/toy_plushie_negg_fish.gif" style="width: 30px; height: 30px; vertical-align: middle;">`;
$(".content").append(`<p style="text-align: center;"><a href="https://items.jellyneo.net/search/?sort=6&album=${albumID}" target="_blank">${jnfish}&nbsp;Album info&nbsp;${jnfish}</a></p>`);

// SSW icon
$("body").on("click", ".stamp-ssw-helper", function () {
    const item = $(this).attr("item");
    sswopen(item);
});

function sswopen(item) {
    if ($(".sswdrop").hasClass("panel_hidden")) {
        $("#sswmenu .imgmenu").click();
    }
    if ($("#ssw-tabs-1").hasClass("ui-tabs-hide")) {
        $("#button-new-search").click();
    }

    $("#ssw-criteria").val("exact");
    $("#searchstr").val(item);
}

// Stamp prev/next arrow
$("body").on("click", ".stamp-info-arrow", function () {
    const isNext = $(this).hasClass("next-arrow");
    const isPrev = $(this).hasClass("prev-arrow");

    const position = parseInt($("#current-stamp-pos").html());
    console.log(position);

    const newPosition = (function () {
        if (position === 25 && isNext) {
            return 1;
        }
        else if (position === 1 && isPrev) {
            return 25;
        }
        else if (isNext) {
            return position + 1;
        }
        else if (isPrev) {
            return position - 1;
        }
    })();

    $(`img[position='${newPosition}']`).click();
});
