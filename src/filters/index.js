import Vue from 'vue'
import specialty from './specialty'
import modality from './modality'
import modalityIcon from './modalityIcon'
import materialColor from './materialColor'

Vue.filter('specialty', specialty)
Vue.filter('modality', modality)
Vue.filter('modalityIcon', modalityIcon)
Vue.filter('materialColor', materialColor)
