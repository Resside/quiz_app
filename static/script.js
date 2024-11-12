// script.js

function getRandomQuestion() {
    fetch('/random_question')
        .then(response => response.json())
        .then(data => {
            document.getElementById('question').innerText = data.question;
            document.getElementById('answer').innerText = data.answer;
            document.getElementById('answer').style.display = 'none';
            document.getElementById('show-answer-btn').style.display = 'inline-block';
        });
}

function showAnswer() {
    document.getElementById('answer').style.display = 'block';
    document.getElementById('show-answer-btn').style.display = 'none';
}


// script.js

// Получение случайного вопроса
function getRandomQuestion() {
    fetch('/random_question')
        .then(response => response.json())
        .then(data => {
            document.getElementById('question').innerText = data.question;
            document.getElementById('answer').innerText = data.answer;
            document.getElementById('answer').style.display = 'none';
            document.getElementById('show-answer-btn').style.display = 'inline-block';
            document.getElementById('next-question-btn').style.display = 'inline-block';
        });
}

// Показ ответа на текущий вопрос
function showAnswer() {
    document.getElementById('answer').style.display = 'block';
    document.getElementById('show-answer-btn').style.display = 'none';
}

// Показ или скрытие формы добавления вопроса
function toggleAddQuestionForm() {
    const form = document.getElementById('add-question-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Добавление нового вопроса и ответа
function addQuestion() {
    const question = document.getElementById('new-question').value;
    const answer = document.getElementById('new-answer').value;

    fetch('/add_question', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: question, answer: answer })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Вопрос добавлен!');
            document.getElementById('new-question').value = '';
            document.getElementById('new-answer').value = '';
            toggleAddQuestionForm(); // Скрываем форму после добавления
        } else {
            alert('Ошибка при добавлении вопроса.');
        }
    });
}

let currentQuestionId = null;

// Получить случайный вопрос и отобразить его на странице
function getRandomQuestion() {
    fetch('/get_random_question')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                currentQuestionId = data.id;  // Сохраняем ID текущего вопроса
                document.getElementById('randomQuestion').textContent = data.question;
                document.getElementById('randomAnswer').textContent = data.answer;
                
                // Показываем контейнер с вопросом и скрываем ответ
                document.getElementById('questionContainer').style.display = 'block';
                document.getElementById('answerContainer').style.display = 'none';
            }
        });
}

// Показать ответ
function showAnswer() {
    document.getElementById('answerContainer').style.display = 'block';
}

// Удалить текущий вопрос по его ID
function deleteCurrentQuestion() {
    if (currentQuestionId) {
        fetch(`/delete_question/${currentQuestionId}`, {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Вопрос удален');
                document.getElementById('questionContainer').style.display = 'none';
                currentQuestionId = null;
            } else {
                alert('Ошибка при удалении вопроса');
            }
        });
    } else {
        alert('Вопрос для удаления не найден');
    }
}
