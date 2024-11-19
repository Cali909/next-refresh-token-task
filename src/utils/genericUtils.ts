export function readFromLS(key: string) {
  return localStorage.getItem(key) || null;
}

export function writeToLS(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function removeFromLS(key: string) {
  localStorage.removeItem(key);
}

export function emptyLS() {
  localStorage.clear();
}
