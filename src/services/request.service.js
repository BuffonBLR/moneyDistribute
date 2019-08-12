const RequestService = {
  requests: function(method, url) {
    var self = this;
    return new Promise(function (resolve, reject) {
      var xhr = self.createCORSRequest(method, url)

      if (!xhr) {
        throw new Error('CORS not supported');
      }

      xhr.onload = function() {
        var responseText = xhr.responseText;
        console.log(responseText);
        resolve(xhr.responseText);
      };
      
      xhr.onerror = function() {
        console.log('There was an error!');
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };

      xhr.send();
    });
  },

  createCORSRequest: function(method, url) {
    console.log(url);
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
  
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open(method, url, true);
  
    } else if (typeof XDomainRequest != "undefined") {
  
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open(method, url);
  
    } else {
  
      // Otherwise, CORS is not supported by the browser.
      xhr = null;
  
    }
    return xhr;
  }
};

export default RequestService;
