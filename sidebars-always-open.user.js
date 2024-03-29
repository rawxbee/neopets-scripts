// ==UserScript==
// @name         Sidebars Always Open
// @version      1.0.2
// @description  Sidebars can remain always open (or closed) across pages. Click the pet icon or bell icon to toggle the respective sidebar.
// @author       Harvey - edited by rawbeee
// @match        *://www.neopets.com/*
// @match        *://neopets.com/*
// @grant        GM.getValue
// @grant        GM.setValue
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==
var $ = window.jQuery;

GM_addStyle ( `
    .hp-carousel-container {
        margin-left:0px;
    }
` );

function increaseTrack()
{
    var results = document.getElementsByClassName("slick-track");
    for(var i = 0; i < results.length; i++){
        var newhtml = results[i].innerHTML.replace("width: 5100px;","width: 5200px;");
        results[i].innerHTML = newhtml;
    }
}

function EditAttributeValue(elemId, attribute, newvalue)
{
    $("#"+elemId).attr(attribute,newvalue);
}

var isToggledOpen = true;

async function toggleSidebar()
{
    GM.setValue("sidebar_always_open_toggle_value", !isToggledOpen);
    openorcloseonload();

}
var petLarge = false;

async function openorcloseonload()
{
    var toggled = await GM.getValue("sidebar_always_open_toggle_value", -1);

    if (toggled == -1)
    {
        GM.setValue("sidebar_always_open_toggle_value", true);
        toggled = true;
    }

    if (toggled)
    {
        openSidebar();
        petLarge = await GM.getValue("sidebar_pet_large", false);
        if (petLarge)
        {
            var container = document.getElementById('navProfilePetBox__2020');
            var pet = document.getElementById('navProfilePet__2020');
            var icon = document.getElementById('navProfilePetExpandIcon__2020');
            // remove class names
            container.classList.remove('nav-profile-pet-box-sm__2020');
            pet.classList.remove('nav-profile-pet-sm__2020');
            icon.classList.remove('nav-profile-pet-expand__2020');
            // add class names
            container.classList.add('nav-profile-pet-box-lg__2020');
            pet.classList.add('nav-profile-pet-lg__2020');
            icon.classList.add('nav-profile-pet-contract__2020');
        }
        else
        {
            // remove class names
	    container.classList.remove('nav-profile-pet-box-lg__2020');
	    pet.classList.remove('nav-profile-pet-lg__2020');
	    icon.classList.remove('nav-profile-pet-contract__2020');
	    // add class names
	    container.classList.add('nav-profile-pet-box-sm__2020');
	    pet.classList.add('nav-profile-pet-sm__2020');
	    icon.classList.add('nav-profile-pet-expand__2020');
        }
    }
    else
    {
        closeSidebar();
    }
    isToggledOpen = toggled;
}

function closeSidebar()
{
    EditAttributeValue("navprofiledropdown__2020", "style", "display: none!important;");
}

function openSidebar()
{
    var results = document.getElementById("navprofiledropdown__2020");
    EditAttributeValue("navprofiledropdown__2020", "style", "display: block!important;");
    EditAttributeValue("nav-dropdown-shade__2020", "style", "display: none!important;");
}

function toggleNavDropdown__2020(dropdown)
{
	var elements = document.getElementsByClassName('nav-dropdown__2020');
	var shade = document.getElementById('navdropdownshade__2020');
	var menuicon = document.getElementById('navmenu-icon__2020');

	$('.nav-top__2020').removeClass('dropdownshade-below__2020');
	$('.nav-bottom__2020').removeClass('dropdownshade-above__2020');

	if (shade.style.display === "block") { // if a dropdown is open
		shade.style.display = "none"; // turn off the shade layer
		if(typeof(menuicon) != 'undefined' && menuicon != null ){
			menuicon.classList.remove('navmenu-icon-x');
		}

		// close any open dropdowns
		for (var i = 0; i < elements.length; i++){
            if (elements[i].id != "navnewsdropdown__2020" && elements[i].id != "navprofiledropdown__2020")
            {
			elements[i].style.display = "none";
            }
		}

		$('.nav-top__2020').find('.nav-dropdown-arrow__2020').removeClass('nav-dropdown-arrow-rotate'); // nav arrow rotation

	} else if (shade.style.display === "none") { // if all dropdowns are closed
		shade.style.display = "block"; // turn on the shade layer
		dropdown.style.display = "block"; // turn on the correct dropdown based on the parameter passed into the function
		// parameter should always be an ID, not a class
	} else {
		return false;
	}


	// Logged out navigation only code
	if(typeof(menuicon) != 'undefined' && menuicon != null){

		if (dropdown === "navdropdownout__2020" && shade.style.display === "block"){
			menuicon.classList.add('navmenu-icon-x');
		} else if (dropdown === "navdropdownout__2020" && shade.style.display === "none"){
			menuicon.classList.remove('navmenu-icon-x');
		}

	}
}

