<template>
  <div class="sidebar">
    <nav class="menu">
      <router-link to="/" class="menu-item">
        <span>ダッシュボード</span>
      </router-link>
      <router-link to="/project-manager" class="menu-item">
        <span>プロジェクト管理</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'SideBar'
}
</script>

<style scoped>
.sidebar {
  width: 100%;
  background-color: #f5f5f5;
  height: 100vh;
  padding: 20px 0;
  overflow-y: auto;
}

.menu {
  display: flex;
  flex-direction: column;
}

.menu-item {
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: #e0e0e0;
}

.menu-item.router-link-active {
  background-color: #e0e0e0;
  font-weight: bold;
}
</style>
