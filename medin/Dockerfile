FROM ruby:3.0.3-slim-bullseye

WORKDIR /app

RUN bash -c "set -o pipefail && apt-get update \
  && apt-get install -y --no-install-recommends build-essential curl git libpq-dev \
  && curl -sSL https://deb.nodesource.com/setup_16.x | bash - \
  && curl -sSL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo 'deb https://dl.yarnpkg.com/debian/ stable main' | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update && apt-get install -y --no-install-recommends nodejs yarn \
  && rm -rf /var/lib/apt/lists/* /usr/share/doc /usr/share/man \
  && apt-get clean \
  && useradd --create-home ruby \
  && mkdir /node_modules && chown ruby:ruby -R /node_modules /app"

USER ruby

COPY --chown=ruby:ruby Gemfile* ./
RUN bundle install

COPY --chown=ruby:ruby package.json *yarn* ./
RUN yarn install

ENV RAILS_ENV="${RAILS_ENV}" \
  NODE_ENV="${NODE_ENV}" \
  PATH="${PATH}:/home/ruby/.local/bin:/node_modules/.bin" \
  USER="ruby"

COPY --chown=ruby:ruby . .

RUN chmod 0755 bin/*

CMD ["rails", "s"]
