module.exports = function (opts) {
  opts.store.subscribe(onmount.bind(this))

  this.simulate = function () {
    var running = this.running
    opts.store.dispatch({type: opts.actions.runSimulation, data: !running})
  }

  function onmount () {
    this.running = opts.store.getState().running
    this.update()
  }
  onmount.bind(this)()
}
