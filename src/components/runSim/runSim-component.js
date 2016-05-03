'use strict'

const riot = require('riot')

module.exports = riot.tag('run-sim',
  require('./runSim.html'),
  require('./runSim.css'),
  require('./runSim.js')
)
