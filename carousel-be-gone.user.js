// ==UserScript==
// @name         Neopets: Carousel Be-Gone
// @version      1.0.0
// @description  Converts carousels to grids for supported pages
// @author       rawbeee
// @match        *://www.neopets.com/worlds/roo/merrygoround.phtml
// @match        *://www.neopets.com/island/tikitours.phtml
// @match        *://www.neopets.com/lab2.phtml
// @match        *://www.neopets.com/pound/transfer.phtml
// @match        *://www.neopets.com/pound/transfer_confirm.phtml
// @match        *://www.neopets.com/neopet_desc.phtml?*
// @match        *://www.neopets.com/edithomepage.phtml
// @match        *://www.neopets.com/pool/index.phtml
// @match        *://www.neopets.com/dome/fight.phtml
// @match        *://www.neopets.com/dome/neopets.phtml
// @match        *://www.neopets.com/dome/abilities.phtml
// @match        *://www.neopets.com/dome/compare.phtml
// @match        *://www.neopets.com/pound/abandon.phtml
// @match        *://www.neopets.com/home/*
// @icon         https://images.neopets.com/themes/h5/altadorcup/images/settings-icon.png
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==

/*    =============================================================================================
      Description:
          Displays pets in a grid rather than the carousel. In some cases, updates the visual
          display of pets as well as elements and functionality of somes pages. To stop the script
          from running on a specific page, remove it from the list of matched links above.
      =============================================================================================
      Supported Pages:
          Merry Go Round
          Tiki Tours
          Secret Laboratory
          Pound - Transfer
          Pound - Transfer Confirm
          Pound - Abandon
          Edit Neopets Description
          Edit Petpages Homepage
          Rainbow Pool
          Battledome - Fight
          Battledome - Neopets
          Battledome - Compare
          Battledome - Abilities
          Homepage
      =============================================================================================
      Other scripts:
          https://github.com/rawxbee/neopets-scripts
          https://github.com/rawxbee/neoboard-enhancement-suite
          https://github.com/moonbathr/neopets
      =============================================================================================
      Questions/Issues:
          https://www.neopets.com/neomessages.phtml?type=send&recipient=rawbeee
      =============================================================================================    */

