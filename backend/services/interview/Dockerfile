FROM node 

WORKDIR /app

COPY package*json ./
RUN npm install

COPY ./services/billing/package*json ./services/interview/

RUN npm install

COPY services/billing ./services/interview
COPY shared ./shared

WORKDIR /app/services/interview

EXPOSE 8003

CMD ["npm", "start"]

