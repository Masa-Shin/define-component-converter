<template>
  <ul class="p-header__pulldown-list">
    <li><router-link to="/account">アカウント設定</router-link></li>
    <li><router-link to="/settings/member_list">管理設定</router-link></li>
    <li>
      <router-link to="/mailbox/mail_templates"
        >メールテンプレート設定</router-link
      >
    </li>
    <li>
      <router-link to="/comment_templates/new"
        >コメントテンプレート設定</router-link
      >
    </li>
    <li><ProtectedLink href="/logout">ログアウト</ProtectedLink></li>
  </ul>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ProtectedLink } from 'lapras-frontend'

export default Vue.extend({
  name: 'ActiveUserMenuList',
  props: {
    aaa: {
      type: Object as PropType<any>
    }
  },
  components: {
    ProtectedLink,
  },
    emits: { extends: () => true,  extends2: (payload: "payload") => true, },
    methods: {
    test() {
      this.$emit('extends')
      this.$emit('extends2', "payload")
    },
  }
})
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
  white-space: nowrap;
}
</style>
