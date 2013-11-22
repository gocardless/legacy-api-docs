require "builder"
require "angularjs_template_assets"

root = File.dirname(File.absolute_path(__FILE__))
Dir.glob(root + "/extensions/*") {|file| require file}

set :css_dir, "stylesheets"
set :js_dir, "javascripts"
set :images_dir, "images"

activate :livereload
activate :directory_indexes

activate :syntax

activate :doc_generator do |doc_generator|
  doc_generator.languages = data.languages
  doc_generator.language_template = "docs-layouts/layout.html"
end

set :layout, :docs

set :markdown_engine, :redcarpet
set :markdown,
  renderer: DocsRecarpetRenderHTML,
  no_intra_emphasis: true,
  tables: true,
  autolink: true,
  fenced_code_blocks: true,
  lax_spacing: true,
  highlight: true,
  quote: true

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  # activate :relative_assets
end
