const socket = io.connect()

function addMessage(e){
    const message = {
        author: document.getElementById('username').value,
        message: document.getElementById('text').value
    }
    socket.emit('new-message', message)

    return false
}

function render(data){
    const html = data.map((elemento, index)=>{
        return (`<div>
        <strong>${elemento.author}</strong>
        <em>${elemento.message}</em>
        </div>`)
    }).join(' ')

    document.getElementById('messages').innerHTML = html
}

socket.on('messages', function(data){
    render(data)
})