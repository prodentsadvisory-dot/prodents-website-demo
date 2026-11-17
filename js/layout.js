// 1. Auto-load Fonts, CSS, and Icons into <head>
document.head.insertAdjacentHTML('beforeend', `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;0,800;1,400;1,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
`);

const lucideScript = document.createElement('script');
lucideScript.src = 'https://unpkg.com/lucide@latest';
lucideScript.onload = () => { if (window.lucide) lucide.createIcons(); };
document.head.appendChild(lucideScript);

// 2. Shared Tailwind Colors & Fonts
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['"Playfair Display"', 'Georgia', 'serif'],
            },
            colors: {
                apex: {
                    navy: '#0a1930',
                    navyDeep: '#060f1e',
                    navyMid: '#132c52',
                    navyLight: '#1e3557',
                    slate: '#283a4c',
                    blue: '#2563eb',
                    blueLight: '#3b82f6'
                }
            },
            boxShadow: {
                'executive': '0 25px 50px -12px rgba(10, 25, 48, 0.16)'
            }
        }
    }
};

// 3. All 10 Advisory Practices for Mega-Menu & Active Route Detection
const navPractices = [
    { num: '01', title: 'Business & Management Consulting', short: 'Business & Management', icon: 'briefcase', desc: 'Business planning, operational improvement and strategic decision support.', href: 'business-management.html' },
    { num: '02', title: 'Marketing & Brand Strategy', short: 'Marketing & Brand', icon: 'megaphone', desc: 'Market positioning, brand development and customer-centred growth planning.', href: 'marketing-brand.html' },
    { num: '03', title: 'Research & Market Intelligence', short: 'Research & Intelligence', icon: 'search', desc: 'Market studies, research design and evidence-led business insights.', href: 'research-intelligence.html' },
    { num: '04', title: 'Startup & Entrepreneurship Advisory', short: 'Startup & Entrepreneurship', icon: 'rocket', desc: 'Business model development, opportunity assessment and go-to-market planning.', href: 'startup-advisory.html' },
    { num: '05', title: 'Training & Development', short: 'Training & Development', icon: 'award', desc: 'Workshops, learning programmes and professional capability building.', href: 'training-development.html' },
    { num: '06', title: 'Project Management Consulting', short: 'Project Management', icon: 'kanban', desc: 'Project planning, tracking, coordination and delivery improvement.', href: 'project-management.html' },
    { num: '07', title: 'Technology & Digital Transformation', short: 'Technology & Digital', icon: 'cpu', desc: 'Digital opportunity mapping, process redesign and technology adoption planning.', href: 'technology-transformation.html' },
    { num: '08', title: 'HR & Organisational Consulting', short: 'HR & Organisational', icon: 'users', desc: 'People processes, organisational effectiveness and talent development support.', href: 'hr-organisational.html' },
    { num: '09', title: 'Financial Advisory', short: 'Financial Advisory', icon: 'landmark', desc: 'Financial planning support, business analysis and performance insights.', href: 'financial-advisory.html' },
    { num: '10', title: 'Education & Academic Consulting', short: 'Education & Academic', icon: 'graduation-cap', desc: 'Academic projects, institutional development and research support.', href: 'education-academic.html' }
];

