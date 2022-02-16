const User = require("../model/User");

const isLettersOnly = (str) => {
    return !str.match(/[!`\-_=@#$%^&*()\[\],.?":;{}|<>1234567890]/g)
}

const isAlphaNumeric = (str) => {
    return !str.match(/[!`\-_=@#$%^&*()\[\],.?":;{}|<>\s]/g)
}

const isValidEmailAddress = (str) => {
    return str.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
}

const isValidPassWord = (str) => {
    return str.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g)
}

const createUser = async (req, res) => {

    try {

        let letterValidationObj = {}
        let errObj = {}

        const { firstName, lastName, username, email, password } = req.body

        if (!isLettersOnly(firstName)) {
            errObj.firstName = "first name should only have letters"
        }

        if (!isLettersOnly(lastName)) {
            errObj.lastName = "last name should only have letters"
        }

        if (!isAlphaNumeric(username)) {
            errObj.username = "username should not have special characters"
        }

        if (!isValidEmailAddress(email)) {
            errObj.email = "email is invalid"
        }

        if (!isValidPassWord(password)) {
            errObj.password = `Password is invalid, must contain: at least 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character`
        }

        if (Object.keys(errObj).length > 0) {
            res.json(errObj)
        } else {
            res.status(200).json(req.body)
        }

    } catch (error) {
        res.status(500).json(error)
    }

}

module.exports = {
    createUser,
}