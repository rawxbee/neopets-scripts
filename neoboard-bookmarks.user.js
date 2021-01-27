// ==UserScript==
// @name         Neopets: Neoboard Bookmarks
// @version      1.3.1
// @author       sunbathr & rawbeee
// @description  Bookmarks for threads and boards
// @match        http://www.neopets.com/neoboards/*
// @require      http://code.jquery.com/jquery-latest.js
// @require      http://userscripts-mirror.org/scripts/source/107941.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-start
// ==/UserScript==
$(`<style type='text/css'>
#bookmarked_boards td {
  border: 1px solid #efefef;
  padding: 10px;
  font-family: "MuseoSansRounded500", 'Arial', sans-serif;
  valign : middle;
  font-size: 11px;
  width: 150px;
}
#bookmarked_boards td a:link, #bookmarked_boards td a:visited {
  text-decoration: none;
  color: #6e9992 !important;
  font-weight: bold;
  font-size: 15px;
  line-height: 25px;
}
#bookmarked_boards td img {
  float: left;
  margin-right: 10px;
}
#bookmarked_threads td {
  border: 1px solid #efefef;
  padding: 10px;
  font-family: "MuseoSansRounded500", 'Arial', sans-serif;
  valign : middle;
  font-size: 11px;
  width: 150px;
  text-align: center;
}
#bookmarked_threads td a:link, #bookmarked_threads td a:visited {
  text-decoration: none;
  color: #6e9992 !important;
  font-size: 14px;
  line-height: 25px;
}
#neonav a:link, #neonav a:visited {
  text-decoration: none;
  color: #6e9992 !important;
  font-size: 14px;
  line-height: 25px;
}
.collapsible_bookmarks {
  background-color: #79afa6;
  color: white;
  cursor: pointer;
  padding: 5px;
  width: 100%;
  border: none;
  text-align: center;
  outline: none;
  font-size: 15px;
  font-weight: bold;
  font-family: "MuseoSansRounded500", 'Arial', sans-serif;
  border-radius: 3px;
}
.threadfollow {
  color: white;
  cursor: pointer;
  padding: 0px;
  border: none;
  text-align: center;
  outline: none;
  font-size: 12px;
  font-weight: bold;
  font-family: "MuseoSansRounded500", 'Arial', sans-serif;
  border-radius: 3px;
  width:214px;
  height: 31px;
  margin: 3px;
  padding-bottom: 35px;
}
.collapsiblefollow {
  color: white;
  cursor: pointer;
  border: none;
  text-align: center;
  outline: none;
  font-size: 9px;
  font-weight: bold;
  font-family: "MuseoSansRounded500", 'Arial', sans-serif;
  border-radius: 3px;
  width:25px;
  height: 25px;
  float: right;
  position: absolute;
  margin-left: -30;
  margin-top: 5;
}
.active:hover, .collapsible_bookmarks:hover {
  background-color: #6e9992;
}
.active {
  background-color: #79afa6;
}

.content_collapsed {
  display: none;
  overflow: hidden;
  font-size: 10px;
}
tr button p {
  margin-top: 5;
}
</style>`).appendTo("head");

var followedThreads = GM_SuperValue.get("BookmarkedThreadsNeopets", []);

function displayBookmarks() {
    var bookmarked_thread_html = ``;
    followedThreads.forEach(function(entry) {
    var populate = `<tr id="bookmarked_threads">
                        <td class="bookmark" style="padding: 3px !important; font-size: 14px; width: 100%;">
                        ${entry}
                        </td>
                    </tr>`;
    bookmarked_thread_html += populate;
});
  var recently_viewed_section = `
                <center><div class="bookmarkedbt" style="margin: 10px;">
                <table>
<tr id="bookmarked_boards">
                <td><a href="boardlist.phtml?board=21"><img src="http://images.neopets.com/neoboards/boardIcons/avatars.png"> Avatar Chat</a> <br>` +
                $( "#boardIndex li:eq(30) .recent" ).text()
                 + `</td>
                <td><a href="boardlist.phtml?board=7"><img src="http://images.neopets.com/neoboards/boardIcons/ac7.png"> Site Events</a> <br>` +
                $( "#boardIndex li:eq(2) .recent" ).text()
                 + `</td>
                <td><a href="boardlist.phtml?board=34"><img src="http://images.neopets.com/neoboards/boardIcons/neopound.png"> Pound Chat</a> <br>` +
                $( "#boardIndex li:eq(15) .recent" ).text()
                 + `</td>
                <td><a href="boardlist.phtml?board=10"><img src="http://images.neopets.com/neoboards/boardIcons/battle.png"> BD Chat</a> <br>` +
                $( "#boardIndex li:eq(11) .recent" ).text()
                 + `</td>
                <td><a href="boardlist.phtml?board=31"><img src="http://images.neopets.com/neoboards/boardIcons/ncmall.png"> NC Mall</a> <br>` +
                $( "#boardIndex li:eq(14) .recent" ).text()
                 + `</td>
</tr>
<tr id="bookmarked_threads">
    <td colspan="7" style="border: 0px;">
        <button type="button" class="collapsible_bookmarks">Bookmarked Threads</button>
            <div class="content_collapsed">
                <table style="width:100%;">
                ${bookmarked_thread_html}
                </table>
            </div>
     </td>
</tr>
                </table></div></center>`;
  $("#boardIndex").before(recently_viewed_section);
  $("#boardTopic").before(recently_viewed_section);
  $("#boardList").before(recently_viewed_section);
  $("#boardCreateTopic").before(recently_viewed_section);
}

