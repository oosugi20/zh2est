#!/usr/bin/env node

/*!
 * 実行用ファイル。
 * 各種必要なインスタンスを実行時の引数を渡して作成し、CSVファイルを書き出す。
 *
 * 1. 必要なモジュールの読み込み
 * 2. 実行時に渡された引数から必要な情報を各種変数に保持
 * 3. 引数に渡されたファイルパスからJSONデータを取り扱うインスタンスを作成
 * 4. 3を利用して見積書データを取り扱うインスタンスを作成
 * 4. 4を利用してCSVのためのテーブルデータを扱うインスタンスを作成
 * 5. 5のメソッドを利用してCSVファイルを書き出し
 */

// require modules
var Data     = require('./modules/Data.js');
var Estimate = require('./modules/Estimate.js');
var Table    = require('./modules/TableForMakeleaps.js');


// 必要な情報を変数に保持
var file_path       = process.argv[2];
var milestone_title = process.argv[3];
var write_file_path = 'dist/' + milestone_title + '.csv';



/**
 * データを取り扱うインスタンスを作成して保持する。
 * new と同時に読み込みも行う。
 * 見積書データのインスタンスを作成するために必要。
 * @type {Data}
 * @requires file_path
 * @see Estimate
 */
var data = new Data({
	file_path: file_path
});


/**
 * 見積書データを取り扱うインスタンスを作成して保持する。
 * CSV書き出しのためのテーブルデータを取り扱うインスタンスを作成するために必要。
 * @type {Estimate}
 * @requires data
 * @requires data.milestones#getMilestoneByTitle
 * @requires milestone_title
 * @see Table
 */
var estimate = new Estimate(
	data.milestones.getMilestoneByTitle(milestone_title)
);


/**
 * 最終的にCSVに書き出すためにテーブルとしてデータを取り扱うためのインスタンスを
 * 作成して保持する。
 * @type {Table}
 * @requires estimate
 */
var table = new Table(estimate);


// MakeleapsのCSV形式で書き出し
table.writeFileSync(write_file_path);


console.log('create!: ' + write_file_path);
