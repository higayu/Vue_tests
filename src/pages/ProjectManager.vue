<template>
  <div class="project-manager">
    <div class="projects-container">
      <div class="projects-header">
        <h2 class="text-xl font-bold mb-4">プロジェクト一覧</h2>
        <button class="btn-add" @click="showAddProjectModal = true">新規プロジェクト追加</button>
      </div>

      <div class="projects-list">
        <ProjectItem
          v-for="project in projects"
          :key="project.id"
          :project="project"
          @edit="handleEditProject"
          @delete="handleDeleteProject"
        />
      </div>
    </div>

    <ProjectModal
      :show="showAddProjectModal"
      :editing-project="editingProject"
      @submit="saveProject"
      @cancel="showAddProjectModal = false"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ProjectItem from '../items/ProjectItem.vue';
import ProjectModal from '../Modals/ProjectModal.vue';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase_settings/index.js';

export default {
  name: 'ProjectManager',
  components: {
    ProjectItem,
    ProjectModal
  },
  setup() {
    const projects = ref([]);
    const showAddProjectModal = ref(false);
    const editingProject = ref(null);

    // プロジェクト一覧を取得
    const fetchProjects = async () => {
      try {
        const projectsRef = collection(db, 'projects');
        const q = query(projectsRef, orderBy('startDate', 'desc'));
        const querySnapshot = await getDocs(q);
        
        projects.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('プロジェクトの取得に失敗しました:', error);
        alert('プロジェクトの取得に失敗しました。');
      }
    };

    // プロジェクトを保存
    const saveProject = async (projectData) => {
      try {
        if (editingProject.value) {
          // 更新処理
          const projectRef = doc(db, 'projects', editingProject.value.id);
          await updateDoc(projectRef, projectData);
        } else {
          // 新規追加処理
          const projectsRef = collection(db, 'projects');
          await addDoc(projectsRef, projectData);
        }

        // 一覧を再取得
        await fetchProjects();
        showAddProjectModal.value = false;
        editingProject.value = null;
      } catch (error) {
        console.error('プロジェクトの保存に失敗しました:', error);
        alert('プロジェクトの保存に失敗しました。');
      }
    };

    // プロジェクトを削除
    const handleDeleteProject = async (project) => {
      if (confirm('このプロジェクトを削除してもよろしいですか？')) {
        try {
          const projectRef = doc(db, 'projects', project.id);
          await deleteDoc(projectRef);
          await fetchProjects();
        } catch (error) {
          console.error('プロジェクトの削除に失敗しました:', error);
          alert('プロジェクトの削除に失敗しました。');
        }
      }
    };

    const handleEditProject = (project) => {
      editingProject.value = project;
      showAddProjectModal.value = true;
    };

    // コンポーネントマウント時にプロジェクト一覧を取得
    onMounted(() => {
      fetchProjects();
    });

    return {
      projects,
      showAddProjectModal,
      editingProject,
      handleEditProject,
      handleDeleteProject,
      saveProject
    };
  }
}
</script>

<style scoped>
.project-manager {
  padding: 20px;
}

.projects-container {
  margin-top: 20px;
}

.projects-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.btn-add {
  background-color: #1890ff;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-add:hover {
  background-color: #40a9ff;
}
</style>