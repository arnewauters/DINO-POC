import koa from 'koa';
import Router from 'koa-router';
import qs from 'koa-qs';
import parseBody from 'co-body';
import dm from './middleware/domainModelContentType';
import commandHandlers from './handlers/commandHandlers';
import queryHandlers from './handlers/queryHandlers';
import {graphql} from 'graphql';
import schema from './schema';

let port = process.env.PORT || 3000;
let routes = new Router();
var app = koa();
qs(app);

routes.post('/patient', function* (next) {
});

routes.post('/patient/:id', function* (next) {
  let handler = commandHandlers('patient/:id', this.request.domainModel);
  if handler {
    return handler.handle().bind(this);
  } else {
    this.status = 400;
    this.body = "Unknown command issued";
  }
});

routes.get(/(|^$)/, function* (next) {
  this.body = 'public: ' + this.request.domainModel;
});

routes.post(/(|^$)/, function* (next) {
  this.body = 'public: /(|^$)/';
});

// routes.get('/data', function* () {
//   var query = this.query.query;
//   var params = this.query.params;
//
//   var resp = yield graphql(schema, query, '', params);
//
//   if (resp.errors) {
//     this.status = 400;
//     this.body = {
//       errors: resp.errors
//     };
//     return;
//   }
//
//   this.body = resp;
// });
//
// routes.post('/data', function* () {
//   var body = yield parseBody.json(this);
//   var resp = yield graphql(schema, body.query, '', body.params);
//
//   if (resp.errors) {
//     this.status = 400;
//     this.body = {
//       errors: resp.errors
//     };
//     return;
//   }
//
//   this.body = resp;
// });

app.use(dm());
app.use(routes.middleware());

app.listen(port, () => {
  console.log('app is listening on ' + port);
});

module.exports = app;