(function() {
    'use strict';

    function modifyLayout() {
        /* ===================================================
           Modify Merry Go Round Page (roo/merrygoround.phtml)
           =================================================== */
        if (window.location.href.includes("roo/merrygoround.phtml")) {
            let bxlist = $('#bxlist');
            if (bxlist) {
                let petGrid = bxlist
                petGrid.attr('id', 'petGrid');
                $('input[value="Go on the Ride!"]').remove();
                $('#petGrid > li.bx-clone, .bx-controls.bx-has-controls-direction').remove();
                $(`<style>
                #petGrid { transform: none !important; max-width: 100% !important; margin: auto !important; overflow: visible !important; margin-top: 5px !important; margin-left: -28px !important; }
                #petGrid li { width: 125px !important; height: 155px !important; border: 2px solid #ccc !important; border-radius: 10px !important; margin: 8px !important; background-size: contain !important;}
                </style>`).appendTo('head');
                petGrid.parent().replaceWith(petGrid.parent().html());
                $('#petGrid li').each(function () {
                    let img = $(this).find('img');
                    let imgSrc = img.attr('src');
                    if (imgSrc) {
                        imgSrc = imgSrc.replace('/2.png', '/6.png');
                        $(this).css({
                            'background': `url('${imgSrc}') no-repeat top center`
                        });
                        img.remove();
                        let petName = $(this).text().trim();
                        let button = `
                    <button type="submit" name="chosenone" value="${petName}"
                        style="height: 100%; width: 100%; border: 0; border-radius: 10px;
                               background: rgba(0, 0, 0, 0.1); padding: 0 0 10px 0; cursor: pointer;"
                        onmouseover="this.parentElement.style.boxShadow='0 0 10px 4px green'; this.parentElement.style.transform = 'scale(1.05)'; this.parentElement.style.zIndex='10'; this.parentElement.style.transition='all 0.3s'"
                        onmouseout="this.parentElement.style.boxShadow='none'; this.parentElement.style.transform = 'scale(1)'; this.parentElement.style.zIndex='1'; this.parentElement.style.transition='all 0.3s'">
                        <div style="position: absolute; top: 133px; height: 30px; width: 100%; overflow: hidden; text-overflow: ellipsis;">
                            <span><b>${petName}</b></span>
                        </div>
                    </button>`;
                        $(this).html(button);
                    }
                });
            }
        }
        /* ===============================================
           Modify Tiki Tours Page (island/tikitours.phtml)
           =============================================== */
        if (window.location.href.includes("island/tikitours.phtml")) {
            let bxlist = $('#bxlist');
            if (bxlist) {
                let petGrid = bxlist
                petGrid.attr('id', 'petGrid');
                $('input[value="Go on the Tour!"]').remove();
                $('#petGrid > li.bx-clone, .bx-controls.bx-has-controls-direction').remove();
                $(`<style>#petGrid { transform: none !important; max-width: 100% !important; margin: auto !important; overflow: visible !important; margin-top: 5px !important; margin-left: -28px !important; }
                #petGrid li { width: 125px !important; height: 155px !important; border: 2px solid #ccc !important; border-radius: 10px !important; margin: 8px !important; background-size: contain !important;}
                </style>`).appendTo('head');
                petGrid.parent().replaceWith(petGrid.parent().html());
                $('#petGrid li').each(function () {
                    let img = $(this).find('img');
                    let imgSrc = img.attr('src');
                    if (imgSrc) {
                        imgSrc = imgSrc.replace('/2.png', '/6.png');
                        $(this).css({
                            'background': `url('${imgSrc}') no-repeat top center`
                        });
                        img.remove();
                        let petName = $(this).text().trim();
                        let button = `
                    <button type="submit" name="chosenone" value="${petName}"
                        style="height: 100%; width: 100%; border: 0; border-radius: 10px;
                               background: rgba(0, 0, 0, 0.1); padding: 0 0 10px 0; cursor: pointer;"
                        onmouseover="this.parentElement.style.boxShadow='0 0 10px 4px green'; this.parentElement.style.transform = 'scale(1.05)'; this.parentElement.style.zIndex='10'; this.parentElement.style.transition='all 0.3s'"
                        onmouseout="this.parentElement.style.boxShadow='none'; this.parentElement.style.transform = 'scale(1)'; this.parentElement.style.zIndex='1'; this.parentElement.style.transition='all 0.3s'">
                        <div style="position: absolute; top: 133px; height: 30px; width: 100%; overflow: hidden; text-overflow: ellipsis;">
                            <span><b>${petName}</b></span>
                        </div>
                    </button>`;
                        $(this).html(button);
                    }
                });
            }
        }



        /* ==========================================
           Modify Secret Laboratory Page (lab2.phtml)
           ========================================== */
        if (window.location.href.indexOf("lab2.phtml") != -1){
            let bxlist = $('#bxlist');
            if (bxlist) {
                let petGrid = bxlist
                petGrid.attr('id', 'petGrid');
                $('input[value="Carry on with the Experiment!"]').remove();
                $('#petGrid > li.bx-clone, .bx-controls.bx-has-controls-direction').remove();
                $(`<style>
                #petGrid { transform: none !important; max-width: 100% !important; margin: auto auto !important; overflow: visible !important; margin-top: 5px !important; margin-left: 5px !important; }
                #petGrid li { width: 150px !important; height: 220px !important; border: 2px solid #ccc !important; border-radius: 10px !important; margin: 8px !important; background-size: contain !important;}
                </style>`).appendTo('head');
                let form = $('form[action="process_lab2.phtml"]')[0];
                let container = form.children[0];
                let zaps = form.children[1];
                if (form && container && zaps) {
                    form.insertBefore(zaps, container);
                }
                petGrid.parent().replaceWith(petGrid.parent().html());
                $('#petGrid li').each(function () {
                    let img = $(this).find('img');
                    let imgSrc = img.attr('src');
                    if (imgSrc) {
                        imgSrc = imgSrc.replace('/2.png', '/5.png');
                        $(this).css({
                            'background': `url('${imgSrc}') no-repeat top center`
                        });
                        img.remove();
                        let petName = $(this).find('input[name="chosen"]').val();
                        let scared = $(this)[0].children[0].children[3];
                        let scaredText = $(scared).text();
                        let button = `
                    <button type="submit" name="chosen" value="${petName}"
                        style="height: 100%; width: 100%; border: 0; border-radius: 10px;
                               background: rgba(0, 0, 0, 0.1); padding: 0 0 10px 0; cursor: pointer;"
                        onmouseover="this.parentElement.style.boxShadow='0 0 10px 4px green'; this.parentElement.style.transform = 'scale(1.05)'; this.parentElement.style.zIndex='10'; this.parentElement.style.transition='all 0.3s'"
                        onmouseout="this.parentElement.style.boxShadow='none'; this.parentElement.style.transform = 'scale(1)'; this.parentElement.style.zIndex='1'; this.parentElement.style.transition='all 0.3s'"
                        onclick="return confirm('Are you sure that you want to zap ${petName}?');">
                        <div style="position: absolute; top: 165px; height: 55px; width: 100%; overflow: hidden; text-overflow: ellipsis;">
                            <span><b>${petName}:</b><br><i>${scaredText}</i></span>
                        </div>
                    </button>`;
                        $(this).html(button);
                    }
                });
            }
        }

        /* =================================================
           Modify Pound Transfer Page (pound/transfer.phtml)
           ================================================= */
        if (window.location.href.indexOf("pound/transfer.phtml") != -1) {
            let bxlist = $('#bxlist');
            if (bxlist) {
                let petGrid = bxlist
                petGrid.attr('id', 'petGrid');
                $('#petGrid > li.bx-clone, .bx-controls.bx-has-controls-direction').remove();
                $(`<style>
                #petGrid { transform: none !important; max-width: 100% !important; margin: auto auto !important; overflow: visible !important; margin-top: 10px !important; margin-left: 10px !important; }
                #petGrid li { width: 125px !important; height: 155px !important; border: 2px solid #ccc !important; border-radius: 10px !important; margin: 8px !important; background-size: contain !important;}
                .bx-wrapper { border: none !important; }
                </style>`).appendTo('head');
                petGrid.parent().replaceWith(petGrid.parent().html());
                $('#petGrid li').each(function () {
                    let img = $(this).find('img');
                    let imgSrc = img.attr('src');
                    if (imgSrc) {
                        imgSrc = imgSrc.replace('/2.png', '/6.png');
                        $(this).css({
                            'background': `url('${imgSrc}') no-repeat top center`
                        });
                        img.remove();
                        let petName = $(this).text().trim();
                        let petID = petName + '_button';
                        let pet = document.getElementById(petID);
                        let js = pet.getAttribute("onclick").replaceAll("\"","'");
                        let button = `
    <button type="button" value="Transfer"
        style="height: 155px; width: 125px; border: 0; border-radius: 10px;
               background: rgba(0, 0, 0, 0.1); padding: 0 0 10px 0; cursor: pointer;"
        onmouseover="this.parentElement.style.boxShadow='0 0 10px 4px green'; this.parentElement.parentElement.style.transform = 'scale(1.05)'; this.parentElement.parentElement.style.zIndex='10'; this.parentElement.parentElement.style.transition='all 0.3s'"
        onmouseout="this.parentElement.style.boxShadow='none'; this.parentElement.parentElement.style.transform = 'scale(1)'; this.parentElement.parentElement.style.zIndex='1'; this.parentElement.parentElement.style.transition='all 0.3s'"
        onclick="${js}">
        <div style="position: absolute; top: 133px; height: 30px;  width: 100%; overflow: hidden; text-overflow: ellipsis;">
        <span>
            <b>${petName}</b>
        </span>
        </div>
    </button>`;
                        pet.parentElement.style.borderRadius = "10px";
                        pet.previousElementSibling.remove();
                        pet.previousElementSibling.remove();
                        pet.previousElementSibling.remove();
                        $(pet).replaceWith(button);
                    }
                });
            }
        }
        /* =================================================================
           Modify Pound Transfer Confirm Page (pound/transfer_confirm.phtml)
           ================================================================= */
        if (window.location.href.includes("pound/transfer_confirm.phtml")) {
            let bxlist = $('#bxlist');
            if (bxlist) {
                let petGrid = bxlist
                petGrid.attr('id', 'petGrid');
                $('#petGrid > li.bx-clone, .bx-controls.bx-has-controls-direction').remove();
                $('#exchange_confirm').remove();
                let petContainer = $('#bdStatusPetThumbs');
                let exbutton = $('input[value="Exchange Neopets"]');
                let buttonContainer = exbutton.parent();
                let pin = $('#pin_field');

                if (petContainer && pin) {
                    petContainer.prepend(buttonContainer);
                }

                if (exbutton) {
                    exbutton.replaceWith('<br>');
                }
                $(`<style>
                #petGrid { transform: none !important; max-width: 100% !important; margin: auto !important; overflow: visible !important; margin-top: 0px !important; margin-left: -20px !important; }
                #petGrid li { width: 125px !important; height: 185px !important; border: 2px solid #ccc !important; border-radius: 10px !important; margin: 8px !important; background-size: contain !important;}
                </style>`).appendTo('head');
                petGrid.parent().replaceWith(petGrid.parent().html());
                $('#petGrid li').each(function () {
                    let img = $(this).find('img');
                    let imgSrc = img.attr('src');
                    if (imgSrc) {
                        imgSrc = imgSrc.replace('/2.png', '/6.png');
                        $(this).css({
                            'background': `url('${imgSrc}') no-repeat top center`
                        });
                        img.remove();
                        let petName = $(this)[0].children[3].textContent;
                        let petFee = $(this)[0].children[5].textContent;
                        let button = `
                    <button type="submit" name="exchange" value="${petName}"
                        style="height: 100%; width: 100%; border: 0; border-radius: 10px;
                               background: rgba(0, 0, 0, 0.1); padding: 0 0 10px 0; cursor: pointer;"
                        onmouseover="this.parentElement.style.boxShadow='0 0 10px 4px green'; this.parentElement.style.transform = 'scale(1.05)'; this.parentElement.style.zIndex='10'; this.parentElement.style.transition='all 0.3s';"
                        onmouseout="this.parentElement.style.boxShadow='none'; this.parentElement.style.transform = 'scale(1)'; this.parentElement.style.zIndex='1'; this.parentElement.style.transition='all 0.3s'"
                        onclick="return confirm('Are you sure that you want to trade for ${petName}?');">
                        <div style="position: absolute; top: 133px; height: 60px; width: 100%; overflow: hidden; text-overflow: ellipsis;">
                            <span><b>${petName}</b><br>Adoption Fee:<br>${petFee}</span>
                        </div>
                    </button>`;
                        $(this).html(button);
                    }
                });
            }
        }
        /* =================================================================
           Modify Edit Pet Description Page (neopet_desc.phtml?edit_petname)
           ================================================================= */
        if (window.location.href.includes("neopet_desc.phtml?edit_petname")) {
            let bxlist = $('#bxlist');
            if (bxlist) {
                let petGrid = bxlist
                petGrid.attr('id', 'petGrid');
                $('#petGrid > li.bx-clone, .bx-controls.bx-has-controls-direction').remove();
                petGrid.parent().replaceWith(petGrid.parent().html());
                let i = 0
                $('#petGrid li').each(function () {
                    let img = $(this).find('img');
                    let imgSrc = img.attr('src');
                    if (imgSrc) {
                        imgSrc = imgSrc.replace('/2.png', '/6.png');

                        $(this).css({
                            'background': `url('${imgSrc}') no-repeat top center`
                        });
                        img.remove();
                        let petName = $(this).text().trim();
                        let link = `https://www.neopets.com/neopet_desc.phtml?edit_petname=${petName}`;
                        let button = `
                    <button type="submit" onclick="location.href='${link}'"
                        style="height: 155px; width: 125px; border: 0; border-radius: 10px;
                               background: rgba(0, 0, 0, 0.1); padding: 0 0 10px 0; cursor: pointer;"
                        onmouseover="this.parentElement.style.boxShadow='0 0 10px 4px green'; this.parentElement.style.transform = 'scale(1.05)'; this.parentElement.style.zIndex='10'; this.parentElement.style.transition='all 0.3s';"
                        onmouseout="this.parentElement.style.boxShadow='none'; this.parentElement.style.transform = 'scale(1)'; this.parentElement.style.zIndex='1'; this.parentElement.style.transition='all 0.3s'">
                        <div style="position: absolute; top: 133px; height: 30px; width: 100%; overflow: hidden; text-overflow: ellipsis;">
                            <span><b>${petName}</b></span>
                        </div>
                    </button>`;
                        $(this).html(button);
                    }
                    i += 1
                });
                let height_multiplier = Math.ceil(i / 5);
                let height = height_multiplier * 175
                $(`<style>
                #petGrid { transform: none !important; max-width: 100% !important; min-height: ${height}px !important; margin: auto !important; overflow: visible !important; margin-top: -30px !important; margin-left: 0px !important; }
                #petGrid li { width: 125px !important; height: 155px !important; border: 2px solid #ccc !important; border-radius: 10px !important; margin: 8px !important; background-size: contain !important;}
                </style>`).appendTo('head');
            }
        }
        /* =================================================
           Modify Edit Petpage Homepage (edithomepage.phtml)
           ================================================= */
        if (window.location.href.includes("edithomepage.phtml")) {
            let bxlist = $('#bxlist');
            if (bxlist) {
                let petGrid = bxlist
                petGrid.attr('id', 'petGrid');
                $('#petGrid > li.bx-clone, .bx-controls.bx-has-controls-direction').remove();
                let container = $('#bxwrap');
                let medtext = container.next();

                if (medtext && container) {
                    medtext.append('<p><a href="https://www.neopets.com/pagestats.phtml">View Petpage Stats</a></p>');
                    container.before(medtext);
                }
                $(`<style>
                #petGrid { transform: none !important; max-width: 100% !important; margin: auto !important; overflow: visible !important; margin-top: -50px !important; margin-left: 0px !important; }
                #petGrid li { width: 125px !important; height: 205px !important; border: 2px solid #ccc !important; border-radius: 10px !important; margin: 8px !important; background-size: contain !important;}
                .bx-wrapper { border: none !important; }
                </style>`).appendTo('head');
                petGrid.parent().replaceWith(petGrid.parent().html());
                $('#petGrid li').each(function () {
                    let img = $(this).find('img');
                    let imgSrc = img.attr('src');
                    if (imgSrc) {
                        imgSrc = imgSrc.replace('/2.png', '/6.png');
                        $(this).css({
                            'background': `url('${imgSrc}') no-repeat top center`
                        });
                        img.remove();
                        let regex = /new_active_pet=([^"&]+)/;
                        let match = $(this)[0].innerHTML.match(regex);
                        if (match) {
                            let petName = match[1]
                            let button = `<div style="height: 205px ; width: 125px; border: 0; border-radius: 10px;
                        background: rgba(0, 0, 0, 0.1); padding: 0 0 0px 0;"
                        onmouseover="this.parentElement.style.boxShadow='0 0 10px 4px green'; this.parentElement.style.transform = 'scale(1.05)'; this.parentElement.style.zIndex='10'; this.parentElement.style.transition='all 0.3s';"
                        onmouseout="this.parentElement.style.boxShadow='none'; this.parentElement.style.transform = 'scale(1)'; this.parentElement.style.zIndex='1'; this.parentElement.style.transition='all 0.3s'">
                        <div style="position: absolute; top: 133px; height: 60px; width: 100%; text-align: center; overflow: hidden; text-overflow: ellipsis;">
			<a href="process_changepet.phtml?new_active_pet=${petName}" border="0"><b>${petName}</b>
						</a><br>
			<br>			<a href="/editpage.phtml?pet_name=${petName}">Edit Petpage
			</a><br>
			<a href="//www.neopets.com/~${petName}" target="newpage">View Petpage
			</a>
            </span>
		</div>`
                            $(this).html(button);
                        }
                    }
                });
            }
        }
        /* ===========================================
           Modify Rainbow Pool Page (pool/index.phtml)
           =========================================== */
        if (window.location.href.includes("pool/index.phtml")) {
            let bxlist = $('#bxlist');
            if (bxlist) {
                let petGrid = bxlist
                petGrid.attr('id', 'petGrid');
                $('#petGrid > li.bx-clone, .bx-controls.bx-has-controls-direction').remove();
                $(`<style>#petGrid { transform: none !important; max-width: 100% !important; margin: auto !important; overflow: visible !important; margin-top: 0px !important; margin-left: 0px !important; }
                #petGrid li { width: 125px !important; height: 245px !important; border: 2px solid #ccc !important; border-radius: 10px !important; margin: 8px !important; background-size: contain !important;}
                .paint_form { height: 100%; width: 100%; border: 0; border-radius: 10px; background: rgba(0, 0, 0, 0.1); padding: 0px; }
                .paint_button { cursor: pointer; }
                @keyframes rainbowShadow {
    0% { box-shadow: 0 0 10px 3px green; }
    14% { box-shadow: 0 0 10px 3px blue; }
    28% { box-shadow: 0 0 10px 3px indigo; }
    42% { box-shadow: 0 0 10px 3px violet; }
    57% { box-shadow: 0 0 10px 3px red; }
    71% { box-shadow: 0 0 10px 3px orange; }
    85% { box-shadow: 0 0 10px 3px yellow; }
    100% { box-shadow: 0 0 10px 3px green; }
    }
</style>`).appendTo('head');
                petGrid.parent().parent().replaceWith(petGrid.parent().html());

                $('#petGrid li').each(function () {
                    let img = $(this).find('img');
                    let imgSrc = img.attr('src');
                    if (imgSrc) {
                        imgSrc = imgSrc.replace('/2.png', '/6.png');
                        img.remove();
                        $(this).css({
                            'background': `url('${imgSrc}') no-repeat top center`,
                        });
                        $(this).children().first().addClass('paint_form');
                        $('.paint_form').attr('onmouseover', 'this.parentElement.style.boxShadow="0 0 10px 4px green"; this.parentElement.style.transform = "scale(1.05)"; this.parentElement.style.zIndex="10"; this.parentElement.style.transition="all 0.3s";');
                        $('.paint_form').attr('onmouseout', 'this.parentElement.style.boxShadow="none"; this.parentElement.style.transform = "scale(1)"; this.parentElement.style.zIndex="1"; this.parentElement.style.transition="all 0.3s";');
                        $('input[value="Submit"]').addClass('paint_button');
                        $('input[value="Submit"]').attr('onmouseover','this.parentElement.parentElement.parentElement.style.animation="rainbowShadow 5s infinite"; this.parentElement.parentElement.parentElement.style.boxShadow="none"; this.parentElement.parentElement.parentElement.style.transition="all 0.3s";');
                        $('input[value="Submit"]').attr('onmouseout','this.parentElement.parentElement.parentElement.style.animation="none"; this.parentElement.parentElement.parentElement.style.boxShadow="0 0 10px 4px green"; this.parentElement.parentElement.parentElement.style.transition="all 0.3s";');
                        $('input[value="Submit"]').val('Paint');
                        let content = $(this).children().first().html();
                        let newContent = `<div style="position: absolute; top: 133px; height: 110px; width: 100%; text-align: center; overflow: hidden; text-overflow: ellipsis;">${content}</div>`
                        $(this).children().first().html(newContent);
                    }
                });
                let height = petGrid.scrollHeight;
                petGrid.style.height = height;
            }
        }

        /* ===============================================
           Modify Battledome Fight Page (dome/fight.phtml)
           =============================================== */
        if (window.location.href.includes("dome/fight.phtml")) {
            let bxlist = $('#bxlist');
            if (bxlist) {
                let petGrid = bxlist
                petGrid.attr('id', 'petGrid');
                $('#petGrid > li.bx-clone, .bx-controls.bx-has-controls-direction').remove();
                $('.petInfoName').css('left', '0px');
                $('#bdFight').css('min-height', '680px');
                $('#bdFightBorderExpansion').css('min-height', '450px');
                $('#bdFightBorderBottom').css('top', '695px');
                $('#bdFightPet').hide();
                $('#bdFightPetThumbs').css('left', '0px');
                $('#bdFightStep1 > div.stepTitle, #bdFightStep1 > div.stepCopy').remove();
                $(`<style>
                #petGrid { transform: none !important; max-width: 50% !important; margin: auto !important; overflow: visible !important; margin-top: 30px !important; margin-left: 0px !important; padding-inline-start: 0px !important; }
                #petGrid li {width: 100px !important;}
                </style>`).appendTo('head');
                petGrid.unwrap().unwrap().unwrap();
                $('#petGrid li').each(function () {
                    let img = $(this).find('img');
                    let imgSrc = img.attr('src');
                    if (imgSrc) {
                        img.attr('src', imgSrc.replace('/2.png', '/6.png'));
                    }
                    let petName = $(this)[0].children[0].getAttribute("data-name");
                    $(this).append(
                        `<span style="left: 0; display: block; width: 105px; overflow: hidden; text-overflow: ellipsis;">${petName}</span>`
                    );
                });
                let stepObserver = new MutationObserver(() => {
                    if ($('#bdFightStep1').is(':visible')) {
                        $('#bdFight').css('min-height', '680px');
                        $('#bdFightBorderExpansion').css('min-height', '450px');
                        $('#bdFightBorderBottom').css('top', '695px');
                    }
                });

                stepObserver.observe(document.body, { childList: true, subtree: true });
            }
        }
        /* ===================================================
           Modify Battledome Neopets Page (dome/neopets.phtml)
           =================================================== */
        if (window.location.href.indexOf("dome/neopets.phtml") != -1) {
            let bxlist = $('#bxlist');
            if (bxlist) {
                let petGrid = bxlist
                petGrid.attr('id', 'petGrid');
                $('#petGrid > li.bx-clone, .bx-controls.bx-has-controls-direction').remove();
                $('#bdStatusPetThumbs').css({
                    'display': 'inline',
                });
                $('.petThumbSmall').css({
                    'left': '17px',
                    'top': '17px'
                });
                $('#bdStatus').css({
                    'margin-top': '-35px',
                    'margin-left': '20px'
                });
                $('#bdStatusComp').css({
                    'top': '50px',
                    'left': '419px'
                });
                let bdNav = $("#bdNav");
                let bdThumbs = $("#bdStatusPetThumbs");
                if (bdNav && bdThumbs) {
                    bdThumbs.insertAfter(bdNav);
                }
                petGrid.unwrap().unwrap().unwrap();
                let i = 0
                $('#petGrid li').each(function () {
                    let img = $(this).find('img');
                    let imgSrc = img.attr('src');
                    if (imgSrc) {
                        let petName = $(this)[0].children[0].getAttribute("data-name");
                        $(this).append('<span style="left: 0; display: block; width: 105px; overflow: hidden; text-overflow: ellipsis;">' + petName + '</span>');
                    }
                    i += 1
                });
                let height_multiplier = Math.ceil(i / 9);
                let height = height_multiplier * 124
                $(`<style>
                    #petGrid { transform: none !important; max-width: 100% !important; min-height: ${height}px !important; margin: auto !important; overflow: visible !important; margin-top: 10px !important; margin-left: 28px !important; padding-inline-start: 0px !important; }
                    #petGrid li {width: 107px !important;}</style>`).appendTo('head');
            }
        }
        /* =======================================================
           Modify Battledome Abilities Page (dome/abilities.phtml)
           ======================================================= */
        if (window.location.href.includes("dome/abilities.phtml")) {
            let bxlist = $('#bxlist');
            if (bxlist) {
                let petGrid = bxlist
                petGrid.attr('id', 'petGrid');
                $('#petGrid > li.bx-clone, .bx-controls.bx-has-controls-direction').remove();
                $('#bdsPetSelection').css({ display: 'inline', width: '100%' });
                $('.petThumbSmall').css({ left: '7px', top: '7px' });
                $('.petThumbLarge').css({ left: '6px', top: '8px' });
                $('#bdStatus').css({ 'margin-top': '-35px' });
                $('#bdsMain').css({ margin: 'auto' });
                let bdNav = document.getElementById("bdNav");
                let petSelection = document.getElementById("bdsPetSelection");
                if (bdNav && petSelection) {
                    $(petSelection).insertAfter($(bdNav));
                    petSelection.children[1].remove();
                }
                petGrid.unwrap();
                let i = 0
                $('#petGrid li').each(function () {
                    let img = $(this).find('img');
                    if (img.attr('src')) {
                        let petName = $(this)[0].children[0].getAttribute("data-name");
                        $(this).append(`<span style="left: 0; display: block; width: 105px; overflow: hidden; text-overflow: ellipsis;">${petName}</span>`);
                    }
                    i += 1
                });
                let height_multiplier = Math.ceil(i / 9);
                let height = height_multiplier * 124
                $(`<style>
                #petGrid { transform: none !important; max-width: 100% !important; min-height: ${height}px !important; margin: auto !important; overflow: visible !important; margin-top: 10px !important; margin-left: 28px !important; padding-inline-start: 0 !important; }
                #petGrid li {width: 107px !important;}
                .bx-wrapper { max-width: 100% !important; }
                </style>`).appendTo('head');
            }
        }
        /* ===================================================
           Modify Battledome Compare Page (dome/compare.phtml)
           =================================================== */
        if (window.location.href.includes("dome/compare.phtml")) {
            let bxlist = $('#bxlist');
            if (bxlist) {
                let petGrid = bxlist
                petGrid.attr('id', 'petGrid');
                $('#bdCompPets').css({ top: '80px', left: '25px' });
                $('#bdCompIndiv').css({ top: '25px', left: '419px', 'z-index': '2' });
                let bdNav = $("bdNav");
                let bdThumbs = $("bdStatusPetThumbs");
                if (bdNav && bdThumbs) {
                    $(bdThumbs).insertAfter($(bdNav));
                }
                $('#petGrid > li.bx-clone, .bx-controls.bx-has-controls-direction').remove();
                petGrid.parent().parent().replaceWith(petGrid.parent().html());
                $(`<style>
                #petGrid { transform: none !important; max-width: 100% !important; margin: auto !important; overflow: visible !important; margin-top: 0 !important; margin-left: -5px !important; padding-inline-start: 0 !important; }
                .bx-wrapper {max-width: 100%; }
                </style>`).appendTo('head');


                $('#petGrid li').each(function () {
                    let img = $(this).find('img');
                    if (img.attr('src')) {
                        $(this).css('margin', '4.5px');
                    }
                });
            }

            let heightPetGrid = $('#bdCompPets')[0].scrollHeight;
            let heightbdCompBorderExpansion = heightPetGrid - 145;
            let heightbdCompAndBottom = heightPetGrid + 100;

            $('#bdCompBorderExpansion').height(heightbdCompBorderExpansion);
            $('#bdCompBorderBottom').css('top', heightbdCompAndBottom);
            $('#bdComp').height(heightbdCompAndBottom);
        }
        /* ===============================================
           Modify Pound Abandon Page (pound/abandon.phtml)
           =============================================== */
        if (window.location.href.includes("pound/abandon.phtml")) {
            let track = document.getElementsByClassName('slick-track')[0];
            if (track) {
                $('.slick-track > div.ab_pet_container.slick-slide.slick-cloned, .slick-prev, .slick-next').remove();
                let i = 0
                $('.slick-track div').each(function () {
                    let img = $(this).find('img');
                    let imgSrc = img.attr('src');
                    if (imgSrc) {
                        imgSrc = imgSrc.replace('/2.png', '/6.png');
                        $(this).css({
                            'width': '125px',
                            'height': '175px',
                            'margin': '8px',
                            'border': '2px solid #ccc',
                            'border-radius': '10px',
                            'background': `url('${imgSrc}') no-repeat top center`,
                            'background-size': 'contain',
                            'padding': '0px',
                            'float': 'left',
                            'position': 'relative'
                        });
                        $(this).removeClass(["ab_pet_container", "slick-slide", "slick-active"]).addClass('pet-div');
                        img.remove();
                        let namePlate = $(this)[0].children[0];
                        namePlate.remove();
                        let originalButton = $(this)[0].children[0];
                        let buttonId = originalButton.getAttribute("id");
                        let buttonClick = originalButton.getAttribute("onclick");
                        let buttonImg = originalButton.getAttribute("data-petimg");
                        let petName = originalButton.getAttribute("data-petname");
                        let text = originalButton.textContent;
                        let button = `
    <button type="button" id="${buttonId}" onClick="${buttonClick}" data-petimg="${buttonImg}" data-petname="${petName}"
        style="height: 100%; width: 125px; border: 0; border-radius: 10px;
               background: rgba(0, 0, 0, 0.1); padding: 0 0 10px 0; cursor: pointer;"
        onmouseover="this.parentElement.style.boxShadow='0 0 10px 4px red'; this.parentElement.style.transform = 'scale(1.05)'; this.parentElement.style.zIndex='10'; this.parentElement.style.transition='all 0.3s'"
                        onmouseout="this.parentElement.style.boxShadow='none'; this.parentElement.style.transform = 'scale(1)'; this.parentElement.style.zIndex='1'; this.parentElement.style.transition='all 0.3s'">
        <div style="position: absolute; top: 133px; height: 50px;  width: 125px; overflow: hidden; text-overflow: ellipsis;">
        <span>
            <b>${petName}:</b><br><i>${text}</i>
        </span>
        </div>
    </button>`;
                        $(originalButton).replaceWith(button);
                    }
                    i += 1
                });
                $(track).removeClass("slick-track");
                track.id = "petGrid";
                                let height_multiplier = Math.ceil(i / 6);
                let height = (height_multiplier * 110);
                $(`<style>
                #petGrid { transform: none !important; max-width: 100% !important; min-height: ${height}px !important; margin: auto auto !important; overflow: visible !important; margin-top: 10px !important; margin-left: 50px !important; padding: 0px !important;}
                </style>`).appendTo('head');
                track.parentElement.outerHTML = track.parentElement.innerHTML;

                let pinWarning = document.createElement("div");
                pinWarning.id = "pinWarning";
                document.querySelector("#container__2020 > div.abandon-header").appendChild(pinWarning);
                let pin = document.querySelector("#container__2020 > table");
                let medtext = document.querySelector("#container__2020 > div.medText");
                pinWarning.appendChild(pin);
                pinWarning.appendChild(medtext);

                let stepObserver = new MutationObserver(() => {
                    const displayStyle = $('#AbandonPetPopup').css('display');
                    if (displayStyle === 'block') {
                        stepObserver.disconnect();
                        $('#popupAbandonButton').text('Continue');
                        waitForDisplayNone();
                    }
                });
                function waitForDisplayNone() {
                    let displayObserver = new MutationObserver(() => {
                        const displayStyle = $('#AbandonPetPopup').css('display');
                        if (displayStyle === 'none') {
                            displayObserver.disconnect();
                            stepObserver.observe(document.getElementById('AbandonPetPopup'), { attributes: true, attributeFilter: ['style'] });
                        }
                    });
                    displayObserver.observe(document.getElementById('AbandonPetPopup'), { attributes: true, attributeFilter: ['style'] });
                }
                stepObserver.observe(document.getElementById('AbandonPetPopup'), { attributes: true, attributeFilter: ['style'] });
            }
        }
        /* ===============================================
           Modify Home Page (neopets.com/home/)
           =============================================== */
        if (window.location.href.includes("neopets.com/home/")) {
            let track = document.getElementsByClassName('slick-track')[0];
            if (track) {
                $('.slick-track > div.slick-slide.slick-cloned, .slick-prev, .slick-next').remove();
                $('.slick-track div').each(function () {
                    $(this).removeClass(["slick-slide", "slick-active"]).addClass('pet-div');
                });
                $(track).removeClass("slick-track");
                track.id = "petGrid";
                let height = track.scrollHeight;
                let newHeight = height / 3.5;
                let bgHeight = newHeight - (newHeight * 0.22);
                $(`<style>#petGrid { display: grid; grid-template-columns: auto auto auto auto; justify-items: center; transform: none !important; max-width: 100% !important; margin: auto auto !important; overflow: visible !important; margin-top: 80px !important; !important; padding: 0px !important;}
                .hp-bg-bottom__2020 { height: ${bgHeight}; } </style>`).appendTo('head');
                track.style.height = newHeight
                track.parentElement.outerHTML = track.parentElement.innerHTML;
            }
        }
    }
    $('.bx-loading').remove();
    $(document).ready(modifyLayout);
})();
