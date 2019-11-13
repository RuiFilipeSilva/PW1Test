Vue.component("modal-thumb",{
    props:["serie"],
    template:
    `
    <dialog id="dlgAdd">
                    <h3>ADICIONAR SÉRIE</h3>
                    <img v:bind:src="serie.thumb">
                    <p>Total de séries:{{getTotalSeasson.}}</p>
                    <button @click="closeModal()">FECHAR</button>
        </dialog>
    `,
    methods:{
        getTotalSeasson(serie){
            let seasson1
            seasson1 = serie.filter(
                seasson => serie.name
            )
        }
     }
})


const vm = new Vue({
    el:"#intro",
    data:{
        id:0,
        title:"",
        seasson:"",
        eps:"",
        thumb:"",
        series:[],
        filter:"",
    },
    created: function(){
        window.addEventListener('unload', this.saveStorage)
        if (localStorage.getItem("serie")){
            this.tasks = JSON.parse(localStorage.getItem("series"))
        }
    },
    methods:{
        getLastId(){
            if(this.series.length){
                return this.series[this.series.length-1].id   
            }
            else{
                return 0
            }
            
        },
        addSerie(){
            if(!this.series.some(
                serie => serie.title === this.title && serie.seasson === this.seasson
            )){
            this.series.push({
                id:this.getLastId()+1,
                title:this.title, 
                seasson:this.seasson,
                eps:this.eps,
                thumb:this.thumb,
            })
        }
        else alert("A temporada desta série já foi adicionada")
        },
        openModal(){
            const dlgAdd = document.querySelector("#dlgAdd")
            dlgAdd.showModal()
        },
        closeModal(){
            const dlgAdd = document.querySelector("#dlgAdd")
            dlgAdd.close()
        },
        editTitle(id){
            const index = this.series.findIndex(
                (serie) => serie.id === id
            )
            this.series[index].title = prompt("Nome da Série",this.series[index].title)
        },
        removeSerie(id){
            if(confirm(`Deseja mesmo remover a série?`)){
                this.series = this.series.filter(
                    (serie) => serie.id !== id          
                )
        }
    },
    compareTitle(a,b){
        if(a.title < b.title) return -1
        if(a.title > b.title) return 1
        else return 0
    },
    saveStorage(){
        localStorage.setItem("series",JSON.stringify(this.tasks))
    }
},
computed:{
    filteredSeries(){
        return this.series.filter(
            (serie) => {serie.title == this.filter || this.filter == "todos" 
                
            } 
        )
    }
}

})