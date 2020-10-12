const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
});

app.listen(PORT, (err) => console.log(`PORT LISTENING ON ${PORT}`));