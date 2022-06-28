import type { Arguments, Argv } from "yargs";
import { vueHandler } from "../handler";

type Options = {
  targetPathPattern: string;
};

export const command = "run [targetPathPattern]";
export const desc = "defineComponentを使うようVue sfcファイルを変換する";

export const builder = (yargs: Argv<Options>): Argv<Options> => {
  return yargs
    .positional("target-path-pattern", {
      type: "string",
      requiresArg: true,
      description:
        "Path to the target vue files. Can be set with glob pattern. eg: './**/*.vue'",
      default: "./**/*.vue",
    })
};

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { targetPathPattern } = argv;

  await vueHandler({
    targetPathPattern,
  });

  console.log("\nCompleted 🎉");
  process.exit(0);
};
