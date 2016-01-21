# Version: 0.0.1
FROM airead/ubuntu-base
MAINTAINER Airead Fan "fgh1987168@gmail.com"
ENV REFRESHED_AT 2016-01-15

VOLUME /www/react-study
ADD dist /www/react-study
