window.onload = () => {
  fetchCategories()
}

function fetchCategories() {
  fetch('/api/categories')
    .then((res) => res.json())
    .then(([data, pagination]) => console.log(pagination))
}

function createCategorie() {
  fetch('/api/categories', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      name: 'x',
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
}

const button = document.getElementById('post-btn')

button.addEventListener('click', createCategorie)
