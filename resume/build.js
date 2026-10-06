const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, AlignmentType,
  LevelFormat, BorderStyle,
} = require('docx');

const path = require('path');
const { execFileSync } = require('child_process');
const OUT = path.join(__dirname, '..', 'assets');
const SITE = 'https://tyson1403.github.io/';
const GITHUB = 'https://github.com/tyson1403';
const LINKEDIN = 'https://www.linkedin.com/in/tyson-paul-140325mar/';
const ATSQA = 'https://atsqa.org/certified-testers/profile/1e07465f069949dcb4274cc13da0194b';
const PLATFORM = 'https://github.com/tyson1403/playwright-automation-platform';

// Text runs: plain strings, or [text, url] for links.
const R = {
  name: 'Tyson Paul',
  title: 'Senior QA Automation Engineer | SDET',
  contact: 'Dubai, UAE | Available Immediately | +971 58 636 8389 | tysonpaul09@gmail.com',
  links: [
    ['Portfolio: tyson1403.github.io', SITE],
    ['GitHub: github.com/tyson1403', GITHUB],
    ['LinkedIn: tyson-paul-140325mar', LINKEDIN],
  ],
  credLine: 'ISTQB CT-AI | ISTQB Agile Tester | ISTQB CTFL | AT*SQA Test Automation | M. Eng. Management, RMIT University',
  summary: [
    'Senior QA Automation Engineer and SDET with 7+ years of experience building UI and API automation for enterprise applications. At LiSEC Automation, built the Cypress and ReadyAPI frameworks from scratch, architected the Playwright/TypeScript framework now standard for new projects, led the Cypress-to-Playwright migration and grew automated regression coverage from 30% to 90%.',
    'Strong in CI/CD integration, OAuth2/JWT testing, SQL data validation and flaky-test reduction. Applies AI-assisted testing in daily work, including custom QA agents, Playwright MCP and GitHub Copilot adoption that cut test-case drafting time by about 55%.',
  ],
  skills: [
    ['Test automation', 'Playwright, Cypress, WebdriverIO, Selenium WebDriver'],
    ['API and auth testing', 'ReadyAPI, Playwright API testing, REST, OAuth2, JWT, JSON Schema validation'],
    ['Performance and accessibility', 'k6 (load, stress, spike, SLO thresholds), axe-core (WCAG 2.1 AA)'],
    ['Data validation', 'SQL, database and test-data verification'],
    ['Languages', 'TypeScript, JavaScript, Python'],
    ['CI/CD and tooling', 'Git, GitHub Actions, Jenkins, Docker'],
    ['Test management', 'Jira, Xray'],
    ['AI in testing', 'GitHub Copilot, Playwright MCP, custom QA agents, reusable AI skills, AI-assisted test migration'],
    ['Practices', 'Agile/Scrum, shift-left testing, test strategy, data-driven and regression testing, UAT, defect triage, quality metrics, mentoring'],
  ],
  certHeading: ['Certifications'],
  certs: [
    'ISTQB Certified Tester, AI Testing (CT-AI), July 2026',
    'AT*SQA Test Automation micro-credential, July 2026',
    'ISTQB Certified Tester, Agile Tester, November 2025',
    'ISTQB Certified Tester, Foundation Level (CTFL), December 2024',
  ],
  jobs: [
    {
      role: 'Senior QA Automation Engineer, LiSEC Automation LLC',
      meta: 'Dubai, UAE | March 2022 to Present',
      products: 'Production Planning, Order Management (Order Editor), User Management, Customer Management',
      groups: [
        ['Automation frameworks', [
          'Built the company’s first UI (Cypress) and API (ReadyAPI) automation frameworks from scratch, moving the team from manual testing to automation.',
          'Architected a reusable Playwright/TypeScript framework for UI and API testing with shared fixtures, test-data utilities, environment configuration and CI/CD execution; established it as the standard for new projects, including Production Planning and Order Management.',
          'Led the controlled migration of a 600+ test Cypress project to Playwright using an AI-assisted migration agent and Playwright MCP, working in validated batches with human review and existing quality gates, then retired Cypress and the split plugin.',
        ]],
        ['Test coverage and reliability', [
          'Grew automated regression coverage from 30% to 90% across five product areas (User, Customer, Order, Production, Delivery) with the first 500+ UI tests, placing each test at the right layer to avoid redundant coverage.',
          'Cut Cypress regression time from 90 to 55 minutes through parallel runs with cypress-split and reusable utilities.',
          'Fixed flaky UI and API tests by moving to dynamic Python-generated test data, giving stable CI/CD runs with fewer retries, and wrote Python scripts for log parsing and environment setup that removed 4+ hours of manual configuration per sprint.',
          'Owned OAuth2 and JWT authentication testing for the Core platform library with request/response and JSON Schema validation, and verified data end to end across UI, API and database layers using SQL.',
        ]],
        ['AI-assisted testing', [
          'Cut test-case drafting time by about 55% by introducing GitHub Copilot to the QA team with prompt training and reusable AI-assisted QA workflows, and built AI agents and reusable skills that help testers and developers work faster.',
        ]],
        ['Collaboration and leadership', [
          'QA engineer in one of four cross-functional teams (5 to 6 developers each) and primary QA contact across multiple parallel value streams through two-week sprints and major releases, with zero critical defect escapes to production in 12+ consecutive releases.',
          'Cut new-tester ramp-up time by about 70% by setting up quality metrics, onboarding templates and training.',
          'Joined planning sessions with developers and identified 40+ missing scenarios before development, preventing late-cycle P1 defects.',
        ]],
      ],
    },
    {
      role: 'Software Test Engineer (Automation Focus), WebReinvent Technologies Pvt. Ltd.',
      meta: 'Delhi, India | July 2021 to March 2022',
      groups: [[null, [
        'Built WebdriverIO regression suites with API checks across three client platforms (e-commerce, SaaS, and talent acquisition for speakers and actors), reaching 85% automated coverage in under 6 months.',
        'Cut flaky test failures by 60% by reworking element locators, adding smart waits and cleaning up test data.',
        'Set QA standards adopted across 3 engineering teams through shared utilities and a common test-writing approach, cutting new test creation time by 40%.',
        'Wrote Python scripts for test-data seeding and report parsing, cutting regression feedback time from 45 to 12 minutes.',
      ]]],
    },
    {
      role: 'Higher Education & Career Development',
      meta: 'Melbourne, Australia & India | September 2015 to June 2021',
      text: 'Moved to Melbourne in September 2015 and completed a Master of Engineering Management at RMIT University (2016 to 2018). Then built testing and automation skills through self-directed study, remaining in Australia through 2020 and 2021 because of COVID-19 travel restrictions, before returning to India and full-time QA work in July 2021.',
    },
    {
      role: 'Software Test Engineer, Credence Systems Pvt. Ltd.',
      meta: 'Delhi, India | August 2013 to September 2015',
      groups: [[null, [
        'Designed and ran 200+ test cases across 4 software modules, including e-commerce websites; structured defect triage and root-cause analysis contributed to a 25% drop in post-release defects.',
        'Wrote the team’s first Selenium WebDriver scripts, cutting manual regression testing time by 35%.',
        'Took part in sprint planning and retrospectives, improving estimation accuracy by 20% through data-driven test-effort forecasting.',
      ]]],
    },
  ],
  personal: [
    [['SkyLane Air: Playwright + k6 test automation', 'https://github.com/tyson1403/playwright-k6-docker-ci-boilerplate'], ' (in progress): a demo airline booking app with around 100 Playwright API, UI, hybrid and accessibility (axe-core) tests using page objects and custom fixtures, five k6 scenarios (smoke, load, stress, spike, oversell) with p95 SLO thresholds, Docker Compose, and GitHub Actions CI with nightly performance runs.'],
    [['Playwright Automation Platform', PLATFORM],' (in progress): a reusable TypeScript package that centralises Playwright versioning and a shared config factory for consuming projects, distributed through versioned git tags, with CI on GitHub Actions.'],
  ],
  edu: [
    'Master of Engineering Management, RMIT University, Melbourne, Australia (December 2018)',
    'Bachelor of Engineering, Electronics & Communication, Oriental Institute of Science & Technology, Jabalpur, India (June 2013)',
  ],
};

