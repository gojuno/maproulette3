import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { WidgetDataTarget, registerWidgetType }
       from '../../../../../services/Widget/Widget'
import { extendedFind } from '../../../../../services/Challenge/Challenge'
import WithSearchResults
       from '../../../../HOCs/WithSearchResults/WithSearchResults'
import WithSearch from '../../../../HOCs/WithSearch/WithSearch'
import SearchBox from '../../../../SearchBox/SearchBox'
import ChallengeList from '../../ChallengeList/ChallengeList'
import QuickWidget from '../../../../QuickWidget/QuickWidget'
import messages from './Messages'
import './ChallengeListWidget.scss'

const descriptor = {
  widgetKey: 'ChallengeListWidget',
  label: messages.label,
  targets: [WidgetDataTarget.challenges],
  minWidth: 3,
  defaultWidth: 12,
  defaultHeight: 15,
  defaultConfiguration: {
    view: 'list',
    sortBy: ['name'],
  },
}

// Setup child components with needed HOCs.
const ChallengeSearch = WithSearch(
  SearchBox,
  'challengeListWidget',
  searchCriteria =>
    extendedFind({searchQuery: searchCriteria.query, onlyEnabled: false}, 1000),
)

export default class ChallengeListWidget extends Component {
  render() {
    const searchControl = this.props.projects.length === 0 ? null : (
      <ChallengeSearch className="mr-p-2 mr-text-grey-light mr-border mr-border-grey-light mr-rounded-sm"
                       inputClassName="mr-text-grey mr-leading-normal"
                       placeholder={this.props.intl.formatMessage(messages.searchPlaceholder)} />
    )

    return (
      <QuickWidget {...this.props}
                  className="challenge-list-widget"
                  widgetTitle={<FormattedMessage {...messages.title} />}
                  rightHeaderControls={searchControl}>
        <ChallengeList {...this.props}
                       challenges={this.props.challenges} />
      </QuickWidget>
    )
  }
}

ChallengeListWidget.propTypes = {
  widgetConfiguration: PropTypes.object,
  updateWidgetConfiguration: PropTypes.func.isRequired,
}

const Widget = WithSearchResults(
  injectIntl(ChallengeListWidget),
  'challengeListWidget',
  'challenges',
  'challenges'
)

registerWidgetType(Widget, descriptor)