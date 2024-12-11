const User = require("../models/User");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Contraseña incorrecta" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};

const register = async (req, res) => {
  const { email, password, name } = req.body;
  const userExist = await User.findOne({ where: { email } });

  if (userExist) {
    return res.status(400).json({ message: "El correo ya está registrado" });
  }

  const user = await User.create({ email, password, name });
  res.status(201).json(user);
};

module.exports = { login, register };
