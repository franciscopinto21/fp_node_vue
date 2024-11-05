<template>
  <div class="container mt-4">
    <h1>Node/Vue API Demonstration</h1>
    <p>This page demonstrates various CRUD operations with our Node.js backend, showcasing the ability to list, add, update, edit, and delete project items.</p>
    
    <button class="btn btn-primary m-3" @click="fetchProjects">List Projects</button>
    <button class="btn btn-success m-3" @click="showAddProjectModal">Add Project</button>
    <button class="btn btn-success m-3" @click="generateSampleProjects">Generate Projects</button>
    <button class="btn btn-danger m-3" @click="deleteAllProjects">Delete All Projects</button>


  <div class="row">
    <div class="col-12 col-sm-6 col-md-4 mb-4" v-for="project in projects" :key="project.id">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">{{ project.name }}</h5>
          <p class="card-text">{{ project.description }}</p>
          <p class="card-text">
            <strong>Status:</strong>
            <span :class="{'text-success': project.status === 'Active', 'text-danger': project.status === 'Inactive'}">&nbsp;
              {{ project.status }}
            </span>
          </p><button class="btn btn-primary m-1" @click="editProject(project)">Open</button>
          <button class="btn btn-secondary m-1" @click="editProject(project)">Edit</button>
          <button class="btn btn-warning m-1" @click="toggleStatus(project)">Update</button>        
          <button class="btn btn-danger" @click="deleteProject(project.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>

    <!-- Modal for Adding/Editing Project -->
    <div class="modal" tabindex="-1" role="dialog" v-if="showModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content" style="background-color: black; color: white;">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Edit Project' : 'Add Project' }}</h5>
            <button type="button" class="btn btn-close text-white" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="isEditing ? updateProject() : addProject()">
              <div class="form-group m-2">
                <label for="projectName">Project Name</label>
                <input type="text" id="projectName" v-model="currentProject.name" class="form-control" required />
              </div>
              <div class="form-group m-2">
                <label for="projectDescription">Description</label>
                <textarea id="projectDescription" v-model="currentProject.description" class="form-control" required></textarea>
              </div>
              <div class="form-group m-2">
                <label for="projectStatus">Status</label>
                <select v-model="currentProject.status" class="form-control">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <br>
              <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update Project' : 'Add Project' }}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'NodeVue',
  data() {
    return {
      projects: [],
      showModal: false,
      isEditing: false, // Flag to determine if we are editing
      currentProject: { // Holds data for the current project being added or edited
        name: '',
        description: '',
        status: 'Active',
      },
    };
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await axios.get('http://localhost:3000/api/projects');
        this.projects = response.data;
        //console.log(this.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    },
    async toggleStatus(project) {
      const updatedStatus = project.status === 'Active' ? 'Inactive' : 'Active';
      try {
        await axios.put(`http://localhost:3000/api/projects/${project.id}`, {
          status: updatedStatus,
        });
        project.status = updatedStatus;
      } catch (error) {
        console.error('Error updating status:', error);
      }
    },
    async generateSampleProjects() {
      try {
        const response = await axios.post('http://localhost:3000/api/projects/generate-sample');
        this.projects.push(...response.data.createdProjects);
        this.$toastr[response.data.toastrType](response.data.toastrMessage, 'Notification');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toastr.error(error.response.data.error, 'Erro');
        } else {
          this.$toastr.error('Error creating new projects', 'Erro');
        }
      }
    },
    async deleteAllProjects() {
      try {
        const response = await axios.delete('http://localhost:3000/api/projects/del');
        this.projects = [];
        if(response.status === 200){
          this.$toastr[response.data.toastrType](response.data.toastrMessage, 'Notification');
        }
      } catch (error) {
        console.error('Error deleting all projects:', error);
        this.$toastr.error('Error deleting all projects', 'Error');
      }
    },

    async deleteProject(id) {
      try {
        await axios.delete(`http://localhost:3000/api/projects/${id}`);
        this.projects = this.projects.filter(project => project.id !== id);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    },  
    editProject(project) {
      this.isEditing = true;
      this.currentProject = { ...project };
      this.showModal = true;
    },
    showAddProjectModal() {
      this.isEditing = false;
      this.resetCurrentProject();
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.resetCurrentProject();
    },
    resetCurrentProject() {
      this.currentProject = {
        name: '',
        description: '',
        status: 'Active',
      };
    },
    async addProject() {
      try {
        const response = await axios.post('http://localhost:3000/api/projects', this.currentProject);
        this.projects.push(response.data); // Add the new project to the list
        this.closeModal(); // Close the modal after adding
      } catch (error) {
        console.error('Error adding project:', error);
      }
    },
    async updateProject() {
      try {
        await axios.put(`http://localhost:3000/api/projects/${this.currentProject.id}`, this.currentProject);
        // Update the local project in the projects array
        const index = this.projects.findIndex(project => project.id === this.currentProject.id);
        if (index !== -1) {
          this.projects[index] = this.currentProject;
        }
        this.closeModal(); // Close the modal after updating
      } catch (error) {
        console.error('Error updating project:', error);
      }
    },
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.8s;
}
.card:hover {
  transform: scale(1.05);
  background-color: black;
  color: white;
}
.modal {
  display: block; /* Show the modal */
  margin-top: 40px; /* Add margin-top to position the modal lower */
}
.text-white {
  background-color: white !important; /* Force white color */
}
</style>
