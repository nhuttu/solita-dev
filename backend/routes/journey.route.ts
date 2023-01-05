import express from "express"

const router = express.Router()

router.get('/journeys', (req, res) => {
    res.send('JOURNEYS')
})

export default router;