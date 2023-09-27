/////////////////////////////////////////////////////////////////////////
/////////////////////////////// SIMPLES /////////////////////////////////

//Pega o numero da porta passado no start do processo (default: 8000)
const port =  process.argv[2] || 8000;
const host = '0.0.0.0';

const cors = require('cors');

//cria servidor express
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

app.listen(port, host, () => console.log('Server listening on port ' + port + ':' + host));

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
