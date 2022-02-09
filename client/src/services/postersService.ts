export async function getAllPosters() {
  const response = await fetch("/api/products");
  const data = await response.json();
  return data;
}