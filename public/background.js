// chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
//   const parse = JSON.parse(message)
//   const value = await Promise.all(parse.forEach((object) => {
//     if (object.minWidth <= chrome.windows.getCurrent.innerWidth && chrome.windows.getCurrent.innerWidth <= object.maxWidth) {
//       return object.name
//     }
//   }));