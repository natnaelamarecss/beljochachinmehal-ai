# Ethiopian AI Learning Hub

Absolutely. Below is the final master prompt you can paste directly into Lovable to build the full product. It combines the three free AI models, first-party API architecture, Google/email authentication, 3D Ethiopian-branded launch screen, file uploads, OCR/Image-to-Text, powerful image generation, Live Mode, PDF/document generation, student/parent/teacher/admin systems, safety, RAG, projects, and production architecture.

BUILD A PRODUCTION-READY AI PLATFORM

በልጆቻችን መሃል AI

Build a complete, production-quality, scalable, responsive, professional multimodal AI education platform called:

በልጆቻችን መሃል AI

English brand:
AI Among Our Children

Tagline:
ተማር። ፍጠር። መርምር።
Learn. Create. Explore.

This is not a simple chatbot, landing page, or visual prototype.

Build it as a complete SaaS-style AI platform with:

Authentication

Student accounts

Parent accounts

Teacher accounts

Admin accounts

Three AI models

AI chat

Live voice AI

File upload

File understanding

Image understanding

OCR / Image-to-Text

Amharic OCR

Image generation

Image editing

Image variations

Image enhancement

Document generation

PDF generation

Quiz generation

Personalized learning

Projects

RAG

AI safety

First-party API

Secure storage

Analytics

Notifications

Responsive UI

Professional 3D branding

The final experience should feel like a serious modern AI platform while remaining friendly and accessible for children, parents, and teachers.

CORE PRODUCT PRINCIPLE

The product must be built around six principles:

EDUCATION FIRST

CHILD SAFETY FIRST

FREE AI ACCESS

MULTIMODAL AI

AMHARIC + ENGLISH

PROFESSIONAL FIRST-PARTY PLATFORM

The platform should help users:

ASK
UPLOAD
UNDERSTAND
LEARN
CREATE
EDIT
TALK
BUILD
EXPORT

A user should be able to move seamlessly between all of these actions.

THREE FREE AI MODELS

The platform contains exactly three primary AI experiences.

IMPORTANT:

These are NOT paid subscription plans.

All three are part of the free product.

They represent different capability modes.

MODEL 1

⚡ ተማሪ Lite

Purpose:
Fast everyday learning assistant.

Best for:

Quick questions

Definitions

Vocabulary

Basic mathematics

Basic science

Translation

Summaries

Grammar

Homework guidance

Simple explanations

Quick study help

Simple file questions

Basic OCR

Basic image understanding

Simple educational image generation

Description:

“Fast help for everyday learning.”

Behavior:

Fast

Friendly

Concise

Educational

Simple explanations

Appropriate for younger learners

MODEL 2

🧠 ተማሪ Thinker

Purpose:
Deep learning and problem solving.

Best for:

Advanced mathematics

Physics

Chemistry

Biology

Programming

Difficult homework

Critical thinking

Exam preparation

Complex document analysis

Deep explanation

Advanced OCR interpretation

Diagram understanding

Research assistance

Advanced educational image creation

Description:

“Think deeper. Learn better.”

Behavior:

Analytical

Patient

Structured

Socratic

Step-by-step

Encourages reasoning

Encourages independent thinking

MODEL 3

🚀 ተማሪ Pro

Purpose:
Advanced professional multimodal creation and learning.

Best for:

Large projects

Advanced research

Complex documents

PDF generation

Document generation

Professional image generation

Image editing

Image variations

Image enhancement

Advanced file analysis

Multimodal workflows

Live AI

Project workspaces

Coding

Presentations

Study guides

Complex educational workflows

Description:

“Create, build, research, and learn.”

MODEL SELECTOR

Create a highly polished model selector.

Display:

Choose your AI

⚡ ተማሪ Lite
Fast everyday learning

🧠 ተማሪ Thinker
Deep thinking and problem solving

🚀 ተማሪ Pro
Advanced creation and projects

FREE

The model selector should be accessible from:

AI home

Chat

Live

