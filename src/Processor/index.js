const parsers = require('../Parsers')
const Factory = require('../Factory')

class Processor {
  constructor () {
    // setting a flag to determing if the process of collecting flowers has began or not
    this.collectingFlowers = false
    // initializing the factory
    this.factory = new Factory()
  }

  // Parsing every line inputed from the terminal/file
  lineReader (line) {
    if (!line) {
      // When an empty line we stop collecting bouquet 
      this.collectingFlowers = true
      console.log('Done Collecting Bouquet Specs, Start collecting Flowers')
      return
    }

    if (!this.collectingFlowers) {
      // Creating a bouquet object and storing it in the factory object (if it doesn't match a bouquet format we skip it)
      const bouquet = parsers.parseBouquetEntry(line)
      if (bouquet) this.factory.addBouquet(bouquet)
    } else {
      // Creating a flower object and storing it in the factory (if it doesn't match a flower format we skip it)
      const flower = parsers.parseFlowerEntry(line)
      if (flower) {
        this.factory.putFlower(flower)
      }
    }
  }

}

module.exports = Processor
