var express = require('express')
const WoodenModel = require('../models/WoodenModel')
var router = express.Router()

router.get('/', (req, res) => {
    WoodenModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/lego
            res.render('wooden/index', { wooden: data })
        }
    })
})

router.get('/add', (req, res) => {
    res.render("wooden/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    WoodenModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add wooden succeed !')
            res.redirect("/wooden")
        }
    })
})


router.get('/edit/:id', (req, res) => {
    WoodenModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/wooden)
            //gửi kèm dữ liệu của object wooden để load vào form edit
            //wooden (tên) , data (dữ liệu)
            res.render("wooden/update", { wooden: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var wooden = req.body;
    WoodenModel.findByIdAndUpdate(id, wooden, (err) => {
        if (err) {
            console.log(err)
        }else{
            console.log("Update wooden succeed !")
            res.redirect("/wooden")
        }
    })
})

router.get('/delete/:id', (req, res) => {
    WoodenModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete wooden succeed !");
            //var message = "Delete wooden succeed !";
            //redirect về trang /wooden (URL không phải view)
            res.redirect("/wooden");
        }
    })
})

router.post('/search', (req, res) => {
    WoodenModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('wooden/index', { wooden: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    WoodenModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('wooden/index', { wooden: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    WoodenModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('wooden/index', { wooden: data })
            }
        })
})

router.get('/drop', (req, res) => {
    WoodenModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/wooden')
    })
})

router.get('/detail/:id', (req, res) => {
    WoodenModel.findById(req.params.id, (err, wooden) => {
        if (!err) {
            res.render('wooden/info', { wooden: wooden })
        }
    })
})

router.get('/list', (req, res) => {
    WoodenModel.find((err, data) => {
        if (!err) {
            res.render('wooden/list', { wooden: data, })
        }
    })
})
module.exports = router