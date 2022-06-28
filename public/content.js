var data = {};
var div = document.createElement("div");

chrome.runtime.onMessage.addListener(function (request) {

  alert(request)
})

function isEmpty(object) {
  for (const property in object) {
    return false;
  }
  return true;
}

// Initial page load 
window.addEventListener('load', function () {
  document.body.appendChild(div);
  div.style.backgroundColor = "pink";
  div.id = "wow";
  div.style.position = "fixed";
  div.style.top = 0;
  div.style.right = 0;
  div.style.width = 200;
  div.style.height = 200;

  chrome.storage.local.get('data', function (result) {
    data = result.data;
    data.forEach((item) => {
      if (item.minWidth <= window.innerWidth && window.innerWidth <= item.maxWidth) {
        div.innerHTML = item.name;
      }
    });
  })
});

//Update value when window is resized
window.addEventListener('resize', function () {
  if (isEmpty(data) == false) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].minWidth <= window.innerWidth && window.innerWidth <= data[i].maxWidth) {
        div.innerHTML = data[i].name;
        return;
      }
    }
    div.innerHTML = "Outside specified widths."
  }
});
