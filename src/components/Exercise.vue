<template>
  <div
    style="min-height: 100%; overflow: auto"
    :style="getStyleTheme(themes.Base, 'background-color')"
  >
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
      </a>

      <v-spacer></v-spacer>

      <h1
        :style="getStyleTheme(themes.Light, 'color')"
        class="d-none d-md-flex"
      >
        {{module.name}}
      </h1>
      <h1
        :style="getStyleTheme(themes.Light, 'color')"
        style="font-size: 1em"
        class="d-sm-flex d-md-none"
      >
        {{module.name}}
      </h1>

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

    <v-navigation-drawer
      class="d-none d-md-flex"
      absolute
      permanent
    >
      <div
        style="padding: 5px; min-height: 100%"
        :style="getStyleTheme(themes.Dark, 'background-color')">

        <div class="d-flex align-center">
          <v-btn
            icon
            :color="themes.Light"
            class="d-inline-block"
            @click="$router.push({ name: 'Module', params: { moduleId } })"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <h1
            class="d-inline-block"
            :style="getStyleTheme(themes.Light, 'color')"
            style="height: 5%; margin-top: 5px; padding-left: 5%"
          >
            {{(getSessionById(sessionId) != null) ? getSessionById(sessionId).name : ''}}
          </h1>
        </div>

        <v-divider/>

        <v-list
          style="padding: 0px 5px 0px 0px;">
          <v-list-item
            v-for="(exercise) in getExercisesBySessionId(sessionId)" :key="exercise.id"
            two-line
            @click="goToExercise(exercise.id)"
            :style="(exercise.valid != null) ? 'background-color: ' + themes.Success : ''"
          >
            <v-list-item-content>
              <v-list-item-title
                class="text-truncate"
                :style="getStyleTheme(themes.Light, 'color')"
              >
                <span>{{exercise.title}}</span>
              </v-list-item-title>
              <v-list-item-subtitle
                class="text-truncate"
                :style="getStyleTheme(themes.Light, 'color')"
              >
                <span>{{exercise.lang}}</span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon
              :style="'color: ' + themes.Light"
            >
              {{(exercise.test_names != null) ? exercise.test_names.length : '0'}}<v-icon :color="themes.Light">mdi-thermostat-box</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <div>
      <div class="d-none" style="margin-left: 16rem"/>
      <div style="margin-left: 16rem">
        <div
          class="mx-auto"
          style="padding: 20px; width: 90%;"
        >
          <v-row>
            <v-col md="12" sm="12" style="padding: 20px;"
              :style="getStyleTheme(themes.Dark, 'background-color')">
              <v-row>
                <v-col sm="12">
                  <v-card
                    elevation="4"
                    class="mx-auto"
                    style="padding-left: 20px; padding-right: 20px"
                    :style="'background-color: ' + themes.Dark + '; padding-top: ' + ((instructionHidden) ? '0px' : '20px') + '; padding-rigth: ' + ((instructionHidden) ? '0px' : '20px') + '; padding-bottom: ' + ((instructionHidden) ? '0px' : '20px')">
                    <div class="d-flex align-center">
                      <v-btn icon style="display: inline-block"
                        @click="toggleInstructionHidden"
                      >
                        <v-icon :color="themes.Light">{{(instructionHidden) ? 'mdi-eye-off' : 'mdi-eye'}}</v-icon>
                      </v-btn>
                      <h2 :style="getStyleTheme(themes.Light, 'color')" style="padding-left: 2%; display: inline-block">{{exercise.title || "loading..."}} : </h2>
                    </div>
                    <v-divider :hidden="instructionHidden"/>
                    <div
                      :style="getStyleTheme(themes.Light, 'color')"
                      style="padding: 1rem 1rem 0 1rem"
                      :hidden="instructionHidden"
                    >
                      <v-skeleton-loader
                        :loading="exercise.instructions == null"
                        transition="scale-transition"
                        class="mx-auto"
                        type="paragraph"
                        dark
                      >
                        <div>
                          <div
                            v-html="exercise.instructions"
                          />
                        </div>
                      </v-skeleton-loader>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="6"
                  md="6">
                  <v-card
                    elevation="4"
                    class="mx-auto"
                    style="padding: 20px"
                    :style="getStyleTheme(themes.Dark, 'background-color')">
                    <div class="d-flex align-center">
                      <h2 :style="getStyleTheme(themes.Light, 'color')" style="padding-left: 5%">Solution :</h2>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="success"
                        class="mb-2"
                        tile
                        small
                        @click="runSolution"
                      >
                        Run
                        <v-icon>mdi-play</v-icon>
                      </v-btn>
                    </div>

                    <CodeEditor
                      ref="editorSolution"
                      :lang="exercise.lang"
                      :defaultValue="(lastAttempt != null) ? lastAttempt.solution : 'loading...'"
                    />

                  </v-card>
                </v-col>
                <v-col
                  cols="6"
                  md="6">
                  <TestsResult
                    :testsName="(!exercise.loading) ? exercise.test_names : { loading: true }"
                    :testsResult="lastAttemptResults.tests"
                  />
                </v-col>
              </v-row>

            </v-col>
          </v-row>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import CodeEditor from '@/components/CodeEditor.vue'
