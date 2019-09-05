function getBoard() {

  //slackAPIを取得
var PostUrl = 'https://hooks.slack.com/services/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';
var username = 'trelloお知らせくん';
var icon = ':tapioka:';

//trelloのAPIを取得
  var trelloKey =  "8195be4dc378cc5a39b2c493dc4d0ba2";
  var trelloToken = "ecf034f649f0f3c5e22d8864a31d1d95c4392c9b2ff80b2c82a03d119de6b59c";
  var listId = "5d6c086612efce10179a02b8";
  
  var url = 'https://trello.com/1/lists/' + listId + '/cards?key=' + trelloKey + '&token=' + trelloToken + '&fields=name';
  res = UrlFetchApp.fetch(url,{'method':'get'});
  var json = JSON.parse(res.getContentText());
  
  var cards = [];
  var maxRows = json.length;
  for(var i =0; i<maxRows; i++){

    var name = json[i].name;
    /*開始時間と終了時間を取得したい
    　　以下の情報は現時点では必要なしのためコメントアウト
    var due = json[i].due;
    var idMembers = json[i].idMembers;
*/
    
    
    var card = [name];
    cards.push(card);
  }
    var message =  +　cards  +"で会議室をとります（仮）";
  
  Logger.log(cards);

  
  var jsonData = 
      {
        "username": username,
        "icon": icon,
        "text": message,
      }
  var payload = JSON.stringify(jsonData);
  
  var params = 
      {
        "method" : "post",
        "contenttype": "appication/json",
        "payload" : payload
      };
  
  
  UrlFetchApp.fetch(PostUrl,params);
    

  //カレンダーに入力する。
  var calendar = CalendarApp.getCalendarById('kashiwagiwataru224@gmail.com');
  var title = cards;
  var startTime = new Date('2019/09/06 20:00:00');
  var endTime = new Date('2019/09/06 23:00:00');
  var option = {
  description: 'tutrial',
  location : '〒150-0041 東京都渋谷区神南1丁目19番11号パークウェースクエア2 4階'
  }
  calendar.createEvent(title,startTime,endTime,option)
              
}
