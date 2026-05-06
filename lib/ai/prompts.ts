export const tailorPrompt = (jd: string, resume: string) => `
You are an expert resume coach...

JOB DESCRIPTION:
${jd}

RESUME:
${resume}

Return JSON...
`

export const redFlagPrompt = (resume: string) => `...`
export const interviewPrompt = (jd: string, resume: string) => `...`