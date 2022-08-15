<template>
  <div
    class="text-h5 text-info q-mb-sm full-width row no-wrap justify-between items-center content-start"
  >
    <div>Client</div>
    <q-icon name="face" />
  </div>
  <q-card flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6">Ajout d'un nouveau client</div>
    </q-card-section>

    <q-separator />
    <q-card-actions vertical>
      <q-btn flat @click="modal = true">Nouveau</q-btn>
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
  <q-card flat bordered class="my-card q-mt-lg">
    <q-card-section>
      <div class="text-h6">Chiffre d'affaires des clients</div>
    </q-card-section>
    <q-separator />

    <q-card-actions vertical>
      <q-btn flat @click="router.push(`/chiffre-client`)">Consulter</q-btn>
    </q-card-actions>
  </q-card>

  <q-dialog v-model="modal" transition-hide="fade">
    <q-card
      class="bg-dark text-white q-pa-sm"
      style="width: 500px; max-width: 80vw"
    >
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 row no-wrap items-center text-warning">
          <q-icon name="face" />
          <div class="q-ml-sm">Ajouter un nouveau client</div>
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset">
          <q-input
            label="Nom"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Veuillez saisir un nom valide',
            ]"
            v-model="client.nomClient"
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
</template>

<script>
import { useQuasar, QSpinnerDots } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { addClient } from "src/api/client";

export default {
  name: "NavClient",
  data() {
    return {
      client: {
        nomClient: "",
      },
    };
  },
  setup() {
    const toast = useQuasar();
    const router = useRouter();
    const $q = useQuasar();
    let timer = null;

    return {
      router,
      modal: ref(false),
      timer,
      toast,
    };
  },
  methods: {
    onSubmit() {
      this.$q.loading.show({
        spinner: QSpinnerDots,
        message: "Informations en cours de traitement, patientez...",
      });
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        addClient(this.client)
          .then(() => {
            // this.router.push(`/client`);
            this.toast.notify({
              color: "positive",
              textColor: "white",
              icon: "cloud_done",
              message: "Nouveau client ajouté",
              position: "bottom-right",
            });
            this.modal = false;
          })
          .catch((error) => {
            console.log(error);
            this.toast.notify({
              type: "negative",
              textColor: "White",
              icon: "warning",
              message: "Erreur lors de l'ajout du client",
              position: "bottom-right",
            });
          });

        this.timer = void 0;
      }, 1000);
    },

    onReset() {
      this.client.nomClient = "";
    },
  },
};
</script>
