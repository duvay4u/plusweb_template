///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// app-factory.js
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


//
// -- require --
//
const express = require( 'express' );
const path = require( 'path' );

const cookieParser = require( 'cookie-parser' );// cookie 모듈


module.exports = ( app, subdomain ) => {


	//
	// -- config 로딩 --
	//
	const config = require( './config/config' );
	app.set( 'config', config );


	//
	// -- log4js 설정 로딩 --
	//
	const logger = require( './init/logger' );
	app.set( 'logger', logger );


	//
	// -- view engine setup -- : ejs view 엔진 설정
	//
	app.set( 'views', path.join( __dirname, 'views' ) );// views 명칭은 변경하면 안됨
	app.set( 'view engine', 'ejs' );


	//
	// -- 미들웨어 등록 --
	//
	app.use( cookieParser() );
	app.use( express.json() );// express 모듈안에서 이전에 bundle로 제공되던 body-parser 모듈 포함됨 - express v4.16.0
	app.use( express.urlencoded( { extended: false } ) );


	return app;
}
