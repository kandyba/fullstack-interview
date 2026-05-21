export const TOPIC_IDS = {
  jsPractice: 'js-practice',
  jsMain: 'js-main',
  jsCoreConceptsMain: 'js-core-concepts-main',
  jsAdvancedMain: 'js-advanced-main',
  jsBasicsJuniorLegacy: 'js-basics-junior',
  jsBasicsMiddleLegacy: 'js-basics-middle',
  jsSeniorBasicsLegacy: 'js-basics-senior',
  jsAdvancedMiddleLegacy: 'js-advanced-middle',
  jsAdvancedSeniorLegacy: 'js-advanced-senior',
  reactMain: 'react-main',
  reactJuniorLegacy: 'react-junior',
  reactMiddleLegacy: 'react-middle',
  reactSeniorLegacy: 'react-senior'
};

export const TOPIC_ID_MIGRATIONS = {
  [TOPIC_IDS.jsBasicsJuniorLegacy]: TOPIC_IDS.jsMain,
  [TOPIC_IDS.jsBasicsMiddleLegacy]: TOPIC_IDS.jsMain,
  [TOPIC_IDS.jsSeniorBasicsLegacy]: TOPIC_IDS.jsMain,
  [TOPIC_IDS.jsCoreConceptsMain]: TOPIC_IDS.jsMain,
  [TOPIC_IDS.jsAdvancedMain]: TOPIC_IDS.jsMain,
  [TOPIC_IDS.jsAdvancedMiddleLegacy]: TOPIC_IDS.jsMain,
  [TOPIC_IDS.jsAdvancedSeniorLegacy]: TOPIC_IDS.jsMain,
  [TOPIC_IDS.reactJuniorLegacy]: TOPIC_IDS.reactMain,
  [TOPIC_IDS.reactMiddleLegacy]: TOPIC_IDS.reactMain,
  [TOPIC_IDS.reactSeniorLegacy]: TOPIC_IDS.reactMain
};

export const normalizeTopicId = (topicId) => {
  if (!topicId) return topicId;
  return TOPIC_ID_MIGRATIONS[topicId] || topicId;
};
