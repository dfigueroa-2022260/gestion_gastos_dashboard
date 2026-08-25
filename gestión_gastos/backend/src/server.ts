import app from "./app";
import { env } from "./config/env";

app.listen(env.port, () => {
  console.log(`Cash Track API corriendo en http://localhost:${env.port}`);
});
