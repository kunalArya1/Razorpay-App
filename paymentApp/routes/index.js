var express = require('express');
var router = express.Router();
const Razorpay = require('razorpay');



//Instantiate the Razorpay Instance
var instance = new Razorpay({
  key_id: 'rzp_test_r6EJwrxJbscSV9',
  key_secret: 'A0ETOcXCfUXgupemi1uCptXr',
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
})

module.exports = router;
