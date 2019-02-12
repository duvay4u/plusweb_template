///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// init > logger.js
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


const log4js = require( 'log4js' );


// log4js 설정
log4js.configure({

	appenders : {

		// 로그상에 날짜가 [2019-01-23T23:29:59.583] 표시방식 수정
		// format.ISO8601_FORMAT - 2017-03-14T14:10:20.391 (local time used)
		//
		//weblog : { type: 'dateFile', filename: 'debug.log', pattern: '.yyyy-MM-dd'/*, compress: true*/ }
		weblog : {

			type : 'dateFile'// 날짜별로 로그파일을 생성
		//,	filename : 'debug.log'
		,	filename : './.log/debug.log'
		,	layout : {
					type : 'pattern',
					pattern : '[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] %m'
			}
		}
	}

,	categories : {

		default : { appenders: [ 'weblog' ], level: 'trace' }
	}
});

const logger = log4js.getLogger( 'weblog' );

//logger.trace( 'trace메세지' );
//logger.debug( 'debug메세지' );
//logger.info( 'info메세지' );
//logger.warn( 'warn메세지' );
//logger.error( 'error메세지' );
//logger.fatal( 'fatal메세지' );

module.exports = logger;
