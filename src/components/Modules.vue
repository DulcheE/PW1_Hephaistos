<template>
  <div
    :style="getStyleTheme(themes.Base, 'background-color')"
    style="height: 100%; padding-top: 30px">
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
        v-for="(Module) in modules" :key="Module.id">
        <v-col
          md="12">
          <v-card
            class="mx-auto"
            elevation="8"
            style="padding: 20px; margin-top: 20px"
            :style="getStyleTheme(themes.Dark, 'background-color')">
            <v-btn text :href="'#/module/' + Module.id">
              <h2 :style="getStyleTheme(themes.Light, 'color')">Module : {{Module.name}}</h2>
            </v-btn>
            <v-row>
              <v-col
                v-for="(Session) in getSessionsByModuleId(Module.id)" :key="Session.id"
                cols="3"
                md="3"
                sm="6"
              >
                <v-card
                  :href="'#/module/' + Module.id + '/session/' + Session.id"
                  :style="getStyleTheme(themes.DarkLight, 'background-color')"
                >
                  <v-row
                    dense
                  >
                    <v-col sm="9">
                      <v-card-title
                        class="text-truncate"
                        style="font-size: 17px"
                        :style="getStyleTheme(themes.Light, 'color')"
                      >
                        {{Session.name}}
                      </v-card-title>
                    </v-col>
                    <v-col sm="3">
                      <div
                        :style="getStyleTheme(themes.Light, 'color')"
                        style="float: right; margin-right: 15px; margin-top: 15px"
                      >
                        {{getExercisesBySessionId(Session.id).length}}<v-icon style="margin-left: 2px" :color="themes.Light">mdi-code-braces-box</v-icon>
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
    ...mapGetters('exercises', ['getExercisesBySessionId'])
  },
  async mounted () {
    await this.fetchModules()
    console.log(this.modules)
    console.log(this.modules.length)

    await Promise.all(
      this.modules.map(module => {
        return this.fetchSessionsForModule({ moduleId: module.id })
      })
    )
    console.log(this.sessions)
    console.log(this.sessions.length)

    await Promise.all(
      this.sessions.map(session => {
        console.log('fetching exercises for session : ' + session.name + ' (' + session.id + ')')
        return this.fetchExercisesForSession({ sessionId: session.id })
      })
    )
    console.log(this.exercises)
  },
  methods: {
    // Actions
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession']),

    logOut () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
