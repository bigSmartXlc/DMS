
<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to, query)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    },
    query: {
      type: Object,
      required: false,
      default: function () { return {} }
    }
  },
  methods: {
    linkProps(url, query) {
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      if (query && JSON.stringify(query) !== '{}') {
        return {
          is: 'router-link',
          to: { path: url, query: query }
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
