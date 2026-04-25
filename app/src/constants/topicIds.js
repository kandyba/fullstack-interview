export const TOPIC_IDS = {
  jsPractice: 'js-practice',
  jsCoreConceptsMain: 'js-core-concepts-main',
  jsBasicsJuniorLegacy: 'js-basics-junior',
  jsBasicsMiddleLegacy: 'js-basics-middle',
  jsSeniorBasicsLegacy: 'js-basics-senior',
  jsPatternsSenior: 'js-patterns-senior'
};

export const TOPIC_ID_MIGRATIONS = {
  [TOPIC_IDS.jsBasicsJuniorLegacy]: TOPIC_IDS.jsCoreConceptsMain,
  [TOPIC_IDS.jsBasicsMiddleLegacy]: TOPIC_IDS.jsCoreConceptsMain,
  [TOPIC_IDS.jsSeniorBasicsLegacy]: TOPIC_IDS.jsPatternsSenior
};

export const normalizeTopicId = (topicId) => {
  if (!topicId) return topicId;
  return TOPIC_ID_MIGRATIONS[topicId] || topicId;
};
