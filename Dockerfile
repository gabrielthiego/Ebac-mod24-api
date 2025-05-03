# Usa imagem base do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package*.json ./
COPY index.js ./

# Instala dependências
RUN npm install

# Expõe a porta da aplicação
EXPOSE 3000

# Comando que inicia a API
CMD ["npm", "start"]
