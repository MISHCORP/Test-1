/*
  Demo-only auth using localStorage.
  Not suitable for production (no hashing, no server).
*/

function getStoredLanguage() {
  try {
    var lang = localStorage.getItem('appLanguage');
    return lang || 'en';
  } catch (e) {
    return 'en';
  }
}

var authTranslations = {
  en: {
    'doc.title': 'Sign in — MishCorp',
    'title.login': 'Login',
    'title.signup': 'Create account',
    'nav.login': 'Login',
    'nav.signup': 'Create account',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Sign in',
    'login.demoNote': 'Demo only: accounts are stored in your browser via localStorage.',
    'signup.name': 'Name',
    'signup.email': 'Email',
    'signup.password': 'Password',
    'signup.confirm': 'Confirm password',
    'signup.hint': 'Use 8+ characters.',
    'signup.submit': 'Create account',
    'alert.missingName': 'Please enter your name.',
    'alert.missingEmail': 'Please enter your email.',
    'alert.passwordShort': 'Password must be at least 8 characters.',
    'alert.passwordMismatch': 'Passwords do not match.',
    'alert.emailExists': 'An account with that email already exists. Try logging in.',
    'alert.accountCreated': 'Account created! Redirecting to login…',
    'alert.loginMissing': 'Please enter your email and password.',
    'alert.loginInvalid': 'Invalid email or password.',
    'alert.welcome': 'Welcome back, {name}! (Demo login successful)',
  },
  af: {
    'doc.title': 'Meld aan — MishCorp',
    'title.login': 'Meld aan',
    'title.signup': 'Skep rekening',
    'nav.login': 'Meld aan',
    'nav.signup': 'Skep rekening',
    'login.email': 'E-pos',
    'login.password': 'Wagwoord',
    'login.submit': 'Meld aan',
    'login.demoNote': 'Demo net: rekeninge word in jou blaaier gestoor via localStorage.',
    'signup.name': 'Naam',
    'signup.email': 'E-pos',
    'signup.password': 'Wagwoord',
    'signup.confirm': 'Bevestig wagwoord',
    'signup.hint': 'Gebruik 8+ karakters.',
    'signup.submit': 'Skep rekening',
    'alert.missingName': 'Voer asseblief jou naam in.',
    'alert.missingEmail': 'Voer asseblief jou e-pos in.',
    'alert.passwordShort': 'Wagwoord moet minstens 8 karakters wees.',
    'alert.passwordMismatch': 'Wagwoorde stem nie ooreen nie.',
    'alert.emailExists': 'n Rekening met daardie e-pos bestaan reeds. Probeer aanmeld.',
    'alert.accountCreated': 'Rekening geskep! Herlei nou na aanmeld…',
    'alert.loginMissing': 'Voer asseblief jou e-pos en wagwoord in.',
    'alert.loginInvalid': 'Ongeldige e-pos of wagwoord.',
    'alert.welcome': 'Welkom terug, {name}! (Demo-aanmelding suksesvol)',
  },
  de: {
    'doc.title': 'Anmelden — MishCorp',
    'title.login': 'Anmelden',
    'title.signup': 'Konto erstellen',
    'nav.login': 'Anmelden',
    'nav.signup': 'Konto erstellen',
    'login.email': 'E-Mail',
    'login.password': 'Passwort',
    'login.submit': 'Anmelden',
    'login.demoNote': 'Nur Demo: Konten werden im Browser über localStorage gespeichert.',
    'signup.name': 'Name',
    'signup.email': 'E-Mail',
    'signup.password': 'Passwort',
    'signup.confirm': 'Passwort bestätigen',
    'signup.hint': 'Verwenden Sie 8+ Zeichen.',
    'signup.submit': 'Konto erstellen',
    'alert.missingName': 'Bitte geben Sie Ihren Namen ein.',
    'alert.missingEmail': 'Bitte geben Sie Ihre E-Mail ein.',
    'alert.passwordShort': 'Das Passwort muss mindestens 8 Zeichen lang sein.',
    'alert.passwordMismatch': 'Passwörter stimmen nicht überein.',
    'alert.emailExists': 'Ein Konto mit dieser E-Mail existiert bereits. Bitte melden Sie sich an.',
    'alert.accountCreated': 'Konto erstellt! Weiterleitung zur Anmeldung…',
    'alert.loginMissing': 'Bitte geben Sie Ihre E-Mail und Ihr Passwort ein.',
    'alert.loginInvalid': 'Ungültige E-Mail oder ungültiges Passwort.',
    'alert.welcome': 'Willkommen zurück, {name}! (Demo-Anmeldung erfolgreich)',
  },
};