addJS_Node (toggleNavDropdown__2020);
function addJS_Node (text, s_URL, funcToRun, runOnLoad) {
    var D = document;
    var scriptNode = D.createElement ('script');
    if (runOnLoad) {
        scriptNode.addEventListener ("load", runOnLoad, false);
    }
    scriptNode.type = "text/javascript";
    if (text) scriptNode.textContent = text;
    if (s_URL) scriptNode.src = s_URL;
    if (funcToRun) scriptNode.textContent = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}

function removeLink()
{
    var results = document.getElementsByClassName("nav-pet-menu-icon__2020");
    for(var i = 0; i < results.length; i++){
        results[i].outerHTML = results[i].outerHTML.replace("onclick=\"toggleNavDropdown__2020(navprofiledropdown__2020)","onclick=\"toggleSidebar()");
        results[i].onclick = toggleSidebar;
        //results[i].outerHTML = "<a href=\"http://www.neopets.com/quickref.phtml\">" + results[i].outerHTML + "</a>";
    }
}

function EditAlertAttributeValue(elemId, attribute, newvalue)
{
    $("#"+elemId).attr(attribute,newvalue);
}

var isAlertToggledOpen = true;

async function toggleAlertSidebar()
{
    GM.setValue("alt_sidebar_always_open_toggle_value", !isAlertToggledOpen);
    openorclosealtonload();

}

async function openorclosealtonload()
{
    var toggled = await GM.getValue("alt_sidebar_always_open_toggle_value", -1);

    if (toggled == -1)
    {
        GM.setValue("alt_sidebar_always_open_toggle_value", true);
        toggled = true;
    }

    if (toggled)
    {
        openAlertSidebar();
    }
    else
    {
        closeAlertSidebar();
    }
    isAlertToggledOpen = toggled;
}

function closeAlertSidebar()
{
    EditAlertAttributeValue("navnewsdropdown__2020", "style", "display: none!important;");
}

function openAlertSidebar()
{
    var results = document.getElementById("navnewsdropdown__2020");
    EditAlertAttributeValue("navnewsdropdown__2020", "style", "display: block!important;");
    EditAlertAttributeValue("nav-dropdown-shade__2020", "style", "display: none!important;");
}

function removeAlertLink()
{
    var results = document.getElementsByClassName("nav-bell-icon__2020");
    for(var i = 0; i < results.length; i++){
        results[i].outerHTML = results[i].outerHTML.replace("onclick=\"toggleNavDropdown__2020(navnewsdropdown__2020)","onclick=\"toggleAlertSidebar()");
        results[i].onclick = toggleAlertSidebar;
        //results[i].outerHTML = "<a href=\"http://www.neopets.com/quickref.phtml\">" + results[i].outerHTML + "</a>";
    }
}

async function updatePetLarge () {
    GM.setValue("sidebar_pet_large", !petLarge);
    toggleProfilePet();
}

function updatePetSizeButtons()
{
    var expand = document.getElementsByClassName("nav-profile-pet-expand__2020");
    expand[0].onclick = updatePetLarge;
}

function GM_addStyle(css) {
  const style = document.getElementById("GM_addStyleBy8626") || (function() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = "GM_addStyleBy8626";
    document.head.appendChild(style);
    return style;
  })();
  const sheet = style.sheet;
  sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
}

removeLink();
openorcloseonload();
removeAlertLink();
openorclosealtonload();
updatePetSizeButtons();
