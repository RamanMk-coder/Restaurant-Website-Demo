// script.js - Golden Fork Interactive Logic
const popularMeals = [
  { name: "Japanese Gyozas", calories: 650, rating: 4.9, diet: "High Protein", img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=800", protein: "38g" },
  { name: "Avocado Salad", calories: 400, rating: 4.8, diet: "Vegan", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800", protein: "14g" },
  { name: "Grilled Chicken Bowl", calories: 520, rating: 4.9, diet: "High Protein", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800", protein: "48g" },
  { name: "Mediterranean Pasta", calories: 580, rating: 4.7, diet: "Vegetarian", img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=800", protein: "24g" },
  { name: "Protein Burrito", calories: 610, rating: 4.8, diet: "High Protein", img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800", protein: "42g" },
  { name: "Vegan Buddha Bowl", calories: 450, rating: 4.9, diet: "Vegan", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800", protein: "20g" },
  { name: "Paneer Tikka Bowl", calories: 550, rating: 4.8, diet: "Vegetarian", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800", protein: "32g" },
  { name: "Quinoa Salad", calories: 390, rating: 4.7, diet: "Vegan", img: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=800", protein: "16g" }
];

document.addEventListener("DOMContentLoaded", () => {
  renderMeals(popularMeals);
  loadLoginState();
  initNavigationHighlight();
  initLoginPagePlanNotice();
  initContactForm();

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', event => {
      event.preventDefault();
      submitPortalLogin('loginEmail', 'loginPassword', 'index.html');
    });
  }
});

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', submitContactForm);
}

function submitContactForm(event) {
  event.preventDefault();

  const name = document.getElementById('contactName')?.value.trim();
  const email = document.getElementById('contactEmail')?.value.trim();
  const message = document.getElementById('contactMessage')?.value.trim();
  const result = document.getElementById('contactResult');
  const submitButton = event.target.querySelector('button[type="submit"]');

  if (!result) return;

  if (!name || !email || !message) {
    showContactResult('Please fill in all fields before sending your message.', false);
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showContactResult('Please enter a valid email address.', false);
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  setTimeout(() => {
    showContactResult(`Thanks ${name.split(' ')[0]}! Your message has been sent. We’ll reply within one business day.`, true);
    event.target.reset();
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
  }, 800);
}

function showContactResult(message, success) {
  const result = document.getElementById('contactResult');
  if (!result) return;

  result.textContent = message;
  result.classList.remove('hidden', 'border-red-200', 'bg-red-50', 'text-red-800', 'border-emerald-200', 'bg-emerald-50', 'text-emerald-800');
  if (success) {
    result.classList.add('border-emerald-200', 'bg-emerald-50', 'text-emerald-800');
  } else {
    result.classList.add('border-red-200', 'bg-red-50', 'text-red-800');
  }
}

function initNavigationHighlight() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', () => setActiveNavLink(link));
  });

  window.addEventListener('scroll', updateNavActiveOnScroll);
  updateNavActiveOnScroll();
}

function setActiveNavLink(activeLink) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('text-emerald-600', 'font-semibold');
    link.classList.add('text-slate-600');
  });

  if (activeLink) {
    activeLink.classList.add('text-emerald-600', 'font-semibold');
    activeLink.classList.remove('text-slate-600');
  }
}

function updateNavActiveOnScroll() {
  const sections = ['home', 'about', 'meals', 'how-it-works', 'pricing', 'gallery', 'contact'];
  const scrollPosition = window.scrollY + window.innerHeight / 3;
  let currentSection = 'home';

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section && section.offsetTop <= scrollPosition) {
      currentSection = id;
    }
  });

  const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
  if (activeLink) {
    setActiveNavLink(activeLink);
  }
}

function renderMeals(meals) {
  const container = document.getElementById("mealsContainer");
  if (!container) return;
  
  container.innerHTML = meals.map(meal => `
    <div class="meal-card bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <img src="${meal.img}" alt="${meal.name}" class="w-full h-44 object-cover">
      <div class="p-4 space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">${meal.diet}</span>
          <span class="text-xs font-bold text-amber-500"><i class="fa-solid fa-star"></i> ${meal.rating}</span>
        </div>
        <h3 class="font-bold text-slate-900 text-base">${meal.name}</h3>
        <div class="flex justify-between text-xs text-slate-500 font-mono">
          <span>Calories: ${meal.calories} kcal</span>
          <span>Protein: ${meal.protein}</span>
        </div>
        <button onclick="alert('Added ${meal.name} to subscription!')" class="w-full mt-2 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs">
          Select Meal
        </button>
      </div>
    </div>
  `).join('');
}

