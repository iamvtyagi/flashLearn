const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type : String,
            required : true,
            minlength : [3,'First name must be at least 3 characters']
        },
        lastname:{
            type : String,
            minlength : [3,'Last name must be at least 3 characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/,
            "Please add a valid email address with a .com or .in domain",
          ],
        minlength: [5, "Email must be at least 5 characters"],
      },
    password: {
        type: String,
        required: true,
        select : false  // esse jab bhi ham user ko find krega to password nhi show krega
      },
    quizzes: {
        totalQuizzes: {
            type: Number,
            default: 0
        },
        totalScore: {
            type: Number,
            default: 0
        }
    }
});

// Methods for userSchema
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    console.log(`inside generateAuthToken returning : ${token}`);
    return token;
};

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log(`inside comparePassword returning : ${isMatch}`);
    return isMatch;
};

// Static methods for userSchema
userSchema.statics.hashPassword = function (password) {
    const saltRounds = 10;
   const hashedPassword = bcrypt.hash(password, saltRounds); 
   console.log(`inside hashPassword returning : ${hashedPassword}`);
   return hashedPassword;
};

const user = mongoose.model('user', userSchema);
module.exports = user;