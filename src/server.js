import app from "./app.js";
import "./database/index.js"
const port = process.env.PORT
app.listen(port, () => console.log("Application is running at port 3001!"));
