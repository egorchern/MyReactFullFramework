import VirtualDOMNode from "./interfaces/virtualDomNode";
import { replacePlaceholders } from "./utilities/util";

function createVirtualDOMNode(markup: string, parent: VirtualDOMNode | null): VirtualDOMNode {
    const node : VirtualDOMNode = {
        getAsHTML : () => {
            return replacePlaceholders(markup, '\\@state_', node.state);
        },
        children: [],
        cleanupCallbacks: [],
        DOMEventListeners: [],      
        eventCallbacks: [],
        state: {},
        renderRoot: parent
    };

    parent?.children.push(node);

    return node;
}

export { createVirtualDOMNode };