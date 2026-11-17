const prodentsTestimonials = [
    {
        num: "01",
        initials: "AR",
        author: "Alistair Reynolds",
        company: "Meridian Industrial Group",
        quote: "“Prodents replaced months of internal debate with a clear operational roadmap. Within two quarters of implementing their workflow framework, we eliminated major bottlenecks across three regional divisions.”"
    },
    {
        num: "02",
        initials: "SM",
        author: "Dr. Sunita Menon",
        company: "VedaBio Diagnostics",
        quote: "“Their commercial feasibility study and unit-economics model completely sharpened our go-to-market sequencing. We entered institutional partner discussions with validated demand data rather than projections.”"
    },
    {
        num: "03",
        initials: "DK",
        author: "David Kensington",
        company: "Northbridge Capital",
        quote: "“The primary market study Prodents executed for our portfolio acquisition uncovered regulatory and pricing dynamics that standard industry reports missed entirely.”"
    },
    {
        num: "04",
        initials: "PV",
        author: "Prof. Priya Nair",
        company: "Southport University",
        quote: "“Prodents brought rare governance discipline to our curriculum modernization and research capacity initiative—aligning faculty committees and industry partnerships under one clear plan.”"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const unfoldBox = document.getElementById('testimonial-unfold-box');
    const track = document.getElementById('testimonial-slider-track');
    const dotsMount = document.getElementById('ts-dots');
    const progressBar = document.getElementById('ts-progress-bar');
    const counterEl = document.getElementById('ts-counter');
    const prevBtn = document.getElementById('ts-prev');
    const nextBtn = document.getElementById('ts-next');

    if (!track || !unfoldBox) return;

    // Render clean slides: Quote + Client Name + Company Name only
    track.innerHTML = prodentsTestimonials.map(item => `
        <div class="testimonial-slide p-7 sm:p-9 flex flex-col justify-between gap-6">
            <blockquote class="font-display text-lg sm:text-xl text-white leading-relaxed font-normal break-words">
                ${item.quote}
            </blockquote>

            <div class="pt-5 border-t border-[#60a5fa]/15 flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white font-display font-bold text-sm flex items-center justify-center shrink-0">
                    ${item.initials}
                </div>
                <div class="min-w-0">
                    <div class="font-display font-bold text-base text-white">${item.author}</div>
                    <div class="text-xs text-[#93c5fd] font-medium mt-0.5">${item.company}</div>
                </div>
            </div>
        </div>
    `).join('');

    if (dotsMount) {
        dotsMount.innerHTML = prodentsTestimonials.map((_, idx) => `
            <button type="button"
                    data-slide="${idx}"
                    aria-label="Go to testimonial ${idx + 1}"
                    class="ts-dot h-2 rounded-full transition-all duration-300 ${idx === 0 ? 'w-7 bg-[#3b82f6]' : 'w-2 bg-white/25 hover:bg-white/50'}">
            </button>
        `).join('');
    }

    const dots = Array.from(document.querySelectorAll('.ts-dot'));
    let currentIndex = 0;
    let isVisible = false;
    let isPaused = false;
    let progress = 0;
    const SLIDE_DURATION = 5500;
    const TICK = 50;

    function goToSlide(index) {
        currentIndex = (index + prodentsTestimonials.length) % prodentsTestimonials.length;
        progress = 0;
        if (progressBar) progressBar.style.width = '0%';

        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        if (counterEl) {
            counterEl.textContent = `${prodentsTestimonials[currentIndex].num} / 0${prodentsTestimonials.length}`;
        }

        dots.forEach((dot, i) => {
            dot.className = i === currentIndex
                ? 'ts-dot h-2 rounded-full transition-all duration-300 w-7 bg-[#3b82f6]'
                : 'ts-dot h-2 rounded-full transition-all duration-300 w-2 bg-white/25 hover:bg-white/50';
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                unfoldBox.classList.add('is-unfolded');
                isVisible = true;
            } else {
                isVisible = false;
            }
        });
    }, { threshold: 0.25 });

    observer.observe(unfoldBox);

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    dots.forEach((dot, idx) => dot.addEventListener('click', () => goToSlide(idx)));

    unfoldBox.addEventListener('mouseenter', () => { isPaused = true; });
    unfoldBox.addEventListener('mouseleave', () => { isPaused = false; });

    let touchStartX = 0;
    unfoldBox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isPaused = true;
    }, { passive: true });

    unfoldBox.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 40) {
            goToSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
        }
        isPaused = false;
    }, { passive: true });

    setInterval(() => {
        if (!isVisible || isPaused) return;
        progress += (TICK / SLIDE_DURATION) * 100;
        if (progressBar) progressBar.style.width = `${Math.min(100, progress)}%`;
        if (progress >= 100) {
            goToSlide(currentIndex + 1);
        }
    }, TICK);
});