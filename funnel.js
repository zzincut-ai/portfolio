// 찐컷 퍼널 사이트 v2 — 갤러리·라이트박스·틸트 (외부 라이브러리 없음)

// 작업 목록 — vert: 세로(쇼츠), cat: 카테고리
const WORKS = [
    { id: "AaniZWiMDRI", t: "찐컷 치킨 — 오감을 깨우는 바삭함", cat: "fnb" },
    { id: "QRIqJb1VJKs", t: "뉴욕 윤해운대갈비 — 전통의 재해석", cat: "fnb" },
    { id: "LSGtgPO5qLo", t: "카페인중독 — 일상의 이야기", cat: "fnb", vert: true },
    { id: "PnkucL3sZdM", t: "ZZINSINSA — 비트를 입은 AI 런웨이", cat: "style" },
    { id: "ZCTgYag2y2g", t: "복싱 — 움직임을 담다", cat: "style" },
    { id: "yzzviBXeTKg", t: "병원 — 공간의 새로운 해석", cat: "style" },
    { id: "vmFhFigiCFg", t: "찐컷이 만들면 다르다", cat: "b2b", vert: true },
    { id: "S8xi5a90hqo", t: "SIF — 차량 연료 절감기", cat: "b2b" },
    { id: "0OQb_pkeNL8", t: "우드팸 — 나무로 삶을 만드는 사람들", cat: "b2b" },
    { id: "ZXe3JHFrp5c", t: "우드팸 — 우트콤", cat: "b2b", vert: true },
    { id: "1kGmVTIOMzs", t: "시흥 — 일상을 담은 도시 콘텐츠", cat: "b2b" },
    { id: "02IVutCarqo", t: "사천 — 또 다른 도시의 시선", cat: "b2b", vert: true },
    { id: "9LU42TYFUK0", t: "부동산 랭킹 — 한강뷰 TOP 3", cat: "b2b", vert: true },
    { id: "MhH5q3i7KHI", t: "부동산 임장 — 진짜 현장", cat: "b2b", vert: true },
    { id: "Xu79amFVE34", t: "나무창작소 — 손끝에서 시작되는 이야기", cat: "b2b" },
    { id: "1hoOzHBC8L4", t: "무빙포스터", cat: "art", vert: true },
    { id: "dk1-bqjfWL0", t: "공허함 — 감정을 시각화하다", cat: "art", vert: true },
    { id: "C9QBfe0wI5E", t: "두려움 — 내면을 표현하는 영상", cat: "art" },
    { id: "vfbfMtzbboY", t: "Face ID — 타이포그래피", cat: "art" },
    { id: "hWhLHxFVnDA", t: "김소미 — 한 사람의 선택이 만든 길", cat: "art" },
];

// 세로 영상은 세로 썸네일(oar2), 실패 시 hqdefault로 폴백
const thumb = (w) => w.vert
    ? `https://i.ytimg.com/vi/${w.id}/oar2.jpg`
    : `https://i.ytimg.com/vi/${w.id}/hqdefault.jpg`;
const fallback = (img, w) => { img.onerror = null; img.src = `https://i.ytimg.com/vi/${w.id}/hqdefault.jpg`; };

// ── 라이트박스 (페이지 안 재생) ──────────────────────────
const lb = document.getElementById("lightbox");
const lbBody = document.getElementById("lbBody");
const lbFrame = document.getElementById("lbFrame");
function openVideo(w) {
    lbBody.classList.toggle("vert", !!w.vert);
    lbFrame.innerHTML = `<iframe src="https://www.youtube.com/embed/${w.id}?autoplay=1&rel=0&modestbranding=1"
        title="${w.t}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
}
function closeVideo() {
    lb.hidden = true;
    lbFrame.innerHTML = "";
    document.body.style.overflow = "";
}
document.getElementById("lbClose1").addEventListener("click", closeVideo);
document.getElementById("lbClose2").addEventListener("click", closeVideo);
addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) closeVideo(); });
lb.hidden = true;

// ── 작업 갤러리 — 규격화된 그리드 + 더보기 ──────────────
// 카드 크기는 통일한다(가로 16:9 / 쇼츠 필터에서만 9:16).
// 처음 6개만 보여주고 「더보기」로 6개씩 연다 — 페이지가 길면 안 읽는다.
const grid = document.getElementById("worksGrid");
const moreBtn = document.getElementById("moreBtn");
const PAGE = 6;
let curCat = "all";
let shown = PAGE;

function pool(cat) {
    if (cat === "shorts") return WORKS.filter((w) => w.vert);
    if (cat === "all") return WORKS.filter((w) => !w.vert);   // 전체 탭은 가로 규격만 — 쇼츠는 쇼츠 탭·마키에
    return WORKS.filter((w) => w.cat === cat && !w.vert);
}
function renderGrid() {
    const list = pool(curCat);
    grid.classList.toggle("shorts-mode", curCat === "shorts");
    grid.innerHTML = "";
    list.slice(0, shown).forEach((w) => {
        const b = document.createElement("button");
        b.className = "work-card" + (w.vert ? " vert" : "");
        b.type = "button";
        const img = document.createElement("img");
        img.src = thumb(w); img.alt = w.t; img.loading = "lazy";
        img.onerror = () => fallback(img, w);
        b.appendChild(img);
        b.insertAdjacentHTML("beforeend", `<span class="play" aria-hidden="true"></span><span class="meta">${w.t}</span>`);
        b.addEventListener("click", () => openVideo(w));
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

// ── 히어로 틸트 카드 (마우스 반응) ──────────────────────
const heroCards = document.querySelector(".hero-cards");
if (heroCards) {
    WORKS.filter((w) => w.vert).slice(0, 3).forEach((w) => {
        const d = document.createElement("div");
        d.className = "tilt-card";
        const img = document.createElement("img");
        img.src = thumb(w); img.alt = ""; img.onerror = () => fallback(img, w);
        d.appendChild(img);
        d.addEventListener("click", () => openVideo(w));
        d.style.cursor = "pointer";
        heroCards.appendChild(d);
    });
    addEventListener("pointermove", (e) => {
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;
        heroCards.querySelectorAll(".tilt-card").forEach((c, i) => {
            const depth = (i + 1) * 4;
            c.style.transform = `translate(${x * depth}px, ${y * depth}px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
        });
    }, { passive: true });
}

// ── 쇼츠 마키 ──────────────────────────────────────────
const track = document.getElementById("marqueeTrack");
if (track) {
    const shorts = WORKS.filter((w) => w.vert);
    [...shorts, ...shorts].forEach((w) => {
        const b = document.createElement("button");
        b.type = "button";
        const img = document.createElement("img");
        img.src = thumb(w); img.alt = w.t; img.loading = "lazy";
        img.onerror = () => fallback(img, w);
        b.appendChild(img);
        b.addEventListener("click", () => openVideo(w));
        track.appendChild(b);
    });
}

// ── 스크롤 리빌 + 내비 ─────────────────────────────────
const io = new IntersectionObserver(
    (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }),
    { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
const nav = document.getElementById("nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 40), { passive: true });
