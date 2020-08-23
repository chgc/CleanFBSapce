// ==UserScript==
// @name         Clean FB Space
// @namespace    https://github.com/chgc/CleanFBSapce
// @version      0.5
// @description  移除 FB 贊助廣告
// @author       Kevin Yang
// @include      /https:\/\/www.facebook.com
// @grant        none
// @downloadURL  https://github.com/chgc/CleanFBSapce/raw/master/clean-FB-space.user.js
// ==/UserScript==

function removerightRailAd() {
  var rr = document.querySelector("[data-pagelet='RightRail']");
  if (rr != null && rr.children.length > 0) {
    if (rr.children[0].children.length > 0) {
      rr.children[0].children[0].style = 'display:none';
    }
  }
}

const NeedToRemoveKeywords = ['贊助', 'Sponsored'];

function checkKeywordsExist(node) {
  return NeedToRemoveKeywords.some((lang) => node.querySelector('[aria-label=' + lang + ']') != null);
}

function removeSponsorPost() {
  document.querySelectorAll("div[data-pagelet*='FeedUnit_']").forEach((node) => {
    if (checkKeywordsExist(node)) {
      node.remove();
    }
  });
}

function executeActions() {
  removerightRailAd();
  removeSponsorPost();
  setTimeout(executeActions, 200);
}

(function () {
  'use strict';

  // Your code here...
  executeActions();
})();
