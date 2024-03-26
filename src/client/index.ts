document.getElementById("hello").innerHTML = "Hello, scrypt!";
const xhr = new XMLHttpRequest();
function sendJSON(): void {
  xhr.open('POST', 'api', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  const data = JSON.stringify({ 'login': login.value, 'password': password.value });
  xhr.onreadystatechange = function () {
    // если запрос принят и сервер ответил, что всё в порядке
    if (xhr.readyState === 4 && xhr.status === 200) {
      // выводим то, что ответил нам сервер — так мы убедимся, что данные он получил правильно
      result.innerHTML = this.responseText;
    }
  };
  xhr.send(data);
}
