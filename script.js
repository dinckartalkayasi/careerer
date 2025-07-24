// Tab değişimi fonksiyonu
function showContent(id) {
    var contents = document.getElementsByClassName('tabcontent');
    var tabs = document.getElementsByClassName('tablink');
    for (var i = 0; i < contents.length; i++) {
      contents[i].style.display = 'none';
      tabs[i].classList.remove('active');
    }
    document.getElementById(id).style.display = 'block';
    event.currentTarget.classList.add('active');
  }
  
  // Dil değiştirme fonksiyonu
  function setLanguage(lang) {
    alert('Language switched to: ' + lang.toUpperCase());
    // İleride burada sayfa dilini değiştiririz
  }
  
  // Populate sectors
  function populateSectors(sectorId) {
    const sectorSelect = document.getElementById(sectorId);
    sectorSelect.innerHTML = '<option value="">Select Sector</option>';
    for (let sector in jobData) {
      const option = document.createElement('option');
      option.value = sector;
      option.textContent = sector;
      sectorSelect.appendChild(option);
    }
  }
  
  // Populate jobs based on sector
  function populateJobs(sectorId, jobId) {
    const sectorSelect = document.getElementById(sectorId);
    const jobSelect = document.getElementById(jobId);
    jobSelect.innerHTML = '<option value="">Select Job</option>';
    const selectedSector = sectorSelect.value;
    if (selectedSector && jobData[selectedSector]) {
      for (let job in jobData[selectedSector]) {
        const option = document.createElement('option');
        option.value = job;
        option.textContent = job;
        jobSelect.appendChild(option);
      }
    }
  }
  
  // Extract minimum experience year
  function extractYears(text) {
    if (!text) return 0;
    const match = text.match(/(\d+)-(\d+)/); // Range like 1-3 years
    if (match) {
      return parseInt(match[1]);
    } else {
      const singleMatch = text.match(/\d+/); // Single number like 2 years
      return singleMatch ? parseInt(singleMatch[0]) : 0;
    }
  }
  
  // Compare jobs
  function compareJobs() {
    const sector1 = document.getElementById('sector1').value;
    const job1 = document.getElementById('job1').value;
    const sector2 = document.getElementById('sector2').value;
    const job2 = document.getElementById('job2').value;
  
    if (!sector1 || !job1 || !sector2 || !job2) {
      alert('Please select both jobs to compare!');
      return;
    }
  
    const jobInfo1 = jobData[sector1][job1];
    const jobInfo2 = jobData[sector2][job2];
  
    // YARDIMCI FONKSİYONLAR
    function extractYears(text) {
      if (!text) return 0;
      const match = text.match(/(\d+)-?(\d+)?/);
      if (match) return parseInt(match[1]);
      return 0;
    }
  
    function countItems(text) {
      if (!text) return 0;
      return text.split(',').length;
    }
  
    function extractPercentage(text) {
      if (!text) return 0;
      const match = text.match(/(\d+)%/);
      if (match) return parseInt(match[1]);
      return 0;
    }
  
    function getEducationRank(text) {
      if (!text) return 99;
      if (text.includes("PhD")) return 4;
      if (text.includes("MBA")) return 3;
      if (text.includes("Master")) return 2;
      if (text.includes("Bachelor")) return 1;
      return 99;
    }
  
    function isOptional(text) {
      if (!text) return false;
      return text.toLowerCase().includes('optional') || text.toLowerCase().includes('preferred');
    }
  
    function isLowCollaboration(text) {
      if (!text) return false;
      return text.toLowerCase().includes('low') || text.toLowerCase().includes('moderate');
    }
  
    function isNoManagement(text) {
      if (!text) return false;
      return text.toLowerCase().includes('none') || text.toLowerCase().includes('no');
    }
  
    function isFastAdvancement(text) {
      if (!text) return false;
      return text.toLowerCase().includes('fast') || text.toLowerCase().includes('rapid') || text.toLowerCase().includes('high');
    }
  
    function highlight(condition, text) {
      return condition ? `<span class="highlight">${text}</span>` : text;
    }
  
    // ALAN ALAN KIYASLAMA
    const experience1 = extractYears(jobInfo1.experience);
    const experience2 = extractYears(jobInfo2.experience);
  
    const skills1 = countItems(jobInfo1.skills);
    const skills2 = countItems(jobInfo2.skills);
  
    const education1 = getEducationRank(jobInfo1.education);
    const education2 = getEducationRank(jobInfo2.education);
  
    const certOptional1 = isOptional(jobInfo1.certifications);
    const certOptional2 = isOptional(jobInfo2.certifications);
  
    const jobOutlook1 = extractPercentage(jobInfo1.jobOutlook);
    const jobOutlook2 = extractPercentage(jobInfo2.jobOutlook);
  
    const tools1 = countItems(jobInfo1.technicalTools);
    const tools2 = countItems(jobInfo2.technicalTools);
  
    const softSkills1 = countItems(jobInfo1.softSkills);
    const softSkills2 = countItems(jobInfo2.softSkills);
  
    const remote1 = extractPercentage(jobInfo1.remoteWork);
    const remote2 = extractPercentage(jobInfo2.remoteWork);
  
    const travel1 = extractPercentage(jobInfo1.travelRequirements);
    const travel2 = extractPercentage(jobInfo2.travelRequirements);
  
    const collabLow1 = isLowCollaboration(jobInfo1.teamCollaboration);
    const collabLow2 = isLowCollaboration(jobInfo2.teamCollaboration);
  
    const managementNone1 = isNoManagement(jobInfo1.managementDuties);
    const managementNone2 = isNoManagement(jobInfo2.managementDuties);
  
    const advancementFast1 = isFastAdvancement(jobInfo1.advancementOpportunities);
    const advancementFast2 = isFastAdvancement(jobInfo2.advancementOpportunities);
  
    // HTML İÇERİKLER
    const resultDiv = document.getElementById('comparisonResult');
    resultDiv.innerHTML = `
      <div class="comparison-table">
        <div class="comparison-column">
          <h3>${job1}</h3>
          <p><strong>Responsibilities:</strong> ${jobInfo1.responsibilities}</p>
          <p><strong>Skills:</strong> ${highlight(skills1 < skills2, jobInfo1.skills)}</p>
          <p><strong>Education:</strong> ${highlight(education1 < education2, jobInfo1.education)}</p>
          <p><strong>Certifications:</strong> ${highlight(certOptional1, jobInfo1.certifications)}</p>
          <p><strong>Experience:</strong> ${highlight(experience1 < experience2, jobInfo1.experience)}</p>
          <p><strong>Job Outlook:</strong> ${highlight(jobOutlook1 > jobOutlook2, jobInfo1.jobOutlook)}</p>
          <p><strong>Industry Focus:</strong> ${jobInfo1.industryFocus}</p>
          <p><strong>Work Environment:</strong> ${jobInfo1.workEnvironment}</p>
          <p><strong>Career Path:</strong> ${jobInfo1.careerPath}</p>
          <p><strong>KPIs:</strong> ${jobInfo1.kpis}</p>
          <p><strong>Technical Tools:</strong> ${highlight(tools1 < tools2, jobInfo1.technicalTools)}</p>
          <p><strong>Soft Skills:</strong> ${highlight(softSkills1 < softSkills2, jobInfo1.softSkills)}</p>
          <p><strong>Remote Work:</strong> ${highlight(remote1 > remote2, jobInfo1.remoteWork)}</p>
          <p><strong>Travel Requirements:</strong> ${highlight(travel1 < travel2, jobInfo1.travelRequirements)}</p>
          <p><strong>Team Collaboration:</strong> ${highlight(collabLow1, jobInfo1.teamCollaboration)}</p>
          <p><strong>Management Duties:</strong> ${highlight(managementNone1, jobInfo1.managementDuties)}</p>
          <p><strong>Advancement Opportunities:</strong> ${highlight(advancementFast1, jobInfo1.advancementOpportunities)}</p>
        </div>
  
        <div class="comparison-column">
          <h3>${job2}</h3>
          <p><strong>Responsibilities:</strong> ${jobInfo2.responsibilities}</p>
          <p><strong>Skills:</strong> ${highlight(skills2 < skills1, jobInfo2.skills)}</p>
          <p><strong>Education:</strong> ${highlight(education2 < education1, jobInfo2.education)}</p>
          <p><strong>Certifications:</strong> ${highlight(certOptional2, jobInfo2.certifications)}</p>
          <p><strong>Experience:</strong> ${highlight(experience2 < experience1, jobInfo2.experience)}</p>
          <p><strong>Job Outlook:</strong> ${highlight(jobOutlook2 > jobOutlook1, jobInfo2.jobOutlook)}</p>
          <p><strong>Industry Focus:</strong> ${jobInfo2.industryFocus}</p>
          <p><strong>Work Environment:</strong> ${jobInfo2.workEnvironment}</p>
          <p><strong>Career Path:</strong> ${jobInfo2.careerPath}</p>
          <p><strong>KPIs:</strong> ${jobInfo2.kpis}</p>
          <p><strong>Technical Tools:</strong> ${highlight(tools2 < tools1, jobInfo2.technicalTools)}</p>
          <p><strong>Soft Skills:</strong> ${highlight(softSkills2 < softSkills1, jobInfo2.softSkills)}</p>
          <p><strong>Remote Work:</strong> ${highlight(remote2 > remote1, jobInfo2.remoteWork)}</p>
          <p><strong>Travel Requirements:</strong> ${highlight(travel2 < travel1, jobInfo2.travelRequirements)}</p>
          <p><strong>Team Collaboration:</strong> ${highlight(collabLow2, jobInfo2.teamCollaboration)}</p>
          <p><strong>Management Duties:</strong> ${highlight(managementNone2, jobInfo2.managementDuties)}</p>
          <p><strong>Advancement Opportunities:</strong> ${highlight(advancementFast2, jobInfo2.advancementOpportunities)}</p>
        </div>
      </div>
    `;

    // Yavaş animasyon efekti
setTimeout(() => {
    document.querySelector('.comparison-table').classList.add('show');
  }, 100);  

  document.querySelector('.favorite-button').style.display = 'block';
  document.querySelector('.pdf-button').style.display = 'block';
  document.querySelector('.saved-button-link').style.display = 'block';
  

  }  

  function saveFavorite() {
    const sector1 = document.getElementById('sector1').value;
    const job1 = document.getElementById('job1').value;
    const sector2 = document.getElementById('sector2').value;
    const job2 = document.getElementById('job2').value;
  
    if (!sector1 || !job1 || !sector2 || !job2) {
      alert('Please select both jobs to save comparison!');
      return;
    }
  
    const favorite = {
      job1: job1,
      sector1: sector1,
      job2: job2,
      sector2: sector2,
      timestamp: new Date().toISOString()
    };
  
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(favorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  
    alert('Comparison saved successfully!');
  }
  

  
  // Show tabs (only for index.html)
  function showContent(id) {
    var contents = document.getElementsByClassName('tabcontent');
    var tabs = document.getElementsByClassName('tablink');
    for (var i = 0; i < contents.length; i++) {
      contents[i].style.display = 'none';
      tabs[i].classList.remove('active');
    }
    document.getElementById(id).style.display = 'block';
    event.currentTarget.classList.add('active');
  }
  
  // Language switcher
  function setLanguage(lang) {
    alert('Language switched to: ' + lang.toUpperCase());
  }
  
  window.onload = function() {
    // Eğer sektör ve iş seçimi varsa onları doldur
    if (document.getElementById('sector1') && document.getElementById('sector2')) {
      populateSectors('sector1');
      populateSectors('sector2');
    }
  
    // Eğer jobcomparison divi varsa onu göster
    if (document.getElementById('jobcomparison')) {
      document.getElementById('jobcomparison').style.display = 'block';
    }
  
    // Eğer localStorage'da selectedFavorite varsa onu kullan
    const selectedFavorite = JSON.parse(localStorage.getItem('selectedFavorite'));
    if (selectedFavorite) {
      setTimeout(() => {
        document.getElementById('sector1').value = selectedFavorite.sector1;
        populateJobs('sector1', 'job1');
        document.getElementById('sector2').value = selectedFavorite.sector2;
        populateJobs('sector2', 'job2');
  
        setTimeout(() => {
          document.getElementById('job1').value = selectedFavorite.job1;
          document.getElementById('job2').value = selectedFavorite.job2;
          compareJobs();
          localStorage.removeItem('selectedFavorite'); // Favori kullanıldıktan sonra temizleniyor
        }, 300);
      }, 300);
    }
  };
  
  function downloadPDF() {
    const element = document.getElementById('comparisonResult');
    if (!element.innerHTML.trim()) {
      alert("Please compare jobs first!");
      return;
    }
    
    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: 'job-comparison.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      })
      .save();
  }
  
  function openSaved() {
    const modal = document.getElementById('savedModal');
    const savedList = document.getElementById('savedList');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    savedList.innerHTML = '';
  
    if (favorites.length === 0) {
      savedList.innerHTML = `<p style="text-align:center; font-size:18px; color:gray;">You have no saved comparisons yet.</p>`;
    } else {
      favorites.forEach((fav, index) => {
        const div = document.createElement('div');
        div.style.padding = '10px 0';
        div.innerHTML = `
          <strong>Comparison ${index + 1}</strong><br>
          First Job: ${fav.job1} (${fav.sector1})<br>
          Second Job: ${fav.job2} (${fav.sector2})<br>
          <hr>
        `;
        savedList.appendChild(div);
      });
    }
  
    modal.style.display = 'block';
  }
  
  function closeSaved() {
    document.getElementById('savedModal').style.display = 'none';
  }

  function showFavoriteLoadedMessage() {
    const msg = document.createElement('div');
    msg.className = 'favorite-loaded-message';
    msg.innerText = 'This comparison was loaded from your favorites!';
    document.querySelector('.solutions').prepend(msg);
    setTimeout(() => {
      msg.remove();
    }, 4000); // 4 saniyede kaybolur
  }
  
  