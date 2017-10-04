FROM r-base:latest
MAINTAINER GerrymanderProject <anushri@live.unc.edu>

LABEL io.k8s.description = "Gerrymander Project" \
      io.k8s.display-name="R to Node.js Server" \
      io.openshift.expose-services = "8080:http"

#install R
#RUN  apt-get update 

#setup R configs
EXPOSE 8080

RUN mkdir -p /opt/r/packages && \
    mkdir -p /opt/r/profile && \
    mkdir -p /opt/r/repo && \
    chown -R 1001:0 /opt/r/ && \
    echo "r <- getOption('repos'); r['CRAN'] <- 'http://cran.us.r-project.org'; options(repos=r);" > /opt/r/profile/.Rprofile && \
    chmod -R a+rw /opt/r/

ENV R_LIBS=/opt/r/packages
ENV R_PROFILE_USER=/opt/r/profile/.Rprofile

USER 1001

COPY /public /opt/r/repo

RUN Rscript -e "install.packages(c('maptools', 'rgdal','ggplot2','spatstat' , 'RColorBrewer','spatstat','sp','maptools','RODBC'))"

ENTRYPOINT ["./public/rcode.R"]