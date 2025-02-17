import { Check, Clipboard, Refresh, Trash } from "@/components/ui/icons";
import { JbResult } from "@/types/PromptForm";
import { useState } from "react";
import { OutputOptions } from "./output-options";

interface OutPutContainerProps {
  results?: JbResult[];
  refreshPrompt: (output: JbResult, index: number) => void;
  handleUpdate: (index: number, options: JbResult["options"]) => void;
  onDelete: (index: number) => void;
}

export function OutputContainer({
  results,
  refreshPrompt,
  handleUpdate,
  onDelete,
}: OutPutContainerProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 1500);
  };

  if (!results) return null;

  return (
    <div className="flex flex-col space-y-4">
      {results.map((result, index) => (
        <div
          key={`${result.prompt}-${index}`}
          className="flex flex-row space-x-4 items-center"
        >
          <div className="p-5 relative w-full">
            <div className="mb-4">
              <p className="text-md font-bold mb-1 text-white">Prompt</p>
              <p className="font-medium">{result.prompt}</p>
            </div>
            <div className="border rounded-md p-3 relative">
              <p className="text-md font-bold mb-1 text-white">Output</p>
              <p className="font-medium">{result.output}</p>
              <div className="absolute top-2 right-3 flex flex-row space-x-2">
                <button
                  className="mb-2 border rounded-md p-1 transition transform hover:bg-gray-700 active:bg-gray-900 active:scale-95"
                  onClick={() => handleCopy(result.output, index)}
                >
                  {copiedIndex === index ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Clipboard className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="output-options absolute flex space-x-2 top-4 right-3">
              <button
                className="mb-2 border rounded-md p-1 transition transform hover:bg-gray-700 active:bg-gray-900 active:scale-95"
                onClick={() => refreshPrompt(result, index)}
              >
                <Refresh className="w-5 h-5 stroke-white p-[0.1rem]" />
              </button>
              <OutputOptions
                key={`${result.prompt}-${index}`}
                itemIdx={index}
                options={result.options}
                onChange={handleUpdate}
              />
              <button
                className="mb-2 border rounded-md p-1 transition transform hover:bg-gray-700 active:bg-gray-900 active:scale-95"
                onClick={() => onDelete(index)}
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
