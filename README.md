# remaker-mdx-heading
A remark plugin for export heading from MDX

## Installation
```bash
npm install remark-mdx-heading
```

## Usage
This remark plugin takes Markdown headings, and export it as JavaScript array from `.mdx`.

For example, a file named `example.mdx` with the following contents:
```markdown
# title 1
## title 2
### title 3
```
for example, using it in `Next.js`:
```javascript
import MDXContent, { heading } from '/path/to/example.mdx'

console.log(heading)
// output:
// [
//   { depth: 1, title: 'title 1' },
//   { depth: 2, title: 'title 2' },
//   { depth: 3, title: 'title 3' },
// ]
return (
  <MDXContent />
)
```

## API
The default export is a remark plugin.

### Options
- `name`: The identifier name of the variable the `heading` data is assigned to. (Default: `heading`).
