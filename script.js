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

// متغير لتتبع لون الخلفية الحالية
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

// رسم بتلة وردة رومانسية حقيقية بحجم كبير
function drawBigPetal(x, y, radius, angle, color1, color2) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    let gradient = ctx.createLinearGradient(0, 0, 0, -radius);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.fillStyle = gradient;
    ctx.strokeStyle = '#ffb3c6';
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 18;
    ctx.shadowColor = color1;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-radius * 0.65, -radius * 0.45, -radius * 0.55, -radius * 0.95, 0, -radius);
    ctx.bezierCurveTo(radius * 0.55, -radius * 0.95, radius * 0.65, -radius * 0.45, 0, 0);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

// ألوان متناسقة ومكبرة للوردة
const petalRings = [
    { count: 6, radius: 45, c1: '#8e44ad', c2: '#ff2a75' },  
    { count: 8, radius: 75, c1: '#ff007f', c2: '#ff5252' },  
    { count: 10, radius: 110, c1: '#ff4d8d', c2: '#ff75a0' }, 
    { count: 12, radius: 145, c1: '#ff75a0', c2: '#fec3a6' }  
];

let ringIdx = 0;
let petalIdx = 0;
let frameCounter = 0;

function drawFlower() {
    frameCounter++;
    if (frameCounter % 4 === 0) {
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
        state = 4; // الثبات النهائي
    }
}

// إعادة رسم الساق والأوراق السابقة عند تغيير لون الخلفية كي لا تضيع
function redrawPreviousElements() {
    // رسم الساق
    ctx.strokeStyle = '#2ed573';
    ctx.lineWidth = 5;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#2ed573';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + 240);
    ctx.quadraticCurveTo(centerX + 12, centerY + 120, centerX, centerY);
    ctx.stroke();

    // رسم الأوراق
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
        // تغيير الخلفية حسب المرحلة الحالية
        let targetBg = bgStyle;
        if (state === 0 || state === 1) {
            targetBg = '#001a0d'; // خلفية خضراء غامقة عند رسم الساق والأوراق
        } else if (state === 2 || state === 3) {
            targetBg = '#220011'; // خلفية وردية غامقة عند بدء الوردة والرسالة
        }

        // عند التحول لمرحلة الوردة (تغير لون الخلفية)، يتم تنظيف الشاشة وإعادة رسم الساق والأوراق أولاً
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

// تعبئة الخلفية الأولية
ctx.fillStyle = '#001a0d';
ctx.fillRect(0, 0, width, height);

animate();

window.addEventListener('resize', () => {
    setupCanvas();
});
