const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

var Dialogs = require('dialogs')
const dialogs = Dialogs()
let vermelho = db.get('equipes.Vermelho').value()
let azul = db.get('equipes.Azul').value()
let amarelo = db.get('equipes.Amarelo').value()
let tabela = db.get('tabela').value()


new Vue({
    el: '#app',
    template:
`<div class="container opa" style="margin-top: 10%;">
    <div class="row">
        <div class="col-sm" >
            <button class="btn btn-sm btn-primary " v-on:click="showResults()" v-on:click="showWinner()" v-on:click="searchWinner()" style="position:relative; left:0%; bottom:17%;">
                Ver Ganhador
            </button>
            <label style="position:relative; top:24%;">Adicionar</label><br>
            <button class="btn btn-lg btn-success buttom" v-if="condicao == false" v-on:click="openAddItem() "type="button" >
            <span class="iconify" data-icon="dashicons-plus-alt2" data-inline="false"></span>
            </button>
            <div id="modal" v-if="condicao == true">
                <buttom class="btn btn-danger" style="margin-left:80%;" v-on:click="closeWindow()"><i class="fas fa-window-close"></i></buttom>
                <div class="container col-4 inputDiv"> 
                    <form  class="needs-validation" novalidate>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Quantidade de pontos</label>
                            <input class="form-control form-control-sm" id="pontos" type="number" placeholder="pontos" v-model="pontos">
                            <small id="emailHelp" class="form-text text-muted">Insira apenas numeros inteiros!</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Descrição</label>
                            <input class="form-control form-control-sm" id="descricao" type="text" placeholder="descrição" v-model="descricao">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Equipe</label>
                            <select id="equipe" class="form-control form-control-sm" v-model="equipe">
                                <option>equipe...</option>
                                <option>Vermelho</option>
                                <option>Azul</option>
                                <option>Amarelo</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">DIA</label>
                            <select id="dia" class="form-control form-control-sm" v-model="dia">
                                <option>Dia...</option>
                                <option>DOMINGO</option>
                                <option>SEGUNDA</option>
                                <option>TERCA</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <button v-on:click="addTabela()" v-on:click="showResults()" type="button" id="salvar" class="btn btn-success text-white">Adicionar</button>
                        </div>
                    </form>
                </div>
            </div>     
        </div>
        <div class="col-sm" style="padding:0; font-size:12px; height:400px; width:600px; padding-right:50px; overflow:auto; overflow-x:hidden;text-overflow: ellipsis; position:static;">
            <table class="table table-sm table-hover">
                <thead class="thead">
                <tr style="width:100%; margin:0">
                    <th scope="col">Equipe</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Pontos</th>
                    <th scope="col">Dia</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(tab, index) in tabela">
                    <td>{{ tab.equipe }}</td>
                    <td>{{ tab.descricao }}</td>
                    <td>{{ tab.pontos}}</td>
                    <td>{{ tab.dia }}</td>
                    <td><button @click="removeItem(index)" @click="showResults()" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td>
                </tr>
                </tbody>
            </table> 
        </div>
        <div  class=" container col-sm" style="position:static;">
            <div id="vermelho" class="align-self-start row d-flex justify-content-center align-items-center rounded w-75 ml-4 h-25 bg-danger">
                Total de Pontos:{{ totals.vermelho }}
            </div><br>
            <div id="azul" class="align-self-center row d-flex justify-content-center align-items-center rounded w-75 ml-4 h-25 bg-primary mt-4">
                Total de Pontos:{{totals.azul}}
            </div><br>
            <div id="amarelo" class="align-self-end row d-flex justify-content-center align-items-center rounded   w-75 h-25 ml-4 mt-4" style="background-color:#FDBE3D;">
                Total de Pontos:{{totals.amarelo}}
            </div>
        </div>  
        <div id="modal2" v-show="showGanhador == true">
        <buttom class="btn btn-danger" style="margin-left:80%;" v-on:click="closeWindow()"><i class="fas fa-window-close"></i></buttom>
            <div id="vermelho" v-if="ganhador == 'vermelho'" class="align-self-start row d-flex justify-content-center align-items-center rounded w-75 ml-4 h-25 bg-danger">
                Total de Pontos:{{ totals.vermelho }}
            </div><br>
            <div id="azul" v-if="ganhador == 'azul'" class="align-self-center row d-flex justify-content-center align-items-center rounded w-75 ml-4 h-25 bg-primary mt-4">
                Total de Pontos:{{totals.azul}}
            </div><br>
            <div id="amarelo" v-if="ganhador == 'amarelo'" class="align-self-end row d-flex justify-content-center align-items-center rounded   w-75 h-25 ml-4 mt-4" style="background-color:#FDBE3D;">
                Total de Pontos:{{totals.amarelo}}
            </div>
            <div  v-if="ganhador == 'empate'" class="align-self-end row d-flex justify-content-center align-items-center rounded   w-75 h-25 ml-4 mt-4" style="background-color:black; color:white;">
                Sem ganhador!
            </div>    
        </div>
    </div>
</div>
`,
    data() {
        return {
            totals: { vermelho: vermelho, azul: azul, amarelo: amarelo },
            condicao: false,
            showGanhador: false,
            ganhador:'',
            tabela,
            equipe: 'equipe...',
            descricao: '',
            pontos: '',
            dia: 'Dia...'
        }
    },
    methods: {
        openAddItem() {
            this.condicao = true
        },
        addTabela() {
            if (this.equipe.trim() === 'equipe...' || this.pontos.trim() === '' || this.descricao.trim() === '' || this.dia.trim() === 'Dia...') {
                dialogs.alert('Por favor prencha todos os campos!', ok => {
                    console.log('alert', ok)
                })
                return;
            }
            if (this.pontos <= 0) {
                dialogs.alert('Este valor é inválido!', ok => {
                    console.log('alert', ok)
                })
                return;
            }
            this.tabela.unshift({
                equipe: this.equipe,
                descricao: this.descricao,
                pontos: this.pontos,
                dia: this.dia
            })
            db.update(`equipes.${this.equipe}`, n => n + Number(this.pontos)).write()
            this.equipe = 'equipe...'
            this.descricao = ''
            this.pontos = ''
            this.dia = 'Dia...'
            this.condicao = false
        },
        removeItem(index) {
            dialogs.confirm('Você deseja excluir isto?', ok => {
                if (ok) {
                    this.equipe = db.get(`tabela[${index}].equipe`).value()
                    this.pontos = db.get(`tabela[${index}].pontos`).value()
                    db.update(`equipes.${this.equipe}`, n => n - Number(this.pontos)).write()
                    this.tabela.splice(index, 1)
                    db.write()
                    console.log('deletou')
                    this.equipe = 'equipe...'
                    this.pontos = ''
                    this.showResults()
                } else {
                    return;
                }
            })
        },
        showResults() {
            let showVermelho = document.getElementById('vermelho')
            let showAzul = document.getElementById('azul')
            let showAmarelo = document.getElementById('amarelo')
            showVermelho.innerHTML = `Total de Pontos:${db.get('equipes.Vermelho').value()}`
            showAzul.innerHTML = `Total de Pontos:${db.get('equipes.Azul').value()}`
            showAmarelo.innerHTML = `Total de Pontos:${db.get('equipes.Amarelo').value()}`
        },
        closeWindow(){
            this.equipe = 'equipe...'
            this.descricao = ''
            this.pontos = ''
            this.dia = 'Dia...'
            this.condicao = false
            this.showGanhador = false
        },
        showWinner(){
            this.showGanhador = true    
        },
        searchWinner(){
            let vermelho = db.get('equipes.Vermelho').value()
            let azul = db.get('equipes.Azul').value()
            let amarelo = db.get('equipes.Amarelo').value()
            if(vermelho > azul && vermelho > amarelo){
                this.ganhador = 'vermelho'
            }
            else if(azul > vermelho && azul > amarelo){
                this.ganhador = 'azul'
            }
            else if(amarelo > vermelho && amarelo > azul){
                this.ganhador = 'amarelo'
            } else {
                this.ganhador = 'empate'
            }
        }
    },
    watch: {
        vermelhoP: () => {
            this.totals.vermelho = vermelho
        },
        azulP: () => {
            this.totals.azul = azul
        },
        amareloP: () => {
            this.totals.amarelo = amarelo
        }
    }
})





