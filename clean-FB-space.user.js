// ==UserScript==
// @name         移除 FB 贊助廣告
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  單純討厭 FB 懭告
// @author       Kevin Yang
// @include      /https:\/\/www.facebook.com
// @grant        none
// ==/UserScript==


function removerightRailAd(){
    var gg = document.querySelector("[data-pagelet='RightRail']")
    if(gg != null && gg.children.length>0){
        if(gg.children[0].children.length>0){
            gg.children[0].children[0].style = "display:none";
        }
    }
}

function removeSponsorPost(){
    document.querySelectorAll("[aria-label='贊助']").forEach(node => {
        if(node.offsetParent != null){
            node.offsetParent.remove()
        }
    });
}

function clearAD(){
    removerightRailAd();
    removeSponsorPost();
    setTimeout(clearAD, 200);
}

(function() {
    'use strict';

    // Your code here...
    clearAD();
})();