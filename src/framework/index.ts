import VirtualDOMNode from "./interfaces/virtualDomNode";
import { createVirtualDOMNode } from "./VirtualDOMNodeFactory.js";
let rootDomElement: HTMLElement | null = null;

function setup(rootId: string): VirtualDOMNode | null {
    const rootElement = document.getElementById(rootId);

    if (rootElement) {
        alert('Setup called, found root element with id: ' + rootId);
        rootDomElement = rootElement;
        const rootNode = createVirtualDOMNode('<div></div>', [], null);

        return rootNode;
    }

    return null;
}

function attachEventToHTML(eventType: string, node: VirtualDOMNode, callback: (eventTarget: EventTarget) => void): EventListenerOrEventListenerObject {
    const domEventListener = (event: Event) => {
        if (event.target) {
            callback(event.target);
        }
    };

    if (node.DOMElement) {
        node.DOMElement.addEventListener(eventType, domEventListener);
        node.DOMEventListeners.push({ type: eventType, listener: domEventListener });
    }

    return domEventListener;
}

function attachEvent(eventType: string, node: VirtualDOMNode, callback: (eventTarget: EventTarget) => void) {
    attachEventToHTML(eventType, node, callback);
    node.eventCallbacks.push({ type: eventType, callback });
}

function createElementFromHTML(html: string): HTMLElement {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild as HTMLElement;
}   

function render(currentNode: VirtualDOMNode) {
    if (currentNode.DOMElement) {
        currentNode.DOMEventListeners.forEach(({ type, listener }) => {
            currentNode.DOMElement!.removeEventListener(type, listener);
        });
        
        currentNode.DOMEventListeners = [];
        currentNode.DOMElement.remove();
    }
    
    currentNode.DOMElement = createElementFromHTML(currentNode.getAsHTML());
    currentNode.eventCallbacks.forEach(eventCallback => {
        attachEventToHTML(eventCallback.type, currentNode, eventCallback.callback);
    });
    
    const parentDOM = currentNode.renderRoot ? currentNode.renderRoot.DOMElement : rootDomElement;
    parentDOM!.appendChild(currentNode.DOMElement);

    currentNode.children.forEach(child => {
        render(child);
    });
}

export { setup, attachEvent, render };