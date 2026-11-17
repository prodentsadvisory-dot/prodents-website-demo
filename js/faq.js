const prodentsFaqs = [
    {
        num: "01",
        category: "Methodology",
        group: "Methodology",
        question: "How does Prodents tailor engagements compared to traditional firms?",
        answer: "We do not deploy pre-packaged slide templates. Every engagement begins with primary empirical diagnostics—examining your unit economics, operational workflows, and market position—to build decision frameworks engineered specifically around your commercial constraints."
    },
    {
        num: "02",
        category: "Engagement Scope",
        group: "Engagement",
        question: "Can we combine multiple advisory practices into a single mandate?",
        answer: "Yes. Complex transformations rarely sit inside a single silo. We frequently assemble cross-functional teams combining Business & Management Consulting with Research & Market Intelligence, Technology Transformation, or Financial Advisory under one unified governance charter."
    },
    {
        num: "03",
        category: "Timelines",
        group: "Engagement",
        question: "What is the typical duration of a strategic or operational engagement?",
        answer: "Focused diagnostic audits, feasibility assessments, and go-to-market blueprints typically run 4 to 6 weeks. Multi-workstream operational restructurings, PMO governance mandates, and institutional capability programmes generally span 3 to 6 months with clear 30-day milestone gates."
    },
    {
        num: "04",
        category: "Confidentiality",
        group: "Governance",
        question: "How do you safeguard proprietary financial and strategic data?",
        answer: "All client data, research findings, and boardroom deliverables are governed by strict mutual non-disclosure agreements (NDAs), isolated workspace permissions, and anonymized research protocols—ensuring complete discretion across competitive markets."
    },
    {
        num: "05",
        category: "Client Profile",
        group: "Methodology",
        question: "Do you advise early-stage startups as well as established enterprises?",
        answer: "Yes. Through our Startup & Entrepreneurship Advisory practice, we help founders validate business models and prepare for institutional growth, while our enterprise and academic practices serve established corporations, private equity portfolios, and higher-education institutions."
    },
    {
        num: "06",
        category: "Onboarding",
        group: "Governance",
        question: "How do we initiate a diagnostic consultation with Prodents?",
        answer: "Submit a brief overview of your objectives via our Contact page. A senior practice lead will review your inquiry within one business day to schedule a confidential scoping session and outline a clear proposal with deliverables and timelines."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const mount = document.getElementById('faq-accordion-mount');
    const filterButtons = document.querySelectorAll('.faq-filter-btn');
    if (!mount) return;

    function renderFaqs(filter = 'all') {
        const filtered = filter === 'all'
            ? prodentsFaqs
            : prodentsFaqs.filter(item => item.group === filter);

        mount.innerHTML = filtered.map((item, idx) => {
            const isOpen = idx === 0;
            return `
                <div class="faq-item relative rounded-2xl bg-white border ${isOpen ? 'border-[#2563eb]/40 shadow-lg shadow-[#0a1930]/5' : 'border-slate-200/90 hover:border-slate-300'} overflow-hidden transition-all duration-300"
                     data-open="${isOpen}">
                    
                    <!-- Left Electric-Blue Active Beam -->
                    <span class="faq-beam absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2563eb] to-[#60a5fa]"></span>

                    <button type="button"
                            aria-expanded="${isOpen}"
                            class="faq-trigger w-full text-left px-6 sm:px-7 py-6 flex items-start justify-between gap-5 focus:outline-none">
                        <div class="flex items-start gap-4">
                            <span class="font-display font-bold text-sm text-[#2563eb] pt-0.5 shrink-0">
                                ${item.num}
                            </span>
                            <div class="space-y-1">
                                <span class="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                    ${item.category}
                                </span>
                                <h3 class="font-display font-bold text-lg sm:text-xl text-[#0a1930] leading-snug">
                                    ${item.question}
                                </h3>
                            </div>
                        </div>

                        <span class="faq-toggle-icon w-9 h-9 rounded-xl border border-slate-200 bg-slate-50 text-[#0a1930] flex items-center justify-center shrink-0 mt-0.5">
                            <i data-lucide="plus" class="w-4 h-4"></i>
                        </span>
                    </button>

                    <div class="faq-answer-wrapper">
                        <div class="faq-answer-inner">
                            <div class="px-6 sm:px-7 pb-6 pl-14 sm:pl-16 text-sm sm:text-[15px] text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                ${item.answer}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        if (window.lucide) {
            lucide.createIcons();
        }

        const items = Array.from(mount.querySelectorAll('.faq-item'));
        items.forEach(item => {
            const trigger = item.querySelector('.faq-trigger');
            trigger.addEventListener('click', () => {
                const currentlyOpen = item.getAttribute('data-open') === 'true';

                items.forEach(other => {
                    other.setAttribute('data-open', 'false');
                    other.classList.remove('border-[#2563eb]/40', 'shadow-lg', 'shadow-[#0a1930]/5');
                    other.classList.add('border-slate-200/90');
                    other.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
                });

                if (!currentlyOpen) {
                    item.setAttribute('data-open', 'true');
                    item.classList.remove('border-slate-200/90');
                    item.classList.add('border-[#2563eb]/40', 'shadow-lg', 'shadow-[#0a1930]/5');
                    trigger.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    // Filter pill click handlers
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.className = 'faq-filter-btn px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white text-slate-600 border border-slate-200 hover:border-[#2563eb] hover:text-[#2563eb] transition-all';
            });
            btn.className = 'faq-filter-btn px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-[#0a1930] text-white transition-all';
            renderFaqs(btn.dataset.filter);
        });
    });

    renderFaqs('all');
});