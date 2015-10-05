// requires
var _  = require('underscore');


/**
 * いち商品のコンストラクタ。
 * @private
 * @constructor
 * @see CommodityCollection#createItems
 */
var Commodity = function (data) {

	/**
	 * 生成時に渡されたデータを保持する。
	 * @readonly
	 * @type {array}
	 */
	this._data = data;

	/**
	 * 各情報を保持する。
	 * @namespace
	 * @todo タイトル行でも使うものもあるから一部別にした方がいいかも。
	 */
	this.attributes = {

		/**
		 * 表示項目タイプ。
		 * @type {string}
		 *     Makeleaps: normal|simple|text
		 */
		view_type: 'normal',

		/**
		 * 商品コード。
		 * @type {string}
		 */
		code: null,

		/**
		 * 項目名。
		 * @type {string}
		 */
		name: null,

		/**
		 * 単価。
		 * @type {number}
		 */
		unit_price: 0,

		/**
		 * 数量。
		 * @type {number}
		 */
		quantity: 0,

		/**
		 * 単位。
		 * @type {string}
		 */
		unit_name: null,

		/**
		 * 金額。
		 * @type {number}
		 */
		price: 0,

		/**
		 * 消費税タイプ。
		 * @type {string}
		 */
		sales_tax_type: null

	};


	this._initialize();

};


(function (fn) { // prototype shortcut

	/**
	 * 初期化処理。
	 * @requires ._data
	 * @see Commodity
	 */
	fn._initialize = function () {

		// for Makeleaps
		// 見出し行なら 'simple'
		this.attributes.view_type = 'normal';

		this.attributes.name = this._data.title;

		/** @todo 基本的にpt制なので単価は取り合えず固定。
		 *     ptじゃないとき用に今後対応が必要。 */
		this.attributes.unit_price = 30000;

		this.attributes.quantity = this._data.estimate || 0;

		this.attributes.unit_name = 'pt';

		this.attributes.price = this.attributes.unit_price * this.attributes.quantity;

		// for Makeleaps
		this.attributes.sales_tax_type = '消費税込み';

	};

})(Commodity.prototype);




/**
 * 商品のコレクションのコンストラクタ。
 * @constructor
 * @param {array} data issues
 */
var CommodityCollection = function (data) {

	/**
	 * 生成時に渡されたデータを保持する。
	 * @readonly
	 * @type {array}
	 */
	this._data = data;

	/**
	 * @type {array} array of Commodity instance
	 * @see #_initialize
	 * @see Commodity
	 */
	this.items = null;


	this._initialize();

};


(function (fn) {

	/**
	 * 初期化処理。
	 * @requires #createItems
	 */
	fn._initialize = function () {

		this.items = this.createItems();

	};


	/**
	 * 各商品のインスタンスを作って返す。
	 * @requires Commodity
	 * @requires ._data
	 * @return {array}
	 * @see #_initialize
	 */
	fn.createItems = function () {

		return _.map(this._data, function (item) {
			return new Commodity(item);
		}.bind(this));

	};

})(CommodityCollection.prototype);


module.exports = CommodityCollection;
