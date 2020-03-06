<template>
  <v-content
    :style="getStyleTheme(themes.theme, 'background-color')"
    style="height: 100%">
    <v-app-bar
      app
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Efrei Logo"
          class="shrink mr-2"
          contain
          src="@/assets/efrei_logo.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Efrei Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="@/assets/efrei_name_logo.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <h1 :style="getStyleTheme(themes.themeLight, 'color')">Modules</h1>

      <v-spacer></v-spacer>

      <v-btn
        href=""
        text
        @click="logOut"
      >
        <span class="mr-2">Log out</span>
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <div
      class="mx-auto"
      style="padding: 20px; width: 80%"
      :style="getStyleTheme(themes.themeDark, 'background-color')">
      <v-row
        v-for="(Module) in modules" :key="Module.id">
        <v-col
          cols="12"
          md="12">
          <v-card
            class="mx-auto"
            style="padding: 20px; margin-top: 20px"
            :style="getStyleTheme(themes.themeDark, 'background-color')">
            <h2 :style="getStyleTheme(themes.themeLight, 'color')">Module : {{Module.name}}</h2>
            <v-row>
              <v-col
                v-for="(Session) in getSessionsByModuleId(Module.id)" :key="Session.id"
                cols="3"
                md="3"
                sm="6"
              >
                <v-card
                  :href="'#/module/' + Module.id + '/session/' + Session.id"
                  :style="getStyleTheme(themes.themeDarkLight, 'background-color')"
                >
                  <v-card-title
                    :style="getStyleTheme(themes.themeLight, 'color')"
                  >
                    {{Session.name}}
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div style="padding-top: 20px"/>
  </v-content>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  data: () => ({
  }),
  computed: {
    // States
    ...mapState('themes', ['themes']),
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),

    // Getters
    ...mapGetters('themes', ['getStyleTheme']),
    ...mapGetters('sessions', ['getSessionsByModuleId'])
  },
  async mounted () {
    await this.fetchModules()

    await Promise.all(
      this.modules.map(module_ => {
        this.fetchSessionsForModule({ moduleId: module_.id })
      })
    )

    console.log(this.modules)
  },
  methods: {
    // Actions
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('sessions', ['fetchSessionsForModule']),

    logOut () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
