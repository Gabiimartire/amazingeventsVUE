const { createApp } = Vue;
createApp({
  data() {
    return {
      urlApi: "https://amazing-events.herokuapp.com/api/events",
      eventos: [],
      backupEventos: [],
      categorias: [],
      textoBuscar: "",
      eventosFiltrados: [],
      categoriasPast: [],
      categoriasUpcoming: [],
      eventoEcnotrado: [],
    };
  },
  created() {
    this.traerDatos();
  },
  mounted() {

  },
  methods: {
    alert(){
      Swal.fire({
          icon: 'success',
          title: 'Thank You',
          text: 'Your message was sent successfully',
          footer: '<a href="../index.html" class="text-center fw-bolder">Back To Home Page</a>'
        })
      formulario.reset()
  },
    traerDatos() {
      fetch(this.urlApi).then((response) =>
        response.json().then((data) => {
          this.eventos = data.events;
          this.backupEventos = this.eventos;
          this.eventos.forEach((evento) => {
            if (!this.categorias.includes(evento.category)) {
              this.categorias.push(evento.category);
            } 
            if (evento.date <= data.currentDate) {
              if (!this.categoriasPast.includes(evento.category)) {
                this.categoriasPast.push(evento.category);
              }
            }
            if (evento.date >= data.currentDate) {
              if (!this.categoriasUpcoming.includes(evento.category)) {
                this.categoriasUpcoming.push(evento.category);
              }
            }
          });
          if(document.title == "Home"){
            this.eventos = data.events;
          }
          else if (document.title == "Upcoming Events") {
            this.backupEventos = this.eventos.filter(
              (evento) => evento.date >= data.currentDate
            );
          }
          else if (document.title == "Past Events") {
            this.backupEventos = this.eventos.filter(
              (evento) => evento.date <= data.currentDate
            );
          }
        })
      );
    },
  },
  computed: {
    superFiltro() {
        let filtro1 = this.backupEventos.filter((evento) =>
          evento.name.toLowerCase().includes(this.textoBuscar.toLowerCase())
        );
        let filtro2 = filtro1.filter((evento) =>
          this.eventosFiltrados.includes(evento.category)
        );
        if (this.eventosFiltrados.length > 0) {
          this.eventos = filtro2;
        } else {
          this.eventos = filtro1;
        }
    },
  },
}).mount("#app");
