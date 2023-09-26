# サポセン業務用リポジトリ
サポセンの業務開発で使ったコードやアプリケーションの使い方や保存用ののリポジトリ。
管理する立場になったときや、変更を加えたい場合、中身が気になるときに見てください。

### このページでの説明システム
  - [LINE Bot](https://github.com/kenshi0902/Saposen#line-bot) (物件番号and住所検索)
  - [集中管理スプレッドシート](https://github.com/kenshi0902/Saposen#%E9%9B%86%E4%B8%AD%E7%AE%A1%E7%90%86%E3%82%B9%E3%83%97%E3%83%AC%E3%83%83%E3%83%89%E3%82%B7%E3%83%BC%E3%83%88)

---

# LINE Bot
ここで説明する LINE Bot は @876ephlo で実装されている **物件番号and住所検索** のことです。  
設定の変更には権限付与が必要なのでその時の管理者に連絡をお願いします。  
権限付与をされると[LINE Official Account Manager](https://manager.line.biz/account/@876ephlo)というサイトで設定の変更をすることができます。

データベースは[スプレッドシート](https://docs.google.com/spreadsheets/d/16Xjk58PHO5i9Stoym5e6MmHHs2TZuZN5IVxpzHE8I14/edit#gid=0)にて管理を行っています。物件情報変更があった際には住まいがこちらを修正すれば即時反映されます。  

簡易的な機能追加やメッセージ登録をすることもできるので積極的に活用してみてください！！

## 検索語彙の追加
  LINE Developersではお友達登録者が送ったメッセージと同じ文字をあらかじめ登録しておくことによって、返信する文字列やさまざまな機能を前もって決めておくことができます。  
  設定手順は以下の通りです。 

  1. メッセージの新規作成  
  1. 物件検索の文字列との誤認回避

  応答メッセージ作成は大きく **Acount Manager** と **物件検索応答システム** の2種類を常に動かしている事になります。設定手順の2を無視してしまうとどちらからもメッセージが返ってくることになるので抜けが無いようによろしくお願いします。  
  とはいえ、どちらも簡単な設定です。是非マスターしてより良いシステムにしていきましょう！

  ### 1.メッセージの新規作成
  メッセージの新規作成自体はとても簡単です。いわゆる公式LINEの設定を行う画面で簡単なGUI操作のみで追加と削除を行えます。[LINE Official Account Manager](https://manager.line.biz/account/@876ephlo)のページより

  | [管理ホーム画面](https://developers.line.biz/console/channel/1655768736) > 自動応答メッセージ > 応答メッセージ |
  |-|  

  から右上の作成のボタンを押してもらうと作成することができます。  
  タイトルは管理上分かりやすい名称を入力すれば問題ありません。
  キーワード応答は友達登録者が送って来るメッセージの定型文をこちらで設定する操作です。なるべく短く内容が分かりやすいキーワードを設定しましょう。ここで設定したキーワードは次のセクションで説明する誤認回避を行う必要があるので、そちらの確認もお願いします。メッセージは自動で応答するメッセージ本文なので、好きなように文章作成することができます。ここにリンクを貼ることもできるので、リンク不変のリアルタイム性のあるものを貼ると効果が高いです。
  

  ### 2.物件検索の文字列との誤認回避
  前述した通り、応答メッセージ作成は大きく **Acount Manager** と **物件検索応答システム** の2種類です。Acount Managerにて作成したキーワードを利用者が入力した際にAcount Managerでの応答と物件検索の結果のメッセージ作成を同時にしてしまいます。この設定をしないと、特定のキーワードを送信したときに常に検索がヒットしませんでしたのメッセージが送信されることになるので設定を忘れないようにお願いします。  
  （執筆途中）

## 物件情報の修正
## コードの修正

# 集中管理スプレッドシート
  ここでは普段セクションが使っている集中管理のスプレッドシートの時間が自動で入力されるシステムについて解説します。  
  プログラミングを伴う内容ですが、内容としてとても難しい訳ではありません。プログラミングを触ったことがない人にも理解してもらうように動画での解説も用意する予定なので気楽に読んでみてください。  
  ここで説明する項目は以下の通りです。  

  1. Google Apps Script (GAS) の記述方法
  1. 業務中にコードが動かなくなった時に真っ先に疑うこと
  1. 記述されたコードの詳しい解説

  例年業務中にコードがうまく動かなくなる現象が良く起こります。多くは列や行の増減による参照元のズレによるものですが、この対処をできる人が営業中常にいることを目指してこのマニュアル作成をしています。少なくとも2の項目までを事務局や集中管理の人には理解してもらいたいです。もちろん最後の項目も理解してもらえるように記述するので読んでみてください。この項目が理解できればスプレッドシートの改善を行うときに役立つ事になると思います。

  ## Google Apps Script (GAS) の記述方法
  現在(2023サポセン)使っているスプレッドシートではセルに情報が入ったときに自動で時間を記述するプログラミングが裏で走っています。このGoogle Apps Scriptを編集することによってうまく動かなくなったスプレッドシートを復旧したり、業務フローの変更に合わせて内容を変えていく事ができます。[スプレッドシート](https://docs.google.com/spreadsheets/d/12z47_UQSYZZFKuOGbdO2SQq5zOL5OUUCB5kYMOvP8-8/edit?usp=drive_link)を開いてもらい

  |拡張機能 > Apps Script|
  |-|

  と進んでもらいます。するとプログラミングが記述された画面が出てくると思います。このプログラミングを編集できる画面のことをエディタといいます。元々集中管理のスプレッドシートとして機能しているファイルでこの操作をすると、このGitHubのページの一番上に表示されているファイル群の中の ./sheet/time.gs と同じコードが記述されていることを確認してください。もし、どうも復旧ができないようなら、この time.gs をコピーして貼ってしまってもいいかもしれません。

  ## 業務中にコードが動かなくなった時に真っ先に疑うこと
  前項にGASのエディタの開き方を説明しました。実際にこのコードを書き換えて保存してしまえば関連付けられたスプレッドシートに変更が適応される形になります。業務中にコードが動かなくなった場合はこのコードを修正する必要があると疑ってください。  
  では、実際にどのような原因でコードが動かなくなるのかというと、**列の増減** による参照ズレがほとんどだと思います。「業務中に必要ない1列を消去してしまった」や「メモ列を作りたかったので1列挿入した」がこの典型例です。具体的な参照を見ていきましょう。  
  ./sheet/time.gs を開きながら読んでください。6行目に

  ```js:time.gs
  const cb = [6,8,15,17,19,22,24,26,28]
  ```
  という記述があります。これは `cb` という配列を自分で用意してあげて、そのなかに6, 8, 15...と順番に格納する操作です。  
  この値をあらかじめ決めておくことによって **時間を入力する左の列を定義** しています。
  プログラミングの基本は0から始まることに注意して、現状のスプレッドシートのチェックボックスや自動入力の1つ左の列番号を数えてみてください。ここで定義する配列と一致するはずです。  
  従って、**列の増減があった時はcbを再定義** する必要があります。ほとんどの場合がこの変更の修正で問題解決するはずなので、より多くの人が知っておくと慌てることが少なくなるはずです。
  
  ## 記述されたコードの詳しい解説
  
