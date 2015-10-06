// requires
var _  = require('underscore');


/**
 * マイルストーンのコレクションのコンストラクタ。
 * @constructor
 * @param {json object} data
 * @see Data
 * @see Data.milestones
 * @see Data#fetch
 */
var MilestoneCollection = function (data) {

	/**
	 * 生成時に渡されたデータを保持する。
	 * @readonly
	 * @type {json object}
	 */
	this._data = data;


	/**
	 * マイルストーンごとに並び替えたデータ。
	 * @type {object}
	 * @requires #_formalize
	 * @todo いちマイルストーンごとのコンストラクタを用意して、インスタンス群を
	 *     .items に格納する形にしてもよいかもしれない。
	 */
	this.formalizedData = this._formalize(this._data);

};


(function (fn) { // prototype shortcut

	/**
	 * JSON形式のオブジェクトをマイルストーンごとに並び替えたグループのオブジェ
	 * クトにして返す。
	 * @param {json object} data
	 * @see .formalizedData
	 */
	fn._formalize = function (data) {

		var milestonesGrp = _.groupBy(data, function (issue) {
			if (!issue.milestone) {
				return issue.milestone;
			}

			return issue.milestone.id;
		});

		return _.map(milestonesGrp, function (issues, milestone_id) {
			return {
				attributes: issues[0].milestone,
				issues: issues
			};
		});

	};


	/**
	 * マイルストーン名が一致するマイルストーンを返す。
	 * @param {string} title マイルストーン名
	 * @return {object}
	 * @requires .formalizedData
	 * @see ../run.js
	 */
	fn.getMilestoneByTitle = function (title) {

		return _.find(this.formalizedData, function (milestone) {
			/** @todo milestoneもコンストラクタ作ってgetで取ってくる的にした方が
			 * いいかもしれない。isseeのデータをどうのこうのするようになったら、
			 * でいいかも。 */
			return milestone.attributes.title === title;
		});

	};

})(MilestoneCollection.prototype);


module.exports = MilestoneCollection;
