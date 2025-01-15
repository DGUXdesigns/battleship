export function setError(message) {
  const errorDisplay = document.querySelector('.error');
  errorDisplay.innerText = message;
}
