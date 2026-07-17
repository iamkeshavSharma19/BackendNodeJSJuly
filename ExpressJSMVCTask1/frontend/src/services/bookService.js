const BASE_URL = "http://localhost:9999/api/v1/all-books";

const BASE_URL2 = "http://localhost:9999/api/v1/add-book";

export async function createBook(book) {
  const response = await fetch(BASE_URL2, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(book),
  });

  const data = await response.json();
  return data;
}

export async function getAllBooks() {
  const response = await fetch(BASE_URL);

  const data = await response.json();

  return data;
}

export async function deleteBook(id) {
  const response = await fetch(
    `http://localhost:9999/api/v1/delete-book/${id}`,
    {
      method: "DELETE",
    },
  );

  const data = await response.json();

  return data;
}
