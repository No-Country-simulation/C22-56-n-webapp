import express from 'express'
import rolMiddleware from '../middleware/rolMiddleware.js'
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js'

const router = express.Router()


router.get('/', rolMiddleware(['admin']), getAllUsers)
router.get('/:id',rolMiddleware(['admin']), getUserById)
router.put('/:id',rolMiddleware(['admin']), updateUser)
router.delete('/:id',rolMiddleware(['admin']), deleteUser)

export default router
