function setup(rootId: string) {
    const rootElement = document.getElementById(rootId);
    if (rootElement) {
        alert(`Root element with id '${rootId}' found.`);
    }
}

export { setup };