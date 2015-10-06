// requires
var _  = require('underscore');


var DocFormat = require('./DocFormat.js');


/**
 * いち請求書のコンストラクタ。
 * @constructor
 */
var Bill = function () {

	// 請求書はMakeleapsで見積書から変換できるから、、、

	/** @todo 簡易項目に設定する */

};


Bill.prototype = _.extend(Bill.prototype, new DocFormat({
	type: '請求書'
}), {});


module.exports = Bill;

