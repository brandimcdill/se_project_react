const baseUrl = "http://localhost:3001";

function _checkresponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function _request(url, options) {
  return fetch(url, options).then(_checkresponse);
}

function getItems() {
  return _request(`${baseUrl}/items`, {
    method: "GET",
  });
}

function addNewItem(item) {
  return _request(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
}

function deleteItem(id) {
  return _request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
}

export { getItems, _checkresponse, _request, addNewItem, deleteItem };
