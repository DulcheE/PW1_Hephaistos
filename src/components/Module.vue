<template>
  <div
    :style="getStyleTheme(themes.Base, 'background-color')"
    style="height: 100%; padding-top: 30px">
    <v-app-bar
      app
      dark
    >
      <a class="d-flex align-center"
          :href="'#/modules'"
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
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="@/assets/hephaistos_name_logo.png"
          width="150"
        />
      </a>

      <v-spacer></v-spacer>

      <h1 :style="getStyleTheme(themes.Light, 'color')">{{module.name}}</h1>

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
        v-for="(Session) in getSessionsByModuleId(moduleId)" :key="Session.id">
        <v-col
          md="12">
          <v-card
            class="mx-auto"
            elevation="8"
            style="padding: 20px; margin-top: 20px"
            :style="getStyleTheme(themes.Dark, 'background-color')">
            <h2 :style="getStyleTheme(themes.Light, 'color')">Session : {{Session.name}}</h2>

            <v-divider/>

            <v-row>
              <v-col
                v-for="(Exercise) in getExercisesBySessionId(Session.id)" :key="Exercise.id"
                cols="3"
                md="3"
                sm="6"
              >
                <v-card
                  @click="goToExercise(Session.id, Exercise.id)"
                  :style="getStyleTheme(themes.DarkLight, 'background-color')"
                >
                  <v-row
                    dense
                  >
                    <v-col sm="9">
                      <v-card-title
                        class="text-truncate"
                        style="font-size: 15px"
                        :style="getStyleTheme(themes.Light, 'color')"
                      >
                        {{Exercise.title}}
                      </v-card-title>
                      <v-card-subtitle
                        class="text-truncate"
                        :style="getStyleTheme(themes.Light, 'color')"
                      >
                        {{Exercise.lang}}
                      </v-card-subtitle>
                    </v-col>
                    <v-col sm="3">
                      <div
                        :style="getStyleTheme(themes.Light, 'color')"
                        style="float: right; margin-right: 15px; margin-top: 15px"
                      >
                        {{(Exercise.test_names != null) ? Exercise.test_names.length : '0'}}<v-icon style="margin-left: 2px" :color="themes.Light">mdi-thermostat-box</v-icon>
                      </div>
                    </v-col>
                  </v-row>
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
    ...mapGetters('exercises', ['getExercisesBySessionId']),

    // Customs
    moduleId () {
      return parseInt(this.$route.params.moduleId)
    },
    module () {
      return this.modules.find(module => module.id === this.moduleId) || { name: 'Loading...' }
    }
  },
  async mounted () {
    await this.fetchModule({ id: this.moduleId })

    if (this.module === null) {
      this.$router.push({ name: 'Modules' })
    }

    await Promise.all(
      this.modules.map(module_ => {
        return this.fetchSessionsForModule({ moduleId: module_.id })
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
    ...mapActions('modules', ['fetchModule']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession']),

    logOut () {
      this.$router.push({ name: 'Login' })
    },

    goToExercise (sessionId, exerciseId) {
      this.$router.push({ name: 'Exercise', params: { moduleId: this.moduleId, sessionId, exerciseId } })
    }
  }
}
</script>
