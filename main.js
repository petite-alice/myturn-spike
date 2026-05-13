// Page Initialization
////////////////////////////////////
window.onerror = function (msg, url, line, col, err) {
  console.log("GLOBAL ERROR:", msg, line, col, err);
};


$(document).ready(function () {
    initialize();
});

async function initialize() {
    // Init the db. Define indexed fields only. 
    // Use MODEL object defined in constants section below to access full schema

  if (typeof connectSPIKE === 'function') {
    $('#connect-spike-btn').on('click', connectSPIKE);
  } else {
    console.warn("SPIKE connect function not loaded");
    $('#connect-spike-btn').on('click', () => {
      alert("SPIKE connection module not loaded");
    });
  }

    app.db = new Dexie('myturn2');
    app.db.version(4).stores({
        projects: '++id',
        steps: '++id, project_id',
        app_config: 'id'
    });

    // Initialize App Config
    app.config = await getConfig();

    await refreshProjects(true);
    
    // Determine which Project to launch with
    let initialProjectId = app.config[MODEL.CONFIG.LAST_PROJECT];
    if (!initialProjectId && app.currentProjects.length > 0) {
      initialProjectId = (app.currentProjects[0][MODEL.PROJECT.ID]);
    } 
    if (!initialProjectId) {
      // There are no projects yet, we should show an error page directing to admin setup but will create empty project for now
      initialProjectId = await addProject();
    }
    
    await setCurrentProject(initialProjectId);
    renderCurrentProject();

    // Click handlers
    $('#project-settings-btn').on('click', () => {
      toggleAdmin();
    });

    // Load any custom Blockly block definitions (from block-config.js)
    if (window.Blockly && typeof CUSTOM_BLOCK_DEFINITIONS !== 'undefined') {
      Blockly.defineBlocksWithJsonArray(CUSTOM_BLOCK_DEFINITIONS);
    }
}

// Navigation
////////////////////////////////////

function showSection(sectionClass, activeSection) {
    $(`.${sectionClass}`).toArray().forEach(element => {
        if(element.id === activeSection) {
            $(element).show();
        } else {
            $(element).hide();
        }
    });
}

// Projects
////////////////////////////////////

async function addProject(name) {
    // Create a default record to generate the ID
    const projectData = {...DEFAULT_PROJECT, ...{
      [MODEL.PROJECT.NAME]: name,
      [MODEL.PROJECT.APP_ID]: app.config[MODEL.CONFIG.APP_ID],
      [MODEL.PROJECT.EXPERIMENT]: app.config[MODEL.CONFIG.EXPERIMENT],
      [MODEL.PROJECT.ROBOT]: app.config[MODEL.CONFIG.ROBOT],
    }};
    const id = await app.db.projects.add(projectData);
    
    // Ensure there is a unique name
    if (!name) {
      await updateProject(id, {[MODEL.PROJECT.NAME]: `Project ${id}`});
    }
    
    // Create an initial Step
    await addStep(id, 0);
    
    // Update the app state to catch this new project
    await refreshProjects(true);

    return id;
}

async function updateProject(id, props, refreshUI) {
  id = parseInt(id)
  if (!id) { return false; }
  
  updateSuccess = await app.db.projects.update(id, props);
  if (!updateSuccess) { return false; }

  if (app.currentProject && id === parseInt(app.currentProject[MODEL.PROJECT.ID])) {
    app.currentProject = {...app.currentProject, ...props}
    validateProjectSetup(app.currentProject);
  }
  
  await refreshProjects();
  
  return true;
}

function cachedProject(projectId) {
  if (!app.currentProjects) { return; }
  return app.currentProjects.find(project => project[MODEL.PROJECT.ID] === projectId);
}

async function refreshProjects(refreshUI) {
    app.currentProjects = await app.db.projects.toArray();
    if (refreshUI) {
        renderProjectDropdown();
    }
}

