///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// config > config.js
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


require( 'dotenv' ).config();


const config = {};
config.db = {

	// 개발셋팅
	host : process.env.DB_HOST
,	port : process.env.DB_PORT
,	user : process.env.DB_USER
,	password : process.env.DB_PASSWORD
,	database : process.env.DB_DATABASE
,	connectionLimit : 30	// 기본값 10
};


module.exports = config;
