/* Created by Aquariuslt on 2017-01-08.*/
(function () {
  'use strict';
  angular
    .module('activities.admin')
    .filter('summaryFilter', summaryFilter)
    .filter('attachmentFilter', attachmentFilter)
  ;


  function summaryFilter() {
    return function (content, summaryLength) {
      if (summaryLength) {
        return content.substring(0, summaryLength);
      }
      else {
        return content.substring(0, 80);
      }

    }
  }


  function attachmentFilter() {
    return function (htmlContent) {
      var elem = document.createElement("div");
      elem.innerHTML = htmlContent;
      var imgList = elem.getElementsByTagName('img');
      var attachmentList = [];
      _.each(imgList,function(imgLink){
        attachmentList.push(imgLink.src);
      });
      return attachmentList;
    }
  }

})();
