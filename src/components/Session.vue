<template>
  <v-content
    :style="getStyleTheme(themes.Base, 'background-color')"
    style="min-height: 100%;">
    <v-app-bar
      app
      dark
    >
        <v-btn
          :href="'#/modules'"
          text
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
        </v-btn>

      <v-spacer></v-spacer>

      <h1 :style="getStyleTheme(themes.Light, 'color')">{{(Module !== null) ? Module.name : ''}}</h1>

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
      style="padding: 20px; width: 95%; height: 49rem">
      <v-row style="height: 100%;"
        no-gutters>
        <v-col md="3" sm="12" style="height: 100%"
        >
          <div style="height: 100%; margin-right: 10%; padding: 20px"
          :style="getStyleTheme(themes.Dark, 'background-color')">
            <v-row style="height: 10%">
              <v-col md="12">
                <h1 :style="getStyleTheme(themes.Light, 'color')" style="padding-left: 5%">{{(Session != null) ? Session.name : ''}}</h1>
              </v-col>
            </v-row>

            <div style="height: 90%; overflow-x: hidden; overflow-y: auto">
              <v-row
                v-for="(Exercise) in Exercises" :key="Exercise.id">
                <v-col md="12">
                  <v-card
                    :style="getStyleTheme(themes.DarkLight, 'background-color')"
                  >
                    <v-card-title
                      :style="getStyleTheme(themes.Light, 'color')"
                    >
                      {{Exercise.title}}
                    </v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
        <v-col md="9" sm="12" style="height: 100%; padding: 20px"
          :style="getStyleTheme(themes.Dark, 'background-color')">

          <v-row style="height: 100%"
          >
            <v-col
              cols="6"
              md="6">
              <v-card
                class="mx-auto"
                style="padding: 20px; margin-top: 20px"
                :style="getStyleTheme(themes.Dark, 'background-color')">
                <h2 :style="getStyleTheme(themes.Light, 'color')" style="padding-left: 5%">Instructions :</h2>
                <p :style="getStyleTheme(themes.Light, 'color')">test test test</p>
              </v-card>

              <v-card
                class="mx-auto"
                style="padding: 20px; margin-top: 20px"
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
                style="padding: 20px; margin-top: 20px; height: 100%"
                :style="getStyleTheme(themes.Dark, 'background-color')">
                <h2 :style="getStyleTheme(themes.Light, 'color')" style="padding-left: 5%">Test results :</h2>
                <div
                  style="padding: 15px; overflow: auto"
                  :style="getStyleTheme(themes.Light, 'color')">

                  <div v-for="(result, index) in resultTest" :key="result.name">

                    <v-card
                      v-if="!result.failure"
                      :color="themes.Success"
                      dark
                      style="margin: 10px 0px 0px 0px;"
                      >
                      <v-row>
                        <v-col md="1" class="d-flex align-center" style="max-width: 40px">
                          <v-icon style="padding-left: 15px">mdi-check</v-icon>
                        </v-col>
                        <v-col md="10">
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-subtitle>{{result.file}} - {{result.name}} - {{result.time}}ms</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>

                        <v-col md="1" style="max-width: 30px">
                          <v-btn
                            icon
                            @click="closeResult(index)"
                          >
                            <v-icon>mdi-close-circle</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-card
                      v-if="result.failure"
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
    <div style="padding-top: 20px"/>
  </v-content>
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
    moduleId: null,
    Module: null,
    sessionId: null,
    Session: null,
    Exercises: null,
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
    ...mapGetters('sessions', ['getSession'])
  },
  async mounted () {
    this.editorSolution = ace.edit(this.$refs.editorSolution)
    this.initEditor(this.editorSolution, 'print("This is a solution")')

    this.moduleId = parseInt(this.$route.params.moduleId)
    this.sessionId = parseInt(this.$route.params.sessionId)

    await this.fetchModule({ id: this.moduleId })
    this.Module = this.modules.find(module_ => module_.id === this.moduleId)

    if (this.Module === undefined) {
      this.$router.push({ name: 'Modules' })
    }

    await this.fetchSession({ id: this.sessionId })

    this.Session = this.sessions.find(session => session.id === this.sessionId)

    await this.fetchExercisesForSession({ sessionId: this.Session.id })

    this.Exercises = this.exercises.filter(exercice => exercice.sessionId === this.Session.id)
  },
  methods: {
    // Actions
    ...mapActions('modules', ['fetchModule']),
    ...mapActions('sessions', ['fetchSession']),
    ...mapActions('exercises', ['fetchExercisesForSession']),

    logOut () {
      this.$router.push({ name: 'Login' })
    },

    initEditor (editor, defaultValue) {
      editor.setTheme('ace/theme/monokai') // Global theme for
      editor.session.setMode(`ace/mode/${this.lang}`)

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
  height: 26rem;
  margin-bottom: 30px;
}
</style>
