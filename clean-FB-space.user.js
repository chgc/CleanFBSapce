// ==UserScript==
// @name         Clean FB Space
// @namespace    https://github.com/chgc/CleanFBSapce
// @version      0.4
// @description  移除 FB 贊助廣告
// @author       Kevin Yang
// @include      /https:\/\/www.facebook.com
// @grant        none
// @downloadURL  https://github.com/chgc/CleanFBSapce/raw/master/clean-FB-space.user.js
// ==/UserScript==


function removerightRailAd() {
    var gg = document.querySelector("[data-pagelet='RightRail']")
    if (gg != null && gg.children.length > 0) {
        if (gg.children[0].children.length > 0) {
            gg.children[0].children[0].style = "display:none";
        }
    }
}

const SponsoredKeyWords = ['贊助', 'Sponsored'];

function checkSponsoredKeyWordsContain(node) {
    return SponsoredKeyWords.some(lang => node.querySelector("[aria-label=" + lang + "]") != null)
}

function removeSponsorPost() {
    const feeds = document.querySelectorAll("div[data-pagelet*='FeedUnit_']")
    Array.from(feeds).filter(checkSponsoredKeyWordsContain)
        .forEach(node => node.remove());
}

function clearAD() {
    removerightRailAd();
    removeSponsorPost();
    setTimeout(clearAD, 200);
}

(function () {
    'use strict';

    // Your code here...
    clearAD();
})();