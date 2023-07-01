// const file_block = {
//   label: 'File',
//   id: 'file',
//   // Preview output for this component. Can either be a string or a React component
//   // (component gives better render performance)
//   toPreview: ({ file, title }, getAsset, fields) => {
//     const fileField = fields?.find(f => f.get('widget') === 'file');
//     const src = getAsset(file, fileField);
//     return h('a', {href: src || ''}, 'Click to Download');
//   },
//   // Regex pattern used to search for instances of this block in the markdown document.
//   // Patterns are run in a multline environment (against the entire markdown document),
//   // and so generally should make use of the multiline flag (`m`). If you need to capture
//   // newlines in your capturing groups, you can either use something like
//   // `([\S\s]*)`, or you can additionally enable the "dot all" flag (`s`),
//   // which will cause `(.*)` to match newlines as well.
//   //
//   // Additionally, it's recommended that you use non-greedy capturing groups (e.g.
//   // `(.*?)` vs `(.*)`), especially if matching against newline characters.
//   pattern: /^\[Click to Download\]\((.*?)(\s"(.*)")?\)$/,
//   // Given a RegExp Match object
//   // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#return_value),
//   // return an object with one property for each field defined in `fields`.
//   //
//   // This is used to populate the custom widget in the markdown editor in the CMS.
//   fromBlock: match =>
//     match && {
//       image: match[2],
//       alt: match[1],
//       title: match[4],
//     },
//   // Given an object with one property for each field defined in `fields`,
//   // return the string you wish to be inserted into your markdown.
//   //
//   // This is used to serialize the data from the custom widget to the
//   // markdown document
//   toBlock: ({ file, title }) =>
//   `[Click to Download](${file || ''}${title ? ` "${title.replace(/"/g, '\\"')}"` : ''})`,
//   // Fields the user need to fill out when adding an instance of the component
//   fields: [
//     {
//       label: 'File',
//       name: 'file',
//       widget: 'file',
//       media_library: {
//         allow_multiple: false,
//       },
//     },
//   ],
// };
// CMS.registerEditorComponent(file_block);

CMS.registerPreviewStyle("/styles.css");
var stdPreview = createClass({
  render: function() {
    var entry = this.props.entry;
    return h('div', {},
      h('header', {className: 'navbar navbar-inverse navbar-fixed-top', id:'header'}, 
        h('a', {className: 'navbar-brand brand' }, 'Field Days Preview')),
      // h('h1', {}, entry.getIn(['data', 'title'])),
      h('div', { className: 'container', id: 'container'},
        h('div', { className: "fixed-width markdown-content"}, this.props.widgetFor('body'))
      )
    );
  }
});

CMS.registerPreviewTemplate("exhibits", stdPreview);
CMS.registerPreviewTemplate("pages", stdPreview);
CMS.registerPreviewTemplate("dedication", stdPreview);
CMS.registerPreviewTemplate("weddings", stdPreview);
CMS.registerPreviewTemplate("pug", stdPreview);
CMS.registerPreviewTemplate("board", stdPreview);
CMS.registerPreviewTemplate("rules", stdPreview);

// codeComponent = CMS.getEditorComponents()._root.entries[1]
var PugPreview = createClass({
  render: function() {
  var html;
    try {
      console.log(this.props)
      html = pug.render(this.props.value)
      console.log(html);
      return h('div', {
        dangerouslySetInnerHTML: {__html: html}
      });
    }
    catch(err) {
      console.log(err);
      var err_message = JSON.stringify(err, null, 2);
      return h('pre', {
        dangerouslySetInnerHTML: {__html: err_message},
      })
    }
    
  }
});

// CMS.registerWidget('pug', PugControl, PugPreview);
CMS.registerWidget('pug', 'code', PugPreview);
CMS.getWidget('pug').codeMirrorConfig = {
  mode: 'pug',
  theme: 'default',
};
console.log('CMS ready');