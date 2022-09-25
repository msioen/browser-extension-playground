// background.js
// => background service worker of the browser extension
// => can manage state across content scripts and communicate through messaging
// => possible to also add event filters to only get the below events for certain urls
// => seems like you can't have multiple listeners for the same event in this class

function logData(log) {
    var today = new Date();
    log = today.toISOString() + " - " + log;

    chrome.storage.local.get("logs", function (items) {
        let logs = items.logs;

        if (!logs) {
            logs = [];
        }
        logs.push(log);

        chrome.storage.local.set({ logs });
    })
}


/* ---------------------------------------- */
/* All non-deprecated chrome.runtime events */
/* ---------------------------------------- */
// (ignored some chrome os specific events)

// onConnect
// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onConnect
// Fired when a connection is made from either an extension process or a content script (by runtime.connect).
// port : Port
chrome.runtime.onConnect.addListener(function (port) {
    logData(`runtime.onConnect`);
});

// onConnectExternal
// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onConnectExternal
// Fired when a connection is made from another extension (by runtime.connect).
// port : Port
chrome.runtime.onConnectExternal.addListener(function (port) {
    logData(`runtime.onConnectExternal`);
});

// onInstalled
// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onInstalled
// Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version.
// details.id : string
// details.previousVersion
// details.reason : OnInstalledReason
chrome.runtime.onInstalled.addListener(function (details) {
    logData(`runtime.onInstalled - ${details.reason}`);
});

// onMessage
// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage
// Fired when a message is sent from either an extension process (by runtime.sendMessage) or a content script (by tabs.sendMessage).
// message : any
// sender : MessageSender
// sendResponse: function
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    logData(`runtime.onMessage - ${message}`);

    if (message.logData) {
        logData(message.logData);
    }
});

// onMessageExternal
// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessageExternal
// Fired when a message is sent from another extension/app (by runtime.sendMessage). Cannot be used in a content script.
// message : any
// sender : MessageSender
// sendResponse: function
chrome.runtime.onMessageExternal.addListener(function (message, sender, sendResponse) {
    logData(`runtime.onMessageExternal - ${message}`);

    if (message.logData) {
        logData(message.logData);
    }
});

// onStartup
// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onStartup
// Fired when a profile that has this extension installed first starts up. This event is not fired when an incognito profile is started, even if this extension is operating in 'split' incognito mode.
chrome.runtime.onStartup.addListener(function () {
    logData(`runtime.onStartup`);
});

// onSuspend
// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onSuspend
// Sent to the event page just before it is unloaded. This gives the extension opportunity to do some clean up. Note that since the page is unloading, any asynchronous operations started while handling this event are not guaranteed to complete. If more activity for the event page occurs before it gets unloaded the onSuspendCanceled event will be sent and the page won't be unloaded.
chrome.runtime.onSuspend.addListener(function () {
    logData(`runtime.onSuspend`);
});

// onSuspendCanceled
// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onSuspendCanceled
// Sent after onSuspend to indicate that the app won't be unloaded after all.
chrome.runtime.onSuspendCanceled.addListener(function () {
    logData(`runtime.onSuspendCanceled`);
});

// onUpdateAvailable
// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onUpdateAvailable
// Fired when an update is available, but isn't installed immediately because the app is currently running. If you do nothing, the update will be installed the next time the background page gets unloaded, if you want it to be installed sooner you can explicitly call chrome.runtime.reload(). If your extension is using a persistent background page, the background page of course never gets unloaded, so unless you call chrome.runtime.reload() manually in response to this event the update will not get installed until the next time Chrome itself restarts. If no handlers are listening for this event, and your extension has a persistent background page, it behaves as if chrome.runtime.reload() is called in response to this event.
// details.version : string
chrome.runtime.onUpdateAvailable.addListener(function (details) {
    logData(`runtime.onUpdateAvailable - ${details.version}`);
});


/* ------------------------------------- */
/* All non-deprecated chrome.tabs events */
/* ------------------------------------- */

// onActivated
// https://developer.chrome.com/docs/extensions/reference/tabs/#event-onActivated
// Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events so as to be notified when a URL is set.
// activeInfo.tabId : number = The ID of the tab thas has become active
// activeInfo.windowId : number = The ID of the window the active tab changed inside of.
chrome.tabs.onActivated.addListener(function (activeInfo) {
    logData(`tabs.onActivated - window: ${activeInfo.windowId} - tab: ${activeInfo.tabId}`);
});

