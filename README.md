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

## GitHub Pages로 배포하는 방법

GitHub를 이미 쓰고 있다면 이것도 괜찮습니다. 다만 Netlify보다 설정이 조금 더 많습니다.

### 가장 쉬운 방식

1. GitHub에서 새 저장소를 만듭니다.
2. 저장소 이름을 `내아이디.github.io`처럼 **계정명.github.io** 형식으로 만듭니다.
3. 저장소는 `Public`으로 만드는 것이 가장 쉽습니다.
4. 이 프로젝트 코드를 그 저장소에 올립니다.
5. GitHub 저장소의 `Settings` > `Pages`로 들어갑니다.
6. `Source`를 `GitHub Actions`로 선택합니다.
7. 저장소에 있는 `.github/workflows/pages.yml` 파일이 자동으로 빌드와 배포를 해줍니다.
8. 배포가 끝나면 `https://내아이디.github.io` 주소가 생깁니다.

### 이미 준비된 것

- GitHub Pages용 워크플로우: [\.github/workflows/pages.yml](/Users/sweetrain/projects/travel/vietnam/.github/workflows/pages.yml:1)

### 이 방식의 장점

- GitHub만 있으면 됨
- 무료로 배포 가능
- 코드 수정 후 push 하면 자동 배포됨
- 안드로이드 Chrome에서 홈 화면 추가 가능

### 이 방식의 단점

- Netlify보다 처음 설정이 조금 더 많음
- 일반 저장소 이름으로 배포하면 경로 설정이 더 복잡해질 수 있음
