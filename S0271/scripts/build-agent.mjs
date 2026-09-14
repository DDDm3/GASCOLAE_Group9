import { readFile, writeFile } from 'node:fs/promises';
import { agent, agentDemo } from '../src/js/data/content.js';
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const markup = `
      <section class="agent-consultation" id="${agent.id}" aria-labelledby="agent-title">
        <div class="agent-layout container">
          <header class="agent-intro">
            <p class="agent-status">${escape(agentDemo.status)}</p>
            <h2 id="agent-title">${escape(agent.name)}</h2>
            <p class="agent-welcome">${escape(agentDemo.intro)}</p>
            <p class="agent-demo-notice" id="agent-demo-notice">${escape(agentDemo.notice)}</p>
            <a class="agent-escalation" href="${escape(agent.escalationCta.href)}">${escape(agent.escalationCta.label)} <span aria-hidden="true">↗</span></a>
            <p class="agent-escalation-note">${escape(agentDemo.escalationNote)}</p>
          </header>
          <div class="agent-questions" aria-describedby="agent-demo-notice">
            <h3 class="agent-questions-title">Chọn câu hỏi để xem nội dung tham khảo</h3>
${agent.suggestedQuestions.map((question, index) => {
  const response = agentDemo.responses[question.id];
  if (!response) throw new Error(`Missing demo response: ${question.id}`);
  return `            <details class="agent-question" id="agent-question-${question.id}">
              <summary id="agent-summary-${question.id}" aria-controls="agent-answer-${question.id}">
                <span class="agent-question-number" aria-hidden="true">0${index + 1}</span>
                <span>${escape(question.text)}</span>
                <span class="agent-question-toggle" aria-hidden="true"></span>
              </summary>
              <div class="agent-answer" id="agent-answer-${question.id}" role="region" aria-labelledby="agent-summary-${question.id}">
                <p class="agent-answer-label">${escape(agentDemo.responseLabel)}</p>
${response.items.length ? `                <ul>${response.items.map(item => `<li>${escape(item)}</li>`).join('')}</ul>` : ''}
${response.paragraphs.map(paragraph => `                <p>${escape(paragraph)}</p>`).join('\n')}
              </div>
            </details>`;
}).join('\n')}
          </div>
        </div>
      </section>
      `;
const target = new URL('../src/index.html', import.meta.url);
const html = await readFile(target, 'utf8');
const marker = /(?<=<!-- agent:start -->)[\s\S]*?(?=<!-- agent:end -->)/;
if (!marker.test(html)) throw new Error('Agent markers missing');
const next = html.replace(marker, markup);
if (process.argv.includes('--check')) {
  if (html !== next) throw new Error('Agent markup is stale');
  console.log('Agent markup matches data.');
} else { await writeFile(target, next, 'utf8'); console.log('Agent generated.'); }
