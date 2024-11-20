import express from 'express'
import rolMiddleware from '../middleware/rolMiddleware'
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController'

const router = express.Router()


router.get('/', rolMiddleware(['admin']), getAllUsers)
router.get('/:id',rolMiddleware(['admin']), getUserById)
router.put('/:id',rolMiddleware(['admin']), updateUser)
router.delete('/:id',rolMiddleware(['admin']), deleteUser)

export default router