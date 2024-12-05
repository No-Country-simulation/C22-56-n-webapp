import express from 'express'
import { createOrder,getOrderById, getAllOrders, updateOrder, deleteOrder } from '../controllers/orderController.js'
import rolMiddleware from '../middleware/rolMiddleware.js'

const orderRoutes = express.Router()

orderRoutes.get('/', rolMiddleware(['admin']), getAllOrders)
orderRoutes.get('/:id',rolMiddleware(['admin']), getOrderById)
orderRoutes.put('/:id',rolMiddleware(['admin']), updateOrder)
orderRoutes.put('/:id', rolMiddleware(['admin'], createOrder))
orderRoutes.delete('/:id',rolMiddleware(['admin']), deleteOrder)

export default orderRoutes