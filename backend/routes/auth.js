const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')
const JWT_SECRET = "hellothere!"


// ROUTE 1: TO CREATE A USER USING POST : /auth/createUser || NO LOGIN REQUIRED

router.post('/createUser', [
  body('name', "name should contain atleast 3 characters").isLength({ min: 3 }),
  body('email', "please enter a valid  email").isEmail(),
  body('password', "password should be atleast 6 characters long").isLength({ min: 6 })
],
  async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = false;
    // IF USER ALREADY EXIST
    try {
      let user = await User.findOne({ email: req.body.email })
      if (user) {
        return res.status(400).json(success , "a user already existed with this email");
      }

      const salt = await bcrypt.genSalt(10)
      let userPassword = await bcrypt.hash(req.body.password, salt)


      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: userPassword
      })

      const data = {
        user: {
          id: user.id
        }
      }

      const token = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, token })
      // console.log(userPassword)
    }
    catch (errors) {
      res.status(400).send("Server Error")
    }
  })

// ROUTE 2: TO VERIFY A USER : /auth/verifyUser || NO LOGIN REQUIRED

router.post('/verifyUser', [
  body('email', "please enter a valid  email").isEmail(),
  body('password', "password cannot be empty").exists()
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = false;

    const { email, password } = req.body

    // IF USER ALREADY EXIST
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json("Please login with valid userName or Password");
      }
      const passwordCompare = await bcrypt.compare(password, user.password)
      if (!passwordCompare) {
        return res.status(400).json("Please login with valid userName or Password");
      }

      const data = {
        user: {
          id: user.id
        }
      }

      const token = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({success ,  token })
    }
    catch (errors) {
      res.status(400).send("Server Error")
    }
  })

// ROUTE 2: TO GET USER DETAILS : /auth/getUser || LOGIN REQUIRED

router.post('/getUser', fetchUser, async (req, res) => {

  try {
    const userId = req.user.id
    const user = await User.findById(userId).select('-password')
    res.send(user)
  } catch (errors) {
    res.status(400).send("Server Error")
  }
})
module.exports = router