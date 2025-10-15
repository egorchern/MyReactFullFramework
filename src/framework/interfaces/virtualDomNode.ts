export default interface VirtualDOMNode {
    DOMElement: HTMLElement;
    children: VirtualDOMNode[];
    cleanupCallbacks: (() => void)[];
    DOMEventListeners: { type: string; listener: EventListenerOrEventListenerObject }[];
    eventCallbacks: {type: string; callback: (eventTarget: EventTarget) => void }[]
}