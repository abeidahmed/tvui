FROM node:16.14.2-bullseye-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends build-essential curl git libpq-dev gnupg2 ca-certificates \
    libtool m4 autotools-dev automake autoconf libssl-dev pkg-config \
  && curl -sSL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo 'deb https://dl.yarnpkg.com/debian/ stable main' | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update && apt-get install -y --no-install-recommends yarn \
  && rm -rf /var/lib/apt/lists/* /usr/share/doc /usr/share/man \
  && apt-get clean \
  && mkdir /node_modules && chown node:node -R /node_modules /app

# Install watchman build dependencies
RUN apt-get update -y \
  && apt-get install -y python-dev

# Install watchman
RUN git clone --branch=v4.9.0 --depth=1 https://github.com/facebook/watchman.git \
  && cd watchman \
  && ./autogen.sh \
  && CXXFLAGS=-Wno-error ./configure \
  && make \
  && make install

# Install chrome for default testem config (as of ember-cli 2.15.0)
RUN apt-get update \
    && apt-get install -y \
      apt-transport-https \
      gnupg \
      --no-install-recommends \
    && curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y \
      google-chrome-stable \
      --no-install-recommends

# Tweak chrome to run with --no-sandbox option
RUN sed -i 's/"$@"/--no-sandbox "$@"/g' /opt/google/chrome/google-chrome

# Setup default user
USER node

COPY --chown=node:node package.json *yarn* ./
RUN yarn install

COPY --chown=node:node . .

CMD ["yarn", "start"]
