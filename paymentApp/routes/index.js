var express = require('express');
var router = express.Router();
const Razorpay = require('razorpay');



//Instantiate the Razorpay Instance
var instance = new Razorpay({
  key_id: 'rzp_test_9PGHW4frZyI7ng',
  key_secret: 'dWggFPupztlUtQQIoQkmFHlf',
});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create/orderId',(req,res) =>{

  var options = {
    amount: 50000,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function(err, order) {
    console.log(order);
    return res.send(order);
  });
});

router.post("/api/payment/verify",(req,res)=>{

  let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
 
   var crypto = require("crypto");
   var expectedSignature = crypto.createHmac('sha256', 'dWggFPupztlUtQQIoQkmFHlf')
      .update(body.toString())
      .digest('hex');
      console.log("sig received " ,req.body.response.razorpay_signature);
      console.log("sig generated " ,expectedSignature);
   var response = {"signatureIsValid":"false"}
   if(expectedSignature === req.body.response.razorpay_signature)
    response={"signatureIsValid":"true"}
       res.send(response);
   });


module.exports = router;
