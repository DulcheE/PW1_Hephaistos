<template>
  <v-content
    :style="theme">
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

      <div class="d-flex align-center">
        <label
            style:='text-color=white'>
            Exercise :
        </label>
        <v-text-field
            dense
            solo
            flat
            style="margin-left: 5px; margin-top: 25px;"
            v-model="exerciseName">
        </v-text-field>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href=""
        text
        @click="saveExercise"
      >
        <span class="mr-2">Save exercise</span>
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
    </v-app-bar>

    <v-dialog
      v-model="dialogRun"
      hide-overlay
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-title>Run successful</v-card-title>
        <v-card-text>{{dialogRunText}}</v-card-text>
      </v-card>
    </v-dialog>

    <div
      class="mx-auto"
      style="padding: 20px; width: 80%"
      :style="theme1">
      <v-row>
        <v-col cols="12">
          <h1 style="color: #a0a0a0">Exercise : {{exerciseName}}</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="6"
          md="6">
          <v-card
            class="mx-auto"
            style="padding: 20px; margin-top: 20px"
            :style="theme1">
            <h2 style="color: #a0a0a0">Instructions :</h2>
            <v-textarea
              v-model="instructions"
              height="30rem"
              color="#a0a0a0"
              dark
              :background-color="theme2_2"
              solo
              flat
              no-resize/>
          </v-card>
        </v-col>
        <v-col
          cols="6"
          md="6">
          <v-card
            class="mx-auto"
            style="padding: 20px; margin-top: 20px"
            :style="theme1">
            <h2 style="color: #a0a0a0">Test :</h2>

            <div class="custom-ace-editor" ref="editorTests">

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
            style="padding: 20px; margin-top: 20px"
            :style="theme1">
            <h2 style="color: #a0a0a0">Template :</h2>

            <div class="custom-ace-editor" ref="editorTemplate">

            </div>

          </v-card>
        </v-col>
        <v-col
          cols="6"
          md="6">
          <v-card
            class="mx-auto"
            style="padding: 20px; margin-top: 20px"
            :style="theme1">
            <div class="d-flex align-center">
              <h2 style="color: #a0a0a0">Sandbox :</h2>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                class="mb-2"
                tile
                small
                @click="runSandbox"
              >
                Run
                <v-icon>mdi-play</v-icon>
              </v-btn>
            </div>

            <div class="custom-ace-editor" ref="editorSandbox">

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
            style="padding: 20px; margin-top: 20px"
            :style="theme1">
            <h2 style="color: #a0a0a0">Console output :</h2>
            <code
            style="height: 45rem; color: #a0a0a0; padding: 2px; overflow: auto; font-size: 12px; width: 100%"
            :style="theme2"
              color="black"
            >{{consoleOutput}}</code>
          </v-card>
        </v-col>
        <v-col
          cols="6"
          md="6">
          <v-card
            class="mx-auto"
            style="padding: 20px; margin-top: 20px"
            :style="theme1">
            <h2 style="color: #a0a0a0">Test results :</h2>
            <div
              style="height: 45rem; color: #a0a0a0; padding: 15px; overflow: auto">

              <div v-for="(result, index) in resultTest" :key="result.name">

                <v-card
                  v-if="!result.failure"
                  color="#117711"
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
                  color="#771111"
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
                          <code v-if="!result.stacktraceHidden" style="font-size: 12px">{{result.failure.stacktrace}}</code>
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
    </div>
    <div style="padding-top: 20px"/>>
  </v-content>
</template>

<script>
import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/webpack-resolver'
import testsPy from '@/assets/tests.txt'

export default {
  props: ['value'], // Mandatory to allow v-model

  data: () => ({
    theme: 'background-color: #3d3d3d',
    theme1: 'background-color: #232323',
    theme1_2: '#232323',
    theme2: 'background-color: #323232',
    theme2_2: '#323232',
    dialogRun: false,
    dialogRunText: '',
    exerciseName: 'exerciseName',
    instructions: 'This is an instruction',
    lang: 'python',
    tests: 'This is a test',
    solution: 'this is a solution',
    template: 'this is a template',
    template_regions: [],
    template_regions_rw: [],
    sandbox: 'this is a snadbox',
    consoleOutput: '',
    resultTest: [],

    editorTests: null,
    editorTemplate: null,
    editorSandbox: null
  }),
  mounted () {
    this.editorTests = ace.edit(this.$refs.editorTests)
    this.editorTemplate = ace.edit(this.$refs.editorTemplate)
    this.editorSandbox = ace.edit(this.$refs.editorSandbox)

    this.initEditor(this.editorTests, 'print("This is a test")')
    this.initEditor(this.editorTemplate, 'print("This is a template")')
    this.initEditor(this.editorSandbox, 'def negatifs(array): return 5')
  },
  methods: {
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

    saveExercise () {
      console.log('Saving exercise...')

      this.template = this.editorTemplate.getValue()
      this.template_regions = [this.template]
      this.template_regions_rw = [0]
      this.tests = this.editorTests.getValue()

      this.axios.post('http://localhost:3000/api/v1/exercise/2', {
        instructions: this.instructions,
        lang: this.lang,
        title: this.exerciseName,
        tests: this.tests,
        solution: this.solution,
        template_regions: this.template_regions,
        template_regions_rw: this.template_regions_rw,
        difficulty: 1,
        score: 1,
        creation_date: new Date()
      })
        .then((response) => {
          console.log('Exercise successfully saved at id : ' + response.data.id)
        })
        .catch((err) => {
          console.log(err)
          console.log(err.response)
        })
    },

    runSandbox () {
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
    },
    closeResult (index) {
      this.resultTest.splice(index, 1)
    },
    openRunDialog (text) {
      this.dialogRunText = text
      this.dialogRun = true
    }
  }
}
</script>

<style scoped>
.custom-ace-editor {
  position: relative;
  min-height: 30rem;
  margin-bottom: 30px;
}
</style>
