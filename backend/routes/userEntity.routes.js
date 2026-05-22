import express from 'express';
import {
  createUserEntity,
  getAllUserEntities,
  getUserEntityById,
  updateUserEntity,
  deleteUserEntity
} from '../controllers/userEntity.controller.js';

const router = express.Router();

router.post('/',      createUserEntity);
router.get('/',       getAllUserEntities);
router.get('/:id',    getUserEntityById);
router.put('/:id',    updateUserEntity);
router.delete('/:id', deleteUserEntity);

export default router;