// ==UserScript==
// @name         Neopets: Better Volunteering UI
// @version      1.0
// @description  Brings the select pet UI to each individual shift on the Neopets Hospital volunteering page.
// @author       rawbeee
// @match        *://*.neopets.com/hospital/volunteer.phtml*
// @match        *://*.neopets.com/quickref.phtml*
// @icon         https://images.neopets.com/themes/h5/altadorcup/images/settings-icon.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let initialized = false;

    function setValue(key, value) {
        if (typeof GM_setValue === "function") {
            GM_setValue(key, JSON.stringify(value));
        } else if (typeof localStorage !== "undefined") {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    function getValue(key, defaultValue) {
        if (typeof GM_getValue === "function") {
            const value = GM_getValue(key);
            if (value === undefined) return defaultValue;
            try {
                return JSON.parse(value);
            } catch {
                return defaultValue;
            }
        } else if (typeof localStorage !== "undefined") {
            const value = localStorage.getItem(key);
            if (value === null) return defaultValue;
            try {
                return JSON.parse(value);
            } catch {
                return defaultValue;
            }
        }
        return defaultValue;
    }

    let petList = getValue("petList", '');

    function getPetList() {
        const qrPetList = Array.from(document.querySelectorAll('.pet_toggler'))
            .map(pet => {
                const name = pet.querySelector('img').alt.trim();
                return name;
            });
        setValue('petList', qrPetList);
    }

    function getVolunteeringPets() {
        return Array.from(document.querySelectorAll('.vc-fight-details'))
            .map(fight => {
                const serviceDiv = fight.querySelector('.vc-fight-service');
                if (!serviceDiv) return null;
                const petNameSpan = serviceDiv.querySelector('.vc-text .vc-pet-name');
                return petNameSpan ? petNameSpan.innerText.trim() : null;
            })
            .filter(Boolean);
    }

    function observeForRejoin(fight) {
        const observer = new MutationObserver((mutations, obs) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (
                        node.nodeType === 1 &&
                        node.tagName === 'BUTTON' &&
                        node.innerText.trim() === 'Join Shift'
                    ) {
                        obs.disconnect();
                        const volunteeringPets = getVolunteeringPets();

                        Array.from(document.querySelectorAll('.volunteer-pets .vc-image img[data-petname]')).forEach(img => {
                            const pet = img.getAttribute('data-petname');
                            if (!volunteeringPets.includes(pet)) {
                                img.removeAttribute('style');
                                img.parentElement.style.pointerEvents = '';
                                img.parentElement.style.opacity = '';
                                img.parentElement.tabIndex = 0;
                                img.parentElement.style.cursor = 'pointer';
                            }
                        });
                        createVolunteerContainer(fight, volunteeringPets);
                        observeForRejoin(fight);
                    }
                });
            });
        });
        observer.observe(fight, { childList: true, subtree: false });
    }

    function createVolunteerContainer(fight, volunteeringPets) {
        const joinButton = fight.querySelector('button');
        if (!joinButton || joinButton.innerText.trim() !== 'Join Shift') return;

        const fightIdMatch = joinButton.id && joinButton.id.match(/\d+$/);
        const fightNumber = fightIdMatch ? fightIdMatch[0] : '';

        const container = document.createElement('div');
        container.className = 'vc-fight-service volunteer-pets';

        const imagesWrapper = document.createElement('div');
        imagesWrapper.style.display = 'grid';
        imagesWrapper.style.gridTemplateColumns = 'repeat(auto-fit, minmax(40px, 1fr))';
        imagesWrapper.style.gap = '4px';
        imagesWrapper.style.marginBottom = '8px';

        const volunteerBtn = document.createElement('button');
        volunteerBtn.tabIndex = 0;
        volunteerBtn.id = 'VolunteerJoinButton' + fightNumber;
        volunteerBtn.className = 'button-default__2020 btn-single__2020 plot-button';
        volunteerBtn.setAttribute('data-fight', fightNumber);
        volunteerBtn.setAttribute('data-pet', '');
        volunteerBtn.setAttribute('onclick', 'startShift(this)');
        volunteerBtn.textContent = 'Volunteer';
        volunteerBtn.style.backgroundColor = '#ccc';
        volunteerBtn.style.color = '#888';
        volunteerBtn.disabled = true;
        volunteerBtn.style.pointerEvents = 'none';

        const imageDivs = [];

        petList.forEach(pet => {
            const imageDiv = document.createElement('div');
            imageDiv.className = 'vc-image';
            imageDiv.tabIndex = 0;
            imageDiv.onkeyup = clickElement;
            imageDiv.style.cursor = 'pointer';

            const img = document.createElement('img');
            img.src = `//pets.neopets.com/cpn/${pet}/1/6.png`;
            img.alt = pet;
            img.title = pet;
            img.setAttribute('data-petname', pet);

            const isGreyed = volunteeringPets.includes(pet);
            if (isGreyed) {
                img.style.filter = 'grayscale(100%) opacity(0.5)';
                imageDiv.style.pointerEvents = 'none';
                imageDiv.style.opacity = '0.6';
                imageDiv.removeAttribute('tabindex');
                imageDiv.style.cursor = '';
            }

            imageDiv.onclick = function() {
                const currentVolunteering = getVolunteeringPets();
                if (currentVolunteering.includes(pet)) return;

                imageDivs.forEach(div => {
                    div.style.border = '';
                    div.style.boxSizing = '';
                });
                imageDiv.style.border = '3px solid yellow';
                imageDiv.style.boxSizing = 'border-box';
                volunteerBtn.setAttribute('data-pet', pet);
                volunteerBtn.style.backgroundColor = '#ffe066';
                volunteerBtn.style.color = '#222';
                volunteerBtn.disabled = false;
                volunteerBtn.style.pointerEvents = '';
                volunteerBtn.style.cursor = 'pointer';
            };

            imageDiv.appendChild(img);
            imagesWrapper.appendChild(imageDiv);
            imageDivs.push(imageDiv);
        });

        container.appendChild(imagesWrapper);
        container.appendChild(volunteerBtn);

        volunteerBtn.addEventListener('click', function() {
            const selectedPet = volunteerBtn.getAttribute('data-pet');
            if (!selectedPet) return;

            const observer = new MutationObserver((mutations, obs) => {
                const fightDiv = document.getElementById('VolunteerFight' + fightNumber);

                if (fightDiv && fightDiv.textContent.includes('is volunteering!')) {
                    if (!volunteeringPets.includes(selectedPet)) {
                        volunteeringPets.push(selectedPet);
                    }
                    document.querySelectorAll('.volunteer-pets .vc-image img[data-petname]').forEach(img => {
                        if (img.getAttribute('data-petname') === selectedPet) {
                            img.style.filter = 'grayscale(100%) opacity(0.5)';
                            img.parentElement.style.pointerEvents = 'none';
                            img.parentElement.style.opacity = '0.6';
                            img.parentElement.removeAttribute('tabindex');
                            img.parentElement.style.cursor = '';
                            img.parentElement.style.border = '';
                            img.parentElement.style.boxSizing = '';
                            const volunteerBtn = img.closest('.volunteer-pets').querySelector('button');
                            if (volunteerBtn && volunteerBtn.getAttribute('data-pet') === selectedPet) {
                                volunteerBtn.setAttribute('data-pet', '');
                                volunteerBtn.style.backgroundColor = '#ccc';
                                volunteerBtn.style.color = '#888';
                                volunteerBtn.disabled = true;
                                volunteerBtn.style.pointerEvents = 'none';
                                volunteerBtn.style.cursor = '';
                            }
                        }
                    });
                    obs.disconnect();
                }

                const errorModal = document.getElementById('VolunteerErrorPopup');
                if (errorModal && (errorModal.style.display !== 'none' && errorModal.style.display !== '')) {
                    const img = fightDiv.querySelector(`img[data-petname="${selectedPet}"]`);
                    if (img) {
                        img.parentElement.style.border = '';
                        img.parentElement.style.boxSizing = '';
                    }
                    volunteerBtn.id = 'VolunteerJoinButton' + fightNumber;
                    volunteerBtn.className = 'button-default__2020 btn-single__2020 plot-button';
                    volunteerBtn.setAttribute('data-pet', '');
                    volunteerBtn.style.backgroundColor = '#ccc';
                    volunteerBtn.style.color = '#888';
                    volunteerBtn.disabled = true;
                    volunteerBtn.style.pointerEvents = 'none';
                    volunteerBtn.style.cursor = '';
                    volunteerBtn.setAttribute('data-fight', fightNumber);
                    volunteerBtn.textContent = 'Volunteer';
                    obs.disconnect();
                    return;
                }

                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (
                            node.nodeType === 1 &&
                            node.classList.contains('vc-fight-service') &&
                            !node.classList.contains('volunteer-pets')
                        ) {
                            if (container.parentNode) {
                                container.parentNode.removeChild(container);
                            }
                        }
                    });
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style']
            });

            volunteerBtn.id = 'VolunteerButton' + fightNumber;
            volunteerBtn.style.backgroundColor = '';
            volunteerBtn.style.color = '';
            volunteerBtn.disabled = false;
            volunteerBtn.className = "button-default__2020 button-yellow__2020 btn-single__2020 plot-button vc-button";
            volunteerBtn.removeAttribute('data-pet');
            volunteerBtn.removeAttribute('data-fight');
            volunteerBtn.removeAttribute('style');
            volunteerBtn.textContent = 'Cancel';
        });

        volunteerBtn.onclick = function() {
            this.id = 'VolunteerJoinButton';
            startShift(this);
        };

        joinButton.parentNode.replaceChild(container, joinButton);
    }

    function enhanceVolunteeringUI() {
        const style = document.createElement('style');
        style.textContent = `
            .vc-fights {
                height: auto !important;
                overflow: auto !important;
            }
            .vc-fight {
                height: auto !important;
            }
            .volunteer-pets {
                display: block !important;
            }
        `;
        document.head.appendChild(style);

        document.querySelectorAll('div.vc-act.minimize').forEach(el => {
            el.classList.remove('minimize');
            el.classList.add('maximize');
        });

        if (petList.length === 0) {
            const volunteering = document.getElementById('VolunteerFightInfo');
            const wrapper = document.createElement('div');
            wrapper.innerHTML = `
                <div class="h5-dialogue dialogue-lg">
                    <div class="h5-speaker"><mark>Better Volunteering UI</mark></div>
                    <p>No pet list was found. Please go to the <a href="https://www.neopets.com/quickref.phtml">Quick Reference</a> page to load your pet list.</p>
                </div>
            `;
            volunteering.parentNode.insertBefore(wrapper, volunteering);
            return;
        }

        const volunteering = document.getElementById('VolunteerFightInfo');
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="h5-dialogue dialogue-lg">
                <div class="h5-speaker"><mark>Better Volunteering UI</mark></div>
                <p><b>Tip:</b> If you aren't seeing some of your pets, make sure to refresh the list by visiting <a href="https://www.neopets.com/quickref.phtml">Quick Reference</a>.</p>
            </div>
        `;
        volunteering.parentNode.insertBefore(wrapper, volunteering);

        const allFights = Array.from(document.querySelectorAll('.vc-fight-details'));
        const volunteeringPets = getVolunteeringPets();

        allFights.forEach(fight => {
            const joinButton = fight.querySelector('button');
            if (joinButton && joinButton.innerText.trim() === 'Join Shift') {
                createVolunteerContainer(fight, volunteeringPets);
            }
            observeForRejoin(fight);
        });
    }

    function init() {
        if (initialized) return;
        initialized = true;

        const url = location.href;

        if (url.includes('/hospital/volunteer.phtml')) {
            enhanceVolunteeringUI();
        } else if (url.includes('/quickref.phtml')) {
            getPetList();
        }
    }

    window.addEventListener('DOMContentLoaded', init);
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        init();
    }
})();
