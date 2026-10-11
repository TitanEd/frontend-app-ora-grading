import PropTypes from 'prop-types';
import { LmsBook } from '@openedx/paragon/icons';
import { useIntl, defineMessages } from '@edx/frontend-platform/i18n';

import messages from '../messages';
import getLearnerDashboardUrl from '../utils/getLearnerDashboardUrl';

const headerMessages = defineMessages({
  loadingTitle: {
    id: 'oraGrading.customCourseHeader.loadingTitle',
    defaultMessage: 'Loading...',
    description: 'Fallback title while course name is loading',
  },
});

const CourseHeader = (props) => {
  const intl = useIntl();
  const myCoursesLabel = intl.formatMessage(messages.sidebarMyCoursesTitle);
  const title = props.courseTitle || intl.formatMessage(headerMessages.loadingTitle);

  return (
    <div className="container-xl course-header mb-2">
      <div className="ca-breadcrumb-bg">
        <div className="ca-breadcrumb-container">
          <div className="ca-breadcrumb">
            <span
              className="ca-breadcrumb-icon"
              role="link"
              tabIndex={0}
              onClick={() => { window.location.href = getLearnerDashboardUrl('/my-courses'); }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  window.location.href = getLearnerDashboardUrl('/my-courses');
                }
              }}
            >
              <LmsBook className="custom-icon" />
              {myCoursesLabel}
            </span>
            <span className="ca-breadcrumb-divider">/</span>
            <span className="ca-breadcrumb-current">
              {title}
            </span>
          </div>
          <div className="ca-title">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;

CourseHeader.propTypes = {
  courseTitle: PropTypes.string,
};
