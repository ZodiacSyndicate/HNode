import * as React from 'react'
import SyntaxHilighter from 'react-syntax-highlighter'
import ReactMarkDown from 'react-markdown'

interface CodeBlockProps {
  value: string
  language: string
}

const CodeBlock: React.SFC<CodeBlockProps> = ({ value, language }) => (
  <SyntaxHilighter language={language}>
    {value}
  </SyntaxHilighter>
)

CodeBlock.defaultProps = {
  language: ''
}

interface MarkdownProps {
  source: string
}

const Markdown: React.SFC<MarkdownProps> = ({ source }) => (
  <ReactMarkDown
    source={source}
    renderers={{
      code: CodeBlock
    }}
  />
)

export default Markdown
