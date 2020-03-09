<template>
  <v-content
    :style="getStyleTheme(themes.Base, 'background-color')"
    style="height: 100%">
    <v-app-bar
      app
      dark
    >
      <a class="d-flex align-center"
          :href="'#/modules'"
      >
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
      </a>

      <v-spacer></v-spacer>

      <h1 :style="getStyleTheme(themes.Light, 'color')">{{(Module !== null) ? Module.name : ''}}</h1>

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
            style="padding: 20px; margin-top: 20px"
            :style="getStyleTheme(themes.Dark, 'background-color')">
            <h2 :style="getStyleTheme(themes.Light, 'color')">Session : {{Session.name}}</h2>
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
                        :style="getStyleTheme(themes.Light, 'color')"
                      >
                        {{Exercise.title}}
                      </v-card-title>
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
  </v-content>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  data: () => ({
    moduleId: null,
    Module: null,
    Sessions: null
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
    this.moduleId = parseInt(this.$route.params.moduleId)

    console.log('begin')

    await this.fetchModule({ id: this.moduleId })
    this.Module = this.modules.find(module_ => module_.id === this.moduleId)

    console.log('after module')

    if (this.Module === undefined) {
      this.$router.push({ name: 'Modules' })
    }

    await Promise.all(
      this.modules.map(module_ => {
        return this.fetchSessionsForModule({ moduleId: module_.id })
      })
    )
    console.log(this.sessions)
    console.log(this.sessions.length)

    await Promise.all(
      this.sessions.map(session => {
        console.log('fetching exercises for session : ' + session.name + ' | ' + session.id)
        return this.fetchExercisesForSession({ sessionId: session.id })
      })
    )
    console.log(this.exercises)
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
      this.$router.push({ name: 'Session', params: { moduleId: this.moduleId, sessionId, exerciseId } })
    }
  }
}
</script>
