var express = require('express');
var router = express.Router();
const formidable = require('formidable')

//uploaded file needs to be processed and stored in a database
var handleUploadedFile = async function(req, res, next){
    const form = formidable({ multiples: true });
    await form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Error', err);
          throw err;
        }
        console.log('Fields', fields);
        console.log('Files', files);
        for (const file of Object.entries(files)) {
          console.log(file);
        }
        res.json({ fields, files });
      });
    
}


router.post('/uploadfile', handleUploadedFile);


module.exports = router;