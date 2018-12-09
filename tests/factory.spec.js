const Factory = require('../src/Factory')
const Flower = require('../src/Types/Flower')
const Bouquet = require('../src/Types/Bouquet')


describe('Factory Handling', function() {
  
  it('should add one bouquet to the factory', function () {
    const factory = new Factory()
    const bouquet = new Bouquet('A', 'L', {aL: 1, bL: 2}, 3, 'AL1a2b3')
    factory.addBouquet(bouquet)
    expect(factory.bouquets.length).toEqual(1)
  })

  it('should add and remove a bouquet from the factory', function () {
    const factory = new Factory()
    const bouquet = new Bouquet('A', 'L', {aL: 1, bL: 2}, 3, 'AL1a2b3')
    factory.addBouquet(bouquet)
    expect(factory.bouquets.length).toEqual(1)
    factory.removeBouquet('AL1a2b3')
    expect(factory.bouquets.length).toEqual(0)
  })

  it('should add two flowers of the same species to the factory\'s stored flowers', function () {
    const factory = new Factory()
    const flower1 = new Flower('a', 'L')
    const flower2 = new Flower('a', 'L')
    factory.putFlower(flower1)
    expect(factory.stock.stored).toEqual(1)
    expect(factory.stock.flowers).toEqual({aL: 1})
    factory.putFlower(flower2)
    expect(factory.stock.stored).toEqual(2)
    expect(factory.stock.flowers).toEqual({aL: 2})
  })

  it('should add two flowers of the different species to the factory\'s stored flowers', function () {
    const factory = new Factory()
    const flower1 = new Flower('a', 'L')
    const flower2 = new Flower('b', 'S')
    factory.putFlower(flower1)
    expect(factory.stock.stored).toEqual(1)
    expect(factory.stock.flowers).toEqual({aL: 1})
    factory.putFlower(flower2)
    expect(factory.stock.stored).toEqual(2)
    expect(factory.stock.flowers).toEqual({aL: 1, bS: 1})
  })

  it('should add a flower and take it back', function () {
    const factory = new Factory()
    const flower = new Flower('a', 'L')
    factory.putFlower(flower)
    expect(factory.stock.stored).toEqual(1)
    expect(factory.stock.flowers).toEqual({aL: 1})
    factory.takeFlower('aL', 1)
    expect(factory.stock.stored).toEqual(0)
    expect(factory.stock.flowers).toEqual({aL: 0})
  })

  it('should add a flower and take it back', function () {
    const factory = new Factory()
    const flower = new Flower('a', 'L')
    factory.putFlower(flower)
    expect(factory.stock.stored).toEqual(1)
    expect(factory.stock.flowers).toEqual({aL: 1})
    factory.takeFlower('aL', 1)
    expect(factory.stock.stored).toEqual(0)
    expect(factory.stock.flowers).toEqual({aL: 0})
  })

  it('Should determine no bouquet is ready yet', function () {
    const factory = new Factory()
    const bouquet = new Bouquet('A', 'L', {aL: 1, bL: 1}, 2, 'AL1a1b3')
    const flower = new Flower('a', 'L')
    factory.addBouquet(bouquet)
    factory.putFlower(flower)
    factory.watchBouquets()
    expect(factory.stock.stored).toEqual(1)
    expect(factory.stock.flowers).toEqual({aL: 1})
    expect(factory.bouquets.length).toEqual(1)
  })

  it('Should determine a bouquet is ready', function () {
    const factory = new Factory()
    const bouquet = new Bouquet('A', 'L', {aL: 1, bL: 1}, 2, 'AL1a1b3')
    const flower1 = new Flower('a', 'L')
    const flower2 = new Flower('b', 'L')
    factory.addBouquet(bouquet)
    factory.putFlower(flower1)
    expect(factory.stock.stored).toEqual(1)
    expect(factory.stock.flowers).toEqual({aL: 1})
    expect(factory.bouquets.length).toEqual(1)
    factory.putFlower(flower2)
    expect(factory.stock.stored).toEqual(0)
    expect(factory.stock.flowers).toEqual({aL: 0, bL: 0})
    expect(factory.bouquets.length).toEqual(0)
  })

})
