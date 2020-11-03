$(document).ready(() => {
    $.ajax({
        url: "http://localhost:3000/question",
        type: "POST",
        data: { questionId: window.location.pathname.slice(10) },
        success: (res) => {
            $('#content').text(`Câu hỏi: ${res.content}`)
            $('#total-votes').text(`Tổng số vote: ${res.yesCount + res.noCount}`)
            const { yesCount, noCount } = res
            let percentYes, percentNo
            yesCount + noCount !== 0 ?  percentYes = yesCount / (yesCount + noCount) : percentYes = 50
            percentNo = 100 - percentYes
            $('#percent-yes-votes').text(`Yes: ${percentYes}%`)
            $('#percent-no-votes').text(`No: ${percentNo}%`)
        },
        error: (err) => console.log(err)
    })
})
