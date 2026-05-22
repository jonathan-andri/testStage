import express from 'express';
const router = express.Router();
import * as entityController from '../controllers/entity.controller.js';

router.post('/', entityController.createEntity);
router.get('/', entityController.getAllEntities);
router.get('/:id', entityController.getEntityById);
router.put('/:id', entityController.updateEntity);
router.delete('/:id', entityController.deleteEntity);

export default router;
