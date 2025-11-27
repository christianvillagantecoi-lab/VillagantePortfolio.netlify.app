/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')
function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY
  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
});
sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 
sr.reveal('.chat-container', { interval: 200 });
sr.reveal('.resume-card, .timeline-item', { interval: 100 });
document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.querySelector('.home');
    if (!homeSection) return;
    const bgImage = homeSection.querySelector('.home__bg');
    const video = homeSection.querySelector('.home__video');
    if ('ontouchstart' in window) return;
    const bgSpeed = 0.2; 
    const videoSpeed = 0.5; 
    let ticking = false;
    function updateParallax() {
        const scrollY = window.scrollY;
        if (bgImage) {
            bgImage.style.transform = `translateY(${scrollY * bgSpeed}px)`;
        }
        if (video) {
            video.style.transform = `translateY(${scrollY * videoSpeed}px)`;
        }
        ticking = false;
    }
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
    updateParallax();
});

/*===== ABOUT SECTION SCROLL COLOR CHANGE =====*/
(function(){
  const about = document.querySelector('.about');
  if(!about) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) about.classList.add('show');
      else about.classList.remove('show');
    });
  }, {
    root: null,
    rootMargin: '0px 0px -70% 0px',
    threshold: 0
  });
  io.observe(about);
}());

/*===== TYPING ANIMATION =====*/
(function(){
  const roles = ['Web Designer', 'Programmer', 'Video Editor'];
  const typingElement = document.getElementById('typing-animation');
  if(!typingElement) return;
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseBetweenRoles = 1000;
  function type(){
    const currentRole = roles[roleIndex];
    if(isDeleting){
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      if(charIndex === 0){
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, pauseBetweenRoles);
        return;
      }
      setTimeout(type, deletingSpeed);
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if(charIndex === currentRole.length){
        isDeleting = true;
        setTimeout(type, pauseBetweenRoles);
        return;
      }
      setTimeout(type, typingSpeed);
    }
  }
  type();
})();

/* ===== CONTACT EMAIL VALIDATION ===== */
(function(){
  const form = document.querySelector('.contact__form');
  if(!form) return;
  const emailInput = form.querySelector('input[placeholder="Email"], input[type="email"], input[name="email"]');
  const sendBtn = form.querySelector('.contact__button');
  function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function showError(input, message){
    input.classList.add('input-error');
    const next = input.nextElementSibling;
    if(next && next.classList && next.classList.contains('contact__error')) next.remove();
    const err = document.createElement('span');
    err.className = 'contact__error';
    err.textContent = message;
    input.insertAdjacentElement('afterend', err);
    input.focus();
  }
  function clearError(input){
    input.classList.remove('input-error');
    const next = input.nextElementSibling;
    if(next && next.classList && next.classList.contains('contact__error')) next.remove();
  }
  if(sendBtn && emailInput){
    sendBtn.addEventListener('click', function(e){
      const email = emailInput.value.trim();
      if(!validateEmail(email)){
        showError(emailInput, 'Please enter a valid email (e.g. you@example.com)');
        return;
      }
      clearError(emailInput);
    });
  }
})();

