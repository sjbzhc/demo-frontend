import { gql } from '@apollo/client';

export const ALL_COURSES_QUERY = gql`
    query {
      allCourses {
        id
        name
        creator {
          name
        }
      }
    }
  `;

export const COURSE_BY_ID = gql`
  query Course($courseId: String!) {
    course(courseId: $courseId) {
      name
      description
    }
  }
  `;
