import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export const generateStudyPlan = async (skill, level, hoursPerWeek) => {
  return `
WEEK 1
- Learn basics of ${skill}
- Spend ${hoursPerWeek} hours studying
- Watch beginner tutorials

WEEK 2
- Build small exercises
- Practice core concepts
- Solve mini problems

WEEK 3
- Build intermediate projects
- Improve practical skills
- Revise weak areas

WEEK 4
- Create one complete project
- Prepare portfolio showcase
- Practice advanced topics

LEVEL:
${level}

RECOMMENDATION:
Stay consistent and practice daily.
`;
};
