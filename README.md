# define-component-converter

`Vue.extend`を使っていたり何も使っていなかったりするsfcファイルを、`defineComponent()`を使うよう変換する

自分用に使うものなので、現状は`lang="ts"`が付いているファイルしか変換しません

## 🚀 Usage

```bash
$ npx define-component-converter run -- ./src/**/*.vue
```

Here is an example output:

```diff
 </template>
 
 <script lang="ts">
-import Vue from 'vue'
+import { defineComponent } from "@vue/composition-api"
 
-export default Vue.extend({
+export default defineComponent({
   name: 'AnimatedNumber',
   props: {
```

Note that the tool does not format the output itself. It is strongly recommended that you use it with some formatter.

## 📄 License

MIT.
