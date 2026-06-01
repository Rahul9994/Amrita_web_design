// ===== CUSTOM CURSOR =====
document.addEventListener('DOMContentLoaded', () => {
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const outline = document.createElement('div');
  outline.className = 'cursor-outline';
  document.body.appendChild(dot);
  document.body.appendChild(outline);

  let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX - 4 + 'px';
    dot.style.top = mouseY - 4 + 'px';
  });

  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.left = outlineX - 20 + 'px';
    outline.style.top = outlineY - 20 + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const interactives = document.querySelectorAll('a, button, .card, .quiz-option, .faq-question, .gallery-item, .resource-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hover'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
  });
});

// ===== PARTICLE SYSTEM =====
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 30 : 80;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 215, 0, ${0.1 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
});

// ===== SCROLL REVEAL =====
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
});

// ===== NAVBAR SCROLL EFFECT =====
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
});

// ===== PROGRESS BAR =====
document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    });
  }
});

// ===== MOBILE MENU =====
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
});

// ===== THEME TOGGLE =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.theme-toggle');
  const body = document.body;
  if (toggle) {
    toggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const isLight = body.classList.contains('light-mode');
      toggle.innerHTML = isLight ? '<i class=\'fas fa-moon\'></i>' : '<i class=\'fas fa-sun\'></i>';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
    // Load saved theme
    if (localStorage.getItem('theme') === 'light') {
      body.classList.add('light-mode');
      toggle.innerHTML = '<i class=\'fas fa-moon\'></i>';
    }
  }
});

// ===== LOADING SCREEN =====
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 2200);
  }
});

// ===== FAQ ACCORDION =====
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });
});

// ===== QUIZ FUNCTIONALITY =====
const quizData = {
  questions: [
    {
      question: "What excites you the most?",
      options: [
        { text: "Building apps and solving coding challenges", type: "tech" },
        { text: "Designing posters, videos, and creative content", type: "creative" },
        { text: "Organizing events and managing people", type: "management" },
        { text: "Robots, drones, and hardware projects", type: "robotics" }
      ]
    },
    {
      question: "How do you prefer to spend your weekends?",
      options: [
        { text: "Hackathons and coding competitions", type: "tech" },
        { text: "Photography, art, or content creation", type: "creative" },
        { text: "Planning and hosting college events", type: "management" },
        { text: "Working on electronics and circuits", type: "robotics" }
      ]
    },
    {
      question: "What's your dream project?",
      options: [
        { text: "A full-stack web application", type: "tech" },
        { text: "A viral social media campaign", type: "creative" },
        { text: "A grand college fest with 1000+ attendees", type: "management" },
        { text: "An autonomous robot or drone", type: "robotics" }
      ]
    },
    {
      question: "Which skill do you want to develop?",
      options: [
        { text: "AI, ML, and Data Science", type: "tech" },
        { text: "UI/UX and Graphic Design", type: "creative" },
        { text: "Leadership and Public Speaking", type: "management" },
        { text: "Embedded Systems and IoT", type: "robotics" }
      ]
    }
  ],
  results: {
    tech: {
      club: "Chakravyuha Technical Club",
      desc: "You're a born coder! Chakravyuha is the perfect place for you to grow your technical skills through hackathons, workshops, and real-world projects. 350+ members strong!"
    },
    creative: {
      club: "Creative Arts Club",
      desc: "Your creativity is your superpower! Join the Creative Arts Club to design, create, and bring your artistic vision to life through various media."
    },
    management: {
      club: "Student Council / Event Management",
      desc: "You're a natural leader! The Student Council and event management teams need people like you to organize amazing college events and fests."
    },
    robotics: {
      club: "Robotics & IoT Club",
      desc: "You love making things move! The Robotics Club is where you'll build drones, robots, and IoT devices that amaze everyone."
    }
  }
};

let currentQuestion = 0;
let quizScores = { tech: 0, creative: 0, management: 0, robotics: 0 };

function startQuiz() {
  currentQuestion = 0;
  quizScores = { tech: 0, creative: 0, management: 0, robotics: 0 };
  document.querySelector('.quiz-start').style.display = 'none';
  document.querySelector('.quiz-questions').style.display = 'block';
  document.querySelector('.quiz-result').classList.remove('active');
  showQuestion();
}

function showQuestion() {
  const questions = document.querySelectorAll('.quiz-question');
  questions.forEach((q, i) => {
    q.classList.toggle('active', i === currentQuestion);
  });
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
  document.querySelector('.quiz-progress-bar').style.width = progress + '%';
}

function selectOption(type) {
  quizScores[type]++;
  currentQuestion++;
  if (currentQuestion < quizData.questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.querySelector('.quiz-questions').style.display = 'none';
  const result = document.querySelector('.quiz-result');
  result.classList.add('active');

  let maxScore = 0;
  let winner = 'tech';
  for (const [type, score] of Object.entries(quizScores)) {
    if (score > maxScore) {
      maxScore = score;
      winner = type;
    }
  }

  const data = quizData.results[winner];
  result.querySelector('.result-club').textContent = data.club;
  result.querySelector('.result-desc').textContent = data.desc;
}

function restartQuiz() {
  document.querySelector('.quiz-result').classList.remove('active');
  document.querySelector('.quiz-start').style.display = 'block';
}

// ===== COUNTER ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current) + suffix;
            }
          }, 16);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(counter);
  });
});

// ===== TYPING EFFECT =====
document.addEventListener('DOMContentLoaded', () => {
  const typingElements = document.querySelectorAll('.typing-text');
  typingElements.forEach(el => {
    const text = el.getAttribute('data-text');
    if (!text) return;
    let i = 0;
    el.textContent = '';
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
      }
    }
    setTimeout(type, 500);
  });
});

// ===== PARALLAX SCROLL =====
document.addEventListener('DOMContentLoaded', () => {
  const parallaxImages = document.querySelectorAll('.parallax-scroll');
  window.addEventListener('scroll', () => {
    parallaxImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      const speed = 0.5;
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        img.style.transform = `translateY(${(window.innerHeight - rect.top) * speed * 0.1}px)`;
      }
    });
  });
});
