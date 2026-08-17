// 찐컷 퍼널 사이트 v3 — 단일 정본 (외부 라이브러리 없음)
// 갤러리 분류·순서·규격(전부 16:9)은 대표가 만든 원본(app.js)을 그대로 이식했다.

const WORKS = [
    { id: "vmFhFigiCFg", t: "찐컷이 만들면 다르다", cat: "로컬 브랜드 & B2B", shorts: true },
    { id: "PnkucL3sZdM", t: "비트를 입은 AI 런웨이, ZZINSINSA", cat: "패션 & 라이프스타일" },
    { id: "AaniZWiMDRI", t: "오감을 깨우는 바삭함의 미학, 찐컷 치킨", cat: "F&B & 프랜차이즈" },
    { id: "ZCTgYag2y2g", t: "복싱 – 움직임을 담다", cat: "패션 & 라이프스타일" },
    { id: "S8xi5a90hqo", t: "SIF – 차량 연료 절감기", cat: "실제 촬영/편집" },
    { id: "ZXe3JHFrp5c", t: "우드팸 – 우트콤", cat: "실제 촬영/편집", shorts: true },
    { id: "0OQb_pkeNL8", t: "우드팸 – 나무로 삶을 만드는 사람들", cat: "실제 촬영/편집" },
    { id: "02IVutCarqo", t: "사천 – 또 다른 도시의 시선", cat: "로컬 브랜드 & B2B", shorts: true },
    { id: "yzzviBXeTKg", t: "병원 – 공간의 새로운 해석", cat: "패션 & 라이프스타일" },
    { id: "QRIqJb1VJKs", t: "뉴욕 윤해운대갈비 – 전통의 재해석", cat: "F&B & 프랜차이즈" },
    { id: "LSGtgPO5qLo", t: "카페인중독 – 일상의 이야기", cat: "F&B & 프랜차이즈", shorts: true },
    { id: "1kGmVTIOMzs", t: "시흥 – 일상을 담은 도시 콘텐츠", cat: "로컬 브랜드 & B2B" },
    { id: "C9QBfe0wI5E", t: "두려움 – 내면을 표현하는 영상", cat: "패션 & 라이프스타일" },
    { id: "dk1-bqjfWL0", t: "공허함 – 감정을 시각화하다", cat: "패션 & 라이프스타일", shorts: true },
    { id: "mXvJRO3mj5U", t: "부동산 소개 – 실전 매물 브리핑 1편", cat: "실제 촬영/편집" },
    { id: "1qbjgIonn34", t: "부동산 소개 – 실전 매물 브리핑 2편", cat: "실제 촬영/편집" },
    { id: "9LU42TYFUK0", t: "부동산 랭킹 – 한강뷰 아파트 TOP 3 분석", cat: "실제 촬영/편집", shorts: true },
    { id: "jhMpoiXu3ak", t: "부동산 임장 – 실제 매물의 가치 분석", cat: "실제 촬영/편집" },
    { id: "MhH5q3i7KHI", t: "부동산 임장 – 직접 가서 본 진짜 현장", cat: "실제 촬영/편집", shorts: true },
    { id: "Xu79amFVE34", t: "나무창작소 – 손끝에서 시작되는 이야기", cat: "실제 촬영/편집" },
    { id: "1hoOzHBC8L4", t: "무빙포스터", cat: "실제 촬영/편집", shorts: true },
    { id: "hWhLHxFVnDA", t: "김소미 – 한 사람의 선택이 만든 길", cat: "실제 촬영/편집" },
    { id: "vfbfMtzbboY", t: "Face ID – 타이포그래피", cat: "실제 촬영/편집" },
];
// 그리드는 전부 16:9 규격(대표 원안). 세로 썸네일은 마키에서만.
const thumb = (w) => `https://i.ytimg.com/vi/${w.id}/hqdefault.jpg`;
const thumbVert = (w) => `https://i.ytimg.com/vi/${w.id}/oar2.jpg`;
const fallback = (img, w) => { img.onerror = null; img.src = `https://i.ytimg.com/vi/${w.id}/hqdefault.jpg`; };

