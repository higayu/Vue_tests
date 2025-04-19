<template>
    <div class="project-item">
      <div class="project-header">
        <h3 class="project-title">{{ project.title }}</h3>
        <span class="project-status" :class="project.status">{{ project.status }}</span>
      </div>
      
      <div class="project-details">
        <p class="project-description">{{ project.description }}</p>
        <div class="project-meta">
          <span class="project-date">開始日: {{ formatDate(project.startDate) }}</span>
          <span class="project-date">終了予定日: {{ formatDate(project.endDate) }}</span>
          <span class="project-date">終了日: {{ formatDate(project.completedDate) }}</span>
        </div>
      </div>
  
      <div class="project-actions">
        <button class="btn-edit" @click="editProject">編集</button>
        <button class="btn-delete" @click="deleteProject">削除</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProjectItem',
    props: {
      project: {
        type: Object,
        required: true
      }
    },
    methods: {
      formatDate(date) {
        if (!date) return '未設定';
        return new Date(date).toLocaleDateString('ja-JP');
      },
      editProject() {
        this.$emit('edit', this.project);
      },
      deleteProject() {
        this.$emit('delete', this.project);
      }
    }
  }
  </script>
  
  <style scoped>
  .project-item {
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  
  .project-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
  }
  
  .project-status {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  
  .project-status.active {
    background-color: #e6f7ff;
    color: #1890ff;
  }
  
  .project-status.completed {
    background-color: #f6ffed;
    color: #52c41a;
  }
  
  .project-status.pending {
    background-color: #fff7e6;
    color: #fa8c16;
  }
  
  .project-description {
    color: #666;
    margin-bottom: 12px;
  }
  
  .project-meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: #888;
    font-size: 0.9rem;
  }
  
  .project-actions {
    display: flex;
    gap: 8px;
    margin-top: 16px;
  }
  
  .btn-edit, .btn-delete {
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-edit {
    background-color: #1890ff;
    color: white;
    border: none;
  }
  
  .btn-edit:hover {
    background-color: #40a9ff;
  }
  
  .btn-delete {
    background-color: #ff4d4f;
    color: white;
    border: none;
  }
  
  .btn-delete:hover {
    background-color: #ff7875;
  }
  </style>