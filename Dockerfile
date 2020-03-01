FROM node:12

COPY ./backend /root/backend
WORKDIR /root/backend
RUN npm install

EXPOSE 8080 8443

CMD ["npm", "start"]