// ── 라이트박스 (페이지 안 재생) ────────────────────────
const lb = document.getElementById("lightbox");
const lbBody = document.getElementById("lbBody");
const lbFrame = document.getElementById("lbFrame");
function openVideo(w, vert) {
    lbBody.classList.toggle("vert", !!vert);
    lbFrame.innerHTML = `<iframe src="https://www.youtube.com/embed/${w.id}?autoplay=1&rel=0"
        title="${w.t}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
}
function closeVideo() { lb.hidden = true; lbFrame.innerHTML = ""; document.body.style.overflow = ""; }
document.getElementById("lbClose1").addEventListener("click", closeVideo);
document.getElementById("lbClose2").addEventListener("click", closeVideo);
addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) closeVideo(); });
lb.hidden = true;

// ── 히어로: 자동재생 루프 영상 3장 (부채꼴, 호버 시 앞으로) ──
const heroCards = document.querySelector(".hero-cards");
if (heroCards) {
    ["assets/loops/loop1.mp4", "assets/loops/loop2.mp4", "assets/loops/loop3.mp4"].forEach((src) => {
        const d = document.createElement("div");
        d.className = "tilt-card";
        d.innerHTML = `<video src="${src}" autoplay muted loop playsinline></video>`;
        heroCards.appendChild(d);
    });
}

// ── 작업 갤러리 — 대표 원안: 카테고리 4종 + 전부 16:9 + 더보기 ──
const grid = document.getElementById("worksGrid");
const moreBtn = document.getElementById("moreBtn");
const PAGE = 6;
let curCat = "ALL";
let shown = PAGE;
function pool(cat) {
    return cat === "ALL" ? WORKS : WORKS.filter((w) => w.cat === cat);
}
function renderGrid() {
    const list = pool(curCat);
    grid.innerHTML = "";
    list.slice(0, shown).forEach((w) => {
        const b = document.createElement("button");
        b.className = "work-card";
        b.type = "button";
        const img = document.createElement("img");
        img.src = thumb(w); img.alt = w.t; img.loading = "lazy";
        b.appendChild(img);
        b.insertAdjacentHTML("beforeend",
            `<span class="play" aria-hidden="true"></span>
             <span class="card-info"><b>${w.t}</b><i>${w.cat}</i></span>`);
        b.addEventListener("click", () => openVideo(w, false));
        grid.appendChild(b);
    });
    moreBtn.hidden = list.length <= shown;
}
renderGrid();
moreBtn.addEventListener("click", () => { shown += PAGE; renderGrid(); });
document.getElementById("filter").addEventListener("click", (e) => {
    const btn = e.target.closest(".chip-btn");
    if (!btn) return;
    document.querySelectorAll(".chip-btn").forEach((c) => c.classList.remove("on"));
    btn.classList.add("on");
    curCat = btn.dataset.cat;
    shown = PAGE;
    renderGrid();
});

// ── 쇼츠 마키 — gap 없이 margin으로 이음새 없는 루프 ────
const track = document.getElementById("marqueeTrack");
if (track) {
    const shorts = WORKS.filter((w) => w.shorts);
    [...shorts, ...shorts].forEach((w) => {
        const b = document.createElement("button");
        b.type = "button";
        const img = document.createElement("img");
        img.src = thumbVert(w); img.alt = w.t; img.loading = "lazy";
        img.onerror = () => fallback(img, w);
        b.appendChild(img);
        b.addEventListener("click", () => openVideo(w, true));
        track.appendChild(b);
    });
}

// ── 빠른 상담 폼 → 구글폼으로 제출 ─────────────────────
const qf = document.getElementById("quickForm");
if (qf) {
    qf.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(qf);
        fetch("https://docs.google.com/forms/d/e/1FAIpQLScI6tUpXeY5mxHbeXp79N9IcTDS84xH9oD_nNPBa_Au6Ka01Q/formResponse",
            { method: "POST", mode: "no-cors", body: data }).catch(() => {});
        qf.querySelectorAll(".qf-grid, .qf-full, .qf-consent, .qf-submit, .qf-alt").forEach((el) => el.style.display = "none");
        document.getElementById("qfDone").hidden = false;
    });
}

// ── 부드러운 섹션 이동 ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        const from = scrollY;
        const to = target.getBoundingClientRect().top + scrollY - 70;
        const dur = 700;
        const t0 = performance.now();
        const ease = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
        (function step(now) {
            const p = Math.min(1, (now - t0) / dur);
            scrollTo(0, from + (to - from) * ease(p));
            if (p < 1) requestAnimationFrame(step);
        })(t0);
    });
});

// ── 스크롤 리빌 + 내비 배경 ────────────────────────────
const io = new IntersectionObserver(
    (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }),
    { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
const nav = document.getElementById("nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 40), { passive: true });
