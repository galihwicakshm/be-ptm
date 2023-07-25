const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { secret } = require('../database/jwtConfig');
const User = require('../models/user');


    exports.registerUser = async (req, res) => {
  try {
    const { email, nama, password, role, confirm_password } = req.body;

    // Check if email and password are provided
    if (!email || !password ) {
      return res.status(400).send({ message: 'Email dan password harus diisi' });
    }

     if (!nama) {
      return res.status(400).send({ message: 'Nama harus diisi' });
    }


    const existingUser = await User.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

    if (existingUser) {
      return res.status(409).send({ message: 'Email sudah terdaftar' });
    } else if (password !== confirm_password) {
      return res.status(422).send({ message: 'Password tidak sama' });
    } else {
      const user = await User.create({
        email,
        nama,
        password,
        role: "User",
      });

      const token = jwt.sign({ id: user.id }, secret);
      res.status(201).send({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};



    exports.loginUser = async(req,res) => {
    try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await user.validPassword(password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user.id, role: user.role  }, secret);
    res.status(200).send({ token: token,
      role: user.role
     });
    } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
    }
  }


    exports.logoutUser = async (req, res) => {
    try {
    res.clearCookie('token');
    res.clearCookie('role');
    res.send({ message: 'Logged out successfully' });
    } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
    }
  };



