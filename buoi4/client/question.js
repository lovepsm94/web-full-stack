$(document).ready( () => {
    $.ajax({
        url: "http://localhost:3000/question",
        type: "POST",
        data: { questionId: window.location.pathname.slice(10) },
        success: (res) => {
            $('#content').text(`Câu hỏi: ${res.content}`) 
            $('#total-votes').text(`Tổng số vote: ${res.yesCount + res.noCount}`)
            $('#yes-votes').text(`Số vote yes: ${res.yesCount}`)
            $('#no-votes').text(`Số vote no: ${res.noCount}`)
        },
        error: (err) => console.log(err)
    })
})