import Vue from 'vue'
import specialty from './specialty'
import modality from './modality'
import modalityIcon from './modalityIcon'
import materialColor from './materialColor'
import tableHeader from './tableHeader'

Vue.filter('specialty', specialty)
Vue.filter('modality', modality)
Vue.filter('modalityIcon', modalityIcon)
Vue.filter('materialColor', materialColor)
Vue.filter('tableHeader', tableHeader)
