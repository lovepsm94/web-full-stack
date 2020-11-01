const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = form.textArea.value;
    $.ajax({
        url: 'http://localhost:3000/create-question',
        type: 'POST',
        data: { content },
        success: (res) => {
            location.replace(`http://localhost:3000/question/${res.data.id}`)
        },
        error: (err) => console.log(err)
    })
    
});
const showTextArealength = () => {
    document.querySelector('#textarea-length').innerHTML = form.textArea.value.length + '/200';
}
