# remaker-mdx-headings
A remark plugin for export heading from MDX

## Installation
```bash
npm install @vcarl/remark-headings remark-mdx-headings
```

## Usage
This remark plugin takes Markdown headings, and export it as JavaScript array from `.mdx`.

For example, a file named `example.mdx` with the following contents:
```markdown
# title 1
## title 2
### title 3
```
Use this plugin as follows, paying attention to the order of the plugins, because `remark-mdx-headings` depends on `@vcarl/remark-headings`:
```javascript
import fs from 'fs'
import { compile } from '@mdx-js/mdx'
import remarkMdxHeadings from 'remark-mdx-headings'
import remarkHeadings from '@vcarl/remark-headings'

const { value } = await compile(fs.readFileSync('input.md'), {
  jsx: true,
  remarkPlugins: [remarkHeadings, remarkMdxHeading],
  // remarkPlugins: [remarkHeadings, [remarkMdxHeading, { name: 'other name' }]]
})
console.log(value)

// outputs:

/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
export const headings = [{
  "depth": 1,
  "value": "heading1"
}, {
  "depth": 2,
  "value": "heading2"
}, {
  "depth": 3,
  "value": "heading3"
}];
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    ...props.components
  };
  return <><_components.h1>{"heading1"}</_components.h1>{"\n"}<_components.h2>{"heading2"}</_components.h2>{"\n"}<_components.h3>{"heading3 {#custom-id}"}</_components.h3></>;
}
export default function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}


```

for example, using it in `Next.js`:
```javascript
import MDXContent, { headings } from '/path/to/example.mdx'
console.log(headings)
// output:
// [
//   { depth: 1, value: 'heading1' },
//   { depth: 2, value: 'heading2' },
//   { depth: 3, value: 'heading3' },
// ]
```

## API
The default export is a remark plugin.

### Options
- `name`: The identifier name of the variable the `headings` data is assigned to. (Default: `headings`).
