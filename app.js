//------PATH--------//
// const path = require('path')

// const pathObj = path.parse(__filename);

// console.log(pathObj);

//-------OS--------//
// const os = require('os');

// const freeMemory = os.freemem();
// const totalMemory = os.totalmem();

// console.log('totMem:', totalMemory, 'freeMem:', freeMemory);

//-------FILE-SYSTEM-------//
// const fs = require('fs');
// const paths = fs.readdirSync('./')
// console.log('paths', paths);

// fs.readdir('JW3', (error, file) => {
//   if (error) console.log('error', error);
//   else console.log('file', file);
// });

//-------EVENT-EMITTER--------//
// const EventEmitter = require('events'); //event class
// const emitter = new EventEmitter(); // object

// emitter.on('loggedMessage', (arg) => {  //addListener  === on
//     console.log('logged emitter arg', arg);
// })

// emitter.emit('loggedMessage', {id: 1, url: 'https://root.png'})

// emitter.addListener('logging', (arg) => {
//   console.log('data from listener', arg);
// });
// const data = [
//   { id: 1, name: 'ena' },
//   { id: 2, name: 'akh' },
//   { id: 3, name: 'des' },
// ];
// emitter.emit('logging', data);

// const http = require('http');

// const server = http.createServer((req, res) => {
//   if (req.url === '/') {
//     res.write('hello world');
//     res.end();
//   }

//   if (req.url === '/courses') {
//     res.write(JSON.stringify([1, 2, 3, 4]));
//     res.end();
//   }
// });

// server.listen(4000);
const _ = require('underscore');
const result = [1, 2, 3, 4].includes(22);

console.log('result', result);
