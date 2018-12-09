const Flower = require('../Types/Flower')
const Bouquet = require('../Types/Bouquet')

// Getting an object that contains the flower species and the quantity
function parseExtractedFlower (string) {
  if (!/^[1-9]\d*[a-z]$/.test(string)) return false
  const species = string.replace(/\d+/, '')
  const quantity = parseInt(string.replace(/\D/, '')) || 0
  return { species, quantity }
}

// Parsing the string of flowers that constitute a bouquet to have an object
function parseBouquetFlowers (string, size) {
  const flowersArray = string.match(/[1-9]\d*[a-z]/g)
  if (!flowersArray) return false
  return flowersArray.reduce((result, item) => {
    const flower = parseExtractedFlower(item)
    if (!flower) return result
    // To make it faster, we will store the flowers with their species and add the bouquet size as the key
    const flowerName = `${flower.species}${size}`
    result[flowerName] = result[flowerName] ? result[flowerName] + flower.quantity : flower.quantity
    return result
  }, {})
}

// Parsing & checling the string that represents a flower and creating a flower object
function parseFlowerEntry (string) {
  // Checking if the string matches the flower format aL-zS otherwise returning false
  if (!/^[a-z][LS]$/.test(string)) return false
  const array = string.split('')
  // returning a flower object
  return new Flower(array[0], array[1])
}

// Parsing & checling the string that represents a bouquet and creating a bouquet object
function parseBouquetEntry (string) {
  // Checking if it's a correct bouquet format
  if (!/^[A-Z][LS]([1-9]\d*[a-z])+[1-9]\d*$/.test(string)) return false
  // Extracting data using the regex groups
  const matches = /^([A-Z])([LS])(([1-9]\d*[a-z])+)([1-9]\d*)+$/.exec(string)
  const flowers = parseBouquetFlowers(matches[3], matches[2])
  if (!flowers) return false
  // returning a bouquet object
  const quantity = parseInt(matches[5])
  return new Bouquet(matches[1], matches[2], flowers, quantity, string)
}

module.exports = {
  parseFlowerEntry,
  parseBouquetEntry,
  parseBouquetFlowers,
  parseExtractedFlower
}
