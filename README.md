# JUNDA TAPE 一頁式形象站 Demo（影片 Hero + 免改 HTML 圖庫版）

你只要：
1) 把 6 張照片丟進 `assets/img/`
2) 更新 `assets/img/photos.json` 的檔名清單（只改這 1 個檔案）
就可以替換整站圖片（不需要改 `index.html`）。


---

## ✅ Hero 影片（可選，但建議）

把你的 Hero 影片放到 `assets/video/`，檔名固定如下（這樣你完全不用改 HTML）：

- `assets/video/hero.webm`（建議，檔案更小）
- `assets/video/hero.mp4`（備援）

> 若你只放其中一個也可以；兩個都沒有時，網站會自動退回使用 Hero 背景大圖（不會壞）。

**建議規格（務實好用）：**
- 長度：3–6 秒 loop
- 解析度：1920×1080 或 1600×900
- 檔案大小：每個格式約 8–15MB 內
- 風格：慢速轉場 / 工廠作業 / 膠帶材質光影（不要太快）
> ⚠️ 重要限制（GitHub Pages / 靜態網站通用）：瀏覽器無法「自動列出資料夾內檔案」。  
> 因此無法做到「只丟照片、完全不改任何檔案」；最少需要用 `photos.json` 告訴網頁要用哪些照片檔名。

---

## 1) 放照片（檔名不限，但建議英文/數字、無空格）

把你的 6 張照片放到：
`assets/img/`

例如：
- `myhero.jpg`
- `factory_a.jpg`
- `factory_b.jpg`
- `tape_1.jpg`
- `tape_2.jpg`
- `line.jpg`

---

## 2) 更新 photos.json（只改這個檔案即可）

打開：`assets/img/photos.json`

把 `hero` 改成你的 Hero 圖片路徑，並在 `items` 依序列出 6 張照片：

```json
{
  "hero": "assets/img/myhero.jpg",
  "items": [
    { "src": "assets/img/factory_a.jpg", "caption": "工廠環境" },
    { "src": "assets/img/factory_b.jpg", "caption": "作業流程" },
    { "src": "assets/img/line.jpg", "caption": "設備與線體" },
    { "src": "assets/img/tape_1.jpg", "caption": "膠帶產品" },
    { "src": "assets/img/tape_2.jpg", "caption": "膠帶細節" },
    { "src": "assets/img/pack.jpg", "caption": "包裝與出貨" }
  ]
}
```

> caption 可留空，但建議保留：更有「敘事感」。

---

## 3) 原本的占位圖要不要刪？

- **不必刪**（保留也不影響）
- 若你想讓 repo 更乾淨，可以刪掉占位 SVG，但請保留 `photos.json`

占位檔包含：
- `hero-placeholder.svg`
- `factory-01.svg` / `factory-02.svg`
- `tape-01.svg` / `tape-02.svg`

---

## 4) 部署到 GitHub Pages

1. 建立 repo（例如 `junda-tape-demo`）
2. 把所有檔案上傳到 repo 根目錄
3. GitHub → Settings → Pages
4. Source 選 `Deploy from a branch`
5. Branch 選 `main` / `(root)`
6. Save 後稍等，GitHub 會給你預覽網址
