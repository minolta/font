# FROM httpd
# COPY dist/pifont6/ /usr/local/apache2/htdocs/
# COPY my-httpd.conf /usr/local/apache2/conf/httpd.conf 
FROM nginx
COPY dist/font/* /usr/share/nginx/html