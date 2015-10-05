/*!
 * @requires underscore
 */
(function (global) {
'use strict';


// requires
var _  = require('underscore');
var fs = require('fs');


var MilestoneCollection = require('./modules/MilestoneCollection.js');
var CommodityCollection = require('./modules/CommodityCollection.js');


/**
 * @namespace
 */
var app = {};


/**
 * @namespace
 */
var utils = {};




/**
 * 同期処理でファイルを読み込み文字列で返す。
 *
 * @memberof utils
 *
 * @requires fs
 *
 * @param  {string} file_path
 * @return {string}
 */
utils.readFileSync = function (file_path) {

	return fs.readFileSync(file_path, 'utf8');

};


/**
 * 同期処理でJSONファイルを読み込み、オブジェクトで返す。
 *
 * @memberof utils
 *
 * @requires .readFileSync
 *
 * @param  {string}      file_path
 * @return {json object}
 */
utils.readJsonSync = function (file_path) {

	var text = this.readFileSync(file_path);

	/** @todo jsonのパースエラー時の処理 */
	return JSON.parse(text);

};





/**
 * @constructor
 */
var Model = function (options) {

	this.options = _.extend({
		file_path: ''
	}, options);


	this.initialize();

};

(function (fn) {

	/**
	 * @memberof Model
	 */
	fn.initialize = function () {

		this.fetch();

		this.milestones = new MilestoneCollection(this._rowData);

	};


	/**
	 * @memberof Model
	 */
	fn.fetch = function () {

		this._rowData = utils.readJsonSync(this.options.file_path);

	};


})(Model.prototype);


/**
 * いちクライアント情報のコンストラクタ。
 * @constructor
 * @todo とりあえず固定にしといて、あとでなんとかしたい。
 */
var ClientProfile = function () {

	/**
	 * 各情報を保持する。
	 * @namespace
	 */
	this.attributes = {

		/**
		 * クライアント名
		 * @type {string}
		 */
		name: '株式会社クライアント',

		/**
		 * クライアント住所タイプ。
		 * @type {string}
		 */
		address_type: 'jp_default',

		/**
		 * クライアント国名。
		 * @type {string}
		 */
		country_name: 'JP',

		/**
		 * クライント郵便番号。
		 * @type {string} 000-0000
		 */
		zip_code: '000-0000',

		/**
		 * クライアント県名。
		 * @type {string}
		 */
		prefecture_name: '東京都',

		/**
		 * クライアント市区町村。
		 * @type {string}
		 */
		address_1: 'ほげ区ほげほげ',

		/**
		 * クライアント番地。
		 * @type {string}
		 */
		address_2: '1-1-1',

		/**
		 * クライアントマンション・ビル名。
		 * @type {string}
		 */
		address_3: 'ほげタワー 99F',

		/**
		 * クライアント電話番号。
		 * @type {string}
		 */
		tel_number: '03-0000-0000',

		/**
		 * クライアントEメールアドレス。
		 * @type {string}
		 */
		email_address: 'client@example.com',

		/**
		 * クライアントEメールCcアドレス。
		 * @type {string}
		 */
		email_cc_address: '',

		/**
		 * クライアント担当者部門名。
		 * @type {string}
		 */
		department_name: 'ほげほげ部署',

		/**
		 * クライアント担当者肩書。
		 * @type {string}
		 */
		managerial_post_name: '',

		/**
		 * クライアント担当者名。
		 * @type {string}
		 */
		person_in_charge_name: '苦来　庵人'

	};

};


/**
 * いち書類のコンストラクタ。
 * このコンストラクタを元に見積書や請求書を作る。
 * @constructor
 * @todo RowForMakeleapsにも重複があるからなんとかする。
 */
var Doc = function (attributes) {

	this.attributes = _.extend({
		/**
		 * 書類タイプ。
		 * @type {string}
		 *     Makeleaps: 見積書|請求書
		 */
		type: null,

		/**
		 * 書類ID。
		 * @type {string}
		 *     Makeleaps: 半角英数字。 ex. SP102
		 */
		id: null,

		/**
		 * 発行日。
		 * @type {string}
		 *     Makeleaps: yyyy/mm/dd
		 */
		issueDate: null,

		/**
		 * 小計。
		 * @type {number}
		 */
		subtotal: 0,

		/**
		 * 消費税金額。
		 * @type {number}
		 */
		sales_tax_amount: 0,

		/**
		 * 合計金額。
		 * @type {number}
		 * @todo 源泉税
		 */
		total: this.subtotal + this.sales_tax_amount,

		/**
		 * 通過タイプ。
		 * @type {string}
		 */
		currency_type: 'JPY',

		/**
		 * 支払日。
		 * @type {string}
		 */
		paymentDate: null,

		/**
		 * 送信日。
		 * @type {string}
		 */
		sentDate: null,

		/**
		 * 振込先。
		 * @type {string}
		 */
		name: null,

		/**
		 * 件名。
		 * @type {string}
		 */
		subject: null,

		/**
		 * 備考。
		 * @type {string}
		 */
		remarks_text: null,

		/**
		 * メモ。
		 * @type {string}
		 */
		memo: null,

		/**
		 * タグ。
		 * @type {string}
		 */
		tag: null,

		/**
		 * テンプレートタイプ。
		 */
		template_type: 'ja_JP_pro_2',

		/**
		 * 期限日。
		 * 見積書の場合: 有効期限日。
		 * 請求書の場合: 支払期限日。
		 * @type {string}
		 *     Makeleaps: yyyy/mm/dd
		 */
		expirationDate: null,

		/**
		 * 納品日。
		 * @type {string}
		 */
		deliveryDate: null

	}, attributes);


	this.clientProfile = new ClientProfile();

};


/**
 * いち見積書のコンストラクタ。
 * @constructor
 * @param {object} milestone
 */
var Estimate = function (milestone) {

	this.milestone = milestone;


	/** @todo prototypeの作り方悪いかも。こうしないとattributesがprototypeに入っ
	* たまま */
	this.attributes = this.attributes;


	/**
	 * 商品のコレクション。
	 * @type {CommodityCollection}
	 */
	this.commodities = new CommodityCollection(this.milestone.issues);


	/** @todo 商品のコレクション作る */
	/** @todo 見出し行作る */
	// ひとまず並列に商品を並べて作ってみる。
	// その後、階層化やHTML/CSS、JavaScriptなどの分類的な階層にとりかかる。
	//
	/** @todo 外注費計算ように、issueのassign見てどうのこうのする。*/

	// とりあえずは、実行時に、どのマイルストーンか指定すればいいかも


	this._initialize();

};


Estimate.prototype = _.extend(Estimate.prototype, new Doc({

	type: '見積書'

}), {

	/**
	 * 初期化処理。
	 */
	_initialize: function () {

		/** @todo レポジトリ名とかdescriptionとかも持ってきた方がいいかも。
		 * issueにrepo_name入ってるから、milestoneをインスタンスにして、、、 */
		this.attributes.subject = this.milestone.attributes.title;

		this.attributes.id = 'ZH' + this.milestone.attributes.id;

		this.attributes.issueDate = (function () {
			var today = new Date();

			return [
				today.getFullYear(),
				today.getMonth() + 1,
				today.getDate()
			].join('/');
		})();


		/** @todo この辺任意項目だから空にしたら自動で入る？ */
		//this.attributes.subtotal = this._calculateSubtotal();
		this.attributes.subtotal = '';
		this.attributes.sales_tax_amount = '';
		this.attributes.total = '';

	}

	///**
	// * 小計を計算して返す。
	// * @return {number}
	// */
	//_calculateSubtotal: function () {

	//	var subtotal = 0;

	//	_.each(this.commodities.items, function (commodity) {
	//		subtotal += commodity.attributes.price;
	//	});

	//	return subtotal;
	//}

});



/**
 * いち請求書のコンストラクタ。
 * @constructor
 */
var Bill = function () {

	// 請求書はMakeleapsで見積書から変換できるから、、、

	/** @todo 簡易項目に設定する */

};


Bill.prototype = _.extend(Bill.prototype, new Doc({
	type: '請求書'
}), {});





app.Model = Model;
app.Estimate = Estimate;

app.Table = require('./modules/TableForMakeleaps.js');

app.utils = utils;


module.exports = app;

})(this);
