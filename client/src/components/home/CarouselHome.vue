<template>
  <v-carousel>
    <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          src: 'https://goo.gl/L1KBcU'
        },
        {
          src: 'https://goo.gl/saHDN1'
        },
        {
          src: 'https://goo.gl/U69FAj'
        },
        {
          src: 'https://goo.gl/S9Phge'
        }
      ]
    }
  }
}
</script>

<style>

</style>
