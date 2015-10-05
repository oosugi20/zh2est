var _ = require('underscore');
var fs = require('fs');




/**
 * @constructor
 * @param {Estimate} model
 */
var Table = function (model) {

	this.model = model;

	this.rows = [];

	this._create();

};


(function (fn) {



	var headerRow = (function () {
		var COL_SRC = '行形式	書類番号	発行日	クライアント名	クライアント住所形式	クライアント国名	クライアント郵便番号	クライアント県名	クライアント市区町村	クライアント番地	クライアントマンション・ビル名	クライアント電話番号	クライアントEメール(to)	クライアントEメール(cc)	クライアント担当者部門	クライアント担当者肩書	クライアント担当者	項目タイプ	商品コード	項目名	項目単価	項目数量	項目単位	項目金額	項目消費税対象	項目消費税込み	項目源泉税対象	小計	消費税率	消費税	源泉税	合計金額	通貨	支払日	送信日	振込先タイトル	振込先	件名	備考	メモ	タグ	テンプレート	支払期限	有効期限	納品日	但し';
		var cols = COL_SRC.split(/\t/);
		var length = cols.length;

		return {
			cols: cols,

			length: length,

			indexOf: function (string) {
				return _.indexOf(this.cols, string);
			}
		};
	})();


	fn.writeFileSync = function (write_file_name) {

		var string = this.getCSVString();

		fs.writeFileSync(write_file_name, string);

	};


	/**
	 * @todo エスケープ処理
	 **/
	fn.getCSVString = function () {

		var rows = _.map(this.rows, function (cols) {
			/** @todo ダブルクオート括り */
			return cols.join(',');
		});


		return rows.join('\r\n');

	};


	fn._create = function () {

		this.rows[0] = headerRow.cols;

		// TODO ここに見積書の行
		this.rows.push(this._createEstimateRow());

		_.each(this.model.commodities.items, function (commodity) {
			this.rows.push(this._createCommodityRow(commodity));
		}.bind(this));

	};


	/**
	 * @todo もうちょいきれいに
	 **/
	fn._createEstimateRow = function () {

		var cols = new Array(headerRow.length);
		var attrs = this.model.attributes;
		var client = this.model.clientProfile.attributes;

		cols[headerRow.indexOf('行形式')] = attrs.type;
		cols[headerRow.indexOf('書類番号')] = attrs.id;
		cols[headerRow.indexOf('発行日')] = attrs.issueDate;

		cols[headerRow.indexOf('クライアント名')] = client.name;
		cols[headerRow.indexOf('クライアント住所形式')] = client.address_type;
		cols[headerRow.indexOf('クライアント国名')] = client.country_name;
		cols[headerRow.indexOf('クライアント郵便番号')] = client.zip_code;
		cols[headerRow.indexOf('クライアント県名')] = client.prefecture_name;
		cols[headerRow.indexOf('クライアント市区町村')] = client.address_1;
		cols[headerRow.indexOf('クライアント番地')] = client.address_2;
		cols[headerRow.indexOf('クライアントマンション・ビル名')] = client.address_3;
		cols[headerRow.indexOf('クライアント電話番号')] = client.tel_number;
		cols[headerRow.indexOf('クライアントEメール(to)')] = client.email_address;
		cols[headerRow.indexOf('クライアントEメール(cc)')] = client.email_cc_address;
		cols[headerRow.indexOf('クライアント担当者部門')] = client.department_name;
		cols[headerRow.indexOf('クライアント担当者肩書')] = client.managerial_post_name;
		cols[headerRow.indexOf('クライアント担当者')] = client.person_in_charge_name;

		cols[headerRow.indexOf('通貨')] = attrs.currency_type;

		return cols;

	};


	/**
	 * @todo もうちょいきれいに
	 **/
	fn._createCommodityRow = function (commodity) {

		var cols = new Array(headerRow.length);
		var attrs = commodity.attributes;


		cols[headerRow.indexOf('行形式')] = '項目';
		cols[headerRow.indexOf('書類番号')] = this.model.attributes.id;

		cols[headerRow.indexOf('項目タイプ')] = attrs.view_type;
		//cols[headerRow.indexOf('商品コード')] = '';
		cols[headerRow.indexOf('項目名')] = attrs.name;
		cols[headerRow.indexOf('項目単価')] = attrs.unit_price;
		cols[headerRow.indexOf('項目数量')] = attrs.quantity;
		cols[headerRow.indexOf('項目単位')] = attrs.unit_name;
		cols[headerRow.indexOf('項目金額')] = attrs.price;
		/** @todo ハードコーディングじゃなく */
		cols[headerRow.indexOf('項目消費税対象')] = 'TRUE';
		cols[headerRow.indexOf('項目消費税込み')] = 'FALSE';
		cols[headerRow.indexOf('項目源泉税対象')] = 'FALSE';

		return cols;

	};


})(Table.prototype);


module.exports = Table;
