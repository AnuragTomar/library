var User= require('../models/user');
var Author = require('../models/author');
var Genre = require('../models/genre');
var Book= require('../models/book');
var async= require('async');

exports.user_list= function(req, res, next){
	User.find()
		.exec(function(err,list_users){
			if (err)
			{
				return next(err);
			}
	res.render('user_list',{title:'Users List',user_list:list_users});
		});
};

exports.user_detail= function(req, res, next){
	async.parallel({
	user:function(callback){
		User.findById(req.params.id)
		.populate('fav_authors')
		.populate('fav_books')
		.populate('preferred_genres')
		.exec(callback);
	},
	},function(err,results){
		if(err)
		{
			return next(err);
		}
		res.render('user_detail',{title:'User Detail',user:results.user});
	});
};

