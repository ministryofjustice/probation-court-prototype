import config from '../config'

const getCaseData = async () => {
  const response = await fetch(process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/api/bigcaselist' : config.dataUrl)
  return await response.json()
}

function notInString ($title, $string) {
  return $title.toLowerCase().indexOf($string) === -1
}

function fixNameCase ($name) {
  return $name.toLowerCase().replace('miss ', '').replace('mrs ', '').replace('mr ', '').split(' ').map(item => { return item.charAt(0).toUpperCase() + item.slice(1) }).join(' ')
}

const configureCaseData = $data => {
  let cases = []
  let unmatched = []
  $data.sessions.forEach($session => {
    $session.blocks.forEach($block => {
      $block.cases.forEach($case => {

        $case = {
          ...$case,
          courtRoom: parseInt($session.courtRoom, 10),
          startTime: $block.startTime,
          endTime: $block.endTime,
          noMatch: $case.defendant.deliusStatus === 'NO_MATCH'
        }

        $case.defendant = { ...$case.defendant, name: fixNameCase($case.defendant.name) }

        if ($case.noMatch) {
          unmatched.push($case)
        } else if ($case.offences.some(item => { return notInString(item.title, 'speed') && notInString(item.title, 'non-payment') && notInString(item.title, 'television') })) {
          cases.push($case)
        }
      })
    })
  })
  return { courtName: $data.courtName, cases: cases, unmatched: unmatched }
}

export {
  getCaseData,
  configureCaseData
}