async function setCurrentProject(projectId) {
    const id = parseInt(projectId);
    if (isNaN(id)) {
        logError(`setCurrentProject - Invalid projectId: ${projectId}`);
        return;
    }

    const project = await app.db.projects.get(id);
    if (!project) {
        logError(`setCurrentProject - Error loading Project: ${id}`);
        return;
    }
    validateProjectSetup(project);    
    
    app.currentProject = project;
    await refreshSteps();
    
    $('#active-project-name').text(projectDisplayName(project));
    updateConfig({[MODEL.CONFIG.LAST_PROJECT]: id});
}

function validateProjectSetup(project) {
  // Catch any issues that may arise from updating the db schema or the configuration hashes below
  const invalidFields = [];

  // Check that the serialized config data is valid within the running codebase
  // Helpful to detect if you change/remove a constant that's already used on existing projects
  const validations = [
    {name: MODEL.PROJECT.EXPERIMENT, value: project[MODEL.PROJECT.EXPERIMENT], valid: Object.values(EXPERIMENTS)},
    {name: MODEL.PROJECT.ROBOT, value: project[MODEL.PROJECT.ROBOT], valid: [...Object.values(ROBOTS), null, undefined]},
    {name: 'EXPERIMENT_PROGRESSION', value: EXPERIMENT_PROGRESSION[project[MODEL.PROJECT.EXPERIMENT]], valid: Object.values(EXPERIMENT_PROGRESSION)},
  ];
  validations.forEach( field => { 
    if (!field.valid.includes(field.value)) {
      invalidFields.push(field.name);
    }
  });

  // Reset progress field if it get's off count somehow
  if (!invalidFields.includes(MODEL.PROJECT.EXPERIMENT)) {
    const progress = project[MODEL.PROJECT.PROGRESS];    
    if (isNaN(progress) || progress < 0){
      updateProject(project[MODEL.PROJECT.ID], {[MODEL.PROJECT.PROGRESS]: 0});      
      logError(`Invalid progress for project ${project[MODEL.PROJECT.ID]}. Resetting to zero.`);
    }

    const progression = EXPERIMENT_PROGRESSION[project[MODEL.PROJECT.EXPERIMENT]];
    if (progression && (progress > 0) && (progress >= progression.length)) {
      updateProject(project[MODEL.PROJECT.ID], {[MODEL.PROJECT.PROGRESS]: progression.length - 1});
      logError(`Invalid progress for progression. Resetting to last valid value. project: ${project[MODEL.PROJECT.ID]}`);
    }
  }
  
  project[MODEL.PROJECT.ERRORS] = invalidFields;
  return invalidFields;
}

function projectDisplayName(project) {
    let response = 'Untitled Project';
    if (project && project[MODEL.PROJECT.NAME]) {
        response = project[MODEL.PROJECT.NAME];
    } else if (project && project[MODEL.PROJECT.ID]) {
        response = `Project ${project[MODEL.PROJECT.ID]}`;
    }
    return response;
}

function renderProjectDropdown() {
  $('#active-project-name').text(projectDisplayName(app.currentProject));
  
  const projectItems = (!app.currentProjects) ? '' : app.currentProjects.map(project => `
      <li><a class="dropdown-item" data-project-id="${project[MODEL.PROJECT.ID]}" href="#">${projectDisplayName(project)}</a></li>
  `);
  const dropdownContents = `
      ${projectItems.join('\n')}
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" data-project-id="${NEW_PROJECT}" href="#">New Project</a></li>
  `;
  $('#project-dropdown').html(dropdownContents);

  $('.dropdown-item').on('click', async function (event) {
    event.preventDefault();

    let projectId = $(event.target).data()['projectId'];

    if (projectId === NEW_PROJECT) {
      projectId = await addProject();
    }
    
    await setCurrentProject(projectId);
    renderCurrentProject();
  });
}