Projects

Creation tools

The backend should map these names to internal model configurations.

The frontend should never expose underlying AI provider model IDs.

FIRST-PARTY API ARCHITECTURE

The platform MUST use a first-party API.

The frontend must NEVER directly call a third-party AI provider.

Architecture:

Lovable Frontend
↓
First-Party API
↓
Authentication
↓
Authorization
↓
AI Gateway
↓
Model Router
↓
Provider Adapters
↓
AI services
↓
Safety Layer
↓
Response
↓
Frontend

Create:

/api/v1/

This is the official API surface of the platform.

FIRST-PARTY API ENDPOINTS

Implement an architecture for:

POST /api/v1/chat
GET /api/v1/models

POST /api/v1/live/session
POST /api/v1/live/audio
DELETE /api/v1/live/session/:id

POST /api/v1/files/upload
GET /api/v1/files
GET /api/v1/files/:id
DELETE /api/v1/files/:id

POST /api/v1/files/analyze

POST /api/v1/ocr

POST /api/v1/images/generate
POST /api/v1/images/edit
POST /api/v1/images/variation
POST /api/v1/images/enhance

POST /api/v1/documents/generate
POST /api/v1/pdfs/generate

POST /api/v1/quiz/generate

POST /api/v1/projects
GET /api/v1/projects
GET /api/v1/projects/:id

GET /api/v1/usage
GET /api/v1/profile

Use secure request validation.

Return consistent structured responses.

AI PROVIDER ABSTRACTION

Do not couple the application to one AI provider.

Create a provider abstraction layer.

Example interfaces:

AIProvider
ImageProvider
VisionProvider
OCRProvider
SpeechProvider
DocumentProvider

Methods should include:

generateText()
streamText()
analyzeImage()
analyzeFile()
generateQuiz()
generateDocument()
generatePDF()
generateImage()
editImage()
createVariation()
enhanceImage()
extractText()
transcribeAudio()
synthesizeSpeech()
startLiveSession()

This makes it possible to change or add model providers later.

SECURITY OF API KEYS

Never expose:

AI API keys

Service role keys

Storage secrets

Database passwords

Provider credentials

Internal infrastructure secrets

All secrets must remain server-side.

Use environment variables and secure secret management.

AUTHENTICATION

Authentication methods:

Google

Button:

Continue with Google

Implement secure OAuth.

Email + Password

Fields:

Email
Password

Buttons:

Sign In
Create Account
Forgot Password

Registration:

Full Name
Email
Password
Confirm Password

Use secure authentication.

Never store plaintext passwords.

ROLE SYSTEM

Roles:

STUDENT
PARENT
TEACHER
ADMIN

Each role has separate permissions.

Students cannot access:

Parent tools

Teacher tools

Admin tools

Parents can access authorized children.

Teachers can access authorized classes and students.

Admins have administrative access.

Always enforce authorization on the server.

FIRST LOGIN EXPERIENCE

After the user's first successful authentication:

Authentication
↓
Profile setup
↓
3D brand intro
↓
Dashboard

Returning users:

Do not force the full intro every time.

Use a very short transition or allow the intro to be skipped.

3D BRAND INTRO

Before opening the AI workspace, display a cinematic 3D product introduction.

Main title:

በልጆቻችን መሃል AI

Subtitle:

ለልጆቻችን የተሻለ የመማሪያ ዓለም

English:

Learn. Create. Explore.

Animation:

Dark background fades in.

Small particles begin moving.

Ethiopian-inspired light gradients appear.

AI network nodes gently animate.

3D title forms from particles.

Green, yellow, and red light passes over the title.

Subtitle fades in.

Brand mark appears.

Transition into the dashboard.

Duration:

2–4 seconds.

Provide:

Skip

for users who do not want animation.

Respect:

prefers-reduced-motion

ETHIOPIAN VISUAL IDENTITY

Primary Ethiopian-inspired colors:

Green:
#078930

Yellow:
#FCDD09

Red:
#DA121A

