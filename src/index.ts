import { name as isIdentifierName } from 'estree-util-is-identifier-name'
import { valueToEstree } from 'estree-util-value-to-estree'
import type { Plugin } from 'unified'
import type { Heading, Literal, Root } from 'mdast'

export interface RemarkMdxHeadingOptions {
  name?: string
}

const remarkMdxHeading: Plugin<[RemarkMdxHeadingOptions?], Root> = ({ name = 'heading' } = {}) => {
  if (!isIdentifierName(name))
    throw new Error(`Name this should be a valid identifier, got: ${JSON.stringify(name)}`)

  return (ast) => {
    const heading: unknown[] = []
    const nodes = ast.children.filter(child => child.type === 'heading')
    if (nodes && nodes.length > 0) {
      (nodes as Heading[]).forEach((node) => {
        const textNode = node.children.find(child => child.type === 'text')
        heading.push({
          depth: node.depth,
          title: (textNode as Literal)?.value,
        })
      })
    }

    ast.children.unshift({
      type: 'mdxjsEsm' as any,
      value: '',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ExportNamedDeclaration',
              specifiers: [],
              declaration: {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name },
                    init: valueToEstree(heading),
                  },
                ],
              },
            },
          ],
        },
      },
    })
  }
}

export default remarkMdxHeading
