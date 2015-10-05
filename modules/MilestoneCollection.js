// requires
var _  = require('underscore');



/**
 * マイルストーンのコレクションのコンストラクタ。
 * @constructor
 * @param {json object} data
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
	 */
	this.formalizedData = this._formalize(this._data);

};


(function (fn) {


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
