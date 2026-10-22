<template>
  <div class="resume-container">
    <div class="resume-header">
      <div class="name-section">
        <h1>OSCAR</h1>
        <h1>MCINTOSH</h1>
      </div>
      <div class="contact-section">
        <h3>CONTACT</h3>
        <ul>
          <li><i class="ri-mail-line"></i> oscar_mcintosh@msn.com</li>
          <li><i class="ri-phone-line"></i> 402.440.4815</li>
          <li><i class="ri-map-pin-line"></i> 3600 Saline Cir, Lincoln, NE 68504</li>
        </ul>
      </div>
    </div>

    <div class="resume-content">
      <div class="left-column">
        <div class="section">
          <h3>Education</h3>
          <div class="education-item">
            <p class="year">2019</p>
            <h4>Bachelor of Science - Management</h4>
            <p>Bellevue University</p>
            <p>Bellevue, NE</p>
          </div>
        </div>

        <div class="section">
          <h3>Skills</h3>
          <ul class="skills-list">           
            <li>SQL</li>
            <li>Snowflake</li>
            <li>Git Version Control</li>
            <li>Project Management</li>
            <li>Client Communication</li>
          </ul>
        </div>
        <div class="section">
          <h3>Portfolio</h3>
          <ul class="skills-list">           
            <li>https://oscar-mcintosh-c5f0.web.app/</li>            
          </ul>
        </div>
      </div>

      <div class="right-column">
        <div class="section">
          <h3>PROFESSIONAL SUMMARY</h3>
          <p>
I'm a Data Analyst, based in Lincoln, Nebraska, with a passion for transforming complex data into actionable insights. With two years of hands-on experience, I specialize in working with large datasets, writing complex SQL queries, and leveraging Snowflake to extract meaningful patterns and drive data-driven decision-making.          </p>
        </div>

        <div class="section">
          <h3>WORK EXPERIENCE</h3>
          <div class="experience-item">
            <div class="experience-header">
              <h4>Data Analyst</h4>
              <p class="company">Bass Pro Shops</p>
              <p class="date">6/1/24 - Present</p>
            </div>
            <ul>
              <li>Work with large datasets using SQL to analyze and interpret business data.</li>
              <li>Creating data visualizations and reports to support business decisions.</li>
              <li>Collaborating with cross-functional teams to identify data-driven solutions.</li>
            </ul>
          </div>

          <div class="experience-item">
            <div class="experience-header">
              <h4>Senior Specialist</h4>
              <p class="company">Caital One</p>
              <p class="date">2005 - 2023</p>
            </div>
            <ul>
              <li>Conducts scheduled and random audits to ensure compliance with all applicable laws  and regulations and escalate/mitigate as necessary.</li>
              <li> Identifies opportunity areas and implements strategies in collaboration with other stakeholders.</li>
              <li>Provided sub-functional leadership to a team of associates,  coaching, mentoring.</li>              
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="download-container">
      <button @click="downloadPDF" class="download-pdf-button">
        <i class="ri-download-line"></i> Download PDF
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  name: "resume",
});

const downloadPDF = async () => {
  if (process.client) {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.querySelector('.resume-container');
    const opt = {
      margin: 1,
      filename: 'Oscar_McIntosh_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  }
};
</script>

<style scoped>
.resume-container {
  max-width: 1200px;
  margin: 4rem auto;
  padding: 2rem;
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.resume-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
}

.name-section h1 {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  color: #333;
}

.contact-section h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.contact-section ul {
  list-style: none;
  padding: 0;
}

.contact-section ul li {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #666;
}

.contact-section ul li i {
  margin-right: 0.5rem;
  color: var(--accent-color);
}

.resume-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.section {
  margin-bottom: 2rem;
}

.section h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  border-bottom: 2px solid var(--accent-color);
  padding-bottom: 0.5rem;
}

.skills-list {
  list-style: none;
  padding: 0;
}

.skills-list li {
  margin-bottom: 0.5rem;
  color: #666;
}

.experience-item {
  margin-bottom: 1.5rem;
}

.experience-header {
  margin-bottom: 1rem;
}

.experience-header h4 {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
}

.experience-header .company {
  color: var(--accent-color);
  margin: 0.25rem 0;
}

.experience-header .date {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.experience-item ul {
  padding-left: 1.2rem;
  color: #666;
}

.experience-item ul li {
  margin-bottom: 0.5rem;
}

.education-item {
  margin-bottom: 1.5rem;
}

.education-item .year {
  color: var(--accent-color);
  margin: 0;
}

.education-item h4 {
  margin: 0.25rem 0;
  color: #333;
}

.education-item p {
  margin: 0.25rem 0;
  color: #666;
}

@media (max-width: 768px) {
  .resume-header {
    flex-direction: column;
    gap: 2rem;
  }

  .resume-content {
    grid-template-columns: 1fr;
  }
}

.download-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #f0f0f0;
}

.download-pdf-button {
  padding: 12px 24px;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.download-pdf-button:hover {
  background: #333;
  transform: translateY(-2px);
}

.download-pdf-button i {
  font-size: 18px;
}
</style> 