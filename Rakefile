require 'rake/clean'
require 'crxmake'
require 'coffee-script'
require 'pry'

SRCS = FileList["src/*.coffee"]
OBJS = SRCS.ext('js')

CLEAN.include(OBJS)
OUTPUT = 'fuck-catalog.crx'

rule '.js' => '.coffee' do |t|
  sh "coffee --compile #{t.source}"
end

task OUTPUT => OBJS + %w{src/manifest.json src/jquery.min.js} do
  CrxMake.make(ex_dir: './src', crx_output: OUTPUT, ignoredir: '.git')
end

task default: OUTPUT
