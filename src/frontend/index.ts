import { useState } from '../framework/hooks/useState.js';
import {setup, attachEvent, render} from '../framework/index.js';
import { createVirtualDOMNode } from '../framework/VirtualDOMNodeFactory.js';

const rootNode = setup('reactful-parent');

attachEvent('click', rootNode!, (eventTarget) => {
    console.log('Clicked on:', "clicked on root");
})

let node = createVirtualDOMNode('<button>Count: @state_count</button>', [], rootNode);
let changeStateFunction = useState(node, 'count', 0);
render(node.renderRoot!);
attachEvent('click', node, (eventTarget) => {
    changeStateFunction((node.state['count'] as number) + 1);
});