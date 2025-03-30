const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Please add a valid email address with a .com or .in domain').isLength({min: 5}),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({min: 3}).withMessage('Last name must be at least 3 characters long')
],userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Please add a valid email address with a .com or .in domain').isLength({min: 5}),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long')
],userController.loginUser)

router.get('/profile',authMiddleware.authUser, userController.getUserProfile);
router.get('/logout',authMiddleware.authUser,userController.logoutUser);


// ✅ Save a Quiz with Questions
router.post("/add-quiz/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { score, totalQuestions, correctAnswers, questions } = req.body;

        const newQuiz = new Quiz({
            userId,
            score,
            totalQuestions,
            correctAnswers,
            questions
        });

        await newQuiz.save();

        // Add this quiz to User's quizzes array
        await User.findByIdAndUpdate(userId, { $push: { quizzes: newQuiz._id } });

        res.json({ message: "Quiz saved successfully", quiz: newQuiz });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});


module.exports = router;