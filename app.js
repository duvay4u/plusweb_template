///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.js
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


//
// -- require --
//
const express = require( 'express' );
const path = require( 'path' );

const vhost = require( 'vhost' );// main, sub domain 관리를 위한 모듈
const createError = require( 'http-errors' );// error 생성 모듈


//
// -- express 객체 생성 --
//
const app = require( './app-factory' )( express(), false );
const app_www = require( './app-factory' )( express(), true );
const app_dev = require( './app-factory' )( express(), true );


//
// -- static 경로 설정 --
//
if( 'development' == process.env.NODE_ENV ) {

	app.get( 'logger' ).trace( 'set - development static public virtual directory' );
	app.use( '/public', express.static( path.join( __dirname, 'public' ) ) );// public
}


//
// -- vhost 설정 -- : main, sub domain
//
app.use( vhost( process.env.DOMAIN_MAIN, app_www ) );// www.localhost.net
app.use( vhost( process.env.DOMAIN_WWW, app_www ) );// www.localhost.net
app.use( vhost( process.env.DOMAIN_DEV, app_dev ) );// dev.localhost.net


//
// -- Route 객체 생성, 등록 --
//
const routerLoaderWWW = require( './init/route-loader-www' )( app_www );
app_www.set( 'routerLoaderWWW', routerLoaderWWW );

const routerLoaderDEV = require( './init/route-loader-dev' )( app_dev );
app_dev.set( 'routerLoaderDEV', routerLoaderDEV );


//
// -- catch 404 and forward to error handler -- : 상위 라우터에 해당되지 않고 이곳으로 진입한 것은 404
//
app.use( ( req, res, next ) => {

	next( createError( 404 ) );// error 객체를 생성 후 next 진행
});


//
// -- error handler -- : 에러 핸들러는 err 매개변수가 추가된 것임 
// -- 404 not-found 경우와 500 server error 전달됨 --
//
app.use( ( err, req, res, next ) => {

	// response status 설정
	res.status( err.status || 500 );

	if( 'development' == process.env.NODE_ENV ) {

		// res.locals 객체에 메세지 등의 내용을 설정 -> view 엔진(ejs)에서 사용
		res.locals.message = err.message;
		res.locals.error = err;

		// render the error page
		res.render( 'error' );

	} else {

		if( 404 == err.status ) {

			res.send( "404 NOT FOUND" );
			// to-do : 404 페이지 만들어서 res.render(404페이지) 처리할 것

		} else {

			res.send( "500 Server Error" );
			// to-do : 500 페이지 만들어서 res.render(500페이지) 처리할 것
		}
	}

	// 500 에러 내용 기록 - 404 로 전달된 경우가 아닌 경우
	if( 404 != err.status ) {

		app.get( 'logger' ).error( err.stack );
	}
});


//
// -- export 선언 --
// 
module.exports = app;
