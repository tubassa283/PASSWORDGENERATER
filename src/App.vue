<template>
  <div class="container">
    <div class="layout" :class="{ 'mobile-layout': isMobileView }">
      <!-- 左側：INFORMATION -->
      <div v-if="!isMobileView" class="info-panel">
        <InfoPanel :infos="infoList" />
      </div>

      <!-- 中央：パスワードジェネレータ -->
      <div class="main-area" :class="{ centered: isMobileView }">
        <!-- PC版タイトルはPC版のみ表示 -->
        <h1 v-if="!isMobileView" class="title">PASSWORD GENERATOR</h1>

        <!-- スマホ版表示 -->
        <MobilePasswordGenerator
          v-if="isMobileView"
          @switch-to-pc="isMobileView = false"
        />

        <!-- PC版表示 -->
        <template v-else>
          <!-- About常時表示 -->
          <About />

          <div style="text-align: center; margin-bottom: 20px;">
            <button class="btn-switch btn-mobile" @click="isMobileView = true">
              スマートフォン版はこちら
            </button>
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

          <!-- タブごとの内容 -->
          <div v-if="currentTab === 'generate'">
            <div class="form-container">
              <div class="form-item">
                <InputField
                  label="Password Length:"
                  type="number"
                  v-model="passwordLength"
                  :min="6"
                  :max="32"
                  :inputId="'password-length'"
                />
              </div>
              <div class="form-item">
                <CheckboxField
                  label="Include Uppercase:"
                  v-model="includeUppercase"
                  :inputId="'include-uppercase'"
                />
              </div>
              <div class="form-item">
                <CheckboxField
                  label="Include Lowercase:"
                  v-model="includeLowercase"
                  :inputId="'include-lowercase'"
                />
              </div>
              <div class="form-item">
                <CheckboxField
                  label="Include Numbers:"
                  v-model="includeNumbers"
                  :inputId="'include-numbers'"
                />
              </div>
              <div class="form-item">
                <CheckboxField
                  label="Include Symbols:"
                  v-model="includeSymbols"
                  :inputId="'include-symbols'"
                />
              </div>
              <div class="form-item">
                <InputField
                  label="Exclude Characters:"
                  type="text"
                  v-model="excludeChars"
                  placeholder="e.g. abc"
                  :inputId="'exclude-characters'"
                />
              </div>
              <div class="form-item">
                <InputField
                  label="Number of Passwords:"
                  type="number"
                  v-model="numberOfPasswords"
                  :min="1"
                  :max="100"
                  :inputId="'number-of-passwords'"
                />
              </div>

              <button @click="generatePassword" class="btn btn-primary">
                Generate Passwords
              </button>
            </div>

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
        </template>
      </div>

      <!-- 右側：アドバイス -->
      <div v-if="!isMobileView" class="advice-area">
        <Advice />
      </div>
    </div>
  </div>
</template>

<script>
import InputField from "./components/InputField.vue";
import CheckboxField from "./components/CheckboxField.vue";
import PasswordList from "./components/PasswordList.vue";
import PasswordChecker from "./components/PasswordChecker.vue";
import InfoPanel from "./components/InfoPanel.vue";
import About from "./components/About.vue";
import Advice from "./components/Advice.vue";
import MobilePasswordGenerator from "./components/MobilePasswordGenerator.vue";

export default {
  components: {
    InputField,
    CheckboxField,
    PasswordList,
    PasswordChecker,
    InfoPanel,
    About,
    Advice,
    MobilePasswordGenerator,
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
      isMobileView: false,
      infoList: [
        { date: "2025/06/15", text: "スマートフォン版をリリースしました。" },
        { date: "2025/06/08", text: "パスワード強度判定機能を改善しました。" },
        { date: "2025/05/30", text: "複数パスワード生成に対応しました。" },
        { date: "2025/05/20", text: "UIをリニューアルしました。" },
        { date: "2025/05/01", text: "INFORMATIONパネルを追加しました。" },
      ],
    };
  },
  methods: {
    generatePassword() {
      if (this.passwordLength < 6) {
        alert("6文字以上の値を指定して下さい");
        return;
      } else if (this.passwordLength > 32) {
        alert("32文字以下で指定して下さい。");
        return;
      }

      if (
        !this.includeUppercase &&
        !this.includeLowercase &&
        !this.includeNumbers &&
        !this.includeSymbols
      ) {
        alert("チェックボックスを選択して下さい。");
        return;
      }

      if (this.numberOfPasswords > 100) {
        alert("100以下で指定して下さい。");
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
        let password = "";
        while (password.length < this.passwordLength) {
          const randomChar =
            allChars.charAt(Math.floor(Math.random() * allChars.length));
          if (!excludeSet.has(randomChar)) {
            password += randomChar;
          }
        }
        this.generatedPasswords.push(password);
      }
    },
    downloadPasswords() {
      const csvContent = this.generatedPasswords.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
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
.container {
  max-width: 900px;
  margin: 0 auto;
  margin-left: -160px;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.layout {
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  height: 200%;
}

.info-panel {
  width: 320px;
  margin-top: 57px;
  margin-left: -100px;
}

.main-area {
  flex: 1;
}

/* 追加：スマホ版は中央寄せ＋左右15px余白確保 */
.centered {
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
}

.title {
  text-align: center;
  font-size: 3em;
  font-weight: 800;
  margin-bottom: 30px;
  background: linear-gradient(90deg, #007bff, #00c6ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}

.title::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background-color: #007bff;
  border-radius: 2px;
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
  padding: 8px 12px;
  font-size: 14px;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-mobile {
  padding: 8px 47px;
  margin-top: -5px;
  margin-left: 3px;
  background-color: #ff9800;
}

.btn-pc {
  margin-top: 30px;
  margin-bottom: 20px;
  background-color: #4caf50;
}
</style>