Use these as controlled visual accents.

Do NOT make the interface look like a literal flag.

Use:

Soft gradients

Ambient lighting

Subtle glowing particles

Premium dark backgrounds

White content surfaces

Ethiopian color accents

Overall visual language:

Modern
Premium
Ethiopian
Technological
Educational
Friendly

3D BRANDING

Create a dimensional visual presentation for:

በልጆቻችን መሃል AI

Visual characteristics:

Depth

Soft extrusion

Ambient shadow

Reflective highlight

Light sweep

Subtle glow

Create a brand mark based on:

Open book
+
AI neural nodes
+
Learning / light concept

Use this mark for:

Logo

App icon

Favicon

Loading screen

Navigation

LANDING PAGE

Build a premium landing page.

Hero:

3D logo

Headline:

በልጆቻችን መሃል AI

Subheadline:

Learn. Create. Explore.

Description:

A free professional multimodal AI platform designed to help students learn, create, research, and build with AI.

CTA:

Start Learning

Secondary:

Explore AI

Sections:

AI Models

AI Chat

Live AI

File Upload

Image to Text

Image Generation

Document Creation

PDF Creation

Personalized Learning

Parent Support

Teacher Tools

Child Safety

FAQ

Final CTA

STUDENT AI HOME

Create a professional AI workspace.

Header:

Logo
Model selector
Search
Notifications
Profile

Sidebar:

Home
AI Chat
Live
Files
Create
Images
Learn
Projects
Settings

Main area:

Greeting:

Hello, [Name] 👋

Question:

What would you like to learn or create today?

Quick actions:

Ask AI
Start Live
Upload File
Create Image
Create Document
Create PDF
Image to Text

Show:

Recent chats

Recent files

Recent projects

Learning recommendations

AI CHAT

Build a professional AI chat interface.

Composer:

[ + ]
[ 📎 Attach ]
[ 🖼 Image ]
[ 🎤 Voice ]

Placeholder:

Ask anything, upload a file, or create something...

Send button.

Support:

Text

Markdown

Code blocks

Tables

Math

Images

Attachments

Streaming responses

Response actions:

Copy
Regenerate
Save
Good response
Bad response
Report

AI QUICK ACTIONS

Show quick tools:

Explain
Summarize
Translate
Give Hint
Quiz Me
Practice
Create PDF
Create Document
Create Image
Start Live

FILE UPLOAD SYSTEM

Create a professional upload center.

Support:

PDF

DOCX

PPTX

TXT

CSV

JPG

JPEG

PNG

WEBP

Functions:

Drag and drop

Multiple upload

Upload progress

Preview

Rename

Delete

Search

Sort

Filter

Ask AI

FILE LIBRARY

Create:

My Files

Categories:

All
Documents
PDFs
Images
Presentations
Projects

File card:

Icon
Name
Type
Size
Date

Actions:

Open
Ask AI
Download
Rename
Delete
Share

FILE ANALYSIS

After uploading a file, support:

Summarize
Explain
Translate
Quiz me
Extract key points
Create study notes
Create flashcards
Create questions
Compare files
Find specific information

Example:

User uploads:

Physics_Chapter_4.pdf

Then asks:

“Explain chapter 4.”

The AI should use the uploaded document as context.

RAG

Implement Retrieval-Augmented Generation.

Pipeline:

Upload
↓
Validation
↓
Text extraction
↓
Cleaning
↓
Chunking
↓
Embedding
↓
Vector storage
↓
Semantic retrieval
↓
Context construction
↓
AI response
↓
Safety validation

Use RAG for large educational documents.

Whenever appropriate, indicate the source file/page used.

IMAGE TO TEXT

Create a dedicated tool:

📷 Image to Text

Upload:

JPG
PNG
WEBP
Screenshots
Scans
Textbook pages
Printed documents
Handwritten notes
Homework photos
Whiteboards

Workflow:

Upload
↓
OCR
↓
Vision analysis
↓
Text extraction
↓
Structure detection
↓
AI cleanup
↓
Editable output

