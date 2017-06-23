wms = require('wms')
app = require('express')()

var layerInfo = {
  title: 'a title',
  abstract: 'not like picaso',
  host: 'abc://blah.blah',
  layers: [
    {
      title: 'my layer',
      name: 'jeffery',
      bbox: [-106.787109375, 25.8394494020632,
          -93.427734375, 36.6331620955865],
      range: [10, 12],
      // タイルをとってきた時のコールバック？
      getTile: (a, b, c, cb) => {
        process.nextTick(cb, null, fakeTile, fakeHeaders)
      }
    }
  ]
}

app.get('/wms', (req, res) => {
    wms(layerInfo, {
        service: 'wmts',
        request: 'GetCapabilities'
    }).then(wmsRes => {
            res.set(wmsRes.headers)
            res.status(wmsRes.code)
            res.send(wmsRes.data)
  })
})

app.listen(4000)
