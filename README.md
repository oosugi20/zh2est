# zh2est

ZenHubで設定したestimateを使って見積書を作る機能。
いろいろ未完だけど取り敢えずは動く。


## 利用するJSONファイルについて

現状、ローカルに保存しておく必要がある。
ZenHubのestimateの値を使ってるので、ZenHubのJSONファイルをローカルに保存しておく。

ZenHubのBoardsにアクセスした場合にZenHubが取ってきている、 https://api.zenhub.io/v3/repos/{repoId}/issues が必要。
Chromeのデベロッパーツールとかから参照して保存しとく。



## 見積書形式

見積書をPDFで作るとか、なんらかの見積書作成サービスにインポートするとかまでを自動化したいけど、とりあえず今のところその辺は手動。
現状、Makeleapsのインポート用の形式のCSVを書き出すので、それを手動でMakeleapsのWebアプリからアップする。



## Install & Usage

```
$ git clone git@github.com:oosugi20/zh2est.git
$ cd zh2est
$ npm install
$ zh2est ../somedir/issues.json MilestoneName
```

