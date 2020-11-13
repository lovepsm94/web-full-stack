let questionId = undefined
document.querySelector('.result-btn').disabled = true
function renderPage() {
    $.ajax({
        url: "http://localhost:3000/random-question",
        type: "GET",
        success: (res) => {
            setTimeout(() => {
                $('#content').html(`${res.content}`)
                questionId = res._id
                document.querySelector('.result-btn').disabled = false
            }, 500)

        },
        error: (err) => console.log(err)
    })
}
renderPage()
document.querySelector('.result-btn').addEventListener('click', () => {
    location.replace(`http://localhost:3000/question/${questionId}`)
})
document.querySelector('.next-question-btn').addEventListener('click', () => {
    location.replace('http://localhost:3000')
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

