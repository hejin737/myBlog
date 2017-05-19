const types = {
  SET_MUSIC: 'SET_MUSIC',
  SET_INDEX: 'SET_INDEX'
}

const state = {
  music: null,
  currentIndex: 0
}

const actions = {
  setMusic({ commit }, music) {
    commit(types.SET_MUSIC, { music })
  },
  setIndex({ commit }, index) {
    commit(types.SET_INDEX, { index })
  }
}

const mutations = {
  [types.SET_MUSIC](state, { music }) {
    state.music = music
  },
  [types.SET_INDEX](state, { index }) {
    state.currentIndex = index
  }
}

export default {
  state,
  actions,
  mutations
}
