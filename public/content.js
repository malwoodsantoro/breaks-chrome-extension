var data = {};
var div = document.createElement("div");

isEmpty = (object) => {
  for (const property in object) {
    return false;
  }
  return true;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
   if(request.disabled) {
    div.style.display = "none";
   } else {
    div.style.display = "block";
   }
  }
);

// Initial page load 
window.addEventListener('load', () => {
  document.body.appendChild(div);
  div.style.backgroundColor = "#9AE5FF";
  div.id = "widthDiv";
  div.style.position = "fixed";
  div.style.top = 0;
  div.style.right = 0;
  div.style.width = 200;
  div.style.height = 200;

  chrome.storage.local.get('data', (result) => {
    data = result.data;
    data.forEach((item) => {
      if (item.minWidth <= window.innerWidth && window.innerWidth <= item.maxWidth) {
        div.innerHTML = item.name;
      }
    });
  })
});

//Update value when window is resized
window.addEventListener('resize', () => {
  if (isEmpty(data) == false) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].minWidth <= window.innerWidth && window.innerWidth <= data[i].maxWidth) {
        div.innerHTML = data[i].name;
        return;
      }
    }
    div.innerHTML = "Beyond specified widths."
  }
});
