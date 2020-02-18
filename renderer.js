const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)







//Function r para ler evento
const ready = (fun) => {
    if (document.readyState != 'loading') {
        fun()    
    } else{
        document.addEventListener('DOMContentLoaded', fun)
    }
}


//CAPTURAR INPUTS / ALIMENTAR BANCO DE DADOS
ready(()=>{
    document.querySelector('#salvar').addEventListener('click', (e)=>{
            e.preventDefault()
    })
})

module.exports = db
