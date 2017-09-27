FROM rocker:rstudio
MAINTAINER GerrymanderProject <anushri@live.unc.edu>

LABEL io.k8s.description = "Gerrymander Project" \
io.k8s.display-name="R to Node.js Server" \
io.openshift.expose-services = "8080:http"

USER 1001

#install R
RUN sudo apt-get -y install r-base \
pip install rpy2 \
apt-get -y install libcurl14-openssl-dev

#setup R configs
RUN echo "r <- getOption('repos'); r['CRAN'] <- 'http://cran.us.r-project.org'; options(repos=r);" > ~/.Rprofile
RUN Rscript -e "install.packages('maptools')" \
Rscript -e "install.packages('rgdal')" \
Rscript -e "install.packages('ggplot2')" \
Rscript -e "install.packages('spatstat')" \
Rscript -e "install.packages('RColorBrewer')"

EXPOSE 8080

ENTRYPOINT ["./public/rcode.R"]