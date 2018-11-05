// example of directed graph, vertics and edges pointing from them with weight
const graph = {
  S: { A: 6, B: 4 },
  A: { B: 2, E: 3 },
  B: { A: 1, C: 3, E: 9 },
  C: { S: 7, E: 5 },
  E: { C: 4 }
}

const verticsWeight = (start, end, graph) => {
  let weights = {
    [start]: 0,
    [end]: Infinity
  }
  for (v in graph) {
    if (v in graph[start]) {
      weights = { ...weights, [v]: graph[start][v] }
    } else if ( v !== start && v !== end ) {
      weights = { ...weights, [v]: null }
    }
  }
  return weights
}

const parentVertics = (start, verticsWeight) => {
  let parentVertics = verticsWeight
  for (v in parentVertics) {
    if (parentVertics[v] === 0) { parentVertics[v] = 0 }
    else if (parentVertics[v] === null || parentVertics[v] === Infinity) { parentVertics[v] = null }
    else parentVertics[v] = start
  }
  return parentVertics
}

// meat and potatoes
const shortestPath = (start, end, graph) => {
  let weights = verticsWeight( start, end, graph )
  let parents = parentVertics( start, {...weights} )
  for (v in graph) {
    if (v !== start) {
      for (edge in graph[v]) {
        if (weights[edge] === null || weights[edge] > (weights[v] + graph[v][edge])) {
          parents = { ...parents, [edge]: v }
          weights= { ...weights, [edge]: weights[v] + graph[v][edge] }
          // if (weights[edge] > (weights[v] + graph[v][edge])) {
            console.log('here am i!', {edge, v, parents, weights})
            for (w in parents) {
              if (parents[w] === edge && parents[w] !== start) {
                weights = { ...weights, [w]: weights[edge] + graph[edge][w] }
              }
            }
          // }
        }
      }
    }
  }
  return { a: weights, b: parents}
}

const main = () => {
  let v = shortestPath( 'S','E', graph )
  console.log(v)
}