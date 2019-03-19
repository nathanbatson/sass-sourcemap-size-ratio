const fs = require('fs');
const { SourceMapConsumer } = require('source-map');

const rawSourceMap = fs.readFileSync('css/app.css.map', 'utf8');

const sassBlamer = SourceMapConsumer.with(rawSourceMap, null, consumer => {
  let files = consumer.sources.reduce((acc, file) => {
    acc[file] = {
      sourceLines: [],
      generatedLines: [],
      ratio: 1,
    }

    return acc;
  }, {});

  console.log('File source to output line ratio:');
  consumer.eachMapping(function (m) {
    files[m.source].sourceLines.push(m.originalLine);
    files[m.source].generatedLines.push(m.generatedLine);
  });

  // unique sort the sourceLines
  Object.entries(files).forEach(([filename, file]) => {
    file.sourceLines = file.sourceLines.filter(function(elem, pos) {
      return file.sourceLines.indexOf(elem) == pos;
    });
    file.generatedLines = file.generatedLines.filter(function(elem, pos) {
      return file.generatedLines.indexOf(elem) == pos;
    });

    file.ratio = file.generatedLines.length / file.sourceLines.length;

    console.log(filename + ': ' + file.ratio);
  });

  // write a stats json
  fs.writeFileSync('./sass-map-ratio.json', JSON.stringify(files, null, 4), 'utf8');
});