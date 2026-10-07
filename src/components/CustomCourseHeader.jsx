import PropTypes from 'prop-types';

import { LmsBook } from '@openedx/paragon/icons';

// const {
//   title,
// } = useModel('courseHomeMeta', courseId);

const CourseHeader = (props) => (
  <div className="container-xl course-header mb-2">
    <div className="ca-breadcrumb-bg">
      <div className="ca-breadcrumb-container">
        <div className="ca-breadcrumb">
          <span className="ca-breadcrumb-icon">
            <LmsBook className="custom-icon" />
            My Courses
          </span>
          <span className="ca-breadcrumb-divider">/</span>
          <span className="ca-breadcrumb-current">
            {props.courseTitle || 'Loading...'}
          </span>
        </div>
        <div className="ca-title">{props.courseTitle || 'Loading...'}</div>
      </div>
    </div>
  </div>
);

export default CourseHeader;

CourseHeader.propTypes = {
  courseTitle: PropTypes.string,
};