OCR

Support:

Amharic
English
Amharic + English

Detect:

Paragraphs

Headings

Lists

Tables

Numbers

Symbols

Mathematics

Printed text

Handwriting where technically supported

Return editable text.

Actions:

Copy
Edit
Download TXT
Download DOCX
Translate
Summarize
Ask AI
Create PDF

IMAGE UNDERSTANDING

Users can upload an image and ask:

What is this?
Explain this diagram.
Explain this homework.
What does this chart show?
Summarize this page.
Create questions from this image.

Combine OCR + visual understanding.

IMAGE GENERATION

Build a full professional AI image generation workspace.

NOT just one prompt box.

Include:

Prompt
Model
Style
Aspect ratio
Quality
Resolution
Image count
Lighting
Composition
Camera style
Negative prompt
Seed where supported

Primary button:

Generate Image

IMAGE PROMPT ENHANCER

Add:

Enhance Prompt

Example:

User:

“Create a solar system.”

System improves the prompt internally by considering:

Subject

Composition

Lighting

Style

Educational purpose

Visual hierarchy

Quality

Do not expose internal reasoning.

IMAGE STYLE PRESETS

Include:

Photorealistic
Realistic
3D
Cinematic
Illustration
Cartoon
Anime
Watercolor
Digital Art
Educational
Infographic
Scientific
Children's Book
Isometric
Pixel Art
Minimal

EDUCATIONAL IMAGE MODE

Create:

Educational Mode

Use for:

Biology diagrams

Physics diagrams

Chemistry concepts

Geography

Maps

Historical scenes

Mathematics visualizations

Classroom posters

Infographics

Flashcards

Prioritize:

Accuracy

Clarity

Readability

Age appropriateness

IMAGE GENERATION ASPECT RATIOS

Provide:

1:1
16:9
9:16
4:3
3:4

Presets:

Square
Landscape
Portrait
Story
Presentation
Poster

IMAGE GALLERY

Create:

My Images

Show:

Preview
Prompt
Model
Date
Project

Actions:

Open
Download
Edit
Variation
Use in Document
Use in PDF
Save
Delete

IMAGE EDITOR

Create:

AI Image Editor

Allow:

Remove background
Change background
Add object
Remove object
Change style
Improve lighting
Restyle
Crop
Rotate
Resize

User can write natural language instructions.

IMAGE VARIATIONS

Allow:

Create Variations

Preserve the intended subject/composition as appropriate.

Show multiple versions.

Actions:

Compare
Save
Download
Edit

IMAGE ENHANCEMENT

Create:

Enhance Image

Support where the connected provider allows:

Upscale
Sharpen
Denoise
Improve scanned images
Improve readability
Restore faded images
Increase clarity

For documents, prioritize text legibility.

DOCUMENT GENERATOR

Create:

AI Document Generator

Inputs:

Title
Topic
Subject
Grade
Language
Document type
Length
Instructions

Types:

Essay
Report
Assignment
Study notes
Research summary
Worksheet
Revision guide
Project report
Lesson plan

Actions:

Generate
Preview
Edit
Download
Share

Formats:

DOCX
TXT
Markdown

PDF GENERATOR

Create:

AI PDF Generator

Generate:

Study guides

Worksheets

Reports

Lessons

Quizzes

Revision materials

Project documents

Include:

Cover page
Headings
Sections
Tables
Exercises
Summary
Page numbering

Actions:

Preview
Generate
Download
Share

IMAGE TO PDF

Support:

Single image → PDF
Multiple images → PDF

Features:

Reorder

Rotate

Delete

Preview

OCR text layer

Compression

IMAGE TO DOCUMENT

Workflow:

Image
↓
OCR
↓
Structure detection
↓
Formatting
↓
Document preview
↓
DOCX export

Preserve:

Headings
Paragraphs
Lists
Tables

LIVE AI MODE

Create a major feature:

🔴 LIVE MODE

