export async function categoryFilter(selectedCategory: string) {
  if (typeof window === "undefined") {
    await console.log("server");
  } else {
    await console.log("client");
  }

  const filter = selectedCategory;

  return filter;
}
