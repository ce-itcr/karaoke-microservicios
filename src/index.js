const sts = require('strict-transport-security');
const express = require('express');
const helmet = require('helmet')
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const globalSTS = sts.getSTS({'max-age':{'days': 30}});

const app = express();
app.use(helmet.frameguard())
app.use(globalSTS);
app.use(cors());
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use('/api/v1/stats', require('./routes/stats.routes'));

app.get('/', (req, res) => { return res.status(200).send('Are you lost?'); });
app.get('*', (req, res)  => { res.status(405).send('Method does not exist'); });
app.post('*', (req, res) => { res.status(405).send('Method does not exist'); });
app.put('*', (req, res)  => { res.status(405).send('Method does not exist'); });
app.delete('*', (req, res)  => { res.status(405).send('Method does not exist'); });

app.listen(PORT, () => console.log(`Server running 🚀 on port: ${PORT}...`));
