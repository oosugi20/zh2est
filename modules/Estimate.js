var _  = require('underscore');


var CommodityCollection = require('./CommodityCollection.js');
var DocFormat = require('./DocFormat.js');


/**
 * いち見積書のコンストラクタ。
 * @constructor
 * @param {object} milestone
 */
var Estimate = function (milestone) {

	/**
	 * 引数に渡されたいちマイルストーンのデータを保持する。
	 * @type {json object}
	 */
	this.milestone = milestone;


	/**
	 * 各種属性値を保持する。
	 * @type {object}
	 * @todo prototypeの作り方悪いかも。こうしないとattributesがprototypeに入っ
	 * たまま
	 */
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


Estimate.prototype = _.extend(Estimate.prototype, new DocFormat({

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


module.exports = Estimate;
