  window.addEventListener('DOMContentLoaded', (event) => {
      const alerts = document.querySelectorAll('.fade-alert');
      alerts.forEach(alert => {
          setTimeout(() => {
              alert.style.display = 'none';
          }, 2500);
      });
  });


