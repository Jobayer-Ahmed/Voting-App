const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Polls = require('../models/polls');



router.get('/polls', (req, res) => {
	Polls.find({}, (err, polls) => {
		if (err) {
			return res.status(400).send(err);
		}
		if (polls.length < 1) {
			return res.status(400).send("No polls here yet!");
		}
		return res.status(201).send(polls);
	})
})

router.post('/polls', (req, res) => {
	let poll = new Polls();
	poll.name = req.body.name;
	poll.options = req.body.options;
	poll.user = req.body.id;
	poll.save((err, res) => {
		if (err) {
			return res.status(400).send(err);
		}
		return res.status(201).send(res)
	})
});

router.get('/checkUser/:username*', (req, res) => {
	let name = req.params
	User.findOne({username: req.params}, (err, user) => {
		if (err) throw err;
		if (user) {
			res.send("User Found");
		} else {
			res.send("Not Found");
		}
	})
})

router.post('/login', (req, res) => {
	if (req.body.name && req.body.password) {
		User.findOne({username: req.body.username}, (err, user) => {
			if (err) {
				return res.status(400).send('An error occured. Please try again');
			};
			if (!user) {
				return res.status(400).send('No user has been register with this credentials');
			};
			if (bcrypt.compareSync(req.body.password, user.password)) {
				let token = jwt.sign({
					data: user
				}, process.env.secret, {expiresIn: 3600});
				return res.status(200).send(token);
			}
			return res.status(400).send('Password is not correct');
		});
	} else {
		return res.status(400).send('Please enter a valid credentials!');
	}
})

router.post('/register', (req, res, next) => {
	if (req.body.username && req.body.password) {
		let user = new User();
		user.username = req.body.username;
		user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
		user.save((err, document) => {
			if (err) {
				return res.status(400).send(err);
			} else {
				let token = jwt.sign({
					data: document
				}, process.env.secret, {expiresIn: 3600});
				return res.status(201).send(token);
			}
		})
	} else {
		return res.status(400).send({
			message: 'Invalid credentials supplied'
		});
	}
});

module.exports = router;