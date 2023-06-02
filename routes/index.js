var express = require('express');
var router = express.Router();
const userController = require('../components/Controller');
const {checkRegister} = require('../Vadilate/Vadilate');


//http://localhost:3000/users/login
router.post('/login', async(req, res, next)=>{
    try {
      const {email, password} = req.body;
      const user = await userController.login(email, password);
      if(user){
        return res.status(200).json({data:{ result: true, user: true, message:'Đăng Nhập Thành Công'}});
      }else{
        return res.status(400).json({result: false, user: null, message:'Đăng Nhập Thất Bại'});
      }
    } catch (error) {
      return res.status(500).json({result: false, user: null, message:'Đăng Nhập Thất Bại'});
    }
});
//http://localhost:3000/api/user/register
router.post('/register', [checkRegister], async(req, res, next)=>{
  try {
    const {email, password, masv} = req.body;
    const user = await userController.register(email, password, masv);
    if(user){
      res.status(200).json({result: true, user});
    }else{
      res.status(400).json({result: false, user: null});
    }
  } catch (error) {
    res.status(500).json({result: false, user: null});
  }
})
router.post('/change-password', async (req, res, next) => {
  try {
    const { email, password, newPassword } = req.body;
    const user = await userController.changePassword(email, password, newPassword);
    if (user) {
      // req.session.user = user;
      res.status(200).json({ result: true, user });
    } else {
      res.status(400).json({ result: false, user: null });
    }


  } catch (error) {
    res.status(500).json({ result: false, user: null });
  }
})
router.post('/sendOTP', userController.sendOTP);
// POST // http://localhost:3000/sendOTP
router.post('/resetPassword', userController.resetPassword);
// POST // http://localhost:3000/resetPassword
router.post('/sendFeedback', userController.sendFeedback);
// POST // http://localhost:3000/sendOTP

module.exports = router;