// ==UserScript==
// @name         Neopets: Album Overview
// @author       rawbeee
// @version      1.0.3
// @description  Revamps the Overview page
// @match        *://www.neopets.com/stamps.phtml?type=progress
// @icon         https://images.neopets.com/themes/h5/altadorcup/images/settings-icon.png
// ==/UserScript==

/*    =============================================================================================
      Description:
          Revamps the Overview page (https://www.neopets.com/stamps.phtml?type=progress) to better
          display progress for each album, including how many stamps are currently available and
          whether an avatar is tied to the album. No need to update for new stamp releases.
      =============================================================================================
      Other scripts:
          https://github.com/rawxbee/neopets-scripts
          https://github.com/rawxbee/neoboard-enhancement-suite
          https://github.com/moonbathr/neopets
      =============================================================================================
      Questions/Issues:
          https://www.neopets.com/neomessages.phtml?type=send&recipient=rawbeee
      =============================================================================================  */

(function () {
    'use strict';

    function extractStampData() {
        const robotoFont = document.createElement('style');
        robotoFont.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
  .roboto-text {
    font-family: "Roboto", sans-serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    font-variation-settings: "wdth" 100;
  }
`;
        document.head.appendChild(robotoFont);

        let table = document.querySelector('table[border="1"][cellpadding="3"][cellspacing="0"]');
        if (!table) return;

        let rows = Array.from(table.querySelectorAll('tr'));
        let grandTotal = 0;
        let stampData = {};

        rows.forEach((row, index) => {
            let cells = row.querySelectorAll('td');
            if (cells.length < 3) return;

            let album = cells[0].textContent.trim();
            let stamps = parseInt(cells[2].textContent.trim(), 10) || 0;
            grandTotal += stamps;
            let percentage = parseInt(cells[3].textContent.trim(), 10) || 0;

            stampData[index + 1] = { "album": album, "stamps": stamps, "percentage": percentage };
        });

        let albumDetails = '';
        const data_url = "https://gist.githubusercontent.com/rawxbee/406b49844f6664acbd4f1a0af87546d3/raw";
        const cacheBuster = `cb=${Date.now()}`;

        fetch(`${data_url}?${cacheBuster}`)
            .then(response => {
                if (!response.ok) throw new Error('Could not retrieve data');
                return response.json();
            })
            .then(data => {
                albumDetails = data;

                let allStampDivs = '';
                let trueTotal = 0;
                for (let key in stampData) {
                    let album = stampData[key].album;
                    let collected = stampData[key].stamps;
                    let percentage = stampData[key].percentage;

                    if (!albumDetails[key]) {
                        console.log(
                            `Album ${key} (${album}) missing from albumDetails JSON. Using dummy data.`
                        );
                        albumDetails[key] = {
                            album: album,
                            avatar: "https://images.neopets.com/neoboards/boardIcons/avatars.png",
                            total: 0
                        };
                    }

                    let avatar = albumDetails[key].avatar;
                    let total = albumDetails[key].total;
                    trueTotal += total;

                    let text = `${collected}/${total}`;
                    let bgColor = 'url(\'https://images.neopets.com/quests/images/bg-stars-pattern.png\'), linear-gradient(#B7B7B7 0%, #e5e5e5 50%, #b7b7b7 100%)';
                    let filter = 'grayscale(1)';
                    let missing = Math.floor((total / 25) * 100) || 0;
                    let true_pct = Math.floor((collected / total) * 100) || 0;
                    let barColor = '';
                    let glowColor = '';
                    let borderColor = '#929292';
                    let barBorderColor = '#929292';
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

                    let stampDiv = `
            <a href="https://www.neopets.com/stamps.phtml?type=album&page_id=${key}"
            id="album-${key}"
   style="text-decoration: none; color: inherit; display: inline-block;"
   onmouseover="this.querySelector('.albumCard').style.boxShadow='0 0 10px 4px ${glowColor}';
                this.querySelector('.albumCard').style.transform='scale(1.05)';
                this.querySelector('.albumCard').style.zIndex='10';
                this.querySelector('.albumCard').style.transition='all 0.3s';
                this.querySelector('img').style.filter='grayscale(0)'"
   onmouseout="this.querySelector('.albumCard').style.boxShadow='none';
               this.querySelector('.albumCard').style.transform='scale(1)';
               this.querySelector('.albumCard').style.zIndex='1';
               this.querySelector('.albumCard').style.transition='all 0.3s';
               this.querySelector('img').style.filter='${filter}'">

  <div class="albumCard" style="display: grid; grid-template-rows: 0fr; align-content: space-between; justify-content: center;
              width: 125px; border: 2px solid ${borderColor}; border-radius: 10px; background: ${bgColor}; padding: 5px; cursor: pointer;">

    <div class="roboto-text" style="display: grid; align-content: center; justify-content: center;
      height: 45px; margin: 5px; text-align: center; font-size: 12pt;">
      <b>${album}</b>
    </div>

    <div style="display: grid; justify-content: center; align-content: center; height: 50px; text-align: center;">
      <img style="filter: ${filter}; margin-top: -4px;" src="${avatar}">
    </div>

    <div style="display: grid; align-content: center; justify-content: center; height: 50px;">
      <div class="border" style="border: 2px solid ${barBorderColor}; border-radius: 10px;
        background: ${barMissing}; overflow: hidden; width: 100px; margin: auto auto; text-align: center;">

        <div style="height: 25px; width: ${percentage}%; background: ${barColor};"></div>

        <div style="height: 25px; width: 100px; margin-top: -25px;">
          <div style="margin-left: ${missing}px; height: 100%; width: 100%; background: #A4A4A4;"></div>
        </div>

        <div class="roboto-text" style="display: block; color: black; width: 100px; margin-top: -25px; font-size: 12pt;">
          ${text}
        </div>
      </div>
    </div>

  </div>
</a>
`;
                    allStampDivs += stampDiv;
                }

                let medtext = [...document.querySelectorAll('p')].filter(p => p.textContent.includes('You have a total of'));
                if (medtext[0]) {
                    medtext[0].remove();
                }

                let ads = false;
                let stampContent;
                let adDiv = document.querySelector('div[style*="position: relative; float: right; width: 160px; height: 630px;"]');
                if (adDiv) {
                    ads = true;
                    stampContent = adDiv.nextElementSibling;
                    adDiv.remove();
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
        <div id="stamps" style="display: grid; gap: 25px 40px; grid-template-columns: 125px 125px 125px 125px; justify-content: center; justify-items: center; margin: 13px auto;">
        ${allStampDivs}
        </div>`;
                table.replaceWith(finalDiv);

                if (ads === true && stampContent) {
                    stampContent.outerHTML = stampContent.innerHTML;
                }
            })
            .catch(error => {
                console.error("Request Failed: ", error);
            });
    }

    let owner = appInsightsUserName;
    let defaultURL = 'https://www.neopets.com/stamps.phtml?type=album&page_id=0&owner=';
    let ownerURL = 'https://www.neopets.com/stamps.phtml?owner=' + owner;
    if (window.location.href.includes("/stamps.phtml?type=progress")) {
        window.addEventListener('load', extractStampData);
    }
})();
