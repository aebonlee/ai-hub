/**
 * DreamIT AI Hub - 사이트 설정 파일
 * AI 전문 학습사이트 허브의 브랜드, 메뉴, 학습사이트 정보를 정의합니다.
 */

import type { SiteConfig } from '../types';

const site: SiteConfig = {
  id: 'ai-hub',

  // 사이트 기본 정보
  name: 'DreamIT AI Hub',
  nameKo: '드림아이티 AI 허브',
  description: 'DreamIT AI Hub - AI 전문 학습사이트 허브. 챗봇, 자동화, 데이터, 미디어, 개발 심화까지 11개 AI 학습 플랫폼',
  url: 'https://ai-hub.dreamitbiz.com',
  dbPrefix: 'ah_',

  // 부모 사이트
  parentSite: {
    name: 'DreamIT Biz',
    url: 'https://www.dreamitbiz.com'
  },

  // 브랜드 로고 텍스트
  brand: {
    parts: [
      { text: 'AI', className: 'brand-biz' },
      { text: ' Hub', className: 'brand-dream' }
    ]
  },

  // 테마 컬러 (다크 블루)
  themeColor: '#1E3A8A',

  company: {
    name: '드림아이티비즈(DreamIT Biz)',
    ceo: '이애본',
    bizNumber: '000-00-00000',
    address: '경기도 수원시',
    email: 'aebonlee@gmail.com',
    phone: '010-0000-0000',
  },
  features: {
    shop: true,
    community: true,
    search: true,
    auth: true,
    license: false,
  },
  colors: [
    { name: 'blue' as const, color: '#1E3A8A' },
    { name: 'green' as const, color: '#065F46' },
    { name: 'purple' as const, color: '#5B21B6' },
    { name: 'red' as const, color: '#991B1B' },
    { name: 'orange' as const, color: '#92400E' },
  ],

  // 5개 AI 카테고리
  categories: [
    { id: 'chatbot', name: 'AI 챗봇 마스터', nameEn: 'AI Chatbot Master', icon: 'fa-solid fa-comments', path: '/courses/chatbot' },
    { id: 'automation', name: 'AI 실무 자동화', nameEn: 'AI Work Automation', icon: 'fa-solid fa-gears', path: '/courses/automation' },
    { id: 'data-media', name: 'AI 데이터 & 미디어', nameEn: 'AI Data & Media', icon: 'fa-solid fa-chart-line', path: '/courses/data-media' },
    { id: 'advanced', name: 'AI 개발 심화', nameEn: 'AI Advanced Development', icon: 'fa-solid fa-microchip', path: '/courses/advanced' },
    { id: 'opensource', name: '오픈소스 AI', nameEn: 'Open Source AI', icon: 'fa-solid fa-code-branch', path: '/courses/opensource' }
  ],

  // 네비게이션 메뉴
  menuItems: [
    {
      labelKey: 'site.nav.chatbot',
      path: '/courses/chatbot',
      activePath: '/courses/chatbot',
      dropdown: [
        { path: '/courses/chatgpt', labelKey: 'site.nav.chatgpt' },
        { path: '/courses/claude', labelKey: 'site.nav.claude' },
        { path: '/courses/gemini', labelKey: 'site.nav.gemini' },
        { path: '/courses/genspark', labelKey: 'site.nav.genspark' }
      ]
    },
    {
      labelKey: 'site.nav.automation',
      path: '/courses/automation',
      activePath: '/courses/automation',
      dropdown: [
        { path: '/courses/autowork', labelKey: 'site.nav.autowork' },
        { path: '/courses/ai-agents', labelKey: 'site.nav.aiAgents' }
      ]
    },
    {
      labelKey: 'site.nav.dataMedia',
      path: '/courses/data-media',
      activePath: '/courses/data-media',
      dropdown: [
        { path: '/courses/ai-data', labelKey: 'site.nav.aiData' },
        { path: '/courses/ai-media', labelKey: 'site.nav.aiMedia' }
      ]
    },
    {
      labelKey: 'site.nav.advanced',
      path: '/courses/advanced',
      activePath: '/courses/advanced',
      dropdown: [
        { path: '/courses/ai-prompt', labelKey: 'site.nav.aiPrompt' },
        { path: '/courses/fine-tuning', labelKey: 'site.nav.fineTuning' }
      ]
    },
    {
      labelKey: 'site.nav.opensource',
      path: '/courses/opensource',
      activePath: '/courses/opensource',
      dropdown: [
        { path: '/courses/openclaw', labelKey: 'site.nav.openclaw' }
      ]
    },
    {
      labelKey: 'site.nav.franchise',
      path: '/franchise',
      activePath: '/franchise',
      dropdown: [
        { path: '/franchise', labelKey: 'site.nav.franchiseInquiry' },
        { path: '/pricing', labelKey: 'site.nav.pricing' },
        { path: '/shop', labelKey: 'site.nav.shop' }
      ]
    },
    {
      labelKey: 'site.nav.community',
      path: '/about',
      activePath: '/about',
      dropdown: [
        { path: '/about', labelKey: 'site.nav.aboutHub' },
        { path: '/notice', labelKey: 'site.nav.notice' },
        { path: '/qna', labelKey: 'site.nav.qna' }
      ]
    }
  ],

  // 푸터 바로가기 링크
  footerLinks: [
    { path: '/courses/chatbot', labelKey: 'site.nav.chatbot' },
    { path: '/courses/automation', labelKey: 'site.nav.automation' },
    { path: '/courses/data-media', labelKey: 'site.nav.dataMedia' },
    { path: '/courses/advanced', labelKey: 'site.nav.advanced' },
    { path: '/courses/opensource', labelKey: 'site.nav.opensource' },
    { path: '/franchise', labelKey: 'site.nav.franchise' },
    { path: '/pricing', labelKey: 'site.nav.pricing' },
    { path: '/about', labelKey: 'site.nav.community' }
  ],

  // Family Site 목록
  familySites: [
    { name: 'DreamIT Edu Hub', url: 'https://edu-hub.dreamitbiz.com' },
    { name: 'DreamIT Biz', url: 'https://www.dreamitbiz.com' },
    { name: 'AHP 연구 플랫폼', url: 'https://ahp-basic.dreamitbiz.com' },
    { name: '핵심역량 자가측정', url: 'https://competency.dreamitbiz.com' }
  ],

  // 11개 AI 학습사이트
  learningSites: [
    // ── AI 챗봇 마스터 (chatbot) ──
    {
      id: 'chatgpt',
      name: 'ChatGPT 활용',
      nameEn: 'ChatGPT Utilization',
      url: 'https://chatgpt.dreamitbiz.com',
      icon: 'fa-solid fa-message',
      color: '#10A37F',
      category: 'chatbot',
      price: 49000,
      description: 'OpenAI의 ChatGPT를 완벽하게 활용하는 방법을 학습합니다. GPT-4o, 플러그인, Custom GPTs까지 체계적으로 다룹니다.',
      descriptionEn: 'Learn to fully utilize OpenAI\'s ChatGPT. Systematically covers GPT-4o, plugins, and Custom GPTs.',
      techStack: ['ChatGPT', 'GPT-4o', 'Custom GPTs', 'API'],
      difficulty: 'beginner',
      curriculum: [
        'ChatGPT 기본 사용법과 인터페이스',
        '효과적인 프롬프트 작성 기법',
        'Custom GPTs 생성과 활용',
        'ChatGPT API 연동 기초',
        'ChatGPT 실무 활용 프로젝트'
      ],
      curriculumEn: [
        'ChatGPT basics and interface',
        'Effective prompt writing techniques',
        'Creating and using Custom GPTs',
        'ChatGPT API integration basics',
        'ChatGPT practical project'
      ],
      features: ['실습 중심 학습', 'Custom GPTs 제작', '업무 활용 사례'],
      featuresEn: ['Practice-oriented learning', 'Custom GPTs creation', 'Business use cases'],
      target: 'AI 챗봇 활용에 관심 있는 모든 학습자',
      targetEn: 'Anyone interested in utilizing AI chatbots'
    },
    {
      id: 'claude',
      name: 'Claude AI 활용',
      nameEn: 'Claude AI Utilization',
      url: 'https://claude.dreamitbiz.com',
      icon: 'fa-solid fa-wand-magic-sparkles',
      color: '#D97706',
      category: 'chatbot',
      price: 69000,
      description: 'Anthropic의 Claude AI를 완벽하게 활용하는 방법을 학습합니다. Claude API, 프롬프트 최적화, MCP 활용까지 체계적으로 다룹니다.',
      descriptionEn: 'Learn to fully utilize Anthropic\'s Claude AI. Covers Claude API, prompt optimization, and MCP.',
      techStack: ['Claude', 'API', 'Prompt Engineering', 'MCP'],
      difficulty: 'intermediate',
      curriculum: [
        'Claude AI 소개와 특장점',
        'Claude API 활용 기초',
        '고급 프롬프트 최적화 기법',
        'Claude MCP(Model Context Protocol) 활용',
        'Claude 기반 AI 서비스 구축 프로젝트'
      ],
      curriculumEn: [
        'Introduction to Claude AI and its strengths',
        'Claude API fundamentals',
        'Advanced prompt optimization techniques',
        'Using Claude MCP (Model Context Protocol)',
        'Building AI services with Claude project'
      ],
      features: ['Claude 전문 학습', 'API 실습 환경', 'MCP 프로토콜 활용'],
      featuresEn: ['Claude-specialized learning', 'API practice environment', 'MCP protocol utilization'],
      target: 'Claude AI를 깊이 활용하고 싶은 개발자, 업무 전문가',
      targetEn: 'Developers and professionals who want to deeply utilize Claude AI'
    },
    {
      id: 'gemini',
      name: 'Gemini AI 활용',
      nameEn: 'Gemini AI Utilization',
      url: 'https://gemini.dreamitbiz.com',
      icon: 'fa-solid fa-gem',
      color: '#4285F4',
      category: 'chatbot',
      price: 49000,
      description: 'Google의 Gemini AI를 활용하는 방법을 학습합니다. 멀티모달 AI, Gemini API, Google AI Studio 활용까지 다룹니다.',
      descriptionEn: 'Learn to utilize Google\'s Gemini AI. Covers multimodal AI, Gemini API, and Google AI Studio.',
      techStack: ['Gemini', 'Google AI Studio', 'API', 'Multimodal'],
      difficulty: 'beginner',
      curriculum: [
        'Gemini AI 소개와 특징',
        'Gemini 기본 활용법',
        'Google AI Studio 실습',
        'Gemini API 연동',
        'Gemini 멀티모달 활용 프로젝트'
      ],
      curriculumEn: [
        'Introduction to Gemini AI',
        'Gemini basic usage',
        'Google AI Studio practice',
        'Gemini API integration',
        'Gemini multimodal project'
      ],
      features: ['멀티모달 AI 실습', 'Google 생태계 연동', '실무 활용 사례'],
      featuresEn: ['Multimodal AI practice', 'Google ecosystem integration', 'Business use cases'],
      target: 'Google AI 활용에 관심 있는 학습자',
      targetEn: 'Learners interested in Google AI'
    },
    {
      id: 'genspark',
      name: 'GenSpark AI',
      nameEn: 'GenSpark AI',
      url: 'https://genspark.dreamitbiz.com',
      icon: 'fa-solid fa-bolt',
      color: '#F59E0B',
      category: 'chatbot',
      price: 49000,
      description: 'GenSpark AI를 활용한 콘텐츠 생성과 업무 효율화 기법을 학습합니다.',
      descriptionEn: 'Learn content generation and work efficiency techniques using GenSpark AI.',
      techStack: ['GenSpark', 'AI 콘텐츠', '자동생성', '워크플로우'],
      difficulty: 'beginner',
      curriculum: [
        'GenSpark AI 소개와 설정',
        '콘텐츠 자동 생성 실습',
        '업무 워크플로우 자동화',
        'GenSpark 고급 활용법',
        '실전 프로젝트'
      ],
      curriculumEn: [
        'Introduction to GenSpark AI and setup',
        'Content auto-generation practice',
        'Work workflow automation',
        'Advanced GenSpark usage',
        'Practical project'
      ],
      features: ['콘텐츠 자동 생성', '워크플로우 자동화', '실전 활용'],
      featuresEn: ['Auto content generation', 'Workflow automation', 'Practical usage'],
      target: 'AI를 활용한 콘텐츠 생성에 관심 있는 학습자',
      targetEn: 'Learners interested in AI-powered content generation'
    },

    // ── AI 실무 자동화 (automation) ──
    {
      id: 'autowork',
      name: 'AI 업무 자동화',
      nameEn: 'AI Work Automation',
      url: 'https://autowork.dreamitbiz.com',
      icon: 'fa-solid fa-gears',
      color: '#2563EB',
      category: 'automation',
      price: 69000,
      description: 'AI를 활용한 문서 작성, 데이터 처리, 반복 업무 자동화 기법을 학습합니다.',
      descriptionEn: 'Learn AI-powered automation for document creation, data processing, and repetitive tasks.',
      techStack: ['ChatGPT', 'Python', 'API 연동', '자동화'],
      difficulty: 'intermediate',
      curriculum: [
        'AI 업무자동화 개론',
        '문서 작성 및 요약 자동화',
        '데이터 수집과 정리 자동화',
        'API 연동을 통한 워크플로우 구축',
        '반복 업무 자동화 실전 프로젝트'
      ],
      curriculumEn: [
        'Introduction to AI work automation',
        'Automated document creation and summarization',
        'Automated data collection and organization',
        'Workflow building via API integration',
        'Repetitive task automation project'
      ],
      features: ['실무 시나리오 실습', 'API 연동 실습', '자동화 템플릿 제공'],
      featuresEn: ['Real-world scenario practice', 'API integration practice', 'Automation templates provided'],
      target: '직장인, 업무 효율화를 원하는 학습자',
      targetEn: 'Office workers, learners seeking work efficiency'
    },
    {
      id: 'ai-agents',
      name: 'AI 에이전트',
      nameEn: 'AI Agent Work Lab',
      url: 'https://ai-agents.dreamitbiz.com',
      icon: 'fa-solid fa-user-gear',
      color: '#4F46E5',
      category: 'automation',
      price: 69000,
      description: '생성형 AI를 넘어 실무에 적용하는 AI Agent 학습 플랫폼. 리서치, 문서화, 자동화, 아이디어 구체화를 위한 실무형 AI Agent 교육을 제공합니다.',
      descriptionEn: 'An AI Agent learning platform that goes beyond generative AI to real-world applications. Provides practical AI Agent training for research, documentation, automation, and idea development.',
      techStack: ['AI Agent', 'Claude', 'ChatGPT', 'Automation'],
      difficulty: 'intermediate',
      curriculum: [
        'AI Agent 개념과 실무 활용',
        '리서치 자동화 Agent 구축',
        '문서 작성 및 요약 Agent',
        '업무 프로세스 자동화 Agent',
        '멀티 Agent 협업 시스템 구축'
      ],
      curriculumEn: [
        'AI Agent concepts and practical applications',
        'Building research automation agents',
        'Document writing and summarization agents',
        'Business process automation agents',
        'Building multi-agent collaboration systems'
      ],
      features: ['실무 중심 Agent 실습', '다양한 AI 모델 활용', '업무 자동화 파이프라인'],
      featuresEn: ['Practice-focused agent training', 'Multi AI model utilization', 'Work automation pipelines'],
      target: 'AI를 업무에 활용하고 싶은 직장인, 기획자, 개발자',
      targetEn: 'Office workers, planners, and developers who want to use AI at work'
    },

    // ── AI 데이터 & 미디어 (data-media) ──
    {
      id: 'ai-data',
      name: 'AI 데이터 분석',
      nameEn: 'AI Data Analysis',
      url: 'https://ai-data.dreamitbiz.com',
      icon: 'fa-solid fa-chart-line',
      color: '#DC2626',
      category: 'data-media',
      price: 69000,
      description: 'AI를 활용하여 데이터를 분석하고 인사이트를 도출하는 능력을 키웁니다.',
      descriptionEn: 'Build the ability to analyze data and derive insights using AI.',
      techStack: ['Python', 'Pandas', 'ChatGPT', '시각화'],
      difficulty: 'intermediate',
      curriculum: [
        'AI 기반 데이터 분석 개론',
        '데이터 전처리와 탐색적 분석',
        'AI 활용 데이터 시각화',
        '자연어로 데이터 질의하기',
        '분석 보고서 자동 생성'
      ],
      curriculumEn: [
        'Introduction to AI-based data analysis',
        'Data preprocessing and exploratory analysis',
        'AI-powered data visualization',
        'Querying data with natural language',
        'Automated analysis report generation'
      ],
      features: ['실데이터 분석 실습', 'AI 기반 시각화', '보고서 자동화'],
      featuresEn: ['Real data analysis practice', 'AI-based visualization', 'Report automation'],
      target: '데이터 분석가 지망생, 기획자',
      targetEn: 'Aspiring data analysts, planners'
    },
    {
      id: 'ai-media',
      name: 'AI 미디어 생성',
      nameEn: 'AI Media Generation',
      url: 'https://ai-media.dreamitbiz.com',
      icon: 'fa-solid fa-image',
      color: '#EA580C',
      category: 'data-media',
      price: 49000,
      description: 'Midjourney, DALL-E, Stable Diffusion 등을 활용한 AI 이미지/영상 생성 기법을 학습합니다.',
      descriptionEn: 'Learn AI image and video generation techniques using Midjourney, DALL-E, and Stable Diffusion.',
      techStack: ['Midjourney', 'DALL-E', 'Stable Diffusion', 'Prompt'],
      difficulty: 'beginner',
      curriculum: [
        'AI 이미지 생성 개론',
        '이미지 프롬프트 작성법',
        'Midjourney 활용 실습',
        'DALL-E & Stable Diffusion 비교',
        '상업용 이미지 제작 프로젝트'
      ],
      curriculumEn: [
        'Introduction to AI image generation',
        'Image prompt writing techniques',
        'Midjourney hands-on practice',
        'DALL-E & Stable Diffusion comparison',
        'Commercial image creation project'
      ],
      features: ['다양한 AI 도구 실습', '프롬프트 패턴 학습', '상업적 활용법'],
      featuresEn: ['Multi-tool practice', 'Prompt pattern learning', 'Commercial usage techniques'],
      target: '디자이너, 콘텐츠 크리에이터',
      targetEn: 'Designers, content creators'
    },

    // ── AI 개발 심화 (advanced) ──
    {
      id: 'ai-prompt',
      name: '프롬프트 엔지니어링',
      nameEn: 'Prompt Engineering',
      url: 'https://ai-prompt.dreamitbiz.com',
      icon: 'fa-solid fa-comments',
      color: '#7C3AED',
      category: 'advanced',
      price: 49000,
      description: 'ChatGPT, Claude 등 AI 모델에서 원하는 결과를 이끌어내는 프롬프트 작성 기법을 학습합니다.',
      descriptionEn: 'Learn prompt crafting techniques to get desired results from AI models like ChatGPT and Claude.',
      techStack: ['ChatGPT', 'Claude', 'Prompt', 'Few-shot'],
      difficulty: 'beginner',
      curriculum: [
        '프롬프트 엔지니어링 개론',
        '효과적인 프롬프트 구조와 패턴',
        'Few-shot / Chain-of-Thought 기법',
        '역할 부여와 시스템 프롬프트 설계',
        '업무별 프롬프트 실전 활용'
      ],
      curriculumEn: [
        'Introduction to prompt engineering',
        'Effective prompt structures and patterns',
        'Few-shot / Chain-of-Thought techniques',
        'Role assignment and system prompt design',
        'Practical prompt usage by task type'
      ],
      features: ['실습 중심 학습', '다양한 AI 모델 대응', '업무 활용 템플릿'],
      featuresEn: ['Practice-oriented learning', 'Multi-model support', 'Work-ready templates'],
      target: 'AI 활용에 관심 있는 모든 학습자',
      targetEn: 'Anyone interested in utilizing AI'
    },
    {
      id: 'fine-tuning',
      name: 'AI 파인튜닝',
      nameEn: 'AI Fine-Tuning',
      url: 'https://fine-tuning.dreamitbiz.com',
      icon: 'fa-solid fa-sliders',
      color: '#9333EA',
      category: 'advanced',
      price: 89000,
      description: 'AI 모델을 내 목적에 맞게 미세조정(Fine-Tuning)하는 방법을 학습합니다. 커스텀 데이터셋 구축부터 모델 배포까지 전 과정을 다룹니다.',
      descriptionEn: 'Learn how to fine-tune AI models for your specific needs. Covers the entire process from custom dataset creation to model deployment.',
      techStack: ['Fine-Tuning', 'Python', 'Hugging Face', 'LoRA'],
      difficulty: 'advanced',
      curriculum: [
        'Fine-Tuning 개념과 원리',
        '커스텀 데이터셋 구축 방법',
        'LoRA/QLoRA를 활용한 효율적 학습',
        '모델 평가와 최적화',
        '파인튜닝 모델 배포 및 활용'
      ],
      curriculumEn: [
        'Fine-tuning concepts and principles',
        'Building custom datasets',
        'Efficient training with LoRA/QLoRA',
        'Model evaluation and optimization',
        'Fine-tuned model deployment and utilization'
      ],
      features: ['실습 중심 학습', 'GPU 환경 제공', '모델 커스터마이징'],
      featuresEn: ['Practice-oriented learning', 'GPU environment provided', 'Model customization'],
      target: 'AI 모델을 직접 커스터마이징하고 싶은 개발자, 연구자',
      targetEn: 'Developers and researchers who want to customize AI models'
    },

    // ── 오픈소스 AI (opensource) ──
    {
      id: 'openclaw',
      name: '오픈소스 AI',
      nameEn: 'Open Source AI',
      url: 'https://openclaw.dreamitbiz.com',
      icon: 'fa-solid fa-code-branch',
      color: '#0891B2',
      category: 'opensource',
      price: 69000,
      description: 'Open Claw 프레임워크를 활용한 AI 에이전트 구축과 오픈소스 AI 도구 활용법을 학습합니다.',
      descriptionEn: 'Learn to build AI agents with the Open Claw framework and utilize open-source AI tools.',
      techStack: ['Open Claw', 'AI Agent', 'Python', '오픈소스'],
      difficulty: 'intermediate',
      curriculum: [
        'Open Claw 프레임워크 개론',
        'AI 에이전트 설계와 구현',
        '오픈소스 AI 도구 활용',
        '멀티 에이전트 시스템 구축',
        'Open Claw 실전 프로젝트'
      ],
      curriculumEn: [
        'Introduction to Open Claw framework',
        'AI agent design and implementation',
        'Utilizing open-source AI tools',
        'Building multi-agent systems',
        'Open Claw hands-on project'
      ],
      features: ['오픈소스 AI 실습', '에이전트 설계', '프로젝트 기반 학습'],
      featuresEn: ['Open-source AI practice', 'Agent design', 'Project-based learning'],
      target: 'AI 개발자, 오픈소스 AI 활용에 관심 있는 학습자',
      targetEn: 'AI developers, learners interested in open-source AI'
    }
  ]
};

export default site;
