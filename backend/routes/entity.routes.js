const express = require('express');
const router = express.Router();
const entityController = require('../controllers/entity.controller');

router.post('/', entityController.createEntity);
router.get('/', entityController.getAllEntities);
router.get('/:id', entityController.getEntityById);
router.put('/:id', entityController.updateEntity);
router.delete('/:id', entityController.deleteEntity);

module.exports = router;
