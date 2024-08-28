import { Configuration } from "openai";

export const configureOpenAI=async ()=>{
    const config=new Configuration({
        apiKey:process.env.OPEN_AI_SECRET,
        organization:process.env.OPENAI_ORGANIZATION_ID,
    });
    return config;
}
