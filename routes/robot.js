const express = require('express')
const RobotModel = require('../models/RobotModel')
const router = express.Router()

router.get('/', (req, res) => {
    RobotModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/robot
            res.render('robot/index', { robot: data })
        }
    })
})

router.get('/add', (req, res) => {
    res.render("robot/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    RobotModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add robot succeed !')
            res.redirect("/robot")
        }
    })
})


router.get('/edit/:id', (req, res) => {
    RobotModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/robot)
            //gửi kèm dữ liệu của object robot để load vào form edit
            //robot (tên) , data (dữ liệu)
            res.render("robot/update", { robot: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var robot = req.body;
    RobotModel.findByIdAndUpdate(id, robot, (err) => {
        if (err) {
            console.log(err)
        }else{
            console.log("Update robot succeed !")
            res.redirect("/robot")
        }
    })
})

router.get('/delete/:id', (req, res) => {
    RobotModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete robot succeed !");
            //var message = "Delete robot succeed !";
            //redirect về trang /robot (URL không phải view)
            res.redirect("/robot");
        }
    })
})

router.post('/search', (req, res) => {
    RobotModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
        if (!err) {
            res.render('robot/index', { robot: data })
        }
    })
})
//sort function
router.get('/sort/asc', (req, res) => {
    RobotModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('robot/index', { robot: data })
            }
        })
})

router.get('/sort/desc', (req, res) => {
    RobotModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('robot/index', { robot: data })
            }
        })
})

router.get('/drop', (req, res) => {
    RobotModel.deleteMany({}, () => {
        console.log("Delete all data succeed !")
        res.redirect('/robot')
    })
})

router.get('/detail/:id', (req, res) => {
    RobotModel.findById(req.params.id, (err, robot) => {
        if (!err) {
            res.render('robot/info', { robot: robot })
        }
    })
})

router.get('/list', (req, res) => {
    RobotModel.find((err, data) => {
        if (!err) {
            res.render('robot/list', { robot: data, })
        }
    })
})
module.exports = router