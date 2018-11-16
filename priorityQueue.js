class PriorityQueue {
  constructor() {
    this.items = []
  }

  add (element, priority, parent) {
    let v = new Element(element, priority, parent)
    let i = 0
    let contain = false

    while ((!contain) && (i < this.items.length)) {
      if (v.priority < this.items[i].priority) {
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
    if (this.isEmpty()) { return 'Queue have no elements' }
      else { return this.items[0] }
  }

  tail () {
    if (this.isEmpty()) { return 'Queue have no elements' }
      else { return this.items[this.items.length -1] }
  }

  showItems () {
    if (this.isEmpty()) { return 'Queue have no elements' }
      else { return this.items }
  }
}