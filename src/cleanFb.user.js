// ==UserScript==
// @name         Clean Fb
// @namespace    https://github.com/houcheng/CleanFBSapce
// @version      0.11
// @description  清除FB
// @author       Kevin Yang, Houcheng Lin
// @grant        GM_addStyle
// @include      /https:\/\/www.facebook.com
// @downloadURL  https://github.com/houcheng/CleanFBSapce/raw/master/src/cleanFb.user.js
// ==/UserScript==

function createBannerNode() {
    const node = document.createElement ('div');
    node.innerHTML = '';
    node.setAttribute ('id', 'myContainer');
    document.body.appendChild (node);
    GM_addStyle ( `
        #myContainer {
            position:               fixed;
            bottom:                 0;
            left:                   64px;
            font-size:              12px;
            background:             orange;
            border:                 3px outset black;
            margin:                 5px;
            opacity:                0.9;
            z-index:                1100;
            width:                  300px;
            padding:                5px 5px;
        }
        #myButton {
            cursor:                 pointer;
        }
        #myContainer p {
            color:                  red;
            background:             white;
        }
    ` );
    return node;
}

const bannerNode = createBannerNode();
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
            removedCount += 1;
            const msg = node.innerText ? node.innerText.split('\n')[0] : "no-name";
            bannerNode.innerHTML = `<div>${removedCount} ${msg}</div>`;
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
