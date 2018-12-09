class Flower {
  constructor (species, size = 1) {
    this.species = species
    this.size = size
    this.name = `${species}${size}`
  }
}

module.exports = Flower
