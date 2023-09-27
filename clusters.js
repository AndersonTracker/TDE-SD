/////////////////////////////////////////////////////////////////////////
/////////////////////////////// CLUSTER /////////////////////////////////

const port =  process.argv[2] || 8000;

const cors = require('cors');

const cluster = require('cluster');
const express = require('express');

//pega quantidade de cpus
const os = require('os');
const numCPUs = os.cpus().length -1;

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*'
}));

// Gere um ID exclusivo para cada processo filho
const workerId = cluster.isMaster ? 'Master' : `Worker ${process.pid}`;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    app.get('/', (req, res) => {
        getTest(20004).then(result => {
            console.log(`Server ${workerId} handling request:`);
            res.send(result); 
        })
    });
    
    app.listen(port, () => {
        console.log(`Worker ${process.pid} started. Listening on port ${port}`);
    });
}

var getTest = function (num) {
    return new Promise (function (resolve, reject) {
        let loopCount = num;
        while (loopCount>0) {
            let internalLoopCount = loopCount;
            while (internalLoopCount>0) {
                internalLoopCount--;
            }
            loopCount--;
        }
        resolve('Success');
    });
}
