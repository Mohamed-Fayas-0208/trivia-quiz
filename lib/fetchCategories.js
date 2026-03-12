const BASE_URL = 'https://opentdb.com';

export async function fetchCategories() {
  const url = `${BASE_URL}/api_category.php`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch categories.');
  }

  const data = await response.json();

  if (!data.trivia_categories || !Array.isArray(data.trivia_categories)) {
    throw new Error('Invalid categories response from API.');
  }

  return data.trivia_categories.map((category) => ({
    id: category.id,
    name: category.name
  }));
}

