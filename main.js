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
      console.log('pieseł', graph[start][v])
    } else if ( v !== start && v !== end ) {
      weights = { ...weights, [v]: null }
    }
  }
  console.log(weights)
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

// const lowestCostNode = (costs, processed) => {
//   return Object.keys(costs).reduce((lowest, node) => {
//     if (lowest === null || costs[node] < costs[lowest]) {
//       if (!processed.includes(node)) { lowest = node }
//     }
//     return lowest
//   }, null)
// }

// meat and potatoes
const shortestPath = (start, end, graph) => {
  let weights = verticsWeight( start, end, graph )
  console.log({ s: start, e: end, weights: weights, graph })
  let parents = parentVertics( 'S', weights )
  for (v in graph) {
    if (v !== start) {
      for (edge in graph[v]) {
        // console.log('sowa', v, graph[v], edge, [edge], graph[v][edge], weights)
        console.log('sowa', { v: v, edge: edge, weights_v: weights[v], weights_ve: weights[edge] }, '\n')
        // v === 'B'
        // edge === 'A'
        // if (weights[edge] === null || weights[edge] > (weights[v] + graph[v][edge])) {
        //   parents[edge] = v
        //   weights[edge]= weights[v] + graph[v][edge]
        // }
      }
    }
  }
  return { a: weights, b: parents}
}

const main = () => {
  let weights = verticsWeight( 'S', 'E', graph )
  console.log(weights)
  let parents = parentVertics('S', weights)
  console.log(parents)
  let v = shortestPath( 'S','E', graph )
  console.log(v)
}