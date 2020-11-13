$.ajax({
    url: "http://localhost:3000/question",
    type: "POST",
    data: { questionId: window.location.pathname.slice(10) },
    success: (res) => {
        renderPage(res)
    },
    error: (err) => console.log(err)
})

function renderPage(res) {
    const { yesCount, noCount } = res
    let percentYes, percentNo
    yesCount + noCount !== 0 ? percentYes = (yesCount * 100 / (yesCount + noCount)).toFixed() : percentYes = 50
    percentNo = 100 - percentYes
    setTimeout(() => {
        $('.container').html(questionHtml)
        $('#content').text(`${res.content}`)
        $('#total-votes').text(`${res.yesCount + res.noCount} votes`)
        $('#percent-yes-votes').text(`${percentYes}%`)
        $('#yes-progress').css('width', `${percentYes}%`)
        $('#percent-no-votes').text(`${percentNo}%`)
        $('#no-progress').css('width', `${percentNo}%`)
    }, 500)

}
const questionHtml = `
        <div class="container d-flex align-items-center justify-content-center text-break overflow-auto h2" style="height: 20rem;"
            <h2 id="content"></h2>
        </div>
        <div class="mt-4 text-center font-weight-bold">
            <p id="total-votes">0 votes</p>
        </div>
        <div class="progress" style="height: 2rem;">
            <div class="progress-bar bg-danger" role="progressbar" style="width: 50%" id="no-progress">
                <div class="percent-no-votes"><i class="far fa-thumbs-down" id="percent-no-votes"></i></div>
            </div>
            <div class="progress-bar bg-primary" role="progressbar" style="width: 50%" id="yes-progress">
                <div class="percent-yes-votes"><i class="far fa-thumbs-up" id="percent-yes-votes"></i></div>
            </div>
        </div>
        <div class="d-flex justify-content-center mt-4">
            <button class="next-question-btn btn btn-info" onclick="location.replace('http://localhost:3000');">Xem câu hỏi khác</button>
        </div>
        `
