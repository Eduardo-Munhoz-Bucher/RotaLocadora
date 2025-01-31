<template>
  <v-snackbar
    class="msg mt-8 mr-8 white--text"
    v-model="snackbar"
    :timeout="timeout"
    right
    top
    min-width="100"
    elevation="0"
    transition="scroll-y-reverse-transition"
    @input="onClose"
  >
    {{ msg }}
  </v-snackbar>
</template>

<script>
export default {
  name: "MsgSucesso",
  props: {
    msg: {
      type: String,
      required: true,
    },
    timeout: {
      type: Number,
      default: 3000,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      snackbar: false,
    };
  },

  methods: {
    onClose(newValue) {
      if (!newValue) {
        this.$emit("closed");
        this.$emit("update:show", false);
      }
    },
  },

  watch: {
    show: {
      immediate: true,
      handler(newValue) {
        this.snackbar = newValue;
      },
    },
    snackbar(newValue) {
      if (!newValue) {
        this.$emit("update:show", false);
      }
    },
  },
};
</script>

<style scoped>
.msg {
  font-family: "Roboto";
  font-size: 14px;
  font-weight: 400;
  text-align: center;
}

::v-deep .v-sheet.v-snack__wrapper {
  border-radius: 6px !important;
}

::v-deep .v-snack__content {
  color: #FFF;
  background-color: var(--color-success);
  border-radius: 5px;
}

::v-deep .v-snack__action {
  margin-right: 0 !important;
}
</style>
