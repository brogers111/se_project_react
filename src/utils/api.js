const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  return res.ok
    ? res.json()
    : Promise.reject(`Error: ${res.status} ${res.statusText}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`);
}

function postItems(name, imageUrl, weather) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

function deleteItem(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
}

export { getItems, postItems, deleteItem };
