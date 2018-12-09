const { parseFlowerEntry, parseBouquetEntry, parseBouquetFlowers, parseExtractedFlower } = require('../src/Parsers')
const Flower = require('../src/Types/Flower')
const Bouquet = require('../src/Types/Bouquet')

describe('Parsing Flowers', function() {
  it('should not be able to parse a flower entry', function () {
    expect(parseFlowerEntry('')).toBeFalsy();
    expect(parseFlowerEntry('a')).toBeFalsy();
    expect(parseFlowerEntry('aX')).toBeFalsy();
    expect(parseFlowerEntry('1a')).toBeFalsy();
    expect(parseFlowerEntry('xA')).toBeFalsy();
  })
  it('should parse a flower entry', function () {
    expect(parseFlowerEntry('aL')).toEqual(new Flower('a', 'L'));
    expect(parseFlowerEntry('zS')).toEqual(new Flower('z', 'S'));
  })
})

describe('Parsing Bouquet\'s flowers with quantity', function() {
  it('should not be able to parse the flowers with their quantity', function () {
    expect(parseExtractedFlower('1')).toBeFalsy();
    expect(parseExtractedFlower('a')).toBeFalsy();
    expect(parseExtractedFlower('A1')).toBeFalsy();
    expect(parseExtractedFlower('A1')).toBeFalsy();
    expect(parseExtractedFlower('abc')).toBeFalsy();
  })
  it('should be able to parse the flowers with their quantity', function () {
    expect(parseExtractedFlower('1a')).toEqual({species: 'a', quantity: 1});
    expect(parseExtractedFlower('20z')).toEqual({species: 'z', quantity: 20});
  })
})

describe('Parsing Bouquet\'s flowers as object', function() {
  it('should not be able to parse the flowers object', function () {
    expect(parseBouquetFlowers('1111', 'L')).toBeFalsy();
    expect(parseBouquetFlowers('aaaa', 'S')).toBeFalsy();
    expect(parseBouquetFlowers('A1A1', 'L')).toBeFalsy();
    expect(parseBouquetFlowers('1A1A', 'S')).toBeFalsy();
  })
  it('should be able to parse the flowers object', function () {
    expect(parseBouquetFlowers('1a2b', 'L')).toEqual({aL: 1, bL: 2});
    expect(parseBouquetFlowers('30a3b1c', 'S')).toEqual({aS: 30, bS: 3, cS: 1});
  })
})

describe('Parsing Bouquets', function() {
  it('should not be able to parse a Bouquet entry', function () {
    expect(parseBouquetEntry('')).toBeFalsy();
    expect(parseBouquetEntry('abcde')).toBeFalsy();
    expect(parseBouquetEntry('AL123')).toBeFalsy();
    expect(parseBouquetEntry('AL1A')).toBeFalsy();
    expect(parseBouquetEntry('AL12a')).toBeFalsy();
    expect(parseBouquetEntry('AL12ab')).toBeFalsy();
    expect(parseBouquetEntry('AX1a2b3')).toBeFalsy();
  })
  it('should parse a bouquet entry', function () {
    expect(parseBouquetEntry('AL1a2b3')).toEqual(new Bouquet('A','L',{aL: 1, bL: 2},3,'AL1a2b3'));
    expect(parseBouquetEntry('BS10x10y20')).toEqual(new Bouquet('B','S',{xS: 10, yS: 10},20,'BS10x10y20'));
  })
})
