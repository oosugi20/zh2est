
var _ = require('underscore');



var COL_SRC = '行形式	書類番号	発行日	クライアント名	クライアント住所形式	クライアント国名	クライアント郵便番号	クライアント県名	クライアント市区町村	クライアント番地	クライアントマンション・ビル名	クライアント電話番号	クライアントEメール(to)	クライアントEメール(cc)	クライアント担当者部門	クライアント担当者肩書	クライアント担当者	項目タイプ	商品コード	項目名	項目単価	項目数量	項目単位	項目金額	項目消費税対象	項目消費税込み	項目源泉税対象	小計	消費税率	消費税	源泉税	合計金額	通貨	支払日	送信日	振込先タイトル	振込先	件名	備考	メモ	タグ	テンプレート	支払期限	有効期限	納品日	但し';
var cols = COL_SRC.split(/\t/);
var length = cols.length;


module.exports = {

	cols: cols,


	length: length,


	indexOf: function (string) {
		return _.indexOf(this.cols, string);
	}

};
