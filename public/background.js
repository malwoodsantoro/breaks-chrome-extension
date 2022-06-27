chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  console.log(message);
  switch(message.action){
    case "popupOpen":{
      console.log('popup is open');
      chrome.scripting.executeScript({
        code: 'document.body.style.backgroundColor="red"'
      });
    }
      break;

  }

});