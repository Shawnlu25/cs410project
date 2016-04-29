import Simple from './Simple/Simple.js'
import api from './api.js'

let emitter = Simple.createEmitter({
})

emitter.on('search', function({query, size, page}, component) {
  api.search({query, size, page}, function(res) {
    component.stopTimer()
    component.setProps({counts: res.counts, results: res.result, searching: false, page})
  })
})

emitter.on('recommend', function({keywords}, component) {
  api.recommend({keywords}, function(res) {
    console.log(res)
    return
    
    let results = res.result
    if (typeof (results) === 'string') {
      results = []
    }
    component.setProps({results, isRecommendation: true})
  })
})

export default emitter
