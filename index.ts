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

type LeafChild = TCustomText | TLinkElement | TBulletListElement;

type TParagraphElement = {
  type: 'paragraph';
  children: LeafChild[];
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
  children: LeafChild[];
};

type TImageElement = {
  type: 'image';
  source: string;
  children: TCustomText[];
};

type TVideoElement = {
  type: 'video';
  source: string;
  children: TCustomText[];
};

type TTableCellElement = {
  type: 'table-cell';
  children: TTableCellChild[];
};

type TTableRowElement = {
  type: 'table-row';
  children: TTableCellElement[];
};

type TTableElement = {
  type: 'table';
  children: TTableRowElement[];
};

type TCustomText = TFormattedText;

type TMediaElement = TImageElement | TVideoElement;

type TTextElement = TParagraphElement | TLinkElement | TBulletListElement | TListItemElement;

type TTableCellChild = TCustomText | TTextElement | TMediaElement | TTableElement;

type TTableElements = TTableElement | TTableRowElement | TTableCellElement;

type TCustomElement = TTextElement | TMediaElement | TTableElement;

type TBlockTypeToElement = {
  paragraph: TParagraphElement;
  link: TLinkElement;
  'bullet-list': TBulletListElement;
  'list-item': TListItemElement;
  image: TImageElement;
  video: TVideoElement;
  table: TTableElement;
  'table-row': TTableRowElement;
  'table-cell': TTableCellElement;
};

type TBlockType = keyof TBlockTypeToElement;

type TFormattedText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  futureLink?: boolean;
  type: 'text';
};

const serializeToString = (value: string): string => {
  const parsedValue = JSON.parse(value) as TWysiwygValue;
  return parsedValue
    ?.flatMap((node) => {
      const leaves = [] as string[];
      // We need to use a for..of loop because Node.texts returns a generator.
      switch (node.type) {
        case 'video': {
          leaves.push('');
          break;
        }
        case 'image': {
          leaves.push('');
          break;
        }
        default: {
          for (const leaf of Node.texts(node)) {
            leaves.push(Node.string(leaf[0]));
          }
        }
      }
      return leaves;
    })
    .filter((strNode) => !!strNode)
    .join(' ');
};

const EMPTY_CHILDREN: TCustomText[] = [
  {
    text: '',
    type: 'text',
  },
];

export {
  LeafChild,
  TWithLinksEditor,
  TWithUtilsEditor,
  TWysiwygEditor,
  TWysiwygValue,
  TTextFormat,
  TParagraphElement,
  TLinkElement,
  TBulletListElement,
  TListItemElement,
  TImageElement,
  TVideoElement,
  TTableElements,
  TCustomElement,
  TBlockType,
  TBlockTypeToElement,
  TFormattedText,
  TCustomText,
  TTextElement,
  TMediaElement,
  TTableElement,
  TTableRowElement,
  TTableCellElement,
  serializeToString,
  EMPTY_CHILDREN,
};
