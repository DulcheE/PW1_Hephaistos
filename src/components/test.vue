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

      <h1 :style="getStyleTheme(themes.Light, 'color')">{{(getModuleById(moduleId) != null) ? this.getModuleById(moduleId).name : ''}}</h1>

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
      absolute
      permanent
    >
      <div
        style="padding: 5px; min-height: 100%"
        :style="getStyleTheme(themes.Dark, 'background-color')">

        <h1 :style="getStyleTheme(themes.Light, 'color')" style="height: 5%; margin-top: 5px; padding-left: 5%">{{(getSessionById(sessionId) != null) ? getSessionById(sessionId).name : ''}}</h1>

        <v-list style="overflow-y: auto; padding: 0px 5px 0px 0px">
          <v-list-item
            v-for="(Exercise) in getExercisesBySessionId(sessionId)" :key="Exercise.id"
            @click="changeExercise(Exercise.id)"
          >
            <v-list-item-content
              class="text-truncate"
              style="font-size: 17px"
              :style="getStyleTheme(themes.Light, 'color')"
            >
              <span>{{Exercise.title}}</span>
            </v-list-item-content>
            <v-list-item-icon
              :style="'color: ' + themes.Light">
              {{(Exercise.test_names != null) ? Exercise.test_names.length : '0'}}<v-icon :color="themes.Light">mdi-thermostat-box</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <div style="margin-left: 16rem; overflow: auto">
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
                  class="mx-auto"
                  style="padding-left: 20px"
                  :style="'background-color: ' + themes.Dark + '; padding-top: ' + ((instructionHidden) ? '0px' : '20px') + '; padding-rigth: ' + ((instructionHidden) ? '0px' : '20px') + '; padding-bottom: ' + ((instructionHidden) ? '0px' : '20px')">
                  <div class="d-flex align-center">
                    <v-btn icon style="display: inline-block"
                      @click="toggleInstructionHidden"
                    >
                      <v-icon :color="themes.Light">{{(instructionHidden) ? 'mdi-eye-off' : 'mdi-eye'}}</v-icon>
                    </v-btn>
                    <h2 :style="getStyleTheme(themes.Light, 'color')" style="padding-left: 2%; display: inline-block">{{(exercise != null) ? exercise.title : ''}} :</h2>
                  </div>
                  <div
                    :style="getStyleTheme(themes.Light, 'color')"
                    style="padding: 1rem 1rem 0 1rem"
                    :hidden="instructionHidden"
                  >
                    <div
                      v-html="((exercise != null) ? exercise.instructions : '')"
                    />
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="6"
                md="6">
                <v-card
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

                  <div class="custom-ace-editor" ref="editorSolution">

                  </div>

                </v-card>
              </v-col>
              <v-col
                cols="6"
                md="6">
                <v-card
                  class="mx-auto"
                  style="padding: 20px;"
                  :style="getStyleTheme(themes.Dark, 'background-color')">
                  <h2 :style="getStyleTheme(themes.Light, 'color')" style="padding-left: 5%">Tests :</h2>
                  <div
                    style="padding: 15px; overflow-x: auto; height: 65vh"
                    :style="getStyleTheme(themes.Light, 'color')">

                    <div v-if="(exerciseId != null) && (exercise != null)">
                      <div v-for="(result, index) in exercise.test_names" :key="result.name">

                        <v-card
                          v-if="(result.failure != undefined) && (!result.failure)"
                          :color="themes.Success"
                          dark
                          style="margin: 10px 0px 0px 0px;"
                          >
                          <v-row>
                            <v-col md="1" class="d-flex align-center" style="max-width: 20px">
                              <v-icon style="padding-left: 15px">mdi-check</v-icon>
                            </v-col>
                            <v-col md="11">
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-subtitle>{{result.file}} - {{result.name}} - {{result.time}}ms</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                            </v-col>
                          </v-row>
                        </v-card>

                        <v-card
                          v-else-if="result.failure"
                          :color="themes.Failure"
                          dark
                          style="margin: 10px 0px 0px 0px;"
                          >
                          <v-row>
                            <v-col md="1" class="d-flex align-center" style="max-width: 40px">
                              <v-icon style="padding-left: 15px">mdi-alert-circle</v-icon>
                            </v-col>
                            <v-col md="10">
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-content>{{result.failure.message}}</v-list-item-content>
                                  <code v-if="!result.stacktraceHidden" style="font-size: 12px; padding: 5px">{{result.failure.stacktrace}}</code>
                                  <v-list-item-subtitle>{{result.file}} - {{result.name}} - {{result.time}}ms</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                            </v-col>

                            <v-col md="1" style="max-width: 40px">
                              <v-btn
                                icon
                                @click="closeResult(index)"
                              >
                                <v-icon>mdi-close-circle</v-icon>
                              </v-btn>
                              <v-btn
                                icon
                                v-if="result.stacktraceHidden"
                                @click="result.stacktraceHidden = false"
                              >
                                <v-icon>mdi-chevron-down</v-icon>
                              </v-btn>
                              <v-btn
                                icon
                                v-if="!result.stacktraceHidden"
                                @click="result.stacktraceHidden = true"
                              >
                                <v-icon>mdi-chevron-up</v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-card>

                        <v-card
                          v-else
                          :color="themes.DarkLight"
                          dark
                          style="margin: 10px 0px 0px 0px;"
                          >
                          <v-row>
                            <v-col md="1" class="d-flex align-center" style="max-width: 20px">
                              <v-icon style="padding-left: 15px">mdi-alert-circle</v-icon>
                            </v-col>
                            <v-col md="11" style="padding-left: 25px">
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-subtitle>{{result}}</v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                            </v-col>
                          </v-row>
                        </v-card>

                      </div>
                    </div>

                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
            </v-row>

          </v-col>
        </v-row>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/webpack-resolver'
