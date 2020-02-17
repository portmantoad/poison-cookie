import CMS from 'netlify-cms-app'
import '../components/global.scss'

import BlogPostPreview from './preview-templates/BlogPostPreview'
import AboutPagePreview from './preview-templates/AboutPagePreview'

CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)

CMS.registerEditorComponent({
  id: "youtube",
  label: "YouTube",
  fields: [{name: 'id', label: 'YouTube Video ID', widget: 'string'}],
  pattern: /`youtube: (\S+)`/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      id: match[1]
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return '`youtube: ' + obj.id + '`';
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      '<img src="http://img.youtube.com/vi/' + obj.id + '/0.jpg" alt="Youtube Video"/>'
    );
  }
});
