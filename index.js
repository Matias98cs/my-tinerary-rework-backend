import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4150;
app.use("/", (res, req) => {
  console.log(`Funcionando`);
});

app.listen(PORT, () => {
  console.log(
    `Servidor funcionando en el puerto ${PORT} http://localhost:${PORT}`
  );
});
