var express = require('express');
var uuidv1 = require('uuid/v1');
var router = express.Router();
var mongoose = require('mongoose');

//this must be moved to the model...It's 2:44 AM, I have no time

const registerAppSchema = new mongoose.Schema({
   appName: {
     type: String,
     trim: true,
     required: true
   },
   appUrl: {
      type: String,
      trim: true,
      required: true
   }, 
   apiKey: String
})

registerAppSchema.pre('save', function(next){
  this.apiKey = uuidv1()
  next()
})

const RegisterAppModel = mongoose.model('registerAppSchema', registerAppSchema)

// Will need this if schema is sent in model layer / DAO layer for Java suckers
//module.exports = mongoose.Model('registerAppSchema', registerAppSchema)

/* Register the an application. The UUID is for API key generations/ We need to save to db at this level */
router.post('/', (req, res, next) => {
  console.log("yes yes")
  console.log(req.body)
  const newApp = new RegisterAppModel({
    appName:req.body.appName,
    appUrl:req.body.appUrl,
    apiKey: this.apiKey
  })
  newApp.save(function (err) {
    if (err) return handleError(err);
    // saved  and continue with good business! may be validate to avoid duplicate. use app name hahahaha
    console.log(newApp)
    //this is just me testing socket io///should not use it here
    res.io.emit("saveApp", "Successfully saved new application")
    res.json({appName: req.body.appName, appUrl: req.body.appUrl, apiKey: uuidv1()});
  });

});

module.exports = router;
