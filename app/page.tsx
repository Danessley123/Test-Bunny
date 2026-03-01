"use client";

import { useRef } from "react";
import { useChat } from "ai/react";
import clsx from "clsx";
import {
  LoadingCircle,
  SendIcon,
  UserIcon,
} from "./icons";
import Textarea from "react-textarea-autosize";
import Image from "next/image";

const examples = [
  "I am so stressed with taking Niecy to school every day and making dinner. I can’t stop thinking about all of my responsibilities. What should I do, Nini?",
  "I was there for Mama’s arrest, but I can’t remember what happened. Can you tell me, Nini?",
  "I keep thinking about Mama and wondering if I inherited some of her bad traits. Will I end up like her—locked away and powerless?"
];
export default function Chat() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, setInput, handleSubmit, isLoading } = useChat();

  const disabled = isLoading || input.length === 0;

  const handleExampleClick = (example: string) => {
    setInput(example);
    inputRef.current?.focus();
    formRef.current?.requestSubmit();
  };

  return (
    <main className="flex flex-col items-center justify-between pb-40">
      {messages.length === 0 ? (
        <div className="border-gray-200 sm:mx-0 mx-5 mt-20 max-w-screen-md rounded-md border sm:w-full">
          <div className="flex flex-col space-y-4 p-7 sm:p-10">
            <Image
              src="/sample-image.png"
              alt="sample-image"
              width={40}
              height={40}
              className="h-20 w-20"
            />
            <h1 className="text-lg font-semibold text-black">
              Hi, I'm Nini, the inner child of Janiyah Coleman.
            </h1>
            <p className="text-gray-500">
              I'm here to listen, comfort, and reflect with you. Click an example below or type a message to start chatting.
            </p>
          </div>
          <div className="flex flex-col space-y-4 border-t border-gray-200 bg-gray-50 p-7 sm:p-10">
            {examples.map((example, i) => (
              <button
                key={i}
                className="rounded-md border border-gray-200 bg-white px-5 py-3 text-left text-sm text-gray-500 transition-all duration-75 hover:border-black hover:text-gray-700 active:bg-gray-50"
                onClick={() => handleExampleClick(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      ) : (
        messages.map((message, i) => (
          <div
            key={i}
            className={clsx(
              "flex w-full items-center justify-center border-b border-gray-200 py-8",
              message.role === "user" ? "bg-white" : "bg-gray-100"
            )}
          >
            <div className="flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0">
              <div
                className={clsx(
                  message.role === "assistant" ? "bg-white" : "bg-black p-1.5 text-white"
                )}
              >
                {message.role === "user" ? <UserIcon /> : (
                  <Image
                    src="/sample-image.png"
                    alt="Nini"
                    width={36}
                    height={36}
                  />
                )}
              </div>
              <div className="prose prose-p:leading-relaxed mt-1 w-full break-words">
                {message.content}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Input */}
      <div className="fixed bottom-0 flex w-full flex-col items-center space-y-3 bg-gradient-to-b from-transparent via-gray-100 to-gray-100 p-5 pb-3 sm:px-0">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative w-full max-w-screen-md rounded-xl border border-gray-200 bg-white px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4"
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            required
            rows={1}
            autoFocus
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                formRef.current?.requestSubmit();
                e.preventDefault();
              }
            }}
            spellCheck={false}
            className="w-full pr-10 focus:outline-none"
          />
                   <button
            className={clsx(
              "absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all",
              disabled ? "cursor-not-allowed bg-white" : "bg-green-500 hover:bg-green-600"
            )}
            disabled={disabled}
          >
            {isLoading ? (
              <LoadingCircle />
            ) : (
              <SendIcon
                className={clsx(
                  "h-4 w-4",
               input.length === 0 ? "text-gray-300" : "text-white"
                )}
              />
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
