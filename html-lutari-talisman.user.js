// ==UserScript==
// @name         Neopets: HTML Lutari Talisman
// @author       rawbeee
// @version      1.0.3
// @description  Displays Lutari Talisman in HTML with details about benefits and beads.
// @match        *://www.neopets.com/mobile/yourtali.phtml
// @icon         https://images.neopets.com/themes/h5/altadorcup/images/settings-icon.png
// @grant        none
// ==/UserScript==

/*    =============================================================================================
      Description:
          Displays the Lutari Talisman using HTML, with grey beads denoting those you have not yet
          collected. Your current benefits are displayed above the Talisman, and clicking any bead
          will provide details about it here. If you have premium you can double-click to open the
          Super Shop Wizard and quickly search for the bead.
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

    // Variable to store the original benefits HTML for toggling display
    let originalBenefitsHTML = '';

    // Bead descriptions by color
    const beadDescriptions = {
        'yellow': 'Some people say this bead brings you speed. Others say it could spell your doom. Do you really want to find out whos right?',
        'blue': 'Some people say this bead brings you diplomacy. Others say it could spell your doom. Do you really want to find out whos right?',
        'red': 'Some people say this bead brings you strength. Others say it could spell your doom. Do you really want to find out whos right?',
        'green': 'Some people say this bead brings you good luck. Others say it could spell your doom. Do you really want to find out whos right?'
    };

    // Image URLs for each bead by color and type
    const beadImageURLs = {
        'blue': {
            'matu': 'https://images.neopets.com/items/lutari_bead_20.gif',
            'oranu': 'https://images.neopets.com/items/lutari_bead_19.gif',
            'ranaka': 'https://images.neopets.com/items/lutari_bead_17.gif',
            'tongi': 'https://images.neopets.com/items/lutari_bead_16.gif',
            'urapa': 'https://images.neopets.com/items/lutari_bead_18.gif'
        },
        'green': {
            'matu': 'https://images.neopets.com/items/lutari_bead_15.gif',
            'oranu': 'https://images.neopets.com/items/lutari_bead_14.gif',
            'ranaka': 'https://images.neopets.com/items/lutari_bead_12.gif',
            'tongi': 'https://images.neopets.com/items/lutari_bead_11.gif',
            'urapa': 'https://images.neopets.com/items/lutari_bead_13.gif'
        },
        'red': {
            'matu': 'https://images.neopets.com/items/lutari_bead_5.gif',
            'oranu': 'https://images.neopets.com/items/lutari_bead_4.gif',
            'ranaka': 'https://images.neopets.com/items/lutari_bead_2.gif',
            'tongi': 'https://images.neopets.com/items/lutari_bead_1.gif',
            'urapa': 'https://images.neopets.com/items/lutari_bead_3.gif'
        },
        'yellow': {
            'matu': 'https://images.neopets.com/items/lutari_bead_10.gif',
            'oranu': 'https://images.neopets.com/items/lutari_bead_9.gif',
            'ranaka': 'https://images.neopets.com/items/lutari_bead_7.gif',
            'tongi': 'https://images.neopets.com/items/lutari_bead_6.gif',
            'urapa': 'https://images.neopets.com/items/lutari_bead_8.gif'
        }
    };

    // Function to decode HTML entities
    function decodeHtmlEntities(str) {
        const txt = document.createElement('textarea');
        txt.innerHTML = str;
        return txt.value;
    }

    // Extract XML string from URL parameters
    function extractXMLFromURL(url) {
        const xmlParam = url.match(/XML_str=([^&]*)/);
        if (!xmlParam || !xmlParam[1]) return null;
        const uriDecoded = decodeURIComponent(xmlParam[1]);
        const htmlDecoded = decodeHtmlEntities(uriDecoded);
        return htmlDecoded;
    }

    // Count non-zero beads in a set
    function countNonZeroBeads(beadSet) {
        return beadSet.filter(bead => bead !== 0).length;
    }

    // Add tooltip stylesheet to the document
    function addTooltipStyle() {
        const style = document.createElement('style');
        style.textContent = `
            .tooltip {
                position: relative;
                display: inline-block;
                border-bottom: 1px dashed #fff;
                cursor: help;
            }

            .tooltip .tooltiptext {
                visibility: hidden;
                width: 250px;
                background-color: #333;
                color: #fff;
                text-align: center;
                border-radius: 6px;
                padding: 5px;
                position: absolute;
                z-index: 1;
                bottom: 125%;
                left: 50%;
                transform: translateX(-50%);
                opacity: 0;
                transition: opacity 0.3s;
                font-size: 12px;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
                border: 1px solid #fff;
            }

            .tooltip .tooltiptext::after {
                content: "";
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: #333 transparent transparent transparent;
            }

            .tooltip:hover .tooltiptext {
                visibility: visible;
                opacity: 1;
            }

            .tooltip-table {
                width: 100%;
                border-collapse: collapse;
                color: white;
                margin-top: 0px;
            }

            .tooltip-table th, .tooltip-table td {
                padding: 3px;
                text-align: center;
                border: 1px solid #555;
            }

            .tooltip-table th {
                background-color: #444;
            }

            .tooltip-table tr:nth-child(even) {
                background-color: #3a3a3a;
            }
        `;
        document.head.appendChild(style);
    }

    // Create tooltip for benefit percentages
    function createTooltip(type, content) {
        let tooltipContent = '';

        if (type === 'red') {
            tooltipContent = `
                <table class="tooltip-table">
                    <tr>
                        <th>Beads</th>
                        <th>Discount</th>
                    </tr>
                    <tr>
                        <td>1/5</td>
                        <td>2%</td>
                    </tr>
                    <tr>
                        <td>2/5</td>
                        <td>4%</td>
                    </tr>
                    <tr>
                        <td>3/5</td>
                        <td>6%</td>
                    </tr>
                    <tr>
                        <td>4/5</td>
                        <td>8%</td>
                    </tr>
                    <tr>
                        <td>5/5</td>
                        <td>10%</td>
                    </tr>
                </table>
            `;
        } else if (type === 'green') {
            tooltipContent = `
                <table class="tooltip-table">
                    <tr>
                        <th>Beads</th>
                        <th>Bonus</th>
                    </tr>
                    <tr>
                        <td>1/5</td>
                        <td>10%</td>
                    </tr>
                    <tr>
                        <td>2/5</td>
                        <td>25%</td>
                    </tr>
                    <tr>
                        <td>3/5</td>
                        <td>50%</td>
                    </tr>
                    <tr>
                        <td>4/5</td>
                        <td>75%</td>
                    </tr>
                    <tr>
                        <td>5/5</td>
                        <td>100%</td>
                    </tr>
                </table>
            `;
        }

        return `
            <span class="tooltip">${content}
                <span class="tooltiptext">
                    ${tooltipContent}
                </span>
            </span>
        `;
    }

    // Open Super Shop Wizard with item search
    function openSSW(itemName) {
        const sswDropdown = document.querySelector('.sswdrop');

        if (sswDropdown) {
            // Display SSW dropdown
            sswDropdown.className = sswDropdown.className.replace('panel_hidden', 'panel_shown');
            sswDropdown.style.display = '';

            // Switch to search tab
            const searchTab = document.querySelector('#tabs-header li:first-child');
            const resultsTab = document.querySelector('#tabs-header li:nth-child(2)');

            if (searchTab && resultsTab) {
                resultsTab.classList.remove('ui-tabs-selected', 'ui-state-active');
                searchTab.classList.add('ui-tabs-selected', 'ui-state-active');

                const searchPanel = document.querySelector('#ssw-tabs-1');
                const resultsPanel = document.querySelector('#ssw-tabs-2');

                if (searchPanel && resultsPanel) {
                    searchPanel.classList.remove('ui-tabs-hide');
                    resultsPanel.classList.add('ui-tabs-hide');
                }
            }

            // Set item name in search input
            const searchInput = document.querySelector('input[name="searchstr"]');
            if (searchInput) {
                searchInput.value = itemName;
                searchInput.focus();
            }
        }
    }

    // Find the script or URL containing talisman data
    function findTargetScriptOrURL() {
        const allText = document.documentElement.innerHTML;
        const match = allText.match(/talisman_shell_v2\.swf\?[^"'<>]+/);
        if (!match || !match[0]) {
            console.warn("SWF URL with talisman_shell_v2 not found.");
            return;
        }

        const decodedHTML = decodeHtmlEntities(match[0]);

        const xmlStr = extractXMLFromURL(decodedHTML);
        if (xmlStr) {
            parseBeadSets(xmlStr);
        } else {
            console.warn("XML_str was present but empty after decoding.");
        }
    }

    // Parse XML data to extract bead sets
    function parseBeadSets(xmlStr) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlStr, "application/xml");

        const beadSetVars = {};
        const beadSetNodes = xmlDoc.querySelectorAll("member > name");

        // Extract bead sets from XML
        beadSetNodes.forEach((nameNode) => {
            const name = nameNode.textContent.trim();
            if (name.startsWith("beadSet")) {
                const values = [];
                const dataNodes = nameNode.parentElement.querySelectorAll("array > data > value > int");
                dataNodes.forEach(intNode => {
                    values.push(parseInt(intNode.textContent));
                });
                beadSetVars[name.replace(" ", "")] = values;
            }
        });

        const { beadSet1, beadSet2, beadSet3, beadSet4 } = beadSetVars;

        // Render the talisman with the parsed bead sets
        renderTalisman(beadSet1, beadSet2, beadSet3, beadSet4);

        // Count beads of each color
        const yellowBeadsCount = countNonZeroBeads(beadSet1);
        const redBeadsCount = countNonZeroBeads(beadSet2);
        const greenBeadsCount = countNonZeroBeads(beadSet3);
        const blueBeadsCount = countNonZeroBeads(beadSet4);

        // Create info box with bead counts
        createInfoBox(yellowBeadsCount, redBeadsCount, greenBeadsCount, blueBeadsCount);

        // Add tooltip stylesheet
        addTooltipStyle();
    }

    // Render the talisman with beads
    function renderTalisman(beadSet1, beadSet2, beadSet3, beadSet4) {
        // Create container for talisman
        const container = document.createElement("div");
        container.style.position = "relative";
        container.style.width = "610px";
        container.style.height = "613px";
        container.style.backgroundImage = "url('https://i.imgur.com/kr5kJMt.png')";
        container.style.backgroundSize = "cover";
        container.style.margin = "20px auto";

        // Check if user has premium access
        const isPremium = document.querySelector('.sswdrop') !== null;

        // Define positions and data for bead sets
        const sets = [
           { name: 'yellow', beads: beadSet1, color: 'yellow', positions: [[367,93],[299,161],[333,127],[299,93],[367,161]] },
{ name: 'red', beads: beadSet2, color: 'red', positions: [[251,208],[183,276],[217,242],[183,208],[251,276]] },
{ name: 'green', beads: beadSet3, color: 'green', positions: [[367,208],[299,276],[333,242],[299,208],[367,276]] },
{ name: 'blue', beads: beadSet4, color: 'blue', positions: [[251,93],[183,161],[217,127],[183,93],[251,161]] }

        ];

        // Names of the different bead types
        const beadNames = ['tongi', 'oranu', 'ranaka', 'matu', 'urapa'];

        // Image URLs for each bead by color and type
        const imageMap = {
            yellow: {
                tongi: "https://i.imgur.com/lCOJlv1.png",
                oranu: "https://i.imgur.com/l7fHzRw.png",
                ranaka: "https://i.imgur.com/5n1YlGj.png",
                matu: "https://i.imgur.com/i6j9vc4.png",
                urapa: "https://i.imgur.com/55LptCI.png",
            },
            red: {
                tongi: "https://i.imgur.com/uS847kq.png",
                oranu: "https://i.imgur.com/vuYhl3T.png",
                ranaka: "https://i.imgur.com/PE5oPRd.png",
                matu: "https://i.imgur.com/lVuo84Q.png",
                urapa: "https://i.imgur.com/OB8L2PG.png",
            },
            green: {
                tongi: "https://i.imgur.com/YjTrSzC.png",
                oranu: "https://i.imgur.com/g7pnerW.png",
                ranaka: "https://i.imgur.com/W1cHxi4.png",
                matu: "https://i.imgur.com/jmDo6n0.png",
                urapa: "https://i.imgur.com/aGV8MeX.png",
            },
            blue: {
                tongi: "https://i.imgur.com/Xq2tXCG.png",
                oranu: "https://i.imgur.com/Mb5srUG.png",
                ranaka: "https://i.imgur.com/RwzbxnU.png",
                matu: "https://i.imgur.com/F08pSxk.png",
                urapa: "https://i.imgur.com/S417vAX.png",
            },
        };

        // Create and position all beads
        sets.forEach(set => {
            set.positions.forEach((pos, i) => {
                // Determine if bead is present in the set
                let value = set.beads.find(v => {
                    if (set.name === 'red') {
                        if (i === 0) return v === 4;
                        if (i === 3) return v === 1;
                    }
                    return v === i + 1;
                }) || 0;

                const beadType = beadNames[i];

                // Create bead image
                const beadImg = document.createElement("img");
                beadImg.src = imageMap[set.color][beadType];
                beadImg.alt = `${set.color.charAt(0).toUpperCase() + set.color.slice(1)} ${beadType.charAt(0).toUpperCase() + beadType.slice(1)} Bead`;
                beadImg.title = `${set.color.charAt(0).toUpperCase() + set.color.slice(1)} ${beadType.charAt(0).toUpperCase() + beadType.slice(1)} Bead`;
                beadImg.style.position = "absolute";
                beadImg.style.width = "27px";
                beadImg.style.height = "28px";
                beadImg.style.left = `${pos[0] - 13.5}px`;
                beadImg.style.top = `${pos[1] - 14}px`;
                beadImg.style.cursor = "pointer";

                // Grey out beads that are not present
                if (!value) {
                    beadImg.style.filter = "grayscale(100%)";
                }

                // Add click event to show bead info
                beadImg.addEventListener('click', function() {
                    showBeadInfo(beadImg.alt, beadType, set.color, beadImg.style.filter);
                });

                // Add double-click event for premium users to open SSW
                if (isPremium) {
                    beadImg.addEventListener('dblclick', function(e) {
                        e.preventDefault();
                        const beadFullName = `${set.color.charAt(0).toUpperCase() + set.color.slice(1)} ${beadType.charAt(0).toUpperCase() + beadType.slice(1)} Bead`;
                        openSSW(beadFullName);
                    });
                }

                container.appendChild(beadImg);
            });
        });

        // Insert talisman into the page
        const target = document.querySelector('.flashRIP__2020');
        if (target) {
            document.querySelector('ruffle-embed')?.remove();
            target.innerHTML = '';
            target.style.backgroundColor = "transparent";
            target.appendChild(container);
            target.classList.replace("flashRIP__2020", "HTML_Talisman");
            target.style.display = "block";
        } else {
            console.warn(".flashRIP__2020 element not found.");
        }
    }

    // Create info box with bead benefits
    function createInfoBox(yellowCount, redCount, greenCount, blueCount) {
        // Calculate benefits based on bead counts
        let redBenefit = 0;
        if (redCount === 1) redBenefit = 2;
        if (redCount === 2) redBenefit = 4;
        if (redCount === 3) redBenefit = 6;
        if (redCount === 4) redBenefit = 8;
        if (redCount === 5) redBenefit = 10;

        let greenBenefit = 0;
        if (greenCount === 1) greenBenefit = 10;
        if (greenCount === 2) greenBenefit = 25;
        if (greenCount === 3) greenBenefit = 50;
        if (greenCount === 4) greenBenefit = 75;
        if (greenCount === 5) greenBenefit = 100;

        // Create messages for each bead type with tooltips
        const yellowMessage = yellowCount === 0 ? "You have none, but the effects are unknown anyway!" : `It is unknown if Yellow beads have an effect.`;

        const redMessage = redCount === 0
            ? `Occasional ${createTooltip('red', '0%')} discount in Neopian Shops (not user shops).`
            : `Occasional ${createTooltip('red', redBenefit + '%')} discount in Neopian Shops (not user shops).`;

        const greenMessage = greenCount === 0
            ? `Occasional ${createTooltip('green', '0%')} bonus to NP earned from flash games.`
            : `Occasional ${createTooltip('green', greenBenefit + '%')} bonus to NP earned from flash games.`;

        const blueMessage = blueCount === 0 ? "You have none, but the effects are unknown anyway!" : `It is unknown if Blue beads have an effect.`;

        // HTML content for benefits display
        const beadInfoContent = `
            <h3 style="margin-top: 5px; margin-bottom: 5px;">Current Benefits</h3>
            <div style="display: grid; grid-template-columns: max-content 1fr; row-gap: 8px; column-gap: 10px; align-items: center; padding: 10px;">
                <span style="background: #3a2fcc91; padding: 3px; border-radius: 5px;">Blue:</span>
                <span style="text-align: left;">${blueMessage}</span>

                <span style="background: #ffcc0091; padding: 3px; border-radius: 5px;">Yellow:</span>
                <span style="text-align: left;">${yellowMessage}</span>

                <span style="background: #99000091; padding: 3px; border-radius: 5px;">Red:</span>
                <span style="text-align: left;">${redMessage}</span>

                <span style="background: #33990091; padding: 3px; border-radius: 5px;">Green:</span>
                <span style="text-align: left;">${greenMessage}</span>
            </div>
        `;

        // Full info box HTML
        const beadInfo = `
            <div id="infoBox" style="width:660px; height: 180px; border: 2px solid black; border-radius: 8px; position: relative; background: url('https://i.imgur.com/6Rk2Ip1.png'), no-repeat; background-size: cover; background-position: top;">
                <img id="infoLutari" src="https://images.neopets.com/randomevents/images/lutari_headdress.png" style="position: absolute; left: -11px; top: 40px;">
                <div id="beadInfo" style="width: 500px; height: 160px; border-radius: 8px; position: absolute;left: 150px; top: 10px; background: rgba(0, 0, 0, 0.8); color: white; font-weight: 600;">
                    ${beadInfoContent}
                </div>
            </div>
        `;

        // Insert the info box into the page
        const target = document.querySelector('.HTML_Talisman');
        if (target) {
            target.insertAdjacentHTML('beforebegin', beadInfo);

            originalBenefitsHTML = beadInfoContent;

            // Add click event to toggle between bead info and benefits
            document.getElementById('infoLutari').addEventListener('click', function() {
                document.getElementById('beadInfo').innerHTML = originalBenefitsHTML;
                this.style.filter = '';
                this.style.cursor = '';
            });
        } else {
            console.warn(".flashRIP__2020 element not found.");
        }
    }

    // Show detailed information for a specific bead
    function showBeadInfo(beadName, beadType, color, status) {
        const beadFullName = `${color.charAt(0).toUpperCase() + color.slice(1)} ${beadType.charAt(0).toUpperCase() + beadType.slice(1)} Bead`;
        const description = beadDescriptions[color.toLowerCase()];
        const imageUrl = beadImageURLs[color.toLowerCase()][beadType.toLowerCase()];
        const collected = status === 'grayscale(100%)' ? '30px' : '0px';
        const collectedAlt = collected === '30px' ? 'Not Collected' : 'Collected';

        // Check if user has premium access
        const isPremium = document.querySelector('.sswdrop') !== null;

        // Create SSW button if premium user
        const sswButtonHTML = isPremium ?
            `<img id="sswIcon" width="35px" src="http://images.neopets.com/premium/shopwizard/ssw-icon.svg" style="cursor: pointer;" data-itemname="${beadFullName}">` :
            '';

        // Create detailed bead info HTML
        const beadInfoHTML = `
            <img src="${imageUrl}" style="position: absolute; left: 20px; top: 40px; border-radius: 8px; border: 2px solid black;">
            <div alt="${collectedAlt}" title="${collectedAlt}" style="background: url('https://images.neopets.com/charity/toydrive/item_states.png') white;position: absolute;left: 45px;top: 105px;width: 30px;height: 30px;background-position-x: ${collected};border-radius: 8px;border: 2px solid black;"></div>
            <div style="width: 360px; position: absolute;left: 120px; top: 6px;">
                <h3>${beadFullName}</h3>
                ${description}
                <div id="beadDetails" style="margin-top: 10px;">
                    ${sswButtonHTML}
                    <a target="_blank" href="http://www.neopets.com/shops/wizard.phtml?string=${encodeURIComponent(beadFullName)}">
                        <img src="http://images.neopets.com/themes/h5/basic/images/shopwizard-icon.png" width="35px">
                    </a>
                    <a target="_blank" href="http://www.neopets.com/island/tradingpost.phtml?type=browse&criteria=item_exact&search_string=${encodeURIComponent(beadFullName)}">
                        <img src="http://images.neopets.com/themes/h5/basic/images/tradingpost-icon.png" width="35px">
                    </a>
                    <a target="_blank" href="http://www.neopets.com/genie.phtml?type=process_genie&criteria=exact&auctiongenie=${encodeURIComponent(beadFullName)}">
                        <img src="http://images.neopets.com/themes/h5/basic/images/auction-icon.png" width="35px">
                    </a>
                    <a target="_blank" href="http://www.neopets.com/safetydeposit.phtml?obj_name=${encodeURIComponent(beadFullName)}&category=0">
                        <img src="https://images.neopets.com/themes/h5/basic/images/v3/safetydeposit-icon.svg" width="35px">
                    </a>
                    <a target="_blank" href="https://items.jellyneo.net/search/?name=${encodeURIComponent(beadFullName)}&name_type=3">
                        <img src="https://i.imgur.com/7tdeIYw.png" height="35px">
                    </a>
                </div>
            </div>
        `;

        // Update the info box with bead details
        const beadInfoDiv = document.getElementById('beadInfo');
        if (beadInfoDiv) {
            beadInfoDiv.innerHTML = beadInfoHTML;

            // Add highlight to indicate lutari can be clicked
            const lutariImage = document.getElementById('infoLutari');
            if (lutariImage) {
                lutariImage.style.filter = 'drop-shadow(2px 4px 6px white)';
                lutariImage.style.cursor = 'pointer';
            }

            // Add click event for SSW if premium
            const sswIcon = document.getElementById('sswIcon');
            if (sswIcon) {
                sswIcon.addEventListener('click', function() {
                    const itemName = this.getAttribute('data-itemname');
                    openSSW(itemName);
                });
            }
        }
    }

    window.addEventListener('load', findTargetScriptOrURL);
})();
