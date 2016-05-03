'use strict'

const riot = require('riot')

module.exports = riot.tag('map-view',
  require('./mapView.html'),
  require('./mapView.css'),
  require('./mapView.js')
)
