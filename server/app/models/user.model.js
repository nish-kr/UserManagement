const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "email is required"],
  },
  lastName: {
    type: String,
    required: [true, "email is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
  },
  image: {
    type: String,
  },
});

const User = mongoose.model("userDb", UserSchema);

function UserSchemaModel() {}

UserSchemaModel.prototype.saveUser = (data, callback) => {
  console.log(data);
  var newUserData = new User(data);
  newUserData.save((error, result) => {
    if (error) {
      console.log(error);
      callback(error);
    } else {
      callback(null, result);
    }
  });
};

UserSchemaModel.prototype.editUser = (data, callback) => {
  User.updateOne({ _id: data._id }, data, (error, result) => {
    if (error) {
      console.log(error);
      callback(error);
    } else {
      callback(null, result);
    }
  });
};

UserSchemaModel.prototype.deleteUser = (data, callback) => {
  User.deleteOne({ _id: data._id }, (error, result) => {
    if (error) {
      console.log(error);
      callback(error);
    } else {
      callback(null, result);
    }
  });
};

UserSchemaModel.prototype.getAllUsers = (callback) => {
  User.find({}, (error, result) => {
    if (error) {
      console.log(error);
      callback(error);
    } else {
      callback(null, result);
    }
  });
};

UserSchemaModel.prototype.getDetails = (data, callback) => {
  console.log("Model", data);

  User.findOne({ phone: data.phone }, (error, result) => {
    if (error) {
      console.log(error);
      callback(error);
    } else {
      console.log(result);

      callback(null, result);
    }
  });
};

module.exports = new UserSchemaModel();
