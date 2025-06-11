export const anish={
    "name": "Anish Kumar",
    "title": "A Software Engineer specializing in web development, cloud technologies, and automated deployments. Focused on AI, Computer Vision, and exploring LLMs to build intelligent and scalable solutions",
    "skill": ["Python", "Next.js", "Django", "Computer Vision", "Bootstrap", "HTML", "CSS", "TensorFlow-Keras", "OpenCV", "Langchain", "Langgraph", "Conversational AI", "YOLO", "AWS", "Docker", "Kubernetes", "Facebook API", "Postman", "Git", "Figma", "Digital Marketing", "MySQL"],
    "experience": [
        {
        "organization":"Synamedia India Pvt. Ltd.",
        "role":"Associate Software Engineer"
        },
        {
        "organization":"On Demand Experts",
        "role":"Software Development Intern"
        },
        {
        "organization":"Samsung R&D Institute India",
        "role":"Research Intern"
        }
    ],
    "education":{
        "organization":"B.N.M Institute of Technology",
        "degree":"Bachelor of Engineering",
        "year":"2020 - 2024",
        "status":"completed"
    },
    "project": [
        {
            "name": "Manoranjan",
            "description": "Built a scalable chunk-based media streaming system supporting both live (SRT) and VOD inputs. Developed a segmenter to split incoming streams into discrete video, audio, and subtitle chunks. Designed a Redis-queued pipeline where each chunk is transcoded to multiple resolutions using FFmpeg, and packaged into CMAF-compliant HLS and DASH formats using Shaka Packager. Ensured seamless multi-language support and future DRM integration. Planned for efficient cloud distribution using MSO storage, CDN integration, and shield layers.",
            "organization":"Synamedia India Pvt. Ltd."
        },
        {
            "name": "VALET",
            "description": "Developed a classifier to categorize case types and hosted an LLM on a local server for enhanced security. Designed an agent workflow using Langgraph, enabling dynamic user interactions to gather necessary details. Integrated the agent with a REST API and a persistent database for request processing. The API acts as a central controller, interacting with internal portals to fulfill requests. Containerized and orchestrated the API, automating deployment via CI/CD pipelines to ensure faster, more reliable updates.",
            "organization":"Synamedia India Pvt. Ltd."
        },
        {
            "name": "ANI",
            "description": "Built a knowledge base from cleaned historical snow data and manuals, generating embeddings using the SBERT model. Stored embeddings in a FAISS vector store for efficient retrieval. Prepared training data for fine-tuning the Llama2 model with transfer learning. Enabled user interaction through Chainlit and implemented a RAG architecture for efficient query processing.",
            "organization":"Synamedia India Pvt. Ltd."
        },
        {
            "name": "referqik",
            "description": "Prepared a comprehensive design document outlining the app's architecture and functionality. Created a detailed UI prototype using Figma, ensuring an intuitive and responsive user experience. Developed a full-stack web application leveraging AWS Amplify for backend services, NextJS for frontend development, and integrated Facebook Graph API with GraphQL for dynamic data retrieval. Focused on implementing SEO best practices to enhance search engine ranking and improve overall discoverability",
            "organization":"On Demand Experts"
        },
        {
            "name": "PitFig",
            "description": "Collected and preprocessed the training dataset for pothole detection, ensuring high-quality data for model accuracy. Designed and implemented an algorithm to count the number of potholes in video footage, ensuring no repetition. Built and trained a machine learning model to effectively identify potholes from video data. Developed a user-friendly Android app to deploy the model, enabling real-time pothole detection and reporting directly from mobile devices.",
            "organization":"Samsung R&D Institute India"
        },
        {
            "name": "Instant Weather",
            "description": "Developed a weather prediction system that fetches and cleans historical data from the OpenWeatherMap API. Trained Random Forest and Gradient Boosting classifiers once on this data. Hosted a REST API with persistent storage as a mediator. The SPA collects geolocation info, fetches recent environmental data, and predicts the next 24 hours using an ARMA model. The predicted variables are classified to determine weather conditions like sunny or cloudy",
            "organization":"B.N.M Institute of Technology"
        },
        {
            "name": "TechIT club website",
            "description": "Developed and launched the official club website for B.N.M. Institute of Technology, with a strong focus on digital marketing to enhance visibility and engagement. Leveraged AWS CloudFront CDN for fast and reliable content delivery, ensuring a seamless user experience. Implemented key features including event scheduling, gallery management, FAQ section, and a secure member login system for personalized access. Utilized Jira for agile development, enabling efficient project management, regular sprint reviews, and timely delivery of features.",
            "organization":"B.N.M Institute of Technology"
        },
        {
            "name": "SecureShare Web App",
            "description": "Backend implemented using Django REST API, providing role-based user authentication with 2FA using JWT. It features end-to-end encrypted file sharing and storage. ReactJS communicates with the API over HTTPS, delivering a responsive UI and single Sign-On (SSO). Both services are dockerized and hosted using EC2 and ECS.",
            "organization":"Personal"
        },
        {
            "name": "Goal Web App",
            "description": "Backend consists of Django REST API which handles CRUD request on Goal Model. Model data is stored in MongoDB Atlas database cluster. Frontend consists of NGINX server which listens to requests and forwards it to ReactJS. ReactJS talks to API to perform the required operation. Individual services are dockerized and hosted using EC2 and ECS.",
            "organization":"Personal"
        }
    ],
    "certification":[
        "IEEE 2025 Paper Efficient Pothole Detection in Video Sequences",
        "On Demand Experts Software Development Internship",
        "Samsung PRISM 2022",
        "Google Fundamentals of Digital Marketing",
        "Udemy Modern Computer Vision",
        "EC-Council Cybersecurity for Businesses",
        "HackerRank Java (Basic)",
        "HackerRank Python (Basic)",
        "HackerRank JavaScript (Basic)",
        "IIT Bombay PHP and MySQL Training",
        "IIT Bombay Python Training",
        "Infosys Python",
        "Introduction to MongoDB"
    ],
    "extracuricular":[
        {
            "description": "Bala Janaagraha is Janaagraha's civic learning programme which aims to empower and enable every child to be an active citizen. I served as a SPOC for the coordination between college students and the organization. I also served as a mentor to guide three teams consisting of school students on road safety and waste management",
            "organization":"Bala Janaagraha"
        },
        {
            "description": "Harappa is an online learning institution of the future that blends innovative learning experiences with byte-sized content tailored to the busy lives of professionals on-the-go. With academically robust and application-oriented frameworks, learners get a chance to build Thrive Skills. Skills that I learnt where speaking effectively, listening actively,writing proficiently and reading deeply",
            "organization":"Harappa"
        },
        {
            "description": "The ISTE is the leading National Professional non-profit making Society for the Technical Education System in our country. This workshop was based on Python and Data Science where I learnt various fundamental concepts of python and data science.",
            "organization":"ISTE"
        }
    ],
    "funFact": [
        "I enjoy turning real-time video into insights using YOLO and computer vision.",
        "I thrive in teams where Docker jokes and Git rebases are both welcome.",
        "I am currently geeking out over LLMs, LangGraph, and anything that scales in the cloud.",
        "I believe startups teach you more about people than code ever will.",
        "I balance my tech grind with purpose-driven work in social impact and sustainability."
    ]
}