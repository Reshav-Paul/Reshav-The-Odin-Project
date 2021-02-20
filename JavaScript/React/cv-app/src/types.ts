enum sections {
    General, Education, Professional
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

type globalState = {
    section: sections,
    general: genInfoType,
    education: educationType[],
    profession: profType[],
}

export { sections, jobTypes };
export type { globalState, educationType, profType, genInfoType };