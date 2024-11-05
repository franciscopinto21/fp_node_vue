<template>
  <div class="container-fluid my-5">
    <!-- Profile Header -->
    <section class="text-center mb-5 p-4 border-bottom">
      <img
        src="@/assets/me.png" 
        alt="Profile Image"
        class="rounded-circle mb-3"
        style="width: 150px; height: 150px;"
      />
      <h1>Welcome to My Page</h1>
      <h4>Francisco Pinto</h4>
      <p class="lead">Full Stack Developer | PHP | Laravel | JavaScript</p>
      <p class="text-muted">12+ years of experience in software development, passionate about creating scalable web applications.</p>
    </section>

    <!-- About Me Section -->
    <section class="mb-5 p-4 border-bottom">
      <h2 class="mb-4">About Me</h2>
      <p>
        I am a passionate Full Stack Developer with over 12 years of experience in building web applications.
        I thrive in collaborative environments and enjoy delivering high-quality software solutions.
        My expertise lies in backend development with PHP and Laravel, alongside strong frontend skills in JavaScript and frameworks like Vue.js.
      </p>
    </section>

    <!-- Skills Section -->
    <section class="mb-5 p-4 border-bottom">
      <h2 class="mb-4">Skills</h2>
      <div class="row">
        <div class="col-md-4">
          <h4>Backend</h4>
          <ul>
            <li>PHP, Laravel, PHPUnit, X-debug</li>
            <li>Symfony, Python, Java, C#</li>
          </ul>
        </div>
        <div class="col-md-4">
          <h4>Frontend</h4>
          <ul>
            <li>JavaScript, JQuery, Ajax, Vue.js</li>
            <li>HTML5, CSS3, React, Angular, TypeScript</li>
          </ul>
        </div>
        <div class="col-md-4">
          <h4>Databases</h4>
          <ul>
            <li>MySQL, MariaDB, PostgreSQL</li>
            <li>Oracle, NoSQL, DB2, MongoDB, Redis</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section class="mb-5 p-4 border-bottom">
      <h2 class="mb-4">Portfolio</h2>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="portifolio in portifolio" :key="portifolio.name">
          <div class="card h-100 w-100 cp p-3">
            <img
              :src="portifolio.image"
              class="card-img-top"
              alt="portifolio Image"
              style="height: 150px; object-fit: contain;"
            />
            <div class="card-body">
              <h5 class="card-title">{{ portifolio.name }}</h5>
              <p class="card-text">{{ portifolio.description }}</p>
              <a :href="portifolio.link" class="btn btn-primary">Visit Website</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="p-4">
      <h2 class="mb-4">Personal Projects</h2>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="project in projects" :key="project.name">
          <div class="card h-100 w-100 cp">

            <div class="card-body">
              <h5 class="card-title">{{ project.name }}</h5>
              <p class="card-text">{{ project.description }}</p>
              <a :href="project.link" class="btn btn-primary">View Project</a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>

import biggreen from '@/assets/biggreen.png';
import farm2u from '@/assets/farm2u.png';
import alpinclub from '@/assets/alpinclub.png';
import arede from '@/assets/arede.png';

export default {
  name: 'HomeView',
  data() {
    return {
      projects: [
        { 
          name: 'Laravel Project', 
          description: 'Developed a complete application using Laravel framework.',
          link: 'https://example.com/laravel-project',
          image: 'https://via.placeholder.com/300'  // Placeholder image
        },
        { 
          name: 'Symfony Project', 
          description: 'Created a robust API with Symfony framework.',
          link: 'https://example.com/symfony-project',
          image: 'https://via.placeholder.com/300'
        },
        { 
          name: 'Drupal Project', 
          description: 'Developed a customized CMS with Drupal.',
          link: 'https://example.com/drupal-project',
          image: 'https://via.placeholder.com/300'
        },
        { 
          name: 'Node-React Project', 
          description: 'Built a full-stack application using Node.js and React.',
          link: 'https://example.com/node-react-project',
          image: 'https://via.placeholder.com/300'
        },
        { 
          name: 'Node-Vue Project', 
          description: 'Developed an interactive application with Node.js and Vue.',
          link: 'https://example.com/node-vue-project',
          image: 'https://via.placeholder.com/300'
        },
      ],
      portifolio: [
        {
          name: 'BIG GREEN COFFEE & CO',
          description: 'Import Export Business',
          link: 'https://example.com/node-vue-project',
          image: biggreen,
        },
        {
          name: 'Farm2u',
          description: 'NATURAL FOOD',
          link: 'https://example.com/node-vue-project',
          image: farm2u,
        },
        {
          name: 'AlpinClub Trading',
          description: 'Import Export Business',
          link: 'https://example.com/node-vue-project',
          image: alpinclub,
        },
        {
          name: 'A Rede de Imóveis',
          description: 'Real State Business',
          link: 'https://example.com/node-vue-project',
          image: arede,
        },        
      ],
    };
  },
};

</script>

<style scoped>
/* Add any custom styles you may need here */
</style>
