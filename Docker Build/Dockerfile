FROM node:6.2-slim
MAINTAINER Roy Meissner <roymeissn@gmail.com>

RUN apt-get update && apt-get -y upgrade

# ---------------- #
#   Installation   #
# ---------------- #

RUN apt-get -y install openjdk-7-jdk
RUN apt-get -y install git wget ant lib32stdc++6 lib32z1

# ----------------- #
#   Configuration   #
# ----------------- #

## Create a user for the web app
RUN adduser --gecos "Application" --disabled-password cordova
RUN mkdir /home/cordova/APK

# Set env variables.
ENV ANDROID_SDK_FILENAME android-sdk_r24.4.1-linux.tgz
ENV ANDROID_SDK http://dl.google.com/android/$ANDROID_SDK_FILENAME

RUN cd /home/cordova/ && \
    wget $ANDROID_SDK && tar -xzvf $ANDROID_SDK_FILENAME && \
    rm $ANDROID_SDK_FILENAME

RUN echo "y" | /home/cordova/android-sdk-linux/tools/android update sdk -u --all --filter platform-tools,android-23,build-tools-23.0.3

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
