import VirtualDOMNode from "./interfaces/virtualDomNode";

function setup(rootId: string): VirtualDOMNode | null {
    const rootElement = document.getElementById(rootId);

    if (rootElement) {
        alert('Setup called, found root element with id: ' + rootId);
        const rootNode: VirtualDOMNode = {
            DOMElement: rootElement,        
            children: [],
            cleanupCallbacks: [],
            DOMEventListeners: [],
            eventCallbacks: []
        };

        return rootNode;
    }

    return null;
}

function attachEvent(eventType: string, node: VirtualDOMNode, callback: (eventTarget: EventTarget) => void) {
    const domNode = node.DOMElement;
    console.log('Attaching event:', eventType, 'to', domNode);
    const domEventListener = (event: Event) => {
        if (event.target) {
            callback(event.target);
        }
    };

    domNode.addEventListener(eventType, domEventListener);
    node.DOMEventListeners.push({ type: eventType, listener: domEventListener });
    node.eventCallbacks.push({ type: eventType, callback });
}

export { setup, attachEvent };