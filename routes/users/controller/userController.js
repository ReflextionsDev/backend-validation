const bcrypt = require("bcryptjs");
const User = require("../model/User");

const createUser = async (req, res) => {

    try {
        const { firstName, lastName, username, email, password } = req.body

        // bcrypt password
        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password, salt)

        let newUser = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword,
        })

        let savedUser = await newUser.save()

        res
            .status(200)
            .json({ message: "New user has been saved", payload: savedUser })

    } catch (error) {

        console.log(error.keyValue)

        let errorValue = Object.values(error.keyValue)

        if (error.code === 11000) {
            res.status(500).json({
                message: `${errorValue} is already in use.`,
                error: error
            })
        } else {
            res.status(500).json(error)
        }
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)
        res.send("hello from login")
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {
    createUser,
    userLogin,
}