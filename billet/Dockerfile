#===============================================================================
#===  BILLET CLIENT  ===========================================================
#===============================================================================
FROM ubuntu:14.04

#===  UPDATE apt-get  ==========================================================
RUN apt-get update -q

#===  PYTHON 2.7 / PYLINT  =====================================================
RUN apt-get install -y python python-pip python-dev pylint

#===  CLANG  ===================================================================
RUN apt-get install -y libc++-dev libc++abi-dev clang-3.6 lldb-3.6
RUN ln -s /usr/bin/clang-3.6 /usr/bin/clang
RUN ln -s /usr/bin/clang++-3.6 /usr/bin/clang++
RUN apt-get install -y clang-format-3.6
RUN ln /usr/bin/clang-format-3.6 /usr/bin/clang-format

#===  NODEJS / NPM  ============================================================
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
RUN apt-get install -y nodejs

#===  GIT  =====================================================================
RUN apt-get install -y git

#===  MAKE / CMAKE  ============================================================
RUN apt-get install -y make
RUN apt-get install -y cmake

#===  WGET  ====================================================================
RUN apt-get install -y wget

#===  UNZIP  ===================================================================
RUN apt-get install -y unzip

#===  MISX TOOLS  ==============================================================
RUN apt-get install -qy vim
RUN apt-get install -y tmux

#===  BILLET SESSION HOST  =====================================================
ADD session_host /etc/billet/session_host

CMD /etc/billet/session_host/run.sh
