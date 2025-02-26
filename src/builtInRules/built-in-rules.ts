/* eslint-disable mocha/no-exports */
import {
  category,
  context,
  message,
  name,
  priority,
  query,
  regex,
  ResultType,
  ScanResult,
  ScanRule,
  suggestion,
} from 'cayce-types'
import {SyntaxNode} from 'tree-sitter'

@category('clarity')
@context('scan')
@message('The name of this method is too short (under three characters)')
@name('Check for description in the class header comment')
@priority(1)
@query('(method_declaration (identifier)@a)')
@regex('')
@suggestion(
  'A method name should be as descriptive as possible. Consider changing the name to reflect the function and utility of its purpose',
)
export class MyRule extends ScanRule {
  validateNodes(_nodes: SyntaxNode[]): ScanResult[] {
    const result: ScanResult[] = []
    for (const node of _nodes) {
      if (node.text.length < 4) {
        result.push(new ScanResult(this, ResultType.VIOLATION))
      }
    }

    return result
  }
}