function filterMeals(button, diet) {
  document.querySelectorAll('.meal-filter-btn').forEach(btn => btn.classList.remove('active'));
  if (button) {
    button.classList.add('active');
  }

  if (diet === 'All') {
    renderMeals(popularMeals);
  } else {
    const filtered = popularMeals.filter(m => m.diet === diet);
    renderMeals(filtered);
  }
}

function generateAIPlan() {
  const form = document.getElementById('aiQuizForm');
  const output = document.getElementById('aiPlanContent');
  const result = document.getElementById('aiPlanResult');
  if (!form || !output || !result) return;

  const preference = form.querySelector('#dietPreference').value;
  const goal = form.querySelector('#healthGoal').value;
  const allergies = form.querySelector('#allergies').value.trim() || 'None';
  const frequency = form.querySelector('#mealFrequency').value;
  const dailyCaloriesInput = form.querySelector('#dailyCalories').value.trim();
  const mealCount = Number(frequency.split(' ')[0]) || 3;
  const requestedCalories = Number(dailyCaloriesInput) || 0;

  const calorieTarget = requestedCalories || getDefaultCalorieTarget(goal);
  const calorieText = requestedCalories
    ? `${calorieTarget} kcal per day based on your custom target.`
    : `${calorieTarget} kcal per day based on your ${goal.toLowerCase()} goal.`;

  const planMeals = getPlanMeals(preference, mealCount, calorieTarget);
  const allergyNote = allergies !== 'None' ? `Avoid: ${allergies}` : 'No specific allergens noted.';

  output.innerHTML = `
    <div class="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
      <p class="text-sm text-slate-600 mb-4">${allergyNote}</p>
      <div class="space-y-4">
        <div>
          <h4 class="font-semibold text-slate-900">Personalized Nutrition Summary</h4>
          <p class="text-sm text-slate-600">${mealCount} meals per day with a ${preference.toLowerCase()} focus and a target of ${calorieText}</p>
          <p class="text-sm text-slate-600 mt-1">This plan is designed to support your goal to ${goal.toLowerCase()}.</p>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          ${planMeals.map(meal => `
            <div class="rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden shadow-sm">
              <img src="${meal.img}" alt="${meal.name}" class="w-full h-32 sm:h-36 object-cover">
              <div class="p-4">
                <h5 class="font-semibold text-slate-900 mb-2">${meal.name}</h5>
                <p class="text-sm text-slate-600 mb-3">${meal.description}</p>
                <p class="text-xs text-slate-500">${meal.details}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  result.classList.remove('hidden');
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getPlanMeals(preference, mealCount, dailyCalories) {
  const mealOptions = {
    Balanced: [
      { name: 'Grilled Chicken Bowl', description: 'Protein-rich lunch with veggies and quinoa.', details: '48g protein', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800' },
      { name: 'Quinoa Salad', description: 'Light, fiber-packed meal with fresh greens.', details: '16g protein', img: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=800' },
      { name: 'Mediterranean Pasta', description: 'Comforting vegetarian dinner with savory herbs.', details: '24g protein', img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=800' }
    ],
    Vegetarian: [
      { name: 'Mediterranean Pasta', description: 'Flavorful pasta with fresh vegetables and herbs.', details: '24g protein', img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=800' },
      { name: 'Paneer Tikka Bowl', description: 'High-protein vegetarian bowl with spicy paneer.', details: '32g protein', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800' },
      { name: 'Avocado Salad', description: 'Fresh greens topped with creamy avocado and seeds.', details: '14g protein', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800' }
    ],
    Vegan: [
      { name: 'Vegan Buddha Bowl', description: 'Plant-based bowl with roasted vegetables and grains.', details: '20g protein', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800' },
      { name: 'Quinoa Salad', description: 'Light, clean meal with protein-rich quinoa.', details: '16g protein', img: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=800' },
      { name: 'Avocado Salad', description: 'Fresh, vegan-friendly salad with bright flavors.', details: '14g protein', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800' }
    ],
    'High Protein': [
      { name: 'Japanese Gyozas', description: 'Protein-rich entrée with savory filling and greens.', details: '38g protein', img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=800' },
      { name: 'Protein Burrito', description: 'Hearty burrito packed with lean protein and veggies.', details: '42g protein', img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800' },
      { name: 'Grilled Chicken Bowl', description: 'Balanced bowl made for muscle recovery and energy.', details: '48g protein', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800' }
    ]
  };

  const meals = mealOptions[preference] || mealOptions.Balanced;
  const mealCalories = Math.max(Math.round(dailyCalories / mealCount), 350);
  const selectedMeals = [];
  for (let i = 0; i < mealCount; i += 1) {
    const meal = meals[i % meals.length];
    selectedMeals.push({
      ...meal,
      details: `${meal.details} • approx ${mealCalories} kcal`
    });
  }

  return selectedMeals;
}

function getDefaultCalorieTarget(goal) {
  const targetMap = {
    'Maintain Weight': 2200,
    'Lose Weight': 1800,
    'Build Muscle': 2500,
    'Improve Energy': 2300
  };
  return targetMap[goal] || 2000;
}

function submitPortalLogin(emailFieldId = 'portalEmail', passwordFieldId = 'portalPassword', redirectTo = null) {
  const email = document.getElementById(emailFieldId)?.value.trim();
  const password = document.getElementById(passwordFieldId)?.value.trim();
  if (!email || !password) {
    alert('Please enter both email and password to continue.');
    return;
  }

  const initials = getUserInitials(email);
  localStorage.setItem('goldenForkUserInitials', initials);

  const button = document.getElementById('loginPortalBtn');
  if (button) {
    button.textContent = initials;
    button.classList.remove('bg-slate-900');
    button.classList.add('bg-emerald-600');
    button.setAttribute('href', 'login.html');
  }

  if (redirectTo) {
    window.location.href = redirectTo;
    return;
  }

  alert(`Welcome back! Accessing your portal for ${email}.`);
}

function submitLoginForm(event) {
  event.preventDefault();
  submitPortalLogin('loginEmail', 'loginPassword');
}

function loadLoginState() {
  const initials = localStorage.getItem('goldenForkUserInitials');
  const button = document.getElementById('loginPortalBtn');
  const status = document.getElementById('loginStatus');
  const statusLabel = document.getElementById('userInitialsLabel');
  if (!button) return;

  if (initials) {
    button.textContent = initials;
    button.classList.remove('bg-slate-900');
    button.classList.add('bg-emerald-600');
    button.setAttribute('href', 'login.html');

    if (status && statusLabel) {
      status.classList.remove('hidden');
      statusLabel.textContent = initials;
    }
  } else {
    button.textContent = 'Login';
    button.classList.remove('bg-emerald-600');
    button.classList.add('bg-slate-900');
    button.setAttribute('href', 'login.html');

    if (status) {
      status.classList.add('hidden');
    }
  }
}

function logoutUser(redirectTo = 'index.html') {
  localStorage.removeItem('goldenForkUserInitials');
  const button = document.getElementById('loginPortalBtn');
  const status = document.getElementById('loginStatus');
  if (button) {
    button.textContent = 'Login';
    button.classList.remove('bg-emerald-600');
    button.classList.add('bg-slate-900');
    button.setAttribute('href', 'login.html');
  }
  if (status) {
    status.classList.add('hidden');
  }
  if (redirectTo) {
    window.location.href = redirectTo;
  }
}

function initLoginPagePlanNotice() {
  const planName = getQueryParam('plan');
  const planMessage = document.getElementById('planSelectedMessage');
  const loginIntro = document.getElementById('loginIntro');

  if (planName && planMessage) {
    planMessage.textContent = `You selected the ${planName}. Please login to complete your subscription.`;
    planMessage.classList.remove('hidden');
    if (loginIntro) {
      loginIntro.textContent = 'Use your account credentials to proceed with the plan purchase.';
    }
  }
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function getUserInitials(email) {
  const name = email.split('@')[0].replace(/[^a-zA-Z0-9]+/g, ' ').trim();
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return 'ME';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}


function subscribePlan(planName) {
  const initials = localStorage.getItem('tasteTheoryUserInitials');
  if (!initials) {
    window.location.href = `login.html?plan=${encodeURIComponent(planName)}`;
    return;
  }

  alert(`You're already signed in. You will now be directed to contact support to confirm your ${planName}.`);
  window.location.href = 'index.html#contact';
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}
