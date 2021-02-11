// ==UserScript==
// @name         Neopets: Neoboard Big Pets
// @version      1.0
// @description  Makes all pets on the neoboards larger and of higher quality, rearrannges user info/avatar and tries to better align the contents of the post for the larger white space
// @author       rawbeee - edited from Harvey (https://github.com/Blathers/neopets-user-scripts/)
// @match        http://www.neopets.com/neoboards/topic*
// @grant        none
// ==/UserScript==

GM_addStyle ( `
    .postPetInfo {
        margin-right: 50% !important;
        margin-left: 50% !important;
        width:185px;
    }
` );
GM_addStyle ( `
    .postPetInfo h4, .postPetInfo p{
text-align:center!important;
    }
` );
GM_addStyle (`
    .postAuthorPetIcon img {
        margin-left:40px;
    }`);

GM_addStyle (`
#boardTopic ul li .boardPost .boardPostMessage {
  margin-top: 15%;
  margin-bottom: 10%;
}`);

GM_addStyle (`
.authorIcon {
  margin-top: 20px !important;
  margin-left: 50px !important;
}`);
GM_addStyle (`
.postAuthor {
  width:100%;
  margin-left: 40px;
}`);
GM_addStyle (`
h3.postAuthorName {
  text-align: center;
  width:170px !important;
  margin: 0 !important;
  margin-bottom: 60px !important;
}`);
GM_addStyle (`
.postAuthorInfo {
  width:100%;
  margin-left: -69.5px;
}`);

GM_addStyle (`
div.postAuthorInfo p {
  text-align: center;
}`);

GM_addStyle (`
span.actions {
margin-left: 50px;
}`);

function getPostAuthorPet()
{
    var results = document.getElementsByClassName("postAuthorPetIcon");
    for(var i = 0; i < results.length; i++){
        var newhtml = results[i].innerHTML.replace("/1.png","/5.png");
        newhtml = newhtml.replace("width=\"50\"","width=\"150\"");
        newhtml = newhtml.replace("height=\"50\"","height=\"150\"");
        results[i].innerHTML = newhtml;
        results[i].outerHTML = results[i].outerHTML + "<br>";
    }
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

getPostAuthorPet();
