const connectToMngo = require("./db");
const express = require("express")
const cors = require("cors");

connectToMngo();
const app = express()
const port = 7000;

app.use(express.json())
app.use(cors());

//Available routes
app.use("/api/auth", require('./routes/auth'))
app.use("/api/lawyerauth", require('./routes/lawyerauth'))
// app.use("/api/Booking", require('./routes/lawyerbooking'))
app.use("/api/search", require('./routes/lawyer'))

// app.use("/api/", require('./routes/notes'))

app.listen(port, () => {
    console.log(`App is running on port http://localhost:${port}`)
})