function tAuth(key) {
  var lang = getStoredLanguage();
  var dict = authTranslations[lang] || authTranslations.en;
  return dict[key] || authTranslations.en[key] || key;
}

function getUsers() {
  try {
    const raw = localStorage.getItem('demoUsers');
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setUsers(users) {
  localStorage.setItem('demoUsers', JSON.stringify(users));
}

function setAlert(container, message, variant) {
  if (!container) return;
  container.innerHTML = '';

  const alert = document.createElement('div');
  alert.className = `alert alert-${variant} alert-dismissible fade show`;
  alert.setAttribute('role', 'alert');
  alert.textContent = message;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn-close';
  button.setAttribute('data-bs-dismiss', 'alert');
  button.setAttribute('aria-label', 'Close');

  alert.appendChild(button);
  container.appendChild(alert);
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function getRoute() {
  const hash = String(window.location.hash || '').trim();
  if (hash === '#/signup') return 'signup';
  return 'login';
}

function setRoute(route) {
  window.location.hash = route === 'signup' ? '#/signup' : '#/login';
}

function renderRoute() {
  const route = getRoute();

  const viewTitle = document.getElementById('viewTitle');
  const viewLogin = document.getElementById('viewLogin');
  const viewSignup = document.getElementById('viewSignup');

  if (!viewLogin || !viewSignup) return;

  const showingLogin = route === 'login';
  viewLogin.classList.toggle('d-none', !showingLogin);
  viewSignup.classList.toggle('d-none', showingLogin);

  const navLogin = document.querySelector('[data-nav="login"]');
  const navSignup = document.querySelector('[data-nav="signup"]');
  navLogin?.classList.toggle('fw-semibold', showingLogin);
  navSignup?.classList.toggle('fw-semibold', !showingLogin);

  applyAuthTranslations();
}

function applyAuthTranslations() {
  var lang = getStoredLanguage();

  try {
    document.documentElement.lang = lang;
  } catch (e) {}

  var docTitle = document.querySelector('title');
  if (docTitle) docTitle.textContent = tAuth('doc.title');

  const route = getRoute();
  const viewTitle = document.getElementById('viewTitle');
  if (viewTitle) {
    viewTitle.textContent = route === 'login' ? tAuth('title.login') : tAuth('title.signup');
  }

  const navLogin = document.querySelector('[data-nav="login"]');
  const navSignup = document.querySelector('[data-nav="signup"]');
  if (navLogin) navLogin.textContent = tAuth('nav.login');
  if (navSignup) navSignup.textContent = tAuth('nav.signup');

  const loginEmailLabel = document.querySelector('label[for="loginEmail"]');
  if (loginEmailLabel) loginEmailLabel.textContent = tAuth('login.email');
  const loginPasswordLabel = document.querySelector('label[for="loginPassword"]');
  if (loginPasswordLabel) loginPasswordLabel.textContent = tAuth('login.password');
  const loginSubmit = document.querySelector('#loginForm button[type="submit"]');
  if (loginSubmit) loginSubmit.textContent = tAuth('login.submit');
  const loginNote = document.querySelector('#loginForm .text-secondary.small');
  if (loginNote) loginNote.textContent = tAuth('login.demoNote');

  const signupNameLabel = document.querySelector('label[for="signupName"]');
  if (signupNameLabel) signupNameLabel.textContent = tAuth('signup.name');
  const signupEmailLabel = document.querySelector('label[for="signupEmail"]');
  if (signupEmailLabel) signupEmailLabel.textContent = tAuth('signup.email');
  const signupPasswordLabel = document.querySelector('label[for="signupPassword"]');
  if (signupPasswordLabel) signupPasswordLabel.textContent = tAuth('signup.password');
  const signupConfirmLabel = document.querySelector('label[for="signupConfirm"]');
  if (signupConfirmLabel) signupConfirmLabel.textContent = tAuth('signup.confirm');
  const signupHint = document.querySelector('#signupForm .form-text');
  if (signupHint) signupHint.textContent = tAuth('signup.hint');
  const signupSubmit = document.querySelector('#signupForm button[type="submit"]');
  if (signupSubmit) signupSubmit.textContent = tAuth('signup.submit');
  const signupNote = document.querySelector('#signupForm .text-secondary.small');
  if (signupNote) signupNote.textContent = tAuth('login.demoNote');
}

function wireSignup() {
  const form = document.getElementById('signupForm');
  if (!form) return;

  const alertHost = document.getElementById('signupAlert');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = String(document.getElementById('signupName')?.value || '').trim();
    const email = normalizeEmail(document.getElementById('signupEmail')?.value);
    const password = String(document.getElementById('signupPassword')?.value || '');
    const confirm = String(document.getElementById('signupConfirm')?.value || '');

    if (!name) {
      setAlert(alertHost, tAuth('alert.missingName'), 'warning');
      return;
    }

    if (!email) {
      setAlert(alertHost, tAuth('alert.missingEmail'), 'warning');
      return;
    }

    if (password.length < 8) {
      setAlert(alertHost, tAuth('alert.passwordShort'), 'warning');
      return;
    }

    if (password !== confirm) {
      setAlert(alertHost, tAuth('alert.passwordMismatch'), 'warning');
      return;
    }

    const users = getUsers();
    const exists = users.some((u) => normalizeEmail(u.email) === email);
    if (exists) {
      setAlert(alertHost, tAuth('alert.emailExists'), 'danger');
      return;
    }

    users.push({ name, email, password, role: 'staff', jobTitle: '', phone: '' });
    setUsers(users);

    setAlert(alertHost, tAuth('alert.accountCreated'), 'success');

    setTimeout(() => {
      setRoute('login');
    }, 700);
  });
}

function wireLogin() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const alertHost = document.getElementById('loginAlert');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = normalizeEmail(document.getElementById('loginEmail')?.value);
    const password = String(document.getElementById('loginPassword')?.value || '');

    if (!email || !password) {
      setAlert(alertHost, tAuth('alert.loginMissing'), 'warning');
      return;
    }

    const users = getUsers();
    const user = users.find((u) => normalizeEmail(u.email) === email);

    if (!user || user.password !== password) {
      setAlert(alertHost, tAuth('alert.loginInvalid'), 'danger');
      return;
    }

    localStorage.setItem('demoCurrentUser', JSON.stringify({
      name: user.name,
      email: user.email,
      role: user.role || 'staff',
      jobTitle: user.jobTitle || '',
      phone: user.phone || '',
    }));
    const welcomeMsg = tAuth('alert.welcome').replace('{name}', user.name);
    setAlert(alertHost, welcomeMsg, 'success');
    form.reset();

    // Redirect to dashboard (demo). Delay briefly so success alert is visible.
    setTimeout(function () {
      window.location.href = 'dashboard.html';
    }, 700);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // On first load, if no demo users are stored, attempt to seed from
  // a local JSON file (assets/data/users.json). This makes the shipped
  // demo users available without manual signup.
  async function prefillUsersIfEmpty() {
    try {
      const existing = getUsers();
      if (existing && existing.length) return;

      // Try fetching the bundled JSON. May fail when opened via file://
      const resp = await fetch('assets/data/users.json');
      if (!resp.ok) return;
      const data = await resp.json();
      if (Array.isArray(data) && data.length) {
        // Normalize and keep basic profile + role information
        const normalized = data.map((u) => ({
          name: (u.name || '') + (u.surname ? ' ' + u.surname : ''),
          email: normalizeEmail(u.email),
          password: String(u.password || ''),
          role: u.role || 'staff',
          jobTitle: u.jobTitle || '',
          phone: u.phone || '',
        }));
        setUsers(normalized);
      }
    } catch (err) {
      // Ignore errors (e.g., file protocol). Leave localStorage untouched.
      // console.debug('prefillUsersIfEmpty failed', err);
    }
  }

  (async function init() {
    if (!window.location.hash) setRoute('login');

    await prefillUsersIfEmpty();
    applyAuthTranslations();
    renderRoute();
    window.addEventListener('hashchange', renderRoute);

    wireSignup();
    wireLogin();
  })();
});
