// Задание 4

// Напишите код приложения, 
// интерфейс которого представляет собой 2 input и кнопку submit. 
// В input можно ввести любое число.

const inputWidth = document.getElementById("width");
const inputHeight = document.getElementById("height");
const submitButton = document.querySelector("button");
const outputSpan = document.querySelector("span");
const photosContainer = document.querySelector("div");

//Cрабатывание события на клик кнопки и срабатывание функции submitButtonHandle
submitButton.addEventListener("click", submitButtonHandle);

//Функция write
function write(text) {
    outputSpan.innerHTML = text;
}


// Функция submitButtonHandle
function submitButtonHandle() {
    const width = inputWidth.value;
    const height = inputHeight.value;

    if ((width < 100 || width > 300 || isNaN(width)) || (height < 100 || height > 300 || isNaN(height))) {
        write("Одно из чисел вне диапазона от 100 до 300");
        return;
    }

    write("Загрузка фото...");

    fetch('https://dummyimage.com/${width}/${height}')  //////
    .then((response) => response.url)
    .then((result) => {
        loadPhoto(result);
        write("Фото загружено.");
    })
    .catch((reason) => {
        write("Ошибка: " + reason);
    });
}


// Функция вставки фото в div
function loadPhoto(photoUrl) {
    const cardBlock =   `<img
                          src="${photoUrl}"
                          style="margin-right: 30px"
                        />`;

    photosContainer.innerHTML = cardBlock;
}