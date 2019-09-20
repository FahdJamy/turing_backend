import { Router } from 'express';
import AttributeController from '../../controllers/attributes.controller';

const router = Router();

router.get('/attributes', AttributeController.getAllAttributes);
router.get('/attributes/:attributeId', AttributeController.getSingleAttribute);
router.get('/attributes/values/:attributeId', AttributeController.getAttributeValues);
router.get('/attributes/inProduct/:productId', AttributeController.getProductAttributes);

export default router;
