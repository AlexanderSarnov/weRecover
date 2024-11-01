"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stepController_1 = require("../controllers/stepController");
const router = (0, express_1.Router)();
// Route to create a new recovery step
router.post('/steps', stepController_1.createStep);
// Route to get all recovery steps for a user with pagination
router.get('/steps/:userId', stepController_1.getSteps);
// Route to update a recovery step
router.put('/steps/:stepId', stepController_1.updateStep);
// Route to delete a recovery step
router.delete('/steps/:stepId', stepController_1.deleteStep);
exports.default = router;
