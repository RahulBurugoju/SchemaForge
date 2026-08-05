import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {validateCreateProject,validateUpdateProject} from '../validators/project.validators.js'

const router = Router();
router.use(verifyJWT)
//router.route("URLpath").Method(Controller)

router.route("/create-project").post(validateCreateProject,createProject);
router.route('/get-projects').get(getProjects)
router.route('/get-project/:id').get(getProjectById);
router.route("/update-project/:id").patch(validateUpdateProject,updateProject);
router.route("/delete-project/:id").delete(deleteProject);

export default router;
