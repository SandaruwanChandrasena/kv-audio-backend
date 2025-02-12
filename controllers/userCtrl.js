import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export async function registerUser(req, res) {
  try {
    const userData = req.body;

    userData.password = await bcrypt.hash(userData.password, 10);

    const newUser = new User(userData);

    const result = await newUser.save();

    res.status(201).json({
      message: "User Registered Successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      message: "User Registation error",
      error: error.message || error,
    });
  }
}

// export async function loginUser(req, res) {
//   try {
//     const userData = req.body;

//     // Find the user by email
//     const user = await User.findOne({ email: userData.email });

//     if (!user) {
//       // If user is not found, return 404
//       return res.status(404).json({
//         error: "User Not Found",
//       });
//     }

//     // Compare the passwords
//     const isPasswordCorrect = await bcrypt.compare(
//       userData.password,
//       user.password
//     );

//     if (isPasswordCorrect) {
//       // Generate JWT token
//       const token = jwt.sign(
//         {
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//           role: user.role,
//           profilePicture: user.profilePicture,
//           phone: user.phone,
//         },
//         jwtSecret
//       );

//       // Send success response with token
//       return res.json({ message: "Login Successful", token: token,  user: user});
//     } else {
//       // If password is incorrect, return error
//       return res.json({ error: "Login Failed" });
//     }
//   } catch (error) {
//     // Handle any unexpected errors
//     return res.status(500).json({
//       error: "An error occurred during login",
//       message: error.message || error,
//     });
//   }
// }

export async function loginUser(req, res) {
  try {
    const userData = req.body;

    // Find the user by email
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      // If user is not found, return 404
      return res.status(404).json({
        success: false,
        error: "User Not Found",
      });
    }

    // Compare the passwords
    const isPasswordCorrect = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!isPasswordCorrect) {
      // ❌ Incorrect password, return 401
      return res.status(401).json({
        success: false,
        error: "Invalid Password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        phone: user.phone,
      },
      jwtSecret
    );

    // Send success response with token
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token: token,
      role: user.role,
    });
  } catch (error) {
    // Handle any unexpected errors
    return res.status(500).json({
      success: false,
      error: "An error occurred during login",
      message: error.message || error,
    });
  }
}


export function isItAdmin(req) {
  let isAdmin = false;

  if (req.user != null) {
    if (req.user.role == "admin") {
      isAdmin = true;
    }
  }

  return isAdmin;
}

export function isItCustomer(req) {
  let isCustomer = false;

  if (req.user != null) {
    if (req.user.role == "customer") {
      isCustomer = true;
    }
  }

  return isCustomer;
}
