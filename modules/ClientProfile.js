// requires
var _  = require('underscore');


/**
 * いちクライアント情報のコンストラクタ。
 * @constructor
 * @todo とりあえず固定にしといて、あとでなんとかしたい。
 */
var ClientProfile = function () {

	/**
	 * 各情報を保持する。
	 * @namespace
	 */
	this.attributes = {

		/**
		 * クライアント名
		 * @type {string}
		 */
		name: '株式会社クライアント',

		/**
		 * クライアント住所タイプ。
		 * @type {string}
		 */
		address_type: 'jp_default',

		/**
		 * クライアント国名。
		 * @type {string}
		 */
		country_name: 'JP',

		/**
		 * クライント郵便番号。
		 * @type {string} 000-0000
		 */
		zip_code: '000-0000',

		/**
		 * クライアント県名。
		 * @type {string}
		 */
		prefecture_name: '東京都',

		/**
		 * クライアント市区町村。
		 * @type {string}
		 */
		address_1: 'ほげ区ほげほげ',

		/**
		 * クライアント番地。
		 * @type {string}
		 */
		address_2: '1-1-1',

		/**
		 * クライアントマンション・ビル名。
		 * @type {string}
		 */
		address_3: 'ほげタワー 99F',

		/**
		 * クライアント電話番号。
		 * @type {string}
		 */
		tel_number: '03-0000-0000',

		/**
		 * クライアントEメールアドレス。
		 * @type {string}
		 */
		email_address: 'client@example.com',

		/**
		 * クライアントEメールCcアドレス。
		 * @type {string}
		 */
		email_cc_address: '',

		/**
		 * クライアント担当者部門名。
		 * @type {string}
		 */
		department_name: 'ほげほげ部署',

		/**
		 * クライアント担当者肩書。
		 * @type {string}
		 */
		managerial_post_name: '',

		/**
		 * クライアント担当者名。
		 * @type {string}
		 */
		person_in_charge_name: '苦来　庵人'

	};

};


module.exports = ClientProfile;
