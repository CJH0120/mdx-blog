# Node.js 이미지 사용
FROM node:20

# pnpm 설치
RUN npm install -g pnpm

# 애플리케이션 디렉토리 생성
WORKDIR /usr/src/app

# 의존성 파일 복사
COPY package*.json ./

# 의존성 설치 (pnpm 사용)
RUN pnpm install

# 애플리케이션 소스 코드 복사
COPY . .

# 애플리케이션 포트 설정
EXPOSE 3000

# 애플리케이션 실행 (pnpm 사용)
CMD ["pnpm", "start"]
