import VirtualDOMNode from "./interfaces/virtualDomNode";

function replacePlaceholders(markup: string, placeholderPrefix: string, keyvalues: { [key: string]: any }): string {
    return markup.replace(new RegExp(placeholderPrefix + "(\\w+)", "g"), (match, p1) => {
        return keyvalues[p1] !== undefined ? keyvalues[p1] : match;
    });
}

function createVirtualDOMNode(markup: string, children: VirtualDOMNode[] = [], parent: VirtualDOMNode | null): VirtualDOMNode {
    const node : VirtualDOMNode = {
        getAsHTML : () => {
            return replacePlaceholders(markup, '@state_', node.state);
        },
        children,
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