import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Rooster,
  createUpdateContentPlugin,
  UpdateMode,
  createRibbonPlugin,
  Ribbon,
  getButtons,
  KnownRibbonButtonKey,
  RibbonButton,
  AllButtonStringKeys,
} from "roosterjs-react";
import type { EditorOptions, IEditor } from "roosterjs-editor-types-compatible";
import { Editor } from "roosterjs-editor-core";
import { ContentEdit, Watermark } from "roosterjs-editor-plugins";
export interface RichTextEditorProps {
  content?: string;
  onChange: (newValue?: string) => void;
  placeholderText?: string;
}

export const RichTextEditor = (props: RichTextEditorProps): JSX.Element => {
  const editor = useRef<IEditor | null>(null);
  const { content, onChange, placeholderText } = props;

  const ribbonPlugin = React.useMemo(() => {
    return createRibbonPlugin();
  }, []);

  const editorCreator = useCallback(
    (div: HTMLDivElement, options: EditorOptions) => {
      editor.current = new Editor(div, options);
      return editor.current;
    },
    []
  );

  useEffect(() => {
    console.log("useEffect", placeholderText);
  }, [placeholderText]);

  const plugins = useMemo(() => {
    const contentEdit = new ContentEdit();
    const placeholderPlugin = new Watermark(placeholderText || "");
    const updateContentPlugin = createUpdateContentPlugin(
      UpdateMode.OnContentChangedEvent | UpdateMode.OnUserInput,
      (content: string) => {
        onChange && onChange(content);
      }
    );
    return [contentEdit, placeholderPlugin, updateContentPlugin, ribbonPlugin];
  }, [onChange, placeholderText, ribbonPlugin]);

  const ribbon = useMemo(() => {
    const buttons: RibbonButton<AllButtonStringKeys>[] = getButtons([
      KnownRibbonButtonKey.NumberedList,
      KnownRibbonButtonKey.BulletedList,
    ]);

    return <Ribbon buttons={buttons} plugin={ribbonPlugin} />;
  }, [ribbonPlugin]);

  return (
    <div>
      {ribbon}
      <Rooster
        initialContent={content}
        plugins={plugins}
        editorCreator={editorCreator}
        imageSelectionBorderColor={"blue"}
        doNotAdjustEditorColor={true}
        data-testid="rooster-rich-text-editor"
      />
    </div>
  );
};
