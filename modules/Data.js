// requires
var _  = require('underscore');
var fs = require('fs');


var utils = require('./utils.js');
var MilestoneCollection = require('./MilestoneCollection.js');


/**
 * JSONデータを取り扱うためのコンストラクタ。
 * @constructor
 * @see ../run.js
 */
var Data = function (options) {

	/**
	 * オプションを保持する。
	 */
	this.options = _.extend({
		file_path: ''
	}, options);

	/**
	 * fetchした加工前のJSONデータを保持する。
	 * これを元に各コレクションのインスタンスを作成していく。
	 * @type {json object}
	 * @see #fetch
	 * @see #_initialize
	 */
	this._rowData = null;


	/**
	 * JSONデータ作成したマイルストーンのコレクションを保持する。
	 * @type {MilestoneCollection}
	 * @see MilestoneCollection
	 * @see #_initialize
	 */
	this.milestones = null;


	this._initialize();

};

(function (fn) { // prototype shortcut

	/**
	 * 初期化処理を行う。
	 * @requires #fetch
	 * @requires MilestoneCollection
	 */
	fn._initialize = function () {

		this.fetch();

		this.milestones = new MilestoneCollection(this._rowData);

	};


	/**
	 * JSONデータを読みだして ._rowData に格納する。
	 * インスタンス作成時に渡されたファイルパスのJSONを読みに行く。
	 * @requires utils.readJsonSync
	 * @requires .options.file_path
	 */
	fn.fetch = function () {

		var file_path = this.options.file_path;

		this._rowData = utils.readJsonSync(file_path);

	};

})(Data.prototype);


module.exports = Data;
