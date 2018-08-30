export const fetchSomething = () => {
  return fetch('https://api.github.com/users/dislick').then(response => response.json());
}