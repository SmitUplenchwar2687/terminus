import type { Project } from './types'

export const PROJECTS: Project[] = [
  {
    id: 'chrono',
    number: '01',
    name: 'CHRONO',
    tagline: 'Distributed rate limiting with virtual time',
    description: 'Distributed rate-limiting library with virtual clock, Redis-backed synchronization, in-memory, and CRDT modes — improving fraud detection accuracy by 40%.',
    fullDescription: 'A Go library for distributed rate limiting with pluggable storage backends (Redis, in-memory). Features a virtual clock abstraction for deterministic testing and simulation of time-dependent logic without wall-clock delays. Designed for high-throughput API gateways and multi-tenant platforms.',
    tags: ['Go', 'Redis', 'Distributed Systems', 'Open Source'],
    githubUrl: 'https://github.com/smituplenchwar2687/chrono',
    shape: 'dodecahedron',
  },
  {
    id: 'Redis-clone',
    number: '02',
    name: 'Redis clone',
    tagline: 'A lightweight implementation of a Redis like in memory data store in Python.',
    description: 'This project supports basic Redis commands like PING, ECHO, SET, and GET, as well as key expiration features. It also supports core Redis functionalities like key-value storage, replication, and basic client-server communication.',
    fullDescription: 'A lightweight implementation of a Redis like in-memory data store in Python. This project supports basic Redis commands like PING, ECHO, SET, and GET, as well as key expiration features. It also supports core Redis functionalities like key value storage, replication, and basic client-server communication.',
    tags: ['Python', 'Redis', 'AWS', 'In-Memory Store'],
    githubUrl: 'https://github.com/SmitUplenchwar2687/Redis-Clone',
    shape: 'box',
  },
  {
    id: 'Pablo-s-Therapy',
    number: '03',
    name: 'Pablo-s-Therapy',
    tagline: 'A multilingual voice therapy session application',
    description: 'An interactive mobile app designed to provide mental wellness support through conversations with an AI therapist.',
    fullDescription: 'An interactive mobile app designed to provide mental wellness support through conversations with an AI therapist. This app aims to provide users with a supportive, non-judgmental space to talk through challenges, practice mindfulness, and receive advice on stress management, all powered by AI.',
    tags: ['Python', 'LangGraph', 'React Native', 'Agents'],
    githubUrl: 'https://github.com/SmitUplenchwar2687/Pablo-s-Therapy',
    shape: 'octahedron',
  },
  {
    id: 'PulseLog',
    number: '04',
    name: 'PulseLog',
    tagline: 'A production instrumented iOS fitness tracker',
    description: 'A SwiftUI workout tracker built around a deep observability layer for memory profiling and performance diagnostics.',
    fullDescription: 'A SwiftUI, SwiftData workout tracker with exercise library, Swift Charts progress dashboard, and a full observability layer. Features OSLog/os_signpost instrumentation across API requests, persistence, and image decode paths, a live memory dashboard with 60-second sparkline and CSV export, and structured debug scenarios for retain cycles, render thrashing, and cache eviction.',
    tags: ['SwiftUI', 'SwiftData', 'Swift Charts', 'OSLog', 'os_signpost', 'URLCache'],
    githubUrl: 'https://github.com/SmitUplenchwar2687/PulseLog',
    shape: 'cone',
  },
]

export const SKILLS_RING = [
  'Go', 'Python', 'TypeScript', 'Java',
  'PostgreSQL', 'Redis', 'Kafka', 'Cassandra',
  'gRPC', 'Kubernetes', 'AWS', 'Docker',
  'OpenSearch', 'FastAPI',
]

export const SKILL_CATEGORIES = [
  { label: 'Languages', skills: ['Go', 'Python', 'Java', 'TypeScript', 'SQL', 'Bash'] },
  { label: 'Backend', skills: ['gRPC', 'FastAPI', 'Node.js', 'REST APIs', 'Microservices'] },
  { label: 'Data & Storage', skills: ['PostgreSQL', 'Redis', 'Kafka', 'Cassandra', 'OpenSearch', 'S3'] },
  { label: 'Cloud & Infra', skills: ['AWS', 'Kubernetes', 'Docker', 'Helm', 'GitHub Actions'] },
  { label: 'Observability', skills: ['OpenTelemetry', 'Distributed Tracing', 'Structured Logging'] },
]

