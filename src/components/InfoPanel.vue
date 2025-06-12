<template>
    <div class="info-panel">
        <h2>INFORMATION</h2>
        <ul>
        <li v-for="(info, index) in infos" :key="index" class="info-item">
            <div class="date">{{ info.date }}</div>
            <div class="text">{{ info.text }}</div>
        </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "InfoPanel",
  props: {
    infos: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.info-panel {
  width: 1000px;
  max-height: 250px; /* 約3件分表示の高さ */
  overflow-y: auto;
  background-color: #f0f8ff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px 16px;
  font-family: Arial, sans-serif;
}

.info-panel h2 {
  margin: 0 0 12px;
  font-size: 1.2em;
  color: #007bff;
  text-align: center;
  border-bottom: 1px solid #007bff;
  padding-bottom: 4px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-item {
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #ccc;
}

.info-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}


.date {
  font-size: 0.85em;
  color: #555;
  margin-bottom: 4px;
}

.text {
  font-size: 0.95em;
  color: #333;
  white-space: pre-line; /* 改行も反映 */
}
</style>