/*===== WORK MODAL =====*/
(function(){
  const modal = document.getElementById('work-modal');
  if(!modal) return;
  const modalImg = document.getElementById('work-modal-img');
  const modalTitle = document.getElementById('work-modal-title');
  const modalDescription = document.getElementById('work-modal-description');
  const modalButton = document.getElementById('work-modal-button');
  const modalClose = document.getElementById('work-modal-close');
  const workImages = document.querySelectorAll('.work__img');
  function openModal(imgSrc, title, description, githubUrl) {
    if(modalImg) modalImg.src = imgSrc;
    if(modalTitle) modalTitle.textContent = title;
    if(modalDescription) modalDescription.textContent = description;
    if(modalButton) modalButton.href = githubUrl;
    modal.classList.add('show-modal');
    document.body.classList.add('modal-is-open');
  }
  function closeModal(){
    modal.classList.remove('show-modal');
    setTimeout(() => {
      document.body.classList.remove('modal-is-open');
    }, 400);
  }
  workImages.forEach(workImg => {
    workImg.addEventListener('click', function(e){
      e.preventDefault();
      const imgSrc = this.querySelector('img').src;
      const title = this.dataset.title || "No Title";
      const description = this.dataset.description || "No description provided.";
      const githubUrl = this.dataset.github || "#";
      openModal(imgSrc, title, description, githubUrl);
    });
  });
  if(modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if(e.target === modal){
      closeModal();
    }
  });
})();
/*
==============================================
PAGE-SPECIFIC & CONSOLIDATED SCRIPTS
==============================================
*/
document.addEventListener('DOMContentLoaded', () => {
    /*
    ==============================================
    INDEX.HTML SCRIPTS
    ==============================================
    */

    const typewriterElement = document.querySelector('.home__title-typing');
    if (typewriterElement) {
        /*===== TYPEWRITER EFFECT =====*/
        const words = ["a Programmer", "a Web Designer", "a Video Editor"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        const type = async () => {
            const currentWord = words[wordIndex];
            const typeSpeed = isDeleting ? 100 : 150;
            typewriterElement.textContent = isDeleting
                ? currentWord.substring(0, charIndex--)
                : currentWord.substring(0, charIndex++);
            if (!isDeleting && charIndex === currentWord.length + 1) {
                isDeleting = true;
                await sleep(1500);
            } else if (isDeleting && charIndex === -1) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                await sleep(500);
            }
            setTimeout(type, typeSpeed);
        };
        type();

        /*===== SCROLL FADE AUDIO/CHAT =====*/
        const music = document.getElementById('background-music');
        const chatWidget = document.getElementById('chat-widget');
        if (music && chatWidget) {
            const initialVolume = 0.3;
            music.volume = initialVolume;
            let playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn("Autoplay was prevented. Waiting for user interaction to start music.", error);
                    const startOnInteraction = () => {
                        music.play();
                        window.removeEventListener('scroll', startOnInteraction);
                        window.removeEventListener('click', startOnInteraction);
                    };
                    window.addEventListener('scroll', startOnInteraction);
                    window.addEventListener('click', startOnInteraction);
                });
            };
            window.addEventListener('scroll', () => {
                const scrollPosition = window.scrollY;
                const fadeOutDistance = 400;
                let fadeValue = 1 - (scrollPosition / fadeOutDistance);
                fadeValue = Math.max(0, Math.min(1, fadeValue));
                music.volume = fadeValue * initialVolume;
                chatWidget.style.opacity = fadeValue;
            });
        }
    }
    /*
    ==============================================
    CHAT.HTML SCRIPTS
    ==============================================
    */
    const chatSection = document.querySelector('.chat-section');
    if (chatSection) {
        const bg = document.querySelector('.chat-bg');
        if (bg && !('ontouchstart' in window)) {
            const speed = 0.18;
            let ticking = false;
            const update = () => {
                const rect = chatSection.getBoundingClientRect();
                const offset = -rect.top * speed;
                bg.style.transform = `translateY(${offset}px)`;
                ticking = false;
            }
            const onScroll = () => {
                if (!ticking) {
                    requestAnimationFrame(update);
                    ticking = true;
                }
            }
            window.addEventListener('scroll', onScroll, { passive: true });
        }
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const chatSendButton = document.getElementById('chat-send-button');
        if (chatMessages && chatInput && chatSendButton) {
            const responses = {
                "hello": "Hello! I'm an AI assistant ready to answer your questions about Christian. What would you like to know?",
                "hi": "Hi there! Feel free to ask me anything about Christian Villagante.",
                "skill": "Christian's technical skills include: Front-End (HTML5, CSS3, Tailwind CSS, JavaScript ES6+), Design (UI/UX Prototyping in Figma, Responsive Design), and Tools (Git, GitHub, SQL Fundamentals).",
                "talent": "Beyond his technical skills, Christian is a creative problem-solver and a quick learner. He also has a talent for video editing, which complements his eye for design and visual storytelling.",
                "education": "Christian is a proactive 3rd-year BSIT student at Philippine Christian University (PCU).",
                "project": "Christian has developed a Personal Portfolio Website, a prototype for a PCU Coursework Management System, and a Simple To-Do List Application. You can see some of his work in the 'Work' section of this site.",
                "contact": "You can reach Christian via the contact form on this website. He is based in Metro Manila, Philippines.",
                "from": "Christian is from Metro Manila, Philippines.",
                "language": "Christian speaks English and Filipino (Tagalog).",
                "goal": "Christian is eager to contribute his technical skills and innovative solutions to real-world projects, with a strong focus on front-end development and creating great user experiences.",
                "achievement": "While Christian is constantly learning and growing, one of his proudest achievements so far is successfully developing his Personal Portfolio Website from scratch. It allowed him to apply various front-end technologies and design principles, showcasing his skills and dedication to web development.",
                "who is christian": "Christian A. Villagante is a 3rd-year BSIT student and an aspiring Web Designer and Developer with a strong focus on front-end development.",
                "hobbies": "In his free time, Christian enjoys exploring new web technologies, working on personal coding projects, and video editing. He believes in continuous learning and staying creative.",
                "experience": "As a student, Christian's primary experience comes from academic and personal projects where he has applied his front-end development and design skills. He is actively seeking internship or entry-level opportunities to gain professional experience.",
                "thank you": "You're welcome! Is there anything else you'd like to know?",
                "bye": "Goodbye! Feel free to come back if you have more questions.",
                "default": "I'm not sure I understand that question. Could you please rephrase it or ask something else about Christian Villagante's profile?",
                "good at": "Christian is particularly good at front-end web development, UI/UX design, and creating responsive web applications that provide excellent user experiences.",
                "interests": "Christian is interested in web development, UI/UX design, and exploring new technologies in the IT field.",
                "how old": "Christian is a currently a 20 years old and enthusiastic learner, and a 3rd-year BSIT student.",
                "year old": "Christian is a currently a 20 years old and enthusiastic learner, and a 3rd-year BSIT student.",
            };
            const addMessage = (text, sender) => {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message-bubble', sender === 'user' ? 'message-user' : 'message-ai');
                messageDiv.textContent = text;
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            const getAiResponse = (userInput) => {
                const lowerCaseInput = userInput.toLowerCase().trim();
                if (lowerCaseInput.includes("best achievement") || lowerCaseInput.includes("proudest accomplishment") || lowerCaseInput.includes("what's his best work")) return responses["achievement"];
                const keysToSkipForGeneralIncludes = ["hello", "hi"];
                for (const key in responses) {
                    if (!keysToSkipForGeneralIncludes.includes(key) && lowerCaseInput.includes(key.split(' ')[0])) return responses[key];
                }
                if (lowerCaseInput === "hello" || lowerCaseInput === "hi") return responses[lowerCaseInput];
                return responses["default"];
            }
            const sendMessage = () => {
                const userInput = chatInput.value.trim();
                if (userInput === "") return;
                addMessage(userInput, 'user');
                chatInput.value = '';
                setTimeout(() => addMessage(getAiResponse(userInput), 'ai'), 700);
            }
            chatSendButton.addEventListener('click', sendMessage);
            chatInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());
        }
    }
    /*
    ==============================================
    SHARED SCRIPTS (INDEX, RESUME, etc.)
    ==============================================
    */
    const animatedElements = document.querySelectorAll('.fade-up-hidden');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-up-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => observer.observe(el));
    }
});