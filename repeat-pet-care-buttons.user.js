// ==UserScript==
// @name         Neopets: Repeat Pet Care Buttons
// @author       rawbeee
// @version      1.0.1
// @description  Adds a 'Play Again' or 'Groom Again' button that reuses an item when grooming or playing with a pet
// @match        *://*.neopets.com/home/*
// @icon         https://images.neopets.com/themes/h5/altadorcup/images/settings-icon.png
// @grant        none
// ==/UserScript==

// Special thanks to pattvsjustice

(function () {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        .petCareList .button-default__2020,
        .petCareResult .button-default__2020 {
            margin: auto;
        }
    `;
    document.head.appendChild(style);

    function createActionButton(label, type) {
        const button = document.createElement('div');
        button.className = 'petCare-button-action button-default__2020 button-green__2020';
        button.id = 'petCareUseItemAgain';
        button.textContent = label;
        button.style.maxWidth = 'none';

        button.onclick = function () {
            if (typeof trackDetails === 'function') trackDetails();
            if (typeof processItem === 'function') processItem();
        };

        return button;
    }

    function createEmptyDiv() {
        return document.createElement('div');
    }

    function updatePetCareButton() {
        const container = document.getElementById('petCareResult');
        const backButton = document.getElementById('petCareResultBack');
        const existingButton = document.getElementById('petCareUseItemAgain');

        if (!container || !backButton) {
            if (existingButton) existingButton.replaceWith(createEmptyDiv());
            return;
        }

        const containerVisible = window.getComputedStyle(container).display === 'block';
        const targetDiv = backButton.nextElementSibling;

        if (containerVisible) {
            const actionType = backButton.getAttribute('data-back');

            if (!existingButton && targetDiv && targetDiv.innerHTML.trim() === '') {
                let newButton = null;

                if (actionType === 'petCareLinkPlay') newButton = createActionButton('Play Again', 'play');
                else if (actionType === 'petCareLinkGroom') newButton = createActionButton('Groom Again', 'groom');

                if (newButton) targetDiv.replaceWith(newButton);
            }
        } else {
            if (existingButton) existingButton.replaceWith(createEmptyDiv());
        }
    }

    const container = document.getElementById('petCareResult');
    if (container) {
        const observer = new MutationObserver(updatePetCareButton);
        observer.observe(container, { attributes: true, attributeFilter: ['style'] });
    }
})();
