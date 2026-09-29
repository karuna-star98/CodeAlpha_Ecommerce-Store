const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { getCart, addItem, updateItem, removeItem } = require('../controllers/cartController');

router.use(auth);
router.get('/', getCart);
router.post('/items', addItem);
router.patch('/items/:productId', updateItem);
router.delete('/items/:productId', removeItem);

module.exports = router;
