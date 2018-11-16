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
  } while (v.element !== end && v !== 'Underflow!')
  return path
}

startButton = document.getElementById('start')
startButton.addEventListener('click', () => {
  let path = shortestPath('S', 'E', graph)
  console.log(path)
})