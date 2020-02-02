import CMS from 'netlify-cms-app'
import '../components/global.scss'

import BlogPostPreview from './preview-templates/BlogPostPreview'
import AboutPagePreview from './preview-templates/AboutPagePreview'

CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
