
export function replacePlaceholders(markup: string, placeholderPrefix: string, keyvalues: { [key: string]: any }): string {
    return markup.replace(new RegExp(placeholderPrefix + "(\\w+)", "g"), (match, p1) => {
        return keyvalues[p1] !== undefined ? keyvalues[p1] : match;
    });
}

export function findNodeByDataUid(root: HTMLElement, targetValue: string): HTMLElement | null {
  return root.querySelector(`[data-uid="${targetValue}"]`);
}