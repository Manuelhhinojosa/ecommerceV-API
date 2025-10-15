// models
const User = require("../models/User");

// dependencies
const jwt = require("jsonwebtoken");

// controller functions
//
// register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  let newUser = await User.findOne({ email });
  if (newUser) return res.status(400).json({ message: "User already exists" });

  newUser = new User({ name, email, password });

  await newUser
    .save()
    .then((response) => {
      const user = response;

      // JWT payload
      const payload = { user: { id: user._id, role: user.role } };

      // sign and return the token along with user data
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "40h" },
        (err, token) => {
          if (err) throw err;

          // response
          res.status(201).json({ user, token });
        }
      );
    })
    // error handling
    .catch((error) => {
      console.error(error);
      res.status(500).send("Server Error");
    });
};

//
// user login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  await User.findOne({ email })
    .then((user) => {
      if (!user)
        return res.status(400).json({ message: "Invalid credentials" });

      return user.matchPassword(password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ message: "Invalid credentials" });

        // JWT payload
        const payload = { user: { id: user._id, role: user.role } };

        // Sign and return the token with user data
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: "40h" },
          (err, token) => {
            if (err) throw err;
            res.json({ user, token });
          }
        );
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Server Error");
    });
};

//
// get one user
const getOneUser = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  registerUser,
  userLogin,
  getOneUser,
};
