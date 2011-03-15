//does not use multipart helper function because its not multipart.


Hosts.webdav = function uploadWebDAV(req, callback){
  if(!localStorage.webdav_url){
    localStorage.webdav_url = prompt("Enter the URL of the WebDAV provider");
  }
  if(!localStorage.webdav_url || !/^http/.test(localStorage.webdav_url)){
    return callback("error: invalid webdav server url");
  }

  var fs = new WebDAV.Fs(localStorage.webdav_url);

  getRaw(req, function(file){
    var body = new BlobBuilder();
    var bin = file.data, arr = new Uint8Array(bin.length);
    for(var i = 0; i < bin.length; i++){
      arr[i] = bin.charCodeAt(i);
    }
    body.append(arr.buffer);
    fs.file(file.name).write(body.getBlob(), function(body){
      console.log(body);
    });
  });
  /*
  var poll = function(){
    if(dropbox.isAccessGranted()){
      getRaw(req, function(file){
        var fname =  file.name;
        var folder = ''
        
        dropbox.getAccountInfo(function(user){
        
        
        dropbox.getDirectoryMetadata(folder + encodeURIComponent(file.name), function(json){
          if(json.error && json.error.indexOf('not found') != -1){
            //yay plop it on the top
          }else if(fname.indexOf('/') == -1){
            fname = Math.random().toString(36).substr(2,4) + '_' + fname;
          }else{
            //no idea. TODO: do something
          }
       
  */
  
}
