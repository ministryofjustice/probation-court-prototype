import React from 'react'

export default {
  dataUrl: '_self' in React.createElement('div') ? 'http://localhost:8080/api/bigcaselist' : 'https://court-list-mock-data.apps.live-1.cloud-platform.service.justice.gov.uk/api/bigcaselist'
}
