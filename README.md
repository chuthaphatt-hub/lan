# Lanna Identity Research Web Map

เว็บแผนที่เชิงโต้ตอบสำหรับงานวิจัย **“การวิเคราะห์รูปแบบการกระจายตัวเชิงพื้นที่ของอัตลักษณ์ความเป็นล้านนาในเมืองเชียงใหม่”** ใช้ Leaflet, OpenStreetMap และ Docker โดยไม่มีการสร้างจุดตรวจพบ ค่าความเชื่อมั่น หรือผลวิเคราะห์เชิงสถิติขึ้นมาเอง

## สิ่งที่มีในเว็บ

- หน้าเปิดเรื่องแบบเลื่อนลง ใช้ภาพ `public/assets/lanna-hero.jpg` ที่ผู้ใช้ให้มา พร้อมเนื้อหาเกี่ยวกับกาแล โคม และอักษรล้านนา
- มุมมองจุดตรวจพบรวม: Marker clustering, popup และการค้นหาจาก properties ที่มีใน GeoJSON
- มุมมองวิเคราะห์: heatmap ที่ถ่วงน้ำหนักตาม confidence และชั้น Hot/Cold Spot จากค่า `Gi_Bin`, `GiZScore`, `GiPValue` ในไฟล์ ArcGIS
- มุมมองเปรียบเทียบ: เลือกกรองจุดในเขตเมืองเก่าหรือพื้นที่โดยรอบ โดยอ้างอิง `idx` จากชุดข้อมูลที่ส่งมา
- ตัวกรองประเภท, confidence, พื้นที่ และสถิติที่เปลี่ยนแบบทันทีตามผลที่แสดง

## ข้อมูลที่ใช้

`public/js/config.js` ระบุชื่อไฟล์และ field ที่ตรวจสอบจากข้อมูลจริงแล้ว:

| จุดประสงค์ | ไฟล์ | field สำคัญ |
|---|---|---|
| จุดตรวจพบ | `detections_all_conf.json` | `idx`, `name`, `POINT_X`, `POINT_Y`, `kalae_count`, `kom_count`, `text_lanna_count`, และ confidence ของแต่ละประเภท |
| พื้นที่เปรียบเทียบ | `detections_oldtown.geojson`, `detections_periphery.geojson` | `idx` |
| ขอบเขต | `city_boundary.geojson`, `old_city.geojson` | Polygon, WGS84 |
| Hot Spot | `hotspot_*.geojson` | `Gi_Bin`, `GiZScore`, `GiPValue`, `NNeighbors` |

ไฟล์ทั้งหมดเป็น GeoJSON WGS84 longitude/latitude ไม่มี geometry หรือพิกัดที่ผิดรูปแบบจากการตรวจสอบเบื้องต้น ชุดจุดหลักมี 1,280 Feature และใช้ `Point` เท่านั้น

ในชุดข้อมูลนี้ไม่มี field ภาพประกอบรายจุด จึงไม่มีรูปใน popup โดยตั้งใจ หากเพิ่ม URL/พาธภาพในอนาคต ให้แจ้งชื่อ field ก่อนเพื่อปรับ popup โดยไม่เดา field เอง

## รันด้วย Docker

ต้องติดตั้ง Docker Desktop ก่อน แล้วเปิด Terminal ที่โฟลเดอร์โครงการ

```bash
docker compose up --build
```

เปิด [http://localhost:8080](http://localhost:8080) ในเบราว์เซอร์

คำสั่งที่ใช้บ่อย:

```bash
# รันเบื้องหลัง
docker compose up --build -d

# ดูบันทึกการทำงาน
docker compose logs -f

# หยุดและลบ container (ข้อมูล GeoJSON ต้นฉบับไม่ถูกลบ)
docker compose down

# เริ่มใหม่หลังหยุด
docker compose up -d
```

โฟลเดอร์ `./public/data` ถูก mount แบบอ่านอย่างเดียวเข้า Nginx ดังนั้นเปลี่ยน GeoJSON ในโฟลเดอร์นี้แล้วรีเฟรชหน้าเว็บได้เลย โดยไม่ต้อง build image ใหม่ ตราบใดที่ชื่อไฟล์และ field mapping ใน `public/js/config.js` ยังเหมือนเดิม

## ข้อควรใช้ในการเขียนรายงาน

Heatmap มีไว้สื่อสารความหนาแน่นของจุดตรวจพบ ไม่ใช่ผล Hot Spot Analysis ทางสถิติ ส่วนชั้น Hot/Cold Spot แสดงค่าที่คำนวณมาแล้วจาก ArcGIS เท่านั้น เว็บไม่ได้คำนวณ Getis-Ord Gi*, Moran’s I หรือ Kernel Density ใหม่ในเบราว์เซอร์
