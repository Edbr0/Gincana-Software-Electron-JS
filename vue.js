const database = require('../renderer')
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
        <form class="needs-validation" novalidate>
            <div class="form-group">
                <label for="exampleInputEmail1">Quantidade de pontos</label>
                <input class="form-control form-control-sm" id="pontos" type="number" placeholder="pontos" v-model="pontos">
                <small id="emailHelp" class="form-text text-muted">Nunca vamos compartilhar seu email, com ninguém.</small>
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
                <button v-on:click="addTabela()" v-on:click="showResults()" type="button" id="salvar" class="btn bg-danger text-white">Adicionar</button>
            </div>
        </form>      
    </div>
    <div class="col-sm" style="padding:0; font-size:12px; height:400px; overflow:auto; overflow-x:hidden;text-overflow: ellipsis;">
        <table class="table table-striped">
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
                <td><button @click="removeItem(index)" @click="showResults()" class="btn btn-danger btn-sm">x</button></td>
              </tr>
            </tbody>
          </table> 
    </div>
    <div  class=" container col-sm">
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
</div>
</div>`,
    data(){
        return {
            totals:{vermelho:vermelho, azul:azul,amarelo:amarelo},
            condicao:true,
            tabela,
            equipe: 'equipe...',
            descricao:'',
            pontos:'',
            dia:'Dia...'
        }
        
    },
    methods:{
        addTabela(){
            if(this.equipe.trim() ==='' || this.pontos.trim() === ''){
                return;
            }
            this.tabela.unshift({
                equipe:this.equipe,
                descricao: this.descricao,
                pontos: this.pontos,
                dia: this.dia
            }),
            db.update(`equipes.${this.equipe}`, n => n + Number(this.pontos)).write()
            this.equipe = 'equipe...'
            this.descricao =''
            this.pontos = ''
            this.dia ='Dia...'
        },
        removeItem(index){
            this.equipe = db.get(`tabela[${index}].equipe`).value()
            this.pontos = db.get(`tabela[${index}].pontos`).value()
            db.update(`equipes.${this.equipe}`, n => n - Number(this.pontos)).write()
            this.tabela.splice(index, 1)
            db.write()
            console.log('deletou') 
            this.equipe = 'equipe...'
            this.pontos = ''  
               
        },
        showResults (){
            let showVermelho = document.getElementById('vermelho')
            let showAzul = document.getElementById('azul')
            let showAmarelo = document.getElementById('amarelo')
            showVermelho.innerHTML = `Total de Pontos:${db.get('equipes.Vermelho').value()}`
            showAzul.innerHTML = `Total de Pontos:${db.get('equipes.Azul').value()}`
            showAmarelo.innerHTML = `Total de Pontos:${db.get('equipes.Amarelo').value()}`
        }
    },
    watch: {
        vermelhoP: ()=> {
        this.totals.vermelho = vermelho
        },
        azulP: ()=>{
            this.totals.azul = azul
        },
        amareloP: ()=>{
            this.totals.amarelo = amarelo
        }
    }
})