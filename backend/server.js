const express = require('express');
const app = express();
const cors = require('cors');
const { getPersonalInfo, getExperience, getSkills, getEducation, getCertification, getLanguages } = require('./services/resumeServices.js');

app.use(cors());
app.use(express.json());

app.get('/api/resume', async (req, res) => {
  try {
    const personalInfo = await getPersonalInfo();
    const experience = await getExperience();
    const skills = await getSkills();
    const education = await getEducation();
    const certification = await getCertification();
    const languages = await getLanguages();
    
    res.json({
      personalInfo,
      experience,
      skills,
      education,
      certification,
      languages

    });

  } catch (error) {
    console.error('Erro ao buscar dados do currículo:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do currículo' });
  }
});

let projects = [];

// Listar projetos
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// Adicionar projeto
app.post('/api/projects', (req, res) => {
  const newProject = { id: projects.length + 1, ...req.body };
  projects.push(newProject);
  res.status(201).json(newProject);
});

// Editar projeto
app.put('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).send('Projeto não encontrado.');

  project.name = req.body.name;
  project.description = req.body.description;
  project.status = req.body.status; // Atualiza o status também
  res.json(project);
});

// Deletar todos projetos
app.delete('/api/projects/del', async (req, res) => {
  try {
    // Verifica se há projetos para deletar
    if (projects.length === 0) {
      return res.status(200).json({ // Retorne um status 200 se não houver projetos
        toastrMessage: 'There are no projects to be deleted',
        toastrType: 'warning' // Corrigi a capitalização do tipo
      });
    }

    // Limpa os projetos
    projects = [];
    return res.status(200).json({
      toastrMessage: 'All projects have been deleted!',
      toastrType: 'success'
    });
  } catch (error) {
    console.error('Error deleting all projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Deletar projeto por ID
app.delete('/api/projects/:id', (req, res) => {
  const projectIndex = projects.findIndex(p => p.id === parseInt(req.params.id));
  if (projectIndex === -1) return res.status(404).send('Projeto não encontrado.');
  
  projects.splice(projectIndex, 1);
  res.status(204).send();
});
  
// Gerar projetos amostrais
app.post('/api/projects/generate-sample', (req, res) => {
  const maxProjects = 12;
  const projectsToAdd = 6;
  
  // Verifica se já existem 12 ou mais projetos
  if (projects.length >= maxProjects) {
      return res.status(400).json({ error: 'Cannot generate more than 12 projects' });
  }

  const createdProjects = [];
  const startId = projects.length + 1; // Começa do ID após o último existente

  // Gera apenas 6 novos projetos
  for (let i = 0; i < projectsToAdd; i++) {
      const projectId = startId + i; // Garante IDs únicos e sequenciais
      const project = {
          id: projectId,
          name: `Project ${projectId}`,
          description: `Description for Project ${projectId}`,
          status: 'Active',
      };

      createdProjects.push(project);
  }

  projects.push(...createdProjects);
  res.status(201).json({
    createdProjects,
    toastrMessage: 'We have generate 6 projects for you!',
    toastrType: 'success'
  });
});


// Atualizar status do projeto
app.patch('/api/projects/:id/status', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).send('Projeto não encontrado.');

  project.status = req.body.status; // Atualiza o status do projeto
  res.json(project);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
