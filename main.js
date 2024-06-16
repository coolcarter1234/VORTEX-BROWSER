let historyStack = [];
let forwardStack = [];

function navigateToUrl() {
    const url = document.getElementById('urlInput').value.trim();
    if (url === '') return;

    loadUrl(url);
}

function loadUrl(url) {
    const iframe = document.getElementById('webFrame');
    iframe.src = url;

    // Update history stacks
    historyStack.push(url);
    forwardStack = [];  // Clear forward stack
}

function navigateBack() {
    if (historyStack.length > 1) {
        const currentUrl = historyStack.pop();
        forwardStack.push(currentUrl);

        const previousUrl = historyStack[historyStack.length - 1];
        loadUrl(previousUrl);
    }
}

function navigateForward() {
    if (forwardStack.length > 0) {
        const nextUrl = forwardStack.pop();
        historyStack.push(nextUrl);
        loadUrl(nextUrl);
    }
}

