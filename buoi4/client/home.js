let questionId = undefined
document.querySelector('.result-btn').disabled = true
function renderPage() {
    $.ajax({
        url: "http://localhost:3000/random-question",
        type: "GET",
        success: (res) => {
            $('#content').text(`${res.content}`)
            questionId = res._id
            document.querySelector('.result-btn').disabled = false
        },
        error: (err) => console.log(err)
    })
}
renderPage()
document.querySelector('.result-btn').addEventListener('click',() => {
    location.replace(`http://localhost:3000/question/${questionId}`)
})
document.querySelector('.next-question-btn').addEventListener('click',() => {
    renderPage()
})
function upVote() {
    $.ajax({
        url: "http://localhost:3000/question",
        type: "POST",
        data: { questionId, upVote: 1 },
        success: (res) => {
            location.replace(`http://localhost:3000/question/${questionId}`)
        },
        error: (err) => console.log(err)
    })
}
function downVote() {
    $.ajax({
        url: "http://localhost:3000/question",
        type: "POST",
        data: { questionId, downVote: 1 },
        success: (res) => {
            location.replace(`http://localhost:3000/question/${questionId}`)
        },
        error: (err) => console.log(err)
    })
}

