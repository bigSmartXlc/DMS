<template>
  <router-view />
</template>
<script>
import { destoryPageMixins } from '@/components/mixins/destoryPageMixins.js'
export default {
  mixins: [destoryPageMixins]
}
</script>
