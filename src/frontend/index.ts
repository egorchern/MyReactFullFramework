import { useState } from '../framework/hooks/useState';
import {setup, attachEvent, render} from '../framework/index';
import { createVirtualDOMNode } from '../framework/VirtualDOMNodeFactory';

const rootNode = setup('reactful-parent');

attachEvent('click', rootNode!, (eventTarget) => {
    console.log('Clicked on:', "clicked on root");
})

let node = createVirtualDOMNode('<div> \@child_1 <button>Count: \@state_count</button> <p>p from parent</p> \@child_0 </div>', rootNode);
let childNode = createVirtualDOMNode('<div><button>CountNested: \@state_count</button> <p>p from child</p> </div>', node);
let anotherChildNode = createVirtualDOMNode('<div><p>Second child but placed in beginning of parent</p> \@child_0 <button> very first count: \@state_count </button></div>', node);
let prependChildNode = createVirtualDOMNode('<div><p>Prepended child node</p></div>', anotherChildNode);
let changeStateFunction = useState(node, 'count', 0);
let changeNestedStateFunction = useState(childNode, 'count', 0);
let changeAnotherChildStateFunction = useState(anotherChildNode, 'count', 0);

attachEvent('click', childNode, (eventTarget) => {
    changeNestedStateFunction((childNode.state['count'] as number) + 1);
});
render(node.renderRoot!);
attachEvent('click', node, (eventTarget) => {
    changeStateFunction((node.state['count'] as number) + 1);
});

attachEvent('click', anotherChildNode, (eventTarget) => {
    changeAnotherChildStateFunction((anotherChildNode.state['count'] as number) + 1);
});
