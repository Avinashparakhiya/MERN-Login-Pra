const mongoose = require('mongoose');
const jwt=require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  std: {
    type: Number,
    required: true,
    default: 0,
  },
  age: {
    type: Number,
    required: true,
    default: 0,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  tokens:[{
    token:{
      type:String,
      required:true,
    }
  }]
});

UserSchema.methods.generateAuthToken=async function()
{
  try
  {
    const token=jwt.sign({_id:this._id},"helloWorld")
    this.tokens=this.tokens.concat({token:token})
    await this.save();
    return token;
  }
  catch(error)
  {
    res.send("the error part" + error);
  }
}


var User = mongoose.model('User', UserSchema);

module.exports = User;
