import sendEmailToActive from "../helpers/emailRegisterGoogle.js";
import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";

const registrar = async (req, res) => {
  const { email, name } = req.body;
  try {
    const existeUusario = await User.findOne({ email });
    if (existeUusario) {
      const error = new Error("Usuario ya existente ");
      return res.status(400).json({ msg: error.message });
    }
    const user = new User(req.body);
    const userGuardado = await user.save();

    sendEmailToActive({
      email,
      name,
      token: userGuardado.token,
    });

    res.status(200).json({
      msg: "Ususario registrado",
      userGuardado,
    });
  } catch (error) {
    console.error(error);
  }
};

const perfil = async (req, res, next) => {
  const { user } = req;
  res.json(user);
};

const confirmar = async (req, res, next) => {
  const { token } = req.params;
  const userioConfirmar = await User.findOne({ token });
  if (!userioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(400).json({ message: error.message });
  }
  try {
    (userioConfirmar.token = null), (userioConfirmar.verified = true);
    await userioConfirmar.save();
    return res.status(200).json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await User.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (!usuario.verified) {
    const error = new Error("El usuario no ha sido confirmado");
    return res.status(404).json({ msg: error.message });
  }

  if (await usuario.checkPassword(password)) {
    res.json({
      _id: usuario._id,
      name: usuario.name,
      email: usuario.email,
      token: uuidv4(),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(400).json({ msg: error.message });
  }
};

export { registrar, perfil, confirmar };
