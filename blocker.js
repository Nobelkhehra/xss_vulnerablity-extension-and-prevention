function blockRequest(details) {
    console.log("Blocked:", details.url);
    return {
        cancel: true
    };
}
function isValidPattern(urlPattern) {
    var validPattern = /^(file:\/\/.+)|(https?|ftp|\*):\/\/(\*|\*\.([^\/*]+)|([^\/*]+))\//g;
    return !!urlPattern.match(validPattern);
}
function updateFilters(urls) {
    if (chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
        chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
    }
}