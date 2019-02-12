///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// init > route-loader-www.js
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


class RouteLoaderWWW {

	constructor( app ) {

		this.app = app;
	}

	init() {

		// Route 등록
		let indexRouter = require( '../route/www/index' );// 2곳 적용함에 따라 변수 생성 후 적용
		this.app.use( '/', indexRouter );
		this.app.use( '/index', indexRouter );
	}
}


module.exports = ( app ) => {

	let routerLoaderWWW = new RouteLoaderWWW( app );
	routerLoaderWWW.init();

	return routerLoaderWWW;
}
