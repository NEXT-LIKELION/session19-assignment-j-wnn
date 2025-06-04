[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/J2aBlxZf)

# 개인 블로그 프로젝트

## CSR vs SSR 적용 기준 및 분류

### 🎯 적용 기준

**SSR (Server-Side Rendering) 적용:**
- SEO가 중요한 페이지 (검색엔진 노출)
- 빠른 초기 로딩이 필요한 페이지
- 정적 콘텐츠 중심의 페이지

**CSR (Client-Side Rendering) 적용:**
- 사용자 상호작용이 많은 페이지
- 실시간 업데이트가 필요한 기능
- 폼 입력 및 데이터 조작이 빈번한 페이지

### 📋 기능별 분류

| 기능 | 렌더링 방식 | 적용 이유 |
|------|------------|-----------|
| **메인 페이지** (게시글 목록) | **SSR** | SEO 최적화, 빠른 초기 로딩, 검색엔진 노출 |
| **게시글 상세 페이지** | **SSR** | SEO 최적화, 콘텐츠 검색엔진 노출, 빠른 초기 로딩 |
| **게시글 작성 페이지** | **CSR** | 폼 상호작용, 실시간 입력 검증, 사용자 경험 |
| **게시글 수정 페이지** | **CSR** | 폼 상호작용, 기존 데이터 로딩 및 수정 |
| **댓글 시스템** | **CSR** | 실시간 CRUD 작업, 즉시 피드백, 상호작용 중심 |
| **게시글 액션** (수정/삭제 버튼) | **CSR** | 사용자 액션 처리, 페이지 이동 제어 |

### 🚀 구현된 기능

- ✅ 게시글 CRUD (생성, 조회, 수정, 삭제)
- ✅ 댓글 CRUD (생성, 조회, 수정, 삭제)
- ✅ 반응형 UI (Tailwind CSS + shadcn/ui)
- ✅ SEO 최적화 (SSR 적용)
- ✅ 사용자 경험 최적화 (CSR 적용)
