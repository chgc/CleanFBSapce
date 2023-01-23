// ==UserScript==
// @name         Clean Fb Mobile
// @namespace    https://github.com/houcheng/CleanFBSapce
// @version      0.11
// @description  清除FB mobile (android firefox)
// @author       Kevin Yang, Houcheng
// @include      /https:\/\/m.facebook.com
// @grant        none
// @downloadURL  https://github.com/houcheng/CleanFBSapce/raw/master/src/cleanFbMobile.user.js
// ==/UserScript==

// This is not working
const NeedToRemoveKeywords = ['為你推薦', 'Suggested for you', '贊助', 'Sponsored'];
const CheckInterval = 3000;

// Mobile
function checkKeywordExistBySpanInMobile(node) {
    const spans = Array.from(node.querySelectorAll('span'));
    if (spans.filter(s => s.innerText && s.innerText.startsWith("Sponsored")).length > 0) return true;
    if (spans.filter(s => s.innerText && s.innerText.startsWith("Suggested")).length > 0) return true;
    if (spans.filter(s => s.innerText && s.innerText.startsWith("為你推薦")).length > 0) return true;
    if (spans.filter(s => s.innerText && s.innerText.startsWith("贊助")).length > 0) return true;
    return false;
}

var count = 0;
var removed = [];
var lastRunTick = (new Date()).getTime();

function hideNode(node) {
    console.log("Hide node: ", node.innerText ? node.innerText.split("\n")[0] : "node without text");
    node.style.background = 'black';
    node.style.visibility = 'hidden';
    if (count > 0) count = count - 1;
}

function removeRecommandPost() {
    var nowTick = (new Date()).getTime();
    if (nowTick - lastRunTick < CheckInterval) return;
    lastRunTick = nowTick;

    const s3Nodes = Array.from(document.querySelectorAll(".bg-s3"));
    for (var i = 0; i < s3Nodes.length; i ++) {
        const node = s3Nodes[i];
        if (node.style.visibility === 'hidden') {
            // do nothing if already hidden
        } else if (count > 0) {
            hideNode(node);
        } else if (checkKeywordExistBySpanInMobile(node)) {
            console.log("Hide by span", node);
            hideNode(node);
            count = 4;
        }
    };

    const storyNodes = Array.from(document.querySelectorAll(".story_body_container"));
    for (var j = 0; j < storyNodes.length; j ++) {
        const node = storyNodes[j];
        // console.log("story_body_container with text: ", node.innerText.split('\n')[0]);
        if (checkKeywordExistBySpanInMobile(node)) {
            console.log("Hide by span in story_body_container", node);
            hideNode(node);
        }
    }
}

function executeActions() {
  removeRecommandPost();
  setTimeout(()=> executeActions(), CheckInterval);
}

(function () {
  'use strict';
  // Your code here...
  executeActions();
})();
