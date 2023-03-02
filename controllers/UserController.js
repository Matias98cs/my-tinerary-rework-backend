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

    //enviar emial

    res.status(200).json({
      msg: "Ususario registrado",
      userGuardado,
    });
  } catch (error) {
    console.error(error);
  }
};