export const METRICS = [
  { value: 2.1, suffix: '×', label: 'THROUGHPUT GAIN' },
  { value: 45, suffix: '%', label: 'DB LOAD REDUCTION' },
  { value: 38, suffix: '%', label: 'LATENCY REDUCTION' },
  { value: 40, suffix: '%', label: 'DATA FRESHNESS' },
]

export const EXPERIENCE = [
  {
    id: 'radiant',
    role: 'Software Engineer',
    company: 'Radiant',
    period: 'Mar 2026 — Present',
    current: true,
    summary: 'fault-tolerant event-driven backend, distributed systems',
    bullets: [
      'Designed fault tolerant data ingestion pipelines with idempotency guarantees, exponential backoff, and DLQs, reducing pipeline failures by 30% under peak load.',
      'Built event-driven backend services in Python and Go processing high volume ERP streams with at least once delivery, improving data freshness SLAs by 40%.',
      'Implemented horizontally scalable stateless services with distributed locking and consistent hashing, enabling linear throughput scaling across multi node deployments.',
      'Instrumented distributed services with OpenTelemetry, high-cardinality metrics, and SLO-based alerting, reducing MTTD and MTTR of production failures by 35%.',
    ],
  },
  {
    id: 'redprint',
    role: 'Software Engineer',
    company: 'Redprint',
    period: 'Jun 2025 — Mar 2026',
    current: false,
    summary: 'high-volume API backend, PostgreSQL/Redis data layer',
    bullets: [
      'Built Go and Python backend services handling high-volume API traffic for workout tracking, social feeds, and leaderboard systems, improving request latency by 38%.',
      'Designed scalable data access layers with PostgreSQL and Redis caching, reducing database load by 45% under peak usage.',
      'Implemented async workflows and background workers for feed aggregation and analytics, increasing throughput by 2.1×.',
      'Instrumented services with structured logging, metrics, and tracing, reducing MTTR by 42%.',
      'Deployed microservices on AWS ECS and Kubernetes with automated CI/CD pipelines.',
    ],
  },
  {
    id: 'o9-sde2',
    role: 'Software Development Engineer II',
    company: 'o9 Solutions',
    period: 'Feb 2024 — Aug 2024',
    current: false,
    summary: 'supply chain microservices, Kafka/Airflow pipelines, 100k+ DAU',
    bullets: [
      'Developed backend microservices in Python and Node.js powering enterprise supply chain platforms used by 100k+ daily users.',
      'Designed resilient ingestion pipelines using Kafka and Airflow, improving data freshness SLAs by 50%.',
      'Optimized API endpoints and database queries, cutting p95 latency by 35% across core services.',
      'Reduced production incidents by 28% through improved service reliability and rollout safety.',
    ],
  },
  {
    id: 'o9-sde1',
    role: 'Software Development Engineer',
    company: 'o9 Solutions',
    period: 'Feb 2022 — Feb 2024',
    current: false,
    summary: 'enterprise backend APIs, rate-limiting, Redis caching, 100+ deployments',
    bullets: [
      'Built and maintained Python-based backend services supporting internal supply planning tools across 100+ enterprise deployments.',
      'Designed scalable APIs backed by PostgreSQL, Redis, and S3, improving system throughput by 40%.',
      'Hardened high traffic APIs with token bucket rate limiting, idempotency keys, and exponential backoff, preventing cascading failures by 30% during peak traffic.',
      'Added Redis-based caching and query optimizations to hot paths, reducing DB p95 latency by 40%.',
    ],
  },
  {
    id: 'tegasys',
    role: 'Software Engineer',
    company: 'Tegasys Solutions',
    period: 'Jul 2020 — Feb 2022',
    current: false,
    summary: 'Go backend APIs, SLO monitoring, alerting pipelines',
    bullets: [
      'Developed backend APIs in Go supporting internal business workflows, improving response times by 33%.',
      'Designed SLO-based service monitoring with high-cardinality metrics and structured logs, reducing MTTD of production failures by 45%.',
      'Built monitoring and alerting pipelines to track service health and data correctness, reducing operational issues by 25%.',
    ],
  },
]

export const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]
