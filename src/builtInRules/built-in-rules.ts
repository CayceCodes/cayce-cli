import {ResultType, ScanResult, ScanRule, category, context, message, name, priority, query, regex, suggestion } from 'sourceloupe-types';
import { SyntaxNode } from 'tree-sitter';

@name('Check for description in the class header comment')
@category('clarity')
@context('scan')
@message('The name of this method is too short (under three characters)')
@suggestion(
    'A method name should be as descriptive as possible. Consider changing the name to reflect the function and utility of its purpose'
)
@priority(1)
@query('(method_declaration (identifier)@a)')
@regex('')
export class MyRule extends ScanRule{
    validateNodes(_nodes: Array<SyntaxNode>): ScanResult[] {
        const result: ScanResult[] = [];
        for(const node of _nodes){
            if(node.text.length < 4){
                result.push(new ScanResult(this, ResultType.VIOLATION));
            }
        }

        return result;
    }
}