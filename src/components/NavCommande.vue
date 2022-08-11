<template>
  <!-- <q-input dark standout label="Recherche d'une commande">
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input> -->
  <q-card flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6">Ajout d'une nouvelle commande</div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat>Nouveau</q-btn>
    </q-card-actions>
  </q-card>
  <q-card flat bordered class="my-card q-my-lg">
    <q-card-section>
      <div class="text-h6">Consulter la liste des commandes</div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat @click="router.push(`/commande`)">Liste</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { useQuasar, QSpinnerDots } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "NavCommande",
  data() {
    return {
      produit: {
        designation: "",
        prixUni: "",
        stock: "",
      },
    };
  },
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    let timer = null;

    return {
      router,
      persistent: ref(false),
      timer,
      $q,
    };
  },
  methods: {
    onSubmit() {
      this.$q.loading.show({
        spinner: QSpinnerDots,
        message: "Information en cours de traitement, patientez...",
      });
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.router.push("/client");
        this.$q.notify({
          color: "positive",
          textColor: "white",
          icon: "cloud_done",
          message: "Nouveau client ajouté",
          position: "bottom-right",
        });
        console.log(this.client);
        this.timer = void 0;
      }, 1000);
    },

    onReset() {
      this.produit.designation = "";
      this.produit.prixUni = "";
      this.produit.stock = "";
    },
  },
};
</script>
