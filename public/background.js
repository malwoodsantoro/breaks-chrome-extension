function changeBackgroundColor() {
  document.getElementById('wow').style.backgroundColor = "red";
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

  console.log(message);
  switch (message.action) {
    case "popupOpen": {
      chrome.tabs.query({}, (tabList) => {
        if (!tabList.length) return;
        tabList.forEach((tab) => {
          chrome.scripting.executeScript(
            {
              func: changeBackgroundColor,
              target: {
                tabId: tab.id,
                allFrames: true
              }
            }
          );
        });
      });
    }
      break;

  }

});