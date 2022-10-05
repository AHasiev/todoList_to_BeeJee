const User = require("../models/User.model");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.usersController = {
  getAllUsers: async (req, res) => {
    const users = await User.find();
    res.json(users);
  },

  registerUser: async (req, res) => {
    try {
      const { login, password, email } = req.body;

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      const user = await User.create({ login: login, password: hash, email: email });

      res.json(user);
    } catch (e) {
      return res.status(400).json({
        error: "ошибка при регистрации: " + e.message,
      });
    }
  },

  login: async (req, res) => {
    const { login, password } = req.body;

    const candidate = await User.findOne({ login });
    if (!candidate) {
      return res.status(401).json({ error: "Неверный логин" });
    }
    // res.json(candidate);

    const valid = await bcrypt.compare(password, candidate.password);

    // res.json(valid)
    if (!valid) {
      return res.status(401).json("Неверный пароль");
    }

    // return res.json("Вы авторизованы");

    const payload = {
      id: candidate._id,
      login: candidate.login,
      email: candidate.email,
      role: candidate.role
    };

    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "24h",
    });

    res.json({ token });
  },
};
