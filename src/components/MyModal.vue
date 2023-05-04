<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="auto"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn color="blue-darken-2" v-bind="props"> Ver Resultado </v-btn>
      </template>

      <v-card>
        <v-card-text>
          <v-card-title primary-title> RESULTADO </v-card-title>
          <v-divider class="mb-3"></v-divider>
          <h3>Acertos: {{ acertos }}</h3>
          <h3>Erros: {{ erros }}</h3>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-3" @click="handleRestart"
            >Restart Game</v-btn
          >
          <v-btn color="blue" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "MyModal",
  props: ["acertos" ,"erros"],

  data() {
    return {
      dialog: false,
    };
  },

  mounted() {},

  methods: {
    handleRestart() {
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped></style>
