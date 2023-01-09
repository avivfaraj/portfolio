const projects ={
  ds:[
  {
    name: "Fake News Detection",
    href: "./fakeNewsDetectionPage",
    desc: "Classification of news into categories of real and fake based on Natural Language Processing (NLP) in PySpark",
    keywords: "NLP, Fake News, Classification, Naive Bayes, PySpark"
  },
  {
    name: "NYC Property Sales",
    href: "https://github.com/avivfaraj/DSCI631-project",
    desc: "Linear Regression and Random Forest were utilized to predict price of Real Estate properties in New York City",
    keywords: "Linear Regression, Random Forest, Fake News"
  },
  {
    name: "Retail Store Database",
    href: "https://github.com/avivfaraj/INFO605-Project",
    desc: "Designed and implemented a database system for an online retail store. Designed ERD, RI and Relation Schema, and implemented in SQL (Oracle)",
    keywords: "SQL, ERD, Referential Integrity, Relational Schema"
  },
  {
    name: "Heart Disease Analysis",
    href: "https://github.com/avivfaraj/DSCI521-project",
    desc: "Utilized Python libraries such as Pandas to identify symptoms and risk factors of heart disease.",
    keywords: "Data Analysis, Classification, Pandas, Histogram"
  }],

  cs:[
  {
    name: "TODOCOM",
    href: "./todocomPage",
    desc: "Command Line Interface (CLI) program to extract all TODO comments from a file/folder. It also enable to prioritize tasks by simply adding special TODO comments in the code.",
    keywords: "Python3, CLI, argparse, package"
  },
  {
    name: "Secure SSH Connection",
    href: "./ssh",
    desc: "Created a secure SSH connection to a FTP server (aCloud project).",
    keywords: "SSH, terminal"
  },
  {
    name: "Cash Flow",
    href: "https://github.com/avivfaraj/money-flow",
    desc: "An Object Oriented Program (OOP) to Monitor account balance and transactions. Sqlite3 was utilized to store data in a database that was initially designed in ERD. GUI is under development.",
    keywords: "Python3, OOP, Sqlite3, SQL, ERD, Database"
  },
  {
    name: "Health Tracker",
    href: "https://github.com/avivfaraj/cs570-health-tracker",
    desc: "An Object Oriented Program (OOP) written in Java that helps the user to keep track of both calories consumed and workouts done. The program also fetches data from FoodData Central Database (USDA) through their API to get accurate nutrition facts of real products.",
    keywords: "Java, API, OOP "
  },
  {
    name: "Karp-Rabin Algorithm",
    href: "./karp_rabin_algorithm",
    desc: "A research paper that was written as part of CS502 - Data Structures and Algorithms at Drexel University in which Karp-Rabin algorithm was reviewed and implemented in Python3 ",
    keywords: "Python3, String Matching, Karp-Rabin algorithm"
  },
  {
    name: "Hierholzer Algorithm",
    href: "./hierholzer_algorithm",
    desc: "A research paper that was written as part of CS502 - Data Structures and Algorithms at Drexel University in which Hierholzer's algorithm was reviewed",
    keywords: "Python3, Eulerian Circuit, Eulerian Path, Hierholzer's algorithm, Graph Theory"
  }],

  ee:[
  {
    name: "aCloud",
    href: "./acloud",
    desc: "Created a SMB (Server Message Block) server using ROC-RK3328-CC (similar to Raspberry Pi), SSH and Samba.",
    keywords: "SSH, Samba, Cloud, SMB, SBC, GnuPG"
    },
    {
      name: "Samba Configuration",
      href: "./samba",
      desc: "Utilized Samba to share storage (cloud). It was configured to share folders with different users, and to send email notification for better protection.",
      keywords: "Samba, Cloud, SMB"
  },
  {
    name: "Ultra-fast laser pulse measurement",
    href: "/publication",
    desc: "My Capstone project for Physics & Electrical Engineering Bachleor degree in which I created a program in LabVIEW that controls optical components in order to measure ultra-fast laser pulse using autocorrelation.",
    keywords: "Autocorrelation, femtosecond laser, LabVIEW"
   }
  ]
}


export default projects
