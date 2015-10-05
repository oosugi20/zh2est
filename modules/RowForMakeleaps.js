

/**
 * 各種属性のデフォルト値。
 * @readonly
 * @const
 */
var DEFAULT_ATTRIBUTES = {
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
	subtotal: null,

	/**
	 * 消費税金額。
	 * @type {number}
	 */
	sales_tax_amount: null,

	/**
	 * 合計金額。
	 * @type {number}
	 * @todo 源泉税
	 */
	total: null,

	/**
	 * 通過タイプ。
	 * @type {string}
	 */
	currency_type: null,

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
	template_type: null,

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

};



/**
 * Makeleaps用の行のコンストラクタ。
 * @constructor
 */
var RowForMakeleaps = function (attributes) {

	this.attributes = _.extend({}, DEFAULT_ATTRIBUTES);

};


(function (fn) {


})(RowForMakeleaps.prototype);


module.exports = RowForMakeleaps;
