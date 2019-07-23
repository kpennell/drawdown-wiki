import React from "react"
import { Link,  StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogItem from "../components/BlogItem"

class BlogPage extends React.Component {

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    
    return (
  
      <Layout>
      <SEO title="Blog" />
      <h1>Blog Page</h1>
      <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
      {posts && (posts
          .map(({ node: post }) => (
           
            <BlogItem
              key={post.id}
              post={post.frontmatter}
              image={post.frontmatter.image.childImageSharp.fluid.src}
              style={{marginRight:10, width:'50%'}}
              slug= {post.fields.slug}
              date={post.frontmatter.date}
            >
            </BlogItem>
   
          )))}

      </div>

      </Layout>
          
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
    query BlogPageQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        filter: { frontmatter: { templateKey: { eq: "single-blog" } }}
      ) {
        edges {
          node {
            excerpt(pruneLength: 40)
            id
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
              date(formatString: "MMMM DD, YYYY")
              image {
                childImageSharp {
                  fluid(maxWidth: 1400, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
    `}
    render={(data) => (
      <BlogPage data={data} />
    )}
  />
)