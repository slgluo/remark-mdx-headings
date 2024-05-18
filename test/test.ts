import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { compile } from '@mdx-js/mdx'
import remarkHeadings from '@vcarl/remark-headings'
import remarkMdxHeading from '../src'

const require = createRequire(import.meta.url)

// eslint-disable-next-line unused-imports/no-unused-vars
const remarkHeadingId = require('remark-heading-id')

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const source = fs.readFileSync(path.resolve(__dirname, './input.md'))

const { value } = await compile(source, {
  jsx: true,
  remarkPlugins: [remarkHeadings, remarkMdxHeading],
  // remarkPlugins: [[remarkHeadingId, { defaults: true }], remarkHeadings, remarkMdxHeading],
})

// eslint-disable-next-line no-console
console.log(value)
