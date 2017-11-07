const app = require('express')();

app.all('/*', (req, res) => {
  console.time(req.method + ' ' + req.url);
  // console.error(req.method + ' ' + req.url);
  res.send(`Process ${process.pid} says hello at ${Date.now()}`).end();
  console.timeEnd(req.method + ' ' + req.url);
});

const server = app.listen(process.env.PORT || 8000);
  // ,
  // function() {
    // console.error('Process ' + process.pid + ' is listening to all incoming requests');
//   }
// );