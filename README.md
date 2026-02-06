# PuckPulseAI: NHL Analytics Agent

<div align="center">
   <img src="https://github.com/user-attachments/assets/40b75731-e2b8-42c5-9455-62151ad3f751" />
</div>

[Check it out](http://puckpulse-ai.netlify.app)

A conversational analytics agent that helps you answer data-driven questions without a data science degree.

## Skills Developed
* AI Code Assistants — spun up this project using Google AI studio, and then Cursor IDE to refine and adjust
* Netlify - made deployment a breeeeze
* 
* Tailwind CSS - styling and mobile responsiveness

## Known Issues
* This is just a proof of concept!  Some things I'd love to do:
  * Hook up a real, hosted backend with live data
    * currently, the "database" is just a static JSON snapshot of Oilers data
  * Enable a conversational interface, with memory
  * Integrate a Text-to-SQL interface like Vanna AI to improve performance
  * Increase the ability of the bot.  I want it to do complex things like analyze line combos and determine the optimal starting goalie for an opponent
  * No tests 😬

## Project Conclusions
This is my first time starting a project from scratch with an AI builder like [Google AI Studio](https://aistudio.google.com/apps).  Coupled with Netlify, and Cursor I had this thing shipped in a day or two!  Really incredible to have AI scaffold the front end using the tech I want, allowing me to focus on the hard problems.

As for the project itself, I'm excited to iterate on this PoC as I feel it could be a truly valuable tool for an NHL organization.  Data can be so much more accessible with a tool like this!

## Run Locally
1. Install dependencies:
   `npm install`
2. Set the `OPENROUTER_API_KEY` in [.env.local](.env.local) to your OpenRouter API key
   - Get your API key from https://openrouter.ai/
   - I've been using free DeepSeek models, but hook it up to whatever model you like
3. Run the app:
   `npm run dev`
