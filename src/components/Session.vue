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

      <h1 :style="getStyleTheme(themes.themeLight, 'color')">{{(Module !== null) ? Module.name : ''}}</h1>

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
      <v-row>
        <v-col md="12">
          <h1 :style="getStyleTheme(themes.themeLight, 'color')">{{Session.name}}</h1>
        </v-col>
      </v-row>
      <v-row
        v-for="(Exercise) in Exercises" :key="Exercise.id">
        <v-col
          cols="3"
          md="3"
          sm="6"
        >
          <v-card
            :style="getStyleTheme(themes.themeDarkLight, 'background-color')"
          >
            <v-card-title
              :style="getStyleTheme(themes.themeLight, 'color')"
            >
              {{Exercise.title}}
            </v-card-title>
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
    sessionId: null,
    Session: null,
    Exercises: null
  }),
  computed: {
    // States
    ...mapState('themes', ['themes']),
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),

    // Getters
    ...mapGetters('themes', ['getStyleTheme']),
    ...mapGetters('sessions', ['getSession'])
  },
  async mounted () {
    this.moduleId = parseInt(this.$route.params.moduleId)
    this.sessionId = parseInt(this.$route.params.sessionId)

    await this.fetchModule({ id: this.moduleId })
    this.Module = this.modules.find(module_ => module_.id === this.moduleId)

    if (this.Module === undefined) {
      this.$router.push({ name: 'Modules' })
    }

    await this.fetchSessionsForModule({ moduleId: this.moduleId })

    this.Session = this.sessions.find(session => session.id === this.sessionId)

    await this.fetchExercisesForSession({ sessionId: this.Session.id })

    this.Exercises = this.exercises.filter(exercice => exercice.sessionId === this.Session.id)
  },
  methods: {
    // Actions
    ...mapActions('modules', ['fetchModule']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession']),

    logOut () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
