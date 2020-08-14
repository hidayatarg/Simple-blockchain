const express = require('express');
const Blockchain = require('./blockchain');
const bodyParser = require('body-parser')


const HTTP_PORT = process.env.HTTP_PORT || 2001;

const app = express();
const blockchain = new Blockchain();
app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
	res.json(blockchain.chain);
});

app.post('/mine', (req, res) => {
    const block =blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
 
    //redirect to the 
    res.redirect('/blocks')
});
app.listen(HTTP_PORT, () => console.log(`Listening on port: ${HTTP_PORT}`));