const cluster = require('cluster');
// const debug = require('debug');

if(cluster.isMaster) {
    const numWorkers = require('os').cpus().length;
    // const numWorkers = 2;
    cluster.setupMaster({
      // exec: 'worker.js',
      args: ['--use', 'https'],
    });
    console.error(`Master: Process: ${process.pid} online; setting up ${numWorkers} workers...`);

    for(let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', (worker) => {
      // console.error('Worker ' + worker.process.pid + ' is online');
      // setTimeout(() => {
      //   worker.kill();
      // }, 100000 * Math.random());
    });

    cluster.on('exit', (worker, code, signal) => {
      console.error('Worker: ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
      // console.error('Starting a new worker');
      cluster.fork();
    });
    cluster.on('listening', (worker, address) => {
      console.log(
        `Worker: ${worker.process.pid} is now listening on ${address.address || 'localhost'}:${address.port}`);
    })


} else {
    const app = require('express')();
    app.all('/*', (req, res) => {
      console.error(req.method + ' ' + req.url);
      res.send(`Process ${process.pid} says hello at ${Date.now()}`).end();
    });

    const server = app.listen(process.env.PORT || 8000
      // ,
      // function() {
        // console.error('Process ' + process.pid + ' is listening to all incoming requests');
    //   }
    );
}