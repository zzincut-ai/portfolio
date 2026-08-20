// 화면 확인용 — 미리보기 서버(localhost:8123)를 띄운 뒤 실행한다.
//   node tools/shot.js <해시> <저장폴더> [가로] [세로]
//   예) node tools/shot.js store /tmp/shot 1440 900
//       node tools/shot.js home  /tmp/shot 390 844      ← 모바일
// 준비: npm i playwright-core (한 번만), 크롬 경로는 CH 환경변수로 넘긴다.
//   CH=$HOME/.cache/ms-playwright/chromium-*/chrome-linux64/chrome
// 화면 전환이 중간 화면을 지나가지 않는지도 함께 검사한다.
const { chromium } = require('playwright-core');
const [hash = 'home', out = '/tmp/shot', w = 1440, h = 900] = process.argv.slice(2);
(async () => {
    const b = await chromium.launch({ executablePath: process.env.CH, args: ['--no-sandbox'] });
    const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2, isMobile: +w < 700 });
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    await p.goto(`http://localhost:8123/index.html#${hash}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1500);
    await p.evaluate(() => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('on')));
    await p.waitForTimeout(500);
    await p.screenshot({ path: `${out}/${hash}-${w}.png` });
    const r = await p.evaluate(() => ({
        보이는화면: [...document.querySelectorAll('.view')].filter((v) => getComputedStyle(v).opacity !== '0').map((v) => v.dataset.view),
        가로스크롤: document.documentElement.scrollWidth > innerWidth,
    }));
    await b.close();
    console.log(JSON.stringify({ 저장: `${out}/${hash}-${w}.png`, ...r, JS오류: errs }, null, 1));
})();
