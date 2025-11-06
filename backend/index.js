import { createApp } from "./app.js";
import 'dotenv/config'

const PORT = process.env.PORT || 3000;

const app = createApp();

app.listen(PORT, () => {
    console.log(`📁 Arquitectura: Routes → Repository + Modeln \n http://localhost:${PORT}`);
});