Users can speak to the AI in real time.

UI:

AI avatar
Current model
Live waveform
Live transcript
Microphone state

Controls:

🎙 Microphone
🔇 Mute
⏸ Pause
✕ End

Flow:

Speech
↓
Speech recognition
↓
AI processing
↓
Response
↓
Text-to-speech
↓
Voice output

LIVE LANGUAGE

Support:

Amharic
English

Allow language switching during the session.

LIVE TUTOR MODES

Provide:

Study Tutor
Math Tutor
Science Tutor
Coding Tutor
Reading Tutor
Language Tutor

FILE + LIVE

Support a powerful workflow:

Upload file
↓
Start Live
↓
Ask AI to teach from the file

Example:

Student uploads a Physics PDF.

Starts Live Mode.

Says:

“Teach me this chapter.”

AI verbally explains the content using the uploaded file context.

Allow natural follow-up questions and interruptions.

IMAGE + LIVE

Allow visual context to be used in Live sessions where supported.

Example:

Student uploads or presents an image.

Student:

“Explain this page.”

AI:

“I can see a lesson about photosynthesis. Let's go through it together.”

Clearly show when image processing is active.

PROJECT WORKSPACE

Create a professional project system.

Example:

Grade 10 Biology Project

Workspace tabs:

Overview
Chat
Live
Files
Images
Documents
PDFs
Notes
Quiz
Tasks

The AI should be able to use authorized project resources as context.

STUDENT DASHBOARD

Include:

Welcome
Continue Learning
Ask AI
Start Live
Upload File
Create

Statistics:

Learning streak
Completed lessons
Quiz score
XP
Achievements

Subjects:

Mathematics
Science
English
Amharic
Computer Science
History
Geography

PERSONALIZED LEARNING

Use educational signals such as:

Completed lessons

Quiz scores

Mistake patterns

Practice frequency

Subjects

Difficulty

Learning goals

Generate:

Recommended lessons
Practice
Revision
Quizzes
Study plans

Do not use unnecessary sensitive personal information.

QUIZ SYSTEM

Generate:

Multiple choice
True/false
Short answer
Matching

Support:

Difficulty
Timed mode
Practice mode
Exam mode
Feedback
Explanations
Mistake review

AI-generated questions must pass appropriate validation.

PARENT DASHBOARD

Features:

Child profiles
Learning progress
Subjects
Quiz results
Completed lessons
Learning streak
Recommendations
Notifications
Parental controls

Do not expose unnecessary private AI conversations.

Provide educational summaries instead.

TEACHER DASHBOARD

Features:

Classes
Students
Assignments
Lesson generation
Quiz generation
Reports
Analytics
AI assistance

Teachers can create:

Lessons
Worksheets
Quizzes
Revision guides
PDFs
Study materials

ADMIN DASHBOARD

Features:

Users
Students
Parents
Teachers
Classes
Content
AI models
AI usage
Safety
Reports
Analytics
Audit logs
System settings

SAFETY CENTER

The AI must have strong child-safety behavior.

Never:

Encourage secrecy

Request passwords

Request unnecessary personal data

Facilitate harmful activities

Provide sexual content involving minors

Encourage self-harm

Encourage dangerous behavior

Manipulate children emotionally

The AI must remain age appropriate.

If a situation is potentially dangerous, encourage contacting an appropriate trusted adult or professional resource.

Include:

Report
Block
Safety feedback

EDUCATIONAL AI BEHAVIOR

The AI is a tutor, not simply an answer machine.

For homework:

Understand the task.

Identify learning level.

Explain the concept.

Give a hint.

Ask the student to attempt.

Correct mistakes.

Explain the solution.

Allow:

“Show full solution”

when appropriate.

Never intentionally make learning harder merely to avoid answering.

AMHARIC + ENGLISH

Support:

አማርኛ
English

Language selector:

[ አማርኛ | English ]

Support:

UI

AI chat

OCR

Translation

Voice

Documents

PDFs

Image prompts

Learning materials

