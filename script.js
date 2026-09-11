const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext(2d');

// ==========================================
// ✏️ اكتب رسالتك هنا بين الأقواس:
const customMessage = "smhilia ahbiba kanbghiik";
// ==========================================

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setupCanvas();

const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2 - 20;

let state = 0; // 0: stem, 1: leaves, 2: flower, 3: text, 4: finished
let progress = 0;

// 1. رسم الساق بالأخضر
function drawStem() {
    ctx.strokeStyle = '#2ed573';
    ctx.lineWidth = 4;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#2ed573';

    ctx.beginPath();
    ctx.moveTo(centerX, centerY + 180);
    
    let currentY = (centerY + 180) - (progress * 180);
    let currentX = centerX + Math.sin(progress * Math.PI) * 15;
    
    ctx.quadraticCurveTo(centerX + 10, centerY + 90, currentX, currentY);
    ctx.stroke();

    if (progress < 1) {
        progress += 0.008;
    } else {
        state = 1;
        progress = 0;
    }
}

// 2. رسم الأوراق الخضراء
function drawLeaves() {
    ctx.strokeStyle = '#2ed573';
    ctx.lineWidth = 4;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#2ed573';
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + 180);
    ctx.quadraticCurveTo(centerX + 10, centerY + 90, centerX, centerY);
    ctx.stroke();

    ctx.fillStyle = '#2ed573';
    ctx.beginPath();
    ctx.ellipse(centerX - 25 * progress, centerY + 100, 20 * progress, 8 * progress, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(centerX + 25 * progress, centerY + 60, 20 * progress, 8 * progress, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    if (progress < 1) {
        progress += 0.012;
    } else {
        state = 2;
        progress = 0;
    }
}

// رسم بتلة وردة حقيقية بـ Bezier Curves
function drawRealPetal(x, y, radius, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.fillStyle = color;
    ctx.strokeStyle = '#ff99c8';
    ctx.lineWidth = 1;
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-radius / 2, -radius / 2, -radius / 2, -radius, 0, -radius);
    ctx.bezierCurveTo(radius / 2, -radius, radius / 2, -radius / 2, 0, 0);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

// إعداد درجات الوردة الحقيقية
const petalRings = [
    { count: 5, radius: 25, color: '#ff1a75' },
    { count: 7, radius: 45, color: '#ff4d8d' },
    { count: 9, radius: 65, color: '#ff75a0' },
    { count: 11, radius: 85, color: '#ffb3c6' }
];

let ringIdx = 0;
let petalIdx = 0;
let frameCounter = 0;

function drawFlower() {
    frameCounter++;
    if (frameCounter % 6 === 0) {
        if (ringIdx < petalRings.length) {
            let ring = petalRings[ringIdx];
            let angle = (Math.PI * 2 / ring.count) * petalIdx;

            drawRealPetal(centerX, centerY, ring.radius, angle, ring.color);

            petalIdx++;
            if (petalIdx >= ring.count) {
                petalIdx = 0;
                ringIdx++;
            }
        } else {
            state = 3;
        }
    }
}

// 4. كتابة النص الوردي
let textLetters = 0;

function drawMessage() {
    ctx.font = 'bold 38px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ff4d8d';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff1a75';

    let visibleText = customMessage.substring(0, Math.floor(textLetters));
    ctx.fillText(visibleText, centerX, centerY + 240);

    if (textLetters < customMessage.length) {
        textLetters += 0.04;
    } else {
        state = 4; // نهاية الرسم والتثبيت النهائي
    }
}

// 5. تثبيت الوردة والرسالة نهائياً على الشاشة
function redrawFullRose() {
    // رسم الساق والأوراق
    ctx.strokeStyle = '#2ed573';
    ctx.lineWidth = 4;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#2ed573';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + 180);
    ctx.quadraticCurveTo(centerX + 10, centerY + 90, centerX, centerY);
    ctx.stroke();

    ctx.fillStyle = '#2ed573';
    ctx.beginPath();
    ctx.ellipse(centerX - 25, centerY + 100, 20, 8, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(centerX + 25, centerY + 60, 20, 8, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // رسم بتلات الوردة كاملة
    petalRings.forEach(ring => {
        for (let i = 0; i < ring.count; i++) {
            let angle = (Math.PI * 2 / ring.count) * i;
            drawRealPetal(centerX, centerY, ring.radius, angle, ring.color);
        }
    });

    // رسم قلب الوردة في المركز
    ctx.fillStyle = '#ffe600';
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#ffe600';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
    ctx.fill();

    // رسم الرسالة
    ctx.font = 'bold 38px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ff4d8d';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff1a75';
    ctx.fillText(customMessage, centerX, centerY + 240);
}

function animate() {
    if (state < 4) {
        if (state === 0) drawStem();
        else if (state === 1) drawLeaves();
        else if (state === 2) drawFlower();
        else if (state === 3) drawMessage();

        requestAnimationFrame(animate);
    } else {
        // عند الانتهاء: إعادة رسم المشهد كاملاً وثباته للأبد
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);
        redrawFullRose();
    }
}

animate();

window.addEventListener('resize', setupCanvas);
