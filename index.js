/**
 * 
 * fastify는 옵션으로 json 스키마를 검증하는 기능을 내장하고 있습니다.
 * 따라서 스키마 검증은 따로 작성합니다.
 * 서버 사이드 랜더링은 사용하지 않습니다. 
 * return은 json형식만 반환합니다.
 * 
 */

// DB
// import mongoose from 'mongoose';
// import fastifyCookie from 'fastify-cookie';
// import fastifySession from 'fastify-session';
// import fastifyPassport from "fastify-passport";
// import fastifySecureSession from "fastify-secure-session";

// 커스텀 라우터 선언
import concertRouter from './router/concertRouter';
import ticketRouter from './router/ticketRouter';
// import lesseeRouter from './router/lesseeRouter';
// import shopRouter from './router/shopRouter';
// import apiCallRouter from './router/apiCallRouter';

// import multer from 'fastify-multer';
// import fastifyWs from 'fastify-websocket';

// import fs from 'fs';
// import path from 'path';

// require('dotenv').config();

/**
 * 서버 생성
 * 
 * @logger      log를 출력하는지에 대한 여부
 * @level       logger가 출력하는 로그의 레벨을 지칭함
 * @prettyPrint logger가 한줄로만 출력되서 예쁘게 출력해 주는 아이
 * @trustProxy  프록시를 신뢰해주는 아이 
 */
const fastify = require('fastify')({ 
  logger: {
    level: 'info',//info, error, debug, fatal, warn, trace, child
    prettyPrint : true, //에러로그를 pretty 하게 출력하는 놈 // npm install pino-pretty 필요
  },
  trustProxy: true,
});

// fastify.register(multer.contentParser);

fastify.register(require('fastify-cors'), { 
  credentials: true,
  // origin: "http://localhost:3000",
  origin: "http://www.tget.co.kr",
});



// fastify.register(fastifyCookie);
// fastify.register(fastifySession, {
//   secret: 'asdasdasdasdasdasdasdasdasdasdvsdsvsbdsbsbddsdsdas',
//   cookie: {
//     secure: false,
//     httpOnly: false, 
//     sameSite: 'None',
//   },
//   saveUninitialized: false,
//   resave: false,
//   credentials: true,
//   // expires: 1000000000,
// });


// listen port
const PORT = 8080;
// listen host
const HOST = '0.0.0.0';

// mongoose.set('useCreateIndex', true);
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,  useUnifiedTopology: true  });

// var db = mongoose.connection;

// db.on('error', function(){
//     console.log('MongoDB connection failed!');
// });
// db.once('open', function(){
//     console.log('MongoDB connection success!');
// });

// 커스텀 라우터 등록
// fastify.get('/', (req, res) => {
//   res.type('text/html').send(html);
// })

concertRouter.forEach(route => {fastify.route(route);});
ticketRouter.forEach(route => {fastify.route(route);});
// lesseeRouter.forEach(route => {fastify.route(route);});
// shopRouter.forEach(route => {fastify.route(route);});
// apiCallRouter.forEach(route => {fastify.route(route);});

// const CLIENT = new Array();
// fastify.websocketServer.on('connection', function connection(ws) {
//   CLIENT.push(ws);
//   console.log(CLIENT.length);
//   console.log(this.websocketServer.clients)
// });

// Run the server!
const start = async () => {
  try {
    await fastify.listen(PORT, HOST);
    console.log(`connected at ${HOST}:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();