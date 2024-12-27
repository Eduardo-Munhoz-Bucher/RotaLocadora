<template>
  <div class="page-container">
    <MsgSucesso
      :msg="msg"
      :timeout="timeout"
      :show.sync="snackbar_sucesso"
      @closed="onSuccessClosed"
    />
    <MsgErro
      :msg="msg"
      :timeout="timeout"
      :show.sync="snackbar_erro"
      @closed="onErrorClosed"
    />

    <v-card color="#fff" class="formulario" rounded-xl>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <div class="logo-garagem">
            <img
              src="../assets/img/car-garage-solid.png"
              alt="logo-garagem"
              width="83"
              height="70"
            />
          </div>
          <v-card-text> Login </v-card-text>
          <v-text-field
            v-model="formData.email"
            :rules="emailRules"
            label="E-mail"
            placeholder="Digite o e-mail"
            persistent-placeholder
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="formData.senha"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            outlined
            dense
            name="input-password"
            label="Senha"
            placeholder="Digite a senha"
            persistent-placeholder
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-btn
            color="#007DF0"
            class="button"
            block
            large
            :loading="loading"
            :disabled="loading"
            @click="entrar"
            >Entrar</v-btn
          >
          <div class="novaConta">
            <NuxtLink to="/usuarios">Criar conta</NuxtLink>
          </div>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import MsgSucesso from "../components/snackbar/msgSucesso.vue";
import MsgErro from "../components/snackbar/msgErro.vue";
import api from "../services/api";
import { emailRules } from "../services/validationsRules";

export default {
  name: "IndexPage",
  components: { MsgSucesso, MsgErro },
  data() {
    return {
      formData: {
        nome_user: '',
        email: "",
        senha: "",
      },
      msg: "",
      timeout: 2000,
      snackbar_sucesso: false,
      snackbar_erro: false,
      valid: true,
      loading: false,
      showPassword: false,
      emailRules,
    };
  },
  methods: {
    async entrar(e) {
      e.preventDefault();

      this.loading = true;

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await api.get("usuarios", {
        params: {
          nome_user: this.formData.nome_user,
          email: this.formData.email,
          senha: this.formData.senha,
        },
      });
      const users = response.data;
      const user = users.find(
        (user) =>
          user.email === this.formData.email &&
          user.senha === this.formData.senha
      );

      if (user) {
        this.snackbar_sucesso = true;
        this.msg = "Login realizado com sucesso!";

        await new Promise((resolve) => setTimeout(resolve, 2000));

        this.$store.commit("auth/login", user.nome_user);

        this.$router.push({ path: "/veiculos" });
      } else if (!this.formData.email || !this.formData.senha) {
        this.snackbar_erro = true;
        this.msg = "Campos não preenchidos!";
        this.validate();
      } else {
        this.snackbar_erro = true;
        this.msg = "E-mail ou senha incorretos!";
      }

      this.loading = false;

    },

    onErrorClosed() {
      console.log("Snackbar de erro fechado.");
    },

    onSuccessClosed() {
      console.log("Snackbar de sucesso fechado");
      
    },

    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style scoped>
.page-container {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-image: url("../assets/img/fundo-tela.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.page-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  z-index: 0;
}

.formulario {
  padding: 20px 40px;
  margin: auto;
  width: 35vw;
  height: auto;
  max-width: 480px;
  border-radius: 30px;
}

.logo-garagem {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.v-card__text {
  font-size: 20px;
  font-weight: 700;
  font-family: "Roboto";
  text-align: center;
  margin-bottom: 15px;
  color: #333333;
}

::v-deep .v-text-field input {
  font-family: "Roboto";
  font-size: 12px !important;
  font-weight: 400;
}

::v-deep .v-messages__message {
  color: #ff5252;
  font-family: "Roboto";
}

.v-chip {
  height: 20px;
  font-size: 12px;
  font-family: "Roboto";
  font-weight: 400;
}

.theme--light.v-input input {
  color: rgba(0, 0, 0, 0.87);
}

.button {
  font-size: 16px;
  font-family: "Roboto";
  font-weight: 400;
  line-height: 18px;
  color: #fff;
}

.novaConta {
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
  font-family: "Roboto";
  font-weight: 400;
}

.novaConta > a {
  text-decoration: none;
  color: #a9a7a9;
  transition: 0.3s;
}

.novaConta > a:hover {
  text-decoration: none;
  color: #797979;
}
</style>
