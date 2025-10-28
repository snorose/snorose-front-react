export function setStatusBarColor(color) {
  // CSS 변수 업데이트
  document.documentElement.style.setProperty('--page-bg-color', color);

  // Android (브라우저 탭용) theme-color 메타 수정
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', color);

  // 상단 가짜 status bar 색상도 변경
  const fakeBar = document.querySelector('.status-bar-fake');
  if (fakeBar) fakeBar.style.backgroundColor = color;

  // body 배경색도 동기화
  document.body.style.backgroundColor = color;
}
