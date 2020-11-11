const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose')
const QuestionModel = require('./models/question')

mongoose.connect('mongodb://localhost:27017/quyetde', (err) => {
    if (err) throw err
    console.log('mongodb success');
});


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

app.get('/random-question', async (req, res) => {
    const questions = await QuestionModel.find({})
    const randomQuestion = questions[getRandomInt(questions.length)]
    res.send(randomQuestion)
})

app.get('*', (req, res) => {
    res.send('404 not found')
})

app.post('/create-question', async (req, res) => {
    const { content } = req.body
    const newQuestionData = {
        content,
        yesCount: 0,
        noCount: 0
    }
    const newQuestion = await QuestionModel.create(newQuestionData)
    res.send({
        success: 1, data: {
            ...newQuestion,
            id: newQuestion._id
        }
    })
})
app.post('/question', async (req, res) => {
    // const { questionId, upVote, downVote } = req.body
    // fs.readFile('data.json', (err, data) => {
    //     if (err) throw err
    //     const questions = JSON.parse(data)
    //     for (let question of questions) {
    //         if (question.id == questionId) {
    //             if (upVote) {
    //                 question.yesCount++
    //                 fs.writeFile('data.json', JSON.stringify(questions), (err) => {
    //                     if (err) return res.send({ success: 0 })
    //                     res.send({ success: 1, data: question });
    //                 })
    //             } else if (downVote) {
    //                 question.noCount++
    //                 fs.writeFile('data.json', JSON.stringify(questions), (err) => {
    //                     if (err) return res.send({ success: 0 })
    //                     res.send({ success: 1, data: question });
    //                 })
    //             } else return res.send(question)
    //         }
    //     }
    // })
    const { questionId, upVote, downVote } = req.body
    const foundQuestion = await QuestionModel.findById(questionId)
    if (!foundQuestion) {
        return res.send({ success: 0 })
    } else {
        if (upVote) {
            foundQuestion.yesCount++
            await QuestionModel.updateOne({ _id: questionId }, foundQuestion, () => res.send(foundQuestion))
        } else if (downVote) {
            foundQuestion.noCount++
            console.log(questionId)
            QuestionModel.findByIdAndUpdate(questionId, foundQuestion, () => res.send(foundQuestion))
        } else return res.send(foundQuestion)
    }
})

app.listen(3000, (err) => {
    if (err) throw err;
})
