const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  pic: {
    type: String,
    required: true,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  name: { type: String, required: true },
},
    {timeastamps:true}
);
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword,this.password);
  
}

userSchema.pre("save", async function (next) {     //function to encrypt password of user before saving
  if (!this.isModified) {
    next();
  }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);

module.exports = User; 