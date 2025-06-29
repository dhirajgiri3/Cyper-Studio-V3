export const projectsData = {
  liveProjects: [
    {
      id: "product-bazaar",
      name: "Product Bazaar",
      link: "https://www.productbazar.cyperstudio.in",
      backgroundImage:
        "https://res.cloudinary.com/dgak25skk/image/upload/v1745964059/Productbazar_qrbi1l.png",
      tagline:
        "Discover startups, investors, and freelancers in one ecosystem.",
      description:
        "Product Bazaar is a dynamic platform connecting startups, investors, and freelancers in a seamless ecosystem. It features AI-powered matchmaking for investors, a robust freelancer hiring system, and tools for startup discovery. The platform fosters collaboration, streamlines funding processes, and supports scalable growth for businesses and professionals.",
      tags: ["Startups", "Funding", "Networking", "AI"],
      basicDetails: {
        industry: "Technology & Networking",
        client: "Startups, Investors, Freelancers",
        technologyStack: [
          "React.js",
          "Node.js",
          "MongoDB",
          "TensorFlow",
          "AWS",
        ],
        projectScope:
          "Development of a startup and freelancer networking platform with AI-driven matchmaking and collaboration tools.",
      },
      challenges: [
        "Creating effective AI-driven matchmaking for diverse user needs.",
        "Ensuring scalability for a growing user base of startups and freelancers.",
        "Providing a secure platform for financial transactions and sensitive data.",
      ],
      solutions: [
        "Developed an AI matchmaking algorithm using TensorFlow to connect users based on preferences and goals.",
        "Utilized AWS for scalable infrastructure to support high user growth.",
        "Implemented end-to-end encryption and secure payment gateways for safe transactions.",
      ],
      timeline: {
        duration: "9 months",
        phases: [
          { phase: "Research & Planning", duration: "1.5 months" },
          { phase: "UI/UX Design", duration: "2 months" },
          { phase: "Development & AI Integration", duration: "4.5 months" },
          { phase: "Testing & Deployment", duration: "1 month" },
        ],
      },
      testimonial: {
        clientName: "Archit Sinha",
        clientTitle: "Founder, Product Bazaar",
        quote:
          "Product Bazaar has transformed how startups and investors connect. Cyper Studio’s innovative AI solutions and seamless execution made this platform a game-changer.",
      },
    },
    {
      id: "helix",
      name: "Helix",
      link: "https://helix.cyperstudio.in",
      backgroundImage:
        "https://res.cloudinary.com/dgak25skk/image/upload/v1745951802/helix_ihpliu.png",
      tagline:
        "Streamlining logistics with a powerful shipping aggregator platform.",
      description:
        "Helix is an advanced logistics platform designed to optimize end-to-end shipping processes for e-commerce and retail businesses. It integrates real-time shipment tracking, dynamic pricing algorithms, multi-warehouse management, and comprehensive shipping insurance. By connecting with major couriers, Helix ensures seamless operations, cost efficiency, and enhanced customer experiences.",
      tags: ["Logistics", "Real-Time Tracking", "Courier Management", "SaaS"],
      basicDetails: {
        industry: "Logistics & Supply Chain",
        client: "E-commerce Platforms & Retail Chains",
        technologyStack: [
          "React.js",
          "Node.js",
          "MongoDB",
          "AWS",
          "Google Maps API",
        ],
        projectScope:
          "Design and development of a scalable logistics aggregator with real-time tracking and multi-courier integration.",
      },
      challenges: [
        "Standardizing data from diverse courier APIs with inconsistent formats.",
        "Ensuring accurate real-time tracking across global shipping networks.",
        "Balancing dynamic pricing to remain competitive while maintaining profitability.",
      ],
      solutions: [
        "Developed a unified API layer to normalize data from multiple courier services, enabling seamless integration.",
        "Leveraged Google Maps API with custom algorithms for precise, real-time shipment tracking.",
        "Implemented an AI-driven pricing engine that analyzes market trends and courier performance for optimal rates.",
      ],
      timeline: {
        duration: "8 months",
        phases: [
          { phase: "Discovery & Planning", duration: "1 month" },
          { phase: "UI/UX Design & Prototyping", duration: "2 months" },
          { phase: "Development & API Integration", duration: "4 months" },
          { phase: "Testing & Deployment", duration: "1 month" },
        ],
      },
      testimonial: {
        clientName: "Rajendra Verma",
        clientTitle: "CTO, Helix Logistics Solutions",
        quote:
          "Helix revolutionized our logistics operations, reducing costs and improving delivery transparency. Cyper Studio’s expertise and proactive approach delivered a robust platform that exceeded our expectations.",
      },
    },
    {
      id: "blueship",
      name: "Blueship",
      link: "https://www.blueship.in",
      backgroundImage:
        "https://res.cloudinary.com/dgak25skk/image/upload/v1745951803/blueship_ki3pgd.png",
      tagline: "Empowering e-commerce with efficient shipping solutions.",
      description:
        "Blueship is a cutting-edge shipping aggregator platform designed for e-commerce businesses in India. It offers AI-driven route optimization, real-time tracking, seamless multi-courier integration, and efficient return management. By connecting with major courier services, Blueship ensures fast, reliable, and cost-effective deliveries, enhancing customer satisfaction and operational efficiency.",
      tags: ["Logistics", "Shipping", "E-commerce", "AI"],
      basicDetails: {
        industry: "Logistics & E-commerce",
        client: "E-commerce Businesses",
        technologyStack: [
          "React.js",
          "Node.js",
          "PostgreSQL",
          "Google Maps API",
          "AWS",
        ],
        projectScope:
          "Development of a scalable shipping aggregator platform with AI-driven route optimization and real-time tracking for e-commerce businesses.",
      },
      challenges: [
        "Integrating with diverse courier APIs for seamless data flow.",
        "Optimizing delivery routes across India's varied geography.",
        "Handling high volumes of returns efficiently during peak seasons.",
      ],
      solutions: [
        "Developed a unified API layer to standardize data from multiple courier services, ensuring smooth integration.",
        "Implemented AI-based route optimization using Google Maps API for efficient and cost-effective deliveries.",
        "Built an automated return management system with real-time tracking to streamline operations.",
      ],
      timeline: {
        duration: "8 months",
        phases: [
          { phase: "Discovery & Planning", duration: "1 month" },
          { phase: "UI/UX Design", duration: "2 months" },
          { phase: "Development & API Integration", duration: "4 months" },
          { phase: "Testing & Deployment", duration: "1 month" },
        ],
      },
      testimonial: {
        clientName: "Dimple Chahal",
        clientTitle: "CEO, Blueship Logistics",
        quote:
          "Blueship has transformed our logistics with its reliable and optimized delivery solutions. Cyper Studio’s expertise in AI and seamless execution made this platform exceptional.",
      },
    },
    {
      id: "kashi-mitra-tours",
      name: "Kashi Mitra Tours",
      link: "https://kashi-tours.vercel.app/",
      backgroundImage:
        "https://res.cloudinary.com/dgak25skk/image/upload/v1745954631/kashi-tour_m4ibmi.png",
      tagline:
        "Discover sacred destinations with immersive spiritual experiences.",
      description:
        "Kashi Mitra Tours is a digital platform for spiritual travelers, offering AI-powered travel recommendations, 3D virtual tours of sacred Hindu pilgrimage sites, and real-time booking for guided tours. With multilingual support and expert spiritual guides, it makes holy destinations accessible to global audiences.",
      tags: [
        "Travel",
        "Pilgrimage",
        "Spiritual",
        "Holy Place Tours",
        "Travel Booking",
      ],
      basicDetails: {
        industry: "Travel & Tourism",
        client: "Kashi Mitra Tours",
        technologyStack: [
          "React.js",
          "Three.js",
          "Node.js",
          "MongoDB",
          "Google Cloud",
        ],
        projectScope:
          "Development of a spiritual travel platform with 3D virtual tours and AI-driven recommendations.",
      },
      challenges: [
        "Rendering high-quality 3D tours for intricate temple architectures.",
        "Personalizing travel recommendations for diverse spiritual preferences.",
        "Integrating secure booking systems with third-party travel providers.",
      ],
      solutions: [
        "Utilized Three.js to create lightweight, high-fidelity 3D tours optimized for web and mobile.",
        "Developed an AI recommendation engine analyzing user behavior and spiritual interests.",
        "Integrated secure APIs with payment gateways and booking platforms for seamless transactions.",
      ],
      timeline: {
        duration: "9 months",
        phases: [
          { phase: "Research & Content Curation", duration: "1.5 months" },
          { phase: "3D Modeling & UI/UX Design", duration: "2.5 months" },
          { phase: "Development & Integration", duration: "4 months" },
          { phase: "Testing & Launch", duration: "1 month" },
        ],
      },
      testimonial: {
        clientName: "Vinod Sinha",
        clientTitle: "Owner, Kashi Mitra Tours",
        quote:
          "Cyper Studio brought our vision of accessible spiritual travel to life. The 3D tours and AI recommendations have enriched the pilgrimage experience for our users.",
      },
    },
    {
      id: "fad-fashion",
      name: "Fad Fashion",
      link: "https://fadfashion.vercel.app/",
      backgroundImage:
        "https://res.cloudinary.com/dgak25skk/image/upload/v1745951803/Fad_qnwqwh.png",
      tagline:
        "Redefining fashion with sustainable designs and cutting-edge technology.",
      description:
        "Fad Fashion is a premium e-commerce platform offering sustainable, trend-driven clothing. It features AI-powered virtual try-on technology, personalized product recommendations, and a seamless shopping experience with secure payments and eco-friendly logistics. The platform emphasizes ethical production and transparency in its supply chain.",
      tags: ["Fashion", "E-commerce", "Sustainability", "AI"],
      basicDetails: {
        industry: "Fashion & Retail",
        client: "Fad Fashion Brand",
        technologyStack: [
          "Next.js",
          "Node.js",
          "MongoDB",
          "TensorFlow",
          "Stripe",
        ],
        projectScope:
          "Development of a sustainable fashion e-commerce platform with AI-driven virtual try-on and personalized recommendations.",
      },
      challenges: [
        "Creating an accurate AI-based virtual try-on for diverse body types.",
        "Ensuring transparency in the sustainable supply chain.",
        "Handling high traffic during seasonal sales without performance issues.",
      ],
      solutions: [
        "Trained a TensorFlow-based deep learning model for precise virtual try-on rendering across body types.",
        "Integrated blockchain technology for transparent supply chain tracking.",
        "Deployed a scalable AWS infrastructure with auto-scaling to manage traffic spikes.",
      ],
      timeline: {
        duration: "7 months",
        phases: [
          { phase: "Market Research & Planning", duration: "1 month" },
          { phase: "UI/UX Design", duration: "1.5 months" },
          { phase: "Development & AI Integration", duration: "3.5 months" },
          { phase: "Testing & Launch", duration: "1 month" },
        ],
      },
      testimonial: {
        clientName: "Shreshth Dubey",
        clientTitle: "Founder, Fad Fashion",
        quote:
          "Cyper Studio delivered a stunning platform that blends sustainability with innovation. The virtual try-on feature has delighted our customers, and their team’s dedication was exceptional.",
      },
    },
    {
      id: "teslavolts",
      name: "Teslavolts",
      link: "https://teslavolts.com",
      backgroundImage:
        "https://res.cloudinary.com/dgak25skk/image/upload/v1745951804/teslavolt_n4sckw.png",
      tagline: "Powering the future with smart EV charging infrastructure.",
      description:
        "Teslavolts delivers intelligent charging solutions for electric vehicles, featuring AI-driven energy optimization, scalable fleet management, and an intuitive mobile app. The platform supports municipalities, businesses, and EV fleet operators in building sustainable charging networks, ensuring efficient energy distribution and seamless user experiences.",
      tags: ["EV Charging", "Sustainable Energy", "Fleet Management", "IoT"],
      basicDetails: {
        industry: "Electric Mobility",
        client: "Municipalities & EV Fleet Operators",
        technologyStack: [
          "React Native",
          "Python",
          "AWS IoT",
          "TensorFlow",
          "PostgreSQL",
        ],
        projectScope:
          "Development of a smart EV charging platform with IoT integration and AI-powered energy management.",
      },
      challenges: [
        "Managing energy distribution during peak charging demands.",
        "Ensuring compatibility with diverse EV models and charging standards.",
        "Building a secure, scalable IoT infrastructure for real-time monitoring.",
      ],
      solutions: [
        "Implemented an AI model to predict and balance energy loads, minimizing grid strain.",
        "Developed a universal charging protocol adapter to support multiple EV standards.",
        "Utilized AWS IoT Core for secure, scalable device communication and real-time monitoring.",
      ],
      timeline: {
        duration: "10 months",
        phases: [
          { phase: "Research & Feasibility Study", duration: "1.5 months" },
          { phase: "UI/UX Design", duration: "2 months" },
          { phase: "Development & IoT Integration", duration: "5 months" },
          { phase: "Testing & Deployment", duration: "1.5 months" },
        ],
      },
      testimonial: {
        clientName: "Anita Verma",
        clientTitle: "Owner, Teslavolts",
        quote:
          "Teslavolts has transformed our EV charging operations with its smart energy management. Cyper Studio’s innovative IoT and AI solutions made this project a resounding success.",
      },
    },
    {
      id: "tryfit-fabrics",
      name: "TryFit Fabrics",
      link: "https://tryfitfabrics.com",
      backgroundImage:
        "https://res.cloudinary.com/dgak25skk/image/upload/v1745951803/gym_q9ccgf.png",
      tagline: "High-performance fabrics for the activewear industry.",
      description:
        "TryFit Fabrics provides performance-based textiles for activewear and sportswear, featuring AI-driven quality control, custom fabric solutions, and certified sustainable materials. The platform supports brands in creating durable, eco-friendly products that meet rigorous industry standards.",
      tags: ["Textiles", "Sportswear", "Manufacturing", "Sustainability"],
      basicDetails: {
        industry: "Textile Manufacturing",
        client: "Activewear & Sportswear Brands",
        technologyStack: ["React.js", "Node.js", "MongoDB", "Python", "AWS"],
        projectScope:
          "Development of a textile platform with AI-driven quality control and sustainable material sourcing.",
      },
      challenges: [
        "Ensuring consistent quality across custom fabric batches.",
        "Certifying sustainability of materials from multiple suppliers.",
        "Scaling production without compromising eco-friendly standards.",
      ],
      solutions: [
        "Implemented AI-based quality control using computer vision to detect fabric defects.",
        "Integrated a certification tracking system for sustainable material compliance.",
        "Utilized AWS for scalable inventory and production management.",
      ],
      timeline: {
        duration: "7 months",
        phases: [
          { phase: "Research & Supplier Onboarding", duration: "1 month" },
          { phase: "UI/UX Design", duration: "1.5 months" },
          { phase: "Development & AI Integration", duration: "3.5 months" },
          { phase: "Testing & Launch", duration: "1 month " },
        ],
      },
      testimonial: {
        clientName: "Vikram Singh",
        clientTitle: "Founder, TryFit Fabrics",
        quote:
          "Cyper Studio’s AI-driven quality control has elevated our fabric production. Their commitment to sustainability aligned perfectly with our brand’s mission.",
      },
    },
    {
      id: "family-vibes",
      name: "Family Vibes",
      link: "https://familyvibes.in",
      backgroundImage:
        "https://res.cloudinary.com/dgak25skk/image/upload/v1745959464/family_hj6a0e.png",
      tagline: "Transforming home decor with innovative photo frames.",
      description:
        "Family Vibes offers lightweight, unbreakable photo frames with easy-stick installation, requiring no nails. The e-commerce platform provides a user-friendly shopping experience, customizable frame designs, and eco-friendly packaging, making home decor accessible and hassle-free.",
      tags: ["Home Decor", "DIY", "E-commerce", "Sustainability"],
      basicDetails: {
        industry: "Home Decor & E-commerce",
        client: "Family Vibes Brand",
        technologyStack: [
          "Shopify",
          "React.js",
          "Node.js",
          "MongoDB",
          "Stripe",
        ],
        projectScope:
          "Development of an e-commerce platform for innovative photo frames with seamless UX and customization features.",
      },
      challenges: [
        "Educating users about the no-nail installation process.",
        "Ensuring durability of lightweight, unbreakable frames.",
        "Optimizing the platform for high conversion rates.",
      ],
      solutions: [
        "Created interactive tutorials and videos to demonstrate easy-stick installation.",
        "Developed frames using advanced polymer materials for durability and lightweight design.",
        "Optimized the Shopify platform with A/B testing for improved UX and conversions.",
      ],
      timeline: {
        duration: "6 months",
        phases: [
          { phase: "Market Research & Planning", duration: "1 month" },
          { phase: "UI/UX Design", duration: "1 month" },
          { phase: "Development & Integration", duration: "3 months" },
          { phase: "Testing & Launch", duration: "1 month" },
        ],
      },
      testimonial: {
        clientName: "Rahul Gupta",
        clientTitle: "Founder, Family Vibes",
        quote:
          "Family Vibes’ platform is a hit with customers, thanks to Cyper Studio’s intuitive design and seamless e-commerce features. Their team made our vision a reality.",
      },
    },
    {
      id: "dn-news",
      name: "DN News",
      link: "https://dnnews.in",
      backgroundImage:
        "https://res.cloudinary.com/dgak25skk/image/upload/v1751208303/dnnews-mock_yinket.png",
      tagline: "Stay informed with AI-curated news in multiple languages.",
      description:
        "DN News is a dynamic news platform delivering AI-curated content in multiple languages, with real-time updates, video/audio integration, and reader engagement tools. It ensures relevant, accurate news delivery while fostering user interaction through comments and sharing features.",
      tags: ["News", "AI", "Breaking News", "Multilingual"],
      basicDetails: {
        industry: "Media & News",
        client: "DN News Media",
        technologyStack: [
          "React.js",
          "Node.js",
          "MongoDB",
          "TensorFlow",
          "AWS",
        ],
        projectScope:
          "Development of an AI-driven news platform with multilingual support and real-time updates.",
      },
      challenges: [
        "Curating relevant news content across diverse user preferences.",
        "Supporting real-time updates in multiple languages.",
        "Managing high traffic during breaking news events.",
      ],
      solutions: [
        "Implemented an AI curation engine using TensorFlow for personalized news delivery.",
        "Developed a multilingual content management system with real-time translation APIs.",
        "Utilized AWS auto-scaling to handle traffic surges during major news events.",
      ],
      timeline: {
        duration: "8 months",
        phases: [
          { phase: "Research & Content Strategy", duration: "1 month" },
          { phase: "UI/UX Design", duration: "2 months" },
          { phase: "Development & AI Integration", duration: "4 months" },
          { phase: "Testing & Launch", duration: "1 month" },
        ],
      },
      testimonial: {
        clientName: "Rajesh Kumar",
        clientTitle: "Editor-in-Chief, DN News",
        quote:
          "DN News’ AI-driven platform keeps our readers engaged and informed. Cyper Studio’s technical innovation and collaborative approach made this project a triumph.",
      },
    },
        {
      id: "fastguide",
      name: "FastGuide (LMS App)",
      link: "https://play.google.com/store/apps/details?id=com.fastguide.fastguide",
      backgroundImage:
        "https://res.cloudinary.com/dgak25skk/image/upload/v1745954631/file_00000000f02861f7839b0ea1ed265cfe_mpinpw.png",
      tagline: "Empowering learning with an interactive LMS platform.",
      description:
        "FastGuide is a learning management system (LMS) offering paid courses with AI-powered course recommendations, secure payment processing, and certification upon completion. The platform supports educators and learners with intuitive interfaces and personalized learning paths for professional development.",
      tags: ["EdTech", "LMS", "E-learning", "AI"],
      basicDetails: {
        industry: "Education Technology",
        client: "Educational Institutions & Independent Educators",
        technologyStack: [
          "React.js",
          "Node.js",
          "MongoDB",
          "Stripe",
          "TensorFlow",
        ],
        projectScope:
          "Development of an LMS platform with AI-driven recommendations and secure payment integration.",
      },
      challenges: [
        "Personalizing course recommendations for diverse learner profiles.",
        "Ensuring secure and scalable payment processing.",
        "Maintaining user engagement across long-term courses.",
      ],
      solutions: [
        "Built an AI recommendation engine using TensorFlow to suggest courses based on user interests.",
        "Integrated Stripe for secure, scalable payment processing with multi-currency support.",
        "Implemented gamification features to boost learner engagement and retention.",
      ],
      timeline: {
        duration: "7 months",
        phases: [
          { phase: "Research & Planning", duration: "1 month" },
          { phase: "UI/UX Design", duration: "1.5 months" },
          { phase: "Development & Integration", duration: "3.5 months" },
          { phase: "Testing & Launch", duration: "1 month" },
        ],
      },
      testimonial: {
        clientName: "Ramesh Patel",
        clientTitle: "Founder, FastGuide",
        quote:
          "FastGuide’s personalized learning experience has been a game-changer for our users. Cyper Studio’s innovative approach and technical prowess made this project a success.",
      },
    },
    {
      id: "su-exam-app",
      name: "Sharda University Syllabus Management",
      link: "https://sharda-university.vercel.app",
      backgroundImage:
        "https://res.cloudinary.com/dgak25skk/image/upload/v1745951803/su-exam-placeholder.png",
      tagline: "Streamlining syllabus management for universities.",
      description:
        "SU Exam Attendance App streamlines university exam processes with QR-based check-ins, real-time invigilator monitoring, and secure digital records. The platform ensures accuracy, reduces manual errors, and enhances the efficiency of exam administration.",
      tags: ["University", "Exams", "Attendance", "Automation"],
      basicDetails: {
        industry: "Higher Education",
        client: "Universities & Exam Boards",
        technologyStack: [
          "React Native",
          "Node.js",
          "MongoDB",
          "AWS",
          "QR Code API",
        ],
        projectScope:
          "Development of an exam attendance app with QR-based check-ins and real-time monitoring.",
      },
      challenges: [
        "Ensuring scalability for thousands of simultaneous check-ins.",
        "Preventing fraudulent attendance through secure verification.",
        "Integrating with university databases for real-time updates.",
      ],
      solutions: [
        "Utilized AWS Lambda for scalable, serverless processing of check-ins.",
        "Implemented multi-factor authentication and QR code encryption to prevent fraud.",
        "Developed secure APIs for real-time integration with university systems.",
      ],
      timeline: {
        duration: "6 months",
        phases: [
          { phase: "Research & Planning", duration: "1 month" },
          { phase: "UI/UX Design", duration: "1 month" },
          { phase: "Development & Integration", duration: "3 months" },
          { phase: "Testing & Deployment", duration: "1 month" },
        ],
      },
      testimonial: {
        clientName: "Sharda University",
        clientTitle: "Registrar, Sharda University",
        quote:
          "The SU Exam App has made our exam processes seamless and secure. Cyper Studio’s innovative solutions and timely delivery were exceptional.",
      },
    },
    {
      id: "vikava-labs",
      name: "Vikava Labs",
      link: "https://vikavalabs.in",
      backgroundImage:
        "https://res.cloudinary.com/dgak25skk/image/upload/v1745954632/vikava-labs_sot9vb.png",
      tagline: "Empowering the fashion industry with a sustainable ecosystem.",
      description:
        "Vikava Labs is a B2B platform that connects fashion designers and manufacturers, offering AI-powered trend predictions, sustainable supply chain management, and end-to-end apparel production support. The platform streamlines workflows, reduces waste, and promotes eco-friendly practices in the fashion industry.",
      tags: ["Fashion", "B2B", "Supply Chain", "Sustainability"],
      basicDetails: {
        industry: "Fashion & Manufacturing",
        client: "Fashion Designers & Manufacturers",
        technologyStack: [
          "React.js",
          "Node.js",
          "PostgreSQL",
          "TensorFlow",
          "AWS",
        ],
        projectScope:
          "Development of a B2B fashion ecosystem with AI-driven trend forecasting and sustainable supply chain management.",
      },
      challenges: [
        "Predicting fashion trends accurately across diverse markets.",
        "Ensuring transparency and sustainability in the supply chain.",
        "Integrating with existing manufacturing workflows.",
      ],
      solutions: [
        "Built an AI model using TensorFlow to analyze global fashion trends and consumer data.",
        "Implemented blockchain for transparent tracking of sustainable materials.",
        "Developed customizable APIs to integrate with manufacturers’ ERP systems.",
      ],
      timeline: {
        duration: "8 months",
        phases: [
          { phase: "Research & Planning", duration: "1 month" },
          { phase: "UI/UX Design", duration: "2 months" },
          { phase: "Development & Integration", duration: "4 months" },
          { phase: "Testing & Deployment", duration: "1 month" },
        ],
      },
      testimonial: {
        clientName: "Neha Kapoor",
        clientTitle: "CEO, Vikava Labs",
        quote:
          "Vikava Labs has transformed how we connect designers and manufacturers. Cyper Studio’s AI and blockchain solutions have set a new standard for sustainability in fashion.",
      },
    },
    {
      id: "chatter",
      name: "Chatter (Chat App)",
      link: "https://chatterapp.com",
      backgroundImage:
        "https://res.cloudinary.com/dgak25skk/image/upload/v1745951803/chatter-placeholder.png",
      tagline: "Secure and fast messaging for modern communication.",
      description:
        "Chatter is a secure messaging platform offering end-to-end encrypted chats, cloud storage, and multi-device synchronization. Designed for both personal and professional use, it ensures privacy, low latency, and a seamless user experience across platforms.",
      tags: ["Chat", "Messaging", "Encryption", "Communication"],
      basicDetails: {
        industry: "Communication Technology",
        client: "General Consumers & Businesses",
        technologyStack: [
          "React Native",
          "Node.js",
          "MongoDB",
          "WebSocket",
          "AWS",
        ],
        projectScope:
          "Development of a secure messaging app with encryption and multi-device sync.",
      },
      challenges: [
        "Ensuring low-latency messaging across global servers.",
        "Implementing robust end-to-end encryption without compromising performance.",
        "Supporting seamless multi-device synchronization.",
      ],
      solutions: [
        "Utilized WebSocket technology for real-time, low-latency messaging.",
        "Implemented industry-standard end-to-end encryption using Signal Protocol.",
        "Developed a cloud-based sync system using AWS for cross-device consistency.",
      ],
      timeline: {
        duration: "7 months",
        phases: [
          { phase: "Research & Security Planning", duration: "1 month" },
          { phase: "UI/UX Design", duration: "1.5 months" },
          { phase: "Development & Integration", duration: "3.5 months" },
          { phase: "Testing & Launch", duration: "1 month" },
        ],
      },
      testimonial: {
        clientName: "Rohit Jain",
        clientTitle: "Product Manager, Chatter",
        quote:
          "Chatter’s secure and fast platform has won over users worldwide. Cyper Studio’s expertise in encryption and real-time tech was pivotal to our success.",
      },
    },
  ],
  inDevelopment: [
    {
      id: "navkar-selection",
      name: "Navkar Selection",
      link: "https://navkarselection.com",
      tagline: "A diverse e-commerce platform for multiple product categories.",
      backgroundImage:
        "https://res.cloudinary.com/dgak25skk/image/upload/v1745964060/navkar_ereewv.png",
      description:
        "AI-powered product recommendations, secure checkout, and vendor marketplace.",
      tags: ["E-commerce", "Retail", "AI"],
    },
    {
      id: "testimony",
      name: "Testimony",
      link: "https://testimony.com",
      tagline: "SaaS platform for managing and collecting client testimonials.",
      description:
        "Automated testimonial requests, AI-generated suggestions, and website integration.",
      tags: ["SaaS", "Marketing", "Testimonials"],
    },
  ],
  comingSoon: [
    {
      id: "cyperfit",
      name: "CyperFit",
      link: "https://cyperfit.com",
      tagline: "A smart Gym ERP solution for fitness centers and trainers.",
      description:
        "Membership management, workout planning, and automated invoicing.",
      tags: ["Fitness", "ERP", "Gym Management"],
    },
    {
      id: "nexecom",
      name: "Nexecom",
      link: "https://nexecom.com",
      tagline:
        "A next-gen e-commerce platform with robust inventory and shipping features.",
      description:
        "Multi-vendor marketplace, dynamic pricing, and AI-powered inventory forecasting.",
      tags: ["E-commerce", "Inventory", "Shipping"],
    },
    {
      id: "edvita",
      name: "Edvita",
      link: "https://edvita.com",
      tagline: "An AI-powered ERP for educational institutions.",
      description:
        "Student management, fee tracking, and AI-driven academic insights.",
      tags: ["Education", "ERP", "AI"],
    },
  ],
};
