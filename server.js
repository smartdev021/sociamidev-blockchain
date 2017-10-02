let path = require('path');
let webpack = require('webpack');
let express = require('express');
let config = require('./webpack.config');

let app = express();
let compiler = webpack(config);

let port = process.env.NODE_ENV == "Staging"? 8080: 3000;

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});



app.listen(port, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:'+port+'/');
});
