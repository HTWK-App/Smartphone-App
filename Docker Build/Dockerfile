FROM ubuntu:14.04.2
MAINTAINER Roy Meissner <rmeissn@gmail.com>

# Prevent some error messages
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get -y upgrade

# ---------------- #
#   Installation   #
# ---------------- #

RUN apt-get -y install openjdk-7-jdk
RUN apt-get -y install git wget npm ant lib32stdc++6 lib32z1

# ----------------- #
#   Configuration   #
# ----------------- #

# Fix NodeJS and install cordova
RUN ln -s /usr/bin/nodejs /usr/bin/node && npm install -g cordova@5.0.0

## Create a user for the web app
RUN adduser --gecos "Application" --disabled-password cordova
RUN mkdir /home/cordova/APK

# Set env variables.
ENV ANDROID_SDK_FILENAME android-sdk_r24.1.2-linux.tgz
ENV ANDROID_SDK http://dl.google.com/android/$ANDROID_SDK_FILENAME

RUN cd /home/cordova/ && \
    wget $ANDROID_SDK && tar -xzvf $ANDROID_SDK_FILENAME && \
    rm $ANDROID_SDK_FILENAME

RUN echo "y" | /home/cordova/android-sdk-linux/tools/android update sdk -u --all --filter platform-tools,android-22,build-tools-22.0.1

RUN cd /home/cordova/ && git clone https://github.com/HTWK-App/Smartphone-App.git
WORKDIR /home/cordova/Smartphone-App

ADD build.sh /home/cordova/build.sh

RUN chmod +x /home/cordova/build.sh

# ----------- #
#   Cleanup   #
# ----------- #

RUN apt-get autoremove -y wget && apt-get -y clean && \
		rm -rf /var/lib/apt/lists/*
		
# -------- #
#   Run!   #
# -------- #

CMD /home/cordova/build.sh
