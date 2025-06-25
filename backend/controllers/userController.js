import bcrypt from "bcrypt";
import {User} from "../models/userModel.js"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const userExists = await User.findOne({username: username});
    if(userExists) return res.status(404).send({message: "This username already exists. Please try again."});

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({username: username, password: hashed});
    newUser.save();

    return res.status(201).send({message: "Registration successful."});
  }
  catch (err) {
    res.status(400).json({message: err.message});
  }
}

export const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const foundUser = await User.findOne({username});
    if(!foundUser) return res.status(404).json({message: "User does not exist."});

    const match = await bcrypt.compare(password, foundUser.password);
    if(!match) return res.status(404).send({message: "Wrong password. Please try again."});

    const token = jwt.sign({id:foundUser._id, username: foundUser.username}, process.env.SECRET_TOKEN, {expiresIn: "2h"});
    res.status(200).send({token: token});
  }
  catch (err) {
    res.status(400).send({err : err.message});
  }
}