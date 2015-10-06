// requires
var _ = require('underscore');
var fs = require('fs');


/**
 * Makeleaps用テーブルデータのコンストラクタ。
 * @constructor
 * @param {Estimate} model
 * @see ../run.js
 */
var Table = function (model) {

	/**
	 * 引数に渡されたモデルを保持する。
	 * @type {Estimate}
	 * @see #_create
	 * @see #_createEstimateRow
	 * @see #_createCommodityRow
	 */
	this.model = model;

	/**
	 * Arrayでテーブルデータを保持する。
	 * @type {array}
	 * @see #getCSVString
	 * @see #_create
	 */
	this.rows = this._create();

};


(function (fn) { // prototype shortcut

	/**
	 * ヘッダー行
	 * @private
	 */
	var headerRow = (function () {
		/** @todo テンプレートCSVとかを読み込む形にする */
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


	/**
	 * 同期処理でデータからCSV形式のファイルで書き出す。
	 * @param {string} write_file_name
	 * @requires #getCSVString
	 * @see ../run.js
	 */
	fn.writeFileSync = function (write_file_name) {

		var string = this.getCSVString();

		fs.writeFileSync(write_file_name, string);

	};


	/**
	 * Array形式のテーブルデータをCSV形式のStringに変換して返す。
	 * @see #writeFileSync
	 * @todo エスケープ処理
	 **/
	fn.getCSVString = function () {

		var rows = _.map(this.rows, function (cols) {
			/** @todo ダブルクオート括り */
			return cols.join(',');
		});


		return rows.join('\r\n');

	};


	/**
	 * 行データを作成して返す。
	 * @return {array} 行データ
	 * @requires headerRow.cols
	 * @requires #_createEstimateRow
	 * @requires .model.commodities.items
	 * @requires #_createCommodityRow
	 * @see CommodityCollection
	 * @see Commodity
	 */
	fn._create = function () {

		var rows = [];

		// ヘッダー行を追加
		rows[0] = headerRow.cols;

		// 見積書用の最初の行
		rows[1] = this._createEstimateRow();

		// 各見積書項目行
		_.each(this.model.commodities.items, function (commodity) {
			rows.push(this._createCommodityRow(commodity));
		}.bind(this));

		return rows;

	};


	/**
	 * ヘッダー列数分の空の値を返す。
	 * 行作成時に必要な空の列群。
	 * @return {array}
	 * @requires headerRow.length
	 * @see #_createEstimateRow
	 */
	fn._createEmptyCols = function () {

		return new Array(headerRow.length);

	};


	/**
	 * 引数に指定された列名から列のindexを返す。
	 * @param {string} col_name 列の名前
	 * @return {number} 列のindex
	 * @requires headerRow.indexOf
	 * @see #_createEstimateRow
	 * @see #_createCommodityRow
	 */
	fn.getColIndexOf = function (col_name) {

		return headerRow.indexOf(col_name)

	};


	/**
	 * 見積書用の最初の行の列を作成して返す。
	 * @return {array} 列の配列。
	 * @requires #_createEmptyCols
	 * @requires .model.attributes
	 * @requires .model.clientProfile.attributes
	 * @requires #getColIndexOf
	 * @see #_create
	 * @todo もうちょいきれいに
	 **/
	fn._createEstimateRow = function () {

		var cols = this._createEmptyCols();
		var attrs = this.model.attributes;
		var client = this.model.clientProfile.attributes;

		cols[this.getColIndexOf('行形式')] = attrs.type;
		cols[this.getColIndexOf('書類番号')] = attrs.id;
		cols[this.getColIndexOf('発行日')] = attrs.issueDate;

		cols[this.getColIndexOf('クライアント名')] = client.name;
		cols[this.getColIndexOf('クライアント住所形式')] = client.address_type;
		cols[this.getColIndexOf('クライアント国名')] = client.country_name;
		cols[this.getColIndexOf('クライアント郵便番号')] = client.zip_code;
		cols[this.getColIndexOf('クライアント県名')] = client.prefecture_name;
		cols[this.getColIndexOf('クライアント市区町村')] = client.address_1;
		cols[this.getColIndexOf('クライアント番地')] = client.address_2;
		cols[this.getColIndexOf('クライアントマンション・ビル名')] = client.address_3;
		cols[this.getColIndexOf('クライアント電話番号')] = client.tel_number;
		cols[this.getColIndexOf('クライアントEメール(to)')] = client.email_address;
		cols[this.getColIndexOf('クライアントEメール(cc)')] = client.email_cc_address;
		cols[this.getColIndexOf('クライアント担当者部門')] = client.department_name;
		cols[this.getColIndexOf('クライアント担当者肩書')] = client.managerial_post_name;
		cols[this.getColIndexOf('クライアント担当者')] = client.person_in_charge_name;

		cols[this.getColIndexOf('通貨')] = attrs.currency_type;

		return cols;

	};


	/**
	 * 見積書の各項目行の列を作成して返す。
	 * @requires #_createEmptyCols
	 * @requires .model.attributes.id
	 * @requires #getColIndexOf
	 * @see #_create
	 * @todo もうちょいきれいに
	 **/
	fn._createCommodityRow = function (commodity) {

		var cols = this._createEmptyCols();
		var attrs = commodity.attributes;

		cols[this.getColIndexOf('行形式')] = '項目';
		cols[this.getColIndexOf('書類番号')] = this.model.attributes.id;

		cols[this.getColIndexOf('項目タイプ')] = attrs.view_type;
		//cols[this.getColIndexOf('商品コード')] = '';
		cols[this.getColIndexOf('項目名')] = attrs.name;
		cols[this.getColIndexOf('項目単価')] = attrs.unit_price;
		cols[this.getColIndexOf('項目数量')] = attrs.quantity;
		cols[this.getColIndexOf('項目単位')] = attrs.unit_name;
		cols[this.getColIndexOf('項目金額')] = attrs.price;
		/** @todo ハードコーディングじゃなく */
		cols[this.getColIndexOf('項目消費税対象')] = 'TRUE';
		cols[this.getColIndexOf('項目消費税込み')] = 'FALSE';
		cols[this.getColIndexOf('項目源泉税対象')] = 'FALSE';

		return cols;

	};

})(Table.prototype);


module.exports = Table;
