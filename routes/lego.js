const express = require('express')
const LegoModel = require('../models/LegoModel')
const router = express.Router()

router.get('/', (req, res) => {
    LegoModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/lego
            res.render('lego/index', { lego: data })
        }
    })
})

router.get('/add', (req, res) => {
    res.render("lego/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    LegoModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add lego succeed !')
            res.redirect("/lego")
        }
    })
})


router.get('/edit/:id', (req, res) => {
    LegoModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/lego)
            //gửi kèm dữ liệu của object lego để load vào form edit
            //lego (tên) , data (dữ liệu)
            res.render("lego/update", { lego: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var lego = req.body;
    LegoModel.findByIdAndUpdate(id, lego, (err) => {
        if (err) {
            console.log(err)
        }else{
            console.log("Update lego succeed !")
            res.redirect("/lego")
        }
    })
})

router.get('/delete/:id', (req, res) => {
    LegoModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete lego succeed !");
            //var message = "Delete lego succeed !";
            //redirect về trang /lego (URL không phải view)
            res.redirect("/lego");
        }
    })
})

router.post('/search', (req, res) => {
    LegoModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('lego/index', { lego: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    LegoModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('lego/index', { lego: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    LegoModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('lego/index', { lego: data })
            }
        })
})

router.get('/drop', (req, res) => {
    LegoModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/lego')
    })
})

router.get('/detail/:id', (req, res) => {
    LegoModel.findById(req.params.id, (err, lego) => {
        if (!err) {
            res.render('lego/info', { lego: lego })
        }
    })
})

router.get('/list', (req, res) => {
    LegoModel.find((err, data) => {
        if (!err) {
            res.render('lego/list', { lego: data, })
        }
    })
})

module.exports = router