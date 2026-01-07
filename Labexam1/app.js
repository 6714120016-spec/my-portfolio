// ตั้งค่า API Key จาก Pixabay
const API_KEY = '54084974-631f2bf2a0598a5a518cb35b8'; // <--- กรุณานำ API Key มาใส่ที่นี่

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const gallery = document.getElementById('gallery');

// ฟังก์ชันหลักในการค้นหา
async function performSearch() {
    const query = searchInput.value.trim();

    if (!query) {
        alert("กรุณาระบุคำที่ต้องการค้นหา");
        return;
    }

    // แสดงสถานะการโหลด
    gallery.innerHTML = '<p style="grid-column: 1/-1;">กำลังค้นหารูปภาพ...</p>';

    try {
        // ใช้ Fetch API ดึงข้อมูล (จำกัด per_page = 6 ตามโจทย์)
        const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&lang=th&image_type=all&per_page=6`);
        const data = await response.json();

        renderGallery(data.hits);
    } catch (error) {
        console.error("Fetch Error:", error);
        gallery.innerHTML = '<p style="color: red; grid-column: 1/-1;">เกิดข้อผิดพลาดในการเชื่อมต่อกับ API</p>';
    }
}

// ฟังก์ชันแสดงผลรูปภาพลงบนหน้าเว็บ
function renderGallery(images) {
    gallery.innerHTML = ""; // ล้างข้อมูลเก่า

    if (images.length === 0) {
        gallery.innerHTML = '<p style="grid-column: 1/-1;">ไม่พบรูปภาพที่คุณค้นหา ลองใช้คำอื่นดูนะ</p>';
        return;
    }

    images.forEach(img => {
        // สร้าง Card สำหรับรูปภาพแต่ละรูป
        const card = document.createElement('div');
        card.className = 'image-card';

        card.innerHTML = `
            <a href="${img.largeImageURL}" target="_blank" title="คลิกเพื่อดูรูปขนาดเต็ม">
                <img src="${img.webformatURL}" alt="${img.tags}">
            </a>
            <div class="image-info">
                <p><strong>👤 ช่างภาพ:</strong> ${img.user}</p>
                <p><strong>🏷️ Tags:</strong> ${img.tags}</p>
            </div>
        `;

        gallery.appendChild(card);
    });
}

// รองรับการกดปุ่ม Enter ในการค้นหา
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});