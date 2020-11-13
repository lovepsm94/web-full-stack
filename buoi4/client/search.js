document.querySelector('#search-input').addEventListener('input', () => {
    const inputText = document.querySelector('#search-input').value.trim()
    if (inputText.length) {
        document.querySelector('.result').innerHTML = `<img src="/img/Dual Ball-1s-200px.gif" style="display: none" id="loading-img">`
        document.querySelector('#loading-img').style.display = 'block'
        $.ajax({
            url: "http://localhost:3000/search-question",
            type: "POST",
            data: { content: inputText },
            success: (res) => {
                const searchResultsDom = res.map(question => {
                    const { content, yesCount, noCount, _id } = question
                    return `
                    <li class="list-group-item text-break" style="cursor: pointer;" onclick="location.replace('http://localhost:3000/question/${_id}')">
                        ${content}
                        <span class="badge badge-success badge-pill">${yesCount}</span>
                        <span class="badge badge-danger badge-pill">${noCount}</span>
                    </li>                     
                        
                    `
                }).join('')
                setTimeout(() => { 
                    document.querySelector('#loading-img').style.display = 'none'
                    document.querySelector('.result').insertAdjacentHTML('beforeend', searchResultsDom)
                }, 500)

            },
            error: (err) => console.log(err)
        })

    }

})