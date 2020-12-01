<template>
  <div
    style="padding: 0 15px;"
    @click="toggleClick"
  >
    <span class="svg-container">
      <svg-icon
        class="Hamburger"
        :class="{'is-active':isActive}"
        icon-class="hengshuqiehuanshu"
      />
    </span>
  </div>

</template>

<script>
export default {
  name: "Hamburger",
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit("toggleClick");
    }
  }
};
</script>

<style scoped>
.Hamburger {
  font-size: 22px;
  font-weight: 400;
  transform: rotate(90deg);
  color: #fff;
  cursor: pointer;
}

.Hamburger.is-active {
  line-height: 26px;
  transform: rotate(360deg);
}
</style>
