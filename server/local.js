import app from "./server.js";

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running locally on port ${PORT}`));
