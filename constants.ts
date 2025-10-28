
import type { Service } from './types';
import { ServiceID } from './types';
import { BriefcaseIcon, ChartBarIcon, DocumentCheckIcon, DocumentTextIcon, LightBulbIcon, MailIcon, MegaphoneIcon, PresentationChartLineIcon } from './components/Icons';

export const PRO_PLAN_PRICE_KOBO = 500000; // e.g., 5000 NGN
export const PRO_PLAN_CURRENCY = 'NGN';

export const SERVICES: Service[] = [
  {
    id: ServiceID.Enhancement,
    title: 'Resume Enhancement',
    description: 'Optimize your existing resume for a target role, emphasizing key skills and experience with powerful maritime action verbs.',
    icon: DocumentTextIcon,
    inputs: [
      { id: 'resume', label: 'Your Current Resume', placeholder: 'Paste your full resume here...', type: 'textarea', rows: 10 },
      { id: 'role', label: 'Target Role', placeholder: 'e.g., Chief Engineer, Technical Superintendent', type: 'text' },
      { id: 'vessel', label: 'Vessel Type Focus', placeholder: 'e.g., LNG carriers, DP3 AHTS', type: 'text' },
      { id: 'competencies', label: 'Key Competencies', placeholder: 'e.g., dry-docking supervision, ISM/ISPS audits, Wärtsilä engine maintenance', type: 'text' },
    ],
    promptTemplate: `Here is my current resume: \`\`\`\n{resume}\n\`\`\`\n\nOptimize it for a "{role}" position. Emphasize my experience with "{vessel}" and key competencies like "{competencies}". Rewrite my experience with powerful maritime action verbs and ensure it passes ATS scans by major crewing agencies and ship managers. Format the output in clean Markdown.`,
  },
  {
    id: ServiceID.Analysis,
    title: 'Career Alignment Analysis',
    description: 'Analyze your sea-time, vessel experience, and tickets to discover potential career steps and opportunities.',
    icon: ChartBarIcon,
    inputs: [
      { id: 'background', label: 'Your Background', placeholder: 'Paste your experience, key certifications, CoC, sea time, etc. e.g., 2nd Engineer CoC (Unlimited), 4 years on tankers, DP Maintenance', type: 'textarea', rows: 10 },
    ],
    promptTemplate: `Here is my background: \`\`\`\n{background}\n\`\`\`\n\nAnalyze my sea-time, vessel experience, and tickets. List 10 potential career steps (including both sea-going and shore-based roles) I am qualified for. Please rank them by salary potential, work-life balance (rotation), and current demand in the maritime market. Present this as a well-structured Markdown table.`,
  },
  {
    id: ServiceID.Audit,
    title: 'Resume Matching Audit',
    description: 'Audit your resume against a specific job description to identify gaps and get a 90%+ match.',
    icon: DocumentCheckIcon,
    inputs: [
      { id: 'job_description', label: 'Job Description', placeholder: 'Paste the full job posting from Maersk, Bourbon, etc.', type: 'textarea', rows: 8 },
      { id: 'resume', label: 'Your Resume', placeholder: 'Paste your full resume here...', type: 'textarea', rows: 8 },
    ],
    promptTemplate: `Job description: \`\`\`\n{job_description}\n\`\`\`\n\nMy resume: \`\`\`\n{resume}\n\`\`\`\n\nAudit my resume against this job. Provide a percentage match score. Identify all missing maritime keywords, specific certifications (like 'High Voltage' or 'Gas-Ex'), and vessel-specific experience they are looking for. Then, rewrite my professional profile and experience sections to achieve a 90%+ match for this specific role. Format the output in clean Markdown, with clear sections for the audit and the rewritten parts.`,
  },
  {
    id: ServiceID.Interview,
    title: 'Interview Ready Strategy',
    description: 'Generate realistic technical, situational, and behavioral interview questions with strong model answers.',
    icon: PresentationChartLineIcon,
    inputs: [
      { id: 'role', label: 'Position You Are Interviewing For', placeholder: 'e.g., ETO, Chief Mate', type: 'text' },
    ],
    promptTemplate: `I am interviewing for the position of: "{role}". Create 15 realistic interview questions for this role. The questions should be divided into three categories: 5 technical questions (e.g., 'Describe your process for troubleshooting a main engine automation fault'), 5 situational/safety questions (e.g., 'What are your first actions during a blackout?'), and 5 behavioral/management questions (e.g., 'How do you manage a tired and unmotivated engine room crew mid-contract?'). For each question, provide a strong, detailed model answer that a top candidate would give. Format the output in clean Markdown.`,
  },
  {
    id: ServiceID.ProofBuilding,
    title: 'Proof Building Plan',
    description: 'Get ideas for portfolio projects you can complete quickly to showcase your skills and boost credibility.',
    icon: LightBulbIcon,
    inputs: [
      { id: 'role', label: 'Your Target Role', placeholder: 'e.g., 3rd Engineer, Marine Surveyor', type: 'text' },
    ],
    promptTemplate: `My target role is: "{role}". Generate 3 practical, impactful portfolio or project ideas that I can complete within a week to showcase my skills and boost my credibility for this role. For each idea, describe the project, what skills it demonstrates, and how to present it in a resume or portfolio.`,
  },
  {
    id: ServiceID.Salary,
    title: 'Salary Maximization',
    description: 'Craft a polite but compelling script to negotiate a 15–20% higher compensation.',
    icon: MegaphoneIcon,
    inputs: [
      { id: 'offer', label: 'Your Job Offer Amount', placeholder: 'e.g., $85,000 USD per year, or 6000 EUR per month', type: 'text' },
      { id: 'role', label: 'Job Role', placeholder: 'e.g., Second Engineer', type: 'text' },
    ],
    promptTemplate: `I have received a job offer for the role of "{role}" for the amount of "{offer}". Write a polite but compelling script (for an email or phone call) to negotiate a 15–20% higher compensation. The script should express enthusiasm for the role, justify the request with references to market rates and my skills, and maintain a positive and professional tone without appearing demanding. Provide a few variations or key talking points.`,
  },
  {
    id: ServiceID.FollowUp,
    title: 'Follow-up Engagement',
    description: 'Write a short, engaging follow-up email to a recruiter to stay top of mind after an interview or application.',
    icon: BriefcaseIcon,
    inputs: [
      { id: 'recruiter', label: 'Recruiter\'s Name', placeholder: 'e.g., Jane Doe', type: 'text' },
      { id: 'role', label: 'Position Applied For', placeholder: 'e.g., Technical Superintendent', type: 'text' },
    ],
    promptTemplate: `Recruiter's Name: {recruiter}. Position: {role}. Write a short, professional, and engaging follow-up email. The goal is to remind them of my qualifications and keep me top of mind effectively without being pushy. Assume the interview was 2 days ago.`,
  },
  {
    id: ServiceID.CoverLetter,
    title: 'AI Cover Letter Generator',
    description: 'Generate a tailored cover letter based on your resume and a specific job description.',
    icon: MailIcon,
    inputs: [
      { id: 'resume', label: 'Your Resume', placeholder: 'Paste your full resume here...', type: 'textarea', rows: 8 },
      { id: 'job_description', label: 'Job Description', placeholder: 'Paste the full job posting here...', type: 'textarea', rows: 8 },
      { id: 'company_name', label: 'Company Name (Optional)', placeholder: 'e.g., Maersk, V.Ships, Tidewater', type: 'text', optional: true },
    ],
    promptTemplate: `Based on my resume: \`\`\`\n{resume}\n\`\`\` and the job description: \`\`\`\n{job_description}\n\`\`\` for the role at {company_name}, please draft a compelling cover letter. Highlight my relevant maritime experience, skills, and enthusiasm for the role and company.`,
  },
];