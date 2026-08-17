// 찐컷 퍼널 사이트 v1 — 모션과 콘텐츠 주입 (외부 라이브러리 없음)

// 대표작 목록 — 앞 9개가 그리드, 전체가 마키에 쓰인다
const WORKS = [
    { id: "AaniZWiMDRI", title: "찐컷 치킨 — 오감을 깨우는 바삭함" },
    { id: "PnkucL3sZdM", title: "ZZINSINSA — 비트를 입은 AI 런웨이" },
    { id: "vmFhFigiCFg", title: "찐컷이 만들면 다르다" },
    { id: "QRIqJb1VJKs", title: "뉴욕 윤해운대갈비 — 전통의 재해석" },
    { id: "LSGtgPO5qLo", title: "카페인중독 — 일상의 이야기" },
    { id: "S8xi5a90hqo", title: "SIF — 차량 연료 절감기" },
    { id: "0OQb_pkeNL8", title: "우드팸 — 나무로 삶을 만드는 사람들" },
    { id: "ZCTgYag2y2g", title: "복싱 — 움직임을 담다" },
    { id: "1hoOzHBC8L4", title: "무빙포스터" },
    { id: "1kGmVTIOMzs", title: "시흥 — 일상을 담은 도시 콘텐츠" },
    { id: "yzzviBXeTKg", title: "병원 — 공간의 새로운 해석" },
    { id: "Xu79amFVE34", title: "나무창작소 — 손끝에서 시작되는 이야기" },
];

const thumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const watch = (id) => `https://www.youtube.com/watch?v=${id}`;

// 작업 그리드 (앞 9개)
const grid = document.getElementById("worksGrid");
if (grid) {
    WORKS.slice(0, 9).forEach((w) => {
        const a = document.createElement("a");
        a.className = "work-card reveal";
        a.href = watch(w.id);
        a.target = "_blank";
        a.rel = "noopener";
        a.innerHTML = `<img src="${thumb(w.id)}" alt="${w.title}" loading="lazy">
                       <span class="play" aria-hidden="true"></span>
                       <span class="meta">${w.title}</span>`;
        grid.appendChild(a);
    });
}

// 마키 (전체 2회 반복 — 트랙이 -50% 이동해도 이어져 보이게)
const track = document.getElementById("marqueeTrack");
if (track) {
    [...WORKS, ...WORKS].forEach((w) => {
        const a = document.createElement("a");
        a.href = watch(w.id);
        a.target = "_blank";
        a.rel = "noopener";
        a.innerHTML = `<img src="${thumb(w.id)}" alt="${w.title}" loading="lazy">`;
        track.appendChild(a);
    });
}

// 스크롤 리빌
const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); }
    }),
    { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// 내비 배경
const nav = document.getElementById("nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 40), { passive: true });
