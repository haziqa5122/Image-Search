import express from 'express';
// import {getFilePaths} from './utils.js'
// import {createTableIfNotExists, insertInTable} from './database.js'
import {visionEmbeddingGenerator, textEmbeddingGenerator} from './model.js'
import pgvector from 'pgvector/pg';
import pkg from 'pg';
import cors from "cors";

const { Client } = pkg


const app = express()
const port = 3000;

app.use(express.json());


const corsOptions ={
    origin:'http://localhost:3001', 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/search', async (req, res) => {

    console.log(req)

    try {
        // Compute text embeddings
        const text_emb = await textEmbeddingGenerator(req.body['searchText'])

        const queryTextEmbedding = [pgvector.toSql(Array.from(text_emb))]
    
        console.log(queryTextEmbedding)
    
        // Perform similarity search
        const result = await client.query(`
            SELECT path FROM Search_table ORDER BY embedding <-> $1 LIMIT 5`, queryTextEmbedding);
        
        res.json(result.rows);
        console.log(result.rows)
    } catch (error) {
        console.error('Error performing search', error);
        res.status(500).send('Error performing search');
    }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


const client = new Client({
    user: 'tsdbadmin',
    host: 'ehx4sn6tr1.rhgdqu5xv1.tsdb.cloud.timescale.com',
    database: 'tsdb',
    password: 'xs14n4qhmrbewxp4',
    port: 31062,
    ssl: {
      rejectUnauthorized: false,
    },
});

await client.connect();
