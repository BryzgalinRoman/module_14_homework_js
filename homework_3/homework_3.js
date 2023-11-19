// Задание 3

// Напишите код приложения, интерфейс которого представляет собой input и кнопку. 
// В input можно ввести любое число. При клике на кнопку происходит следующее:

const input = document.querySelector("input"); // Нашли input, объявили переменную input
const submitButton = document.querySelector("button");
const outputSpan = document.querySelector("span");
const photosContainer = document.querySelector("div");

// делаем слушатель на клик кнопки и срабатывает функция submitButtonHandle
submitButton.addEventListener("click", submitButtonHandle);

// Запуск функции submitButtonHandle
function submitButtonHandle() {
    const value = input.value;  //данные инпута хранятся в value

    // Ветвление от значения инпута
    if (value >= 1 && value <= 10 && !isNaN(value)) {
        //шспользуем запрос на url
        useRequest(" https://jsonplaceholder.typicode.com/photos?_limit=" + value, loadPhotos);
        write("Загрузка фото...");
    } else {
        write("Число вне диапазона от 1 до 10");
    }
}

//Функция write через innerHTML добавляет текст
function write(text) {
    outputSpan.innerHTML = text;
}

//Функция useRequest
function useRequest(url, callback) {

    const xhr = new XMLHttpRequest() //делаем запрос из примера skillFactory Создать XMLHttpRequest.
    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (xhr.status !== 200) { //если нет ошибки 200
            write("Статус ответа", xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
            write("Фото загружены.");
        }
    };

    //на ошибку
    xhr.onerror = function () {
        write("Ошибка! Статус ответа: ", xhr.status);
    };
    // Послать запрос
    xhr.send();

};

// функция на фото
function loadPhotos(apiData) {
    let cards = String();

    apiData.forEach(item => {
        const cardBlock = `<div>
<img
  src="${item.download_url}"
  style="width: 150px; margin-right: 30px"
/>
<p>${item.author}</p>
</div>`;
        cards += cardBlock;
    });

    photosContainer.innerHTML = cards;

}