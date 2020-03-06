const state = {
  themes: {
    theme: '#3d3d3d',
    themeDark: '#232323',
    themeDarkLight: '#323232',
    themeLight: '#a0a0a0'
  }
}

const getters = {
  getThemes: state => state.themes,
  getStyleTheme: state => (theme, string) => string + ': ' + theme
}

const mutations = {
}

const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