function renderCurrentProject() {
  if (!app.currentProject) return;

  const hasErrors =
    app.currentProject[MODEL.PROJECT.ERRORS] &&
    app.currentProject[MODEL.PROJECT.ERRORS].length > 0;

  if (hasErrors) {
    $('#project-error').html(renderErrorContent());
    showSection(SECTION_APP, SECTIONS[SECTION_APP].ERROR);
  } else {
    renderProgressNav();
    renderSteps();
    showSection(SECTION_APP, SECTIONS[SECTION_APP].STEPS);
  }

  disableAdmin();
}

function renderErrorContent() {
  const message = ``;
    const errors = app.currentProject[MODEL.PROJECT.ERRORS].map(error => {return `<li>${error}</li>`}).join('\n');
    return `
      There was an error loading this project: ${app.currentProject[MODEL.PROJECT.NAME]} (#${app.currentProject[MODEL.PROJECT.ID]})
      </br></br>
      Invalid Fields:</br>
      <ul>
        ${errors}
      </ul>      
    `;
}

function renderProgressNav() {
  let locations = [NAV_TOP];

  if (app.currentSteps.length > 0) {
    $('#step-nav-bottom').show();
    locations = locations.concat(NAV_BOTTOM);
  } else {
    $('#step-nav-bottom').hide();
  }

  const prog = progressDetails(app.currentProject);
  const showLeft = (prog.progress > 0 && ALLOW_BACKWARDS);
  const showRight = (prog.progression && (prog.progress < prog.progression.length - 1));

  locations.forEach(location => {
    const content = {
      left: showLeft ? '<i class="progress-left bi-arrow-left"></i>' : '',
      add: `<i class="progress-step-add bi-plus" data-nav-location="${location}"></i>`,
      right: showRight ? '<i class="progress-right bi-arrow-right"></i>' : ''
    };

    $(`#step-nav-${location}`).html(`
      <div class="row align-items-center">
        <div class="nav-cell rounded col-4">${content.left}</div>
        <div class="nav-cell rounded col-4">${content.add}</div>
        <div class="nav-cell rounded col-4">${content.right}</div>
      </div>
    `);
  });

  $('.progress-left').on('click', () => {
    updateProgress(progressDetails(app.currentProject).progress - 1);
  });

  $('.progress-right').on('click', () => {
    updateProgress(progressDetails(app.currentProject).progress + 1);
  });

  $('.progress-step-add').on('click', event => {
    const location = $(event.target).data('nav-location');
    const newIndex = (location === NAV_TOP) ? 0 : null;
    addStep(app.currentProject[MODEL.PROJECT.ID], newIndex, true);
  });
}

// Steps
////////////////////////////////////

async function addStep(project_id, index, refreshUI) {
  const props = {};
  
  // Set the Project ID, default to the app.currentProject
  project_id = parseInt(project_id)
  props[MODEL.STEP.PROJECT_ID] = isNaN(project_id) ? app.currentProject[MODEL.PROJECT.ID] : project_id;
  props[MODEL.STEP.APP_ID] = app.config[MODEL.CONFIG.APP_ID]
  
  // Set a list index, default to the end
  index = parseInt(index);
  if (isNaN(index) || index == app.currentSteps.length) {
    index = app.currentSteps.length;
  } else {
    // TODO
  }
  props[MODEL.STEP.INDEX] = index;

  await app.db.steps.add(props);
  await refreshSteps(refreshUI);
}

async function updateStep(id, props, refreshUI) {
    const update = await app.db.steps.update(parseInt(id), props);
    await refreshSteps(!!refreshUI);
}

async function refreshSteps(refreshUI) {
  if (!app.currentProject) { return;}
  
  // Async queries below require us to ignore stale refresh/rendering attempts
  // I got race conditions when you transition to a new project from a project with lots of steps
  app.stepRefreshCounter += 1;
  const refreshJob = app.stepRefreshCounter;
  
  const stepResults = await app.db.steps.where({"project_id": app.currentProject[MODEL.PROJECT.ID]}).toArray();    
  if (refreshJob === app.stepRefreshCounter) {
    app.currentSteps = stepResults.sort((a,b) => a[MODEL.STEP.INDEX] - b[MODEL.STEP.INDEX]);    
    if (refreshUI) {
      renderCurrentProject();
    }
  }
}

