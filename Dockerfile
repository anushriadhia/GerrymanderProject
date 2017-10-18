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
mkdir -p /opt/r/repo && \
chown 1001:0 /opt/r/profile /opt/r/packages && \
echo "r <- getOption('repos'); r['CRAN'] <- 'http://cran.us.r-project.org'; options(repos=r);" > /opt/r/profile/.Rprofile && \
chmod -R a+rw /opt/r/
COPY /* /opt/r/repo/
ENV R_LIBS=/opt/r/packages
ENV R_PROFILE_USER=/opt/r/profile/.Rprofile
RUN Rscript -e "install.packages(c('maptools'))"
USER 1001
CMD ["/opt/r/repo/index.ejs"]
