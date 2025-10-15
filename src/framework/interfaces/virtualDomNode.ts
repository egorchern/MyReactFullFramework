export default interface VirtualDOMNode {
    DOMElement?: HTMLElement;
    children: VirtualDOMNode[];
    cleanupCallbacks: (() => void)[];
    DOMEventListeners: { type: string; listener: EventListenerOrEventListenerObject }[];
    eventCallbacks: {type: string; callback: (eventTarget: EventTarget) => void }[]
    getAsHTML: () => string;
    state: { [key: string]: any  };
    renderRoot: VirtualDOMNode | null;
}