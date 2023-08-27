// ==UserScript==
// @name         Clean Fb
// @namespace    https://github.com/chgc/CleanFBSapce
// @version      0.12
// @description  清除FB
// @author       Kevin Yang, Houcheng Lin
// @include      /https:\/\/www.facebook.com
// @downloadURL  https://github.com/chgc/CleanFBSapce/raw/master/src/cleanFb.user.js
// ==/UserScript==

const CheckInterval = 3000;
const NeedToRemoveKeywords = ['為你推薦', 'Suggested for you', '贊助', 'Sponsored', 'Reels and short videos'];

var lastRunTick = (new Date()).getTime();
var removedCount = 0;

function checkKeywordsExist(node) {
    if (!node.innerHTML) return false;
    return NeedToRemoveKeywords.some((lang) => node.innerHTML.contains('dir="auto">' + lang + '</span>')) || NeedToRemoveKeywords.some((lang) => node.innerHTML.contains('">' + lang + '<')) ;
}

function checkKeywordExistBySpan(node){
    const id = node.querySelector('div[role=article]')?.getAttribute('aria-describedby')?.split(' ')[0];
    if(id == null) return false;
    // const span = node.querySelector(`span[id=${id}]`);
    const spanOrH4 = node.querySelector(`[id="${id}"]`);
    return spanOrH4 && spanOrH4.innerHTML && NeedToRemoveKeywords.some((lang) => spanOrH4.innerHTML.contains(lang));
}

function removeRecommandPost() {
    var nowTick = (new Date()).getTime();
    if (nowTick - lastRunTick < CheckInterval) return;
    lastRunTick = nowTick;

    document.querySelectorAll("div[data-pagelet*='FeedUnit_']").forEach((node) => {
        // debug
        // console.log('node is', node);
        var shouldRemove = false;
        if (node.innerText && node.innerText.startsWith("連續短片和短片")) {
            shouldRemove = true;
        } else if (checkKeywordsExist(node)) {
            shouldRemove = true;
        } else if (checkKeywordExistBySpan(node)){
            shouldRemove = true;
        }

        if (shouldRemove) {
            node.remove();
        }
    });
    lastRunTick = nowTick;
}

function executeActions() {
    removeRecommandPost();
    setTimeout(()=> executeActions(), 1000);
}


(function () {
    'use strict';
    // Your code here...
    executeActions();
})();
