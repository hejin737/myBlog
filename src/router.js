module.exports = {
    routes: [
        {
            path: '',
            component: require('./views/about.vue')
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
            path: '/resume',
            component: require('./views/resume.vue')
        }
    ]
}
