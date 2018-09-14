import Vue from 'vue'
import specialty from './specialty'
import modality from './modality'
import modalityIcon from './modalityIcon'

Vue.filter('specialty', specialty)
Vue.filter('modality', modality)
Vue.filter('modalityIcon', modalityIcon)
