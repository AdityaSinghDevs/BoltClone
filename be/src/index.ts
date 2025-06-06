require('dotenv').config();


import Groq from "groq-sdk";
import { getSystemPrompt } from "./prompts";

const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY 
});

export async function main() {
    const stream = await getGroqChatStream();
    for await (const chunk of stream) {
      // Print the completion returned by the LLM.
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
  }
  
  export async function getGroqChatStream() {
    return groq.chat.completions.create({
      //
      // Required parameters
      //
      messages: [
        // Set an optional system message. This sets the behavior of the
        // assistant and can be used to provide specific instructions for
        // how it should behave throughout the conversation.
        {
          role: "system",
          content: getSystemPrompt(),
        },
        // Set a user message for the assistant to respond to.
        {
          role: "user",
          content: "For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos.\n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n\n"
        },{
          role: "user",
          content: "Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`"
        },{
          role: "user",
          content : "<running_commands>\n<running_commands>\n\n<bolt_file_modifications>\n<file path=\".gitignore\" type=\"removed\"></file>\n<file path=\".eslintrc.cjs\" type=\"removed\"></file>\n<file path=\"index.html\" type=\"removed\"></file>\n<file path=\"package-lock.json\" type=\"removed\"></file>\n<file path=\"package.json\" type=\"removed\"></file>\n<file path=\"postcss.config.js\" type=\"removed\"></file>\n<file path=\"tailwind.config.js\" type=\"removed\"></file>\n<file path=\"tsconfig.app.json\" type=\"removed\"></file>\n<file path=\"tsconfig.json\" type=\"removed\"></file>\n<file path=\"tsconfig.node.json\" type=\"removed\"></file>\n<file path=\"vite.config.ts\" type=\"removed\"></file>\n<file path=\".bolt/prompt\" type=\"removed\"></file>\n<file path=\"src/App.tsx\" type=\"removed\"></file>\n<file path=\"src/index.css\" type=\"removed\"></file>\n<file path=\"src/main.tsx\" type=\"removed\"></file>\n<file path=\"src/vite-env.d.ts\" type=\"removed\"></file>\n</bolt_file_modifications>\n\nCreate a todo app"
        }
      ],
  
      // The language model which will generate the completion.
      model: "llama-3.3-70b-versatile",
  
      //
      // Optional parameters
      //
  
      // Controls randomness: lowering results in less random completions.
      // As the temperature approaches zero, the model will become deterministic
      // and repetitive.
      temperature: 0.5,
  
      // The maximum number of tokens to generate. Requests can use up to
      // 2048 tokens shared between prompt and completion.
      // max_completion_tokens: 2048,
  
      // Controls diversity via nucleus sampling: 0.5 means half of all
      // likelihood-weighted options are considered.
      top_p: 1,
  
      // A stop sequence is a predefined or user-specified text string that
      // signals an AI to stop generating content, ensuring its responses
      // remain focused and concise. Examples include punctuation marks and
      // markers like "[end]".
      stop: null,
  
      // If set, partial message deltas will be sent.
      stream: true,
    });
  }
  
  main();