Architect the system so more Ethiopian languages can be added later.

NOTIFICATIONS

Support:

Learning reminders
Assignment notifications
Quiz results
Achievements
Parent reports
Teacher updates
System notifications

Allow preference controls.

SEARCH

Global search should search authorized:

Conversations

Files

Projects

Lessons

Images

Documents

PDFs

Provide filters.

ACCESSIBILITY

Target WCAG principles.

Support:

Keyboard navigation

Screen readers

Semantic HTML

Accessible labels

Focus states

Touch-friendly controls

Reduced motion

High contrast

Amharic text rendering

RESPONSIVE DESIGN

Desktop:

Sidebar + large workspace

Tablet:

Collapsible sidebar

Mobile bottom navigation:

Home
AI
Live
Create
Profile

Make the AI composer easily accessible.

VISUAL DESIGN SYSTEM

Colors:

Primary Ethiopian green:
#078930

Yellow:
#FCDD09

Red:
#DA121A

Primary interface background:
#F8FAFC

Dark:
#0F172A

White:
#FFFFFF

Use colors professionally.

Do not overuse saturated colors.

Design style:

Premium

Modern

Clean

Soft shadows

Rounded cards

Subtle glass effects

Smooth transitions

Professional typography

Excellent whitespace

TYPOGRAPHY

Use a Unicode-compatible font for Amharic.

Verify that Amharic glyphs render correctly.

Do not use typography that causes broken Ge'ez characters.

DATABASE

Use PostgreSQL.

Create structures for:

users
student_profiles
parent_profiles
teacher_profiles
schools
classes
enrollments
subjects
grades
lessons
lesson_progress
quizzes
questions
quiz_attempts
assignments
submissions
achievements
student_achievements
ai_conversations
ai_messages
ai_usage
ai_models
files
file_chunks
embeddings
projects
project_files
generated_images
generated_documents
generated_pdfs
live_sessions
notifications
recommendations
safety_reports
audit_logs

Use:

Foreign keys

Indexes

Timestamps

Ownership rules

Soft deletion where useful

SUPABASE

Use Supabase for:

Authentication
PostgreSQL
Storage
Database security
Realtime where appropriate

Use Row Level Security.

Examples:

Students can access their own private data.

Parents can access authorized children.

Teachers can access authorized class resources.

Admins can access administrative resources.

FILE STORAGE

Use secure storage for:

Documents
PDFs
Images
Avatars
Educational content
Project files

File ownership must be enforced.

Do not expose private files with unrestricted public URLs.

LIVE REAL-TIME ARCHITECTURE

Use a real-time architecture appropriate to the connected AI provider.

Support:

Streaming audio

Streaming transcript

Streaming AI response

Text-to-speech

Interruptions

Reconnection

Session lifecycle

Do not expose third-party real-time credentials.

STREAMING CHAT

Support streamed responses.

Possible transports:

SSE
WebSocket

Choose the most appropriate architecture.

Show:

Typing / thinking indicator
Streaming text
Stop response

USAGE TRACKING

Track:

User
Model
Feature
Timestamp
Request type
Approximate usage
File processing
Image generation
Live duration

Do not expose internal provider billing details.

The product remains free while the backend can implement fair-use protection if required.

API DOCUMENTATION

Create developer documentation for:

Authentication
Models
Chat
Streaming
Files
OCR
Images
Image editing
Documents
PDFs
Live
Projects
Errors

API version:

/api/v1/

ERROR HANDLING

Use friendly errors.

Examples:

“Something went wrong. Please try again.”

“Your connection seems slow. Your work has been saved.”

“The file could not be processed. Please try another file.”

“I couldn't confidently read this image. Try a clearer photo.”

Never expose stack traces.

PERFORMANCE

Optimize for Ethiopian users and lower-bandwidth environments.

Implement:

Lazy loading

Compression

Caching

Optimized images

Efficient queries

Pagination

Streaming

Code splitting

Lightweight animations

3D effects must have a fallback.

