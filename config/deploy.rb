require 'capistrano/ext/multistage'
require 'capistrano/s3'
require 'capistrano/recipes/deploy/strategy/copy'

set :stages, %w( production staging )
set :default_stage, 'staging'

set :application, 'gocardless-developer'

unless ENV['GC_AWS_ACCESS_KEY'] && ENV['GC_AWS_SECRET'] && ENV['GC_FASTLY_API_KEY']
  abort "Before continuing you need to create some environment variables : \n" +
        "- $GC_AWS_ACCESS_KEY\n" +
        "- $GC_AWS_SECRET\n\n" +
        "- $GC_FASTLY_API_KEY\n\n" +
        "Ask a devops if you don't know where to find these"
end

set :access_key_id, ENV['GC_AWS_ACCESS_KEY']
set :secret_access_key, ENV['GC_AWS_SECRET']
set :s3_endpoint, 's3-eu-west-1.amazonaws.com'

namespace :deploy do
  task :compile do
    system 'middleman build'
  end

  task :move do
    system 'mv build public'
  end

  task :clean do
    system 'rm -rf public'
  end

  task :default do
    transaction do
      compile
      move
      update
      clean
    end
  end

  task :purge_cdn_cache do
    system "curl -X POST \
            -H 'Fastly-Key: #{ENV['GC_FASTLY_API_KEY']}' \
            -H 'Accept: application/json' \
            https://api.fastly.com/service/#{fastly_service_id}/purge_all"
  end
end

after "deploy:default", "deploy:purge_cdn_cache"


