<template>
  <v-container>
    <h1 id="title" class="text-center mb-5">{{ category }}</h1>
    <v-card>
      <v-card-title primary-title class="text-center">
        {{ question }}
      </v-card-title>
    </v-card>
    <v-container>
      <v-row justify="center" class="mt-4">
        <v-col cols="auto">
          <v-btn
            title="Correto"
            color="success"
            @click="handleTrue"
            class="mdi mdi-check-outline"
          >
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            title="Incorreto"
            color="error"
            @click="handleFalse"
            class="mdi mdi-circle-off-outline"
          >
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <p class="text-center" id="resultado" v-if="resultado === 'Você acertou!'">
      {{ resultado }}
    </p>
    <p
      class="text-center"
      id="resultado-erro"
      v-else-if="resultado === 'Que pena você errou!'"
    >
      {{ resultado }}
    </p>
    <p class="text-center" id="resultado-fim" v-else>
      {{ resultado }}
    </p>

    <MyModal
      v-show="showModal"
      :acertos="countT"
      :erros="countF"
      class="modal"
    ></MyModal>
  </v-container>
</template>

<script>
import api from "./services/conn";
import MyModal from "./components/MyModal.vue";
export default {
  name: "MarceloApp",

  components: {
    MyModal,
  },

  data() {
    return {
      visualizar: undefined,
      category: undefined,
      question: undefined,
      response: undefined,
      resposta: undefined,
      resultado: undefined,
      pag: 0,
      countT: 0,
      countF: 0,
      showModal: false,
    };
  },

  mounted() {
    api.then((res) => {
      this.visualizar = res.data.results;
      this.category = res.data.results[0].category;
      this.question = res.data.results[this.pag].question;
      this.response = res.data.results[this.pag].correct_answer;

      console.log(`Question: ${this.question}`);
      console.log(`Correct_Response: ${this.response}`);
      console.log(this.visualizar);
    });
  },

  methods: {
    handleTrue() {
      this.resposta = "True";
      this.pag = this.pag + 1;
      if (this.pag > 5) {
        this.showModal = true;
        return (this.resultado = "Acabou o game!");
      } else if (this.resposta === this.response) {
        this.resultado = "Você acertou!";
        this.countT = this.countT + 1;
      } else {
        this.resultado = "Que pena você errou!";
        this.countF = this.countF + 1;
      }
      api.then((res) => {
        this.question = res.data.results[this.pag].question;
        this.response = res.data.results[this.pag].correct_answer;
      });
    },
    handleFalse() {
      this.resposta = "False";
      this.pag = this.pag + 1;
      if (this.pag > 5) {
        return (this.resultado = "Acabou o game!");
      } else if (this.resposta === this.response) {
        this.resultado = "Você acertou!";
        this.countT = this.countT + 1;
      } else {
        this.resultado = "Que pena você errou!";
        this.countF = this.countF + 1;
      }
      api.then((res) => {
        this.question = res.data.results[this.pag].question;
        this.response = res.data.results[this.pag].correct_answer;
      });
    },
  },
};
</script>

<style scoped>
#title {
  color: whitesmoke;
}

#resultado {
  background-color: green;
  color: white;
  margin-top: 50px;
}

#resultado-erro {
  background-color: orange;
  color: white;
  margin-top: 50px;
}

#resultado-fim {
  background-color: red;
  color: white;
  margin-top: 50px;
}

.modal {
  margin-top: 70px;
}
</style>