function displayBookmarkedThreads() {
var coll = document.getElementsByClassName("collapsible_bookmarks");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
}

function followThreadsToggle() {
    $(".topicTitle").each(function(i, title) {
        var thread = $(`.topicNavTop`).html().match(/(?<=<\/a>\n\t\t\t\t).*?(?=\n\t\t\t<\/div>)/g)[0];
        var thread_title = thread.replace("Topic: ", "").replace("<h1>", "").replace("</h1>", "").replace(/(?<=&amp;).*?(?=">)/g);
        if($.inArray(thread_title, followedThreads) !== -1) {
            $(title).after( '<button type="button" class="threadfollow" style="background-color: #cacaca;"><p>UNBOOKMARK</p></button>' );
        }
        else {
            $(title).after( '<button type="button" class="threadfollow" style="background-color: #79afa6;"><p>BOOKMARK</p></button>' );
        }
    });
    $('.threadfollow').click(function() {
         var updating = $(`.topicNavTop`).html().match(/(?<=<\/a>\n\t\t\t\t).*?(?=\n\t\t\t<\/div>)/g)[0];
         var updatingThread = updating.replace("Topic: ", "").replace("<h1>", "").replace("</h1>", "").replace(/(?<=&amp;).*?(?=">)/g);
         if($.inArray(updatingThread, followedThreads) !== -1) {
             var newFollowedThreads = followedThreads.filter(function(elem) {
                 return elem != updatingThread;
             });
             followedThreads = newFollowedThreads;
         }
         else {
             followedThreads.push(updatingThread);
         }
        GM_SuperValue.set ("BookmarkedThreadsNeopets", followedThreads);
        $(".threadfollow").remove();
        followThreadsToggle();
        $(".bookmarkedbt").remove();
        $("#neonav").remove();
        displayBookmarks();
        displayBookmarkedThreads();
        $(".collapsiblefollow").remove();
        followThreadsToggleCollapsible();
        $(".content_collapsed").css("display", "block");
     });
}
function followThreadsToggleCollapsible() {
    $(".bookmark").each(function(i, bookmark) {
            $(bookmark).parent().append( '<button type="button" class="collapsiblefollow" style="background-color: #cacaca;"><p>x</p></button>' );
    });
    $('.collapsiblefollow').click(function() {
         var updatingThread = $(this).parent().find( ".bookmark" ).html().replace(/(\n\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s)/g, ``);
         if($.inArray(updatingThread, followedThreads) !== -1) {
             var newFollowedThreads = followedThreads.filter(function(elem) {
                 return elem != updatingThread;
             });
             followedThreads = newFollowedThreads;
         }
         else {
             followedThreads.push(updatingThread);
         }
        GM_SuperValue.set ("BookmarkedThreadsNeopets", followedThreads);
        $(".threadfollow").remove();
        followThreadsToggle();
        $(".bookmarkedbt").remove();
        $("#neonav").remove();
        displayBookmarks();
        displayBookmarkedThreads();
        $(".collapsiblefollow").remove();
        followThreadsToggleCollapsible();
        $(".content_collapsed").css("display", "block");
     });
}


document.addEventListener('DOMContentLoaded', displayBookmarks);
document.addEventListener('DOMContentLoaded', displayBookmarkedThreads);
document.addEventListener('DOMContentLoaded', followThreadsToggle);
document.addEventListener('DOMContentLoaded', followThreadsToggleCollapsible);
