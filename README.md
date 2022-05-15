# 영화 검색 및 즐겨찾기 추가 웹

[배포 사이트](https://silly-tapioca-8153ed.netlify.app)

 <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-3178C6?style=flat&logo=React&logoColor=#7ED0EF"/> <img src="https://img.shields.io/badge/Recoil-3178C6?style=flat&logo=Recoil&logoColor=white"/>

```
src
 ┣ assets
 ┣ components // 재사용하는 컴포넌트
 ┣ hooks      // custom hook
 ┣ routes     // 페이지 관련
 ┣ services   // api 관련
 ┣ stores     // 전역 상태관리 초기값
 ┣ styles     // 스타일 관련
 ┣ types      // 타입 지정
 ```




![movieApp](https://user-images.githubusercontent.com/87363088/168457331-b9d6b149-74c2-4d54-a747-edc9a6604420.gif)

### 주요기능
- 영화 검색(영어로만 검색가능)
input창에 영화 제목 입력시 debounce 처리해서 매 
- 즐겨찾기
 영화 즐겨찾기시, localStoarge에 저장
### 이슈
- 검색된 영화 목록이 많은 상태에서, 즐겨찾기 갔다가 다시 검색으로 오면 페이지 상단에서 시작
- 즐겨찾기에서 검색으로 이동시 불필요하게 api를 호출해서 중복된 값을 검색결과에 넣지 않도록 해둠
