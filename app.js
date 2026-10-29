const shells = document.querySelectorAll('.video-shell');

shells.forEach((shell) => {
  const video = shell.querySelector('video');
  const button = shell.querySelector('.play-btn');
  const label = shell.querySelector('.play-label');

  const toggleVideo = () => {
    if (video.paused) {
      document.querySelectorAll('video').forEach((other) => {
        if (other !== video) {
          other.pause();
          other.closest('.video-shell').classList.remove('is-playing');
          other.closest('.video-shell').querySelector('.play-label').textContent = 'PLAY FILM';
        }
      });
      video.play();
      shell.classList.add('is-playing');
      label.textContent = 'PAUSE';
    } else {
      video.pause();
      shell.classList.remove('is-playing');
      label.textContent = 'PLAY FILM';
    }
  };

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleVideo();
  });
  video.addEventListener('click', toggleVideo);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      const video = entry.target.querySelector('video');
      if (!video.paused) {
        video.pause();
        entry.target.querySelector('.video-shell').classList.remove('is-playing');
        entry.target.querySelector('.play-label').textContent = 'PLAY FILM';
      }
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.demo-card').forEach((card) => observer.observe(card));
