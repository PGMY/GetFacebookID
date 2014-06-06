


function get_url($scope,$http) {

  //初期化処理に使います。
  $scope.init=function() {
    console.log('TEST');
  };

  $scope.getFacebookID = function(){
    console.log($scope.inputText);
    var URL = $scope.inputText;

    if ( URL == null || URL.length == 0 ){
      $scope.facebookID = 'URL is empty';
      return;
    }

    var requestURL = '';
    var isHTTP = URL.indexOf('http://')===0;
    var isHTTPS = URL.indexOf('https://')===0;

    var isFBURL = URL.indexOf('www.facebook.com') != -1;

    if ( isHTTP && isFBURL ){
      requestURL = URL.replace( 'http://www.facebook.com' , 'http://graph.facebook.com' );
    } else if ( isHTTPS && isFBURL ){
      requestURL = URL.replace( 'https://www.facebook.com' , 'http://graph.facebook.com' );
    } else if ( !isHTTP && !isHTTPS ){
      if ( isFBURL ){
        requestURL = URL.replace( 'www.facebook.com' , 'http://graph.facebook.com' );
      } else {
        requestURL = 'http://graph.facebook.com/' + URL;
      }
    }
    console.log('REQUEST = '+requestURL);
    if ( requestURL.length != 0 ){

      $http.get(requestURL, {hoge: "hoge"})
      .success(function(data) {
          console.log(data.id);
          $scope.facebookID = data.id;
          $scope.facebookFeed = 'http://www.facebook.com/feeds/page.php?format=rss20&id='+data.id;
      })
      .error(function(data, status) {
          console.log(status);
      });
    }

  }



}
