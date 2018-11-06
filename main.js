class PriorityQueue {
  constructor() {
    this.items = []
  }

  add (element, priority) {
    let v = new Element(element, priority)
    let i = 0
    let contain = false

    while ((!contain) && (i < this.items.length)) {
      if (v.priority > this.items[i].priority) {
        this.items.splice(i, 0, v)
        contain = true
        break
      } else { i++ }
    }
    if (!contain) {
      this.items.push(v)
    }
  }

  delete () {
    if (this.isEmpty()) { return 'Underflow!' }
      else { return this.items.shift() }
  }

  isEmpty () { return this.items.length === 0 }

  head () {
    if (this.isEmpty()) { return 'Queue have no elements!' }
      else { return this.items[0] }
  }

  tail () {
    if (this.isEmpty()) { return 'Queue have no elements!' }
      else { return this.items[this.items.length -1] }
  }

  showItems () {
    if (this.isEmpty()) { return 'Queue have no elements!' }
      else { return this.items }
  }
}

class Element {
  constructor(element, priority) {
    this.element = element,
    this.priority = priority
  }
}

// ----------------------------- stupid pasting ^^^

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
          for (w in parents) {
            if (parents[w] === edge && parents[w] !== start) {
              weights = { ...weights, [w]: weights[edge] + graph[edge][w] }
            }
          }
        }
      }
    }
  }
  return { a: weights, b: parents}
}

startButton = document.getElementById('start')
startButton.addEventListener('click', () => {
  priorityQueue = new PriorityQueue()
  priorityQueue.add('Dog', 3)
  priorityQueue.add('Cat', 1)
  priorityQueue.add('Crocodile', 2)
  console.log('head', priorityQueue.head())
  console.log('tail', priorityQueue.tail())
  console.log('all', priorityQueue.showItems())
  console.log('delete', priorityQueue.delete())
  console.log('delete', priorityQueue.delete())
  console.log('delete', priorityQueue.delete())
  console.log('delete', priorityQueue.delete())
})