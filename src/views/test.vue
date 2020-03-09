<template>
  <testComponent msg="Welcome to Your Vue.js App"/>
</template>

<script>
// @ is an alias to /src
import testComponent from '@/components/test.vue'

export default {
  name: 'test',
  components: {
    testComponent
  }
}
</script>
