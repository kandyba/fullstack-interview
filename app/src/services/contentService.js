const mockContentModules = import.meta.glob('../mocks/content/**/*.json');

const toMockModulePath = (topicFilePath) => {
  if (!topicFilePath) return null;
  return `../mocks/content/${topicFilePath.replace(/\.html$/, '.json')}`;
};

const cloneContent = (content) => ({
  ...content,
  questions: Array.isArray(content.questions)
    ? content.questions.map((q) => ({ ...q }))
    : []
});

export const loadTopicContent = async (topic) => {
  if (!topic || !topic.file) return null;

  const modulePath = toMockModulePath(topic.file);
  const loader = modulePath ? mockContentModules[modulePath] : null;

  if (!loader) {
    throw new Error(`Mock content not found for topic file: ${topic.file}`);
  }

  const module = await loader();
  const baseData = cloneContent(module.default || module);

  if (topic.questionRange) {
    const [start, end] = topic.questionRange;
    baseData.questions = baseData.questions.slice(start, end).map((q, idx) => ({
      ...q,
      id: `q-${idx + 1}`
    }));
    baseData.totalQuestions = baseData.questions.length;
  }

  if (topic.title && topic.level) {
    baseData.title = `${topic.title} (${topic.level})`;
  } else if (topic.title) {
    baseData.title = topic.title;
  }

  return baseData;
};

export const searchInContent = (content = [], searchTerm = '') => {
  if (!searchTerm) return content;
  const term = searchTerm.toLowerCase();

  return content.filter((item) => {
    const questionMatch = item.question?.toLowerCase().includes(term);
    const answerMatch = item.answer?.toLowerCase().includes(term);
    return questionMatch || answerMatch;
  });
};
