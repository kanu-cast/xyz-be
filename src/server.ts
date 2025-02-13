import dotenv from "dotenv";
dotenv.config();
import { dbConnect } from "./config/db.config";
import express, { Request, Response } from "express";
import User from "./models/user";

const app = express();
app.use(express.json());

// // POST /users - Create a user
// app.post("/users", async (req: Request, res: Response) => {
//   try {
//     const { name, email } = req.body;
//     const user = await User.create({ name, email });
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating user", error });
//   }
// });

// // GET /users/:id - Get a user by ID
// app.get("/users/:id", async (req: any, res: any) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching user", error });
//   }
// });

// // PUT /users/:id - Update user info
// app.put("/users/:id", async (req: any, res: any) => {
//   try {
//     const { name, email } = req.body;
//     const user = await User.findByPk(req.params.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.name = name || user.name;
//     user.email = email || user.email;

//     await user.save();
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating user", error });
//   }
// });

app.listen(3000, () => console.log("Server running on port 3000 🚀"));

dbConnect();
