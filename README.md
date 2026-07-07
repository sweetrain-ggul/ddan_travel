# Vietnam Currency Calculator

안드로이드에서 쓰는 베트남 환율 계산기 프로젝트 뼈대입니다.

## 목표

- 설정 화면에서 통화와 환율을 입력한다.
- 계산 화면에서는 금액만 입력하고 결과를 바로 본다.
- 오프라인에서도 마지막 설정값으로 계산한다.
- 나중에 VND, JPY, USD, CNY 같은 통화를 추가한다.

## 폴더 구조

```text
src/
  app/
    App.tsx
    main.tsx
  domain/
    calculator.ts
    currency.ts
    storage.ts
    types.ts
  screens/
    CalculatorScreen.tsx
    SetupScreen.tsx
  styles/
    global.css
```

## 역할 분리

- `src/domain`: 계산, 통화 정의, 저장 로직
- `src/screens`: 사용자 화면 2개
- `src/app`: 앱 진입점과 화면 전환
- `src/styles`: 전역 스타일

## 다음 단계

1. 화면 전환 구조 만들기
2. 로컬 저장 구현하기
3. 계산 로직 연결하기
4. 부모님용 단순 UI 적용하기

## 실행 방법

```bash
npm install
npm run dev
```

또는 다른 기기에서 열어보려면:

```bash
npm run dev:host
```

그다음 브라우저에서 Vite가 보여주는 주소를 열면 됩니다. 보통 `http://localhost:5173`이고, 같은 와이파이 안의 다른 기기에서는 PC의 로컬 IP 주소로 접속할 수 있습니다.

## 수정하면서 보는 방법

1. `npm run dev` 또는 `npm run dev:host` 실행
2. 브라우저에서 화면 열기
3. 코드를 수정하면 자동으로 새로고침됨
4. 레이아웃이나 문구를 보고 바로 다시 조정

## 무료 배포 방법

가장 쉬운 방법은 **Netlify** 같은 무료 정적 호스팅에 올리는 것입니다.

이 프로젝트는 정적 웹앱이라서:
- 로그인 기능 없이도 바로 올릴 수 있고
- 배포 후 `https://` 주소가 생기며
- 안드로이드 Chrome에서 홈 화면 설치가 가능합니다

### 추천: Netlify

1. `npm run build`를 실행해서 `dist` 폴더를 만듭니다.
2. Netlify 계정을 만듭니다. 무료로 시작할 수 있습니다.
3. Netlify 대시보드에서 새 사이트를 만들고 `dist` 폴더를 업로드합니다.
4. 배포가 끝나면 `https://...netlify.app` 같은 주소가 생깁니다.
5. 그 주소를 안드로이드 Chrome에서 열고, 메뉴에서 `홈 화면에 추가`를 누릅니다.

### 설치가 되는 이유

이 앱은 이미 PWA 구성요소를 가지고 있습니다.
- `manifest.webmanifest`
- `service worker`
- 홈 화면 아이콘

PWA는 보통 안전한 주소(`https://`)에서 열려야 하고, 홈 화면에 추가하려면 manifest와 service worker가 필요합니다.

### 안드로이드에서 설치하는 방법

1. 배포된 주소를 Chrome으로 엽니다.
2. 오른쪽 위 `⋮` 메뉴를 엽니다.
3. `홈 화면에 추가` 또는 `앱 설치`를 누릅니다.
4. 이름을 확인하고 추가합니다.

### 초보자에게 중요한 점

- `localhost`는 내 컴퓨터 안에서만 보입니다.
- 휴대폰에 설치하려면 휴대폰이 접근할 수 있는 인터넷 주소가 필요합니다.
- 무료 배포 후에야 폰에서 바탕화면 설치를 할 수 있습니다.

## GitHub Pages 자동 배포

이 프로젝트는 GitHub Actions로 자동 배포하도록 설정할 수 있습니다.

### 동작 방식

1. 코드를 `main` 브랜치에 push 한다.
2. GitHub Actions가 자동으로 `npm ci`와 `npm run build`를 실행한다.
3. 만들어진 `dist` 결과물을 GitHub Pages에 배포한다.
4. 배포가 끝나면 `https://sweetrain-ggul.github.io/ddan_travel/` 주소에서 열린다.

### 필요한 설정

1. GitHub 저장소에서 `Settings` > `Pages`로 들어간다.
2. `Source`를 `GitHub Actions`로 선택한다.
3. 저장소에 있는 `.github/workflows/pages.yml` 워크플로우가 배포를 담당한다.

### 중요

- 자동 배포를 쓰려면 워크플로우 파일이 GitHub 저장소에 올라가 있어야 한다.
- 현재 로컬에서는 워크플로우 파일을 준비했지만, GitHub 인증이 필요하다.
