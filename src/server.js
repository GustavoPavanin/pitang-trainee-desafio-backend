import app from "./app.js";
import dotEnv from "dotenv";

dotEnv.config();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

app.listen(PORT, () =>{
	console.log(`Server running at ${PORT}`);
});