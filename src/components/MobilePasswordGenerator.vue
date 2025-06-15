<template>
  <div class="mobile-generator">
    <!-- タイトルとハンバーガーメニューアイコン -->
    <header class="header">
      <h1 class="title">PASSWORD GENERATOR</h1>
    </header>

    <!-- PC版に戻るボタン -->
    <div class="switch-back">
      <button class="btn-switch" @click="$emit('switch-to-pc')">パソコン版はこちら</button>
    </div>

    <!-- タブ -->
    <div class="tabs">
      <button
        class="tab"
        :class="{ active: currentTab === 'generate' }"
        @click="currentTab = 'generate'"
      >
        Generate
      </button>
      <button
        class="tab"
        :class="{ active: currentTab === 'check' }"
        @click="currentTab = 'check'"
      >
        Check
      </button>
    </div>

    <!-- タブに応じた内容 -->
    <div v-if="currentTab === 'generate'">
      <div class="form-container">
        <!-- 各入力項目 -->
        <div class="form-item">
          <InputField
            label="Password Length:"
            type="number"
            v-model="passwordLength"
            :min="6"
            :max="32"
            :inputId="'mobile-password-length'"
          />
        </div>
        <div class="form-item">
          <CheckboxField
            label="Include Uppercase:"
            v-model="includeUppercase"
            :inputId="'mobile-include-uppercase'"
          />
        </div>
        <div class="form-item">
          <CheckboxField
            label="Include Lowercase:"
            v-model="includeLowercase"
            :inputId="'mobile-include-lowercase'"
          />
        </div>
        <div class="form-item">
          <CheckboxField
            label="Include Numbers:"
            v-model="includeNumbers"
            :inputId="'mobile-include-numbers'"
          />
        </div>
        <div class="form-item">
          <CheckboxField
            label="Include Symbols:"
            v-model="includeSymbols"
            :inputId="'mobile-include-symbols'"
          />
        </div>
        <div class="form-item">
          <InputField
            label="Exclude Characters:"
            type="text"
            v-model="excludeChars"
            placeholder="e.g. abc"
            :inputId="'mobile-exclude-chars'"
          />
        </div>
        <div class="form-item">
          <InputField
            label="Number of Passwords:"
            type="number"
            v-model="numberOfPasswords"
            :min="1"
            :max="100"
            :inputId="'mobile-number-of-passwords'"
          />
        </div>

        <!-- 生成ボタン -->
        <button @click="generatePassword" class="btn btn-primary">
          Generate Passwords
        </button>
      </div>

      <!-- 生成されたパスワード一覧 -->
      <PasswordList
        v-if="generatedPasswords.length > 0"
        :passwords="generatedPasswords"
        @download="downloadPasswords"
        @clear="clearPasswords"
      />
    </div>

    <div v-else>
      <PasswordChecker />
    </div>
  </div>
</template>

<script>
import InputField from "./InputField.vue";
import CheckboxField from "./CheckboxField.vue";
import PasswordList from "./PasswordList.vue";
import PasswordChecker from "./PasswordChecker.vue";
import HamburgerMenu from "./HamburgerMenu.vue";

export default {
  components: {
    InputField,
    CheckboxField,
    PasswordList,
    PasswordChecker,
    HamburgerMenu,
  },
  data() {
    return {
      currentTab: "generate",
      passwordLength: 6,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      excludeChars: "",
      numberOfPasswords: 1,
      generatedPasswords: [],
      showMenu: false,
    };
  },
  methods: {
    generatePassword() {
      if (this.passwordLength < 6 || this.passwordLength > 32) {
        alert("6〜32文字の間で指定してください。");
        return;
      }
      if (
        !this.includeUppercase &&
        !this.includeLowercase &&
        !this.includeNumbers &&
        !this.includeSymbols
      ) {
        alert("最低1つの文字種を選んでください。");
        return;
      }
      if (this.numberOfPasswords > 100) {
        alert("100個以下で指定してください。");
        return;
      }

      const chars = [];
      if (this.includeUppercase) chars.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
      if (this.includeLowercase) chars.push("abcdefghijklmnopqrstuvwxyz");
      if (this.includeNumbers) chars.push("0123456789");
      if (this.includeSymbols) chars.push("!@#$%^&*()-_+=<>?");

      const allChars = chars.join("");
      const excludeSet = new Set(this.excludeChars);
      this.generatedPasswords = [];

      for (let i = 0; i < this.numberOfPasswords; i++) {
        let pw = "";
        while (pw.length < this.passwordLength) {
          const c = allChars.charAt(Math.floor(Math.random() * allChars.length));
          if (!excludeSet.has(c)) {
            pw += c;
          }
        }
        this.generatedPasswords.push(pw);
      }
    },
    downloadPasswords() {
      const content = this.generatedPasswords.join("\n");
      const blob = new Blob([content], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "passwords.csv";
      link.click();
    },
    clearPasswords() {
      this.generatedPasswords = [];
    },
  },
};
</script>

<style scoped>
.mobile-generator {
  padding: 16px;
  width:400px;
  max-height: 621px;
  margin-left: 190px;
}

.header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.title {
  font-size: 3em;
  font-weight: 800;
  background: linear-gradient(90deg, #007bff, #00c6ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  margin: 0;
}


.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 30px;
  margin: 0 5px;
  background-color: #e0f7fa;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

.tab.active {
  background-color: #007bff;
  color: white;
  border: 1px solid #007bff;
}

.form-container {
  background: #e0f7fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-item {
  padding: 12px 0;
  border-bottom: 1px solid #ccc;
}

.form-item:last-of-type {
  border-bottom: none;
}

  
.btn {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary {
  background: #007bff;
  color: white;
  margin-top: 10px;
}

.btn-switch {
  margin: 20px auto 10px;
  padding: 8px 67px;
  font-size: 14px;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 6px;
  display: block;
}
</style>
