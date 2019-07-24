import React from "react"
import { Link,  StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogItem from "../components/BlogItem"

class AllSolutionsPage extends React.Component {

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    
    return (
  
      <Layout>
      <SEO title="Solutions" />
      <h1>All Solutions</h1>
      <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
      {posts && (posts
          .map(({ node: post }) => (
           
            <BlogItem
              key={post.id}
              post={post.frontmatter}
              style={{marginRight:10, width:'50%'}}
              slug={post.fields.slug}
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
    query AllSolutionsPageQuery {
      allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___rank] },
        filter: { frontmatter: { templateKey: { eq: "single-solution" } }}
      ) {
        edges {
          node {
            excerpt(pruneLength: 40)
            id
            fields {
              slug
            }
            frontmatter {
              solution
              templateKey
              rank  
              sector
    
              net_cost_billions
              url   
            }
          }
        }
      }
    }
    `}
    render={(data) => (
      <AllSolutionsPage data={data} />
    )}
  />
)