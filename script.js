const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

// ==========================================
// ✏️ اكتب رسالتك هنا بين الأقواس:
const customMessage = "smhilia ahbiba kanbghiik🫶🏻🥹";
// ==========================================

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setupCanvas();

const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2 - 40;

let state = 0; // 0: stem, 1: leaves, 2: flower, 3: text, 4: finished
let progress = 0;

let bgStyle = '#000000';

// 1. رسم الساق بالأخضر الغني
function drawStem() {
    ctx.strokeStyle = '#2ed573';
    ctx.lineWidth = 5;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#2ed573';

    ctx.beginPath();
    ctx.moveTo(centerX, centerY + 240);
    
    let currentY = (centerY + 240) - (progress * 240);
    let currentX = centerX + Math.sin(progress * Math.PI) * 15;
    
    ctx.quadraticCurveTo(centerX + 12, centerY + 120, currentX, currentY);
    ctx.stroke();

    if (progress < 1) {
        progress += 0.01;
    } else {
        state = 1;
        progress = 0;
    }
}

// 2. رسم الأوراق الخضراء الكبيرة
function drawLeaves() {
    ctx.fillStyle = '#2ed573';
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#2ed573';
    
    // ورقة شمال
    ctx.beginPath();
    ctx.ellipse(centerX - 35 * progress, centerY + 130, 30 * progress, 12 * progress, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // ورقة يمين
    ctx.beginPath();
    ctx.ellipse(centerX + 35 * progress, centerY + 80, 30 * progress, 12 * progress, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    if (progress < 1) {
        progress += 0.02;
    } else {
        state = 2;
        progress = 0;
    }
}

// 3. دالة رسم بتلة وردة واقعية 4K مع الظلال والعروق الدقيقة
function drawBigPetal(x, y, radius, angle, color1, color2) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    let gradient = ctx.createRadialGradient(0, 0, 5, 0, -radius, radius);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(0.7, color2);
    gradient.addColorStop(1, '#fff0f5');

    ctx.fillStyle = gradient;
    ctx.strokeStyle = 'rgba(255, 182, 193, 0.5)';
    ctx.lineWidth = 1;
    
    ctx.shadowBlur = 12;
    ctx.shadowColor = color1;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-radius * 0.7, -radius * 0.3, -radius * 0.6, -radius, 0, -radius);
    ctx.bezierCurveTo(radius * 0.6, -radius, radius * 0.7, -radius * 0.3, 0, 0);
    ctx.fill();
    ctx.stroke();

    // عروق دقيقة للبتلة (تفاصيل 4K)
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 0.8;
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-radius * 0.15, -radius * 0.5, 0, -radius * 0.85);
    ctx.stroke();

    ctx.restore();
}

// طبقات كلاسيكية مكثفة لوردة واقعية وممتلئة
const petalRings = [
    { count: 5,  radius: 30,  c1: '#4a001f', c2: '#90003e' },
    { count: 7,  radius: 55,  c1: '#800037', c2: '#c70039' },
    { count: 10, radius: 85,  c1: '#b10042', c2: '#ff1493' },
    { count: 13, radius: 120, c1: '#ff007f', c2: '#ff69b4' },
    { count: 16, radius: 155, c1: '#ff3399', c2: '#ffb6c1' }
];

let ringIdx = 0;
let petalIdx = 0;
let frameCounter = 0;

function drawFlower() {
    frameCounter++;
    if (frameCounter % 3 === 0) {
        if (ringIdx < petalRings.length) {
            let ring = petalRings[ringIdx];
            let angle = (Math.PI * 2 / ring.count) * petalIdx;

            drawBigPetal(centerX, centerY, ring.radius, angle, ring.c1, ring.c2);

            petalIdx++;
            if (petalIdx >= ring.count) {
                petalIdx = 0;
                ringIdx++;
            }
        } else {
            // قلب الوردة الذهبي
            ctx.fillStyle = '#ffe600';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ffe600';
            ctx.beginPath();
            ctx.arc(centerX, centerY, 14, 0, Math.PI * 2);
            ctx.fill();

            state = 3;
        }
    }
}

// 4. كتابة النص الرومانسي
let textLetters = 0;

function drawMessage() {
    ctx.font = 'bold 42px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ff4d8d';
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ff007f';

    let visibleText = customMessage.substring(0, Math.floor(textLetters));
    ctx.fillText(visibleText, centerX, centerY + 280);

    if (textLetters < customMessage.length) {
        textLetters += 0.05;
    } else {
        state = 4;
    }
}

function redrawPreviousElements() {
    ctx.strokeStyle = '#2ed573';
    ctx.lineWidth = 5;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#2ed573';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + 240);
    ctx.quadraticCurveTo(centerX + 12, centerY + 120, centerX, centerY);
    ctx.stroke();

    ctx.fillStyle = '#2ed573';
    ctx.beginPath();
    ctx.ellipse(centerX - 35, centerY + 130, 30, 12, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(centerX + 35, centerY + 80, 30, 12, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
}

function animate() {
    if (state < 4) {
        let targetBg = bgStyle;
        if (state === 0 || state === 1) {
            targetBg = '#001a0d'; // خلفية خضراء للساق
        } else if (state === 2 || state === 3) {
            targetBg = '#220011'; // خلفية غوز للوردة
        }

        if (targetBg !== bgStyle) {
            bgStyle = targetBg;
            ctx.fillStyle = bgStyle;
            ctx.fillRect(0, 0, width, height);
            redrawPreviousElements();
        }

        if (state === 0) drawStem();
        else if (state === 1) drawLeaves();
        else if (state === 2) drawFlower();
        else if (state === 3) drawMessage();

        requestAnimationFrame(animate);
    }
}

ctx.fillStyle = '#001a0d';
ctx.fillRect(0, 0, width, height);

animate();

window.addEventListener('resize', () => {
    setupCanvas();
});
