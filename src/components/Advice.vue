<template>
  <div class="advice-container">
    <h2 class="advice-title">ADVICE</h2>
    <ul class="advice-list">
      <li class="advice-item">
        <h3>1. 長さを意識する</h3>
        <p>長いほど安全性が高い。12文字以上が理想で、16文字以上ならさらに安心です。</p>
      </li>
      <li class="advice-item">
        <h3>2. ランダムに構成する</h3>
        <p>大文字・小文字・数字・記号を組み合わせる。単語や名前は避け、予測されにくい文字列にしましょう。</p>
      </li>
      <li class="advice-item">
        <h3>3. アカウントごとに違うものを</h3>
        <p>使い回しはNG。ひとつ漏れると他も危険なので、サービスごとに別のパスワードを設定します。</p>
      </li>
      <li class="advice-item">
        <h3>4. 忘れない工夫を</h3>
        <p>複雑にしすぎないか、管理ツールを使う。覚えにくい場合は、信頼できるパスワード管理アプリを使うのがおすすめです。</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Advice",
};
</script>

<style scoped>
.advice-container {
  max-width: 310px;
  height:860px;
  margin: 0 auto;
  margin-top: 113px;
  margin-right: -380px;
  padding: 20px;
  background-color: #f0f8ff; /* ★ About.vue と同じ背景色に統一 */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.advice-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #007bff;
}

.advice-list {
  list-style: none;
  padding: 0;
}

.advice-item {
  margin-bottom: 10px;
  padding-top: 5px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.advice-item:last-child {
  border-bottom: none;
}

.advice-item h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 30px;
}

.advice-item p {
  font-size: 16px;
  color: #555;
  line-height: 1.5;
  text-align: left; 
}
</style>