// 4. Auto-insert Header and Footer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
    const practiceHrefs = navPractices.map(p => p.href);
    const isServicesSectionActive = currentPage === 'services.html' || practiceHrefs.includes(currentPage);

    const navItems = [
        { label: 'Home', href: 'index.html' },
        { label: 'About', href: 'about.html' },
        { label: 'Services', hasMegaMenu: true },
        { label: 'Insights', href: 'insights.html' },
        { label: 'Contact', href: 'contact.html' }
    ];

    // Desktop Mega-Menu Items
    const megaMenuItemsHTML = navPractices.map(p => {
        const isCurrentPractice = currentPage === p.href;
        return `
            <a href="${p.href}"
               data-preview-num="${p.num}"
               data-preview-title="${p.title}"
               data-preview-desc="${p.desc}"
               data-preview-href="${p.href}"
               class="mega-practice-item group/item flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 ${isCurrentPractice ? 'bg-[#2563eb]/10 ring-1 ring-[#2563eb]/30' : 'hover:bg-slate-50'}">
                <div class="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center transition-colors ${isCurrentPractice ? 'bg-[#2563eb] text-white' : 'bg-slate-100 text-[#0a1930] group-hover/item:bg-[#2563eb] group-hover/item:text-white'}">
                    <i data-lucide="${p.icon}" class="w-4 h-4"></i>
                </div>
                <div class="min-w-0">
                    <div class="flex items-center gap-1.5">
                        <span class="text-[10px] font-bold tracking-wider ${isCurrentPractice ? 'text-[#2563eb]' : 'text-slate-400 group-hover/item:text-[#2563eb]'}">${p.num}</span>
                        <span class="text-xs font-bold truncate ${isCurrentPractice ? 'text-[#2563eb]' : 'text-[#0a1930] group-hover/item:text-[#2563eb]'}">${p.short}</span>
                    </div>
                    <p class="text-[11px] text-slate-500 line-clamp-1 mt-0.5">${p.desc}</p>
                </div>
            </a>
        `;
    }).join('');

    // Desktop Navigation Links (Services is now a button, not a broken link)
    const desktopLinks = navItems.map(item => {
        const isActive = item.hasMegaMenu
            ? isServicesSectionActive
            : (currentPage === item.href || (currentPage === '' && item.href === 'index.html'));

        if (item.hasMegaMenu) {
            return `
                <div class="relative group py-6" id="desktop-services-trigger">
                    <button type="button" ${isActive ? 'aria-current="page"' : ''} class="relative inline-flex items-center gap-1.5 py-1 text-sm cursor-pointer ${isActive ? 'font-bold text-[#2563eb]' : 'font-semibold text-[#0a1930] hover:text-[#2563eb]'} transition-colors">
                        <span>${item.label}</span>
                        <i data-lucide="chevron-down" class="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180"></i>
                        ${isActive ? '<span class="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-[#2563eb]"></span>' : ''}
                    </button>

                    <!-- Executive Split Mega-Menu -->
                    <div class="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out fixed left-0 right-0 top-20 pt-2 z-50 pointer-events-none group-hover:pointer-events-auto">
                        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div class="rounded-3xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden grid grid-cols-12">
                                
                                <!-- Left Dark Navy Live Preview Panel -->
                                <div class="col-span-4 bg-[#0a1930] text-white p-7 flex flex-col justify-between relative overflow-hidden">
                                    <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(96,165,250,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(96,165,250,0.07)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
                                    <div class="relative z-10 space-y-3">
                                        <div class="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#60a5fa]">
                                            <span class="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-ping"></span>
                                            <span id="mega-preview-badge">Practice 01</span>
                                        </div>
                                        <h4 id="mega-preview-title" class="font-display font-bold text-xl text-white leading-snug">
                                            Business &amp; Management Consulting
                                        </h4>
                                        <p id="mega-preview-desc" class="text-xs text-slate-300 leading-relaxed">
                                            Business planning, operational improvement and strategic decision support.
                                        </p>
                                    </div>

                                    <div class="relative z-10 pt-6 mt-6 border-t border-[#60a5fa]/20 flex items-center justify-between">
                                        <a id="mega-preview-link" href="business-management.html" class="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#93c5fd] hover:text-white transition-colors">
                                            <span>View Service</span>
                                            <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
                                        </a>
                                    </div>
                                </div>

                                <!-- Right 2-Column 10-Service Matrix -->
                                <div class="col-span-8 p-6 bg-white">
                                    <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                                        <span class="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                                            Ten Specialized Advisory Practices
                                        </span>
                                    </div>
                                    <div class="grid grid-cols-2 gap-1.5">
                                        ${megaMenuItemsHTML}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        return isActive
            ? `<a href="${item.href}" aria-current="page" class="relative py-1 text-sm font-bold text-[#2563eb] transition-colors">
                   ${item.label}
                   <span class="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-[#2563eb]"></span>
               </a>`
            : `<a href="${item.href}" class="py-1 text-sm font-semibold text-[#0a1930] hover:text-[#2563eb] transition-colors">
                   ${item.label}
               </a>`;
    }).join('');

    // Mobile Drawer Links (Services toggles the dropdown instead of leaving the page)
    const mobilePracticeSublinks = navPractices.map(p => {
        const isCurrentPractice = currentPage === p.href;
        return `
            <a href="${p.href}" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors ${isCurrentPractice ? 'bg-[#2563eb] text-white font-bold' : 'text-slate-600 hover:bg-slate-100 font-medium'}">
                <span class="text-[10px] font-bold ${isCurrentPractice ? 'text-blue-200' : 'text-[#2563eb]'}">${p.num}</span>
                <span class="truncate">${p.short}</span>
            </a>
        `;
    }).join('');

    const mobileLinks = navItems.map(item => {
        const isActive = item.hasMegaMenu
            ? isServicesSectionActive
            : (currentPage === item.href || (currentPage === '' && item.href === 'index.html'));

        if (item.hasMegaMenu) {
            return `
                <div class="rounded-xl ${isActive ? 'bg-[#2563eb]/5' : ''}">
                    <button type="button" onclick="document.getElementById('mobile-services-sub').classList.toggle('hidden'); this.querySelector('svg').classList.toggle('rotate-180')" class="w-full flex items-center justify-between px-4 py-3 font-bold text-left ${isActive ? 'text-[#2563eb]' : 'text-[#0a1930]'}">
                        <span>${item.label}</span>
                        <i data-lucide="chevron-down" class="w-4 h-4 transition-transform duration-200"></i>
                    </button>
                    <div id="mobile-services-sub" class="${isActive ? '' : 'hidden'} px-3 pb-3 pt-1 space-y-1 border-t border-slate-200/70">
                        ${mobilePracticeSublinks}
                    </div>
                </div>
            `;
        }

        return isActive
            ? `<a href="${item.href}" aria-current="page" class="flex items-center justify-between px-4 py-3 rounded-xl font-bold text-[#2563eb] bg-[#2563eb]/10">
                   <span>${item.label}</span>
                   <span class="w-2 h-2 rounded-full bg-[#2563eb]"></span>
               </a>`
            : `<a href="${item.href}" class="block px-4 py-3 rounded-xl font-semibold text-[#0a1930] hover:bg-slate-100 transition-colors">
                   ${item.label}
               </a>`;
    }).join('');

    // Insert Header at the top of <body>
    document.body.insertAdjacentHTML('afterbegin', `
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <a href="index.html" class="font-display font-extrabold text-2xl tracking-wide text-[#0a1930]">
                    Prodents<span class="text-[#2563eb]">.</span>
                </a>
                <nav class="hidden md:flex items-center gap-8 ml-auto">
                    ${desktopLinks}
                </nav>
                <button onclick="document.getElementById('mobile-menu').classList.toggle('hidden')" aria-label="Toggle Menu" class="md:hidden p-2.5 text-[#0a1930]">
                    <i data-lucide="menu" class="w-6 h-6"></i>
                </button>
            </div>
        </div>
        <div id="mobile-menu" class="hidden md:hidden max-h-[82vh] overflow-y-auto bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl">
            ${mobileLinks}
        </div>
    </header>`);

    // Interactive Live-Preview Updater inside Desktop Mega-Menu
    const previewBadge = document.getElementById('mega-preview-badge');
    const previewTitle = document.getElementById('mega-preview-title');
    const previewDesc = document.getElementById('mega-preview-desc');
    const previewLink = document.getElementById('mega-preview-link');

    document.querySelectorAll('.mega-practice-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (previewBadge) previewBadge.textContent = `Practice ${item.dataset.previewNum}`;
            if (previewTitle) previewTitle.textContent = item.dataset.previewTitle;
            if (previewDesc) previewDesc.textContent = item.dataset.previewDesc;
            if (previewLink) previewLink.href = item.dataset.previewHref;
        });
    });

    // Insert Footer at the bottom of <body>
    document.body.insertAdjacentHTML('beforeend', `
    <footer class="bg-[#060f1e] text-slate-300 border-t border-[#60a5fa]/15">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#60a5fa]/15">
                
                <!-- Left Brand Column -->
                <div class="lg:col-span-4 space-y-5">
                    <a href="index.html" class="font-display font-extrabold text-2xl tracking-wide text-white">Prodents<span class="text-[#60a5fa]">.</span></a>
                    <p class="text-sm text-slate-400 leading-relaxed max-w-sm">Data-driven strategic advisory for global enterprises, private equity leaders, and executive boards navigating complex market transformations.</p>
                    <div class="flex items-center gap-3 pt-2">
                        <a href="#linkedin" aria-label="LinkedIn" class="w-10 h-10 rounded-xl bg-[#0a1930] hover:bg-[#2563eb] border border-[#60a5fa]/25 flex items-center justify-center text-white transition-all"><svg class="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"/></svg></a>
                        <a href="#instagram" aria-label="Instagram" class="w-10 h-10 rounded-xl bg-[#0a1930] hover:bg-[#2563eb] border border-[#60a5fa]/25 flex items-center justify-center text-white transition-all"><svg class="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2A5.8 5.8 0 0 1 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2M7.6 4A3.6 3.6 0 0 0 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4A3.6 3.6 0 0 0 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6M17.25 5.5A1.25 1.25 0 0 1 18.5 6.75A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75A1.25 1.25 0 0 1 17.25 5.5M12 7A5 5 0 0 1 17 12A5 5 0 0 1 12 17A5 5 0 0 1 7 12A5 5 0 0 1 12 7M12 9A3 3 0 0 0 9 12A3 3 0 0 0 12 15A3 3 0 0 0 15 12A3 3 0 0 0 12 9Z"/></svg></a>
                        <a href="#facebook" aria-label="Facebook" class="w-10 h-10 rounded-xl bg-[#0a1930] hover:bg-[#2563eb] border border-[#60a5fa]/25 flex items-center justify-center text-white transition-all"><svg class="w-4 h-4 fill-current text-white" viewBox="0 0 24 24"><path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z"/></svg></a>
                    </div>
                </div>

                <!-- Empty Center Spacer -->
                <div class="hidden lg:block lg:col-span-5"></div>

                <!-- Right Contact Column -->
                <div class="lg:col-span-3 space-y-4">
                    <h4 class="text-xs font-bold uppercase tracking-widest text-white">Reach Us</h4>
                    <ul class="space-y-3.5 text-sm text-slate-400">
                        <li class="flex items-start gap-3"><i data-lucide="map-pin" class="w-4 h-4 text-[#60a5fa] shrink-0 mt-1"></i><span>Kochi, Ernakulam</span></li>
                        <li class="flex items-center gap-3"><i data-lucide="phone" class="w-4 h-4 text-[#60a5fa] shrink-0"></i><span>+91 9207367394</span></li>
                        <li class="flex items-center gap-3"><i data-lucide="mail" class="w-4 h-4 text-[#60a5fa] shrink-0"></i><span>prodentsadvisory@gmail.com</span></li>
                    </ul>
                </div>

            </div>
            <div class="pt-8 border-t border-[#60a5fa]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                <p>&copy; 2026 Prodents. All rights reserved.</p>
                <div class="flex items-center gap-6">
                    <a href="privacy.html" class="hover:text-white">Privacy Policy</a>
                    <a href="terms.html" class="hover:text-white">Terms of Use</a>
                    <a href="cookies.html" class="hover:text-white">Cookie Policy</a>
                </div>
            </div>
        </div>
    </footer>`);

    if (window.lucide) lucide.createIcons();
});