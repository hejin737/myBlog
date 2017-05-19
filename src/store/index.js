import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import music from './modules/music'

Vue.use(Vuex)

const isProd = process.env.NODE_ENV === 'prod'

const plugins = isProd ? [] : [createLogger()]

export default new Vuex.Store({
  strict: isProd,
  modules: {
    music
  },
  plugins
})
