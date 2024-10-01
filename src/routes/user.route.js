import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { registerUser } from "../controllers/user.controller.js";


const router = Router();


// register
router.route('/registerUser')
    .post(
        upload.fields([
            {
                name: "profileImg", // Wrap the object inside an array
                maxCount: 1
            }
        ]),
        registerUser
    );

export default router;