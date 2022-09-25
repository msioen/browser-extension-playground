# Browser Extension Playground

This repository is mainly intended to try out some things with browser extensions in order to debug / test how some functionality works. Currently it contains the following:
- reading/writing from storage across multiple pages
- background worker event registration
- content script injection
- basic message passing from content script to background worker

## Terminology

| Term | Description |
|---|---|
| Extension | Small software program to customize the browsing experience. |
| Content script | Files that are run in the context of web pages. Content scripts only have access to a very limited api subset [https://developer.chrome.com/docs/extensions/mv3/content_scripts/](https://developer.chrome.com/docs/extensions/mv3/content_scripts/). Can be auto-run on match patterns or programmatically injected. |
| Extension process | The actual process the extension runs in (vs the process the content script or webpages run in) |

## Extensions

- built on web technologies - Manifest v3 should be fairly cross browser
- run in a separate, sandboxed execution environment

## Important considerations

- some code runs in your 'extension code' / some code (potentially) runs in a window/tab context
- seems like it's not that straightforward to 'import' code (to investigate further) => it is possible to import a background service worker as a module
- with a 'standard' integration your extension code will not be running anymore on page refresh / page navigations
- when working with storage there are several constraints/considerations. To provide a consistent experience some form of storage will be required however
    - ensure to use the same key value in 'get' as the item you actually need on the returned items object
    - access is possible across multiple pages if the page is run in the context of the extension (for example through chrome.runtime.getURL)
    - 'sync' storage has very strict quota

## Debugging

- console.log will be written out depending on the execution context. By default they will not be consolidated
    - from extension context: visible in chrome://extensions 'Errors' view
    - from window/tab context: visible in DevTools of the webpage itself

## References

- Chrome Developer Docs: [https://developer.chrome.com/docs/extensions/](https://developer.chrome.com/docs/extensions/)
- Chrome API Reference: [https://developer.chrome.com/docs/extensions/reference/](https://developer.chrome.com/docs/extensions/reference/)