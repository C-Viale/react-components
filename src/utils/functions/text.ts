export function capitalize(string: string, all = false) {
  if (all) {
    return string
      .split(" ")
      .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
      .join(" ");
  }

  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function getNameInitials(name: string, maxLetters = 2) {
  const value = name.trim();
  if (!value) return "";

  return value
    .trim()
    .split(" ")
    .map((e) => e[0].toUpperCase())
    .slice(0, maxLetters)
    .join("");
}
