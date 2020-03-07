<template>
  <v-content
    :style="getStyleTheme(themes.Base, 'background-color')"
    style="min-height: 100%; overflow: hidden"
  >
    <v-card
      :style="getStyleTheme(themes.Dark, 'background-color')"
      dark
      width="50%"
      class="mx-auto"
      style="padding: 20px; margin-top: 20px">
      <v-container>
        <v-form
          v-model="formValid">
          <v-row>
            <v-col cols="12">
              <div class="d-flex align-center">
                <v-img
                  alt="Efrei Logo"
                  class="shrink mr-2"
                  contain
                  src="@/assets/efrei_logo.png"
                  transition="scale-transition"
                  width="150"
                />

                <v-img
                  alt="Efrei Name"
                  class="shrink mt-1 hidden-sm-and-down"
                  contain
                  min-width="300"
                  src="@/assets/efrei_name_logo.png"
                  width="300"
                />
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h1>{{title}}</h1>
            </v-col>
          </v-row>
          <v-form>
            <v-card
              class="mx-auto"
              color="#da6666"
              dark
              outlined
              :hidden='errorLoginHidden'
              max-width="400px"
            >
              <v-row>
                <v-col>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1"><label>Error !</label></v-list-item-title>
                      <v-list-item-subtitle>{{errorLogin}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                  <v-btn
                    style="margin-top: 2px; margin-right: 15px"
                    icon
                    @click="errorLoginHidden=true"
                  >
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
              </v-row>
            </v-card>
          </v-form>
          <v-row>
            <v-col
              cols="12"
              md="7">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                required
                label="email"/>
            </v-col>
            <v-col
              cols="12"
              md="5">
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="password"
                />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn tile color="primary"
                :disabled="!formValid"
                :loading="submitBtnLoading"
                @click="submitBtnClick">
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-content>
</template>

<script>

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    title: 'Login',
    formValid: true,
    email: 'eddy.dulche@efrei.net',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
    ],
    password: 'BZzCqAowMD',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 10) || 'Password must be more than 10 characters'
    ],
    submitBtnLoading: false,
    errorLogin: '',
    errorLoginHidden: true
  }),
  computed: {
    ...mapState('themes', ['themes']),
    ...mapState('user', ['user']),
    ...mapGetters('themes', ['getStyleTheme']),
    ...mapGetters('user', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('user', ['login']),

    async submitBtnClick (event) {
      this.submitBtnLoading = true

      await this.login({
        email: this.email,
        password: this.password
      })

      if (this.isAuthenticated) {
        console.log('Authentified')

        this.$router.push({ name: 'Modules' })
      } else {
        setTimeout(() => {
          this.submitBtnLoading = false
          this.errorLogin = 'Wrong credentials !'
          this.errorLoginHidden = false
        }, 1000)
      }
    }
  }
}
</script>