MOBILE PERFORMANCE

On low-end mobile devices:

Reduce background effects

Reduce animation complexity

Lazy-load large assets

Avoid blocking rendering

Optimize image previews

SECURITY

Implement:

HTTPS

Secure authentication

Authorization

Input validation

Rate limiting

CSRF protection where applicable

Secure cookies

RLS

Audit logs

Secret management

File validation

Abuse prevention

Never trust the client for permissions.

PRIVACY

Collect only necessary information.

Provide:

Privacy policy
Account deletion
Data export where appropriate
Parent controls
Data retention controls

Protect child data with stronger privacy controls.

TESTING

Build for production quality.

Include:

Unit testing
Integration testing
End-to-end testing

Test:

Authentication
Role permissions
AI chat
Model switching
File uploads
OCR
Image generation
Document generation
PDF generation
Live sessions
Project access
RLS
Mobile responsiveness
Error handling

PROJECT STRUCTURE

Organize the code cleanly.

Suggested structure:

/app
/components
/features
/hooks
/lib
/services
/api
/ai
/auth
/files
/ocr
/images
/documents
/pdfs
/live
/projects
/learning
/analytics
/database
/types
/utils
/tests
/public

Keep reusable components modular.

Keep business logic outside presentational components.

AI HOME EXPERIENCE

The most important screen is the AI workspace.

At the top:

Logo
Model selector
Search
Notifications
Profile

Main:

“Hello, [Name] 👋”

“What would you like to learn or create today?”

Show feature tiles:

💬 Ask AI
🔴 Live
📎 Upload
📷 Image to Text
🎨 Generate Image
📄 Document
📕 PDF
🚀 New Project

Below:

Recent chats
Recent files
Recent projects
Recommended learning

PROFESSIONAL CREATION MENU

Create a unified:

Create

Menu containing:

🎨 Image
📄 Document
📕 PDF
📊 Presentation
📝 Study Notes
❓ Quiz
🧠 Flashcards

All creation features should be integrated with the current AI model and authorized files/project context.

MULTIMODAL WORKFLOW

Support these pipelines:

TEXT
↓
AI
↓
TEXT

TEXT
↓
AI
↓
IMAGE

TEXT
↓
AI
↓
DOCUMENT

TEXT
↓
AI
↓
PDF

IMAGE
↓
OCR
↓
TEXT

IMAGE
↓
VISION
↓
EXPLANATION

IMAGE
↓
AI
↓
DOCUMENT

IMAGE
↓
AI
↓
PDF

FILE
↓
RAG
↓
AI
↓
ANSWER

FILE
↓
AI
↓
QUIZ

FILE
↓
AI
↓
STUDY GUIDE

FILE
↓
LIVE
↓
VOICE TUTOR

PROJECT
↓
FILES + CHAT + LIVE + CREATE
↓
COMPLETE LEARNING WORKSPACE

AI SAFETY + QUALITY PIPELINE

Every request:

User request
↓
Authentication
↓
Authorization
↓
Input validation
↓
Safety pre-check
↓
Context retrieval
↓
Selected model
↓
Output generation
↓
Safety post-check
↓
Quality validation
↓
Response

Apply stricter safeguards for child accounts.

MODEL ROUTER

Internally maintain:

student_lite
student_thinker
student_pro

The frontend only uses these product names.

The backend determines:

Which model

Which provider

Which tool access

Which reasoning profile

Which multimodal capabilities

Do not expose provider implementation details.

TOOL PERMISSIONS BY MODEL

ተማሪ Lite:

Chat
Basic file analysis
Basic OCR
Basic image understanding
Simple creation

ተማሪ Thinker:

Advanced reasoning
Advanced file analysis
Advanced OCR
Complex image understanding
Advanced quizzes
Advanced educational creation

ተማሪ Pro:

Advanced multimodal workflows
Professional image generation
Image editing
Image variations
Image enhancement
PDF generation
Document generation
Live
Projects
Advanced research
Coding
Complex file processing

