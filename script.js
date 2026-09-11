const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

// ==========================================
// ✏️ اكتب رسالتك هنا بين الأقواس (مثلاً "I MISS YOU" أو "I LOVE YOU"):
const customMessage = "smhi lia kanbghiiiiiik ";
// ==========================================

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setupCanvas();

const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2 + 50;

let state = 0; // 0: stem, 1: leaves, 2: flower rings, 3: text
let progress = 0;

// رسم الساق الأخضر
function drawStem() {
    ctx.strokeStyle = '#2ed573';
    ctx.lineWidth = 4;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#2ed573';

    ctx.beginPath();
    ctx.moveTo(centerX, centerY + 180);
    
    // منحنى الساق
    let currentY = (centerY + 180) - (progress * 180);
    let currentX = centerX + Math.sin(progress * Math.PI) * 15;
    
    ctx.quadraticCurveTo(centerX + 10, centerY + 90, currentX, currentY);
    ctx.stroke();

    if (progress < 1) {
        progress += 0.02;
    } else {
        state = 1;
        progress = 0;
    }
}

// رسم الأوراق الخضراء
function drawLeaves() {
    // إعادة رسم الساق
    ctx.strokeStyle = '#2ed573';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + 180);
    ctx.quadraticCurveTo(centerX + 10, centerY + 90, centerX, centerY);
    ctx.stroke();

    // ورقة شمال
    ctx.fillStyle = '#2ed573';
    ctx.beginPath();
    ctx.ellipse(centerX - 25 * progress, centerY + 100, 20 * progress, 8 * progress, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // ورقة يمين
    ctx.beginPath();
    ctx.ellipse(centerX + 25 * progress, centerY + 60, 20 * progress, 8 * progress, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    if (progress < 1) {
        progress += 0.03;
    } else {
        state = 2;
        progress = 0;
    }
}

// دوائر البتلات الوردي (rings) كما في كود الفيديو
const rings = [
    { radius: 20, count: 6, length: 30, color: '#ff75a0' },
    { radius: 35, count: 9, length: 45, color: '#ff4d8d' },
    { radius: 50, count: 12, length: 60, color: '#ff1a75' },
    { radius: 65, count: 15, length: 70, color: '#e6005c' }
];

let ringIndex = 0;
let petalIndex = 0;

function drawFlower() {
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
        progress = 0;
    }
}

// كتابة الرسالة المطلوبة تحت الوردة
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
        textLetters += 0.08;
    }
}

function animate() {
    // تأثير التعتيم والتوهج التدريجي
    ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
    ctx.fillRect(0, 0, width, height);

    if (state === 0) drawStem();
    else if (state === 1) drawLeaves();
    else if (state === 2) drawFlower();
    else if (state === 3) drawMessage();

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', setupCanvas);
