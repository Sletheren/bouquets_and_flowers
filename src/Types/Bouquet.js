class Bouquet {
  constructor(name, size, flowers = {}, quantity, definition) {
    this.name = name
    this.size = size
    this.flowers = flowers
    this.quantity = quantity
    this.definition = definition
  }

  // Checking if the bouquet is ready to be assambled
  isReady (availableFlowers) {
    return Object.keys(this.flowers).filter(flowerName => {
      return availableFlowers[flowerName] >= this.flowers[flowerName]
    }).length === Object.keys(this.flowers).length
  }
}

module.exports = Bouquet
