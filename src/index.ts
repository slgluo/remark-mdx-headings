import { name as isIdentifierName } from 'estree-util-is-identifier-name'
import { valueToEstree } from 'estree-util-value-to-estree'
import type { Plugin } from 'unified'
import type { Root } from 'mdast'

export interface RemarkMdxHeadingOptions {
  name?: string
}

const remarkMdxHeadings: Plugin<[RemarkMdxHeadingOptions?], Root> = ({ name = 'headings' } = {}) => {
  if (!isIdentifierName(name))
    throw new Error(`Name this should be a valid identifier, got: ${JSON.stringify(name)}`)

  return (ast, file) => {
    const headings = file.data.headings || []
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
                    init: valueToEstree(headings),
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

export default remarkMdxHeadings
