<template>
  <q-card flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6">Ajout d'un nouveau client</div>
    </q-card-section>

    <q-separator />
    <q-card-actions vertical>
      <q-btn flat @click="persistent = true">Nouveau</q-btn>
    </q-card-actions>
  </q-card>
  <q-card flat bordered class="my-card q-my-lg">
    <q-card-section>
      <div class="text-h6">Consulter la liste des clients</div>
    </q-card-section>
    <q-separator />

    <q-card-actions vertical>
      <q-btn flat @click="router.push(`/client`)">Liste</q-btn>
    </q-card-actions>
  </q-card>
  <q-card flat bordered class="my-card q-my-lg">
    <q-card-section>
      <div class="text-h6">Chiffre d'affaires des clients</div>
    </q-card-section>
    <q-separator />

    <q-card-actions vertical>
      <q-btn flat @click="router.push(`/chiffre-client`)">Consulter</q-btn>
    </q-card-actions>
  </q-card>

  <div>
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
          <div class="text-h5">Ajouter un nouveau client</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="onSubmit" @reset="onReset">
            <q-input
              label="Nom"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Veuillez saisir un nom valide',
              ]"
              v-model="client.nom"
            />
            <div align="right">
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
  </div>
</template>

<script>
import { useQuasar, QSpinnerDots } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "RegisterClient",
  data() {
    return {
      client: {
        nom: "",
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
      this.client.nom = "";
    },
  },
};
</script>
