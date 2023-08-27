// ==UserScript==
// @name         Clean FB Suggested for you
// @namespace    https://github.com/chgc/CleanFBSapce
// @version      0.3
// @description  移除 FB 為你推薦
// @author       Kevin Yang
// @include      /https:\/\/www.facebook.com
// @grant        none
// @downloadURL  https://github.com/chgc/CleanFBSapce/raw/master/clean-FB-recommand.user.js
// ==/UserScript==

const NeedToRemoveKeywords = ['為你推薦', 'Suggested for you', '贊助'];

function checkKeywordsExist(node) {
  if (!node.innerHTML) return false;
  return NeedToRemoveKeywords.some((lang) => node.innerHTML.contains('dir="auto">' + lang + '</span>')) || NeedToRemoveKeywords.some((lang) => node.innerHTML.contains('">' + lang + '<')) ;
}

function checkKeywordExistBySpan(node){
   const id = node.querySelector('div[role=article]')?.getAttribute('aria-describedby')?.split(' ')[0];
   if(id == null) return false;
   const span = node.querySelector(`span[id=${id}]`);
   return span && span.innerHTML && NeedToRemoveKeywords.some((lang) => span.innerHTML.contains(lang));
}

function removeRecommandPost() {
  document.querySelectorAll("div[data-pagelet*='FeedUnit_']").forEach((node) => {
    if (checkKeywordsExist(node)) {
      node.remove();
    }
    if (checkKeywordExistBySpan(node)){
      node.remove();
    }
  });
}

function executeActions() {
  removeRecommandPost();
  setTimeout(()=> executeActions(), 200);
}

(function () {
  'use strict';
  // Your code here...
  executeActions();
})();
