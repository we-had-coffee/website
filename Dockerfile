FROM httpd:alpine
ADD ./dist /usr/local/apache2/htdocs

#Remove Apache version in header
RUN echo 'ServerTokens Prod' >> /usr/local/apache2/conf/httpd.conf
RUN echo 'ServerSignature Off' >> /usr/local/apache2/conf/httpd.conf
RUN echo 'TraceEnable off' >> /usr/local/apache2/conf/httpd.conf