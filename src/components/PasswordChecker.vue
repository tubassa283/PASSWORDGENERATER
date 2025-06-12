<template>
  <div class="form-container">
    <InputField
      label="Password to Check:"
      type="text"
      v-model="passwordToCheck"
      placeholder="Enter password"
      :inputId="'password-checker-input'"
    />
    <button @click="checkPasswordStrength" class="btn btn-primary">
      Check Password
    </button>

    <div v-if="passwordStrength !== null" class="result">
      <h3 :class="passwordStrengthClass">Password Strength: {{ passwordStrength }}</h3>

      <div class="advice-container" v-if="passwordAdvice.length">
        <h4 class="advice-title">アドバイス:</h4>
        <ul class="advice-list">
          <li v-for="(tip, i) in passwordAdvice" :key="i">{{ tip }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import InputField from "./InputField.vue";

export default {
  components: { InputField },
  data() {
    return {
      passwordToCheck: "",
      passwordStrength: null,
      passwordAdvice: [],
    };
  },
  computed: {
    passwordStrengthClass() {
      if (this.passwordStrength === "Strong") return "strong";
      if (this.passwordStrength === "Medium") return "medium";
      if (this.passwordStrength === "Weak") return "weak";
      return "";
    },
  },
  methods: {
    checkPasswordStrength() {
      const password = this.passwordToCheck;
      const length = password.length;
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      const advice = [];

      // 長さチェック
      if (length < 8) {
        advice.push("8文字以上にしてください。");
      } else if (length < 12) {
        advice.push("できれば12文字以上にするとより安全です。");
      }

      // 大文字チェック
      if (!hasUppercase) {
        advice.push("大文字を含めてください。");
      } else {
        const upperCount = (password.match(/[A-Z]/g) || []).length;
        if (upperCount === 1) {
          advice.push("大文字が1文字だけでは不十分です。複数使いましょう。");
        }
      }

      if (!hasLowercase) advice.push("小文字を含めてください。");

      // 数字チェック
      if (!hasNumbers) {
        advice.push("数字を含めてください。");
      } else {
        if (/(\d)\1{2,}/.test(password) || /1234|2345|3456|4567|5678|6789|7890/.test(password)) {
          advice.push("連続した数字や繰り返しの数字は避けましょう。");
        }
      }

      // 記号チェック
      if (!hasSymbols) {
        advice.push("記号（!@#など）を含めてください。");
      } else {
        const symbols = password.match(/[!@#$%^&*(),.?":{}|<>]/g) || [];
        const uniqueSymbols = [...new Set(symbols)];
        if (uniqueSymbols.length === 1 && symbols.length === 1) {
          advice.push("記号が1種類しか使われていません。異なる種類を混ぜるとより安全です。");
        }
      }

      // 英単語っぽいチェック
      if (/^[a-z]+$/.test(password) && length >= 4) {
        advice.push("辞書にある単語のみを使ったパスワードは避けましょう。");
      }

      // 強度評価
      if (
        length >= 12 &&
        hasUppercase &&
        hasLowercase &&
        hasNumbers &&
        hasSymbols &&
        advice.length === 0
      ) {
        this.passwordStrength = "Strong";
        this.passwordAdvice = ["このパスワードは非常に安全です！"];
      } else if (
        length >= 8 &&
        hasUppercase &&
        hasLowercase &&
        (hasNumbers || hasSymbols)
      ) {
        this.passwordStrength = "Medium";
        this.passwordAdvice = advice;
      } else {
        this.passwordStrength = "Weak";
        this.passwordAdvice = advice;
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.btn-primary {
  background: #007bff;
  padding: 12px;
  color: white;
  margin-top: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
}

.result {
  margin-top: 20px;
  font-size: 1.2em;
  text-align: center;
}

.strong {
  color: green;
}

.medium {
  color: orange;
}

.weak {
  color: red;
}

/* アドバイススタイル */
.advice-container {
  margin-top: 15px;
  text-align: left;
  background: #f9f9f9;
  border-left: 4px solid #007bff;
  padding: 10px 15px;
  border-radius: 6px;
  animation: fadeIn 0.3s ease-in;
}

.advice-title {
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 1.1em;
  color: #333;
}

.advice-list {
  padding-left: 20px;
  margin: 0;
}

.advice-list li {
  margin-bottom: 4px;
  color: #444;
  list-style-type: disc;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
