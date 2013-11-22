module Middleman
  module DocGenerator
    # A sitemap plugin that adds month/day/year pages to the sitemap
    # based on the dates of doc articles.
    class DocLanguageIndex
      class << self
        def link(language=nil)
          path = "/#{language[:slug]}/index.html"
          ::Middleman::Util.normalize_path(path)
        end
      end

      def initialize(app, controller=nil)
        @app = app
        @doc_controller = controller
      end

      def doc_data
        if @doc_controller
          @doc_controller.data
        else
          @app.doc
        end
      end

      def doc_options
        if @doc_controller
          @doc_controller.options
        else
          @app.doc.options
        end
      end

      # Update the main sitemap resource list
      # @return [void]
      def manipulate_resource_list(resources)
        new_resources = []

        self.doc_options.languages.each do |lang|
          path = DocLanguageIndex.link(lang)

          p = ::Middleman::Sitemap::Resource.new(
            @app.sitemap,
            path
          )
          p.proxy_to(self.doc_options.language_template)

          # Add metadata in local variables so it's accessible to
          # later extensions
          p.add_metadata :locals => {
            'current_language' => lang,
            'doc_controller' => @doc_controller
          }

          new_resources << p
        end

        resources + new_resources
      end
    end
  end
end