// ==UserScript==
// @name         DTI Lists Abroad
// @description  Cross-check your wishlist and tradelist with JN wishlists and tradelists as well as user galleries. View your DTI wishlist while logged in to initiate list population.
// @version      1.0.0
// @author       rawbeee (based on scripts by sunbathr and friendly-trenchcoat)
// @match        *impress.openneo.net/*
// @match        *www.neopets.com/gallery/*
// @match        *items.jellyneo.net/mywishes*
// @require      http://code.jquery.com/jquery-latest.js
// @require      http://userscripts-mirror.org/scripts/source/107941.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
var myWishlist = GM_SuperValue.get("Wishlist", []);
var myTradelist = GM_SuperValue.get("Tradelist", []);

function populateLists () {
    if (document.URL.includes("openneo.net/user/")) {
        var share = document.getElementById("closet-hangers-share");
        if (share) {
            //Tradelist
            var tradelist_items = Array.from(document.getElementById("closet-hangers-group-true").getElementsByClassName("name"));
            var tradelist_items_length = tradelist_items.length;
            let tradelist = [];
            for (let i = 0; i < tradelist_items_length; i++) {
                tradelist.push(tradelist_items[i].innerHTML);}
            GM_SuperValue.set ("Tradelist", tradelist);
            console.log("Personal tradelist updated.");

            //Wishlist
            var wishlist_items = Array.from(document.getElementById("closet-hangers-group-false").getElementsByClassName("name"));
            var wishlist_items_length = wishlist_items.length;
            let wishlist = [];
            for (let i = 0; i < wishlist_items_length; i++) {
                wishlist.push(wishlist_items[i].innerHTML);}
            GM_SuperValue.set ("Wishlist", wishlist);
            console.log("Personal wishlist updated.");
        }
    }
}

function highlightLists() {
    //Gallery
    if (document.URL.includes("neopets.com/gallery")) {
        let found = 0;
        let highlighted = [];
        $('td>b.textcolor').each(function (i, el) {
            var name = $(el).text();
            if ($.inArray(name, myWishlist) !== -1) {
                $((el).parentElement.firstChild).css("border", `1px solid red`);
                $((el).parentElement.firstChild).css("box-shadow", '0px 0px 1px 1px red');
                found += 1;
                highlighted.push(' ' + name);
            }
        });
        $(document.getElementsByClassName("textcolor"))[0].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML += `<center><div id="found-items"><b>Found ${found} item(s) that you want:</b></div></center>`;
        if (highlighted.length != 0) {
                $(document.getElementById("found-items")).append(`${highlighted}.`);
            }
            else if (highlighted.length == 0) {
                $(document.getElementById("found-items")).append("<b>(</b>");
            }
}
    //JN Wishlists
    else if (document.URL.includes("https://items.jellyneo.net/mywishes")) {
        try {
        var list = document.getElementsByClassName("rarity-label-ncmall text-smaller")[0].innerHTML;
        let highlighted = [];
        //Wishlist
        if (list == "(NC Trade List)") {
            let wfound = 0;
            $('img.item-result-image.nc').each((i, el) => {
                const name = $(el).attr('title').split(' - r')[0];
                if ($.inArray(name, myWishlist) !== -1) {
                    $((el)).css("border", '1px solid red');
                    $((el)).css("box-shadow", '0px 0px 1px 1px red');
                    wfound += 1;
                    highlighted.push(' ' + name);
                }
            });
            $(document.getElementsByClassName("row hide-for-print")).after(`<div id="found-items"><b>Found ${wfound} item(s) that you want:</b></div><br>`);
            if (highlighted.length != 0) {
                $(document.getElementById("found-items")).append(`${highlighted}.`);
            }
            else if (highlighted.length == 0) {
                $(document.getElementById("found-items")).append("<b>(</b>");
            }
        }
        //Tradelist
        else if (list == "(NC Wishlist)") {
            let tfound = 0;
            $('img.item-result-image.nc').each((i, el) => {
                const name = $(el).attr('title').split(' - r')[0];
                if ($.inArray(name, myTradelist) !== -1) {
                    $((el)).css("border", '1px solid green');
                    $((el)).css("box-shadow", '0px 0px 1px 1px green');
                    tfound += 1;
                    highlighted.push(' ' + name);
                }
            });
            $(document.getElementsByClassName("row hide-for-print")).after(`<div id="found-items"><b>Found ${tfound} item(s) that you own:</b></div><br>`);
            if (highlighted.length != 0) {
                $(document.getElementById("found-items")).append(`${highlighted}.`);
            }
                        else if (highlighted.length == 0) {
                $(document.getElementById("found-items")).append("<b>(</b>");
            }
        }
        }
        catch {
        //If the list isn't defined
            let tfound = 0;
            let wfound = 0;
            let thighlighted = [];
            let whighlighted = [];
            $('img.item-result-image.nc').each((i, el) => {
                const name = $(el).attr('title').split(' - r')[0];
                if ($.inArray(name, myTradelist) !== -1) {
                    $((el)).css("border", '1px solid green');
                    $((el)).css("box-shadow", '0px 0px 1px 1px green');
                    tfound += 1;
                    thighlighted.push(' ' + name);
                }
                else if ($.inArray(name, myWishlist) !== -1) {
                    $((el)).css("border", '1px solid red');
                    $((el)).css("box-shadow", '0px 0px 1px 1px red');
                    wfound += 1;
                    whighlighted.push(' ' + name);
                }
            });
            $(document.getElementsByClassName("row hide-for-print")).after(`<div id="found-items"><b>Unable to determine if the list is a tradelist or wishlist.<br><br>Found ${tfound} item(s) that you own:</b></div><br>`);
            if (thighlighted.length != 0) {
                $(document.getElementById("found-items")).append(`${thighlighted}.`);
            }
            else if (thighlighted.length == 0) {
                $(document.getElementById("found-items")).append("<b>(</b>");
            }
            $(document.getElementById("found-items")).append(`<br><br><b>Found ${wfound} item(s) that you want:</b>`);
            if (whighlighted.length != 0) {
                $(document.getElementById("found-items")).append(`${whighlighted}.`);
            }
            else if (whighlighted.length == 0) {
                $(document.getElementById("found-items")).append("<b>(</b>");
            }
        }
    }
}

populateLists();
highlightLists();