function cachedStep(stepId) {
    if (!app.currentSteps) { return; }
    return app.currentSteps.find(step => step[MODEL.STEP.ID] === stepId);
}

function renderSteps() {
    // Render each step into full-step-table div
    const columns = displayableColumns();
    const row_content = app.currentSteps.map(step => renderStepRow(step, columns));
    $('#step-table').html(row_content.join('\n'));
    
    // Setup Event Listeners across all the new rows 
    $('.step-upload').on('change', event => {
        const id = event.target.id.replace(PREFIX_UPLOAD,'');
        
        const promise = getBase64($(event.target).get(0).files[0]);                
        promise.then(function(result) {
            const props = {
              [MODEL.STEP.IMG]: result
            };
            updateStep(id, props, true);
        });
    });
    $('.step-annot').on('change', event => {
        const id = event.target.id.replace(PREFIX_ANNOT,'');
        const props = {
          [MODEL.STEP.ANNOT]: $(event.target).val()
        };
        updateStep(id, props);
    });
    $('.step-pseudo').on('change', event => {
        const id = event.target.id.replace(PREFIX_PSEUDO,'');
        const props = {
          [MODEL.STEP.PSEUDO]: $(event.target).val()
        };
        updateStep(id, props);
    });
    $('.step-gear').on('click', event => {
        const id = event.target.id.replace(PREFIX_GEAR,'');
        toggleCodeRow(id);
    });
}

function renderStepRow(step, columns) {
    let rowContent = '';
  
    // Dynamic columns and content. Configured through EXPERIMENT_PROGRESSION and Project settings :
    //   1. IMG
    //   2. IMG + ANNOT
    //   3. IMG + ANNOT + PSEUDO
    //   4. IMG + ANNOT + PSEUDO + BLOCKLY
    
    const id = step[MODEL.STEP.ID];
    const annotation = step[MODEL.STEP.ANNOT] ? step[MODEL.STEP.ANNOT] : '';
    const pseudocode = step[MODEL.STEP.PSEUDO] ? step[MODEL.STEP.PSEUDO] : '';
    const cells = [] 
    
    // Figure out how many columns we want to use for each cell
    const columnSizing = {
      1: {[MODEL.STEP.IMG]: 12, [MODEL.STEP.ANNOT]: 0, [MODEL.STEP.PSEUDO]: 0, [MODEL.STEP.BLOCKLY]: 0},
      2: {[MODEL.STEP.IMG]: 6,  [MODEL.STEP.ANNOT]: 6, [MODEL.STEP.PSEUDO]: 6, [MODEL.STEP.BLOCKLY]: 0},
      3: {[MODEL.STEP.IMG]: 3,  [MODEL.STEP.ANNOT]: 4, [MODEL.STEP.PSEUDO]: 4, [MODEL.STEP.BLOCKLY]: 1},
      4: {[MODEL.STEP.IMG]: 3,  [MODEL.STEP.ANNOT]: 4, [MODEL.STEP.PSEUDO]: 4, [MODEL.STEP.BLOCKLY]: 1}
    }
    const columnCount = columnSizing[Object.keys(columns).length];
    
    // Image Cell
    if (columns[MODEL.STEP.IMG]) {
      let imgCellContent = '';
      if (step[MODEL.STEP.IMG]) {
          imgCellContent = `<img class="step-img rounded" src="${step[MODEL.STEP.IMG]}">`;
      } else {
          imgCellContent = `<input id="${PREFIX_UPLOAD}${id}" type="file" class="step-upload" accept="image/*">`;
      }
      
      cells.push(`
        <div class="step-cell col-12 col-lg-${columnCount[MODEL.STEP.IMG]} text-center">
          ${imgCellContent}
        </div>`
      );
    }
    
    // Annotation Cell
    if (columns[MODEL.STEP.ANNOT]) {
      cells.push(`
        <div class="step-cell col-12 col-lg-${columnCount[MODEL.STEP.ANNOT]}">
            Annotation<br/>
            <textarea id="${PREFIX_ANNOT}${id}" class="step-annot step-text rounded p-2">${annotation}</textarea>
        </div>
      `);
    }

    //  Pseudocode Cell
    if (columns[MODEL.STEP.PSEUDO]) {
      cells.push(`
        <div class="step-cell col-12 col-lg-${columnCount[MODEL.STEP.PSEUDO]}">
          Psuedocode<br/>
          <textarea id="${PREFIX_PSEUDO}${id}" class="step-pseudo step-text rounded p-2">${pseudocode}</textarea>
        </div>
      `);
    }
    
    //  Blockly Cell
    if (columns[MODEL.STEP.BLOCKLY]) {
      const gearContent = columns[MODEL.STEP.BLOCKLY] ? `<i id="${PREFIX_GEAR}${id}" class="step-gear bi-gear"></i><br/>Code` : '';
      cells.push(`
        <div class="step-cell col-12 col-lg-${columnCount[MODEL.STEP.BLOCKLY]} text-center">
            ${gearContent}
        </div>
      `);
    }  
      
    return `
      <div id="${PREFIX_STEP_ROW}${id}" class="row step-row shadow-sm py-1 overflow-hidden align-items-center border rounded">
          ${cells.join('\n')}
      </div>        
    `;    
}

