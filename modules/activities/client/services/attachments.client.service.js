/* Created by Aquariuslt on 2017-01-08.*/
(function(){
  'use strict';

  angular
    .module('activities.services')
    .factory('AttachmentsService',AttachmentsService);


  AttachmentsService.$inject = ['$resource','$log'];


  function AttachmentsService($resource,$log){
    var Attachment = $resource(
      '/api/activities-attachments/:attachmentId',
      {
        attachmentId:'@_id'
      }
    );



    return Attachment;
  }

})();
