# Version: 0.0.1
FROM airead/nodejs-base
MAINTAINER Airead Fan "fgh1987168@gmail.com"
ENV REFRESHED_AT 2016-01-15

WORKDIR /src
ADD package.json package.json
RUN npm install

ENV REACT_STUDY_ROOT "/www/react-study/"
VOLUME ${REACT_STUDY_ROOT}

RUN gulp production
RUN cp -r dist ${REACT_STUDY_ROOT}

RUN rm /src
