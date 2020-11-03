const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');



app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) throw err
        const pathFile = path.resolve(__dirname, './client/home.html')
        res.sendFile(pathFile)
    })
})
app.get('/ask', (req, res) => {
    const pathFile = path.resolve(__dirname, './client/create-question.html')
    res.sendFile(pathFile)
})
app.get('/question/:questionId', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) throw err
        const questions = JSON.parse(data)
        const id = req.params.questionId
        if (typeof (id - 1) !== 'number' || id < 0 || id >= questions.length) return res.send('404 Not Found')
        const pathFile = path.resolve(__dirname, './client/question.html')
        res.sendFile(pathFile)
    })
})
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

app.get('/random-question', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) throw err
        const questions = JSON.parse(data)
        const randomIndex = getRandomInt(questions.length)
        res.send(questions[randomIndex])
    })
})

app.get('*', (req, res) => {
    res.send('404 not found')
})

app.post('/create-question', (req, res) => {
    const { content } = req.body;
    fs.readFile('data.json', (err, data) => {
        if (err) return res.send({ success: 0 });
        const oldQuestions = JSON.parse(data);
        const newQuestion = {
            id: oldQuestions.length,
            content,
            yesCount: 0,
            noCount: 0
        };
        const newQuestions = [...oldQuestions, newQuestion];
        fs.writeFile('data.json', JSON.stringify(newQuestions), (err) => {
            if (err) return res.send({ success: 0 })
            res.send({ success: 1, data: newQuestion });
        })
    })
})
app.post('/question', (req, res) => {
    const { questionId, upVote, downVote } = req.body
    fs.readFile('data.json', (err, data) => {
        if (err) throw err
        const questions = JSON.parse(data)
        for (let question of questions) {
            if (question.id == questionId) {
                if (upVote) {
                    question.yesCount++
                    fs.writeFile('data.json', JSON.stringify(questions), (err) => {
                        if (err) return res.send({ success: 0 })
                        res.send({ success: 1, data: question });
                    })
                } else if (downVote) {
                    question.noCount++
                    fs.writeFile('data.json', JSON.stringify(questions), (err) => {
                        if (err) return res.send({ success: 0 })
                        res.send({ success: 1, data: question });
                    })
                } else return res.send(question)
            }
        }
    })
})

app.listen(3000, (err) => {
    if (err) throw err;
})
