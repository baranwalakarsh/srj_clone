const jobListElement = document.getElementById("jobList");
const jobSelect = document.getElementById("appliedJob");
const jobApplicationForm = document.querySelector(".job-application-form");
const careerStatus = document.querySelector(".career-status");

const renderJobs = (jobs) => {
  if (!jobs.length) {
    jobListElement.innerHTML = "<p>No jobs available at the moment. Check back soon.</p>";
    return;
  }

  jobListElement.innerHTML = jobs
    .map(
      (job) => `
        <article class="mini-card">
          <div><h3>${job.title}</h3><p>${job.department || "General"} • ${job.location || "Remote"}</p></div>
          <p>${job.description}</p>
        </article>
      `
    )
    .join("");
};

const loadJobs = async () => {
  try {
    const response = await fetch("/api/v1/careers");
    const result = await response.json();
    if (!result.success) throw new Error(result.message || "Unable to load jobs");
    const jobs = result.data || [];
    renderJobs(jobs);
    jobSelect.innerHTML = `<option value="">Select a job</option>${jobs.map((job) => `<option value="${job._id}">${job.title} — ${job.location || "Remote"}</option>`).join("")}`;
  } catch (error) {
    jobListElement.innerHTML = `<p class="text-error">${error.message}</p>`;
  }
};

if (jobApplicationForm) {
  jobApplicationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    careerStatus.textContent = "Submitting your application...";

    const formData = new FormData(jobApplicationForm);
    try {
      const response = await fetch("/api/v1/applications", {
        method: "POST",
        body: formData
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Application failed");
      }
      careerStatus.textContent = "Application submitted successfully. We will contact you soon.";
      jobApplicationForm.reset();
    } catch (error) {
      careerStatus.textContent = `Error: ${error.message}`;
    }
  });
}

loadJobs();
