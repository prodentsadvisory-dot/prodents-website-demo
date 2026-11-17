document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prodents-contact-form');
    const successDossier = document.getElementById('contact-success-dossier');
    const resetBtn = document.getElementById('reset-contact-form-btn');
    const chips = document.querySelectorAll('.practice-chip');
    const practiceInput = document.getElementById('selected-practice-input');

    const trackedFields = Array.from(document.querySelectorAll('.form-tracked-field'));
    const completionBar = document.getElementById('form-completion-bar');
    const progressLabel = document.getElementById('form-progress-label');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('message-char-count');

    const copyEmailBtn = document.getElementById('copy-email-btn');
    const copyEmailLabel = document.getElementById('copy-email-label');
    const emailTextEl = document.getElementById('prodents-email-text');

    // 1. Practice Area Interactive Chip Selection
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => {
                c.setAttribute('data-selected', 'false');
                c.className = 'practice-chip px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:border-[#2563eb] text-xs font-semibold';
            });
            chip.setAttribute('data-selected', 'true');
            chip.className = 'practice-chip px-3.5 py-2 rounded-xl border border-[#2563eb] text-xs font-semibold';
            if (practiceInput) {
                practiceInput.value = chip.dataset.practice;
            }
        });
    });

    // 2. Live Form Completion Progress Bar
    function updateFormProgress() {
        if (!completionBar || !progressLabel) return;
        const filled = trackedFields.filter(field => field.value.trim().length > 0).length;
        const percent = Math.round((filled / trackedFields.length) * 100);
        completionBar.style.width = `${percent}%`;
        progressLabel.textContent = `${percent}% Completed`;
    }

    trackedFields.forEach(field => {
        field.addEventListener('input', updateFormProgress);
    });

    // 3. Live Character Counter
    if (messageInput && charCount) {
        messageInput.addEventListener('input', () => {
            charCount.textContent = `${messageInput.value.length} / 600`;
        });
    }

    // 4. One-Click Email Copy Button
    if (copyEmailBtn && emailTextEl) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = emailTextEl.textContent.trim();
            try {
                await navigator.clipboard.writeText(email);
                if (copyEmailLabel) copyEmailLabel.textContent = 'Copied';
                setTimeout(() => {
                    if (copyEmailLabel) copyEmailLabel.textContent = 'Copy';
                }, 2000);
            } catch (_) {
                window.location.href = `mailto:${email}`;
            }
        });
    }

    // 5. Interactive Form Submission -> Animated Confirmation Dossier
    if (form && successDossier) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('full_name').value.trim();
            const practice = practiceInput ? practiceInput.value : 'Advisory';
            const randomRef = `PSG-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

            const refBadge = document.getElementById('dossier-ref-badge');
            const summaryText = document.getElementById('dossier-summary-text');

            if (refBadge) refBadge.textContent = `Ref: ${randomRef}`;
            if (summaryText) {
                summaryText.textContent = `Thank you, ${name}. Your scoping brief for ${practice} has been logged. A senior practice lead will respond within one business day.`;
            }

            form.classList.add('hidden');
            successDossier.classList.remove('hidden');
            if (completionBar) completionBar.style.width = '100%';
        });
    }

    // 6. Reset Form to Send Another Inquiry
    if (resetBtn && form && successDossier) {
        resetBtn.addEventListener('click', () => {
            form.reset();
            if (charCount) charCount.textContent = '0 / 600';
            updateFormProgress();
            successDossier.classList.add('hidden');
            form.classList.remove('hidden');
        });
    }
});