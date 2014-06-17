require_relative "doc_data"
require_relative "doc_page"
require_relative "doc_language_index"

module Middleman
  class DocGeneratorExtension < Extension
    self.supports_multiple_instances = true

    option :folders, ["docs"], "Which folders to include"
    option :sources, ":title.html", "How to extract metadata from on-disk files"
    option :languages, [], "languages"
    option :language_template, nil, "template"
    option :code_source, "code", "folder for code samples"
    option :docs_dir, "docs/", "where the docs at"

    attr_accessor :data, :uid

    def initialize(app, options_hash={}, &block)
      super
    end

    def after_configuration
      @uid ||= "doc#{@app.doc_instances.keys.length}"

      @app.ignore(options.language_template) if options.language_template

      @app.doc_instances[@uid.to_sym] = self

      # Initialize doc with options
      @data = ::Middleman::DocGenerator::DocData.new(@app, options, self)

      @app.sitemap.register_resource_list_manipulator(
        :"doc_pages",
        @data,
        false
      )

      @app.sitemap.register_resource_list_manipulator(
        :"doc_#{uid}_language",
        ::Middleman::DocGenerator::DocLanguageIndex.new(@app, self),
        false
      )
    end

    # Helpers for use within templates and layouts.
    helpers do
      def doc_instances
        @doc_instances ||= {}
      end

      def doc_controller(key=nil)
        key ||= (current_resource && current_resource.metadata[:page]["doc"]) || doc_instances.keys.first
        doc_instances[key.to_sym]
      end

      def doc(key=nil)
        doc_controller(key).data
      end

      # Default language
      def current_language
        lang = current_resource.metadata[:locals]["current_language"]
        lang || doc.options.languages.first
      end

      def language_pages
        doc.pages.reject do |page|
          is_code = page.categories.include?(doc.options.code_source)
          is_code || (page.language && page.language != current_language)
        end
      end

      def codes_for_page(current_page)
        doc.pages.select do |page|
          has_code = page.categories.last == doc.options.code_source
          is_current_code = page.categories[0..-2] == current_page.categories
          is_current_language = page.language == current_language

          has_code && is_current_code && is_current_language
        end
      end
    end
  end
end
