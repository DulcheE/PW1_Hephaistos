<template>
  <div
    :style="getStyleTheme(themes.Base, 'background-color')"
    style="height: 100%; padding-top: 30px">
    <v-app-bar
      app
      dark
    >
      <div class="d-flex align-center"
      >
        <v-img
          alt="Hephaistos Logo"
          class="shrink mr-2"
          contain
          src="@/assets/hephaistos_logo.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Hephaistos Name"
          class="shrink mt-1 d-none d-md-flex"
          contain
          src="@/assets/hephaistos_name_logo.png"
          transition="fade-transition"
          width="150"
        />

        <v-img
          alt="Hephaistos Name"
          class="shrink mt-1 d-none d-sm-flex d-md-none"
          contain
          src="@/assets/hephaistos_name_logo.png"
          transition="fade-transition"
          width="75"
        />
      </div>

      <v-spacer></v-spacer>

      <h1 :style="getStyleTheme(themes.Light, 'color')">Modules</h1>

      <v-spacer></v-spacer>

      <v-btn
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
      :style="getStyleTheme(themes.Dark, 'background-color')">
      <v-row
        v-for="(module) in modules" :key="module.id">
        <v-col
          md="12">
          <v-card
            class="mx-auto"
            elevation="8"
            style="padding: 20px; margin-top: 20px"
            :style="getStyleTheme(themes.Dark, 'background-color')">
            <v-btn text :href="'#/module/' + module.id">
              <h2 :style="getStyleTheme(themes.Light, 'color')">Module : {{module.name}}</h2>
            </v-btn>

            <v-divider/>

            <v-row>
              <v-col
                cols="12" sm="6" md="3"
                v-for="(session) in getSessionsByModuleId(module.id)" :key="session.id"
              >
                <v-card
                  :href="'#/module/' + module.id + '/session/' + session.id + '/exercise/' + firstExerciseForSession(session.id).id"
                  :style="getStyleTheme(themes.DarkLight, 'background-color')"
                >
                  <v-list-item
                    style="height: 5em"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        class="text-truncate"
                        style="font-size: 1.5em"
                        :style="getStyleTheme(themes.Light, 'color')"
                      >
                        {{session.name}}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon :style="'color: ' + themes.Light">
                      {{getExercisesBySessionId(session.id).length}}<v-icon style="margin-left: 2px" :color="themes.Light">mdi-code-braces-box</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div style="padding-top: 20px"/>
  </div>
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
    ...mapState('exercises', ['exercises']),

    // Getters
    ...mapGetters('themes', ['getStyleTheme']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExercisesBySessionId'])
  },
  async mounted () {
    await this.fetchModules()

    await Promise.all(
      this.modules.map(module => {
        return this.fetchSessionsForModule({ moduleId: module.id })
      })
    )

    await Promise.all(
      this.sessions.map(session => {
        return this.fetchExercisesForSession({ sessionId: session.id })
      })
    )
  },
  methods: {
    // Actions
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession']),

    logOut () {
      this.$router.push({ name: 'Login' })
    },

    firstExerciseForSession (sessionId) {
      return this.getExercisesBySessionId(sessionId)[0] || { title: 'loading' }
    }
  }
}
</script>
