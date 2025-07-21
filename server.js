/* eslint-disable */ 
// prettier-ignore 
const { createServer } = require('http'); 
const next = require('next'); 
 
const app = next({ dev: false }); 
const handle = app.getRequestHandler(); 
 
app.prepare().then(() => { 
  createServer((req, res) => { 
    handle(req, res); 
  }).listen(3000, '127.0.0.1', () => { 
    console.log('�  Ready on http://127.0.0.1:3000'); 
  }); 
});