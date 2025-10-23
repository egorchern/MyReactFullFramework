import VirtualDOMNode from "./interfaces/virtualDomNode";
import { findNodeByDataUid } from "./utilities/util";
import { createVirtualDOMNode } from "./VirtualDOMNodeFactory";
import { v4 as uuidv4 } from 'uuid';

let rootDomElement: HTMLElement | null = null;

function setup(rootId: string): VirtualDOMNode | null {
    const rootElement = document.getElementById(rootId);

    if (rootElement) {
        alert('Setup called, found root element with id: ' + rootId);
        rootDomElement = rootElement;
        const rootNode = createVirtualDOMNode('<div></div>', null);

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

function render(currentNode: VirtualDOMNode, childReplacementUid: string | null = null) {
    if (currentNode.DOMElement) {
        currentNode.DOMEventListeners.forEach(({ type, listener }) => {
            currentNode.DOMElement!.removeEventListener(type, listener);
        });
        
        currentNode.DOMEventListeners = [];
        currentNode.DOMElement.remove();
    }
    let htmlString = currentNode.getAsHTML();
    const matches = [...htmlString.matchAll(/@child_(\d+)/g)];
    const childReplacementsUids: Map<number, string> = new Map();
    matches.forEach(match => {
        const uid = uuidv4();
        const replacement = `<template data-uid="${uid}"></template>`;
        htmlString = htmlString.replace(match[0], replacement);
        const idx = match[0].split('_')[1];

        childReplacementsUids.set(Number(idx), uid);
    });
    currentNode.DOMElement = createElementFromHTML(htmlString);
    currentNode.eventCallbacks.forEach(eventCallback => {
        attachEventToHTML(eventCallback.type, currentNode, eventCallback.callback);
    });
    
    const parentDOM = currentNode.renderRoot ? currentNode.renderRoot.DOMElement : rootDomElement;
    if (childReplacementUid)
    {
        let templateNode = findNodeByDataUid(parentDOM!, childReplacementUid!);
        templateNode?.parentNode?.replaceChild(currentNode.DOMElement!, templateNode);
    }
    else {
        parentDOM!.appendChild(currentNode.DOMElement);
    }

    currentNode.children.forEach((child, index) => {
        render(child, childReplacementsUids.get(index) || null);
    });
}

export { setup, attachEvent, render };