require 'nokogiri'

module Middleman
  module DocGenerator
    # A module that adds doc-page methods to Resources.
    module DocPage
      def self.extended(base)
        base.class.send(:attr_accessor, :doc_controller)
      end

      def slug
        metadata[:locals][:slug]
      end

      def categories
        metadata[:locals][:categories]
      end

      def page_id
        metadata[:locals][:page_id]
      end

      def language
        metadata[:locals][:language]
      end

      # The body of this article, in HTML. This is for
      # things like RSS feeds or lists of articles - individual
      # articles will automatically be rendered from their
      # template.
      # @return [String]
      def body
        render(layout: false)
      end

      # Enables simple ordering based on the entire sub directory naming
      def order
        page_id
      end
    end
  end
end