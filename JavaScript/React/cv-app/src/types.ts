enum sections {
    General, Education, Professional, Skills, Projects, Certifications, Preview
}

enum jobTypes {
    fulltime,
    internship
}

type genInfoType = {
    name: string,
    email: string,
    birthDate?: string,
    phone: string,
}

type educationType = {
    degreeName: string,
    instituteName: string,
    startDate?: string,
    endDate?: string,
    score: string,
}

type profType = {
    companyName: string,
    position: string,
    description: string,
    type: jobTypes,
    startDate?: string,
    endDate?: string,
}

type skillType = {
    id: number,
    name: string,
}
type skillGroup = {
    id: number,
    name: string,
    skills: skillType[],
}

type project = {
    id: number,
    name: string,
    description: string,
    toolsUsed: string,
}

type certification = {
    id: number,
    name: string,
    issuer: string,
    url: string,
}

type globalState = {
    section: sections,
    general: genInfoType,
    education: educationType[],
    profession: profType[],
    skills: skillGroup[],
    projects: project[],
    certifications: certification[],
}

export { sections, jobTypes };
export type { globalState, educationType, profType, genInfoType, skillGroup, skillType, project, certification };