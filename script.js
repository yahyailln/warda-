const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

// ==========================================
// ✏️ اكتب رسالتك هنا بين الأقواس:
const customMessage = "smhilia kanbghiiiiiiik";
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

let state = 0; // 0: stem, 1: leaves, 2: flower rings, 3: text, 4: finished
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
        progress += 0.008; // رسم بطيء للساق
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
        progress += 0.012; // رسم بطيء للأوراق
    } else {
        state = 2;
        progress = 0;
    }
}

// 3. دوائر البتلات الوردي (Rings)
const rings = [
    { radius: 20, count: 6, length: 30, color: '#ff75a0' },
    { radius: 35, count: 9, length: 45, color: '#ff4d8d' },
    { radius: 50, count: 12, length: 60, color: '#ff1a75' },
    { radius: 65, count: 15, length: 70, color: '#e6005c' }
];

let ringIndex = 0;
let petalIndex = 0;
let frameCounter = 0;

function drawFlower() {
    frameCounter++;
    if (frameCounter % 4 === 0) { // إبطاء سرعة تكوين البتلات
        if (ringIndex < rings.length) {
            let ring = rings[ringIndex];
            let angle = (Math.PI * 2 / ring.count) * petalIndex;
            
            let bx = centerX + Math.cos(angle) * ring.radius;
            let by = centerY + Math.sin(angle) * ring.radius;

            ctx.strokeStyle = ring.color;
            ctx.shadowBlur = 12;
            ctx.shadowColor = ring.color;
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.arc(bx, by, ring.length / 2, 0, Math.PI * 2);
            ctx.stroke();

            petalIndex++;
            if (petalIndex >= ring.count) {
                petalIndex = 0;
                ringIndex++;
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
        state = 4;
    }
}

// 5. الوظيفة النهائية لتثبيت الوردة بالألوان الأصلية (الأخضر والغوز)
function redrawFullFlower() {
    // رسم الساق والأوراق بالأخضر
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

    // رسم البتلات بالوردي المتوهج
    rings.forEach(ring => {
        ctx.strokeStyle = ring.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = ring.color;
        ctx.lineWidth = 2;

        for (let i = 0; i < ring.count; i++) {
            let angle = (Math.PI * 2 / ring.count) * i;
            let bx = centerX + Math.cos(angle) * ring.radius;
            let by = centerY + Math.sin(angle) * ring.radius;

            ctx.beginPath();
            ctx.arc(bx, by, ring.length / 2, 0, Math.PI * 2);
            ctx.stroke();
        }
    });

    // رسم الرسالة بالأوردي
    ctx.font = 'bold 38px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ff4d8d';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff1a75';
    ctx.fillText(customMessage, centerX, centerY + 240);
}

function animate() {
    if (state < 4) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);

        if (state === 0) drawStem();
        else if (state === 1) drawLeaves();
        else if (state === 2) drawFlower();
        else if (state === 3) drawMessage();

        requestAnimationFrame(animate);
    } else {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);
        redrawFullFlower();
    }
}

animate();

window.addEventListener('resize', setupCanvas);
