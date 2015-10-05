

var sinon = require('sinon');
var expect = require('expect.js');
var fs = require('fs');

var app = require('../formalizeIssuesJson.js');
var utils = app.utils;


describe('utils', function () {


	describe('.readFileSync', function () {

		var file_path = './json/issues.json';


		it('同期処理でファイルを読み込むこと', function () {

			var stub = sinon.stub(fs, 'readFileSync', function () { });
			var res = utils.readFileSync(file_path);
			expect( stub.calledOnce ).to.be.ok();
			expect( stub.withArgs(file_path, 'utf8') ).to.be.ok();
			stub.restore();

		});


		it('文字列が返ること', function () {

			var res = utils.readFileSync(file_path);
			expect( res ).to.be.a('string');

		});


	});


	describe('.readJsonSync', function () {

		var file_path = './json/issues.json';

		it('.readFileSyncを呼ぶこと', function () {

			var spy = sinon.spy(utils, 'readFileSync');
			var res = utils.readJsonSync(file_path);
			expect( spy.calledOnce ).to.be.ok();
			spy.restore();

		});


		it('JSON.parseを呼ぶこと', function () {

			var spy = sinon.spy(JSON, 'parse');
			var res = utils.readJsonSync(file_path);
			expect( spy.calledOnce ).to.be.ok();
			spy.restore();

		});

	});


});