import testsPy from '@/assets/tests.txt'

export default {

  data: () => ({
    instructionHidden: false,
    moduleId: 1,
    sessionId: 2,
    exerciseId: null,
    exercise: null,
    lang: 'python',
    resultTest: [],
    editorSolution: null
  }),
  computed: {
    // States
    ...mapState('themes', ['themes']),
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),

    // Getters
    ...mapGetters('themes', ['getStyleTheme']),
    ...mapGetters('modules', ['getModuleById']),
    ...mapGetters('sessions', ['getSessionById']),
    ...mapGetters('exercises', ['getExerciseById']),
    ...mapGetters('exercises', ['getExercisesBySessionId'])
  },
  async mounted () {
    this.exerciseId = parseInt(this.$route.params.exerciseId)

    await this.fetchModule({ id: this.moduleId })

    if (this.getModuleById(this.moduleId) === undefined) {
      this.$router.push({ name: 'Modules' })
    }

    await this.fetchSession({ id: this.sessionId })

    if (this.getSessionById(this.sessionId) === undefined) {
      this.$router.push({ name: 'Module', params: { moduleId: this.moduleId } })
    }

    await this.fetchExercisesForSession({ sessionId: this.sessionId })

    if (!!this.exerciseId === true) {
      console.log('not null')
      console.log(!!this.exerciseId)
      this.exercise = this.getExerciseById(this.exerciseId)
    } else {
      console.log('null')
      this.exercise = this.getExercisesBySessionId(this.sessionId)[0]
    }

    this.changeExercise(this.exercise.id)
  },
  methods: {
    // Actions
    ...mapActions('modules', ['fetchModule']),
    ...mapActions('sessions', ['fetchSession']),
    ...mapActions('exercises', ['fetchExerciseForSession']),
    ...mapActions('exercises', ['fetchExercisesForSession']),

    logOut () {
      this.$router.push({ name: 'Login' })
    },

    async changeExercise (exerciseId) {
      await this.fetchExerciseForSession({ sessionId: this.sessionId, exerciseId })
      this.exercise = this.getExerciseById(exerciseId)

      this.instructionHidden = false

      this.editorSolution = ace.edit(this.$refs.editorSolution)
      this.initEditor(this.editorSolution, this.exercise.lang, 'print("This is a solution for ' + this.exercise.title + '")')
    },

    toggleInstructionHidden () {
      this.instructionHidden = !this.instructionHidden
    },

    initEditor (editor, lang, defaultValue) {
      editor.setTheme('ace/theme/monokai') // Global theme for
      editor.session.setMode(`ace/mode/${lang}`)

      editor.selection.addRange()

      editor.setOptions({
        selectionStyle: 'line',
        cursorStyle: 'ace'
      })

      editor.resize() // Ensure the editor is the right size

      // React to changes and update the v-model
      editor.on('change', () => {
        this.$emit('input', editor.getValue())
      })

      editor.setValue(defaultValue)
    },

    runSolution () {
      console.log('running sandbox...')

      this.tests = testsPy
      this.editorTests.setValue(this.tests)
      this.solution = this.editorSandbox.getValue()

      this.axios.post('http://localhost:3000/api/v1/exercise/sandbox', {
        lang: this.lang,
        tests: this.tests,
        solution: this.solution
      })
        .then((response) => {
          console.log(response.data.result.stats.tests + ' tests run in ' + response.data.result.stats.time)
          this.openRunDialog(response.data.result.stats.tests + ' tests run in ' + response.data.result.stats.time)

          this.consoleOutput = response.data.stdout
          this.resultTest.length = 0

          response.data.result.tests.forEach((result) => {
            result.stacktraceHidden = true
            this.resultTest.push(result)
          })
        })
        .catch((err) => {
          console.log(err)
          console.log(err.response)
        })
    }
  }
}
</script>

<style scoped>
.custom-ace-editor {
  position: relative;
  height: 65vh;
}
</style>
