import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {dbName: "Prayaas"})
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => {
            console.log("Error: ", err);
        })
}