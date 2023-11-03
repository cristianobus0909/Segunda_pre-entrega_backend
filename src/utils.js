import express from 'express';
import multer from 'multer';
import {fileURLToPath} from 'url'
import { dirname } from 'path';
import path from 'path';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public', 'uploads'));
    },    
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);

    }
});

const upload = multer({ storage: storage });

app.post('/subir', upload.single('miArchivo'), (req, res, next)=>{

    const file = req.file;
    if(!file){

        const error = new Error('error subiendo archivo');
        error.httpstatusCode= 400;
        return next(error);
    }
    res.send(`archivo sudido exitosamente`);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;