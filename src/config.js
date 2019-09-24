export default {
  dataUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api/bigcaselist' : 'https://court-list-mock-data.apps.live-1.cloud-platform.service.justice.gov.uk/api/bigcaselist'
}
