module Middleman
  module DocGenerator
    # A module that adds doc-page methods to Resources.
    class DocData
      # The configured options for this doc
      # @return [Thor::CoreExt::HashWithIndifferentAccess]
      attr_reader :options

      attr_reader :controller

      # @private
      def initialize(app, options={}, controller=nil)
        @app = app
        @options = options
        @controller = controller

        # A list of resources corresponding to doc pages
        @_pages = []
      end

      # A list of all doc pages
      # @return [Array<Middleman::Sitemap::Resource>]
      def pages
        @_pages.sort_by(&:order)
      end

      # @return [void]
      def manipulate_resource_list(resources)
        @_pages = []
        used_resources = []

        resources.each do |resource|
          unless File.fnmatch(File.join(@options.docs_dir, "**"), resource.path)
            used_resources << resource
            next
          end

          slug = File.basename(resource.path, File.extname(resource.path))
          ext = File.extname(resource.path).sub(/^\./, "")
          categories = File.dirname(resource.path.sub(@options.docs_dir, ""))
            .split(File::SEPARATOR)

          # Set language for page if file extension matches a language 'extname'
          language = @options.languages.find do |lang|
            lang.extname == ext
          end

          clean_slug = lambda do |s|
            s.strip.sub(/^\d+/, "").gsub(/\_/, " ").strip
          end

          resource.add_metadata locals: {
            slug: clean_slug.call(slug),
            language: language,
            page_id: categories.join('') + slug,
            categories: categories.map(&clean_slug)
          }

          resource.extend DocPage

          if @controller
            resource.doc_controller = controller
          end

          @_pages << resource
        end

        used_resources
      end

      def inspect
        "#<Middleman::DocGenerator::DocData: #{pages.inspect}>"
      end
    end
  end
end
