#===============================================================================
#===  SCORCH FORGE PRODUCTION ==================================================
#===============================================================================
FROM ubuntu:14.04

#===  UPDATE apt-get  ==========================================================
RUN apt-get update -q

#===  NODEJS / NPM  ============================================================
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
RUN apt-get install -y nodejs

#===  PROJECT  =================================================================
ADD bin/ /etc/forge/
ADD docker_command.sh /etc/forge/

CMD /bin/bash /etc/forge/docker_command.sh
