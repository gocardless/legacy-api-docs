require "middleman-core"

require_relative "doc_generator/version"
require_relative "doc_generator/extension"

::Middleman::Extensions.register(:doc_generator) do
  ::Middleman::DocGeneratorExtension
end