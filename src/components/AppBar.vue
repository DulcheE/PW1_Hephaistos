<template>

    <v-app-bar
      app
      clipped-left
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

      <v-label>
        <h1
          class="d-none d-md-flex"
          :style="'color: ' + themes.Light"
        >
          {{title}}
        </h1>
        <h1
          :style="'color: ' + themes.Light"
          style="font-size: 1em"
          class="d-sm-flex d-md-none"
        >
          {{(title_sm != null) ? title_sm : title}}
        </h1>
      </v-label>

      <v-spacer></v-spacer>

      <div class="d-flex align-center" style="width: 120px">
        <v-switch v-model="switchRole" :label="`${userCustom.role}`"></v-switch>
      </div>
      <v-btn
        text
        @click="logOut()"
      >
        <span class="mr-2">Log out</span>
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>

</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: [
    'title',
    'title_sm'
  ],
  data: () => ({
    switchRole: null,
    count: 0
  }),
  computed: {
    // States
    ...mapState('themes', ['themes']),
    ...mapState('userCustom', ['userCustom'])

  },
  mounted () {
    this.switchRole = (this.userCustom.role === 'Professor')
  },

  watch: {
    switchRole: function (newV, oldV) {
      if (this.count === 0) {
        this.count++
      } else {
        this.toggleRole()
      }
    }
  },

  methods: {
    /// Mutations
    ...mapMutations('userCustom', ['toggleRole']),

    logOut () {
      this.$router.push({ name: 'Login' })
    }
  }
}

</script>
