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
  
  // Sayfa yüklendiğinde ilk sekmeyi aç
  window.onload = function() {
    document.getElementById('jobcomparison').style.display = 'block';
  };
  