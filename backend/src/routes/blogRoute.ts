import {Router} from 'express';
import { getBlog, getSpecificBlog } from '../controller/blogController';


const router = Router();

router.post('')
router.get('/blog', getBlog)
router.get('/blog/:id', getSpecificBlog)

export default router;