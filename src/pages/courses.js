import React from "react"
import { Link,  StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CourseItem from "../components/CourseItem"

class CoursePage extends React.Component {

  render() {
    const { data } = this.props

    const { edges: posts } = data.allMarkdownRemark
    
    return (
      <div>
      <Layout>
      <SEO title="Courses Page" />
      <h1>Courses Page</h1>

      <div style={{display:'flex', justifyContent:'space-evenly', flexWrap:'wrap'}}>
      {posts && (posts
          .map(({ node: post }) => (
           
            <CourseItem
              key={post.id}
              post={post.frontmatter}
              image={post.frontmatter.image.childImageSharp.fluid.src}
              style={{marginRight:10, width:'50%'}}
              slug={post.fields.slug}
              excerpt={post.excerpt}
            >
            </CourseItem>
   
          )))}

      </div>
       
          </Layout>
          </div>
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
    query CoursePageQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        filter: { frontmatter: { templateKey: { eq: "single-course" } }}
      ) {
        edges {
          node {
            excerpt(pruneLength: 100)
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
      <CoursePage data={data} />
    )}
  />
)