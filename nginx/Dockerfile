#===============================================================================
#===  NGINS REVERSE PROXY FOR SCORCHFORGE  =====================================
#===============================================================================
FROM ubuntu:14.04

#===  UPDATE apt-get  ==========================================================
RUN apt-get update

#===  UPDATE apt-get  ==========================================================
RUN apt-get install -y nginx

#===  CONFIGURE NGINX  =========================================================
ADD default /etc/nginx/sites-available/default
ADD ssl_certs/ /etc/ssl/
ADD docker_command.sh /etc/nginx/docker_command.sh

CMD bash /etc/nginx/docker_command.sh
