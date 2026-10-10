"""zzincut.com 에 유튜브 영상 한 편 올리기 — 정본 도구 (2026-10-10 준범 「올려라고 하면 이거 까먹지 마」)

사이트 화면은 funnel.js 의 WORKS_ALL 만 읽는다. assets/videos.json · app.js 는 옛 사이트 것이라
거기 넣으면 화면에 안 나온다(10/10 실제로 그렇게 틀렸다). 그래서 넣는 길을 이 파일 하나로 묶는다.

    python3 tools/add_work.py <유튜브ID|링크> "제목" "분류" [--long] [--from 2026-10-12T10:05] [--push]

- 분류는 사이트에 있는 것만: 소상공인 캠페인 · F&B & 프랜차이즈 · 패션 & 라이프스타일 · 로컬 브랜드 & B2B · 실제 촬영/편집
- 쇼츠가 기본(홈 띠에도 뜬다). 가로 영상은 --long
- 유튜브가 아직 비공개(예약)면 --from 에 공개 시각을 준다. 없으면 멈춘다 — 재생 안 되는 칸을 올리지 않는다
- --push: 커밋·푸시하고 실제 사이트에 그 ID가 뜰 때까지(최대 3분) 확인. 안 뜨면 실패로 끝난다
"""
import argparse, json, re, subprocess, sys, time, urllib.error, urllib.request
from datetime import datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent.parent
FUNNEL, INDEX = HERE / "funnel.js", HERE / "index.html"
CATS = ["소상공인 캠페인", "F&B & 프랜차이즈", "패션 & 라이프스타일", "로컬 브랜드 & B2B", "실제 촬영/편집"]
LIVE = "https://zzincut.com/funnel.js"


def yt_id(s: str) -> str:
    m = re.search(r"(?:v=|youtu\.be/|shorts/|embed/)([\w-]{11})", s)
    vid = m.group(1) if m else s
    if not re.fullmatch(r"[\w-]{11}", vid):
        sys.exit(f"유튜브 ID를 못 읽었다: {s}")
    return vid


def is_public(vid: str) -> bool:
    """oEmbed 는 공개·일부공개 영상만 200을 준다(로그인·과금 없음)."""
    url = f"https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v={vid}"
    try:
        with urllib.request.urlopen(url, timeout=15) as r:
            return r.status == 200
    except urllib.error.HTTPError:
        return False


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("video"); ap.add_argument("title"); ap.add_argument("cat")
    ap.add_argument("--long", action="store_true"); ap.add_argument("--from", dest="frm")
    ap.add_argument("--push", action="store_true")
    a = ap.parse_args()

    vid = yt_id(a.video)
    if a.cat not in CATS:
        sys.exit(f"분류가 사이트에 없다: {a.cat}\n  있는 것: {' · '.join(CATS)}")
    src = FUNNEL.read_text(encoding="utf-8")
    if "const WORKS_ALL = [" not in src:
        sys.exit("funnel.js 에 WORKS_ALL 이 없다 — 사이트 구조가 바뀌었다. 이 도구부터 고친다")
    if f'"{vid}"' in src:
        sys.exit(f"이미 올라가 있다: {vid}")

    frm = ""
    if not is_public(vid):
        if not a.frm:
            sys.exit(f"{vid} 는 아직 비공개다. 예약 공개 시각을 --from 2026-10-12T10:05 처럼 준다")
        frm = datetime.fromisoformat(a.frm).strftime("%Y-%m-%dT%H:%M:00+09:00")

    line = f'    {{ id: "{vid}", t: {json.dumps(a.title, ensure_ascii=False)}, cat: "{a.cat}"'
    line += "" if a.long else ", shorts: true"
    line += f', from: "{frm}"' if frm else ""
    line += " },\n"
    src = src.replace("const WORKS_ALL = [\n", "const WORKS_ALL = [\n" + line, 1)
    FUNNEL.write_text(src, encoding="utf-8")

    idx = INDEX.read_text(encoding="utf-8")
    m = re.search(r"funnel\.js\?v=(\d+)", idx)
    if not m:
        sys.exit("index.html 에서 funnel.js?v= 를 못 찾았다")
    INDEX.write_text(idx.replace(m.group(0), f"funnel.js?v={int(m.group(1)) + 1}", 1), encoding="utf-8")
    subprocess.run(["node", "--check", str(FUNNEL)], check=True)
    print(f"넣음: {vid} · {a.title} · {a.cat}" + (f" · {frm} 부터 노출" if frm else " · 바로 노출"))

    if not a.push:
        print("푸시 안 함(시험). 실제로 올릴 땐 처음부터 --push 를 붙인다")
        return
    git = ["git", "-C", str(HERE)]
    subprocess.run(git + ["add", "funnel.js", "index.html"], check=True)
    subprocess.run(git + ["commit", "-q", "-m", f"feat(works): {a.title} ({vid})\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"], check=True)
    subprocess.run(git + ["push", "-q", "origin", "main"], check=True)
    for i in range(18):                     # 깃허브 페이지 반영 대기 — 10초 × 18 = 3분 상한
        time.sleep(10)
        try:
            with urllib.request.urlopen(f"{LIVE}?x={time.time()}", timeout=15) as r:
                if vid in r.read().decode("utf-8", "replace"):
                    print(f"실제 사이트 반영 확인 ({(i + 1) * 10}초)")
                    return
        except Exception:
            pass
    sys.exit("3분 안에 실제 사이트에 안 떴다 — 깃허브 페이지 빌드를 확인한다")


if __name__ == "__main__":
    main()
