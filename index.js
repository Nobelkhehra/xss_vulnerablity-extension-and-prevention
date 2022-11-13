chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let u = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
    document.getElementById("url").innerHTML = u
//     fetch('http://localhost:3000/')
//   .then(response => response.json())
//   .then(data => console.log(data));

  var url = new URL('http://localhost:3000/')

var params = {link:u} // or:

url.search = new URLSearchParams(params).toString();

fetch(url).then(function(response){
  response.text().then(function(data) {
      if(data.includes('False')){
        document.getElementById("head").textContent = "This website is not XSS Vulnerable"
      }else{
        document.getElementById("head").innerHTML = "<h3>WARNING !! The website is XSS vulnerable now for protection we are blockin this website from this host</h3>"
        const defaultFilters = [
          url
        ]
        chrome.webRequest.onBeforeRequest.addListener(
            function (details) { return { cancel: true } }, { urls: defaultFilters }, ["blocking"])

        document.getElementById("url").innerHTML = data
      }
  });
}).catch(function(error) {
  console.log('Fetch Error:', error);
});
});

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