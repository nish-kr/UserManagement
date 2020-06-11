const userModel = require("../app/models/user.model");

exports.saveUser = (data, callback) => {
  userModel.saveUser(data, (error, result) => {
    if (error) {
      callback(error);
    } else {
      callback(null, result);
    }
  });
};

exports.getAllUsers = (callback) => {
  userModel.getAllUsers((error, result) => {
    if (error) {
      callback(error);
    } else {
      callback(null, result);
    }
  });
};

exports.editUser = (data, callback) => {
  userModel.editUser(data, (error, result) => {
    if (error) {
      callback(error);
    } else {
      callback(null, result);
    }
  });
};

exports.deleteUser = (data, callback) => {
  userModel.deleteUser(data, (error, result) => {
    if (error) {
      callback(error);
    } else {
      callback(null, result);
    }
  });
};

exports.getDetails = (data, callback) => {
  console.log("service", data.body);

  userModel.getDetails(data, (error, result) => {
    if (error) {
      callback(error);
    } else {
      callback(null, result);
    }
  });
};
