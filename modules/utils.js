// requires
var _  = require('underscore');
var fs = require('fs');


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


module.exports = utils;
