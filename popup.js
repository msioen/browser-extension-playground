let viewLogs = document.getElementById("btnViewLogs");

viewLogs.addEventListener("click", async () => {
    chrome.tabs.create({url: chrome.runtime.getURL('logs.html')});
});