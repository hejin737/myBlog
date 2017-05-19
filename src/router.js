module.exports = {
    routes: [
        {
            path: '',
            component: require('./views/music.vue')
        },
        {
            path: '/music',
            component: require('./views/music.vue')
        },
        {
            path: '/blogs',
            component: require('./views/blogs.vue')
        },
        {
            path: '/picture',
            component: require('./views/picture.vue')
        }
    ]
}
