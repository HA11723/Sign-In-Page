// DOM Elements
const signinForm = document.querySelector(".signin-form");
const signinBtn = document.querySelector(".signin-btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberCheckbox = document.getElementById("remember");

// Modern Background Animation
function createParticleEffect() {
  const particles = document.querySelector(".floating-particles");

  // Create modern geometric particles
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement("div");
    const size = Math.random() * 4 + 1;
    const isSquare = Math.random() > 0.7;

    particle.style.position = "absolute";
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.background = Math.random() > 0.5 ? "#ffd700" : "#ffed4e";
    particle.style.borderRadius = isSquare ? "0" : "50%";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animation = `modernParticleFloat ${
      8 + Math.random() * 15
    }s linear infinite`;
    particle.style.opacity = "0.8";
    particle.style.boxShadow = `0 0 ${size * 2}px ${particle.style.background}`;

    // Add rotation for squares
    if (isSquare) {
      particle.style.animation += ", modernRotate 10s linear infinite";
    }

    particles.appendChild(particle);
  }

  // Add CSS for new animations
  const modernParticleStyle = document.createElement("style");
  modernParticleStyle.textContent = `
    @keyframes modernParticleFloat {
      0% { 
        transform: translateY(0px) translateX(0px) scale(1);
        opacity: 0.8;
      }
      25% { 
        transform: translateY(-30px) translateX(20px) scale(1.2);
        opacity: 1;
      }
      50% { 
        transform: translateY(-60px) translateX(-10px) scale(0.8);
        opacity: 0.6;
      }
      75% { 
        transform: translateY(-40px) translateX(30px) scale(1.1);
        opacity: 0.9;
      }
      100% { 
        transform: translateY(0px) translateX(0px) scale(1);
        opacity: 0.8;
      }
    }
    
    @keyframes modernRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(modernParticleStyle);
}

// Form Validation and Enhancement
function validateForm() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  let isValid = true;

  // Email validation
  if (!email || !isValidEmail(email)) {
    showError(emailInput, "Please enter a valid email address");
    isValid = false;
  } else {
    removeError(emailInput);
  }

  // Password validation
  if (!password || password.length < 6) {
    showError(passwordInput, "Password must be at least 6 characters");
    isValid = false;
  } else {
    removeError(passwordInput);
  }

  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(input, message) {
  const container = input.closest(".input-container");
  let errorElement = container.querySelector(".error-message");

  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.style.color = "#ff6b6b";
    errorElement.style.fontSize = "0.8rem";
    errorElement.style.marginTop = "5px";
    errorElement.style.animation = "fadeIn 0.3s ease";
    container.appendChild(errorElement);
  }

  errorElement.textContent = message;
  input.style.borderColor = "#ff6b6b";
  input.style.boxShadow = "0 0 10px rgba(255, 107, 107, 0.3)";
}

function removeError(input) {
  const container = input.closest(".input-container");
  const errorElement = container.querySelector(".error-message");

  if (errorElement) {
    errorElement.remove();
  }

  input.style.borderColor = "rgba(255, 215, 0, 0.3)";
  input.style.boxShadow = "none";
}

// Enhanced Button Interactions
function addButtonEffects() {
  signinBtn.addEventListener("mouseenter", () => {
    signinBtn.style.transform = "translateY(-3px) scale(1.02)";
    createRippleEffect(signinBtn);
  });

  signinBtn.addEventListener("mouseleave", () => {
    signinBtn.style.transform = "translateY(0) scale(1)";
  });

  signinBtn.addEventListener("mousedown", () => {
    signinBtn.style.transform = "translateY(0) scale(0.98)";
  });

  signinBtn.addEventListener("mouseup", () => {
    signinBtn.style.transform = "translateY(-3px) scale(1.02)";
  });
}

function createRippleEffect(button) {
  const ripple = document.createElement("div");
  ripple.style.position = "absolute";
  ripple.style.borderRadius = "50%";
  ripple.style.background = "rgba(255, 255, 255, 0.3)";
  ripple.style.transform = "scale(0)";
  ripple.style.animation = "ripple 0.6s linear";
  ripple.style.left = "50%";
  ripple.style.top = "50%";
  ripple.style.width = "20px";
  ripple.style.height = "20px";
  ripple.style.marginLeft = "-10px";
  ripple.style.marginTop = "-10px";

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Form Submission with Loading State
function handleFormSubmission(e) {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  // Add loading state
  signinBtn.classList.add("loading");
  signinBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    // Success animation
    showSuccessMessage();

    // Reset form after delay
    setTimeout(() => {
      signinBtn.classList.remove("loading");
      signinBtn.disabled = false;
      signinForm.reset();
    }, 2000);
  }, 1500);
}

function showSuccessMessage() {
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid #ffd700;
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            color: #fff;
            font-family: 'Orbitron', monospace;
            font-size: 1.2rem;
            z-index: 1000;
            animation: successFadeIn 0.5s ease;
            backdrop-filter: blur(20px);
        ">
            <div style="font-size: 3rem; margin-bottom: 15px;">🎉</div>
            <div>Welcome Back!</div>
            <div style="font-size: 0.9rem; margin-top: 10px; color: #ffd700;">Authentication Successful</div>
        </div>
    `;

  document.body.appendChild(successMessage);

  setTimeout(() => {
    successMessage.remove();
  }, 3000);
}

