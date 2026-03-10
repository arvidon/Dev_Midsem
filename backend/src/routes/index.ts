import { Router } from "express";
import authRoute from "./authRoute";
// import blogRoute from "./blogRoute";
import blogRoute from "./blogRoute";
const router = Router();

router.use("/auth", authRoute);
// router.use("/blogs", blogRoute);
router.use("/blog", blogRoute)

export default router;