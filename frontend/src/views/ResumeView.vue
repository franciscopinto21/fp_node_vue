<template>
  <div>
    <main class="content">
      <div class="container mt-5">
        
        <!-- Profile Image Section with Loading -->
        <div class="row">
          <div class="col-md-3">
            <div v-if="loadingProfileImage" class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <img v-else src="@/assets/me.jpg" alt="Profile" class="img-fluid profile-img" width="250" />
          </div>
          
          <!-- Personal Info Section with Loading -->
          <div class="col-md-9">
            <div v-if="loadingPersonalInfo" class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div v-else>
              <h1>{{ personalInfo.name }}</h1>
              <h2>{{ personalInfo.title }}</h2>
              <h3>Profile</h3>
              <p>{{ personalInfo.description }}</p>
            </div>
          </div>
        </div>

        <!-- Contact Section with Loading -->
        <div class="col-md-12 mt-4">
          <h3>Contact</h3>
          <div v-if="loadingPersonalInfo" class="text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div v-else>
            <p>
              <strong>ADDRESS:</strong> {{ personalInfo.address }}<br />
              <strong>PHONE:</strong> {{ personalInfo.phone }}<br />
              <strong>LinkedIn:</strong> <a :href="personalInfo.linkedin">{{ personalInfo.linkedin }}</a><br />
              <strong>EMAIL:</strong> {{ personalInfo.email }}
            </p>
          </div>
        </div>

        <!-- Work Experience Section with Loading -->
        <div class="row mt-5">
          <div class="col-md-12">
            <h3>WORK EXPERIENCE</h3>
            <div v-if="loadingWorkExperience" class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <ul v-else>
              <li v-for="experience in workExperience" :key="experience.id">
                <strong>{{ experience.title }} at {{ experience.company }}</strong><br />
                <span>{{ formatDate(experience.start_date) }} - {{ formatDate(experience.end_date) }}</span><br />
                <strong>Location:</strong> {{ experience.location }}<br />
                <strong>Job Description:</strong> {{ experience.description }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Education Section with Loading -->
        <div class="row mt-5">
          <div class="col-md-12">
            <h3>EDUCATION</h3>
            <div v-if="loadingEducation" class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <ul v-else>
              <li v-for="education in educationData" :key="education.id">
                <strong>{{ education.degree }} from {{ education.institution }}</strong><br />
                <span>{{ formatDate(education.start_date) }} - {{ formatDate(education.end_date) }}</span><br />
                <strong>Location:</strong> {{ education.location }}<br />
                <strong>Description:</strong> {{ education.description }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Certifications Section with Loading -->
        <div class="row mt-5">
          <div class="col-md-12">
            <h3>CERTIFICATIONS AND COURSES</h3>
            <div v-if="loadingCertifications" class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <ul v-else>
              <li v-for="certification in certifications" :key="certification.id">
                {{ certification.name }} - {{ certification.provider }} ({{ formatDate(certification.completion_date) }})
              </li>
            </ul>
          </div>
        </div>

        <!-- Skills Section with Loading -->
        <div class="row mt-5">
          <div class="col-md-12">
            <h3>SKILLS AND COMPETENCIES</h3>
            <div v-if="loadingSkills" class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div v-else class="row">
              <div
                v-for="(skillGroup, index) in groupedSkills"
                :key="index"
                class="col-md-6 mb-3"
              >
                <h5 style="font-weight: bold;">{{ skillGroup.category }}</h5>
                <ul>
                  <li v-for="skill in skillGroup.skills" :key="skill.id">{{ skill.skill_name }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Languages Section with Loading -->
        <div class="row mt-5 mb-5">
          <div class="col-md-12">
            <h3>LANGUAGES</h3>
            <div v-if="loadingLanguages" class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <table v-else class="table">
              <thead>
                <tr>
                  <th style="font-weight: bold;">Language</th>
                  <th style="font-weight: bold;">Proficiency</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="language in languages" :key="language.id">
                  <td>{{ language.language }}</td>
                  <td>{{ language.proficiency }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ResumeView',
  data() {
    return {
      personalInfo: {},
      workExperience: [],
      educationData: [],
      certifications: [],
      skills: [],
      languages: [],
      loadingProfileImage: true,
      loadingPersonalInfo: true,
      loadingWorkExperience: true,
      loadingEducation: true,
      loadingCertifications: true,
      loadingSkills: true,
      loadingLanguages: true
    };
  },
  computed: {
    groupedSkills() {
      const skillGroups = {};
      this.skills.forEach(skill => {
        if (!skillGroups[skill.category]) {
          skillGroups[skill.category] = { category: skill.category, skills: [] };
        }
        skillGroups[skill.category].skills.push(skill);
      });
      return Object.values(skillGroups);
    }
  },
  methods: {
    formatDate(date) {
      return date ? date.split('T')[0] : ''; // Retorna a data no formato 'yyyy-mm-dd'
    }
  },
  async created() {
    try {
      const response = await fetch('http://localhost:3000/api/resume');
      const data = await response.json();
      this.personalInfo = data.personalInfo;
      this.loadingPersonalInfo = false;
      this.loadingProfileImage = false;
      
      this.workExperience = data.experience;
      this.loadingWorkExperience = false;
      
      this.educationData = data.education;
      this.loadingEducation = false;
      
      this.certifications = data.certification;
      this.loadingCertifications = false;
      
      this.skills = data.skills;
      this.loadingSkills = false;
      
      this.languages = data.languages;
      this.loadingLanguages = false;
      
    } catch (error) {
      console.error('Error fetching resume data:', error);
    }
  }
};
</script>
