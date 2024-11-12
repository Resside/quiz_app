from flask import Flask, render_template, request, redirect, url_for, jsonify
import sqlite3
import random

app = Flask(__name__)

# Инициализация базы данных
def init_db():
    conn = sqlite3.connect('quiz.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS questions (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        question TEXT NOT NULL,
                        answer TEXT NOT NULL)''')
    conn.commit()
    conn.close()

init_db()

# Корневой маршрут для перенаправления на страницу /questions
@app.route('/')
def index():
    return redirect(url_for('questions'))

# Маршрут для добавления вопросов
@app.route('/questions', methods=['GET', 'POST'])
def questions():
    if request.method == 'POST':
        question = request.form['question']
        answer = request.form['answer']
        conn = sqlite3.connect('quiz.db')
        cursor = conn.cursor()
        cursor.execute("INSERT INTO questions (question, answer) VALUES (?, ?)", (question, answer))
        conn.commit()
        conn.close()
        return redirect(url_for('questions'))
    return render_template('questions.html')

# Маршрут для получения случайного вопроса
@app.route('/get_random_question')
def get_random_question():
    conn = sqlite3.connect('quiz.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM questions")
    questions = cursor.fetchall()
    conn.close()
    
    if questions:
        question = random.choice(questions)
        return jsonify({'id': question[0], 'question': question[1], 'answer': question[2]})
    else:
        return jsonify({'error': 'Нет доступных вопросов'})

# Маршрут для удаления вопроса по id
@app.route('/delete_question/<int:question_id>', methods=['POST'])
def delete_question(question_id):
    conn = sqlite3.connect('quiz.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM questions WHERE id = ?", (question_id,))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

if __name__ == "__main__":
    app.run(debug=True)
