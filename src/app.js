'use strict'

const riot = require('riot')
const redux = require('redux')
const socket = require('./lib/socket')
const runSim = require('./components/runSim/runSim-component')
const mapView = require('./components/mapView/mapView-component')
const actions = {
  runSimulation: 'RUN_SIMULATION'
}

const mgl = require('mapbox-gl')
mgl.accessToken = require('./settings.json').accessToken

function reducer (state, action) {
  if (!state) {
    state = {
      running: false
    }
  }
  switch (action.type) {
    case actions.runSimulation:
      return Object.assign({}, state, {running: action.data})
    default:
      return state
  }
}

const store = redux.createStore(reducer)

socket(store)
riot.mount(runSim, {store: store, actions: actions})
riot.mount(mapView, {store: store, mgl: mgl})
