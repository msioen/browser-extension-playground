updateLogs();
setInterval(updateLogs, 1000);

// show logs
function updateLogs() {
    let logs = document.getElementById("logs");
    chrome.storage.local.get("logs", function (items) {

        if (!items.logs) {
            logs.innerHTML = 'No logs to see.';
        } else {
            let html = "<ul>";
            items.logs.forEach((item, index) => html += "<li>" + item + "</li>");
            html += "</ul>";
            logs.innerHTML = html;
        }
    });
    window.scrollTo(0, document.body.scrollHeight);
}

// delete logs
let btnClearLogs = document.getElementById("btnClearLogs");
btnClearLogs.addEventListener("click", async () => {
    chrome.storage.local.set({ "logs": [] }, updateLogs);
});