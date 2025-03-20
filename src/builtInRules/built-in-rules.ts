/* eslint-disable mocha/no-exports */
import {
  category,
  context,
  message,
  name,
  ruleSeverity,
  RuleSeverity,
  ScanResultDigest,
  ScanRule,
  suggestion,
  treeQuery,
} from 'cayce-types'
import {SyntaxNode} from 'tree-sitter'

@category('clarity')
@context('scan')
@message('The name of this method is too short (under three characters)')
@name('Check for description in the class header comment')
@ruleSeverity(RuleSeverity.VIOLATION)
@suggestion(
  'A method name should be as descriptive as possible. Consider changing the name to reflect the function and utility of its purpose',
)
@treeQuery('(method_declaration (identifier)@a)')
export class MyRule extends ScanRule {
  validateNodes(_nodes: SyntaxNode[]): ScanResultDigest[] {
    return []
  }
}
