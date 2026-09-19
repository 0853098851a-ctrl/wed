# เว็บแสดงของในเกม Roblox

Roblox ส่งรายการของมาที่ `/api/inventory` แล้วหน้าเว็บดึงไปแสดงสดทุก 3 วินาที
ผู้เล่นที่ไม่ส่งข้อมูลเกิน 30 วินาทีจะหายจากรายการเอง

## ทดลองในเครื่องตัวเอง (ต้องมี Node.js 18 ขึ้นไป)
    npm install
    API_KEY=รหัสลับของคุณ npm start
เปิด http://localhost:3000
(Roblox เรียกเครื่องคุณตรงๆ ไม่ได้ ต้องเอาขึ้นเว็บจริงตามด้านล่างก่อนถึงจะรับข้อมูลจากเกมได้)

## เอาขึ้นเว็บฟรี (ตัวอย่างบน Render)
1. สร้างบัญชี GitHub แล้วอัปโหลดโฟลเดอร์นี้เป็น repository
2. สมัคร render.com แล้วเลือก New > Web Service เชื่อมกับ repository นั้น
3. ตั้งค่า Build Command = `npm install`, Start Command = `npm start`
4. ที่ Environment ใส่ `API_KEY` = รหัสลับยาวๆ ที่คุณตั้งเอง
5. กด Deploy แล้วจะได้ลิงก์ เช่น https://ชื่อคุณ.onrender.com

แพ็กเกจฟรีของ Render จะหลับเมื่อไม่มีคนใช้สักพัก ครั้งแรกที่ถูกเรียกอาจช้า 30-60 วินาที
เงื่อนไขของแต่ละเจ้าเปลี่ยนได้ ควรเช็กหน้าเว็บทางการอีกครั้ง

## ต่อกับ Roblox
ในสคริปต์ที่ 2 (ServerScriptService) ตั้งค่า
- `WEBSITE_URL` = https://ชื่อคุณ.onrender.com/api/inventory
- `API_KEY` = รหัสเดียวกับที่ใส่ใน Render

แล้วเปิด Game Settings > Security > Allow HTTP Requests

อย่าใส่ API_KEY ใน LocalScript เพราะผู้เล่นเปิดดูได้ ให้ใส่เฉพาะใน Script ฝั่งเซิร์ฟเวอร์
