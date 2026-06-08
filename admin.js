const TOKEN_KEY = "srjAdminToken";

const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
const removeToken = () => localStorage.removeItem(TOKEN_KEY);

const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, options);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Request failed");
  }
  return result;
};

const loginForm = document.querySelector(".admin-login-form");
const dashboardPage = document.querySelector(".admin-dashboard-page");
const logoutButton = document.querySelector(".admin-logout");

if (loginForm) {
  if (getToken()) {
    window.location.href = "admin-dashboard.html";
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = document.querySelector(".admin-status");
    const formData = new FormData(loginForm);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    status.textContent = "Signing in...";

    try {
      const result = await fetchJson("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      setToken(result.data.token);
      status.textContent = "Login successful. Redirecting...";
      window.location.href = "admin-dashboard.html";
    } catch (error) {
      status.textContent = `Login failed: ${error.message}`;
    }
  });
}

if (dashboardPage) {
  if (!getToken()) {
    window.location.href = "admin-login.html";
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      removeToken();
      window.location.href = "admin-login.html";
    });
  }

  const metricCards = document.getElementById("metricCards");
  const contactRows = document.getElementById("contactRows");
  const applicationRows = document.getElementById("applicationRows");
  const jobList = document.getElementById("jobList");
  const blogList = document.getElementById("blogList");
  const serviceList = document.getElementById("serviceList");
  const projectList = document.getElementById("projectList");
  const teamList = document.getElementById("teamList");

  const jobForm = document.getElementById("jobForm");
  const blogForm = document.getElementById("blogForm");
  const serviceForm = document.getElementById("serviceForm");
  const projectForm = document.getElementById("projectForm");
  const teamForm = document.getElementById("teamForm");

  const renderMetrics = (counts) => {
    metricCards.innerHTML = Object.entries(counts)
      .map(
        ([label, value]) => `
          <article class="admin-card">
            <strong>${value}</strong>
            <p>${label}</p>
          </article>
        `
      )
      .join("");
  };

  const renderRows = (element, rows) => {
    element.innerHTML = rows.join("");
  };

  const renderResourceList = (container, items, renderItem) => {
    container.innerHTML = items.map(renderItem).join("");
  };

  const handleResourceDelete = async (url, refresh) => {
    try {
      await fetchJson(url, { method: "DELETE", headers: authHeaders() });
      refresh();
    } catch (error) {
      alert(error.message);
    }
  };

  const enableEdit = (form, item) => {
    const idInput = form.querySelector("input[name=id]");
    idInput.value = item._id;
    Object.keys(item).forEach((key) => {
      const field = form.querySelector(`[name=${key}]`);
      if (field) {
        if (Array.isArray(item[key])) {
          field.value = item[key].join(", ");
        } else {
          field.value = item[key] || "";
        }
      }
    });
    form.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const buildTableRow = (item, columns) => {
    return `<tr>${columns.map((value) => `<td>${value}</td>`).join("")}</tr>`;
  };

  const loadContacts = async () => {
    try {
      const result = await fetchJson("/api/v1/contacts", { headers: authHeaders() });
      const rows = result.data.slice(0, 6).map((contact) =>
        `<tr><td>${contact.fullName}</td><td>${contact.email}</td><td>${contact.serviceInterested || "—"}</td><td>${contact.status}</td></tr>`
      );
      renderRows(contactRows, rows);
    } catch (error) {
      contactRows.innerHTML = `<tr><td colspan="4">${error.message}</td></tr>`;
    }
  };

  const loadApplications = async () => {
    try {
      const result = await fetchJson("/api/v1/applications", { headers: authHeaders() });
      const rows = result.data.slice(0, 6).map((application) =>
        `<tr><td>${application.name}</td><td>${application.email}</td><td>${application.appliedJob?.title || "—"}</td><td><a href="${application.resumeUrl}" target="_blank">View</a></td></tr>`
      );
      renderRows(applicationRows, rows);
      return result.data;
    } catch (error) {
      applicationRows.innerHTML = `<tr><td colspan="4">${error.message}</td></tr>`;
      return [];
    }
  };

  const loadJobs = async () => {
    try {
      const result = await fetchJson("/api/v1/careers", { headers: authHeaders() });
      renderResourceList(jobList, result.data, (job) => `
        <article class="admin-item">
          <div><strong>${job.title}</strong><p>${job.location || "Remote"} • ${job.experience || "Any experience"}</p></div>
          <div class="admin-actions">
            <button type="button" class="btn btn-secondary" data-action="edit" data-id="${job._id}">Edit</button>
            <button type="button" class="btn btn-danger" data-action="delete" data-id="${job._id}">Delete</button>
          </div>
        </article>
      `);
      return result.data;
    } catch (error) {
      jobList.innerHTML = `<p class="text-error">${error.message}</p>`;
      return [];
    }
  };

  const loadBlogs = async () => {
    try {
      const result = await fetchJson("/api/v1/blogs", { headers: authHeaders() });
      renderResourceList(blogList, result.data, (blog) => `
        <article class="admin-item">
          <div><strong>${blog.title}</strong><p>${blog.author || "Admin"}</p></div>
          <div class="admin-actions">
            <button type="button" class="btn btn-secondary" data-action="edit" data-id="${blog._id}">Edit</button>
            <button type="button" class="btn btn-danger" data-action="delete" data-id="${blog._id}">Delete</button>
          </div>
        </article>
      `);
      return result.data;
    } catch (error) {
      blogList.innerHTML = `<p class="text-error">${error.message}</p>`;
      return [];
    }
  };

  const loadServices = async () => {
    try {
      const result = await fetchJson("/api/v1/services", { headers: authHeaders() });
      renderResourceList(serviceList, result.data, (service) => `
        <article class="admin-item">
          <div><strong>${service.name}</strong><p>${service.slug}</p></div>
          <div class="admin-actions">
            <button type="button" class="btn btn-secondary" data-action="edit" data-id="${service._id}">Edit</button>
            <button type="button" class="btn btn-danger" data-action="delete" data-id="${service._id}">Delete</button>
          </div>
        </article>
      `);
      return result.data;
    } catch (error) {
      serviceList.innerHTML = `<p class="text-error">${error.message}</p>`;
      return [];
    }
  };

  const loadProjects = async () => {
    try {
      const result = await fetchJson("/api/v1/projects", { headers: authHeaders() });
      renderResourceList(projectList, result.data, (project) => `
        <article class="admin-item">
          <div><strong>${project.name}</strong><p>${project.clientName || "Client unknown"}</p></div>
          <div class="admin-actions">
            <button type="button" class="btn btn-secondary" data-action="edit" data-id="${project._id}">Edit</button>
            <button type="button" class="btn btn-danger" data-action="delete" data-id="${project._id}">Delete</button>
          </div>
        </article>
      `);
      return result.data;
    } catch (error) {
      projectList.innerHTML = `<p class="text-error">${error.message}</p>`;
      return [];
    }
  };

  const loadTeam = async () => {
    try {
      const result = await fetchJson("/api/v1/team", { headers: authHeaders() });
      renderResourceList(teamList, result.data, (member) => `
        <article class="admin-item">
          <div><strong>${member.name}</strong><p>${member.designation || "Team member"}</p></div>
          <div class="admin-actions">
            <button type="button" class="btn btn-secondary" data-action="edit" data-id="${member._id}">Edit</button>
            <button type="button" class="btn btn-danger" data-action="delete" data-id="${member._id}">Delete</button>
          </div>
        </article>
      `);
      return result.data;
    } catch (error) {
      teamList.innerHTML = `<p class="text-error">${error.message}</p>`;
      return [];
    }
  };

  const loadAll = async () => {
    const [contacts, applications, jobs, blogs, services, projects, team] = await Promise.all([
      fetchJson("/api/v1/contacts", { headers: authHeaders() }).catch(() => ({ data: [] })),
      fetchJson("/api/v1/applications", { headers: authHeaders() }).catch(() => ({ data: [] })),
      fetchJson("/api/v1/careers", { headers: authHeaders() }).catch(() => ({ data: [] })),
      fetchJson("/api/v1/blogs", { headers: authHeaders() }).catch(() => ({ data: [] })),
      fetchJson("/api/v1/services", { headers: authHeaders() }).catch(() => ({ data: [] })),
      fetchJson("/api/v1/projects", { headers: authHeaders() }).catch(() => ({ data: [] })),
      fetchJson("/api/v1/team", { headers: authHeaders() }).catch(() => ({ data: [] }))
    ]);

    renderMetrics({
      "Total Contacts": contacts.data.length,
      "Total Jobs": jobs.data.length,
      "Total Applications": applications.data.length,
      "Total Blogs": blogs.data.length,
      "Total Services": services.data.length,
      "Total Projects": projects.data.length,
      "Team Members": team.data.length
    });

    contactRows.innerHTML = contacts.data.slice(0, 6).map((contact) => `<tr><td>${contact.fullName}</td><td>${contact.email}</td><td>${contact.serviceInterested || "—"}</td><td>${contact.status}</td></tr>`).join("");
    applicationRows.innerHTML = applications.data.slice(0, 6).map((app) => `<tr><td>${app.name}</td><td>${app.email}</td><td>${app.appliedJob?.title || "—"}</td><td><a href="${app.resumeUrl}" target="_blank">View</a></td></tr>`).join("");
    renderResourceList(jobList, jobs.data, renderJobItem);
    renderResourceList(blogList, blogs.data, renderBlogItem);
    renderResourceList(serviceList, services.data, renderServiceItem);
    renderResourceList(projectList, projects.data, renderProjectItem);
    renderResourceList(teamList, team.data, renderTeamItem);
  };

  const renderJobItem = (job) => `
    <article class="admin-item">
      <div><strong>${job.title}</strong><p>${job.location || "Remote"} • ${job.experience || "Any experience"}</p></div>
      <div class="admin-actions">
        <button type="button" class="btn btn-secondary" data-action="edit" data-resource="job" data-id="${job._id}">Edit</button>
        <button type="button" class="btn btn-danger" data-action="delete" data-resource="job" data-id="${job._id}">Delete</button>
      </div>
    </article>
  `;

  const renderBlogItem = (blog) => `
    <article class="admin-item">
      <div><strong>${blog.title}</strong><p>${blog.author || "Admin"}</p></div>
      <div class="admin-actions">
        <button type="button" class="btn btn-secondary" data-action="edit" data-resource="blog" data-id="${blog._id}">Edit</button>
        <button type="button" class="btn btn-danger" data-action="delete" data-resource="blog" data-id="${blog._id}">Delete</button>
      </div>
    </article>
  `;

  const renderServiceItem = (service) => `
    <article class="admin-item">
      <div><strong>${service.name}</strong><p>${service.slug}</p></div>
      <div class="admin-actions">
        <button type="button" class="btn btn-secondary" data-action="edit" data-resource="service" data-id="${service._id}">Edit</button>
        <button type="button" class="btn btn-danger" data-action="delete" data-resource="service" data-id="${service._id}">Delete</button>
      </div>
    </article>
  `;

  const renderProjectItem = (project) => `
    <article class="admin-item">
      <div><strong>${project.name}</strong><p>${project.clientName || "Client unknown"}</p></div>
      <div class="admin-actions">
        <button type="button" class="btn btn-secondary" data-action="edit" data-resource="project" data-id="${project._id}">Edit</button>
        <button type="button" class="btn btn-danger" data-action="delete" data-resource="project" data-id="${project._id}">Delete</button>
      </div>
    </article>
  `;

  const renderTeamItem = (member) => `
    <article class="admin-item">
      <div><strong>${member.name}</strong><p>${member.designation || "Team member"}</p></div>
      <div class="admin-actions">
        <button type="button" class="btn btn-secondary" data-action="edit" data-resource="team" data-id="${member._id}">Edit</button>
        <button type="button" class="btn btn-danger" data-action="delete" data-resource="team" data-id="${member._id}">Delete</button>
      </div>
    </article>
  `;

  const clearForm = (form) => {
    form.reset();
    form.querySelector("input[name=id]").value = "";
  };

  const handleSubmit = (form, path) => async (event) => {
    event.preventDefault();
    const data = {};
    new FormData(form).forEach((value, key) => {
      if (key === "id") return;
      if (key === "technologyUsed" || key === "images") {
        data[key] = value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      } else {
        data[key] = value;
      }
    });
    const id = form.querySelector("input[name=id]").value;
    const url = `/api/v1/${path}${id ? `/${id}` : ""}`;
    try {
      await fetchJson(url, {
        method: id ? "PUT" : "POST",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      clearForm(form);
      loadAll();
      alert("Saved successfully.");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleActionClick = async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    const resource = button.dataset.resource;
    const id = button.dataset.id;
    if (action === "delete") {
      const path = resource === "job" ? "careers" : resource === "blog" ? "blogs" : resource === "service" ? "services" : resource === "project" ? "projects" : "team";
      await handleResourceDelete(`/api/v1/${path}/${id}`, loadAll);
      return;
    }

    if (action === "edit") {
      const path = resource === "job" ? "careers" : resource === "blog" ? "blogs" : resource === "service" ? "services" : resource === "project" ? "projects" : "team";
      try {
        const result = await fetchJson(`/api/v1/${path}/${id}`, { headers: authHeaders() });
        const item = result.data;
        if (resource === "job") enableEdit(jobForm, item);
        if (resource === "blog") enableEdit(blogForm, item);
        if (resource === "service") enableEdit(serviceForm, item);
        if (resource === "project") {
          if (item.technologyUsed) item.technologyUsed = item.technologyUsed.join(", ");
          if (item.images) item.images = item.images.join(", ");
          enableEdit(projectForm, item);
        }
        if (resource === "team") enableEdit(teamForm, item);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  jobForm.addEventListener("submit", handleSubmit(jobForm, "careers"));
  blogForm.addEventListener("submit", handleSubmit(blogForm, "blogs"));
  serviceForm.addEventListener("submit", handleSubmit(serviceForm, "services"));
  projectForm.addEventListener("submit", handleSubmit(projectForm, "projects"));
  teamForm.addEventListener("submit", handleSubmit(teamForm, "team"));

  document.body.addEventListener("click", handleActionClick);
  loadAll();
}
