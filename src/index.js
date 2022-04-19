import app from "./server.js"
import detEnv from 'dotenv';

detEnv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT} ----- Aplicação Iniciada`);
});
