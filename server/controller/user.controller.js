const userService = require("../services/user.services");

exports.saveUser = (req, res) => {
  var rs = {};
  console.log("Controller", req.body);
  userService.saveUser(req.body, (error, result) => {
    if (error) {
      rs.status = true;
      rs.message = "Something went wrong";
      rs.data = result;
      return res.status(500).send(rs);
    } else {
      rs.status = true;
      rs.message = "Registered Successfully";
      rs.data = result;
      return res.status(200).send(rs);
    }
  });
};

exports.getAllUsers = (req, res) => {
  var rs = {};
  console.log(req.body);
  userService.getAllUsers((error, result) => {
    if (error) {
      rs.status = true;
      rs.message = "Something went wrong";
      rs.data = result;
      return res.status(500).send(rs);
    } else {
      rs.status = true;
      rs.message = "Fetched Successfully";
      rs.data = result;
      return res.status(200).send(rs);
    }
  });
};

exports.editUser = (req, res) => {
  var rs = {};
  console.log('Controller',req.body);
  userService.editUser(req.body, (error, result) => {
    if (error) {
      rs.status = true;
      rs.message = "Something went wrong";
      rs.data = result;
      return res.status(500).send(rs);
    } else {
      rs.status = true;
      rs.message = "Edited Successfully";
      rs.data = result;
      return res.status(200).send(rs);
    }
  });
};

exports.deleteUser = (req, res) => {
  var rs = {};
  console.log(req.body);
  userService.deleteUser(req.body, (error, result) => {
    if (error) {
      rs.status = true;
      rs.message = "Something went wrong";
      rs.data = result;
      return res.status(500).send(rs);
    } else {
      rs.status = true;
      rs.message = "Deleted Successfully";
      rs.data = result;
      return res.status(200).send(rs);
    }
  });
};

exports.getDetails = (req, res) => {
  var rs = {};
  console.log("Controller", req.body);
  userService.getDetails(req.body, (error, result) => {
    if (error) {
      rs.status = true;
      rs.message = "Something went wrong";
      rs.data = result;
      return res.status(500).send(rs);
    } else {
      rs.status = true;
      rs.message = "Fetched single data Successfully";
      rs.data = result;
      return res.status(200).send(rs);
    }
  });
};
