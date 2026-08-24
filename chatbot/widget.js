// 찐컷 AI 상담 위젯 — 오른쪽 아래 말풍선. 외부 라이브러리 없음.
// 엔드포인트: window.ZZ_CHAT_URL (없으면 로컬 프록시). 흰 바탕 + 파란 포인트.
(function () {
  const URL = window.ZZ_CHAT_URL || "https://nmnpscbddsydlzsjgoeg.supabase.co/functions/v1/chat";
  const HELLO = "안녕하세요, 찐컷 AI 상담이에요 가격·제작 과정·기간처럼 자주 묻는 건 바로 답해드리고, 견적·일정 확정은 상담 신청으로 이어드려요 사람 답변은 평일 13~18시예요";
  const css = `
  #zzc-btn{position:fixed;right:22px;bottom:88px;height:48px;padding:0 18px 0 14px;border-radius:24px;background:#2743C7;color:#fff;border:0;box-shadow:0 6px 20px rgba(29,78,216,.35);font-size:15px;font-weight:600;cursor:pointer;z-index:9998;display:flex;align-items:center;gap:8px;font-family:Pretendard,"Malgun Gothic",sans-serif}
  #zzc{position:fixed;right:22px;bottom:146px;width:340px;max-width:calc(100vw - 44px);height:480px;max-height:calc(100vh - 120px);background:#fff;border:1px solid #dbe4ff;border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.18);display:none;flex-direction:column;overflow:hidden;z-index:9999;font-family:Pretendard,"Malgun Gothic",sans-serif}
  #zzc.open{display:flex}
  #zzc header{background:#2743C7;color:#fff;padding:12px 14px;font-size:14px;display:flex;justify-content:space-between;align-items:center}
  #zzc header small{opacity:.85;font-weight:400;display:block;font-size:11px}
  #zzc header button{background:none;border:0;color:#fff;font-size:18px;cursor:pointer}
  #zzc-log{flex:1;overflow-y:auto;padding:12px;background:#f7f9ff;display:flex;flex-direction:column;gap:8px}
  .zzc-m{max-width:85%;padding:9px 12px;border-radius:12px;font-size:13.5px;line-height:1.5;white-space:pre-wrap}
  .zzc-a{background:#fff;border:1px solid #dbe4ff;align-self:flex-start;color:#1a1a1a}
  .zzc-u{background:#2743C7;color:#fff;align-self:flex-end}
  #zzc form{display:flex;border-top:1px solid #e5e9f5}
  #zzc input{flex:1;border:0;padding:12px;font-size:14px;outline:none}
  #zzc form button{border:0;background:#2743C7;color:#fff;padding:0 16px;cursor:pointer}
  #zzc .zzc-cta{font-size:12px;text-align:center;padding:6px;color:#2743C7;background:#eef3ff}
  #zzc .zzc-cta a{color:#2743C7;font-weight:600}
  /* 모바일 — 무료 진단 버튼(right:14px/bottom:14px)과 오른쪽 끝을 맞춰 세로로 쌓는다 */
  @media (max-width:640px){
    #zzc-btn{right:14px;bottom:72px;height:44px;padding:0 16px 0 12px;font-size:14px}
    #zzc{right:14px;bottom:124px;max-width:calc(100vw - 28px);max-height:calc(100dvh - 160px)}
  }`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  const btn = document.createElement("button"); btn.id = "zzc-btn"; btn.innerHTML = "<span style=\"font-size:20px\">💬</span>챗봇"; btn.title = "찐컷 AI 챗봇";
  // 상담 화면에서 열렸을 땐 처음부터 접어둔다 (이후 전환은 funnel.js가 맡는다)
  if (location.hash === "#contact") btn.style.display = "none";
  const box = document.createElement("div"); box.id = "zzc";
  box.innerHTML = `<header><div>찐컷 챗봇<small>AI가 답해요 · 사람 답변은 평일 13~18시</small></div><button type="button" aria-label="닫기">×</button></header>
  <div id="zzc-log"></div>
  <div class="zzc-cta">견적·일정은 <a href="#contact" data-view="contact">상담 신청</a>으로</div>
  <form><input placeholder="궁금한 걸 적어주세요" maxlength="500" autocomplete="off"><button type="submit">보내기</button></form>`;
  document.body.append(btn, box);
  const log = box.querySelector("#zzc-log"), form = box.querySelector("form"), input = box.querySelector("input");
  const history = [];
  function add(role, text) {
    const d = document.createElement("div"); d.className = "zzc-m " + (role === "user" ? "zzc-u" : "zzc-a");
    d.textContent = text; log.appendChild(d); log.scrollTop = log.scrollHeight; return d;
  }
  btn.onclick = () => { box.classList.toggle("open"); if (!log.children.length) add("assistant", HELLO); input.focus(); };
  box.querySelector("header button").onclick = () => box.classList.remove("open");
  let busy = false, sent = 0;
  form.onsubmit = async (e) => {
    e.preventDefault(); const q = input.value.trim(); if (!q || busy) return;
    if (sent >= 12) { add("assistant", "대화가 길어졌어요. 남은 건 상담 신청으로 남겨주시면 사람이 답해드려요."); return; }
    input.value = ""; add("user", q); history.push({ role: "user", content: q }); sent++;
    busy = true; const wait = add("assistant", "…");
    try {
      const r = await fetch(URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: history }) });
      const j = await r.json(); wait.textContent = j.reply || "잠시 문제가 생겼어요. 상담 신청으로 남겨주세요.";
      history.push({ role: "assistant", content: wait.textContent });
    } catch { wait.textContent = "연결이 안 돼요. 상담 신청이나 zzincut@gmail.com 으로 남겨주세요."; }
    busy = false; input.focus();
  };
})();
