const express = require('express'); 
const app = express(); 
const fileUpload = require('express-fileupload'); 
const path = require('path'); 

app.use(fileUpload()); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html')); 
})

app.post('/upload', (req, res) => {
    if (!req.files) {
        res.status(400).send("No files were updated");
    }

    const file = req.files.myfile;
    const path2 = path.join(__dirname, "/public/files/" + file.name); 
    console.log(path2); 

    file.mv(path2, (err) => {
        if (err) {
            res.status(500).send(err)
        }
        res.status(200).send({ status: 'success', path: path2 })
    })
    
})



app.listen('3000', function () {
    console.log('server up and running')
})
