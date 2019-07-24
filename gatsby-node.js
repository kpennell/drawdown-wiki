const path = require(`path`)
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

// exports.sourceNodes = ({ actions }) => {
//   const { createTypes } = actions

//   createTypes(`
//     type MarkdownRemark implements Node {
//       tag: String!
//       slug: String!
//       templateKey: String!
//       rank: Int!
//       solution: String!
//       sector: String!
//       co2_reduction_gt: String!
//       net_cost_billions: String!
//       url: String!
//     }
//   `)
// }



exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MarkdownRemarkFrontmatter @infer {
      co2_reduction_gt: String
      
    }

    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }
  `)
}


exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
        
              templateKey    
              rank
              solution
              sector
              net_cost_billions
              co2_reduction_gt
              url
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }


    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id
        },
      })
    })
  })
}

  exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions
    
    fmImagesToRelative(node)
  
    if (node.internal.type === `MarkdownRemark`) {
      const value = createFilePath({ node, getNode, basePath: `pages` })
      createNodeField({
        name: `slug`,
        node,
        value,
      })
    }
  } 
