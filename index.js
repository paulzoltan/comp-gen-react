#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { program } = require('commander')
const generateConfig = require('./generateConfig')

generateConfig('comp-gen.config.json')

const configPath = path.join(__dirname, 'comp-gen.config.json')
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))

program
  .option('-t, --typescript', 'Use TypeScript')
  .option('-T, --no-typescript', "Don't use TypeScript")
  .option('-c, --css', 'Include CSS')
  .option('-C, --no-css', 'Omit CSS')
  .option('-p, --preprocessor <type>', 'CSS Preprocessor: css or scss')
  .option('-P, --path <path>', 'Path to create component')
  .parse(process.argv)

const opts = { ...config, ...program.opts() }

// console.log(config, program.opts())

const componentName = program.args[0]
const componentPath = `${opts.path}/${componentName}`

if (!componentName) {
  console.error('Error: No component name specified')
  process.exit(1)
}

const template = opts.typescript ? typescriptTemplate : javascriptTemplate
const cssExtension = opts.preprocessor === 'scss' ? 'scss' : 'css'
const cssImports = opts.css ? `import './${componentName}.${cssExtension}'` : ''

const componentContent = template(componentName, cssImports)
const componentFile = `${componentPath}/${componentName}.${
  opts.typescript ? 't' : 'j'
}sx`

if (fs.existsSync(componentFile)) {
  console.error(`Error: ${componentFile} already exists`)
  process.exit(1)
}

fs.mkdirSync(componentPath, { recursive: true })
fs.writeFileSync(componentFile, componentContent)

if (opts.css) {
  const cssFile = `${componentPath}/${componentName}.${cssExtension}`
  if (fs.existsSync(cssFile)) {
    console.error(`Error: ${cssFile} already exists`)
    process.exit(1)
  }
  fs.writeFileSync(cssFile, '')
}

const indexFile = `${componentPath}/index.${opts.typescript ? 't' : 'j'}s`
if (fs.existsSync(indexFile)) {
  console.error(`Error: ${indexFile} already exists`)
  process.exit(1)
}
fs.writeFileSync(indexFile, `export { default } from './${componentName}'`)

// indexTemplate

console.log(`Component created at ${componentFile}`)

function javascriptTemplate(componentName, cssImports) {
  return `${cssImports}
import React from 'react'

function ${componentName}() {
  return (
    <div className="${kebabCase(componentName)}">
      <h1>${componentName}</h1>
    </div>
  );
}
export default ${componentName};`
}

function typescriptTemplate(componentName, cssImports) {
  return `${cssImports}
import React from 'react'

interface ${componentName}Props {}

function ${componentName}({}: ${componentName}Props) {
  return (
    <div className="${kebabCase(componentName)}">
      <h1>${componentName}</h1>
    </div>
  );
}
export default ${componentName};`
}

function indexTemplate(componentName) {
  return `export { default } from './${componentName}'\n`
}

function kebabCase(text) {
  return text.replace(/(?<!^)[A-Z]/g, (chr) => `-${chr}`).toLowerCase()
}