/* ---------- DOCX ---------- */
const BLUE = '2F5597', DARK = '1F3864', FONT = 'Calibri';
const t = (text, o = {}) => new TextRun({ text, font: FONT, size: 20, ...o });
const link = (text, url, o = {}) => new ExternalHyperlink({ link: url, children: [new TextRun({ text, font: FONT, size: 20, color: '0563C1', underline: {}, ...o })] });
const runs = (parts, o = {}) => parts.map((p) => (Array.isArray(p) ? link(p[0], p[1], o) : t(p, o)));
const heading = (children) => new Paragraph({
  spacing: { before: 160, after: 60 }, keepNext: true,
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'B4C3E0', space: 2 } },
  children,
});
const H = (txt) => heading([t(txt, { bold: true, color: BLUE, size: 22 })]);
const bullet = (children) => new Paragraph({ numbering: { reference: 'b', level: 0 }, spacing: { after: 20 }, children });

const body = [];
body.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children: [t(R.name, { bold: true, size: 44, color: DARK })] }));
body.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 30 }, children: [t(R.title, { bold: true, size: 25, color: BLUE })] }));
body.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children: [t(R.contact, { size: 19 })] }));
const lk = [];
R.links.forEach(([x, u], i) => { if (i) lk.push(t('  |  ', { size: 19 })); lk.push(link(x, u, { size: 19 })); });
body.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children: lk }));
body.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [t(R.credLine, { size: 19 })] }));

