<template>
  <div v-if="show" class="menu-overlay" role="dialog" aria-modal="true">
    <button class="close-btn" @click="$emit('close')" aria-label="Close menu">×</button>
    <nav class="menu-content">
      <ul>
        <li>
          <InfoPanel />
        </li>
        <li>
          <About />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import InfoPanel from "./InfoPanel.vue";
import About from "./About.vue";

export default {
  props: {
    show: Boolean,
  },
  components: {
    InfoPanel,
    About,
  },
};
</script>

<style scoped>
.menu-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 400px;
  height: 100vh;
  background: white;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 3em;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #007bff;
  user-select: none;
}

.menu-content {
  margin-top: 60px;
  font-size: 1.3em;
  color: #333;
}

.menu-content ul {
  list-style: none;
  padding-left: 0;
}

.menu-content li {
  padding: 12px 0;
  border-bottom: 1px solid #ccc;
}
</style>
