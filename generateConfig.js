//generateConfig.js

const fs = require('fs')
const readline = require('readline-sync')

function generateConfig(fileName) {
  if (!fs.existsSync(fileName)) {
    const questions = [
      {
        name: 'typescript',
        text: 'Do you want to use TypeScript? (y/n) ',
      },
      {
        name: 'css',
        text: 'Do you want to include css files? (y/n) ',
      },
      {
        name: 'preprocessor',
        text: 'Which CSS preprocessor do you want to use? (css/scss) ',
      },
      {
        name: 'path',
        text: 'What is the path to your components directory? (default: src/components) ',
      },
    ].map((q) => ({ ...q, text: makeItBlue(q.text) }))

    const defaultPreprocessor = 'css'
    const defaultPath = 'src/components'

    console.log(`\nInitial configuration\n---------------------`)

    const typescriptAnswer = readline.question(questions[0].text)
    const cssAnswer = readline.question(questions[1].text)
    let preprocessorAnswer = ''
    while (!['css', 'scss'].includes(preprocessorAnswer)) {
      preprocessorAnswer = readline.question(questions[2].text)
    }
    const pathAnswer = readline.question(questions[3].text)

    const config = {
      typescript: /^y|yes$/i.test(typescriptAnswer),
      css: /^y|yes$/i.test(cssAnswer),
      preprocessor: preprocessorAnswer,
      path: pathAnswer || defaultPath,
    }

    fs.writeFileSync(fileName, JSON.stringify(config, null, 2))

    console.log(`---------------------\n`)
    console.log(`${fileName} file created!\n`)
  }
}

module.exports = generateConfig

const makeItBlue = (str) => `\x1b[38;2;27;137;205m${str}\x1b[0m`
