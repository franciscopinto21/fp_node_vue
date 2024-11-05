<template>
    <div>
      <main class="content">
        <section class="p-4">
          <h2 class="mb-4">Projetos</h2>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div class="col" v-for="project in projects" :key="project.name">
              <div class="card h-100 w-100 cp">
                <div class="card-body">
                  <h5 class="card-title">{{ project.name }}</h5>
                  <p class="card-text">{{ project.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>         
      </main>
    </div>
  </template>
  
  <script> 
  export default {
    name: 'ProjectsView',
    data(){
      return{
        projects: [
        { name: 'Laravel', description: 'Projeto com framework Laravel.' },
        { name: 'Symfony', description: 'Projeto com framework Symfony.' },
        { name: 'Drupal', description: 'Projeto com CMS Drupal.' },
        { name: 'Node-React', description: 'Projeto com Node.js e React.' },
        { name: 'Node-Vue', description: 'Projeto com Node.js e Vue.' },
      ], 
      }
    }
  };
  </script>
  
  