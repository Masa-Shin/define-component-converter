import { parse } from "node-html-parser";

export const extractScriptFromVue = (source: string): string => {
  const script = parse(source).querySelector('script[lang="ts"]');

  return script ? script.rawText : "";
};