<template>
  <ul class="p-header__pulldown-list">
    <li>
      <router-link to="/account">アカウント設定</router-link>
    </li>
    <li>
      <router-link to="/settings/member_list">管理設定</router-link>
    </li>
    <li>
      <router-link to="/mailbox/mail_templates">メールテンプレート設定</router-link>
    </li>
    <li>
      <router-link to="/comment_templates/new">コメントテンプレート設定</router-link>
    </li>
    <li>
      <ProtectedLink href="/logout">ログアウト</ProtectedLink>
    </li>
  </ul>
</template>

<script lang="ts">
import { ProtectedLink } from 'lapras-frontend'

export default {
  name: 'ActiveUserMenuList',
  components: {
    ProtectedLink,
  },
    emits: { sfc: () => true,  sfc2: (payload: 1 | string) => true, },
    computed: {
    helpLink() {
      return 'https://help.lapras.com/'
    },
  },
  methods: {
    test2() {
      const func = (): string => "string"

      this.$emit('sfc')
      this.$emit('sfc2', 1)
      this.$emit('sfc2', func())
    },
  }
}
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
  white-space: nowrap;
}
</style>
