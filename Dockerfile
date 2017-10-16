FROM rocker:rstudio
MAINTAINER GerrymanderProject <anushri@live.unc.edu>

LABEL io.k8s.description = "Gerrymander Project" \
io.k8s.display-name="R to Node.js Server" \
io.openshift.expose-services = "8080:http"

#install R
RUN apt-get -y update && \
apt-get -y install python3 python3-pip r-base gnupg && \
pip3 install rpy2 && \
apt-get -y install libcurl4-openssl-dev curl && \
curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
apt-get install -y nodejs
#setup R configs
EXPOSE 8080
RUN mkdir -p /opt/r/packages && \
mkdir -p /opt/r/profile && \
chown 1001:0 /opt/r/profile /opt/r/packages && \
echo "r <- getOption('repos'); r['CRAN'] <- 'http://cran.us.r-project.org'; options(repos=r);" > /opt/r/profile/.Rprofile && \
chmod -R a+rw /opt/r/
ENV R_LIBS = /opt/r/packages
ENV R_PROFILE_USER=/opt/r/profile/.Rprofile
USER 1001
Rscript -e "install.packages(c('maptools', 'rgdal','ggplot2','spatstat' , 'RColorBrewer','spatstat','sp','maptools','RODBC'))"
ENTRYPOINT ["./public/ex-sync.R"]