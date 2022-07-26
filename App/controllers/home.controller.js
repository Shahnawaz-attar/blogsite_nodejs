let express = require("express");
let app = express();
let path = require("path");
const post_model = require('../models/post.model');
const banner_model = require('../models/banner.model')
const admin_model = require('../models/admin.model')
const videoModel = require('../models/video.model');
const baseUrl = 'http://localhost:4000/uploads/';

exports.getHome = ((req, resp) => {

    let all_post = post_model.get_all_post(30);
    let banners = banner_model.get_all_banners();
    let bestOftheWeek = post_model.bestOftheWeek();
    let videos = videoModel.get_all_videos();
    let popular = post_model.popular();
    Promise.all([all_post, banners, bestOftheWeek, popular, videos]).then((result) => {

        resp.render('index', { data: result[0], banners: result[1], bestOftheWeek: result[2], popular: result[3], videos: result[4] })
    }).catch(err => {
        resp.send(err);
    }
    )




})

exports.get_post_detail = (req, resp) => {
    let result = post_model.get_post(req.params.id);
    result.then((post) => {
        resp.render('post_detail', { post: post })
    }
    ).catch(err => {
        resp.send(err);
    }
    )


}
exports.save_newslatter = (req, res) => {
    let result = admin_model.save_newslatter(req.body);
    result.then(data => {

        if (data != null) {
            res.send({ status: true, msg: 'Thank you for subscribing' })
        } else {
            res.send({ status: false, msg: 'fail to subscribing' })
        }
    }).catch(err => {
        res.send({ status: true, msg: 'something went wrong' })
    })


}

//all_posts
exports.all_posts = (req, res) => {
    let result = post_model.get_all_post();
    result.then((posts) => {
        res.render('all_posts', { posts: posts })
    }
    ).catch(err => {
        res.send(err);
    }
    )
}


//search
exports.search = (req, res) => {
    let result = post_model.search(req.query.search);
    result.then((posts) => {
        res.render('searched_posts', { posts: posts })
    }
    ).catch(err => {
        res.send(err);
    }
    )
}


//getProducts by web scraping
exports.getProducts = (req, res) => {

}


//API section

// all_posts_api
exports.all_posts_api = (req, res) => {
    let result = post_model.get_all_post();
    result.then((posts) => {
        // for coverImage add base url
        posts.forEach(post => {
            post.coverImg = `${baseUrl}${post.coverImg}`;
        }
        )
        res.send(posts)
    }
    ).catch(err => {
        res.send(err);
    }
    )

}


//add_contact
exports.add_contact = (req, res) => {
    let result = admin_model.save_contact(req.body);
    result.then(data => {

        if (data != null) {
            res.send({ status: true, msg: 'Thank you we will contact you soon' })
        } else {
            res.send({ status: false, msg: 'fail to contact' })
        }
    }).catch(err => {
        res.send({ status: true, msg: 'something went wrong' })
    })

} 
    