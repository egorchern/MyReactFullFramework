import VirtualDOMNode from "../interfaces/virtualDomNode";
import { render } from "../index.js";

export function useState<T>(node: VirtualDOMNode, key: string, initialValue: T): ((newValue: T) => void) {
    node.state[key] = initialValue;

    return (newValue: T) => {
        node.state[key] = newValue;
        render(node.renderRoot!);
    };
}