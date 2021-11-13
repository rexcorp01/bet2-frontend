export default function userFilter(array, searchQuery) {
  const filteredList = array.filter((item) => {
    const fullName = `${item.first_name} ${item.last_name}`;
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });
  return filteredList;
}
