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
    $('#content').text(`${res.content}`)
    $('#total-votes').text(`${res.yesCount + res.noCount} votes`)
    const { yesCount, noCount } = res
    let percentYes, percentNo
    yesCount + noCount !== 0 ? percentYes = (yesCount*100 / (yesCount + noCount)).toFixed() : percentYes = 50
    percentNo = 100 - percentYes
    $('#percent-yes-votes').text(`${percentYes}%`)
    $('#yes-progress').css('width', `${percentYes}%`)
    $('#percent-no-votes').text(`${percentNo}%`)
    $('#no-progress').css('width', `${percentNo}%`)
}
