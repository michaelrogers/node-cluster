const cluster = require('cluster');

// if(cluster.isMaster) {
    const numWorkers =  process.env.workers || require('os').cpus().length;
    cluster.setupMaster({
      exec: 'worker.js',
      args: ['--use', 'https'],
    });

    console.error(`Master: Process: ${process.pid} online; setting up ${numWorkers} workers...`);

    for(let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', worker => {
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


// }