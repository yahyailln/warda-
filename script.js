const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

// ==========================================
// ✏️ اكتب رسالتك الرومانسية هنا بين الأقواس:
const customMessage = "smhilia ahbiba kanbghiik🫶🏻🥹";
// ==========================================

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setupCanvas();

let centerX = canvas.width / 2;
let centerY = canvas.height / 2 - 30;

let step = 0; // 0: stem, 1: leaves, 2: flower, 3: text, 4: done
let progress = 0;

// 1. رسم الساق الرومانسي بتدرج أخضر
function drawStem() {
    let currentY = (centerY + 180) - (progress * 180);
    let currentX = centerX + Math.sin(progress * Math.PI) * 12;

    ctx.strokeStyle = '#2ed573';
    ctx.lineWidth = 4;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#2ed573';

    ctx.beginPath();
    ctx.moveTo(centerX, centerY + 180);
    ctx.quadraticCurveTo(centerX + 10, centerY + 90, currentX, currentY);
    ctx.stroke();

    progress += 0.01;
    if (progress >= 1) {
        step = 1;
        progress = 0;
    }
}

// 2. رسم أوراق الوردة الواقعية
function drawLeaves() {
    ctx.fillStyle = '#2ed573';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#2ed573';

    // ورقة يسار
    ctx.beginPath();
    ctx.ellipse(centerX - 22, centerY + 100, 24 * progress, 10 * progress, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // ورقة يمين
    ctx.beginPath();
    ctx.ellipse(centerX + 22, centerY + 65, 24 * progress, 10 * progress, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    progress += 0.02;
    if (progress >= 1) {
        step = 2;
        progress = 0;
    }
}

// رسم بتلة وردة رومانسية بشرائح واقعية
function drawRomanticPetal(x, y, radius, angle, color1, color2) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    let gradient = ctx.createLinearGradient(0, 0, 0, -radius);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.fillStyle = gradient;
    ctx.strokeStyle = '#ff9a9e';
    ctx.lineWidth = 1;
    ctx.shadowBlur = 15;
    ctx.shadowColor = color1;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-radius * 0.6, -radius * 0.4, -radius * 0.5, -radius * 0.9, 0, -radius);
    ctx.bezierCurveTo(radius * 0.5, -radius * 0.9, radius * 0.6, -radius * 0.4, 0, 0);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

// طبقات الوردة بألوان رومانسية متدرجة (الموف، الغوز، والوردي الفاتح)
const layers = [
    { count: 5, radius: 35, c1: '#8e44ad', c2: '#ff477e' },
    { count: 7, radius: 55, c1: '#ff007f', c2: '#ff75a0' },
    { count: 9, radius: 75, c1: '#ff4d8d', c2: '#ff9a9e' },
    { count: 11, radius: 95, c1: '#ff75a0', c2: '#fec3a6' }
];

let layerIdx = 0;
let petalIdx = 0;

function drawFlower() {
    if (layerIdx < layers.length) {
        let l = layers[layerIdx];
        let angle = (Math.PI * 2 / l.count) * petalIdx;

        drawRomanticPetal(centerX, centerY, l.radius, angle, l.c1, l.c2);

        petalIdx++;
        if (petalIdx >= l.count) {
            petalIdx = 0;
            layerIdx++;
        }
    } else {
        // قلب الوردة الذهبي
        ctx.fillStyle = '#fffa65';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#fffa65';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
        ctx.fill();

        step = 3;
        progress = 0;
    }
}

// 4. كتابة النص الرومانسي المتوهج
function drawMessage() {
    ctx.font = 'bold 36px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ff4d8d';
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ff007f';

    let currentText = customMessage.substring(0, Math.floor(progress));
    ctx.fillText(currentText, centerX, centerY + 240);

    if (progress < customMessage.length) {
        progress += 0.05;
    } else {
        step = 4; // الإنهاء والثبات
    }
}

function loop() {
    if (step === 0) drawStem();
    else if (step === 1) drawLeaves();
    else if (step === 2) drawFlower();
    else if (step === 3) drawMessage();

    if (step < 4) {
        setTimeout(() => requestAnimationFrame(loop), 30); // سرعة رسم هادئة ومريحة
    }
}

// البدء
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, canvas.width, canvas.height);
loop();

window.addEventListener('resize', () => {
    setupCanvas();
    centerX = canvas.width / 2;
    centerY = canvas.height / 2 - 30;
});
