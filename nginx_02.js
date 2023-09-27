/////////////////////////////////////////////////////////////////////////
//////////////////////////////// NGINX //////////////////////////////////
const port =  process.argv[2] || 8002;
const hostname = '127.0.0.1';

const cors = require('cors');

const express = require('express');
const app = express();

app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    getTest(20000).then(result => {
        console.log("executando mensagem");
        res.send(result);
    })
});

app.listen(port, () => console.log('Server listening on port ' + port));
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
        resolve('Success from server 2');
    });
}
