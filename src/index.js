const express = require('express');
const cors = require('cors');
const songsRouter = require('./routes/songs');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({origins: "https://karaoke-ceitcr.netlify.app,http://localhost:3000", optionsSuccessStatus: 200 }));

app.use('/karaoke', songsRouter);

app.get('/', (req, res) => { return res.status(200).send('Hello World from Karaoke´s API'); });
app.get('*', (req, res)  => { res.status(405).send('Method does not exist'); });
app.post('*', (req, res) => { res.status(405).send('Method does not exist'); });
app.put('*', (req, res)  => { res.status(405).send('Method does not exist'); });
app.delete('*', (req, res)  => { res.status(405).send('Method does not exist'); });

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
