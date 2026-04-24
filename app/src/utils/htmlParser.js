// Утиліта для парсингу HTML файлів у структуровані дані
export const parseHTMLContent = async (filePath) => {
  try {
    const response = await fetch(`/${filePath}`);
    const text = await response.text();
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    
    const questions = [];
    const questionElements = doc.querySelectorAll('.question');
    
    questionElements.forEach((questionEl) => {
      let questionText = questionEl.textContent.trim();
      // Remove leading numbering like "1. ", "2. ", "123. " or "1) ", "2) ", "123) "
      questionText = questionText.replace(/^\d+[.)]\s*/, '');
      
      let answerEl = questionEl.nextElementSibling;
      let answerHTML = '';
      
      while (answerEl && !answerEl.classList.contains('question')) {
        if (answerEl.classList.contains('answer')) {
          answerHTML += answerEl.innerHTML;
        }
        answerEl = answerEl.nextElementSibling;
        
        if (answerEl && answerEl.classList.contains('follow-up')) {
          break;
        }
      }
      
      const isFollowUp = questionEl.classList.contains('follow-up') || 
                         questionText.toLowerCase().includes('follow-up');
      
      questions.push({
        id: `q-${questions.length + 1}`,
        question: questionText,
        answer: answerHTML,
        isFollowUp
      });
    });
    
    const title = doc.querySelector('title')?.textContent || 'Без назви';
    
    return {
      title,
      questions,
      totalQuestions: questions.length
    };
  } catch (error) {
    console.error('Помилка парсингу HTML:', error);
    return {
      title: 'Помилка',
      questions: [],
      totalQuestions: 0,
      error: error.message
    };
  }
};

export const searchInContent = (content, searchTerm) => {
  if (!searchTerm) return content;
  
  const term = searchTerm.toLowerCase();
  
  return content.filter(item => {
    const questionMatch = item.question.toLowerCase().includes(term);
    const answerMatch = item.answer.toLowerCase().includes(term);
    return questionMatch || answerMatch;
  });
};

export const highlightText = (text, searchTerm) => {
  if (!searchTerm) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark class="highlight">$1</mark>');
};
