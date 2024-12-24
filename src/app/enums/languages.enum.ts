import { LangInterface } from "@app/interfaces/lang.interface";

export enum Languages {
  IT = 'it',
  EN = 'en'
};

export const Langs: LangInterface[] = [
  {
    code: Languages.IT,
    icon: './lang_ico/italy.svg'
  },
  {
    code: Languages.EN,
    icon: './lang_ico/england.svg'
  }
];
