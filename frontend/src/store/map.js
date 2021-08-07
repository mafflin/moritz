import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

const TOKEN = process.env.VUE_APP_MAPBOX_TOKEN;
const STYLE = 'mapbox://styles/mapbox/outdoors-v11';

export default {
  namespaced: true,

  state: {
    map: null,
    enabled: false,
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

    drawMarker({ getters: { map } }, point) {
      new mapboxgl.Marker()
        .setLngLat(point)
        .addTo(map);
    },

    drawLocations({ getters: { map, locations }, dispatch }) {
      if (!map) return;

      locations.forEach(
        (location) => dispatch('drawMarker', location.center),
      );
    },
  },

  getters: {
    map: ({ map }) => map,
    locations: (state, getters, rootState, rootGetters) => {
      const payments = rootGetters['payments/payments'];
      return payments.map((payment) => payment.location)
        .filter((location) => !!location);
    },
  },
};
