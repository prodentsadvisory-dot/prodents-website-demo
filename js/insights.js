// Automatically formats dates relative to today (or parses a custom date string)
function getFormattedDate(daysAgo = 0, customDate = null) {
    const dateObj = customDate ? new Date(customDate) : new Date();
    if (!customDate && daysAgo > 0) {
        dateObj.setDate(dateObj.getDate() - daysAgo);
    }
    return dateObj.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

const prodentsInsights = [
    {
        num: "01",
        category: "Strategy",
        practice: "Business & Management Consulting",
        readTime: "7 Min Read",
        writerName: "Arjun Menon",
        writerRole: "Managing Partner",
        writerInitials: "AM",
        daysAgo: 0, // Automatically fetches today's date
        title: "Margin Resilience in Volatile Supply Markets: Why Legacy Cost-Cutting Fails",
        summary: "An empirical examination of unit-economics diagnostics—and why structural workflow redesign outperforms across-the-board budget cuts.",
        takeaways: [
            "Uniform expense freezes often starve high-margin delivery workflows while leaving structural bottlenecks untouched.",
            "Mapping cycle-time friction across cross-departmental handoffs exposes hidden margin leakage before headcount changes are considered.",
            "Organizations pairing 90-day KPI governance with granular product-line profitability achieve faster margin recovery."
        ],
        paragraphs: [
            "When input costs tighten or demand growth moderates, leadership teams frequently default to uniform percentage reductions across operating budgets. While rapid on paper, blanket cuts rarely address the underlying process friction driving cost overruns.",
            "In our diagnostic reviews across mid-market and enterprise operations, the primary drivers of margin erosion are almost always concentrated in three structural areas: unmonitored handoff delays between commercial and delivery teams, legacy approval bottlenecks, and pricing tiers disconnected from true service delivery costs.",
            "A disciplined operational turnaround begins with isolating unit economics at the product or client-segment level, redesigning core workflows to eliminate rework, and establishing transparent weekly governance scorecards."
        ]
    },
    {
        num: "02",
        category: "Intelligence",
        practice: "Research & Market Intelligence",
        readTime: "6 Min Read",
        writerName: "Dr. Elena Vance",
        writerRole: "Partner, Research & Intelligence",
        writerInitials: "EV",
        daysAgo: 4,
        title: "Beyond Syndicated Reports: Designing Primary Research for High-Stakes Market Entry",
        summary: "How structured buyer interviews and pricing sensitivity models eliminate blind spots when entering unfamiliar commercial territories.",
        takeaways: [
            "Syndicated industry reports rely on lagging historical averages that obscure emerging buyer switching triggers.",
            "Custom primary research isolates real willingness-to-pay and procurement friction before capital is committed.",
            "Combining qualitative executive interviews with quantitative cohort sizing creates defensible boardroom conviction."
        ],
        paragraphs: [
            "Entering a new geographic market or launching an adjacent commercial offering carries substantial capital risk when decisions rely solely on off-the-shelf industry summaries.",
            "By the time macro market reports are published, pricing dynamics, regulatory interpretations, and buyer procurement preferences have often shifted. High-conviction market entry requires primary research engineered specifically around your commercial hypotheses.",
            "Structuring a focused 4-week study—combining targeted buyer interviews, competitive whitespace mapping, and pricing elasticity tests—gives executive boards empirical clarity prior to full-scale rollout."
        ]
    },
    {
        num: "03",
        category: "Digital",
        practice: "Technology & Digital Transformation",
        readTime: "5 Min Read",
        writerName: "Rohan Krishnan",
        writerRole: "Director, Digital & PMO",
        writerInitials: "RK",
        daysAgo: 9,
        title: "Workflow Before Software: Preventing Failed Enterprise Technology Rollouts",
        summary: "Why automating fragmented manual processes multiplies operational friction—and how to sequence process redesign before vendor selection.",
        takeaways: [
            "Deploying new software onto undocumented manual workflows accelerates errors rather than efficiency.",
            "Future-state process mapping must precede vendor demonstrations and licensing commitments.",
            "Phased adoption milestones and internal capability training determine long-term platform ROI."
        ],
        paragraphs: [
            "Across industries, digital transformation budgets frequently underdeliver because organizations treat software procurement as a substitute for operational clarity.",
            "When teams automate ambiguous approval chains or fragmented data definitions, new platforms simply digitize existing bottlenecks at higher licensing costs.",
            "Successful digital mandates invert the sequence: first redesigning end-to-end workflows around measurable cycle-time targets, establishing vendor-neutral technical specifications, and executing phased user adoption."
        ]
    },
    {
        num: "04",
        category: "Digital",
        practice: "Startup & Entrepreneurship Advisory",
        readTime: "6 Min Read",
        writerName: "Meera Nair",
        writerRole: "Partner, Brand & Growth",
        writerInitials: "MN",
        daysAgo: 15,
        title: "Validating Commercial Unit Economics Before Scaling Customer Acquisition",
        summary: "A structured diagnostic framework for founders transitioning from early pilot traction to repeatable institutional revenue.",
        takeaways: [
            "Early founder-led sales often mask true customer acquisition costs and onboarding effort.",
            "Stress-testing gross margin and retention assumptions early protects equity during institutional fundraising.",
            "Focused 180-day go-to-market sequencing concentrates resources on highest-converting buyer cohorts."
        ],
        paragraphs: [
            "Early commercial traction proves that a problem exists, but scaling capital prematurely before validating repeatable unit economics remains a leading cause of venture stall.",
            "Founding teams benefit from separating bespoke pilot commitments from standardized commercial offerings—quantifying true onboarding hours, support overhead, and net retention across distinct customer profiles.",
            "Armed with a validated commercial model and clear 180-day execution milestones, emerging ventures enter partner and investor discussions from a position of empirical strength."
        ]
    },
    {
        num: "05",
        category: "Strategy",
        practice: "Project Management Consulting",
        readTime: "5 Min Read",
        writerName: "Rohan Krishnan",
        writerRole: "Director, Digital & PMO",
        writerInitials: "RK",
        daysAgo: 22,
        title: "Eliminating Delivery Drift in Multi-Workstream Corporate Transformations",
        summary: "How lightweight governance cadences and clear dependency mapping keep complex initiatives on schedule without bureaucracy.",
        takeaways: [
            "Status meetings that review past activity fail to catch cross-team dependency bottlenecks early.",
            "Explicit single-point ownership and clear escalation thresholds prevent silent timeline slippage.",
            "Visual critical-path dashboards align executive sponsors and workstream leads around shared milestones."
        ],
        paragraphs: [
            "Strategic initiatives rarely fail from a lack of ambition; they stall in the spaces between departments where accountability and handoff dependencies blur.",
            "Heavyweight reporting templates often slow teams down without improving visibility. Effective programme governance focuses strictly on critical-path milestones, inter-team dependencies, and rapid risk escalation.",
            "Establishing concise weekly variance reviews and clear decision rights keeps multi-workstream programmes moving predictably from blueprint to operational reality."
        ]
    },
    {
        num: "06",
        category: "Intelligence",
        practice: "Marketing & Brand Strategy",
        readTime: "6 Min Read",
        writerName: "Meera Nair",
        writerRole: "Partner, Brand & Growth",
        writerInitials: "MN",
        daysAgo: 30,
        title: "Evidence-Led Brand Positioning in Crowded Advisory & B2B Categories",
        summary: "Moving away from generic corporate claims toward differentiated market authority anchored in verifiable buyer outcomes.",
        takeaways: [
            "Category parity happens when competing firms rely on identical abstract promises.",
            "Positioning anchored in specific diagnostic methodologies and measurable outcomes strengthens pricing power.",
            "Consistent messaging architecture aligns commercial sales conversations with institutional brand authority."
        ],
        paragraphs: [
            "In complex B2B and professional service sectors, buyers face dozens of providers using nearly indistinguishable language around innovation and excellence.",
            "True differentiation emerges when brand positioning is rooted in empirical buyer research—articulating exactly which operational problems you solve, how your methodology works, and what verifiable outcomes clients achieve.",
            "Translating that positioning into a cohesive verbal identity and go-to-market playbook turns brand perception into a measurable commercial asset."
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const gridMount = document.getElementById('insights-grid-mount');
    const emptyState = document.getElementById('insights-empty-state');
    const filterBtns = document.querySelectorAll('.insight-filter-btn');
    const searchInput = document.getElementById('insight-search-input');
    const heroFlagshipDate = document.getElementById('hero-flagship-date');

    // Populate Hero Flagship Automatic Date
    if (heroFlagshipDate && prodentsInsights[0]) {
        heroFlagshipDate.textContent = getFormattedDate(prodentsInsights[0].daysAgo, prodentsInsights[0].customDate);
    }

    // Reader Drawer Elements
    const backdrop = document.getElementById('insight-reader-backdrop');
    const closeBtn = document.getElementById('reader-close-btn');
    const scrollBody = document.getElementById('reader-scroll-body');
    const scrollProgress = document.getElementById('reader-scroll-progress');
    const prevBtn = document.getElementById('reader-prev-btn');
    const nextBtn = document.getElementById('reader-next-btn');

    let activeFilter = 'all';
    let searchQuery = '';
    let activeArticleIndex = 0;

    function renderCards() {
        if (!gridMount) return;

        const filtered = prodentsInsights
            .map((item, originalIndex) => ({
                ...item,
                originalIndex,
                formattedDate: getFormattedDate(item.daysAgo, item.customDate)
            }))
            .filter(item => {
                const matchesCat = activeFilter === 'all' || item.category === activeFilter;
                const q = searchQuery.toLowerCase().trim();
                const matchesSearch = !q ||
                    item.title.toLowerCase().includes(q) ||
                    item.practice.toLowerCase().includes(q) ||
                    item.writerName.toLowerCase().includes(q) ||
                    item.summary.toLowerCase().includes(q);
                return matchesCat && matchesSearch;
            });

        if (filtered.length === 0) {
            gridMount.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        gridMount.innerHTML = filtered.map(item => `
            <article data-open-insight="${item.originalIndex}"
                     class="insight-card cursor-pointer group rounded-3xl bg-white border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between space-y-6">
                <div class="space-y-4">
                    <div class="flex items-center justify-between gap-2">
                        <span class="px-3 py-1 rounded-full bg-slate-100 group-hover:bg-[#2563eb]/10 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0a1930] group-hover:text-[#2563eb] transition-colors">
                            Insights ${item.num}
                        </span>
                        <div class="flex items-center gap-2 text-xs font-medium text-slate-400">
                            <time>${item.formattedDate}</time>
                            <span>&bull;</span>
                            <span>${item.readTime}</span>
                        </div>
                    </div>

                    <div class="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2563eb]">
                        ${item.practice}
                    </div>

                    <h3 class="font-display font-bold text-xl text-[#0a1930] group-hover:text-[#2563eb] leading-snug transition-colors">
                        ${item.title}
                    </h3>

                    <p class="text-sm text-slate-600 leading-relaxed">
                        ${item.summary}
                    </p>
                </div>

                <!-- Writer Attribution + Read Action -->
                <div class="pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div class="flex items-center gap-2.5 min-w-0">
                        <div class="w-8 h-8 rounded-xl bg-[#0a1930] text-white font-display font-bold text-[11px] flex items-center justify-center shrink-0">
                            ${item.writerInitials}
                        </div>
                        <div class="min-w-0">
                            <div class="text-xs font-bold text-[#0a1930] truncate">${item.writerName}</div>
                            <div class="text-[11px] text-slate-400 truncate">${item.writerRole}</div>
                        </div>
                    </div>

                    <div class="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-[#2563eb] text-[#0a1930] group-hover:text-white flex items-center justify-center shrink-0 transition-all">
                        <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
                    </div>
                </div>
            </article>
        `).join('');

        if (window.lucide) lucide.createIcons();

        gridMount.querySelectorAll('.insight-card').forEach(card => {
            card.addEventListener('click', () => {
                openReader(Number(card.dataset.openInsight));
            });

            card.addEventListener('mousemove', (e) => {
                if (window.innerWidth < 1024) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = (((y - rect.height / 2) / (rect.height / 2)) * -3).toFixed(2);
                const rotateY = (((x - rect.width / 2) / (rect.width / 2)) * 3).toFixed(2);
                card.style.transform = `perspective(950px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(950px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }

    function openReader(index) {
        activeArticleIndex = (index + prodentsInsights.length) % prodentsInsights.length;
        const data = prodentsInsights[activeArticleIndex];
        if (!data || !backdrop) return;

        const publishedDate = getFormattedDate(data.daysAgo, data.customDate);

        document.getElementById('reader-code').textContent = `Insights ${data.num}`;
        document.getElementById('reader-read-time').textContent = `${publishedDate} • ${data.readTime}`;
        document.getElementById('reader-practice').textContent = data.practice;
        document.getElementById('reader-title').textContent = data.title;
        document.getElementById('reader-meta').innerHTML = `
            <div class="flex items-center gap-3 pt-1">
                <div class="w-9 h-9 rounded-xl bg-[#0a1930] text-white font-display font-bold text-xs flex items-center justify-center shrink-0">
                    ${data.writerInitials}
                </div>
                <div>
                    <div class="text-xs font-bold text-[#0a1930]">By ${data.writerName} <span class="font-normal text-slate-500">(${data.writerRole})</span></div>
                    <div class="text-[11px] text-slate-400">Published ${publishedDate}</div>
                </div>
            </div>
        `;

        document.getElementById('reader-takeaways').innerHTML = data.takeaways
            .map(point => `<li>${point}</li>`)
            .join('');

        document.getElementById('reader-content').innerHTML = data.paragraphs
            .map(p => `<p>${p}</p>`)
            .join('');

        if (scrollBody) scrollBody.scrollTop = 0;
        if (scrollProgress) scrollProgress.style.width = '0%';

        backdrop.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeReader() {
        if (!backdrop) return;
        backdrop.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.className = 'insight-filter-btn px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-white text-slate-600 border border-slate-200 hover:border-[#2563eb] hover:text-[#2563eb] transition-all';
            });
            btn.className = 'insight-filter-btn px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#0a1930] text-white transition-all';
            activeFilter = btn.dataset.filter;
            renderCards();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderCards();
        });
    }

    document.querySelectorAll('.open-insight-btn').forEach(btn => {
        btn.addEventListener('click', () => openReader(Number(btn.dataset.openInsight)));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeReader);
    if (backdrop) {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) closeReader();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeReader();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => openReader(activeArticleIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => openReader(activeArticleIndex + 1));

    if (scrollBody && scrollProgress) {
        scrollBody.addEventListener('scroll', () => {
            const maxScroll = scrollBody.scrollHeight - scrollBody.clientHeight;
            const pct = maxScroll > 0 ? (scrollBody.scrollTop / maxScroll) * 100 : 100;
            scrollProgress.style.width = `${Math.min(100, pct)}%`;
        });
    }

    renderCards();
});