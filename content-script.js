// send message to our background service to log some data
// (note that technically this script also has access to the same storage so would also work without the message passing)
chrome.runtime.sendMessage({ logData: "content-script loaded for " + location.href });