body.push(H('Professional Summary'));
R.summary.forEach((s) => body.push(new Paragraph({ spacing: { after: 60 }, children: [t(s)] })));
body.push(H('Skills'));
R.skills.forEach(([k, v]) => body.push(bullet([t(k + ': ', { bold: true }), t(v)])));
body.push(heading(runs(R.certHeading, { bold: true, color: BLUE, size: 22 })));
R.certs.forEach((c) => body.push(bullet([t(c)])));
body.push(H('Experience'));
R.jobs.forEach((j) => {
  body.push(new Paragraph({ spacing: { before: 90, after: 0 }, keepNext: true, children: [t(j.role, { bold: true, size: 21 })] }));
  body.push(new Paragraph({ spacing: { after: j.products || j.text ? 0 : 30 }, keepNext: true, children: [t(j.meta, { italics: true })] }));
  if (j.products) body.push(new Paragraph({ spacing: { after: 30 }, keepNext: true, children: [t('Products: ', { bold: true }), t(j.products)] }));
  if (j.text) body.push(new Paragraph({ spacing: { before: 20, after: 30 }, children: [t(j.text)] }));
  (j.groups || []).forEach(([g, items]) => {
    if (g) body.push(new Paragraph({ spacing: { before: 50, after: 10 }, keepNext: true, children: [t(g, { bold: true, color: BLUE, size: 19 })] }));
    items.forEach((b) => body.push(bullet([t(b)])));
  });
});
body.push(H('Personal Projects'));
R.personal.forEach((p) => body.push(bullet(runs(p))));
body.push(H('Education'));
R.edu.forEach((e) => body.push(bullet([t(e)])));

const doc = new Document({
  creator: 'Tyson Paul', title: 'Tyson Paul – Resume',
  numbering: { config: [{ reference: 'b', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 220 } } } }] }] },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 700, bottom: 650, left: 850, right: 850 } } }, children: body }],
});
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(OUT + '/Tyson-Paul-Resume.docx', buf); console.log('docx ok'); });

/* ---------- HTML (for PDF) ---------- */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const a = (txt, u) => `<a href="${u}">${esc(txt)}</a>`;
const hruns = (parts) => parts.map((p) => (Array.isArray(p) ? a(p[0], p[1]) : esc(p))).join('');
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Tyson Paul – Resume</title>
<style>
@page{size:A4;margin:11mm 14mm 10mm}
*{box-sizing:border-box}
body{font-family:Calibri,Carlito,Arial,sans-serif;font-size:9.8pt;line-height:1.3;color:#111;margin:0}
h1{font-size:22pt;color:#${DARK};text-align:center;margin:0}
.t{font-size:12.5pt;font-weight:700;color:#${BLUE};text-align:center;margin:1px 0 2px}
.c{text-align:center;font-size:9.4pt}
a{color:#0563C1;text-decoration:none}
h2{font-size:11pt;color:#${BLUE};margin:9px 0 4px;padding-bottom:1px;border-bottom:1px solid #B4C3E0;break-after:avoid}
h2 a{color:inherit;font-weight:400;font-size:9.6pt}
p{margin:0 0 4px}
ul{margin:0;padding-left:15px}
li{margin:0 0 1.5px;orphans:2;widows:2}
.job{margin-top:6px}
.job h3{font-size:10.3pt;margin:0;break-after:avoid}
.meta{font-style:italic;margin:0 0 1px;break-after:avoid}
.g{font-weight:700;color:#${BLUE};font-size:9.6pt;margin:4px 0 1px;break-after:avoid}
</style></head><body>
<h1>${R.name}</h1><div class="t">${R.title}</div>
<div class="c">${esc(R.contact)}</div>
<div class="c">${R.links.map(([x, u]) => a(x, u)).join(' &nbsp;|&nbsp; ')}</div>
<div class="c">${esc(R.credLine)}</div>
<h2>Professional Summary</h2>${R.summary.map((s) => `<p>${esc(s)}</p>`).join('')}
<h2>Skills</h2><ul>${R.skills.map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join('')}</ul>
<h2>${hruns(R.certHeading)}</h2><ul>${R.certs.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
<h2>Experience</h2>${R.jobs.map((j) => `<div class="job"><h3>${esc(j.role)}</h3><p class="meta">${esc(j.meta)}</p>${j.products ? `<p><b>Products:</b> ${esc(j.products)}</p>` : ''}${j.text ? `<p>${esc(j.text)}</p>` : ''}${(j.groups || []).map(([g, items]) => `${g ? `<p class="g">${esc(g)}</p>` : ''}<ul>${items.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`).join('')}</div>`).join('')}
<h2>Personal Projects</h2><ul>${R.personal.map((p) => `<li>${hruns(p)}</li>`).join('')}</ul>
<h2>Education</h2><ul>${R.edu.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
</body></html>`;
const htmlPath = path.join(__dirname, 'resume.html');
fs.writeFileSync(htmlPath, html);
console.log('html ok');

// Print the HTML to PDF with a locally installed Chrome or Edge (headless).
const browsers = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].filter(Boolean);
const browser = browsers.find((b) => fs.existsSync(b));
if (!browser) {
  console.warn('No Chrome/Edge found: set CHROME_PATH to build the PDF.');
} else {
  execFileSync(browser, [
    '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
    `--print-to-pdf=${path.join(OUT, 'Tyson-Paul-Resume.pdf')}`,
    'file:///' + htmlPath.split(path.sep).join('/'),
  ], { stdio: 'ignore' });
  console.log('pdf ok');
}
