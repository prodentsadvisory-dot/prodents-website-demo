(function initCrystalCanvas() {
    const canvas = document.getElementById('crystalCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height, dpr;
    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        dpr = window.devicePixelRatio || 1;
        width = rect.width;
        height = rect.height;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    window.addEventListener('resize', resize);
    resize();

    const outerVertices = [
        { x: 0, y: -1.45, z: 0, type: 'outer' },
        { x: 0, y: 1.45, z: 0, type: 'outer' },
        { x: 1.0, y: 0.25, z: 0, type: 'outer' },
        { x: 0, y: 0.25, z: 1.0, type: 'outer' },
        { x: -1.0, y: 0.25, z: 0, type: 'outer' },
        { x: 0, y: 0.25, z: -1.0, type: 'outer' }
    ];

    const innerVertices = [
        { x: 0, y: -0.45, z: 0, type: 'inner' },
        { x: 0, y: 0.48, z: 0, type: 'inner' },
        { x: 0.46, y: 0.25, z: 0.46, type: 'inner' },
        { x: -0.46, y: 0.25, z: 0.46, type: 'inner' },
        { x: -0.46, y: 0.25, z: -0.46, type: 'inner' },
        { x: 0.46, y: 0.25, z: -0.46, type: 'inner' }
    ];

    const allVertices = [...outerVertices, ...innerVertices];

    const faces = [
        [0, 2, 3], [0, 3, 4], [0, 4, 5], [0, 5, 2],
        [1, 2, 3], [1, 3, 4], [1, 4, 5], [1, 5, 2]
    ];

    const edges = [
        [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 2], [1, 3], [1, 4], [1, 5],
        [2, 3], [3, 4], [4, 5], [5, 2],
        [0, 1], [2, 4], [3, 5],
        [6, 7], [6, 8], [6, 9], [6, 10], [6, 11],
        [7, 8], [7, 9], [7, 10], [7, 11],
        [8, 9], [9, 10], [10, 11], [11, 8],
        [0, 6], [1, 7],
        [2, 8], [2, 11],
        [3, 8], [3, 9],
        [4, 9], [4, 10],
        [5, 10], [5, 11]
    ];

    const particles = Array.from({ length: 28 }, () => ({
        x: (Math.random() - 0.5) * 420,
        y: (Math.random() - 0.5) * 420,
        radius: Math.random() * 1.8 + 0.7,
        speedY: (Math.random() - 0.5) * 0.25,
        speedX: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.6 + 0.25,
        color: Math.random() > 0.35 ? '#60a5fa' : '#38bdf8'
    }));

    let angleY = 0.45;
    let angleX = 0.14;
    let mouseX = 0;
    let mouseY = 0;

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.35;
    });

    function project(v, rotY, rotX, scale, cx, cy) {
        let x1 = v.x * Math.cos(rotY) - v.z * Math.sin(rotY);
        let z1 = v.z * Math.cos(rotY) + v.x * Math.sin(rotY);

        let y2 = v.y * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = z1 * Math.cos(rotX) + v.y * Math.sin(rotX);

        const fov = 4.2;
        const factor = fov / (fov + z2);
        return {
            x: cx + x1 * scale * factor,
            y: cy + y2 * scale * factor,
            z: z2,
            type: v.type
        };
    }

    function animate(time) {
        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        const scale = Math.min(width, height) * 0.26;
        const floatOffset = Math.sin(time * 0.0018) * 7;

        const bgGlow = ctx.createRadialGradient(cx, cy + floatOffset, 10, cx, cy + floatOffset, scale * 1.65);
        bgGlow.addColorStop(0, 'rgba(59, 130, 246, 0.24)');
        bgGlow.addColorStop(0.55, 'rgba(30, 67, 122, 0.14)');
        bgGlow.addColorStop(1, 'rgba(10, 25, 48, 0)');
        ctx.fillStyle = bgGlow;
        ctx.beginPath();
        ctx.arc(cx, cy + floatOffset, scale * 1.65, 0, Math.PI * 2);
        ctx.fill();

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x > 210) p.x = -210;
            if (p.x < -210) p.x = 210;
            if (p.y > 210) p.y = -210;
            if (p.y < -210) p.y = 210;

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(cx + p.x, cy + p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        angleY += 0.0055;
        const currentRotY = angleY + mouseX;
        const currentRotX = angleX + mouseY;

        const projected = allVertices.map(v => project(v, currentRotY, currentRotX, scale, cx, cy + floatOffset));

        faces.forEach(([i, j, k]) => {
            const p1 = projected[i];
            const p2 = projected[j];
            const p3 = projected[k];
            const avgZ = (p1.z + p2.z + p3.z) / 3;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.closePath();

            const alpha = avgZ < 0 ? 0.15 : 0.06;
            ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.fill();
        });

        edges.forEach(([i, j]) => {
            const p1 = projected[i];
            const p2 = projected[j];
            const isInner = p1.type === 'inner' || p2.type === 'inner';

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isInner
                ? 'rgba(96, 165, 250, 0.45)'
                : 'rgba(147, 197, 253, 0.78)';
            ctx.lineWidth = isInner ? 1.05 : 1.35;
            ctx.stroke();
        });

        projected.forEach(p => {
            const isOuter = p.type === 'outer';
            const radius = isOuter ? 4.4 : 3.2;

            ctx.beginPath();
            ctx.arc(p.x, p.y, radius * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = isOuter
                ? 'rgba(147, 197, 253, 0.28)'
                : 'rgba(56, 189, 248, 0.30)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = isOuter ? '#FFFFFF' : '#38BDF8';
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
})();