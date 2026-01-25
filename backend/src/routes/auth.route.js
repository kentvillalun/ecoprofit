import express from 'express';

const router = express.Router();

router.get("/hello", (req, res) => {
    res.json({message: "This is get method"});
});

export default router;