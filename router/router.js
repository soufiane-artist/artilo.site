const { newMessage } = require('../controller/MessageC');
const { createOrder, verfyTokenOrder, getAllOrders, deleteAllOrders, createrequest, createOrderSold, getAllFreefile } = require('../controller/Order');
const { CreateNewPost, getPost, createVideo, getAllPosts, createImagePost, deleteAllPosts, deletePostById } = require('../controller/Post')
const photoUplaod = require('../utils/imges')

const router = require('express').Router()


router.post('/post',CreateNewPost)
router.post('/post/img/:id', photoUplaod.array('images', 7), createImagePost);
router.get('/posts',getAllPosts)
router.get('/post/:id',getPost)
router.post('/video/:Postid',createVideo)
// order
router.post('/order/:postId',createOrder)
router.post('/order/sold',createOrderSold)
router.put('/order/:orderId/:token',verfyTokenOrder)
router.get('/orders',getAllOrders)
router.delete('/orders',deleteAllOrders)

// delete
router.delete('/posts',deleteAllPosts)
router.delete('/post/:id',deletePostById)
// support
router.post('/send-message',newMessage)
// free file
router.post('/freefile',createrequest)
router.get('/freefiles',getAllFreefile)
module.exports = router