import TestsResult from '@/components/TestsResult.vue'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    CodeEditor,
    TestsResult
  },
  data: () => ({
    instructionHidden: false,
    lang: 'python',
    editorSolution: null
  }),
  computed: {
    // States
    ...mapState('themes', ['themes']),
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapState('attempts', ['attempts', 'lastAttemptResults']),

    // Getters
    ...mapGetters('themes', ['getStyleTheme']),
    ...mapGetters('modules', ['getModuleById']),
    ...mapGetters('sessions', ['getSessionById']),
    ...mapGetters('exercises', ['getExerciseById', 'getExercisesBySessionId']),
    ...mapGetters('attempts', ['getLastAttemptForExercise']),

    // Customs
    moduleId () {
      return parseInt(this.$route.params.moduleId)
    },
    module () {
      return this.modules.find(module => module.id === this.moduleId) || { name: 'Loading...' }
    },
    sessionId () {
      return parseInt(this.$route.params.sessionId)
    },
    exerciseId () {
      return parseInt(this.$route.params.exerciseId)
    },
    exercise () {
      return this.getExerciseById(this.exerciseId) || { lang: 'python', loading: true }
    },
    lastAttempt () {
      return this.getLastAttemptForExercise(this.exerciseId)
    }
  },

  async mounted () {
    await this.fetchModule({ id: this.moduleId })

    if (this.getModuleById(this.moduleId) === undefined) {
      this.$router.push({ name: 'Modules' })
    }

    await this.fetchSession({ id: this.sessionId })

    if (this.getSessionById(this.sessionId) === undefined) {
      this.$router.push({ name: 'Module', params: { moduleId: this.moduleId } })
    }

    await this.fetchExercisesForSession({ sessionId: this.sessionId })

    this.updateView()
  },

  watch: {
    exerciseId: function (newV, oldV) {
      this.updateView()
      this.instructionHidden = false
    }
  },

  methods: {
    // Actions
    ...mapActions('modules', ['fetchModule']),
    ...mapActions('sessions', ['fetchSession']),
    ...mapActions('exercises', ['fetchExerciseForSession']),
    ...mapActions('exercises', ['fetchExercisesForSession']),
    ...mapActions('attempts', ['fetchLastAttemptForExercise']),
    ...mapActions('attempts', ['createAttemptForSession']),

    async updateView () {
      await this.fetchExerciseForSession({ sessionId: this.sessionId, exerciseId: this.exerciseId })

      await this.fetchLastAttemptForExercise({ sessionId: this.sessionId, exerciseId: this.exerciseId })

      this.editorSolution = this.$refs.editorSolution

      const solutionDefault = (this.lastAttempt != null) ? this.lastAttempt.solution : 'print("This is a solution for ' + this.exercise.title + '")'
      this.editorSolution.updateView(solutionDefault)
    },

    logOut () {
      this.$router.push({ name: 'Login' })
    },

    goToExercise (exerciseId) {
      if (exerciseId !== this.exerciseId) {
        this.$router.push({ name: 'Exercise', params: { moduleId: this.moduleId, sessionId: this.sessionId, exerciseId } })
      }
    },

    toggleInstructionHidden () {
      this.instructionHidden = !this.instructionHidden
    },

    async runSolution () {
      console.log('running solution...')

      const solution = this.editorSolution.editor.getValue()

      await this.createAttemptForSession({ exerciseId: this.exercise.id, sessionId: this.sessionId, solution })

      await this.getLastAttemptForExercise({ exerciseId: this.exerciseId })
    }
  }
}
</script>
