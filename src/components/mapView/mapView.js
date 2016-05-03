module.exports = function (opts) {
  const mgl = opts.mgl

  function onmount () {
    var map = new opts.mgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [4.740716, 52.642138],
      zoom: 15
    })

    map.on('load', function () {
      // Add a source and layer displaying a point which will be animated in a circle.
      // http://localhost:8321/3di/data?REQUEST=getquantity&LAYERS=v2_bergermeer-v2_bergermeer_bres_maalstop-40-dd4c0489a9fe89b097de076b7a44a07bc162e25b&quantity=unorm,q,weirs,orifices,pumps,culverts,sewerage_pumps,p1dq,flou,flod&decimals=2&time=6
      drawChannels()

      function drawChannels () {
        const gjS = new mgl.GeoJSONSource({data: 'http://localhost:9000/onedee/tiles/v2_bergermeer-v2_bergermeer_bres_maalstop-40-dd4c0489a9fe89b097de076b7a44a07bc162e25b/40/14/8407/5364/.geojson?object_types=channel,pipe,pumpstation_line,node,weir,orifice,culvert,pumpstation,channel,v2_gui'})
        map.addSource('channels', gjS)
        map.addLayer({
          id: 'channels',
          source: 'channels',
          'type': 'line',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#888',
            'line-width': 8
          }
        })
      }
    })
  }

  this.on('updated', onmount.bind(this))
}
