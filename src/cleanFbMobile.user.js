// ==UserScript==
// @name         Clean Fb Mobile
// @namespace    https://github.com/houcheng/CleanFBSapce
// @version      0.1
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

function removeNode(node) {
    if (node.innerText) {
        console.log("remove node: ", node.innerText.split("\n")[0]);
        node.style.background = 'black';
        node.style.visibility = 'hidden';
    } else {
        console.log("node no text "); // should not delete
        node.style.background = 'black';
        node.style.visibility = 'hidden';
    }
    if (count > 0) count = count - 1;
}

var lastRunTick = (new Date()).getTime();
function removeRecommandPost() {
  // console.log("removeRecommandPost");

  var nowTick = (new Date()).getTime();
  if (nowTick - lastRunTick < CheckInterval) return;
  lastRunTick = nowTick;
  // console.log("removeRecommandPost enter");

  const s3Nodes = Array.from(document.querySelectorAll(".bg-s3"));

  for (var i = 0; i < s3Nodes.length; i ++) {
    const node = s3Nodes[i];
    if (node.style.visibility === 'hidden') {
      // do nothing if already hidden
      // console.log("skip already hidden");
    } else if (count > 0) {
      removeNode(node);
    } else if (checkKeywordExistBySpanInMobile(node)) {
      console.log("remove by span", node);
      removeNode(node);
      count = 4;
    }
  };

  // document.querySelectorAll(".story_body_container").forEach((node) => {
  // Tablet
  const storyNodes = Array.from(document.querySelectorAll(".story_body_container"));
  for (var j = 0; j < storyNodes.length; j ++) {
    const node = storyNodes[j];
    // console.log("story_body_container with text: ", node.innerText.split('\n')[0]);
    if(checkKeywordExistBySpanInMobile(node)) {
        console.log("remove by span in story_body_container", node);
        removeNode(node);
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
