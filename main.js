// Initialize variables
let currentUrl = '';
let historyStack = [];
let forwardStack = [];

// Function to navigate to a URL
function navigateToUrl() {
    const urlInput = document.getElementById('urlInput').value.trim();
    if (urlInput === '') return;

    // Load the URL into viewport
    loadUrl(urlInput);
}

// Function to load URL into the viewport
function loadUrl(url) {
    currentUrl = url;
    historyStack.push(url);

    // Clear forward stack when navigating to a new URL
    forwardStack = [];

    // Fetch the URL content and display in viewport
    fetchUrl(url);
}

// Function to fetch URL content and display in viewport
function fetchUrl(url) {
    fetch(`https://cors-anywhere.herokuapp.com/${url}`)  // Using CORS Anywhere to bypass CORS restrictions
        .then(response => response.text())
        .then(data => {
            const viewport = document.getElementById('viewport');
            viewport.innerHTML = data;
        })
        .catch(error => console.error('Error fetching URL:', error));
}

// Function to navigate back in history
function navigateBack() {
    if (historyStack.length > 1) {
        forwardStack.push(historyStack.pop());  // Move current page to forward stack
        const previousUrl = historyStack[historyStack.length - 1];
        loadUrl(previousUrl);
    }
}

// Function to navigate forward in history
function navigateForward() {
    if (forwardStack.length > 0) {
        const nextUrl = forwardStack.pop();
        historyStack.push(nextUrl);
        loadUrl(nextUrl);
    }
}

// Initial load (optional): load default homepage
loadUrl('https://www.google.com');
