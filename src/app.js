import express from 'express';
import routerCarts from './routes/carts.js';
import routerProducts from './routes/products.js';
import usersRouter from './routes/users.js';
import viewsRouter from './routes/views.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';


const app = express();
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`Servidor activo en puerto: ${puerto}`);
});
const io = new Server(server)

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use('/api/users', usersRouter);
app.use('/', viewsRouter)

const message = [];


const url = 'mongodb+srv://clbcristian:tpeyLRnudLy27oi2@cluster0.jpsemmz.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(url, {dbName: 'admnin'})
    .then(()=>{
        console.log('Db connectado !!');
        io.on("connection", (socket) => {
            console.log(`User ${socket.id} Connection`);
        
            let userName = "";
        
            socket.on("userConnection", (data) => {
                userName = data.user;
                message.push({
                    id: socket.id,
                    info: "connection",
                    name: data.user,
                    message: `${data.user} Conectado`,
                    date: new Date().toTimeString(),
                });
                io.sockets.emit("userConnection", { message, nameUser: userName });
            });
        
            socket.on("userMessage", (data) => {
                message.push({
                    id: socket.id,
                    info: "message",
                    name: userName,
                    message: data.message,
                    date: new Date().toTimeString(),
                });
                io.sockets.emit("userMessage", message);
            });
        
            socket.on("typing", (data) => {
                socket.broadcast.emit("typing", data);
            });
        });
    })
    .catch(err => {
        console.error('Error conectando la BD:', err.message);
    });

export { io };
