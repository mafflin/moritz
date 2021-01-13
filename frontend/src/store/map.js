import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

const TOKEN = process.env.VUE_APP_MAPBOX_TOKEN;
const STYLE = 'mapbox://styles/mapbox/outdoors-v11';

export default {
  namespaced: true,

  state: {
    map: null,
  },

  mutations: {
    setMap(state, mapRef) {
      state.map = mapRef;
    },
  },

  actions: {
    mountMap({ commit }, element) {
      mapboxgl.accessToken = TOKEN;
      const map = new mapboxgl.Map({
        container: element,
        style: STYLE,
      });

      commit('setMap', map);
    },
  },
};
