// ==UserScript==
// @name         Neopets: Album Overview
// @author       rawbeee
// @version      1.0.1
// @description  Revamps the Overview page
// @match        *://www.neopets.com/stamps.phtml?type=progress
// @icon         https://images.neopets.com/themes/h5/altadorcup/images/settings-icon.png
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==

/*    =============================================================================================
      Description:
          Revamps the Overview page (https://www.neopets.com/stamps.phtml?type=progress) to better
          display progress for each album, including how many stamps are currently available and
          whether an avatar is tied to the album. No need to update for new stamp releases.
      =============================================================================================
      Recommended:
          Stamp Album Helper 2.0
              See what stamps you're missing. No need to be update for new stamp releases.
              https://github.com/rawxbee/neopets-scripts/raw/refs/heads/main/stamp-helper.user.js
      =============================================================================================
      Other scripts:
          https://github.com/rawxbee/neopets-scripts
          https://github.com/rawxbee/neoboard-enhancement-suite
          https://github.com/moonbathr/neopets
      =============================================================================================
      Questions/Issues:
          https://www.neopets.com/neomessages.phtml?type=send&recipient=rawbeee
      =============================================================================================  */

(function() {
    'use strict';

    function extractStampData() {
        $(`
          <style>
           @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
          </style>
          <style>
            .roboto-text {
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variation-settings:
    "wdth" 100;
}
          </style>
        `).appendTo('head');

        let table = document.querySelector('table[border="1"][cellpadding="3"][cellspacing="0"]');
        if (!table) return;

        let rows = Array.from(table.querySelectorAll('tr'));
        let stampData = {};

        rows.forEach((row, index) => {
            let cells = row.querySelectorAll('td');
            if (cells.length < 3) return;

            let album = cells[0].textContent.trim();
            let stamps = parseInt(cells[2].textContent.trim(), 10) || 0;
            let percentage = parseInt(cells[3].textContent.trim(), 10) || 0;

            stampData[index + 1] = { "album": album, "stamps": stamps, "percentage": percentage };
        });
        let albumDetails = '';
        $.getJSON( "https://gist.githubusercontent.com/rawxbee/406b49844f6664acbd4f1a0af87546d3/raw", function( data ) {
            albumDetails = data;

            let allStampDivs = '';
            let trueTotal = 0;
            for (let key in stampData) {
                let album = stampData[key].album;
                let collected = stampData[key].stamps;
                let percentage = stampData[key].percentage;
                let avatar = albumDetails[key].avatar;
                let total = albumDetails[key].total;
                trueTotal += total
                let text = `${collected}/${total}`;
                let bgColor = 'url(\'https://images.neopets.com/quests/images/bg-stars-pattern.png\'), linear-gradient(#B7B7B7 0%, #e5e5e5 50%, #b7b7b7 100%)';
                let filter = 'grayscale(1)';
                let missing = Math.floor((total / 25) * 100) || 0;
                let true_pct = Math.floor((collected / total) * 100) || 0;
                let barColor = '';
                let glowColor = '';
                let borderColor = '#929292';
                let barBorderColor = '#929292'
                let barMissing = '#FEFEFE';

                if (true_pct <= 19) {
                    barColor = '#FF6F6F';
                    glowColor = '#FF6F6F';

                }
                else if (20 <= true_pct && true_pct <= 39) {
                    barColor = '#FFB47A';
                    glowColor = '#FFB47A';

                }
                else if (40 <= true_pct && true_pct <= 59) {
                    barColor = '#FFF19C';
                    glowColor = '#FFF19C';

                }
                else if (60 <= true_pct && true_pct <= 79) {
                    barColor = '#A4E389';
                    glowColor = '#A4E389';
                }
                else if (80 <= true_pct && true_pct <= 99) {
                    barColor = '#64D12D';
                    glowColor = '#64D12D';
                }
                else if (100 <= true_pct) {
                    barColor = '#009E25';
                    glowColor = '#009E25';
                    if (percentage == 100) {
                        barColor = 'transparent';
                        glowColor = '#FFBF00';
                        filter = 'none';
                        text = 'Complete!';
                        bgColor = 'url(\'https://images.neopets.com/quests/images/bg-stars-pattern.png\'), linear-gradient(rgb(255, 165, 0) 0%, rgb(255, 242, 133) 50%, rgb(255, 165, 0) 100%)';
                        borderColor = '#CC8400';
                        barBorderColor = 'transparent';
                        barMissing = 'transparent';
                    }
                }

                let stampDiv =`
            <div style="display: grid; grid-template-rows: 0fr; align-content: space-between;justify-content: center;
            width: 125px; border: 2px solid ${borderColor}; border-radius: 10px; background: ${bgColor}; padding: 5px; cursor: pointer;" id="${key}"
            onmouseover="this.style.boxShadow='0 0 10px 4px ${glowColor}'; this.children[1].children[0].children[0].style.filter='grayscale(0)';  this.style.transform = 'scale(1.05)'; this.style.zIndex='10'; this.style.transition='all 0.3s'"
            onmouseout="this.style.boxShadow='none'; this.children[1].children[0].children[0].style.filter='${filter}'; this.style.transform = 'scale(1)'; this.style.zIndex='1'; this.style.transition='all 0.3s'"
            onclick="location.href='https://www.neopets.com/stamps.phtml?type=album&page_id=${key}&owner='">
              <div class="roboto-text" style="display: grid; align-content: center;justify-content: center;
                height: 45px; margin: 5px; text-align: center;
                font-size: 12pt;">
                  <b>${album}</b>
              </div>
              <div style="display: grid; justify-content: center; align-content: center;
                height: 50px; text-align: center;">
                  <a href='https://www.neopets.com/stamps.phtml?type=album&page_id=${key}&owner='>
                      <img style="filter: ${filter}; margin-top: -4px;" src="${avatar}">
                  </a>
              </div>
              <div style="display: grid; align-content: center; justify-content: center;
                height: 50px;">
                <div class="border" style="border: 2px solid ${barBorderColor}; border-radius: 52px;
                  background: ${barMissing}; overflow: hidden;
                  width: 100px; margin: auto auto; text-align: center;">
                    <div style="height: 25px; width: ${percentage}%; background: ${barColor};">
                    </div>
                    <div style="height:25px; width:100px; margin-top: -25px;">
                      <div style="margin-left: ${missing}px; height: 100%; width: 100%; background: #A4A4A4;">
                      </div>
                    </div>
                  <div class="roboto-text" style="display: block; color: black; width: 100px; margin-top: -25px;
                    font-size: 12pt;">
                      ${text}
                  </div>
                </div>
              </div>
          </div>`;
                allStampDivs += stampDiv;
            }
            let tableParent = table.parentNode;
            let medtext = '';
            let grandTotal = '';
            let adDiv = document.querySelector('div[style*="position: relative; float: right; width: 160px; height: 630px;"]');
            let ads = false;
            let stampContent = '';
            if (adDiv) {
                ads = true;
                stampContent = adDiv.nextElementSibling;
                adDiv.remove();
                medtext = table.nextElementSibling.nextElementSibling;
                medtext.remove();
                grandTotal = medtext.querySelector("b").textContent.trim();
            }
            else {
                medtext = tableParent.nextSibling;
                grandTotal = medtext.querySelector("b").textContent.trim();
                medtext.remove();
            }

            let total_pct = Math.floor((grandTotal / trueTotal) * 100) || 0;
            let borderColor = '#929292';
            let barColor = '#FFFFFF';
            if (total_pct <= 19) {
                barColor = '#FF6F6F';
            }
            else if (20 <= total_pct && total_pct <= 39) {
                barColor = '#FFB47A';
            }
            else if (40 <= total_pct && total_pct <= 59) {
                barColor = '#FFF19C';
            }
            else if (60 <= total_pct && total_pct <= 79) {
                barColor = '#A4E389';
            }
            else if (80 <= total_pct && total_pct <= 99) {
                barColor = '#64D12D';
            }
            else if (100 == total_pct) {
                barColor = 'url(\'https://images.neopets.com/quests/images/bg-stars-pattern.png\'), linear-gradient(to right, rgb(255, 165, 0) 0%, rgb(255, 242, 133) 50%, rgb(255, 165, 0) 100%)';
                borderColor = '#CC8400';
            }
            let finalDiv = document.createElement("div");
            finalDiv.innerHTML = `
        <div style="display: grid; align-content: center; justify-content: center;
                height: 50px; width: 100%; margin-top: -15px;">
                <div class="border robot-text" style="border: 3px solid ${borderColor}; border-radius: 25px;
                  background: #fefefe; overflow: hidden;
                  width: 628px; margin: auto auto; text-align: center;">
                    <div style="height: 25px; width: ${total_pct}%; background: ${barColor};">
                    </div>
                  <div style="display: block; color: black; width: 100%; margin-top: -25px;
                    font-size: 14pt;">
                      <b>${grandTotal} / ${trueTotal}</b>
                  </div>
                </div>
              </div>
        </div>
        <div id="stamps" style="display: grid; gap: 25px 40px; grid-template-columns: 125px 125px 125px 125px; justify-content: center; justify-items: center; margin: auto auto;">
        ${allStampDivs}
        </div>`;
            table.replaceWith(finalDiv);

            if (ads == true) {
                stampContent.outerHTML = stampContent.innerHTML
            }
        }).fail(function(jqxhr, textStatus, error) {
            console.error("Request Failed: " + textStatus + ", " + error);
        });
    }
    let owner = appInsightsUserName;
    let defaultURL = 'https://www.neopets.com/stamps.phtml?type=album&page_id=0&owner=';
    let ownerURL = 'https://www.neopets.com/stamps.phtml?owner=' + owner;
    if (window.location.href.includes("/stamps.phtml?type=progress")) {
        window.addEventListener('load', extractStampData);
    }
})();
