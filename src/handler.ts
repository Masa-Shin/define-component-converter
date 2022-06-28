import colors from "ansi-colors";
import { readFile, writeFile } from "fs/promises";
import glob from "glob";
import { Project } from "ts-morph";
import { extractScriptFromVue } from "./lib/extractScriptFromVue";
import { generateProgressBar } from "./lib/progressBar";
import { getExportedObject } from "./lib/getNodes";
import { EXPORT_TYPES, getExportType } from "./lib/getExportType";

export const vueHandler = async ({
  targetPathPattern,
}: {
  targetPathPattern: string;
}): Promise<void> => {
  const filePaths = glob.sync(targetPathPattern, {
    ignore: "./**/node_modules/**/*",
  });

  // ファイル群からいろんな情報を含んだFileInfoオブジェクトを作成
  const allFiles = await Promise.all(
    filePaths.map(async (path) => {
      const fullText = await readFile(path, "utf8");
      const script = extractScriptFromVue(fullText);
      return {
        path,
        fullText,
        script,
      };
    })
  );

  // Start progress bar
  const progressBar = generateProgressBar(colors.green);
  progressBar.start(allFiles.length, 0);

  // VueファイルからTSファイルを作成する
  const project = new Project({
    useInMemoryFileSystem: true,
  });
  const targetFilesWithSourceFile = allFiles.map((file) => {
    const sourceFile = project.createSourceFile(`${file.path}.ts`, file.script);
    return {
      ...file,
      sourceFile,
    };
  });

  for await (const file of targetFilesWithSourceFile) {
    // scriptタグがないファイルはskip
    if (file.script === "") {
      progressBar.increment();
      continue;
    }
    // objectをexportしていなかったらskip 
    const exportedObject = getExportedObject(file.sourceFile)
    if(!exportedObject) {
      progressBar.increment();
      continue;
    }
    // exportTypeがundefか、既にdefineComponentならskip
    const exportType = getExportType(file.sourceFile)
    if(exportType === undefined || exportType === EXPORT_TYPES.DEFINE_COMPONENT) {
      progressBar.increment();
      continue;
    }

    // soucefileにdefineComponentのimport文を追加する
    file.sourceFile.addImportDeclaration({
      namedImports: ['defineComponent'],
      moduleSpecifier: "@vue/composition-api",
    });

    // export defaultをdefineComponentに置き換える
    const newExportText = `defineComponent(${exportedObject?.getFullText()})`
    file.sourceFile.removeDefaultExport();
    file.sourceFile.addExportAssignment({
      isExportEquals: false,
      expression: newExportText
    })

    // defineComponent化したことで不要になったImport文を削除する
    file.sourceFile.fixUnusedIdentifiers() 
    
    // fileに書き込む
    const newFullText = file.fullText.replace(
      file.script,
      file.sourceFile.getFullText()
    );
    await writeFile(file.path, newFullText);
    progressBar.increment();
  }

  progressBar.stop();
};
