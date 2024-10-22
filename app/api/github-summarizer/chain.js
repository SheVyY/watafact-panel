import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { RunnableSequence } from "langchain/schema/runnable";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const outputSchema = z.object({
  summary: z.string().describe("A concise summary of the GitHub repository"),
  cool_facts: z.array(z.string()).describe("A list of interesting facts about the repository"),
});

const functionSchema = {
  name: "output_formatter",
  description: "Formats the output as a summary and list of cool facts",
  parameters: zodToJsonSchema(outputSchema),
};

export const summarizeReadme = async (readmeContent) => {
  const model = new ChatOpenAI({ temperature: 0 });

  const promptTemplate = PromptTemplate.fromTemplate(
    "Summarize this GitHub repository from the following README file content:\n\n{readmeContent}"
  );

  const chain = RunnableSequence.from([
    promptTemplate,
    model.bind({
      functions: [functionSchema],
      function_call: { name: "output_formatter" },
    }),
    (response) => {
      const functionCall = response.additional_kwargs.function_call;
      if (functionCall) {
        return JSON.parse(functionCall.arguments);
      }
      throw new Error("Failed to parse structured output");
    },
  ]);

  const result = await chain.invoke({ readmeContent });

  return result;
};
