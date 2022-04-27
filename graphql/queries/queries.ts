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
      isEnrolled
      units {
        name
        content
        videoId
      }
    }
  }
  `;

export const MY_COURSES = gql`
  query {
    myCourses {
        id
        name
        creator {
          name
        }
      }
    }
`;

export const EXMATRICUALTE_FROM_COURSE = gql`
  mutation Exmatriculate($courseId: String!) {
    removeParticipantFromCourse(courseId: $courseId) {
      id
    }
}
`;

export const ENROLL_TO_COURSE = gql`
  mutation Enroll($courseId: String!) {
    addParticipantToCourse(courseId: $courseId) {
      id
    }
}
`;
