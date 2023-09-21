//LINE Messaging APIのチャネルアクセストークン
var LINE_ACCESS_TOKEN = "XvT2OYXYkBYb3wrtHGjGDufv7QK3J/+la2dcZhk40AM7T472KgE0B5msZ4P2ye7S+bnftCFrVFAc+3hwDxLNma4oBHf2yDvfu5fqW/siL/gvyUwhpcyzfZAS77Wpb9UqZ5RZrzzVF0Jw6bk7z/tfsQdB04t89/1O/w1cDnyilFU=";

//スプレッドシートID
var ss = SpreadsheetApp.openById("16Xjk58PHO5i9Stoym5e6MmHHs2TZuZN5IVxpzHE8I14");


//シート名
var sh = ss.getSheetByName("DB");


//LINE Messaging APIからPOST送信を受けたときに起動する
// e はJSON文字列
function doPost(e){
  if (typeof e === "undefined"){
    //動作を終了する
    return;
  } else {
    //JSON文字列をパース(解析)し、変数jsonに格納する
    var json = JSON.parse(e.postData.contents);

    //変数jsonを関数replyFromSheetに渡し、replyFromSheetを実行する
    replyFromSheet(json)
  }
}
 
//返信用の関数replyFromSheet
// data には変数jsonが代入される
function replyFromSheet(data) {
  //返信先URL
  var replyUrl = "https://api.line.me/v2/bot/message/reply";
   
  //シートの最終行を取得する
  var lastRow = sh.getLastRow();
   
  //シートの全受信語句と返信語取得する
  var wordList = sh.getRange(1,1,lastRow,7).getValues();
   
  //受信したメッセージ情報を変数に格納する
  var reply_token = data.events[0].replyToken; //reply token
  var text = data.events[0].message.text; //ユーザーが送信した語句
 
  //返信語句を格納するための空配列を宣言する
  var replyTextList = [];
  var word = 0;
  var part = 0;

  for(var i = 1; i < wordList.length; i++) {
    if(wordList[i][0] == text) {
      word = 
      '物件番号【'+wordList[i][0]+'】\n'
      +'\n'
      +'物件は『'+wordList[i][1] +'』ですか？\n'
      + wordList[i][1] + 'の情報はこちら！\n'
      + '\n'
      +'▼物件場所▼\n'
      +'https://www.google.co.jp/maps/place/'+ wordList[i][5]
      +'\n▼物件写真▼\n'
      + wordList[i][6] ;

      replyTextList.push(word);
    } 

    //部分一致
    if(wordList[i][1].indexOf(text) !== -1){
      if(part == 0){
        part = 
        '🔎物件の検索結果はこちら'
        +'\n【'+ wordList[i][0] + '】'
        +wordList[i][1];
      }else{
        part += 
        '\n【'+ wordList[i][0] + '】'
        +wordList[i][1];
      }
    }
  }



  //部分一致を配列に格納
  if(part != 0){
    replyTextList.push(part);
  }else{
    
  }

  //何も一致しない場合
  //応答メッセージで設定している語群を回避
  var setting = ['使い方',`サポセン電話番号`, 'お部屋探し', '来場予約','タクシー', '掲示板', 'アピアランスチェック', '管理者連絡先','制作メモ'];


  if(setting.includes(text)){
    return;
  }else if(word == 0 && part == 0){
    var nothing = 0;
    nothing = 
    '物件の検索はヒットしません...💦'
    + '\n物件番号は半角、物件名は全角で入力していますか？'
    + '\n\n使い方が分からない場合は'
    + '\n【使い方】'
    + '\nと入力してください📝'
    replyTextList.push(nothing);
  }
  


  //LINEで受信した語句がシートの受信語句と一致しない場合、関数を終了する
  if(replyTextList.length > 5) {
    var messageLength = 5;
  } else {
    var messageLength = replyTextList.length;
  }
  
  //"messages"に渡す配列を格納するための空配列を宣言する
  //[{"type": "text", "text": "返信語句その1"},{"type": "text", "text": "返信語句その2"}....]
  var messageArray = [];
  
  //replyTextListに格納されている返信語句を最大5つ、messageArrayにpushする
  for(var j = 0; j < messageLength; j++) {
    messageArray.push({"type": "text", "text": replyTextList[j]});
  }
  
  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": "Bearer " + LINE_ACCESS_TOKEN,
  };
  
  var postData = {
    "replyToken": reply_token,
    "messages": messageArray
  };

  var options = {
    "method" : "post",
    "headers" : headers,
    "payload" : JSON.stringify(postData)
  };
    
  //LINE Messaging APIにデータを送信する
  UrlFetchApp.fetch(replyUrl, options);
}