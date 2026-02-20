# 🌐 Gowoobro Web

> **개인 개발자 포트폴리오 & 프로젝트 쇼케이스 웹사이트**

[gowoobro.com](https://gowoobro.com)에서 운영되는 개인 포트폴리오 웹사이트입니다.  
Flutter 앱, 웹 플랫폼 등 다양한 프로젝트를 소개하고, 방문자와 소통할 수 있는 인터랙티브 채팅 인터페이스를 제공합니다.

---

## ✨ 주요 기능

- **💬 인터랙티브 채팅 인터페이스** — AI 스타일의 Q&A 채팅 UI로 방문자의 질문을 접수
- **📱 프로젝트 쇼케이스** — Flutter 모바일 앱 & 웹 플랫폼 프로젝트 카드 형태로 전시
- **🌍 다국어 지원 (i18n)** — 한국어 / English 자동 라우팅 및 전환
- **🎨 모던 UI/UX** — Framer Motion 애니메이션, Glassmorphism, 다크 테마
- **🔧 관리자 패널** — 프로젝트 관리를 위한 Admin 페이지
- **🐳 Docker 배포** — Dockerfile & Docker Compose를 통한 컨테이너 배포 지원

---

## 🛠 기술 스택

| 영역 | 기술 |
|---|---|
| **프레임워크** | Next.js 16, React 19 |
| **언어** | TypeScript |
| **스타일링** | Tailwind CSS v4, Emotion (CSS-in-JS) |
| **애니메이션** | Framer Motion |
| **상태 관리** | Jotai, TanStack React Query |
| **HTTP 클라이언트** | Axios |
| **배포** | Docker, Docker Compose |
| **백엔드 API** | Go (별도 서버, API 프록시 연동) |

---

## 📁 프로젝트 구조

```
gowoobro_web/
├── app/
│   ├── [lang]/           # i18n 동적 라우팅 (ko, en)
│   │   ├── admin/        # 관리자 페이지
│   │   ├── layout.tsx    # 루트 레이아웃
│   │   └── page.tsx      # 메인 페이지
│   ├── api/              # API Routes (프록시)
│   ├── components/       # UI 컴포넌트
│   │   ├── ChatInterface.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── SuiteGrid.tsx
│   │   ├── IntegrationsGrid.tsx
│   │   └── PageLayout.tsx
│   ├── dictionaries/     # 다국어 사전 (ko.json, en.json)
│   ├── lib/              # 유틸리티 (Axios 인스턴스)
│   └── types/            # TypeScript 타입 정의
├── public/               # 정적 에셋
├── middleware.ts          # i18n 리다이렉트 미들웨어
├── docker-compose.yml
├── dockerfile
├── Makefile
└── package.json
```

---

## 🚀 시작하기

### 사전 요구 사항

- **Node.js** 22+
- **npm** 또는 **bun**

### 설치 & 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트 9007)
npm run dev
```

또는 `make` 명령어 사용:

```bash
make run
```

[http://localhost:9007](http://localhost:9007) 에서 확인할 수 있습니다.

### 환경 변수

프로젝트 루트에 `.env` 파일을 생성합니다:

```env
NEXT_PUBLIC_API_URL=your-backend-url
NEXT_PUBLIC_EMAIL=your-email@example.com
NEXT_PUBLIC_IMAGE_URL=your-image-url
```

---

## 🐳 Docker 배포

```bash
# Docker 이미지 빌드
make docker

# Docker Hub에 푸시
make push

# Docker Compose로 실행
docker compose up -d
```

---

## 📜 스크립트

| 명령어 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 실행 (포트 9007) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 검사 |
| `make docker` | Docker 이미지 빌드 (linux/amd64) |
| `make push` | Docker Hub에 이미지 푸시 |
| `make clean` | `.next` 빌드 캐시 삭제 |

---

## 📄 라이선스

© Gowoobro. All rights reserved.
