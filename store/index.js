import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		token:null,
	},
	mutations: {
		SET_TOKEN(state, payload){
			state.token = payload;
		}
	}
})

export default store