// onAttached ()
// https://developer.chrome.com/docs/extensions/reference/tabs/#event-onAttached
// Fired when a tab is attached to a window; for example, because it was moved between windows.
// tabId : number
// attachInfo.newPosition : number
// attachInfo.newWindowId : number
chrome.tabs.onAttached.addListener(function (tabId, attachInfo) {
    logData(`tabs.onAttached - tabId: ${tabId} (${attachInfo.newWindowId}, ${attachInfo.newPosition})`);
});

// onCreated
// https://developer.chrome.com/docs/extensions/reference/tabs/#event-onCreated
// Fired when a tab is created. Note that the tab's URL and tab group membership may not be set at the time this event is fired, but you can listen to onUpdated events so as to be notified when a URL is set or the tab is added to a tab group.
// tab : Tab
chrome.tabs.onCreated.addListener(function (tab) {
    logData(`tabs.onCreated - tabId: ${tab.id}`);
});

// onDetached
// https://developer.chrome.com/docs/extensions/reference/tabs/#event-onDetached
// Fired when a tab is detached from a window; for example, because it was moved between windows.
// tabId : number
// detachInfo.oldPosition : number
// detachInfo.oldWindowId : number
chrome.tabs.onDetached.addListener(function (tabId, detachInfo) {
    logData(`tabs.onDetached - tabId: ${tabId} (${detachInfo.oldWindowId}, ${detachInfo.oldPosition})`);
});

// onHighlighted
// https://developer.chrome.com/docs/extensions/reference/tabs/#event-onHighlighted
// Fired when the highlighted or selected tabs in a window changes.
// highlightInfo.tabIds : number[] = All highlighted tabs in the window
// highlightInfo.windowId : number = The window whose tabs changed
chrome.tabs.onHighlighted.addListener(function (highlightInfo) {
    logData(`tabs.onHighlighted - windowId: ${highlightInfo.windowId} - tabs: ${JSON.stringify(highlightInfo.tabIds)}`);
});

// onMoved
// https://developer.chrome.com/docs/extensions/reference/tabs/#event-onMoved
// Fired when a tab is moved within a window. Only one move event is fired, representing the tab the user directly moved. Move events are not fired for the other tabs that must move in response to the manually-moved tab. This event is not fired when a tab is moved between windows; for details, see tabs.onDetached.
// tabId : number
// moveInfo.fromIndex : number
// moveInfo.toIndex : number
// moveInfo.windowId : number
chrome.tabs.onMoved.addListener(function (tabId, moveInfo) {
    logData(`tabs.onMoved - tabId: ${tabId} (${moveInfo.fromIndex} -> ${moveInfo.toIndex})`);
});

// onRemoved
// https://developer.chrome.com/docs/extensions/reference/tabs/#event-onRemoved
// Fired when a tab is closed.
// tabId : number
// removeInfo.isWindowClosing
// removeInfo.windowId
chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    logData(`tabs.onRemoved - tabId: ${tabId} - windowId: ${removeInfo.windowId}`);
});

// onReplaced
// https://developer.chrome.com/docs/extensions/reference/tabs/#event-onReplaced
// Fired when a tab is replaced with another tab due to prerendering or instant.
// addedTabId : number
// removedTabId : number
chrome.tabs.onReplaced.addListener(function (addedTabId, removedTabId) {
    logData(`tabs.onReplaced - ${removedTabId} -> ${addedTabId}`);
});

// onUpdated
// https://developer.chrome.com/docs/extensions/reference/tabs/#event-onUpdated
// Fired when a tab is updated.
// tabId : number
// changeInfo: object
// tab : Tab
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    logData(`tabs.onUpdated - tabId: ${tabId} - ${JSON.stringify(changeInfo)}`);
});

// onZoomChange
// https://developer.chrome.com/docs/extensions/reference/tabs/#event-onZoomChange
// Fired when a tab is zoomed.
// ZoomChangeInfo : object
chrome.tabs.onZoomChange.addListener(function (ZoomChangeInfo) {
    logData(`tabs.onZoomChange - ${JSON.stringify(ZoomChangeInfo)}`);
});