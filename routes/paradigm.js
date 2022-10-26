var express = require('express')
const ParadigmModel = require('../models/ParadigmModel')
var router = express.Router()


router.get('/', (req, res) => {
    ParadigmModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/lego
            res.render('paradigm/index', { paradigm: data })
        }
    })
})
router.get('/add', (req, res) => {
    res.render("paradigm/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    ParadigmModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add paradigm succeed !')
            res.redirect("/paradigm")
        }
    })
})


router.get('/edit/:id', (req, res) => {
    ParadigmModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/paradigm)
            //gửi kèm dữ liệu của object paradigm để load vào form edit
            //paradigm (tên) , data (dữ liệu)
            res.render("paradigm/update", { paradigm: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var paradigm = req.body;
    ParadigmModel.findByIdAndUpdate(id, paradigm, (err) => {
        if (err) {
            console.log(err)
        }else{
            console.log("Update paradigm succeed !")
            res.redirect("/paradigm")
        }
    })
})

router.get('/delete/:id', (req, res) => {
    ParadigmModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete paradigm succeed !");
            //var message = "Delete paradigm succeed !";
            //redirect về trang /paradigm (URL không phải view)
            res.redirect("/paradigm");
        }
    })
})

router.post('/search', (req, res) => {
    ParadigmModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('paradigm/index', { paradigm: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    ParadigmModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('paradigm/index', { paradigm: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    ParadigmModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('paradigm/index', { paradigm: data })
            }
        })
})

router.get('/drop', (req, res) => {
    ParadigmModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/paradigm')
    })
})

router.get('/detail/:id', (req, res) => {
    ParadigmModel.findById(req.params.id, (err, paradigm) => {
        if (!err) {
            res.render('paradigm/info', { paradigm: paradigm })
        }
    })
})

router.get('/list', (req, res) => {
    ParadigmModel.find((err, data) => {
        if (!err) {
            res.render('paradigm/list', { paradigm: data, })
        }
    })
})
module.exports = router
