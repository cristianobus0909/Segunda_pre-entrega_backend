import express, { Router } from "express";
import userModel from '../models/users.models.js';

const users = Router();

users.get('/api/users', async(req,res)=>{
    const users = await userModel.find();
    res.json({status:'succes', payload: users})
});
users.get('/api/users/uid', async(req,res)=>{
    const uId = req.params.uid
    const user = await userModel.findOne({_id: uId});
    res.json({status:'succes', payload: user})
});

users.post('/api/users', async(req,res)=>{
    const data = req.body;
    const result = await userModel.create(data);
    res.send({status:'succes', payload: result})
});
users.put('/api/users/uid', async(req, res)=>{
    const uId = req.params.uid
    const dataToUpdate = req.body
    const result = await userModel.updateOne({_id: uId}, dataToUpdate)
    res.send({status:'succes', payload: result});
});
users.delete('api/users/uid', async(req, res)=>{
    const uId = req.params.uid
    
    const result = await userModel.deleteOne({_id: uId})
    res.send({status:'succes', payload: result});
})

export default users