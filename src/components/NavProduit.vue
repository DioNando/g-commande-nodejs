<template>
  <!-- <q-input dark standout label="Recherche d'un produit">
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input> -->
  <q-card flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6">Ajout d'un nouveau produit</div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat @click="persistent = true">Nouveau</q-btn>
    </q-card-actions>
  </q-card>
  <q-card dark bordered flat class="my-card q-my-lg">
    <q-card-section>
      <div class="text-h6">Consulter la liste des produits</div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat @click="router.push(`/produit`)">Liste</q-btn>
    </q-card-actions>
  </q-card>
  <!-- <q-card dark bordered flat class="my-card q-my-lg">
    <q-card-section>
      <div class="text-h6">Liste des produits par client</div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat>Liste par client</q-btn>
    </q-card-actions>
  </q-card> -->
  <q-dialog
    v-model="persistent"
    persistent
    transition-show="fade"
    transition-hide="fade"
  >
    <q-card
      class="bg-dark text-white q-pa-sm"
      style="width: 500px; max-width: 80vw"
    >
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5">Ajouter un nouveau produit</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="onSubmit" @reset="onReset">
          <q-input
            label="Designation du produit"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Veuillez saisir un nom valide',
            ]"
            v-model="produit.designation"
          />
          <div
            class="full-width no-wrap row justify-between items-start content-start"
          >
            <q-input
              label="Prix Unitaire"
              type="number"
              v-model="produit.prixUni"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Le prix doit être superieur à zero',
              ]"
              class="col q-mr-md"
            />
            <q-input
              label="Stock"
              type="number"
              v-model="produit.stock"
              class="col q-ml-md"
            />
          </div>
          <div align="right" class="q-mt-sm">
            <q-btn
              label="Ajouter"
              icon="cloud_upload"
              type="submit"
              color="positive"
            />
            <q-btn
              label="Effacer"
              type="reset"
              color="grey-1"
              outline
              class="q-ml-lg"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useQuasar, QSpinnerDots } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "NavProduit",
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
        this.router.push("/produit");
        this.$q.notify({
          color: "positive",
          textColor: "white",
          icon: "cloud_done",
          message: "Nouveau produit ajouté",
          position: "bottom-right",
        });
        console.log(this.produit);
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
