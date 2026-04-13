# VIBE Bag Shop - 프리미엄 가방 셀렉트샵

현대적인 감각의 프리미엄 가방 브랜드 **VIBE**의 공식 웹사이트 프로젝트입니다. Three.js를 활용한 3D 상품 쇼케이스와 반응형 디자인을 제공합니다.

## 🚀 주요 기능

- **3D MD'S CHOICE**: MD가 추천하는 시그니처 아이템을 3D 모델로 감상할 수 있습니다. 마우스 드래그를 통해 가방의 디테일을 모든 각도에서 확인할 수 있으며, 실시간으로 색상을 변경해볼 수 있습니다.
- **MD 추천 상품 캐러셀**: 시그니처 브리프케이스와 어반 크로스백 등 주요 상품을 부드러운 전환 효과와 함께 탐색할 수 있습니다.
- **베스트 컬렉션 슬라이더**: 이번 주 가장 인기 있는 상품들을 슬라이더 형식으로 확인하고 바로 장바구니에 담을 수 있습니다.
- **반응형 디자인**: Tailwind CSS를 사용하여 모바일, 태블릿, 데스크탑 환경에 최적화된 UI를 제공합니다.

## 🛠 사용 기술

- **Frontend**: HTML5, Tailwind CSS, JavaScript (ES6+)
- **3D Engine**: Three.js (GLTFLoader, OrbitControls)
- **Deployment**: Node.js static server (로컬 테스트용)

## 📁 프로젝트 구조

```text
vibe-bagshop/
├── assets/             # 3D 모델(.glb) 및 이미지 리소스
├── index.html          # 메인 페이지 구조
├── script.js           # Three.js 로직 및 UI 인터랙션
├── style.css           # 커스텀 스타일 및 애니메이션
└── README.md           # 프로젝트 문서
```

## 💻 실행 방법

1. 프로젝트 폴더를 엽니다.
2. 로컬 서버를 통해 `index.html`을 실행합니다.
   - Node.js가 설치된 경우: `npx serve .` 또는 제공된 커스텀 서버 스크립트 실행
3. 웹 브라우저에서 `http://localhost:8080`으로 접속합니다.

## ✍️ 제작 정보

- **브랜드명**: VIBE (Premium Bag Select Shop)
- **개발 컨셉**: 미니멀리즘, 럭셔리, 인터랙티브 사용자 경험
