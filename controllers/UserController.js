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

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const existeUsuario = await User.findOne({ email });
  if (!existeUsuario) {
    const error = new Error("Usuario no existe");
    return res.status(400).json({ msg: error.message });
  }
  try {
    existeUsuario.token = uuidv4();
    await existeUsuario.save();
    //funcion para enviar email para reestablecer password
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const tokenValido = await User.findOne({ token });
  if (tokenValido) {
    res.status(200).json({ msg: "Token valido y el usuario existe" });
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ token });
  if (!user) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ message: error.message });
  }
  try {
    (user.token = null), (user.password = password);
    await user.save();
    res.status(200).json({ msg: "Password actualizado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const actualizarPerfil = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }
  const { email } = req.body;
  if (user.email !== req.body.email) {
    const existeEmail = await User.findOne({ email });
    if (existeEmail) {
      const error = new Error("El email ya esta en uso");
      return res.status(400).json({ msg: error.message });
    }
  }
  try {
    user.name = req.body.name;
    user.email = req.body.email;
    user.lastname = req.body.lastname;

    const userActualizado = await user.save();
    res.status(200).json(userActualizado);
  } catch (error) {
    console.log(error);
  }
};

export {
  registrar,
  perfil,
  confirmar,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
};
