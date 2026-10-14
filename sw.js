/*
 * 온라인 교무실 앱 설치용 서비스 워커
 * 자료는 저장해 두지 않는다. 항상 인터넷에서 새로 받아 오고,
 * 인터넷이 끊겼을 때만 안내 화면을 보여 준다.
 */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (e) => {
  if (e.request.mode !== 'navigate') return;          // 페이지 열기만 다룬다
  e.respondWith(
    fetch(e.request).catch(() => new Response(
      '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<title>온라인 교무실</title>' +
      '<body style="font-family:sans-serif;background:#faf5ec;color:#2e2a24;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center">' +
      '<div><p style="font-size:18px;font-weight:700">인터넷에 연결되어 있지 않습니다</p>' +
      '<p style="color:#7a7264">연결된 뒤 다시 열어 주세요.</p>' +
      '<button onclick="location.reload()" style="padding:8px 16px;border-radius:8px;border:1px solid #e4dac7;background:#fff">다시 시도</button></div>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    ))
  );
});