All remain free.

PROFILE

User profile includes:

Avatar
Name
Language
Role
Learning preferences

Student profile can include:

Grade
Subjects
Goals

Do not collect unnecessary personal details.

SETTINGS

Sections:

Account
Language
Appearance
Notifications
Privacy
Safety
AI preferences
Files
Data controls

ADMIN AI MODEL MANAGEMENT

Admin should be able to configure:

Model availability
Model routing
Feature availability
Safety configuration
Usage controls
Provider configuration

Do not expose provider secrets.

ADMIN ANALYTICS

Show:

Active users
Messages
Files processed
OCR usage
Image generation
Document generation
PDF generation
Live usage
Top subjects
Learning engagement

Use aggregated data when possible.

AUDIT LOGS

Track important administrative operations.

Examples:

User role changed
Account disabled
Content moderated
File deleted
Model configuration changed

Do not log unnecessary sensitive information.

ONBOARDING

Student onboarding:

Welcome
Name
Grade
Language
Subjects
Goals

Then:

3D branded intro
↓
AI workspace

Parent onboarding:

Name
Language
Child connection

Teacher onboarding:

Name
Subjects
Teaching level
Class setup

CHILD-FRIENDLY UX

The interface should not feel childish.

It should feel:

Modern
Friendly
Safe
Professional

Use:

Simple language

Clear icons

Friendly illustrations

Calm animations

Easy navigation

Avoid excessive gamification.

GAMIFICATION

Optional learning gamification:

XP
Streaks
Badges
Goals
Milestones

Use it to encourage learning, not excessive screen time.

NOTIFICATION SAFETY

Avoid manipulative notifications.

Examples:

“Your science lesson is ready.”

“Great work! You completed today's goal.”

Avoid:

“You must come back now!”

BRAND COPY

Primary:

በልጆቻችን መሃል AI

Tagline:

ተማር። ፍጠር። መርምር።

English:

Learn. Create. Explore.

Supporting message:

A free professional multimodal AI platform for learning, creating, and discovering.

CORE NAVIGATION

Desktop:

Home
AI Chat
Live
Files
Create
Images
Learn
Projects
Settings

Mobile:

Home
AI
Live
Create
Profile

FINAL PRODUCT QUALITY BAR

Do not deliver:

Static mockups

Fake buttons

Placeholder AI

Broken navigation

Dummy dashboards

Inaccessible forms

Unsecured API calls

Exposed secrets

Every major interaction should be implemented or architected cleanly for implementation.

When an external AI service is required, isolate it behind the first-party API/provider abstraction.

FINAL PRODUCT IDENTITY

The finished product should feel like one unified professional AI ecosystem.

The user should NOT feel like they are using separate tools.

Everything should connect:

AI Chat
+
Live
+
Files
+
OCR
+
Images
+
Documents
+
PDFs
+
Learning
+
Projects

ONE PLATFORM.

The emotional first impression should be:

🇪🇹 Ethiopian identity
+
🤖 Advanced AI
+
📚 Education
+
🎨 Creativity
+
🎙️ Live interaction
+
🔐 Safety
+
🧠 Intelligence

FINAL BUILD INSTRUCTION

Build the product in a polished production-ready way.

Prioritize the following order:

Authentication

Database and security

First-party API

AI model router

AI chat

File upload

OCR / Image-to-Text

Image understanding

Image generation

Image editing

Document generation

PDF generation

Live Mode

Projects

Personalized learning

Parent dashboard

Teacher dashboard

Admin dashboard

Analytics

3D launch experience

Performance optimization

Accessibility

Testing

The final result must be:

FREE
PROFESSIONAL
MULTIMODAL
SAFE
ETHIOPIAN
BILINGUAL
SCALABLE
MODERN

Final brand:

በልጆቻችን መሃል AI

ተማር። ፍጠር። መርምር።

Learn. Create. Explore.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://beljochachinmehal-ai.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f13bf760-d228-477f-9bc3-10e50d431d47).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
