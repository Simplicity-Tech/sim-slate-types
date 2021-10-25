import { BaseEditor, BaseSelection, Descendant, Node } from 'slate';
import { ReactEditor } from 'slate-react';

/**
 * In order to enable full extensibility slate uses interface merging strategy
 * For mor information see:
 * https://docs.slatejs.org/concepts/12-typescript#why-is-the-type-definition-unusual
 */
declare module 'slate' {
  interface CustomTypes {
    Editor: TWysiwygEditor;
    Element: TCustomElement;
    Text: TCustomText;
  }
}

type TWithLinksEditor = {
  isInline: (element: TCustomElement) => boolean;
  insertText: (text: string) => void;
  insertData: (data: DataTransfer) => void;
};

type TWithUtilsEditor = {
  blurSelection: BaseSelection;
};

type TWysiwygEditor = BaseEditor & ReactEditor & TWithUtilsEditor & TWithLinksEditor;

type TWysiwygValue = Descendant[];

type TTextFormat = 'bold' | 'italic' | 'futureLink';

type ParagraphChild = TCustomText | TLinkElement;

type TParagraphElement = {
  type: 'paragraph';
  children: ParagraphChild[];
};

type TLinkElement = {
  type: 'link';
  url: string;
  children: TCustomText[];
};

type TBulletListElement = {
  type: 'bullet-list';
  children: TListItemElement[];
};

type TListItemElement = {
  type: 'list-item';
  children: TCustomText[];
};

type TCustomElement = TParagraphElement | TLinkElement | TBulletListElement | TListItemElement;

type TBlockType = 'paragraph' | 'link' | 'bullet-list' | 'list-item';

type TFormattedText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  futureLink?: boolean;
  type: 'text';
};

type TCustomText = TFormattedText;

const serializeToString = (value: string): string => {
  const parsedValue = JSON.parse(value) as TWysiwygValue;
  return parsedValue
    ?.flatMap((node) => {
      const more = [] as string[];
      for (const leaf of Node.texts(node)) {
        more.push(Node.string(leaf[0]));
      }
      return more;
    })
    .filter((strNode) => !!strNode)
    .join(' ');
};

export {
  ParagraphChild,
  TWithLinksEditor,
  TWithUtilsEditor,
  TWysiwygEditor,
  TWysiwygValue,
  TTextFormat,
  TParagraphElement,
  TLinkElement,
  TBulletListElement,
  TListItemElement,
  TCustomElement,
  TBlockType,
  TFormattedText,
  TCustomText,
  serializeToString,
};
