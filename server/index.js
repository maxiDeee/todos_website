require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const { connectToMongoDB } = require("./database");

const path = require("path");

const router = require("./routes");
app.use("/api", router);

app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"));
})

const port = process.env.PORT || 3001;

async function startServer() {
    try {
        await connectToMongoDB();
        app.listen(port, () => {
            console.log(`Server is listening on http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();