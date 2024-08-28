import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

//connections
const port=process.env.PORT || 5174;

connectToDatabase().then(()=>{
  app.listen(port,()=>console.log(`Server Open on port ${port}`));
})
.catch((err)=>console.log(err));
