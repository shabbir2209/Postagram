// user endpoint controller
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

// sign in the user endpoint
export const signin = async(req,res) => {
    // getting the user email and password
    const { email, password } = req.body;

    try {
        // finding the user from the db using their email
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: 'User not found.'})

        // comparing the passwords from the database
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Incorrect Password'})

        // creating the token with the user details
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "12h"})

        res.status(200).json({ result: existingUser,token});
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Something went wrong.'});
    }
};

// creating a new user
export const signup = async(req,res) => {
    // getting the user details
    const { email,password,confirmPassword,firstName,lastName } = req.body;

    try{
        // checking if a user with the email aleady exists or the passwrds do not match
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ message: 'User already exists, please sign in'});
        if(password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match'});

        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 12);
        // creating the user
        const result = await User.create({ email, password:hashedPassword, name:`${firstName} ${lastName}`});
        // creating the token
        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "12h"});
        res.status(200).json({ result ,token});
    }catch {
        res.status(500).json({ message: 'Something went wrong.'}); 
    }
    
};