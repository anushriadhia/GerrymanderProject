FROM rocker:rstudio
MAINTAINER GerrymanderProject <anushri@live.unc.edu>

LABEL io.k8s.description = "Gerrymander Project" \
io.k8s.display-name="R to Node.js Server" \
io.openshift.expose-services = "8080:http"

#install R
RUN apt-get -y update \
    && apt-get -y install python3 \
        python3-pip \
        r-base \
        gnupg \
        libcurl4-openssl-dev \
        curl \
    && pip3 install rpy2 \
    && curl -sL https://deb.nodesource.com/setup_6.x | bash - \
    && apt-get -y install nodejs npm \
    && mkdir -p /opt/r/packages /opt/r/profile /opt/r/repo \
    && echo "r <- getOption('repos'); r['CRAN'] <- 'http://cran.us.r-project.org'; options(repos=r);" > /opt/r/profile/.Rprofile \
    && R_LIBS=/opt/r/packages R_PROFILE_USER=/opt/r/profile/.Rprofile Rscript -e "install.packages(c('maptools'))" \
    && chown 1001:0 /opt/r/profile /opt/r/packages \
    && chmod -R a+rwx /opt/r/

EXPOSE 8080
COPY /* /opt/r/repo/
ENV R_LIBS=/opt/r/packages
ENV R_PROFILE_USER=/opt/r/profile/.Rprofile
USER 1001
CMD ["npm", "run-script", "/opt/r/repo/index.ejs"]
