// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "Home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "publications by categories in reversed chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "Details of current ongoing projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "Overview of taught courses.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-people",
          title: "people",
          description: "Members of the dream team",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "dropdown-news",
              title: "news",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/news/";
              },
            },{id: "post-automatic-outreach-materials-with-ai",
        
          title: "Automatic Outreach Materials with AI",
        
        description: "Automatic Outreach Materials with AI",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/outreach/";
          
        },
      },{id: "post-neutrons-are-blue-a-manifesto",
        
          title: "Neutrons are blue - a manifesto",
        
        description: "Making sure society sees sense",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/neutrons/";
          
        },
      },{id: "post-test-post-with-jupyter-notebook",
        
          title: "Test post with jupyter notebook",
        
        description: "test example of a blog post with jupyter notebook",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/jupyter-notebook/";
          
        },
      },{id: "post-a-post-with-advanced-image-components",
        
          title: "a post with advanced image components",
        
        description: "this is what advanced image components could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/advanced-images/";
          
        },
      },{id: "post-a-post-with-redirect",
        
          title: 'a post with redirect <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "Scientists Make the First Observation of a Nucleus Decaying into Four Particles After Beta Decay",
        section: "Posts",
        handler: () => {
          
            window.open("https://science.osti.gov/np/Highlights/2023/NP-2023-08-a", "_blank");
          
        },
      },{id: "post-the-life-and-death-of-stars-viewing-nuclear-reactions-to-understand-the-universe-around-us",
        
          title: 'The Life and Death of Stars - Viewing Nuclear Reactions to Understand the... <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "Studying nuclear reactions using a Time Projection Chamber allows scientists to study stars’ internal processes.",
        section: "Posts",
        handler: () => {
          
            window.open("https://science.osti.gov/np/Highlights/2020/NP-2020-10-b", "_blank");
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-new-website-created",
          title: 'New website created!',
          description: "",
          section: "News",},{id: "projects-nuclear-structure-studies",
          title: 'Nuclear Structure Studies',
          description: "How does the nucleus arrange itself?",
          section: "Projects",handler: () => {
              window.location.href = "/projects/clustering/";
            },},{id: "projects-nuclear-forensics",
          title: 'Nuclear forensics',
          description: "Using neutrons to investigate the make-up of material",
          section: "Projects",handler: () => {
              window.location.href = "/projects/forensics/";
            },},{id: "projects-fusion-energy",
          title: 'Fusion energy',
          description: "Delivering clean, affordable energy",
          section: "Projects",handler: () => {
              window.location.href = "/projects/fusion/";
            },},{id: "projects-hf-adnef-overview",
          title: 'HF-ADNeF Overview',
          description: "High-Flux Accelerator Driven Neutron Facility for nuclear science",
          section: "Projects",handler: () => {
              window.location.href = "/projects/hfadnef/";
            },},{id: "projects-nuclear-astrophysics-studies-with-hf-adnef",
          title: 'Nuclear Astrophysics studies with HF-ADNeF',
          description: "Understanding the origin of elements in our Universe",
          section: "Projects",handler: () => {
              window.location.href = "/projects/nuclearastro/";
            },},{id: "projects-tebat-tpc-development",
          title: 'TeBAT TPC Development',
          description: "A next-generation Time Projection Chamber",
          section: "Projects",handler: () => {
              window.location.href = "/projects/tebat/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6A.%62%69%73%68%6F%70.%32@%62%68%61%6D.%61%63.%75%6B", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/jackbishopbham", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/jack-bishop-nuclear-physicist", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0002-4701-8625", "_blank");
        },
      },{
        id: 'social-researchgate',
        title: 'ResearchGate',
        section: 'Socials',
        handler: () => {
          window.open("https://www.researchgate.net/profile/https://www.researchgate.net/profile/Jack-Bishop-3/", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=QYOkZssAAAAJ", "_blank");
        },
      },{
        id: 'social-scopus',
        title: 'Scopus',
        section: 'Socials',
        handler: () => {
          window.open("https://www.scopus.com/authid/detail.uri?authorId=57641648900", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
