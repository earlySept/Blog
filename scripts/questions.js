'use strict';

const fs = require('fs');
const path = require('path');
const frontMatter = require('hexo-front-matter');

const STATUS_ORDER = ['thinking', 'researching', 'answered'];
const STATUS_LABELS = {
  thinking: 'Thinking',
  researching: 'Researching',
  answered: 'Answered'
};

const QUESTION_DIR = path.join(hexo.source_dir, '_questions');
const TEMPLATE_DIR = path.join(hexo.base_dir, 'layout');

function toArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function normalizeStatus(status) {
  const normalized = String(status || 'thinking').toLowerCase();
  return STATUS_LABELS[normalized] ? normalized : 'thinking';
}

function normalizeDate(value) {
  if (!value) return new Date();
  if (value instanceof Date) return value;
  return new Date(value);
}

function getPosts(posts) {
  if (!posts) return [];
  if (typeof posts.toArray === 'function') return posts.toArray();
  return Array.isArray(posts) ? posts : [];
}

function getPostQuestionIds(post) {
  return toArray(post.questions || post.question)
    .map(item => String(item).trim())
    .filter(Boolean);
}

function resolveArticle(question, posts) {
  const linkedPost = getPosts(posts).find(post => getPostQuestionIds(post).includes(question.id));
  if (linkedPost) {
    return {
      title: linkedPost.title,
      path: linkedPost.path
    };
  }

  if (!question.article) return null;
  return {
    title: question.article_title || question.article,
    path: question.article
  };
}

function collectQuestions(posts) {
  if (!fs.existsSync(QUESTION_DIR)) return [];

  return fs.readdirSync(QUESTION_DIR)
    .filter(file => path.extname(file).toLowerCase() === '.md')
    .map(file => {
      const source = path.join(QUESTION_DIR, file);
      const parsed = frontMatter.parse(fs.readFileSync(source, 'utf8'));
      const id = String(parsed.id || path.basename(file, '.md')).trim();
      const status = normalizeStatus(parsed.status);
      const question = {
        id,
        title: parsed.title || id,
        date: normalizeDate(parsed.date),
        status,
        statusLabel: STATUS_LABELS[status],
        tags: toArray(parsed.tags).filter(Boolean),
        article: parsed.article,
        article_title: parsed.article_title,
        content: parsed._content || '',
        path: `questions/${id}/`,
        source
      };

      question.articleInfo = resolveArticle(question, posts);
      return question;
    })
    .sort((a, b) => b.date - a.date);
}

function groupedQuestions(questions) {
  return STATUS_ORDER.reduce((groups, status) => {
    groups[status] = questions.filter(question => question.status === status);
    return groups;
  }, {});
}

function registerProjectView(name) {
  const file = path.join(TEMPLATE_DIR, `${name}.ejs`);
  if (fs.existsSync(file)) {
    hexo.theme.setView(`${name}.ejs`, fs.readFileSync(file, 'utf8'));
  }
}

hexo.extend.helper.register('all_questions', function() {
  return collectQuestions(this.site && this.site.posts);
});

hexo.extend.helper.register('recent_questions', function(limit) {
  return collectQuestions(this.site && this.site.posts).slice(0, limit || 3);
});

hexo.extend.helper.register('questions_by_status', function(questions) {
  return groupedQuestions(questions || collectQuestions(this.site && this.site.posts));
});

hexo.extend.helper.register('related_questions', function(page) {
  const ids = getPostQuestionIds(page);
  if (!ids.length) return [];
  return collectQuestions(this.site && this.site.posts).filter(question => ids.includes(question.id));
});

hexo.extend.helper.register('question_status_label', function(status) {
  return STATUS_LABELS[normalizeStatus(status)];
});

hexo.extend.filter.register('theme_inject', function(injects) {
  injects.postMarkdownBegin.file('question-source', path.join(TEMPLATE_DIR, '_partials/question-source.ejs'), {}, {}, 1);
});

hexo.extend.filter.register('before_generate', function() {
  registerProjectView('index');
  registerProjectView('questions');
  registerProjectView('question');
});

hexo.extend.generator.register('questions', async function(locals) {
  const questions = collectQuestions(locals.posts);
  const routes = [{
    path: 'questions/index.html',
    layout: 'questions',
    data: {
      title: 'Thoughts',
      subtitle: '问题、想法、随笔，以及暂时还没写成文章的东西。',
      questions,
      groups: groupedQuestions(questions)
    }
  }];

  for (const question of questions) {
    const content = await this.render.render({
      text: question.content,
      engine: 'markdown'
    });

    routes.push({
      path: `${question.path}index.html`,
      layout: 'question',
      data: {
        title: question.title,
        subtitle: question.statusLabel,
        question: {
          ...question,
          renderedContent: content
        }
      }
    });
  }

  return routes;
});
