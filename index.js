const express = require("express");
const userroutes = require("./routes/user.routes");
const { connection } = require("./db");
const ipRoute = require("./routes/ip.routes");

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use("/users", userroutes);
app.use("/ip", ipRoute);

// app.get("/users", async (req, res) => {
//     // let users = await UserModel.find();
//     // res.send(users);
//     const ip = req.ip
//     res.send(ip);
// });

// app.get("/users/:userID",async (req,res)=>{
//     const {userID}=req.params
//     const user=await UserModel.findOne({id:userID})
//     res.send(user)
//  })

// app.post("/users/add", async (req, res) => {
//     let user = new UserModel(req.body);
//     await user.save();
//     res.send(user);
// });

// app.patch("/users/update/:id", async (req, res) => {
//     let { userid } = req.params;
//     await UserModel.updateOne({ id: userid }, req.body);
//     const user = UserModel.findOne({id: userid});
//     res.send(user);
// });

// app.patch("/users/delete/:id", async (req, res) => {
//     let { userid } = req.params;
//     await UserModel.deleteOne({ id: userid }, req.body);
//     const users = UserModel.find();
//     res.send(users);
// });

const server = app.listen(4000, async () => {
    try {
        await connection;
        console.log("Connected to the DB");
        console.log("Server running on port 4000");
    } catch (error) {
        console.log(error);
    }
});

module.exports = server;