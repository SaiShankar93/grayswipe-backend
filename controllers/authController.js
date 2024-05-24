const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRECT = process.env.JWT_SECRET
const signup = async (req, res) => {
    try {
        const { ownerName, storeName,userName, password, email, mobile,address } = req.body;
        // console.log(ownerName, storeName, userName, password,email, mobile);
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userSchema.create({ ownerName : ownerName, storeName:storeName,userName:userName, password: hashedPassword, email:email, mobile:mobile,address });

        const token = jwt.sign({ userId: user._id }, JWT_SECRECT, { expiresIn: '30d' });
        console.log("user created successfully");
        res.status(200).json({ userName,storeName,email, token,mobile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error signing up .' });
    }
};

const signin = async (req, res) => {
    try {   
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const userName = user.userName;
        const storeName = user.storeName;
        const mobile = user.mobile;
        const token = jwt.sign({ userId: user._id }, JWT_SECRECT, { expiresIn: '30d' });
        res.status(200).json({ userName,storeName,mobile,email, token });
    } catch (error) {   
        console.error(error);
        res.status(500).json({ message: 'Error signing in' });
    }
}

module.exports = { signup, signin };
