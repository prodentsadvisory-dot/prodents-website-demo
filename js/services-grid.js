const prodentsServices = [
    {
        num: "01",
        title: "Business & Management Consulting",
        icon: "briefcase",
        desc: "Business planning, operational improvement and strategic decision support.",
        href: "business-management.html"
    },
    {
        num: "02",
        title: "Marketing & Brand Strategy",
        icon: "megaphone",
        desc: "Market positioning, brand development and customer-centred growth planning.",
        href: "marketing-brand.html"
    },
    {
        num: "03",
        title: "Research & Market Intelligence",
        icon: "search",
        desc: "Market studies, research design and evidence-led business insights.",
        href: "research-intelligence.html"
    },
    {
        num: "04",
        title: "Startup & Entrepreneurship Advisory",
        icon: "rocket",
        desc: "Business model development, opportunity assessment and go-to-market planning.",
        href: "startup-advisory.html"
    },
    {
        num: "05",
        title: "Training & Development",
        icon: "award",
        desc: "Workshops, learning programmes and professional capability building.",
        href: "training-development.html"
    },
    {
        num: "06",
        title: "Project Management Consulting",
        icon: "kanban",
        desc: "Project planning, tracking, coordination and delivery improvement.",
        href: "project-management.html"
    },
    {
        num: "07",
        title: "Technology & Digital Transformation",
        icon: "cpu",
        desc: "Digital opportunity mapping, process redesign and technology adoption planning.",
        href: "technology-transformation.html"
    },
    {
        num: "08",
        title: "HR & Organisational Consulting",
        icon: "users",
        desc: "People processes, organisational effectiveness and talent development support.",
        href: "hr-organisational.html"
    },
    {
        num: "09",
        title: "Financial Advisory",
        icon: "landmark",
        desc: "Financial planning support, business analysis and performance insights, subject to applicable professional requirements.",
        href: "financial-advisory.html"
    },
    {
        num: "10",
        title: "Education & Academic Consulting",
        icon: "graduation-cap",
        desc: "Academic projects, institutional development and research support.",
        href: "education-academic.html"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('services-grid-mount');
    const scrollStage = document.getElementById('services-scroll-stage');
    const progressBar = document.getElementById('unfold-progress-bar');
    const statusText = document.getElementById('unfold-status-text');

    if (!gridContainer) return;

    // 1. Render all 10 clickable service cards
    gridContainer.innerHTML = prodentsServices.map((service, idx) => `
        <a href="${service.href}" 
           data-index="${idx}"
           class="service-card group block rounded-3xl bg-slate-50 hover:bg-[#0a1930] border border-slate-200/90 hover:border-[#60a5fa]/35 p-6 flex flex-col justify-between shadow-md">
            
            <span class="service-watermark pointer-events-none select-none absolute -bottom-3 -right-2 font-display font-extrabold text-7xl text-slate-200/55 group-hover:text-[#132c52]/80 z-0">
                ${service.num}
            </span>

            <div class="relative z-10">
                <div class="flex items-center justify-between mb-5">
                    <div class="w-11 h-11 rounded-2xl bg-white group-hover:bg-gradient-to-br group-hover:from-[#2563eb] group-hover:to-[#3b82f6] border border-slate-200 group-hover:border-transparent text-[#2563eb] group-hover:text-white flex items-center justify-center shadow-sm transition-all duration-300">
                        <i data-lucide="${service.icon}" class="w-5 h-5"></i>
                    </div>
                    <span class="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-[#93c5fd] transition-colors">
                        ${service.num}
                    </span>
                </div>

                <h3 class="font-display font-bold text-lg text-[#0a1930] group-hover:text-white transition-colors mb-2 leading-snug">
                    ${service.title}
                </h3>
                <p class="text-xs sm:text-sm text-slate-600 group-hover:text-slate-300/95 leading-relaxed transition-colors">
                    ${service.desc}
                </p>
            </div>

            <div class="relative z-10 pt-4 mt-5 border-t border-slate-200/80 group-hover:border-[#60a5fa]/20 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-[#2563eb] group-hover:text-[#60a5fa] transition-colors">
                <span>Explore</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"></i>
            </div>
        </a>
    `).join('');

    if (window.lucide) {
        lucide.createIcons();
    }

    const cards = Array.from(gridContainer.querySelectorAll('.service-card'));
    let isFullyUnfolded = false;

    // Smooth cubic ease-out curve
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    // 2. Scroll-Driven Fold -> Unfold Calculation
    function updateCardUnfold() {
        if (!scrollStage || window.innerWidth < 1024) {
            // Reset transforms cleanly on mobile/tablet
            cards.forEach(card => {
                card.style.transform = '';
                card.style.opacity = '1';
                card.style.zIndex = '';
            });
            isFullyUnfolded = true;
            return;
        }

        const stageRect = scrollStage.getBoundingClientRect();
        const scrollableDistance = stageRect.height - window.innerHeight;
        if (scrollableDistance <= 0) return;

        // Calculate normalized scroll progress (0 = folded stack, 1 = fully unfolded grid)
        const rawProgress = -stageRect.top / scrollableDistance;
        const progress = Math.max(0, Math.min(1, rawProgress));
        const eased = easeOutCubic(progress);
        const foldAmount = 1 - eased; // 1 = completely folded, 0 = flat in grid

        isFullyUnfolded = progress >= 0.96;

        // Update UI progress bar & label
        if (progressBar) progressBar.style.width = `${Math.round(progress * 100)}%`;
        if (statusText) {
            statusText.textContent = isFullyUnfolded
                ? '10 Practices Unlocked'
                : `Unfolding Deck (${Math.round(progress * 100)}%)`;
        }

        const gridRect = gridContainer.getBoundingClientRect();
        const gridCenterX = gridRect.left + gridRect.width / 2;
        const gridCenterY = gridRect.top + gridRect.height / 2;

        cards.forEach((card, index) => {
            // Measure natural grid cell position without active transform
            const prevTransform = card.style.transform;
            card.style.transform = 'none';
            const cardRect = card.getBoundingClientRect();
            card.style.transform = prevTransform;

            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;

            // Offset needed to pull card into the central folded stack
            const deltaX = (gridCenterX - cardCenterX) * foldAmount;
            const deltaY = (gridCenterY - cardCenterY + index * 3) * foldAmount;

            // Alternating fan angle & 3D folder tilt when stacked
            const fanAngle = ((index - 4.5) * 2.6) * foldAmount;
            const foldRotateX = 16 * foldAmount;
            const foldScale = 1 - (0.08 * foldAmount);

            // Stack order: Card 01 sits on top of the folded deck
            card.style.zIndex = foldAmount > 0.05 ? String(20 - index) : '1';
            card.style.pointerEvents = progress > 0.75 ? 'auto' : 'none';

            if (!isFullyUnfolded) {
                card.style.transform = `
                    perspective(1100px)
                    translate3d(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px, 0px)
                    rotateZ(${fanAngle.toFixed(2)}deg)
                    rotateX(${foldRotateX.toFixed(2)}deg)
                    scale(${foldScale.toFixed(3)})
                `;
            }
        });
    }

    // 3. Hover 3D Tilt & Spotlight (Active once unfolded)
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (!isFullyUnfolded) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            if (!isFullyUnfolded) return;
            card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // Smooth scroll listener using requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateCardUnfold();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener('resize', updateCardUnfold);
    updateCardUnfold();
});