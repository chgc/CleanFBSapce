// ==UserScript==
// @name         Clean FB Suggested for you
// @namespace    https://github.com/chgc/CleanFBSapce
// @version      0.1
// @description  移除 FB 為你推薦
// @author       Kevin Yang
// @include      /https:\/\/www.facebook.com
// @grant        none
// @downloadURL  https://github.com/chgc/CleanFBSapce/raw/master/clean-FB-recommand.user.js
// ==/UserScript==

const RecommandKeyWords = ['為你推薦', 'Suggested for you'];

function checkKeyWordsContain(node) {
  return SponsoredKeyWords.some((lang) => node.innerHTML.contains('dir="auto">' + lang + '</span>'));
}

function removeRecommandPost() {
  document.querySelectorAll("div[data-pagelet*='FeedUnit_']").forEach((node) => {
    if (checkKeyWordsContain(node)) {
      node.remove();
    }
  });
}

function executeActions() {
  removeRecommandPost();
  setTimeout(executeActions, 200);
}

(function () {
  'use strict';

  // Your code here...
  executeActions();
})();
