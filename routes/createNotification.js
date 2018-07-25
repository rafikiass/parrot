var express = require('express');
var uuidv1 = require('uuid/v1');
var mongoose = require('mongoose');
var router = express.Router();

//this must be moved to the model...It's 2:44 AM, I have no time

const createNotificationSchema = new mongoose.Schema({
  appName: {
    type: String,
    trim: true,
    required: true
  },
  version: {
     type: String,
     trim: true,
  },
  message: {
    type: String,
    trim: true,
    required: true
 }
})


const NotificationModel = mongoose.model('createNotification', createNotificationSchema)

// Will need this if schema is sent in model layer / DAO layer for Java suckers
//module.exports = mongoose.Model('createNotification', createNotificationSchema)

/* Register the an application. */
router.post('/', (req, res, next) => {
  console.log("Receive jenkins curl")
  console.log(req.body)
  //we need to save the message to Mongo db/ need to validate the body params. No time it's 3:34 AM
  const newNotification = new NotificationModel(req.body)

  newNotification.save(function (err) {
    if (err) return handleError(err);
    // saved  and continue with good business! may be validate to avoid duplicate. use app name hahahaha
    console.log(newNotification)
    //Emit notification message, grab value from req.body.message
    console.log(req.body)
    res.io.emit("Notification", req.body.message)
    //Just send success here...Who cares?
    res.json({appName: req.body.appName, version: req.body.version, message: req.body.message});
  });
   
});

module.exports = router;


//REMAINING STUFFS

//1. Authorize connection based on api key or app id generated
//2. check appID before saving message
//3. Allow admin to broadcast any message. Can we limit broadcast by namespace???
//4. Deploy this sucker and test
//5. Add Deere UX
//6. Any client socket io will work. 
//7 I battled tested this sucker. It's 3:42 AM, I'm pushing the code to MY GITHUB
//normally we should send the Authorization Bearer "API KEY"
//curl -X POST -H "Content-Type: application/json" -d '{"appName":"Ceres", "version": "125-aaaa.war", "message":"New features just got deployed! yeah! yeah, please log out and log back in"}' http://localhost:3001/createNotificationMessage --verbose
