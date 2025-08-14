# Data Structure for Portfolio Website

This file explains the structure of `data.json` used in this project. The goal is to keep the data minimal and easy to edit.

## Top-level keys
- `profile`: Main user info, education, skills, honors, and projects.
- `roadmap`: Timeline events for the roadmap page.

---

## profile
```
profile: {
  name: string,
  bio: string,
  education: [
    { institution: string, program: string, year: number, gpa?: number }
  ],
  skills: {
    hard: string[],
    soft: string[],
    languages: string[]
  },
  honors: string[],
  projects: [
    { title: string, years: string, description: string, skills: string[] }
  ]
}
```

## roadmap
```
roadmap: [
  {
    title: string,
    date: string (YYYY-MM-DD),
    category: string (education|awards|sports|projects),
    skills?: string[],
    experience?: string
  }
]
```

---

- All fields are optional except `title`, `date`, and `category` in roadmap, and `name` in profile.
- Keep descriptions short and relevant.
- Add or remove fields as needed for your use case.
