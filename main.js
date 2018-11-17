// example of directed graph, vertics and edges pointing from them with weight
const graph = {
  S: { A: 6, B: 4 },
  A: { B: 2, E: 3 },
  B: { A: 1, C: 3, E: 9 },
  C: { S: 7, E: 5 },
  E: { C: 4 }
}

const verticsWeight = (start, end, graph) => {
  let weights = {}
  for (v in graph) {
    if (v === start) { weights = {...weights, [start]: 0} }
    else { weights = {...weights, [v]: null} }
  }
  return weights
}

// meat and potatoes
const shortestPath = (start, end, graph) => {
  let weights = verticsWeight( start, end, graph )
  let v
  let path = []
  let queue = new PriorityQueue()
  queue.add(start, 0, start)
  do {
    v = queue.delete()
    for (route in graph[v.element]) {
      if(weights[route] === null) {
        queue.add(route, (weights[v.element] + graph[v.element][route]), v.element)
        weights = {...weights, [route]: weights[v.element] + graph[v.element][route]}
      } else if ((weights[v.element] + graph[v.element][route]) <= weights[route]) {
        queue.add(route, (weights[v.element] + graph[v.element][route]), v.element)
        weights = {...weights, [route]: weights[v.element] + graph[v.element][route]}
      }
    }
    path.push(v)
    // if (queue.tail().priority >)
  } while (v.element !== end && v !== 'Underflow!')
  // v = algorithmPath[algorithmPath.length - 1]
  // do {

  // } while (v.element !== start && v.parent !== start)
  return path
}

startButton = document.getElementById('start')
startButton.addEventListener('click', () => {
  let algorithmPath = shortestPath('S', 'E', graph)
  // let score = {}
  // let v = algorithmPath[algorithmPath.length - 1]
  // do {
  //   path.forEach(element => {
  //     if (v.parent === element.element) {
  //       if (typeof score[element.element] === 'undefined') {
  //         score = {...score, [v.element]: [v.priority]}
  //          = 
  //       }
  //       else if (score[v.element]) {  }
  //     }
  //   })
  // } while (v.element !== 'S' && v.parent !== 'S')
  console.log(algorithmPath)
})