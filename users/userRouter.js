const express = require('express');

const router = express.Router();
router.use(express.json());

const db = require('./userDb');



router.post('/', (req, res) => {
    const newuser = req.user;
    db.insert(newuser)
    .then(res => {
        const allusers = db.get()
        res.status(200).json({ success: true, message: `${newuser} added successfully!`}, allusers)
    })
    .catch(err => {
        res.status(500).json({ success: false, message: 'bummer...', err })
    })
});

router.post('/:id/posts', (req, res) => {

});

//calling find returns a promise that resolves to an array of all the resources contained in the database.
router.get('/', (req, res) => {
    db.get()
    .then(users => {
        res.status(200).json({ success: true, message: 'Users located!', users })
    })
    .catch(err => {
        res.status(400).json({ success: false, err, message: 'No users here mate!' })
    })
});

router.get('/:id', validateUserId, (req, res) => {
    // console.log(req.user)
    // console.log(res)
    const { id } = req.user
    db.getById(id)
    .then(user => {
        res.status(200).json({ success: true, message: `${user.name} located!`, user })
    })
    .catch(err => {
        res.status(400).json({ success: false, err, message: 'No users here mate!' })
    })
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    if(req.params && req.params.id) {
        // console.log(req.params)
        req.user = req.params;
        next();
    }else {
        res.status(400).json({ message: 'Invalid user id!' });
    }
    } 

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
