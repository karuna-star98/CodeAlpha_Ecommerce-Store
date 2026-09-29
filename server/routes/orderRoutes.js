const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { createOrder, listOrders, getOrder } = require('../controllers/orderController');

router.use(auth);
router.post('/', createOrder);
router.get('/', listOrders);
router.get('/:id', getOrder);

module.exports = router;
