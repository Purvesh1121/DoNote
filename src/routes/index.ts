import express from "express";
import authRoutes from "./auth.route";
import noteRoutes from "./notes.route";

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/notes", noteRoutes);

export default router;
