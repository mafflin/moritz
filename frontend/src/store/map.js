import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

const STYLE = 'mapbox://styles/mapbox/outdoors-v11';

export default {
  namespaced: true,

  state: {
    map: null,
    token: process.env.VUE_APP_MAPBOX_TOKEN,
    enabled: process.env.VUE_APP_GEO_SERVICE === 'true',
  },

  mutations: {
    setMap(state, mapRef) {
      state.map = mapRef;
    },
  },

  actions: {
    mountMap({ commit, getters: { token } }, element) {
      mapboxgl.accessToken = token;
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
    map({ map }) {
      return map;
    },

    token({ token }) {
      return token;
    },

    locations(state, getters, rootState, rootGetters) {
      const payments = rootGetters['payments/payments'];
      return payments.map((payment) => payment.location)
        .filter((location) => !!location);
    },

    geoServiceEnabled({ enabled, token }) {
      return !!enabled && !!token;
    },
  },
};
