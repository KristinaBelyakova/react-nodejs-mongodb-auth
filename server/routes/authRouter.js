import Router from "express"
const router = new Router()
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const generateToken = (id) => {
  const payload = { id }
  return jwt.sign(payload, 'secret', { expiresIn: "1h" })
}

router.route("/signup")
  .post(async (req, res) => {
    const { name, surname, email, password, role } = req.body
    try {
      const existingUser = await User.findOne({ email })
     
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exist" })
      }
      const hashPassword = await bcrypt.hash(password, 10)
      const newUser = await User.create({
        name, surname, email, password: hashPassword, role
      })
      await newUser.save()
      const token = generateToken(newUser._id)
      return res.status(200).json({ user: newUser, token, success: true, message: "User successfully registered" })
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Signup error" })
    }
  })

router.route("/signin")
  .post(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && bcrypt.compare(password, user.password)) {
      const token = generateToken(user._id)
      res.status(201).json({ user, token, success: true, message: "Login successfully" })
    } else {
      res.status(400).json({ success: false, message: "Login unsuccessfully" })
    }
  })

export default router
