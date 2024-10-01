import { app } from "./app.js"
import connectDB from "./db/db.js";

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})


try {
    const connectTODB = connectDB();

    if (!connectTODB) {
        throw new Error("Couldn't connect to Data-Base");
    }

    app.listen(PORT, () => {
        console.log(`Server is running to ${PORT}`);
    })

} catch (error) {
    console.log(error);
    throw error;
}