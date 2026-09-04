// 찐컷 퍼널 사이트 v4 — 5화면 SPA (외부 라이브러리 없음)
// 갤러리 분류·순서·규격(전부 16:9)은 대표가 만든 원본(app.js)을 그대로 이식했다.

const WORKS = [
    // 생존 시리즈 (2026-09 발행, 소상공인 앱 브랜드 캠페인 — 업체명 비노출). 공개되는 대로 한 줄씩 추가
    { id: "mXKz27YS7c0", t: "생존 – 창업 혼자 버티던 시절", cat: "소상공인 캠페인", shorts: true },
    { id: "9JWS9XTZZeU", t: "생존 – 장사도 텐션이다", cat: "소상공인 캠페인", shorts: true },
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
const thumb = (w) => `https://i.ytimg.com/vi/${w.id}/hqdefault.jpg`;
const thumbVert = (w) => `https://i.ytimg.com/vi/${w.id}/oar2.jpg`;
const fallback = (img, w) => { img.onerror = null; img.src = `https://i.ytimg.com/vi/${w.id}/hqdefault.jpg`; };

// ── 계측: 애널리틱스로 보낼 것만 한 곳에 모은다 ────────
// 차단기를 쓰는 방문자에게는 gtag 가 아예 없다. 그때 화면이 죽으면 안 되므로
// 여기서 한 번만 막아준다 — 부르는 쪽은 gtag 가 있는지 신경 쓰지 않는다.
const VIEW_NAME = { home: "홈", works: "포트폴리오", think: "생각", store: "스토어", contact: "상담" };
function ga(event, params = {}) {
    if (typeof gtag !== "function") return;
    gtag("event", event, params);
}

// ── 화면 라우터: 옆으로 슬라이드 ───────────────────────
const VIEW_ORDER = ["home", "works", "think", "store", "contact"];
const ALIAS = { top: "home", free: "store", faq: "contact", process: "home", ebook: "store", diag: "store" };
const viewsEl = document.getElementById("views");
const viewEls = Array.from(document.querySelectorAll(".view"));
let curView = "home";
function goto(name) {
    name = ALIAS[name] || name;
    if (!VIEW_ORDER.includes(name)) name = "home";
    const i = VIEW_ORDER.indexOf(name);
    curView = name;
    viewEls.forEach((v, n) => v.classList.toggle("active", n === i));
    // 활성 표시는 내비 링크에만 — 본문 링크의 클래스를 건드리면 리빌(.on)이 지워진다
    document.querySelectorAll(".nav-links a").forEach((a) => {
        a.classList.toggle("on", a.dataset.view === name);
    });
    const fc = document.getElementById("floatCta");
    if (fc) fc.classList.toggle("hide", name === "contact" || name === "store");
    // 상담 화면에서는 챗봇 버튼도 접는다 — 폼 위에 겹쳐 입력을 가리기 때문
    const cb = document.getElementById("zzc-btn");
    if (cb) cb.style.display = (name === "contact") ? "none" : "flex";
    updateNavShadow();
    updateDotGrid();
    // 「생각」 화면의 카드 루프는 그 화면에 들어왔을 때만 받아서 돌린다 (2026-09-04) — 다른 화면에서 3개 500KB를 미리 받지 않는다
    document.querySelectorAll(".note-loop").forEach((v) => {
        if (name === "think") {
            if (!v.src) v.src = v.dataset.src;
            v.play().catch(() => {});
        } else if (v.src) {
            v.pause();
        }
    });
    // 화면 하나를 페이지 하나로 센다. 이게 있어야 「어디까지 보고 나갔나」가 보인다
    ga("page_view", {
        page_path: "/#" + name,
        page_title: "찐컷 — " + (VIEW_NAME[name] || name),
        // location.search 를 빼먹으면 ?utm_ 꼬리표가 통째로 사라진다 — 2026-09-04 11일치 유입에
        // 꼬리표 세션이 0건이던 원인. 프로필엔 걸려 있었는데 사이트가 지우고 있었다
        page_location: location.origin + location.pathname + location.search + "#" + name,
    });
}
function route() { goto((location.hash || "#home").replace(/^#\/?/, "")); }
document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-view]");
    if (!a) return;
    e.preventDefault();
    const name = ALIAS[a.dataset.view] || a.dataset.view;
    if (name === curView) {
        viewEls[VIEW_ORDER.indexOf(name)].scrollTo({ top: 0, behavior: "smooth" });
    }
    location.hash = name;
});
addEventListener("hashchange", route);

// ── 내비 그림자: 현재 화면의 스크롤 기준 ───────────────
const nav = document.getElementById("nav");
function updateNavShadow() {
    const v = viewEls[VIEW_ORDER.indexOf(curView)];
    nav.classList.toggle("scrolled", v.scrollTop > 40);
}
viewEls.forEach((v) => v.addEventListener("scroll", updateNavShadow, { passive: true }));

// ── 홈 히어로: 영상 로테이션 ───────────────────────────
// 각 영상을 끝까지 재생한 뒤 다음 영상으로 크로스페이드 — 중간에 끊기지 않는다.
const stage = document.getElementById("loopStage");
if (stage) {
    const vids = Array.from(stage.querySelectorAll("video"));
    let vi = 0;
    let switching = false;
    // 루프가 7개라 전부 미리 받으면 첫 화면이 3MB다. 앞 둘만 preload=auto 로 두고,
    // 나머지는 "다음 차례" 가 됐을 때 받기 시작한다 (한 클립 6초면 받을 시간이 넉넉하다).
    const prime = (i) => { const v = vids[i]; if (v && v.preload !== "auto") { v.preload = "auto"; v.load(); } };
    function advance() {
        if (switching) return;
        switching = true;
        const cur = vids[vi];
        vi = (vi + 1) % vids.length;
        const nxt = vids[vi];
        prime((vi + 1) % vids.length);
        nxt.currentTime = 0;
        nxt.play().catch(() => {});
        nxt.classList.add("live");
        cur.classList.remove("live");
        setTimeout(() => { cur.pause(); switching = false; }, 1200);
    }
    vids.forEach((v) => {
        v.addEventListener("timeupdate", () => {
            // 끝나기 직전에 미리 페이드를 시작해 검은 프레임을 안 보여준다
            if (v === vids[vi] && v.duration && v.currentTime > v.duration - 1.0) advance();
        });
        v.addEventListener("ended", () => { if (v === vids[vi]) advance(); });
    });
    vids[0].play().catch(() => {});
    vids[0].classList.add("live");
    prime(1);
    // 카드 덱 클릭 → 포트폴리오 화면
    const deck = stage.closest(".stage-deck");
    if (deck) deck.addEventListener("click", () => { location.hash = "works"; });
}

// ── 커서 반응 도트 그리드 (홈 + 데스크톱에서만) ────────
const dotCanvas = document.getElementById("dotgrid");
const fineDesktop = matchMedia("(pointer: fine) and (min-width: 901px)").matches
    && !matchMedia("(prefers-reduced-motion: reduce)").matches;
let dotRunning = false;
if (dotCanvas && fineDesktop) {
    const ctx = dotCanvas.getContext("2d");
    const GAP = 26, R_BASE = 1.4, RADIUS = 150;
    let W, H, dots = [];
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    function buildGrid() {
        const dpr = Math.min(devicePixelRatio || 1, 2);
        W = innerWidth; H = innerHeight;
        dotCanvas.width = W * dpr; dotCanvas.height = H * dpr;
        dotCanvas.style.width = W + "px"; dotCanvas.style.height = H + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        dots = [];
        for (let y = GAP / 2; y < H; y += GAP)
            for (let x = GAP / 2; x < W; x += GAP) dots.push({ x, y });
    }
    buildGrid();
    addEventListener("resize", buildGrid);
    addEventListener("mousemove", (e) => { mouse.tx = e.clientX; mouse.ty = e.clientY; });
    function frame() {
        if (!dotRunning) return;
        mouse.x += (mouse.tx - mouse.x) * 0.16;
        mouse.y += (mouse.ty - mouse.y) * 0.16;
        ctx.clearRect(0, 0, W, H);
        for (const d of dots) {
            const dx = d.x - mouse.x, dy = d.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            let ox = 0, oy = 0, a = 0.2, r = R_BASE;
            if (dist < RADIUS) {
                const f = (1 - dist / RADIUS);
                ox = (dx / (dist || 1)) * f * 14;
                oy = (dy / (dist || 1)) * f * 14;
                a = 0.2 + f * 0.5;
                r = R_BASE + f * 1.3;
            }
            ctx.beginPath();
            ctx.arc(d.x + ox, d.y + oy, r, 0, 6.2832);
            ctx.fillStyle = `rgba(59, 123, 255, ${a})`;
            ctx.fill();
        }
        requestAnimationFrame(frame);
    }
    window.startDots = () => { if (!dotRunning) { dotRunning = true; requestAnimationFrame(frame); } };
    window.stopDots = () => { dotRunning = false; };
}
function updateDotGrid() {
    if (!dotCanvas || !fineDesktop) return;
    const show = curView === "home";
    dotCanvas.classList.toggle("show", show);
    if (show && window.startDots) window.startDots();
    if (!show && window.stopDots) setTimeout(window.stopDots, 900);
}

// ── 3D 뷰어 슬롯: GLB 파일이 생기면 자동 표시 ──────────
fetch("assets/models/mascot.glb", { method: "HEAD" }).then((r) => {
    if (!r.ok) return;
    const sec = document.getElementById("model3d");
    const s = document.createElement("script");
    s.type = "module";
    s.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";
    document.head.appendChild(s);
    document.getElementById("modelFrame").innerHTML =
        `<model-viewer src="assets/models/mascot.glb" camera-controls auto-rotate
            shadow-intensity="1" exposure="1.1" alt="찐컷 3D 마스코트"></model-viewer>`;
    sec.hidden = false;
}).catch(() => {});

// ── 라이트박스 (페이지 안 재생) ────────────────────────
const lb = document.getElementById("lightbox");
const lbBody = document.getElementById("lbBody");
const lbFrame = document.getElementById("lbFrame");
function openVideo(w, vert) {
    lbBody.classList.toggle("vert", !!vert);
    lbFrame.innerHTML = `<iframe src="https://www.youtube.com/embed/${w.id}?autoplay=1&rel=0"
        title="${w.t}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    lb.hidden = false;
}
function closeVideo() { lb.hidden = true; lbFrame.innerHTML = ""; }
document.getElementById("lbClose1").addEventListener("click", closeVideo);
document.getElementById("lbClose2").addEventListener("click", closeVideo);
addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) closeVideo(); });
lb.hidden = true;

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

// ── 쇼츠 마키 — rAF로 픽셀 단위 무한 루프 (이음새·점프 없음) ──
const track = document.getElementById("marqueeTrack");
if (track) {
    // 복제 4벌 — 넓은 모니터에서도 순환 지점에서 오른쪽이 비지 않게
    const shorts = WORKS.filter((w) => w.shorts);
    const COPIES = 4;
    Array.from({ length: COPIES }, () => shorts).flat().forEach((w) => {
        const b = document.createElement("button");
        b.type = "button";
        const img = document.createElement("img");
        img.src = thumbVert(w); img.alt = w.t; img.decoding = "async";
        img.onerror = () => fallback(img, w);
        b.appendChild(img);
        b.addEventListener("click", () => openVideo(w, true));
        track.appendChild(b);
    });
    let mx = 0, unit = 0, mPaused = false, mLast = 0;
    const measure = () => { unit = track.scrollWidth / COPIES; };
    addEventListener("load", measure);
    addEventListener("resize", measure);
    measure();
    track.parentElement.addEventListener("mouseenter", () => { mPaused = true; });
    track.parentElement.addEventListener("mouseleave", () => { mPaused = false; });
    (function mstep(now) {
        const dt = Math.min(50, now - mLast || 16);
        mLast = now;
        if (!mPaused) {
            if (unit === 0) measure();
            mx -= dt * 0.038;
            if (unit > 0 && -mx >= unit) mx += unit;
            track.style.transform = `translate3d(${mx}px,0,0)`;
        }
        requestAnimationFrame(mstep);
    })(0);
}

// ── 빠른 상담 폼 → 구글폼으로 제출 ─────────────────────
const qf = document.getElementById("quickForm");
if (qf) {
    qf.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(qf);
        // 사이트 폼은 구글폼의 1페이지(동의·이름·연락처·이메일)만 낸다. 상세 17문항은
        // 접수 뒤 메일로 따로 받는다 (2026-08-24 준범 설계).
        // 페이지를 명시하지 않으면 구글이 어디까지 왔는지 몰라 저장을 거른다.
        data.append("pageHistory", "0");
        fetch("https://docs.google.com/forms/d/e/1FAIpQLScI6tUpXeY5mxHbeXp79N9IcTDS84xH9oD_nNPBa_Au6Ka01Q/formResponse",
            { method: "POST", mode: "no-cors", body: data }).catch(() => {});
        qf.querySelectorAll(".qf-grid, .qf-full, .qf-consent, .qf-submit, .qf-alt").forEach((el) => el.style.display = "none");
        document.getElementById("qfDone").hidden = false;
        // 접수가 끝난 뒤에도 「메일로 주셔도 돼요」가 남아 있으면 방금 남긴 사람에게
        // 한 번 더 뭔가 하라는 말로 읽힌다 (2026-08-24 준범 지적)
        const sub = document.getElementById("contactSub");
        if (sub) sub.style.display = "none";
        // 이 사이트에서 유일하게 「돈이 되는 행동」이다. 전환 목표로 잡을 이벤트
        ga("generate_lead", { method: "빠른 상담 폼" });
    });
}

// ── 푸터: 모든 화면 맨 아래에 붙인다 ───────────────────
const FOOTER = `
<footer class="footer">
    <div class="footer-brand">
        <img src="assets/logo/zzincut-logo.svg" alt="찐컷 ZZINCUT">
        <p>팔리는 영상을 만드는 회사</p>
    </div>
    <div class="footer-links">
        <a href="https://www.youtube.com/@zzincut" target="_blank" rel="noopener">YouTube</a>
        <a href="https://www.instagram.com/zzincut" target="_blank" rel="noopener">Instagram</a>
        <a href="https://www.tiktok.com/@zzincut" target="_blank" rel="noopener">TikTok</a>
        <a href="mailto:zzincut@gmail.com">Mail</a>
    </div>
    <p class="footer-legal">찐컷 · 대표 전준범 · 사업자등록번호 840-01-04037<br>
    대구광역시 북구 호암로 51, 4층 (대구창조경제혁신센터) · zzincut@gmail.com</p>
</footer>`;
viewEls.forEach((v) => v.insertAdjacentHTML("beforeend", FOOTER));

// ── 스크롤 리빌 ────────────────────────────────────────
const io = new IntersectionObserver(
    (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }),
    { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
// 리빌 안전장치 — IO가 놓쳐 투명하게 남은 요소를 살린다 (30초 뒤 스스로 멈춤)
let sweeps = 0;
const sweep = setInterval(() => {
    document.querySelectorAll(".reveal:not(.on)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.top < innerHeight && r.bottom > 0) el.classList.add("on");
    });
    if (++sweeps >= 20) clearInterval(sweep);
}, 1500);

// ── 시작 — 모든 선언이 끝난 뒤에 첫 라우팅을 돈다 ──────
route();
updateDotGrid();

// ── 밖으로 나가는 클릭 — 유튜브·인스타·상세 질문지 ─────
// 개별 링크마다 코드를 붙이면 링크가 늘 때마다 빠뜨린다. 문서 하나에서 잡는다.
document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="http"], a[href^="mailto:"]');
    if (!a) return;
    if (a.hostname === location.hostname) return;
    ga("click_outbound", { link_url: a.href, link_text: (a.textContent || "").trim().slice(0, 40) });
});
