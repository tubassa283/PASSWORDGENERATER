<template>
  <div class="password-list">
    <h2>-----Generated Passwords-----</h2>

    <div class="button-container">
      <button @click="$emit('download')" class="btn btn-secondary">
        Download CSV
      </button>
      <button @click="$emit('clear')" class="btn btn-danger">
        Clear Passwords
      </button>
    </div>

    <!-- 一括コピー用のボタン -->
    <div class="full-width-button-container">
      <button @click="copyAllPasswords" class="btn btn-secondary full-width-button">
        Copy All
      </button>
    </div>

    <p v-if="copyMessage" class="copy-message">{{ copyMessage }}</p>

    <div class="password-grid" :class="'cols-' + Math.min(passwords.length, 4)">
      <div
        v-for="(password, index) in passwords"
        :key="index"
        @click="copyToClipboard(password)"
        class="password-item"
        title="Click to copy"
      >
        {{ password }}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    passwords: Array,
  },
  data() {
    return {
      copyMessage: "", // コピー成功時のメッセージ
    };
  },
  methods: {
    async copyToClipboard(password) {
      try {
        await navigator.clipboard.writeText(password);
        this.copyMessage = `"${password}" copied to clipboard!`;
        setTimeout(() => {
          this.copyMessage = "";
        }, 2000);
      } catch (err) {
        alert("Failed to copy!");
      }
    },
    async copyAllPasswords() {
      try {
        const all = this.passwords.join('\n');
        await navigator.clipboard.writeText(all);
        this.copyMessage = "All passwords copied to clipboard!";
        setTimeout(() => {
          this.copyMessage = "";
        }, 2000);
      } catch (err) {
        alert("Failed to copy all!");
      }
    },
  },
};
</script>

<style scoped>
.password-list {
  margin-top: 20px;
  text-align: center;
  max-width: 600px;  /* 親の幅を固定 */
  margin-left: auto;
  margin-right: auto;
}

.password-list h2 {
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

/* 一括コピー用のボタン */
.full-width-button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.full-width-button {
  width: calc(160px * 2 + 10px); /* 既存ボタン2個分＋gap相当 */
  padding: 10px 20px;
}

.password-grid {
  display: grid;
  gap: 16px; /* ここを広げて余白を増やす */
  justify-content: center;
  margin: 0 auto;
  width: 100%;  /* 親幅にフィット */
  box-sizing: border-box;
}

/* 列数に応じて柔軟に広がる */
.cols-1 {
  grid-template-columns: repeat(1, 1fr);
}
.cols-2 {
  grid-template-columns: repeat(2, 1fr);
}
.cols-3 {
  grid-template-columns: repeat(3, 1fr);
}
.cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

.password-item {
  background: #f1f1f1;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: center;
  word-break: break-word; /* 折り返し対応 */
  width: 100%; /* グリッドアイテム内で幅いっぱい */
  box-sizing: border-box;
}

.password-item:hover {
  background-color: #d0eaff;
}

.copy-message {
  color: rgb(0, 92, 128);
  margin-top: 10px;
  font-weight: bold;
}

.btn-secondary {
  background: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-danger {
  background: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary:hover,
.btn-danger:hover {
  opacity: 0.8;
}
</style>