// Enhanced Input Interactions
function addInputEffects() {
  const inputs = document.querySelectorAll(
    'input[type="email"], input[type="password"]'
  );

  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.style.transform = "scale(1.02)";
      createInputGlow(input);
    });

    input.addEventListener("blur", () => {
      input.parentElement.style.transform = "scale(1)";
    });

    input.addEventListener("input", () => {
      if (input.value.trim()) {
        input.classList.add("has-value");
      } else {
        input.classList.remove("has-value");
      }
    });
  });
}

function createInputGlow(input) {
  const glow = document.createElement("div");
  glow.style.position = "absolute";
  glow.style.top = "0";
  glow.style.left = "0";
  glow.style.right = "0";
  glow.style.bottom = "0";
  glow.style.borderRadius = "10px";
  glow.style.background =
    "radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent)";
  glow.style.animation = "inputGlow 0.5s ease";
  glow.style.pointerEvents = "none";
  glow.style.zIndex = "-1";

  input.parentElement.appendChild(glow);

  setTimeout(() => {
    glow.remove();
  }, 500);
}

// Social Button Interactions
function addSocialButtonEffects() {
  const socialButtons = document.querySelectorAll(".social-btn");

  socialButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // Add click effect
      button.style.transform = "scale(0.95)";
      setTimeout(() => {
        button.style.transform = "translateY(-2px)";
      }, 150);

      // Show social login message
      showSocialLoginMessage(button.textContent.trim());
    });
  });
}

function showSocialLoginMessage(provider) {
  const message = document.createElement("div");
  message.className = "social-message";
  message.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            border: 1px solid #ffd700;
            border-radius: 10px;
            padding: 15px 20px;
            color: #fff;
            font-family: 'Rajdhani', sans-serif;
            font-size: 0.9rem;
            z-index: 1000;
            animation: slideInRight 0.5s ease;
            backdrop-filter: blur(20px);
        ">
            <span style="color: #ffd700;">${provider}</span> authentication initiated...
        </div>
    `;

  document.body.appendChild(message);

  setTimeout(() => {
    message.style.animation = "slideOutRight 0.5s ease";
    setTimeout(() => {
      message.remove();
    }, 500);
  }, 3000);
}

// Enhanced Background Effects
function addMouseTracking() {
  document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Move background elements based on mouse position
    const energyWaves = document.querySelector(".energy-waves");
    const goldenGrid = document.querySelector(".golden-grid");

    if (energyWaves) {
      energyWaves.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    }

    if (goldenGrid) {
      goldenGrid.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
    }
  });
}

// Keyboard Navigation Enhancement
function addKeyboardNavigation() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && document.activeElement.tagName === "INPUT") {
      const inputs = Array.from(document.querySelectorAll("input"));
      const currentIndex = inputs.indexOf(document.activeElement);

      if (currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
      } else {
        signinBtn.click();
      }
    }
  });
}

// Performance Optimization
function optimizeAnimations() {
  // Reduce motion for users who prefer it
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.body.style.setProperty("--animation-duration", "0.1s");
  }

  // Pause animations when tab is not visible
  document.addEventListener("visibilitychange", () => {
    const animations = document.querySelectorAll("*");
    animations.forEach((element) => {
      if (document.hidden) {
        element.style.animationPlayState = "paused";
      } else {
        element.style.animationPlayState = "running";
      }
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Create particle effects
  createParticleEffect();

  // Add event listeners
  signinForm.addEventListener("submit", handleFormSubmission);
  addButtonEffects();
  addInputEffects();
  addSocialButtonEffects();
  addMouseTracking();
  addKeyboardNavigation();
  optimizeAnimations();

  // Add CSS animations dynamically
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }
        
        @keyframes inputGlow {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes successFadeIn {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .error-message {
            animation: fadeIn 0.3s ease;
        }
    `;
  document.head.appendChild(style);

  // Welcome animation
  setTimeout(() => {
    const card = document.querySelector(".signin-card");
    card.style.opacity = "0";
    card.style.transform = "translateY(50px) scale(0.8)";

    // Trigger entrance animation
    setTimeout(() => {
      card.style.transition = "opacity 1s ease-out, transform 1s ease-out";
      card.style.opacity = "1";
      card.style.transform = "translateY(0) scale(1)";
    }, 50);
  }, 100);
});

// Add entrance animation
const entranceStyle = document.createElement("style");
entranceStyle.textContent = `
    @keyframes cardEntrance {
        from {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;
document.head.appendChild(entranceStyle);
