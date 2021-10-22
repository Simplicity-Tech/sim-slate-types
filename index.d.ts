import { BaseEditor, BaseSelection, Descendant } from "slate";
import { ReactEditor } from "slate-react";

/**
 * In order to enable full extensibility slate uses interface merging strategy
 * For mor information see:
 * https://docs.slatejs.org/concepts/12-typescript#why-is-the-type-definition-unusual
 */
declare module "slate" {
  interface CustomTypes {
    Editor: TWysiwygEditor;
    Element: TCustomElement;
    Text: TCustomText;
  }
}

export type TWithLinksEditor = {
  isInline: (element: TCustomElement) => boolean;
  insertText: (text: string) => void;
  insertData: (data: DataTransfer) => void;
};

export type TWithUtilsEditor = {
  blurSelection: BaseSelection;
};

export type TWysiwygEditor = BaseEditor &
    ReactEditor &
    TWithUtilsEditor &
    TWithLinksEditor;

export type TWysiwygValue = Descendant[];

export type TTextFormat = "bold" | "italic" | "futureLink";

type ParagraphChild = TCustomText | TLinkElement;

export type TParagraphElement = {
  type: "paragraph";
  children: ParagraphChild[];
};

export type TLinkElement = {
  type: "link";
  url: string;
  children: TCustomText[];
};

export type TBulletListElement = {
  type: "bullet-list";
  children: TListItemElement[];
};

export type TListItemElement = {
  type: "list-item";
  children: TCustomText[];
};

export type TCustomElement = TParagraphElement | TLinkElement | TBulletListElement | TListItemElement;

export type TBlockType = 'paragraph' | 'link' | 'bullet-list' | 'list-item';

export type TFormattedText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  futureLink?: boolean;
  type: "text";
};

export type TCustomText = TFormattedText;
