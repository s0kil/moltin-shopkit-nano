export function createCartIdentifier() {
  return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, () =>
    ((Math.random() * 16) | 0).toString(16)
  );
}

export function removeLeadingSlash(string) {
  return string.replace(/^\/+/, "");
}
