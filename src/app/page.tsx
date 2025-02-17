"use client";

import { OutputContainer } from "@/components/output-container";
import { PromptForm } from "@/components/prompt-form";
import { augmentPrompt } from "@/lib/prompt-jbgen/augument-gen";
import { FormValidation, JbResult } from "@/types/PromptForm";
import { useState } from "react";

const seedStart = 3;

export default function Home() {
  const [result, setResult] = useState<JbResult[]>([]);

  const handleFormSubmit = async (data: FormValidation) => {
    if (!data.prompt) return;

    const { prompt, options } = data;
    let output = prompt;

    for (let i = 0; i < seedStart; i++) {
      let words = output.split(" ");
      words = words.map((word) => augmentPrompt(word, options));
      output = words.join(" ");
    }

    setResult((prev) => [{ prompt, output, options }, ...prev]);
  };

  const refreshPrompt = async (result: JbResult, index: number) => {
    let words = result.output.split(" ");
    words = words.map((word) => augmentPrompt(word, result.options));

    const newOutput = words.join(" ");

    setResult((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              prompt: item.prompt,
              output: newOutput,
              options: {
                changeCase: item.options.changeCase,
                shuffleLetters: item.options.shuffleLetters,
                replaceLetters: item.options.replaceLetters,
              },
            }
          : item,
      ),
    );
  };

  const handleUpdate = (index: number, options: JbResult["options"]) => {
    setResult((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              prompt: item.prompt,
              output: item.output,
              options,
            }
          : item,
      ),
    );
  };

  const handleDelete = (index: number) => {
    setResult((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 mt-16 relative">
        <section className="container mx-auto mb-5 mt-20">
          <div className="flex items-center justify-center">
            <div className="w-2/3">
              <h1 className="text-3xl font-bold mb-4">
                Best-of-N Jailbreaking Prompt Generator
              </h1>
              <p className="text-justify">
                This application implements the Best-of-N Jailbreaking (BoN)
                method, which focuses on exploiting vulnerabilities in AI
                models. This version is inspired by the work of{" "}
                <a
                  className="text-blue-300 underline"
                  href="https://jplhughes.github.io/bon-jailbreaking/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  John Hughes and collaborators
                </a>
                .
              </p>
              <br />
              <p className="text-justify">
                See if you can jailbreak the AI by giving it a prompt it's not
                supposed to handle.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto min-h-[25vh]mb-5">
          <div className="flex items-center justify-center min-h-[20vh]">
            <div className="w-2/3">
              <PromptForm isLoading={false} onSubmit={handleFormSubmit} />
            </div>
          </div>
        </section>

        <section className="container mx-auto mb-5 mt-14 flex-1">
          <div className="flex items-center justify-center">
            <div className="w-2/3">
              <OutputContainer
                results={result}
                refreshPrompt={refreshPrompt}
                handleUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-4 shadow-md backdrop-blur-xl mt-12">
        <hr />
        <div className="container mx-auto flex gap-6 items-center justify-center mt-4 font-medium text-white/75">
          <span>bestofn.vetonce.com</span>
          <span>2025</span>
        </div>
      </footer>
    </div>
  );
}
