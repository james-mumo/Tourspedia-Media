import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../model/user.js"

const secretKey = "test"

export const signup = async (req, res) => {
  const { email, password, fName, lName } = req.body

  try {
    const user = await userModel.findOne({ email })
    if (user) {
      res.json(`${user.name} exists`)
      return
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const savedUser = await userModel.create({
      email,
      password: hashedPassword,
      name: `${fName} ${lName}`,
    })

    const token = jwt.sign(
      { email: savedUser.email, id: savedUser._id },
      secretKey,
      { expiresIn: "1h" }
    )

    res.status(201).json({ savedUser, token })
  } catch (error) {
    res.status(500).json({
      msg: error,
      error: "something went wrong with saving",
    })
    console.log(error)
  }
}
