import app from "./app";

const port = parseInt(process.env.PORT || '') || 3000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
  console.log(`Swagger docs at http://${host}:${port}/api-docs`);
});
