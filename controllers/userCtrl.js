import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function registerUser(req, res) {
  const userData = req.body;

  userData.password = bcrypt.hashSync(userData.password, 10);

  const newUser = new User(userData);

  newUser
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User Registed Successfully",
        result: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "User registration error",
        error: error.message || error,
      });
    });
}

export function loginUser(req, res) {
  const userData = req.body;

  User.findOne({ email: userData.email }).then((user) => {
    if (user == null) {
      res.status(404).json({
        error: "User Not Found",
      });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(
        userData.password,
        user.password
      );

      if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          },
          "ruwan"
        );

        res.json({ message: "Login Successfull", token: token });
      } else {
        res.json({ error: "Login Failed" });
      }
    }
  });
}
