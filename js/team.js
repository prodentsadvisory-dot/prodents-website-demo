const prodentsTeam = [
    {
        num: "01",
        name: "Shaju Meetna",
        role: "Founder & Managing Partner",
        // specialty: "Corporate Strategy & Operational Turnaround",
        bio: "18+ years advising enterprise boards on multi-market expansion, margin architecture, and organizational restructuring.",
        photo: "images/",
        initials: "AM",
        socials: {
            linkedin: "https://linkedin.com",
           
            email: "mailto:arjun@prodents.com"
        }
    },
    {
        num: "02",
        name: "Anija Ann Koshy",
        role: "Co-founder &  Head (Operations)",
        // specialty: "Business Analytics",
        bio: "Blends management strategy with technical precision to help growing enterprises make faster, evidence-backed decisions.",
        photo: "images/anija.jpeg",
        initials: "AK",
        socials: {
            linkedin: "https://www.linkedin.com/in/anija-ann-koshy",
            
            email: "mailto:anija@prodentsadvisory.com"
        }
    },
    {
        num: "03",
        name: "Sanoob Sajeer",
        role: "Co-Founder & Head (Business Development)",
        // specialty: "Technology Transformation & Delivery",
        bio: "Specializes in workflow re-engineering, enterprise digital adoption roadmaps, and high-stakes programme governance.",
        photo: "images/team-3.jpg",
        initials: "RK",
        socials: {
            linkedin: "https://linkedin.com",
            
            email: "mailto:rohan@prodents.com"
        }
    },
    {
        num: "04",
        name: "Febin Tharakan",
        role: "Co-Founder & Head (Finance & Administration)",
        // specialty: "Market Positioning & Venture Advisory",
        bio: "Advises scaling enterprises and founders on category positioning, customer-centred growth, and institutional readiness.",
        photo: "images/team-4.jpg",
        initials: "MN",
        socials: {
            linkedin: "https://linkedin.com",
           
            email: "mailto:meera@prodents.com"
        }
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const mount = document.getElementById('team-grid-mount');
    if (!mount) return;

    mount.innerHTML = prodentsTeam.map(member => `
        <article class="team-card group rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between shadow-sm">
            
            <!-- Portrait Frame with Interactive Dossier Drawer -->
            <div class="relative aspect-[4/5] bg-[#0a1930] overflow-hidden">
                <!-- Subtle Architectural Grid Background -->
                <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(96,165,250,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(96,165,250,0.08)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

                <!-- Fallback Initials Emblem (Visible if photo path not yet added) -->
                <div class="absolute inset-0 flex flex-col items-center justify-center text-white/90 select-none">
                    <span class="font-display font-extrabold text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-[#93c5fd] to-[#2563eb]">
                        ${member.initials}
                    </span>
                    <span class="text-[10px] uppercase tracking-[0.25em] text-slate-400 mt-2">Prodents Partner</span>
                </div>

                <!-- Team Member Portrait -->
                <img src="${member.photo}"
                     alt="${member.name} — ${member.role}"
                     onerror="this.style.display='none'"
                     class="team-portrait relative z-10 w-full h-full object-cover object-top" />

                <!-- Top-Left Index Pill -->
                <div class="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#0a1930]/80 backdrop-blur-md border border-[#60a5fa]/30 text-[10px] font-bold uppercase tracking-[0.2em] text-[#93c5fd]">
                    Partner ${member.num}
                </div>

                <!-- Slide-Up Glass Dossier Overlay (Bio + Staggered Social Links) -->
                <div class="team-dossier-drawer absolute inset-x-0 bottom-0 z-20 p-5 bg-gradient-to-t from-[#060f1e] via-[#0a1930]/95 to-[#0a1930]/85 backdrop-blur-md border-t border-[#60a5fa]/25 text-white space-y-4">
                    <p class="text-xs text-slate-300 leading-relaxed">
                        ${member.bio}
                    </p>

                    <!-- Social Media Profile Dock -->
                    <div class="flex items-center gap-2.5 pt-1">
                        <a href="${member.socials.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="${member.name} on LinkedIn"
                           class="team-social-btn w-9 h-9 rounded-xl bg-white/10 hover:bg-[#2563eb] border border-[#60a5fa]/30 flex items-center justify-center text-white">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"/></svg>
                        </a>
                      
                        <a href="${member.socials.email}" aria-label="Email ${member.name}"
                           class="team-social-btn w-9 h-9 rounded-xl bg-white/10 hover:bg-[#2563eb] border border-[#60a5fa]/30 flex items-center justify-center text-white">
                            <i data-lucide="mail" class="w-4 h-4"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Bottom Name, Title & Specialty Footer -->
            <div class="p-6 space-y-2 bg-white flex-1 flex flex-col justify-between">
                <div>
                    <h3 class="font-display font-bold text-xl text-[#0a1930] group-hover:text-[#2563eb] transition-colors">
                        ${member.name}
                    </h3>
                    <div class="text-xs font-bold uppercase tracking-[0.16em] text-[#2563eb] mt-0.5">
                        ${member.role}
                    </div>
                </div>
               
            </div>

        </article>
    `).join('');

    if (window.lucide) {
        lucide.createIcons();
    }

    // Subtle 3D Tilt on Desktop & Tap-Toggle on Mobile
    const cards = Array.from(mount.querySelectorAll('.team-card'));
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 1024) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (((y - rect.height / 2) / (rect.height / 2)) * -3.5).toFixed(2);
            const rotateY = (((x - rect.width / 2) / (rect.width / 2)) * 3.5).toFixed(2);
            card.style.transform = `perspective(950px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(950px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });

        // Allow mobile users to tap a card to open/close its bio & social icons
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            const wasActive = card.classList.contains('is-active');
            cards.forEach(c => c.classList.remove('is-active'));
            if (!wasActive) card.classList.add('is-active');
        });
    });
});