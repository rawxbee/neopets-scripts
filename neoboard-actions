// ==UserScript==
// @name         Neopets: Additional Neoboard Actions
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds buttons to each post that allows you to respond to the specific user, mail the specific user, view the specific user's auctions/trades/shop and refresh the thread.
// @author       rawbeee - code borrowed/edited from sunbath (https://github.com/moonbathr/neopets/tree/main)
// @match        http://www.neopets.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

$(`<style type='text/css'>
.reportButton-neoboards {
  border: 0px !important;
  text-transform: uppercase;
  font-size: 9px !important;
  color: #999 !important;
  width: 50px;
  height: 20px;
  margin-bottom: 0px;
  position:absolute;
  bottom: 0px;
  right: 0px;
  overflow: hidden;
}
.reportButton-neoboards:hover {
  background-color: transparent !important;
  color: #585858 !important;
}
div.boardPostByline {
  position: relative;
}
div.boardPost {
  position: relative;
}
div.postPetInfo {
  margin-bottom: 10px;
}
</style>`).appendTo("head");

function replyTo() {
    $(".boardPostByline").each(function(i, byline) {
        var user = $(byline).find( ".postAuthorName" ).text().replace(/[^a-zA-Z 0-9 _]+/g, '');
            $(byline).append(`<div class="replyTo" style="cursor: pointer; color: #999; font-size: 10px; position:absolute; bottom:0; right:8px;"><p>REPLY </p></div>`);
    });
$('.replyTo').click(function fillReply() {
    var form_obj	= document.message_form;
    var user = $(this).parent().find( ".postAuthorName" ).text();
    form_obj.message.value += "@" + user + " ";
    form_obj.message.focus();
     });
}
function userActions() {
    $(".postAuthorInfo").each(function(i, info) {
        var user = $(info).find( ".postAuthorName" ).text().replace(/[^a-zA-Z 0-9 _]+/g, '');
            $(info).append(
                `<span class="actions" style=>
<a href="/neomessages.phtml?type=send&recipient=${user}"<div cursor:pointer;"><img src="https://www.flaticon.com/svg/static/icons/svg/646/646094.svg" style="height:15px; width:15px;"></div></a>
<a href="/island/tradingpost.phtml?type=browse&criteria=owner&search_string=${user}"<div cursor:pointer;"><img src="https://www.flaticon.com/svg/static/icons/svg/876/876784.svg" style="height:15px; width:15px;"></div></a>
<a href="/genie.phtml?type=find_user&auction_username=${user}"<div cursor:pointer;"><img src="https://www.flaticon.com/svg/static/icons/svg/783/783196.svg" style="height:15px; width:15px;"></div></a>
<a href="/browseshop.phtml?owner=${user}"<div cursor:pointer;"><img src="https://www.flaticon.com/svg/static/icons/svg/1170/1170678.svg" style="height:15px; width:15px;"></div></a></span>`);
    });
}

function refreshThread() {
$(`.reportButton-neoboards`).before(`
<div class="rotateRefresh" onClick="location.reload();" style="position:absolute; bottom:20px; right:15px; cursor:pointer;">
<img src="https://www.flaticon.com/svg/static/icons/svg/17/17686.svg" style="height:15px; width:15px;"></div>`);
}

document.addEventListener('DOMContentLoaded', replyTo);
document.addEventListener('DOMContentLoaded', userActions);
document.addEventListener('DOMContentLoaded', refreshThread);
