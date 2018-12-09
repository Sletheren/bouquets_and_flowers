const fs =  require('fs')
const readline =  require('readline')
const Processor = require('./Processor')

// Retrieving the execution mode (live or manual) to whether read from the terminal or process from the samples file
const mode = process.env.MODE
const input = mode === 'cli' ? process.stdin : fs.createReadStream('sample/input.txt')

// Setting the interface to manage I/O
const lineReader =readline.createInterface({
  input: input,
  output: process.stdout
})

// Creating an instance of our main Processor
const processor = new Processor()

// Reading the lines and beginning magic
lineReader.on('line', (line) => {
  processor.lineReader(line)
})
