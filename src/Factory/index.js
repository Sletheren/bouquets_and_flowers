class Factory {
  constructor () {
    // The factory's max capacity of flowers that can be held at once
    this.capacity = 256

    this.bouquets = []
    this.stock = { stored: 0, flowers: {} }
  }

  // Adding a bouquet to our Factory
  addBouquet (bouquet) {
    this.bouquets.push(bouquet)
  }

  // Putting a flower into the factory
  putFlower (flower) {
    // Checking if we reached the max factiry storage space
    if (this.stock.stored >= this.capacity) {
      console.log('*** The Facility storage is full! ***')
      process.exit(1)
    }
    // Incrementing the global quantity of stored flowers
    this.stock.stored++
    // Initialize or increment the number of flowers for each type
    if (this.stock.flowers[flower.name]) this.stock.flowers[flower.name]++
    else this.stock.flowers[flower.name] = 1
    // Check if a bouquet is Ready
    this.watchBouquets()
  }

  // Removing a flower from the flowers factory to use it in a Bouquet
  takeFlower (flowerName, amount) {
    if (this.stock.flowers[flowerName] && this.stock.flowers[flowerName] >= amount) {
      this.stock.flowers[flowerName] -= amount
      // updating the factory's global stored flowers
      this.stock.stored -= amount
    }
  }

  // Removing a bouquet from the factory because it's ready to be shipped to make someone's day better :D
  removeBouquet (definition) {
    this.bouquets = this.bouquets.filter(bouquet => bouquet.definition !== definition)
  }

  // Putting the needed flower for the bouquet to ship it out
  prepareBouquet (bouquet) {
    // looping through the flowers and take them from the factory's available stock
    Object.keys(bouquet.flowers).forEach(flowerName => {
      this.takeFlower(flowerName, bouquet.flowers[flowerName])
    })
    // Removing the ready-to-go bouquet from the factory
    this.removeBouquet(bouquet.definition)
    console.log(`Bouquet complete: ${bouquet.definition}`)
  }

  // Checking if a bouquet is ready to be created
  watchBouquets () {
    this.bouquets.every(bouquet => {
      // checking if the bouquet is ready
      if (bouquet.isReady(this.stock.flowers)) {
        this.prepareBouquet(bouquet)
        return false
      } else {
        return true
      }
    })
  }

}

module.exports = Factory
