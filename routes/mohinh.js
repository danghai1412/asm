var express = require('express')
const MohinhModel = require('../models/MohinhModel')
var router = express.Router()


router.get('/', (req, res) => {
    MohinhModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/lego
            res.render('mohinh/index', { mohinh: data })
        }
    })
})
router.get('/add', (req, res) => {
    res.render("mohinh/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    MohinhModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add mohinh succeed !')
            res.redirect("/mohinh")
        }
    })
})


router.get('/edit/:id', (req, res) => {
    MohinhModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/mohinh)
            //gửi kèm dữ liệu của object mohinh để load vào form edit
            //mohinh (tên) , data (dữ liệu)
            res.render("mohinh/update", { mohinh: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var mohinh = req.body;
    MohinhModel.findByIdAndUpdate(id, mohinh, (err) => {
        if (err) {
            console.log(err)
        }else{
            console.log("Update mohinh succeed !")
            res.redirect("/mohinh")
        }
    })
})

router.get('/delete/:id', (req, res) => {
    MohinhModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete mohinh succeed !");
            //var message = "Delete mohinh succeed !";
            //redirect về trang /mohinh (URL không phải view)
            res.redirect("/mohinh");
        }
    })
})

router.post('/search', (req, res) => {
    MohinhModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('mohinh/index', { mohinh: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    MohinhModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('mohinh/index', { mohinh: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    MohinhModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('mohinh/index', { mohinh: data })
            }
        })
})

router.get('/drop', (req, res) => {
    MohinhModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/mohinh')
    })
})

router.get('/detail/:id', (req, res) => {
    MohinhModel.findById(req.params.id, (err, mohinh) => {
        if (!err) {
            res.render('mohinh/info', { mohinh: mohinh })
        }
    })
})

router.get('/list', (req, res) => {
    MohinhModel.find((err, data) => {
        if (!err) {
            res.render('mohinh/list', { mohinh: data, })
        }
    })
})
module.exports = router
