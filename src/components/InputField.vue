<template>
  <div class="input-group">
    <label :for="inputId">{{ label }}</label>
    <input
      :type="type"
      v-model="localValue"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :id="inputId"
      :title="label"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    type: String,
    placeholder: String,
    min: Number,
    max: Number,
    inputId: String, // ユニークIDを受け取るプロップ
    modelValue: [String, Number],
  },
  computed: {
    localValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style scoped>
.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.input-group label {
  flex: 1;
  font-weight: bold;
  margin-right: 10px;
  white-space: nowrap;
  text-align: left;
}

.input-group input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>