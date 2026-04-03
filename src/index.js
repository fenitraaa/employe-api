import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const mongoURL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const app = express();

mongoose.connect(mongoURL).then(() => {
    console.log("database is connected");
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    })
    if (db.employes.contDocuments() === 0) {
        db.employes.insertOne([
            { _id: 1, nom: "Fafara Deteline", salaire: 2000.00}
        ]);
    }
}).catch((error) => console.log(error));
