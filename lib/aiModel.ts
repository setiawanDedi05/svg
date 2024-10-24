import {
  GoogleGenerativeAI,
  // HarmCategory,
  // HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Write a script to generate 30 seconds video on topic: Interesting historical story along with AI image prompt in realistic format for each scene and give me result in JSON format with imageprompt and ContentText as field",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "imagePrompt": "A bustling marketplace in ancient Rome, with merchants selling goods, people walking by, and a chariot passing through the crowd.",\n    "ContentText": "In the heart of ancient Rome, amidst the bustling marketplace, a young man named Marcus stood, his heart heavy with worry."\n  },\n  {\n    "imagePrompt": "Marcus, a young Roman man, looking distressed and anxious, with a worried expression on his face.",\n    "ContentText": "He had been entrusted with a precious scroll, containing a secret that could shake the very foundations of the Roman Empire."\n  },\n  {\n    "imagePrompt": "A close-up of the scroll, with intricate writing and a seal, showcasing the importance of the information contained within.",\n    "ContentText": "The scroll held a prophecy, predicting the rise of a powerful enemy who would challenge Rome\'s dominance."\n  },\n  {\n    "imagePrompt": "A shadowy figure, shrouded in darkness, with an ominous expression, lurking in the shadows of the marketplace.",\n    "ContentText": "But Marcus wasn\'t alone. A mysterious figure, cloaked in darkness, was lurking in the shadows, watching his every move."\n  },\n  {\n    "imagePrompt": "Marcus running through the crowded streets of Rome, with the shadowy figure in pursuit.",\n    "ContentText": "Suddenly, a hand reached out, snatching the scroll from Marcus. He found himself in a desperate chase through the crowded streets."\n  },\n  {\n    "imagePrompt": "A dramatic scene of Marcus and the shadowy figure struggling over the scroll, with both determined to possess it.",\n    "ContentText": "The chase ended in a fierce struggle, the fate of Rome hanging in the balance."\n  },\n  {\n    "imagePrompt": "Marcus holding the scroll aloft, victorious, with a determined expression on his face.",\n    "ContentText": "With a surge of adrenaline, Marcus wrestled the scroll back, determined to protect Rome\'s future."\n  },\n  {\n    "imagePrompt": "Marcus, standing before the Roman Senate, presenting the scroll and revealing the prophecy to the senators.",\n    "ContentText": "He rushed to the Roman Senate, revealing the prophecy and alerting them to the impending threat."\n  },\n  {\n    "imagePrompt": "The Roman senators listening intently, their faces a mixture of shock and concern, as Marcus delivers the prophecy.",\n    "ContentText": "The senators, shocked by the prophecy, took immediate action to prepare for the coming threat."\n  },\n  {\n    "imagePrompt": "A montage of Roman soldiers training, building fortifications, and preparing for war, showcasing the city\'s readiness.",\n    "ContentText": "Roman soldiers trained tirelessly, building fortifications and preparing for a war that would determine the fate of their empire."\n  },\n  {\n    "imagePrompt": "The Roman Empire, vast and powerful, with its legions ready for battle, showcasing the strength and resilience of Rome.",\n    "ContentText": "Despite the ominous prophecy, the Roman Empire stood strong, ready to face whatever challenges lay ahead."\n  }\n]\n```\n\n**Explanation of the JSON structure:**\n\n- Each object in the array represents a scene in the 30-second video.\n- **`imagePrompt`:** This field provides the text prompt for the AI image generator. It describes the scene and the elements to be included in the generated image.\n- **`ContentText`:** This field provides the narration or text overlay for the scene. It gives context and explains the action taking place.\n\n**Using the JSON data:**\n\n1. You can use this JSON data to generate images using an AI image generator like DALL-E or Stable Diffusion.\n2. You can then use the generated images and the `ContentText` to create a 30-second video using a video editing software like Adobe Premiere Pro or Final Cut Pro.\n\n**Tips for generating a compelling video:**\n\n- Use clear and concise image prompts that capture the essence of each scene.\n- Choose visuals that are engaging and visually appealing.\n- Use a dynamic soundtrack that enhances the mood and action of the video.\n- Keep the narration concise and impactful.\n\n**Note:** The provided JSON data is a starting point. You can customize the image prompts and content text to suit your specific requirements and create a unique and engaging historical video. \n',
        },
      ],
    },
  ],
});
