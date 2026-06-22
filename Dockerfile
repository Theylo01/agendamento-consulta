# Imagem base Node.js
FROM node:24-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia arquivos de dependências primeiro (otimiza cache do Docker)
COPY package*.json ./

RUN apk add --no-cache \
    python3 \
    make \
    g++

# Instala TODAS as dependências (dev também, pois precisamos compilar TypeScript)
RUN npm install

# Copia o restante do código-fonte
COPY . .

# Compila o TypeScript para JavaScript (gera a pasta /app/build)
RUN node ace build

# Muda para o diretório de build (onde roda a app em produção)
WORKDIR /app/build

# Instala apenas dependências de produção no build
#RUN npm install --omit=dev
RUN npm ci --omit=dev

# Porta que a aplicação vai escutar
EXPOSE 3333

# Executa as migrations e inicia o servidor
CMD ["sh", "-c", "node ace.js migration:run --force && node bin/server.js"]