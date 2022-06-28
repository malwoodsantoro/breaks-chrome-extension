// function changeInnerHTML(data) {
//   document.getElementById("wow").innerHTML = "got em"
//   console.log(data)
// }

// chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
//   const parse = JSON.parse(message)
//   const value = await Promise.all(parse.forEach((object) => {
//     if (object.minWidth <= chrome.windows.getCurrent.innerWidth && chrome.windows.getCurrent.innerWidth <= object.maxWidth) {
//       return object.name
//     }
//   }));

//   if (message.data) {
//     const tabId = await getTabId();
//     chrome.scripting.executeScript({
//       target: { tabId: tabId },
//       func: changeInnerHTML,
//       args: [value]
//     })
//   }
//   if (message.method === 'resize') {
//     console.log('resize!!!')
//   }
// });

// async function getTabId() {
//   const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
//   return (tabs.length > 0) ? tabs[0].id : null;
// }