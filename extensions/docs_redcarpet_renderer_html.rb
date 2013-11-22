require "middleman-core/renderers/redcarpet"

class DocsRecarpetRenderHTML < Middleman::Renderers::MiddlemanRedcarpetHTML
  def initialize(options={})
    @local_options = options.dup

    super
  end

  def markdown(text)
    @markdown ||= Redcarpet::Markdown.new(Redcarpet::Render::HTML, @local_options)
    @markdown.render(text)
  end

  def preprocess(text)
    definition_lists(text)
  end

  def definition_lists(text)
    dl_test = /(\A|\n\n+)(?<dt>\S.+)(\n\:(\s{4,}|\t))(?<dd>\S.+)/

    text.gsub(dl_test) do |match|
      dl = "\n\n"
      dl += "<dl>"
      dl += "<dt>#{markdown($1)}</dt>"
      dl += "<dd>#{markdown($2)}</dd>"
      dl += "</dl>"
      dl += "\n\n"
      dl
    end
  end
end
