export function getViewport() {
    return window.innerHeight;
};

export function onViewportResize(callback) {
    window.addEventListener('resize', callback);
}

export function offViewportResize(callback){
    window.removeEventListener('resize', callback);
}

export function viewportSize($element) {
    const viewportInPixels = getViewport();
    $element.style.blockSize = `${viewportInPixels}px`;
}