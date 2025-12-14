document.addEventListener('DOMContentLoaded', function () {
  var profile = document.getElementById('profile');
  var profileName = document.getElementById('profileName');
  var profileAvatar = document.getElementById('profileAvatar');
  var dropdown = document.getElementById('profileDropdown');
  var logoutBtn = document.getElementById('logoutBtn');
  var menuToggle = document.getElementById('menuToggle');
  var sidebar = document.getElementById('sidebar');
  var themeToggle = document.getElementById('themeToggle');
  var addUserBtn = document.getElementById('addUserBtn');
  var addUserModal = document.getElementById('addUserModal');
  var addUserForm = document.getElementById('addUserForm');
  var addUserClose = document.getElementById('addUserClose');
  var addUserCancel = document.getElementById('addUserCancel');
  var profileLink = document.getElementById('profileLink');
  var profilePageAvatar = document.getElementById('profilePageAvatar');
  var profileFullName = document.getElementById('profileFullName');
  var profileEmail = document.getElementById('profileEmail');
  var profilePhone = document.getElementById('profilePhone');
  var profileJob = document.getElementById('profileJob');
  var profileRole = document.getElementById('profileRole');

  var usersData = [];
  var currentLang = getStoredLanguage();

  function closeDropdown() {
    dropdown.classList.remove('show');
    profileName.setAttribute('aria-expanded', 'false');
  }

  function openDropdown() {
    dropdown.classList.add('show');
    profileName.setAttribute('aria-expanded', 'true');
  }

  profileName.addEventListener('click', function (e) {
    e.stopPropagation();
    if (dropdown.classList.contains('show')) closeDropdown(); else openDropdown();
  });

  // Close when clicking outside
  document.addEventListener('click', function (e) {
    if (!profile.contains(e.target)) closeDropdown();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDropdown();
      sidebar && sidebar.classList.remove('show');
      if (addUserModal && addUserModal.classList.contains('show')) closeAddUserModal();
    }
  });

  function openAddUserModal() {
    if (!addUserModal) return;
    addUserModal.classList.add('show');
    var nameInput = document.getElementById('addUserName');
    if (nameInput) nameInput.focus();
  }

  function closeAddUserModal() {
    if (!addUserModal) return;
    addUserModal.classList.remove('show');
    if (addUserForm) addUserForm.reset();
  }

  // Render profile info from localStorage.demoCurrentUser
  function getCurrentUser() {
    try {
      var raw = localStorage.getItem('demoCurrentUser');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (err) {
      return null;
    }
  }

  function getStoredLanguage() {
    try {
      return localStorage.getItem('appLanguage') || 'en';
    } catch (e) {
      return 'en';
    }
  }

  function setStoredLanguage(lang) {
    currentLang = lang;
    try { localStorage.setItem('appLanguage', lang); } catch (e) {}
  }

  function getStoredTheme() {
    try { return localStorage.getItem('appTheme') || 'light'; } catch (e) { return 'light'; }
  }

  function setStoredTheme(theme) {
    try { localStorage.setItem('appTheme', theme); } catch (e) {}
  }

  var translations = {
    en: {
      'nav.home': 'Home',
      'nav.dashboard': 'Dashboard',
      'nav.teams': 'Teams',
      'nav.inventory': 'Inventory',
      'nav.orders': 'Orders',
      'nav.invoices': 'Invoices',
      'nav.reports': 'Reports',
      'nav.finances': 'Finances',
      'nav.calendar': 'Calendar',
      'nav.tasks': 'Tasks',
      'nav.settings': 'Settings',
      'nav.adminPortal': 'Admin Portal',
      'nav.users': 'User management',
      'nav.adminSettings': 'Admin settings',
      'nav.audit': 'Audit logs',
      'home.lead': 'Use the left menu to navigate the management console.',
      'theme.label': 'Dark mode',
      'profile.menu.profile': 'Profile',
      'profile.menu.settings': 'Settings',
      'profile.menu.help': 'Help',
      'profile.menu.language': 'Language',
      'profile.menu.logout': 'Log out',
      'users.title': 'Users',
      'users.lead': "Manage your organization's users.",
      'users.add': 'Add User',
      'users.col.name': 'Name',
      'users.col.email': 'Email',
      'users.col.phone': 'Phone',
      'users.col.job': 'Job',
      'users.col.actions': 'Actions',
      'profile.title': 'My profile',
      'profile.role.staff': 'Role: Staff Member',
      'profile.role.admin': 'Role: Administrator',
      'profile.field.email': 'Email',
      'profile.field.phone': 'Phone',
      'profile.field.job': 'Job title',
      'modal.add.title': 'Add user',
      'modal.add.fullName': 'Full name',
      'modal.add.email': 'Email',
      'modal.add.phone': 'Phone',
      'modal.add.job': 'Job title',
      'modal.add.password': 'Password',
      'modal.add.type': 'User type',
      'modal.add.type.staff': 'Staff Member',
      'modal.add.type.admin': 'Administrator',
      'modal.add.cancel': 'Cancel',
      'modal.add.save': 'Save user',
      'home.welcome': 'Welcome back, {name}'
    },
    af: {
      'nav.home': 'Tuis',
      'nav.dashboard': 'Beheerpaneel',
      'nav.teams': 'Spanne',
      'nav.inventory': 'Voorraad',
      'nav.orders': 'Bestellings',
      'nav.invoices': 'Fakture',
      'nav.reports': 'Verslae',
      'nav.finances': 'Finansies',
      'nav.calendar': 'Kalender',
      'nav.tasks': 'Take',
      'nav.settings': 'Instellings',
      'nav.adminPortal': 'Adminportaal',
      'nav.users': 'Gebruikerbestuur',
      'nav.adminSettings': 'Admininstellings',
      'nav.audit': 'Ouditlogs',
      'home.lead': 'Gebruik die linkerkieslys om te navigeer.',
      'theme.label': 'Donker modus',
      'profile.menu.profile': 'Profiel',
      'profile.menu.settings': 'Instellings',
      'profile.menu.help': 'Hulp',
      'profile.menu.language': 'Taal',
      'profile.menu.logout': 'Teken uit',
      'users.title': 'Gebruikers',
      'users.lead': 'Bestuur jou organisasie se gebruikers.',
      'users.add': 'Voeg gebruiker by',
      'users.col.name': 'Naam',
      'users.col.email': 'E-pos',
      'users.col.phone': 'Foon',
      'users.col.job': 'Pos',
      'users.col.actions': 'Aksies',
      'profile.title': 'My profiel',
      'profile.role.staff': 'Rol: Personeellid',
      'profile.role.admin': 'Rol: Administrateur',
      'profile.field.email': 'E-pos',
      'profile.field.phone': 'Foon',
      'profile.field.job': 'Pos',
      'modal.add.title': 'Voeg gebruiker by',
      'modal.add.fullName': 'Volle naam',
      'modal.add.email': 'E-pos',
      'modal.add.phone': 'Foon',
      'modal.add.job': 'Pos',
      'modal.add.password': 'Wagwoord',
      'modal.add.type': 'Gebruikerstipe',
      'modal.add.type.staff': 'Personeellid',
      'modal.add.type.admin': 'Administrateur',
      'modal.add.cancel': 'Kanselleer',
      'modal.add.save': 'Stoor gebruiker',
      'home.welcome': 'Welkom terug, {name}'
    },
    de: {
      'nav.home': 'Startseite',
      'nav.dashboard': 'Dashboard',
      'nav.teams': 'Teams',
      'nav.inventory': 'Inventar',
      'nav.orders': 'Bestellungen',
      'nav.invoices': 'Rechnungen',
      'nav.reports': 'Berichte',
      'nav.finances': 'Finanzen',
      'nav.calendar': 'Kalender',
      'nav.tasks': 'Aufgaben',
      'nav.settings': 'Einstellungen',
      'nav.adminPortal': 'Adminbereich',
      'nav.users': 'Benutzerverwaltung',
      'nav.adminSettings': 'Admin-Einstellungen',
      'nav.audit': 'Audit-Logs',
      'home.lead': 'Nutzen Sie das linke Menü zur Navigation.',
      'theme.label': 'Dunkelmodus',
      'profile.menu.profile': 'Profil',
      'profile.menu.settings': 'Einstellungen',
      'profile.menu.help': 'Hilfe',
      'profile.menu.language': 'Sprache',
      'profile.menu.logout': 'Abmelden',
      'users.title': 'Benutzer',
      'users.lead': 'Verwalten Sie die Benutzer Ihrer Organisation.',
      'users.add': 'Benutzer hinzufügen',
      'users.col.name': 'Name',
      'users.col.email': 'E-Mail',
      'users.col.phone': 'Telefon',
      'users.col.job': 'Position',
      'users.col.actions': 'Aktionen',
      'profile.title': 'Mein Profil',
      'profile.role.staff': 'Rolle: Mitarbeiter',
      'profile.role.admin': 'Rolle: Administrator',
      'profile.field.email': 'E-Mail',
      'profile.field.phone': 'Telefon',
      'profile.field.job': 'Position',
      'modal.add.title': 'Benutzer hinzufügen',
      'modal.add.fullName': 'Vollständiger Name',
      'modal.add.email': 'E-Mail',
      'modal.add.phone': 'Telefon',
      'modal.add.job': 'Position',
      'modal.add.password': 'Passwort',
      'modal.add.type': 'Benutzertyp',
      'modal.add.type.staff': 'Mitarbeiter',
      'modal.add.type.admin': 'Administrator',
      'modal.add.cancel': 'Abbrechen',
      'modal.add.save': 'Benutzer speichern',
      'home.welcome': 'Willkommen zurück, {name}'
    }
  };

  function t(key) {
    var dict = translations[currentLang] || translations.en;
    return dict[key] || translations.en[key] || key;
  }

  function initialsFromName(name) {
    if (!name) return '--';
    var parts = String(name).trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '--';
    if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  function renderProfile() {
    var user = getCurrentUser();
    if (!user) {
      if (profileName) profileName.textContent = 'User ▾';
      if (profileAvatar) profileAvatar.textContent = '--';
      var wn = document.getElementById('welcomeName');
      if (wn) wn.textContent = 'User';
      if (profilePageAvatar) profilePageAvatar.textContent = '--';
      if (profileFullName) profileFullName.textContent = 'User';
      if (profileEmail) profileEmail.textContent = '-';
      if (profilePhone) profilePhone.textContent = '-';
      if (profileJob) profileJob.textContent = '-';
      if (profileRole) profileRole.textContent = 'Role: Staff Member';
      return;
    }
    var display = user.name || user.email || 'User';
    if (profileName) profileName.textContent = display + ' ▾';
    if (profileAvatar) profileAvatar.textContent = initialsFromName(user.name || user.email);
    // Update home greeting (use first name if available)
    try {
      var wn = document.getElementById('welcomeName');
      var heading = document.getElementById('welcomeHeading');
      var first = String(display).split(/\s+/).filter(Boolean)[0] || display;
      if (wn) wn.textContent = first;
      if (heading) {
        var tpl = t('home.welcome');
        heading.textContent = tpl.replace('{name}', first);
      }
    } catch (err) {
      // ignore
    }

    // Fill profile view
    if (profilePageAvatar) profilePageAvatar.textContent = initialsFromName(user.name || user.email);
    if (profileFullName) profileFullName.textContent = display;
    if (profileEmail) profileEmail.textContent = user.email || '';
    if (profilePhone) profilePhone.textContent = user.phone || '-';
    if (profileJob) profileJob.textContent = user.jobTitle || '-';
    if (profileRole) {
      var isAdmin = (user.role || 'staff') === 'administrator';
      profileRole.textContent = isAdmin ? t('profile.role.admin') : t('profile.role.staff');
    }
  }

  // Wire logout button: clear demoCurrentUser and redirect to login page
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('demoCurrentUser');
      // Optionally keep demoUsers so next time accounts remain; just clear current session.
      window.location.href = 'index.html';
    });
  }

  // Populate profile on load
  renderProfile();

  // Apply role-based UI (admin portal, buttons)
  (function applyRoleVisibility() {
    var user = getCurrentUser();
    var isAdmin = user && user.role === 'administrator';

    // Admin-only nav items
    var adminEls = document.querySelectorAll('[data-admin-only="true"]');
    adminEls.forEach(function (el) {
      el.style.display = isAdmin ? '' : 'none';
    });

    // Add User button only for admins
    if (addUserBtn) {
      addUserBtn.style.display = isAdmin ? 'inline-flex' : 'none';
    }
  })();

  if (addUserBtn && addUserModal && addUserForm) {
    addUserBtn.addEventListener('click', function () {
      openAddUserModal();
    });

    if (addUserClose) addUserClose.addEventListener('click', closeAddUserModal);
    if (addUserCancel) addUserCancel.addEventListener('click', closeAddUserModal);

    addUserModal.addEventListener('click', function (e) {
      if (e.target === addUserModal) closeAddUserModal();
    });
  }

  // Mobile menu toggle
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      sidebar.classList.toggle('show');
    });

    document.addEventListener('click', function (e) {
      if (!sidebar.contains(e.target) && e.target !== menuToggle) {
        sidebar.classList.remove('show');
      }
    });
  }

  // Simple view router for nav links
  var navLinks = document.querySelectorAll('.nav a[data-view]');
  // Only treat main content sections as views, not the nav links themselves.
  var views = document.querySelectorAll('#viewRoot .view[data-view]');

  // Defensive: clear any inline `display: none` that may have been injected
  // (some browsers/extensions or a prior script may add inline styles). This
  // ensures the full menu is visible.
  navLinks.forEach(function (a) {
    try {
      if (a.style && a.style.display) a.style.display = '';
      if (a.parentElement && a.parentElement.style && a.parentElement.style.display) a.parentElement.style.display = '';
    } catch (err) {
      // ignore
    }
  });

  // Apply language translations to static dashboard text
  function applyDashboardTranslations() {
    var langSelect = document.getElementById('languageSelect');
    if (langSelect) langSelect.value = currentLang;

    var homeLink = document.querySelector('.nav a[data-view="home"]');
    if (homeLink) homeLink.textContent = t('nav.home');
    var dashLink = document.querySelector('.nav a[data-view="dashboard"]');
    if (dashLink) dashLink.textContent = t('nav.dashboard');
    var teamsLink = document.querySelector('.nav a[data-view="teams"]');
    if (teamsLink) teamsLink.textContent = t('nav.teams');
    var invLink = document.querySelector('.nav a[data-view="inventory"]');
    if (invLink) invLink.textContent = t('nav.inventory');
    var ordersLink = document.querySelector('.nav a[data-view="orders"]');
    if (ordersLink) ordersLink.textContent = t('nav.orders');
    var invcLink = document.querySelector('.nav a[data-view="invoices"]');
    if (invcLink) invcLink.textContent = t('nav.invoices');
    var repLink = document.querySelector('.nav a[data-view="reports"]');
    if (repLink) repLink.textContent = t('nav.reports');
    var finLink = document.querySelector('.nav a[data-view="finances"]');
    if (finLink) finLink.textContent = t('nav.finances');
    var calLink = document.querySelector('.nav a[data-view="calendar"]');
    if (calLink) calLink.textContent = t('nav.calendar');
    var taskLink = document.querySelector('.nav a[data-view="tasks"]');
    if (taskLink) taskLink.textContent = t('nav.tasks');
    var setLink = document.querySelector('.nav a[data-view="settings"]');
    if (setLink) setLink.textContent = t('nav.settings');

    var adminLabel = document.querySelector('.nav-section[data-admin-only="true"]');
    if (adminLabel) adminLabel.textContent = t('nav.adminPortal');
    var usersLink = document.getElementById('navUsers');
    if (usersLink) usersLink.textContent = t('nav.users');
    var adminSettingsLink = document.querySelector('a[data-view="admin-settings"]');
    if (adminSettingsLink) adminSettingsLink.textContent = t('nav.adminSettings');
    var auditLink = document.querySelector('a[data-view="audit"]');
    if (auditLink) auditLink.textContent = t('nav.audit');

    var themeLabel = document.getElementById('themeToggleLabel');
    if (themeLabel) themeLabel.textContent = t('theme.label');

    var homeLead = document.querySelector('[data-view="home"] .lead');
    if (homeLead) homeLead.textContent = t('home.lead');

    var usersTitle = document.querySelector('[data-view="users"] h1');
    if (usersTitle) usersTitle.textContent = t('users.title');
    var usersLead = document.querySelector('[data-view="users"] .lead');
    if (usersLead) usersLead.textContent = t('users.lead');
    var addUserBtnEl = document.getElementById('addUserBtn');
    if (addUserBtnEl) addUserBtnEl.textContent = t('users.add');

    var ths = document.querySelectorAll('#usersTable thead th');
    if (ths[0]) ths[0].textContent = t('users.col.name');
    if (ths[1]) ths[1].textContent = t('users.col.email');
    if (ths[2]) ths[2].textContent = t('users.col.phone');
    if (ths[3]) ths[3].textContent = t('users.col.job');
    if (ths[4]) ths[4].textContent = t('users.col.actions');

    var profileTitle = document.querySelector('[data-view="profile"] h1');
    if (profileTitle) profileTitle.textContent = t('profile.title');
    var profileEmailLabel = document.querySelector('#profileEmail')?.previousElementSibling;
    if (profileEmailLabel) profileEmailLabel.textContent = t('profile.field.email');
    var profilePhoneLabel = document.querySelector('#profilePhone')?.previousElementSibling;
    if (profilePhoneLabel) profilePhoneLabel.textContent = t('profile.field.phone');
    var profileJobLabel = document.querySelector('#profileJob')?.previousElementSibling;
    if (profileJobLabel) profileJobLabel.textContent = t('profile.field.job');

    var addTitle = document.getElementById('addUserTitle');
    if (addTitle) addTitle.textContent = t('modal.add.title');
    var lblName = document.querySelector('label[for="addUserName"]');
    if (lblName) lblName.textContent = t('modal.add.fullName');
    var lblEmail = document.querySelector('label[for="addUserEmail"]');
    if (lblEmail) lblEmail.textContent = t('modal.add.email');
    var lblPhone = document.querySelector('label[for="addUserPhone"]');
    if (lblPhone) lblPhone.textContent = t('modal.add.phone');
    var lblJob = document.querySelector('label[for="addUserJob"]');
    if (lblJob) lblJob.textContent = t('modal.add.job');
    var lblPwd = document.querySelector('label[for="addUserPassword"]');
    if (lblPwd) lblPwd.textContent = t('modal.add.password');
    var lblType = document.querySelector('label[for="addUserType"]');
    if (lblType) lblType.textContent = t('modal.add.type');
    var typeStaff = document.querySelector('#addUserType option[value="staff"]');
    if (typeStaff) typeStaff.textContent = t('modal.add.type.staff');
    var typeAdmin = document.querySelector('#addUserType option[value="administrator"]');
    if (typeAdmin) typeAdmin.textContent = t('modal.add.type.admin');
    var btnCancel = document.getElementById('addUserCancel');
    if (btnCancel) btnCancel.textContent = t('modal.add.cancel');
    var btnSave = document.querySelector('#addUserForm .btn-primary');
    if (btnSave) btnSave.textContent = t('modal.add.save');
  }

  applyDashboardTranslations();

  var langSelectEl = document.getElementById('languageSelect');
  if (langSelectEl) {
    langSelectEl.addEventListener('change', function () {
      setStoredLanguage(langSelectEl.value || 'en');
      applyDashboardTranslations();
      renderProfile();
    });
  }

  // Apply initial theme
  (function applyInitialTheme() {
    var theme = getStoredTheme();
    if (theme === 'dark') document.body.classList.add('theme-dark'); else document.body.classList.remove('theme-dark');
    var label = document.getElementById('themeToggleLabel');
    if (label) label.textContent = t('theme.label');
  })();

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var isDark = document.body.classList.toggle('theme-dark');
      setStoredTheme(isDark ? 'dark' : 'light');
    });
  }

  function showView(name) {
    views.forEach(function (el) {
      if (el.getAttribute('data-view') === name) el.style.display = ''; else el.style.display = 'none';
    });
    navLinks.forEach(function (a) {
      if (a.getAttribute('data-view') === name) a.parentElement.classList.add('active'); else a.parentElement.classList.remove('active');
    });
  }

  navLinks.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var view = a.getAttribute('data-view');
      showView(view);
      // close mobile sidebar after click
      if (sidebar && sidebar.classList.contains('show')) sidebar.classList.remove('show');
      if (view === 'users') loadUsers();
    });
  });

  if (profileLink) {
    profileLink.addEventListener('click', function (e) {
      e.preventDefault();
      closeDropdown();
      showView('profile');
    });
  }

  // Users loader + renderer
  function loadUsers() {
    var tbody = document.querySelector('#usersTable tbody');
    if (!tbody) return;
    // If we've already fetched data once, just re-render
    if (usersData && usersData.length && tbody.getAttribute('data-loaded') === 'true') {
      renderUsersTable(usersData);
      return;
    }

    fetch('assets/data/users.json')
      .then(function (res) { return res.json(); })
      .then(function (users) {
        usersData = users || [];
        renderUsersTable(usersData);
      })
      .catch(function (err) {
        console.error('Failed to load users', err);
      });
  }

  function renderUsersTable(list) {
    var tbody = document.querySelector('#usersTable tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    var current = getCurrentUser();
    var currentEmail = current && current.email ? String(current.email).toLowerCase() : '';

    var currentUser = getCurrentUser();
    var isAdmin = currentUser && currentUser.role === 'administrator';

    list.forEach(function (u) {
      var tr = document.createElement('tr');
      var fullName = (u.name || '') + (u.surname ? ' ' + u.surname : '');
      var actionsHtml = '<button class="btn btn-primary btn-show" data-id="' + u.id + '">Show</button>';
      if (isAdmin) {
        actionsHtml += ' <button class="btn btn-remove" data-id="' + u.id + '">Remove</button>';
      }

      tr.innerHTML =
        '<td>' + fullName + '</td>' +
        '<td>' + (u.email || '') + '</td>' +
        '<td>' + (u.phone || '') + '</td>' +
        '<td>' + (u.jobTitle || '') + '</td>' +
        '<td>' + actionsHtml + '</td>';

      try {
        if (currentEmail && String(u.email || '').toLowerCase() === currentEmail) {
          tr.classList.add('current-user');
        }
      } catch (err) {}

      tbody.appendChild(tr);
    });

    tbody.setAttribute('data-loaded', 'true');

    // Attach actions
    tbody.querySelectorAll('.btn-show').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-id');
        var user = usersData.find(function (x) { return String(x.id) === String(id); });
        if (user) alert('Password for ' + user.email + ': ' + (user.password || '(none)'));
      });
    });

    tbody.querySelectorAll('.btn-remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!confirm('Remove this user from the view? (non-persistent)')) return;
        var id = btn.getAttribute('data-id');
        usersData = usersData.filter(function (u) { return String(u.id) !== String(id); });
        var row = btn.closest('tr');
        if (row) row.parentElement.removeChild(row);
      });
    });

    // Initialize Simple-DataTables on the users table if available
    try {
      if (window.simpleDatatables) {
        var tableEl = document.getElementById('usersTable');
        if (tableEl && !tableEl.getAttribute('data-dt')) {
          // eslint-disable-next-line no-undef
          window.usersDataTable = new simpleDatatables.DataTable(tableEl);
          tableEl.setAttribute('data-dt', 'true');
        }
      }
    } catch (err) {
      console.warn('DataTables init failed', err);
    }
  }

  if (addUserForm) {
    addUserForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameInput = document.getElementById('addUserName');
      var emailInput = document.getElementById('addUserEmail');
      var phoneInput = document.getElementById('addUserPhone');
      var jobInput = document.getElementById('addUserJob');
      var passwordInput = document.getElementById('addUserPassword');
      var typeSelect = document.getElementById('addUserType');

      var fullName = (nameInput && nameInput.value || '').trim();
      var email = (emailInput && emailInput.value || '').trim();
      var phone = (phoneInput && phoneInput.value || '').trim();
      var job = (jobInput && jobInput.value || '').trim();
      var password = (passwordInput && passwordInput.value || '').trim();
      var role = (typeSelect && typeSelect.value) || 'staff';

      if (!fullName || !email || !password) {
        alert('Name, email and password are required.');
        return;
      }

      var nextId = usersData.length ? Math.max.apply(null, usersData.map(function (u) { return Number(u.id) || 0; })) + 1 : 1;
      var parts = fullName.split(/\s+/).filter(Boolean);
      var name = parts.shift() || fullName;
      var surname = parts.join(' ');

      var newUser = {
        id: nextId,
        name: name,
        surname: surname,
        email: email,
        phone: phone,
        jobTitle: job,
        password: password,
        role: role
      };

      usersData.push(newUser);

      // Also update demo auth store so new users can log in (demo only)
      try {
        var demo = localStorage.getItem('demoUsers');
        var parsed = demo ? JSON.parse(demo) : [];
        if (!Array.isArray(parsed)) parsed = [];
        parsed.push({ name: fullName, email: email.toLowerCase(), password: password, role: role, jobTitle: job, phone: phone });
        localStorage.setItem('demoUsers', JSON.stringify(parsed));
      } catch (err) {}

      renderUsersTable(usersData);
      closeAddUserModal();
    });
  }

  // Initialize to home view
  showView('home');
});
