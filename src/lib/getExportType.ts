import { getExport } from "./getNodes";
import { SourceFile } from "ts-morph";

export const EXPORT_TYPES = {
  DEFINE_COMPONENT: 0,
  VUE_EXTEND: 1,
  PLAIN_OBJECT: 2,
} as const
type ExportType = typeof EXPORT_TYPES[keyof typeof EXPORT_TYPES];

export const getExportType = (sourceFile: SourceFile): ExportType | undefined => {
  // exportしているpropertyがないならばundefinedを返す
  const exported = getExport(sourceFile)
  if(!exported) return undefined

  const exportedText = sourceFile
    .getDefaultExportSymbolOrThrow()
    .getDeclarations()[0]
    .getText()

  if (exportedText.startsWith("export default {")) {
    return EXPORT_TYPES.PLAIN_OBJECT
  } else if(exportedText.startsWith('export default defineComponent(')) {
    return EXPORT_TYPES.DEFINE_COMPONENT
  } else if (exportedText.startsWith('export default Vue.extend(')) {
    return EXPORT_TYPES.VUE_EXTEND
  } else {
    return undefined
  }
};