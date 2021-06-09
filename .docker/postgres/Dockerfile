FROM postgres:13
#RUN localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
#ENV LANG en_US.utf8
COPY ./create-extension.sql /docker-entrypoint-initdb.d/create-extension.sql
EXPOSE 5432
CMD ["postgres"]
