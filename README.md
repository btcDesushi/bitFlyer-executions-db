# bitFlyer-executions-db

bitFlyerから APIを使い、過去の約定履歴を全て取得してmongoDBに保存します。

お約束ですが、本ツールの使用による損失・損害は一切補償いたしません。ご使用は自己責任でお願いします。

## Install

```shell
$ git clone https://github.com/btcDesushi/reactive-armour-bot
$ npm install
```

## Usage

```shell
$ node index.js
```
## Settings

頭の方にある以下の部分をお手元のmongodbの設定に合わせて変更してください

```javascript
const mongodbUrl = 'mongodb://localhost:27020/bitflyer';
```

## Issues

ご意見等ありましたら
https://github.com/btcDesushi/bitFlyer-executions-db/issues
こちらかtwitter[@asahinoboru_jp](https://twitter.com/asahinoboru_jp)まで。
プルリクも歓迎します。

詳しい解説等については要望があれば書きます。


## Contributor
[@asahinoboru_jp](https://twitter.com/asahinoboru_jp)
BTC: 3QsEk7tbNo3JASo7j8s1rCc4JU6kwoZGh9
MONA: MBo7eyvXeaQdP17p4eGcfGpgJQHNkdVqar

## License
Code and documentation copyright 2018 by btcDesushi. Code released under the [MIT License](https://github.com/kokushin/node-twatch/blob/master/LICENSE).