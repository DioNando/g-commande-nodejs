<template>
  <!-- <q-input dark standout label="Recherche d'un client">
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input> -->
  <q-card flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6">Ajout d'un nouveau client</div>
    </q-card-section>

    <q-separator />
    <q-card-actions vertical>
      <q-btn flat>Nouveau</q-btn>
    </q-card-actions>
  </q-card>
  <q-card flat bordered class="my-card q-my-lg">
    <q-card-section>
      <div class="text-h6">Consulter la liste des clients</div>
    </q-card-section>
    <q-separator />

    <q-card-actions vertical>
      <q-btn flat>Liste</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      filter: ref(""),
    };
  },
};
</script>