// App Config
////////////////////////////////////

async function getConfig() {
  let config = await app.db.app_config.get(SINGLETON_APP_CONFIG_ID);
  if (!config) {
    const fields = {...DEFAULT_APP_CONFIG, ...{
      [MODEL.CONFIG.APP_ID]: uniqueAppId()
    }};
    await app.db.app_config.add(fields);
    config = await app.db.app_config.get(SINGLETON_APP_CONFIG_ID);
    logWarning('No app data detected. Setting up local storage.');
  }
  return config;
}

async function updateConfig(configHash) {
  app.config = {...app.config, ...configHash};
  return await app.db.app_config.update(SINGLETON_APP_CONFIG_ID, configHash);
}

function uniqueAppId() {
  // '{timestamp}-{random}' ~= 24 chars
  const randoms = new Uint32Array(1);
  return `${Date.now()}-${crypto.getRandomValues(randoms).join('')}`
}

// Admin
////////////////////////////////////

async function exportData() {  
  const data = {
    projects:  await app.db.projects.toArray(),
    steps: await app.db.steps.toArray(),
    app_config: await app.db.app_config.toArray(),
  }
  const content = JSON.stringify(data);
  const filename = `myturn-export-${(new Date()).toISOString()}.json`
  
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function toggleAdmin() {
  if (app.adminActive) {
    renderCurrentProject();
    disableAdmin();
  } else {
    showAdmin();
  }
}

function disableAdmin() {
  $('#app-admin').html('');
  app.adminActive = false;
}

function showAdmin() {
  // const pass = prompt("Enter password to enter educator settings:");
  // if (pass === PASS_HASH) {      
    $('#app-admin').html(renderAdminContent());
    showSection(SECTION_APP, SECTIONS[SECTION_APP].ADMIN);
    app.adminActive = true;
    
    // interaction handlers
    $('input[type=radio][name=experiment-fieldset]').change(event => {
      updateConfig({[MODEL.CONFIG.EXPERIMENT]: $(event.target).val()})
    });      
    $('input[type=radio][name=robot-fieldset]').change(event => {      
      updateConfig({[MODEL.CONFIG.ROBOT]: $(event.target).val()})
    });
    $('.project-name-inputs').change(event => {
      const projectId = $(event.target).data().id;
      const name = $(event.target).val();
      updateProject(projectId,{[MODEL.PROJECT.NAME]: name});
    });
    $('#admin-add-project-form').on('submit', async function(event) {
      event.preventDefault();

      const name = $('#admin-add-project-name').val();
      const projectId = await addProject(name);
      const project = cachedProject(projectId);
      $('#admin-projects-body').append(renderAdminProjectRow(project));
    });
    $('#admin-export-data').on('click', event => {
      exportData();
    });
  // }
}

function renderAdminContent() {
  return `
  <div class="m-4">
    <div class="admin-h1">Application Setup</div>
    <p><i>Settings used when generating new projects</i></p>    
    <fieldset id="experiment-fieldset" class="admin-fieldset">
      <legend class="admin-legends">Experiment Config</legend>
      ${Object.values(EXPERIMENTS).map(expName => {            
        const checked = (expName === app.config[MODEL.CONFIG.EXPERIMENT]) ? 'checked' : '';
        return `<div>
          <input type="radio" id="exp-${expName}" class="experiment-radio-btns" name="experiment-fieldset" value="${expName}" ${checked} />
          <label for="exp-${expName}">${expName}</label>
        </div>`;
      }).join('\n')}
    </fieldset>
    <fieldset id="robot-fieldset" class="admin-fieldset">
      <legend class="admin-legends">Target Robot</legend>
      ${Object.values(ROBOTS).map(robotName => {            
        const checked = (robotName === app.config[MODEL.CONFIG.ROBOT]) ? 'checked' : '';
        return `<div>
          <input type="radio" id="robot-${robotName}" class="robot-radio-btns" name="robot-fieldset" value="${robotName}" ${checked} />
          <label for="robot-${robotName}">${robotName}</label>
        </div>`;
      }).join('\n')}
    </fieldset>
    <br /><br />
    <div class="admin-h1">Projects</div>
    <div id="admin-project-controls" class="container-fluid pl-3 gx-0">
      <div class="row">
        <div class="col-10">
          <form id="admin-add-project-form">
            <input type="text" id="admin-add-project-name" class="align-middle p-1" placeholder="New Project..."></input>&nbsp;&nbsp;<button type="sumbit" class="btn btn-primary">Add New Project</button>
          </form>
        </div>
        <div class="col-2 float-end" pr-0>
          <button id="admin-export-data" class="btn btn-secondary float-end"><i class="bi bi-file-earmark-arrow-down"></i>&nbsp;Export Data</button>
        </div>
      </div>
    </div>
    <table class="table border mt-3">
      <thead class="table-light">
        ${renderAdminProjectRow()}
      </thead>
      <tbody id="admin-projects-body">
        ${app.currentProjects.map(project => { return renderAdminProjectRow(project); }).join('\n')}
      </tbody>
    </table>
  </div>
  `;
}

function renderAdminProjectRow(project) {
  if (!project) {
    return `
          <tr>
            <th scope="col">Project Name</th>
            <th scope="col">Experiment</th>
            <th scope="col">Robot</th>
          </tr>
    `;
  } else {
    return `
          <tr>
            <td><input type="text" class="project-name-inputs" data-id="${project[MODEL.PROJECT.ID]}" value="${project[MODEL.PROJECT.NAME]}"></input></td>
            <td>${project[MODEL.PROJECT.EXPERIMENT]}</td>
            <td>${project[MODEL.PROJECT.ROBOT]}</td>
          </tr>
    `;
  }
  
}

// Experimentation
////////////////////////////////////

function updateProgress(newProgressIndex) {
  app.currentProject[MODEL.PROJECT.PROGRESS] = newProgressIndex;
  updateProject(app.currentProject[MODEL.PROJECT.ID], {[MODEL.PROJECT.PROGRESS]: newProgressIndex});
  renderCurrentProject();
}

function progressDetails(project) {  
  return {
    progress: (parseInt(project[MODEL.PROJECT.PROGRESS]) || 0), 
    progression: EXPERIMENT_PROGRESSION[project[MODEL.PROJECT.EXPERIMENT]]
  };
}

function displayableColumns() {  
  const prog = progressDetails(app.currentProject);
  const fields = prog.progression ? prog.progression[prog.progress] : [];
  
  const map = {}
  fields.forEach(field => map[field] = true);
  return map;
}

// Blockly
////////////////////////////////////
function rebuildToolbox(stepId) {
  const editor = app.blocklyEditors[stepId];
  if (!editor || !app.currentProject) return;

  const newToolbox = toolboxForProject(app.currentProject);

  editor.updateToolbox(newToolbox);
}

function toggleCodeRow(requestedStepId) {
    const stepId = parseInt(requestedStepId);
    const step = cachedStep(stepId);

    if (isNaN(stepId)) {
        logError(`toggleCodeRow - Invalid Step ID: ${requestedStepId}`);
        return;
    } else if (!step) {
        logError(`toggleCodeRow - Could not find cached Step: ${stepId}`);
        return;
    }

    const stepRow = `#${PREFIX_STEP_ROW}${stepId}`;
    const codeRow = `${PREFIX_CODE_ROW}${stepId}`;
    const blocklyDiv = `${PREFIX_BLOCKLY}${stepId}`;

    if (!app.blocklyEditors[stepId]) {
        const content = `
            <div id="${codeRow}" class="row code-row overflow-hidden align-items-top">
                <div class="col-12 text-center">
                    <div id="${blocklyDiv}" class="blockly-editor"></div>
                </div>
            </div>
        `;
        $(content).insertAfter(stepRow);

        const editor = Blockly.inject(blocklyDiv, {
          toolbox: toolboxForProject(app.currentProject),
          scrollbars: false,
        });
      
        // force latest block-config toolbox every time editor opens
        setTimeout(() => {
          editor.updateToolbox(toolboxForProject(app.currentProject));
        }, 0);
        editor.addChangeListener(event => {codeChanged(stepId, event)});      
        app.blocklyEditors[stepId] = editor;

        if (step[MODEL.STEP.BLOCKLY]) {
            Blockly.serialization.workspaces.load(step[MODEL.STEP.BLOCKLY], editor);
        }
    } else {
        saveCodeEditor(stepId);
        app.blocklyEditors[stepId] = null;
        $(`#${codeRow}`).remove();
    }
}

function codeChanged(stepId, event) {
    // Don't listen to Blockly's UI interaction events
    if (event.isUiEvent) { return; }
    
    if (!app.debounceEditors[stepId]) {
        app.debounceEditors[stepId] = true;
        setTimeout(() => {
            saveCodeEditor(stepId);
        }, CODE_DEBOUNCE_MS);
    }
}

function saveCodeEditor(stepId) {
  const editor = app.blocklyEditors[stepId];
  if (editor) {
    const props = {
      [MODEL.STEP.BLOCKLY]: Blockly.serialization.workspaces.save(editor)
    };
    updateStep(stepId,props);
  }
  
  app.debounceEditors[stepId] = false;
}

function toolboxForProject(project) {
  const robotName = project?.[MODEL.PROJECT.ROBOT];
  return toolboxForRobot(robotName);
}

// Utility Functions
////////////////////////////////////

function logError(message) {
    console.log(`Error: ${message}`);
}

function logWarning(message) {
  console.log(`Warning: ${message}`);
}

function getBase64(file) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function() { resolve(reader.result); };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// State and Config
////////////////////////////////////

const app = {
    db: null,
    config: null,
    currentProject: null,
    currentProjects: [],
    currentSteps: [],
    blocklyEditors: {},
    debounceEditors: {},
    stepRefreshCounter: 0,
    adminActive: false
};

const MODEL = {
  PROJECT: {
      ID: 'id',
      APP_ID: 'app_id',
      NAME: 'name',
      EXPERIMENT: 'experiment',
      PROGRESSION: 'progression',
      PROGRESS: 'progress',
      COMPLETE: 'complete',
      ROBOT: 'robot',
      ERRORS: 'errors'
  },
  STEP: {
      ID: 'id', 
      APP_ID: 'app_id',
      PROJECT_ID: 'project_id',
      INDEX: 'index',
      IMG: 'img',
      ANNOT: 'annot',
      PSEUDO: 'pseudo',
      BLOCKLY: 'blockly'
  },
  CONFIG: {
    ID: 'id',
    APP_ID: 'app-id',
    EXPERIMENT: 'exp',
    ROBOT: 'robot',
    LAST_PROJECT: 'last-project'
  }
};

// App Configuration
const SINGLETON_APP_CONFIG_ID = 1;

// Experiment Configurations
const EXPERIMENTS = {
  PROG_A1: 'progessive-control', 
  PROG_B1: 'progressive-treatment'
}
const EXPERIMENT_PROGRESSION = {
  [EXPERIMENTS.PROG_A1]: [[MODEL.STEP.IMG, MODEL.STEP.ANNOT]],
  [EXPERIMENTS.PROG_B1]: [
    [MODEL.STEP.IMG, MODEL.STEP.ANNOT], 
    [MODEL.STEP.IMG, MODEL.STEP.ANNOT, MODEL.STEP.PSEUDO], 
    [MODEL.STEP.IMG, MODEL.STEP.ANNOT, MODEL.STEP.PSEUDO, MODEL.STEP.BLOCKLY]
  ]
}

// Robot Configurations
const ROBOTS = {
  CLICBOT: 'click-bot', 
  LEGO_SPIKE: 'lego-spike-prime'
}

// Defaults
const DEFAULT_APP_CONFIG = {
  [MODEL.CONFIG.ID]: SINGLETON_APP_CONFIG_ID,
  [MODEL.CONFIG.EXPERIMENT]: EXPERIMENTS.PROG_B1,
  [MODEL.CONFIG.ROBOT]: ROBOTS.CLICBOT,
};
const DEFAULT_PROJECT = {
  [MODEL.PROJECT.PROGRESS]: 0,
  [MODEL.PROJECT.COMPLETE]: false
};

// Hardcoded configuration
const CODE_DEBOUNCE_MS = 5000;
const ALLOW_BACKWARDS = true;
const ADMIN_PASSWORD = 'a';

// UI Constants
const NEW_PROJECT = 'new';
const NAV_TOP = 'top';
const NAV_BOTTOM = 'bottom';

// HTML ID prefixes to find all of the elements of the Step rows
const PREFIX_UPLOAD = 'upload-';
const PREFIX_ANNOT = 'annot-';
const PREFIX_PSEUDO = 'pseudo-';
const PREFIX_GEAR = 'gear-';
const PREFIX_STEP_ROW = 'step-row-';
const PREFIX_CODE_ROW = 'code-row-';
const PREFIX_BLOCKLY = 'blockly-';

// Janky little setup to switch between arbitrary clusters of content within some group of elements
const SECTION_APP = 'section-app';
const SECTIONS = {
  [SECTION_APP]: {
    ADMIN: 'app-admin',
    STEPS: 'project-steps',
    ERROR: 'project-error'
  }
};

async function runStep(step) {
  const blockly = step[MODEL.STEP.BLOCKLY];
  if (!blockly) return;

  const workspace = Blockly.serialization.workspaces.load(blockly);

  const topBlocks = workspace.getTopBlocks(true);

  for (const block of topBlocks) {
    await executeBlock(block);
  }
}

async function executeBlock(block) {
  if (!block) return;

  switch (block.type) {

    case "spike_run_motor":
      await runMotor(block);
      break;

    default:
      console.log("Unsupported block:", block.type);
  }

  const next = block.getNextBlock();
  if (next) {
    await executeBlock(next);
  }
}

async function runMotor(block) {
  const command = {
    type: "motor",
    motor: block.getFieldValue("MOTOR"),
    direction: block.getFieldValue("DIRECTION"),
    amount: Number(block.getFieldValue("AMOUNT")),
    unit: block.getFieldValue("UNIT")
  };

  await SPIKE.send(command);
}